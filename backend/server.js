import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Candidate Profile Constants
const CANDIDATE_INFO = {
  name: "SATHISH S.",
  title: "Digital Marketing",
  email: "sathishkinga8@gmail.com",
  phone: "7639276889",
  location: "Erode, Tamil Nadu, India",
  linkedin: "https://www.linkedin.com/in/sathish-s-2188b7292"
};

// Root Welcome Endpoint
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to Sathish S. Digital Marketing Portfolio API",
    status: "Active",
    candidate: CANDIDATE_INFO.name,
    role: CANDIDATE_INFO.title,
    endpoints: [
      "GET /api/health",
      "GET /api/candidate-info",
      "POST /api/contact",
      "GET /api/resume"
    ]
  });
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: "OK",
    service: "Sathish S. Digital Marketing Backend",
    timestamp: new Date().toISOString()
  });
});

// Candidate Info Endpoint
app.get('/api/candidate-info', (req, res) => {
  res.json(CANDIDATE_INFO);
});

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Server-side validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: "Name is required." });
    }
    if (!email || !email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ success: false, error: "Valid email address is required." });
    }
    if (!subject || !subject.trim()) {
      return res.status(400).json({ success: false, error: "Subject is required." });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, error: "Message is required." });
    }

    console.log(`[Contact Submission] Received from ${name} (${email}) - Subject: ${subject}`);

    // If SMTP environment variables are configured, attempt real email delivery via Nodemailer
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      await transporter.sendMail({
        from: `"${name}" <${process.env.SMTP_USER}>`,
        replyTo: email,
        to: process.env.CONTACT_RECEIVER_EMAIL || CANDIDATE_INFO.email,
        subject: `[Portfolio Inquiry] ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <h3>New Inquiry from Portfolio Website</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br/>')}</p>
        `
      });
      console.log(`[Contact Submission] Email dispatched to ${CANDIDATE_INFO.email}`);
    }

    return res.status(200).json({
      success: true,
      message: "Thank you for reaching out! Your message has been recorded.",
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("[Contact API Error]", error);
    return res.status(500).json({
      success: false,
      error: "Failed to process inquiry. Please try emailing directly to sathishkinga8@gmail.com."
    });
  }
});

// Resume Download Endpoint
app.get('/api/resume', (req, res) => {
  const primaryPath = path.join(process.cwd(), 'frontend', 'public', 'sathish S-digital marketing_Resume.1pdf.pdf');
  const secondaryPath = path.join(__dirname, '..', 'frontend', 'public', 'sathish S-digital marketing_Resume.1pdf.pdf');
  const fallbackPath = path.join(__dirname, '..', 'frontend', 'public', 'resume.pdf');
  
  let resumePath = fallbackPath;
  if (fs.existsSync(primaryPath)) {
    resumePath = primaryPath;
  } else if (fs.existsSync(secondaryPath)) {
    resumePath = secondaryPath;
  }

  res.download(resumePath, 'Sathish_S_Digital_Marketing_Resume.pdf', (err) => {
    if (err) {
      console.error("[Resume Download Error]", err);
      if (!res.headersSent) {
        res.status(404).json({ error: "Resume file not found." });
      }
    }
  });
});

// Start Server locally if not imported as serverless handler
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(` Sathish S. Digital Marketing Portfolio Backend API `);
    console.log(` Server running on: http://localhost:${PORT}      `);
    console.log(`====================================================`);
  });
}

export default app;
