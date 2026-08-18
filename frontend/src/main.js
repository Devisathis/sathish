import './style.css';

// Project Case Study Data
const projectData = {
  medplus: {
    tag: "SEO Audit · Competitor Analysis",
    title: "SEO & Competitor Analysis — MedPlus",
    tools: "Google Search Console, Google Analytics, Keyword Research Tools",
    challenge: "MedPlus needed a clearer picture of how their website performed against competitors in search visibility, keyword targeting, and content structure. The goal was to identify gaps holding back organic growth.",
    process: [
      "Analyzed competitor websites to understand their SEO strategies and keyword usage",
      "Conducted keyword research to map opportunities MedPlus wasn't currently targeting",
      "Reviewed on-page elements — headings, metadata, and internal linking — for optimization gaps",
      "Evaluated overall online presence and content structure"
    ],
    findings: [
      "Identified specific content gaps where competitors were outranking on target keywords",
      "Found metadata and heading structure issues limiting on-page SEO performance",
      "Spotted opportunities to strengthen internal linking for better site architecture"
    ],
    recommendations: "A structured competitor analysis report outlining prioritized SEO improvements — keyword targets to pursue, on-page fixes, and content gaps to fill.",
    outcome: "Delivered a clear, actionable SEO roadmap the client could use to close the visibility gap with competitors."
  },
  comparative: {
    tag: "Comparative SEO Analysis",
    title: "MedPlus vs Deepa Medical — SEO Analysis",
    tools: "Google Search Console, Google Analytics, Keyword Research Tools, Google Sheets",
    challenge: "Conducted comparative website SEO analysis across two healthcare sites, reviewing keyword usage, structure, and metadata to identify visibility gaps.",
    process: [
      "Assessed website speed, mobile responsiveness, and page hierarchy across both domains",
      "Analyzed metadata index efficiency, target keyword clustering, and local query reach",
      "Benchmarked local organic map placement and localized citation consistency",
      "Reviewed active content posting frequency and current social media brand touchpoints"
    ],
    findings: [
      "Found significant keyword target overlaps, with Deepa Medical outranking MedPlus on specific local searches",
      "Discovered empty image alt text tags and duplicate header layouts limiting crawling ease on MedPlus",
      "Identified opportunities to improve citation trust through schema markup updates"
    ],
    recommendations: "Recommended targeted local schema injection, restructuring header titles to prevent keyword cannibalization, and establishing consistent Google Business Profile listings.",
    outcome: "Delivered a thorough comparative report clarifying performance gaps and offering structured technical steps to capture local search visibility."
  },
  social: {
    tag: "Social Media & Content",
    title: "Social Media Content & Brand Promotion",
    tools: "Canva, Meta Business Suite, LinkedIn Analytics, AI Tools",
    challenge: "MedPlus needed to grow brand visibility and audience engagement on Instagram and LinkedIn through cohesive content planning.",
    process: [
      "Created structured copy, captions, custom tags, and interactive content hooks",
      "Developed trend-aligned content topics built around user search queries",
      "Designed visual layouts and custom post formats matching the brand style guide",
      "Structured monthly scheduling and distribution patterns aligned with target demographics"
    ],
    findings: [
      "Observed 35% higher user interactions when deploying educational content compared to direct promotions",
      "Found specific caption keywords and custom hooks that elevated content retention rates",
      "Identified optimal active posting hours for highest demographic response"
    ],
    recommendations: "A full multi-channel content guide detailing optimized posting intervals, specific hashtag lists, and templates for caption hooks.",
    outcome: "Established a strategic promotional calendar structure that drove increased profile views and platform interactions."
  }
};

document.addEventListener('DOMContentLoaded', () => {

  // Navbar Sticky Shadow Scroll Handler
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('shadow-md', 'bg-[#FAF9F6]/95');
      navbar.classList.remove('shadow-sm', 'bg-[#FAF9F6]/90');
    } else {
      navbar.classList.remove('shadow-md', 'bg-[#FAF9F6]/95');
      navbar.classList.add('shadow-sm', 'bg-[#FAF9F6]/90');
    }
  });

  // Mobile Menu Drawer Handler
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileMenuToggle && mobileDrawer) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
    });

    // Close drawer when link is clicked
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.add('hidden');
      });
    });
  }

  // Scroll Reveal Animations using Intersection Observer
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // Case Study Details Modal Interactivity
  const modal = document.getElementById('case-study-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalFooterCloseBtn = document.getElementById('modal-footer-close');
  
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalTools = document.getElementById('modal-tools');
  const modalChallenge = document.getElementById('modal-challenge');
  const modalProcess = document.getElementById('modal-process');
  const modalFindings = document.getElementById('modal-findings');
  const modalRecommendations = document.getElementById('modal-recommendations');
  const modalOutcome = document.getElementById('modal-outcome');

  const openModal = (projectId) => {
    const data = projectData[projectId];
    if (!data) return;

    // Inject data
    modalTag.textContent = data.tag;
    modalTitle.textContent = data.title;
    modalTools.textContent = data.tools;
    modalChallenge.textContent = data.challenge;
    
    // Clear list structures
    modalProcess.innerHTML = '';
    modalFindings.innerHTML = '';

    // Populate process list
    data.process.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      modalProcess.appendChild(li);
    });

    // Populate findings list
    data.findings.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      modalFindings.appendChild(li);
    });

    modalRecommendations.textContent = data.recommendations;
    modalOutcome.textContent = data.outcome;

    // Show modal and lock page scrolling
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  // Bind Open Buttons
  document.querySelectorAll('.project-details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projectId = e.currentTarget.getAttribute('data-project');
      openModal(projectId);
    });
  });

  // Bind Close Buttons
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalFooterCloseBtn) modalFooterCloseBtn.addEventListener('click', closeModal);
  
  // Close on outside click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Contact Form Submission Handler
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Retrieve form details
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const subject = document.getElementById('form-subject').value;
      const message = document.getElementById('form-message').value;

      // Update feedback ui to loading
      formFeedback.classList.remove('hidden', 'bg-red-500/10', 'text-red-600', 'bg-green-500/10', 'text-green-600');
      formFeedback.classList.add('bg-[#1F3A2E]/10', 'text-[#1F3A2E]');
      formFeedback.textContent = 'Submitting message inquiry...';

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, subject, message }),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          formFeedback.classList.remove('bg-[#1F3A2E]/10', 'text-[#1F3A2E]');
          formFeedback.classList.add('bg-green-500/10', 'text-green-600');
          formFeedback.textContent = result.message || 'Thank you! Your message has been sent successfully.';
          contactForm.reset();
        } else {
          throw new Error(result.error || 'Failed to submit the form.');
        }
      } catch (err) {
        console.error('Error submitting form', err);
        formFeedback.classList.remove('bg-[#1F3A2E]/10', 'text-[#1F3A2E]');
        formFeedback.classList.add('bg-red-500/10', 'text-red-600');
        formFeedback.textContent = err.message || 'Submission failed. Please email directly to sathishkinga8@gmail.com.';
      }
    });
  }

});
