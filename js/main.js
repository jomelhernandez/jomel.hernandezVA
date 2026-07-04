// ============================================================
// DARK MODE TOGGLE
// ============================================================
(function() {
  const darkToggle = document.getElementById('darkToggle');
  const darkIcon = document.getElementById('darkIcon');
  const darkLabel = document.getElementById('darkLabel');
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    darkIcon.className = 'fas fa-sun';
    darkLabel.textContent = 'Light';
  }
  
  darkToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      darkIcon.className = 'fas fa-moon';
      darkLabel.textContent = 'Dark';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      darkIcon.className = 'fas fa-sun';
      darkLabel.textContent = 'Light';
    }
  });
})();

// ============================================================
// CUSTOM CURSOR (Desktop only)
// ============================================================
(function() {
  if (window.innerWidth <= 768) return;
  
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);
  
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });
  
  // Smooth ring follow
  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
  
  // Hover effect on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .card, .service-card, .testimonial-card, .icon-box, .faq-item, .contact-card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
      ring.classList.add('hover');
      dot.style.width = '4px';
      dot.style.height = '4px';
    });
    el.addEventListener('mouseleave', function() {
      ring.classList.remove('hover');
      dot.style.width = '8px';
      dot.style.height = '8px';
    });
  });
})();

// ============================================================
// BACK TO TOP BUTTON
// ============================================================
(function() {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
  backToTop.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ============================================================
// FLOATING NAVIGATION - HIGHLIGHT ACTIVE SECTION
// ============================================================
(function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.floating-nav a');
  if (sections.length === 0 || navLinks.length === 0) return;
  
  window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  });
})();

// ============================================================
// SMOOTH SCROLL FOR NAV LINKS (Floating Nav)
// ============================================================
(function() {
  document.querySelectorAll('.floating-nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

// ============================================================
// FADE-IN ON SCROLL
// ============================================================
(function() {
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });
  
  fadeElements.forEach(el => observer.observe(el));
})();

// ============================================================
// SKILLS PROGRESS BARS - ANIMATE ON SCROLL
// ============================================================
(function() {
  const skillFills = document.querySelectorAll('.skill-bar .fill');
  if (skillFills.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.5 });
  
  skillFills.forEach(el => observer.observe(el));
})();

// ============================================================
// SERVICE CARD FOLD / EXPAND
// ============================================================
(function() {
  const toggles = document.querySelectorAll('.fold-toggle');
  if (toggles.length === 0) return;
  
  toggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const content = document.getElementById(targetId);
      const icon = this.querySelector('i');
      const span = this.querySelector('span');
      
      if (content) {
        content.classList.toggle('open');
        this.classList.toggle('open');
        
        if (content.classList.contains('open')) {
          span.textContent = 'Show Less';
        } else {
          span.textContent = 'Learn More';
        }
      }
    });
  });
})();

// ============================================================
// FAQ ACCORDION
// ============================================================
(function() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  if (faqQuestions.length === 0) return;
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      const icon = this.querySelector('i');
      
      // Close other open FAQs
      faqQuestions.forEach(q => {
        if (q !== this) {
          q.classList.remove('open');
          q.nextElementSibling.classList.remove('open');
        }
      });
      
      // Toggle this one
      this.classList.toggle('open');
      answer.classList.toggle('open');
    });
  });
})();

// ============================================================
// STICKY CTA BAR - HIDE ON SCROLL DOWN, SHOW ON SCROLL UP
// ============================================================
(function() {
  const stickyCta = document.getElementById('stickyCta');
  if (!stickyCta) return;
  
  let lastScrollY = window.scrollY;
  let isHidden = false;
  
  window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;
    const footer = document.querySelector('footer');
    const footerTop = footer ? footer.offsetTop : Infinity;
    
    // Hide when scrolling down near footer
    if (currentScrollY > footerTop - 200) {
      stickyCta.style.transform = 'translateY(100%)';
      stickyCta.style.opacity = '0';
      return;
    }
    
    // Show/hide based on scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling down - hide
      stickyCta.style.transform = 'translateY(100%)';
      stickyCta.style.opacity = '0';
      isHidden = true;
    } else {
      // Scrolling up - show
      stickyCta.style.transform = 'translateY(0)';
      stickyCta.style.opacity = '1';
      isHidden = false;
    }
    
    lastScrollY = currentScrollY;
  });
})();

// ============================================================
// WHATSAPP FLOATING BUTTON - PULSE ON PAGE LOAD
// ============================================================
(function() {
  const whatsappBtn = document.querySelector('.whatsapp-float');
  if (!whatsappBtn) return;
  
  // Add a subtle initial pulse
  setTimeout(() => {
    whatsappBtn.style.animation = 'none';
    setTimeout(() => {
      whatsappBtn.style.animation = 'pulse 2s infinite';
    }, 50);
  }, 3000);
})();

// ============================================================
// PARALLAX SHAPES - MOUSE FOLLOW (Desktop only)
// ============================================================
(function() {
  if (window.innerWidth <= 768) return;
  
  const shapes = document.querySelectorAll('.parallax-bg .shape');
  if (shapes.length === 0) return;
  
  document.addEventListener('mousemove', function(e) {
    const x = (e.clientX / window.innerWidth) * 20 - 10;
    const y = (e.clientY / window.innerHeight) * 20 - 10;
    
    shapes.forEach((shape, index) => {
      const speed = 0.5 + (index * 0.15);
      shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });
})();

// ============================================================
// NAVBAR ACTIVE LINK (for subpages)
// ============================================================
(function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a:not(.btn-small)');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
})();

// ============================================================
// KEYBOARD ACCESSIBILITY - ENTER/SPACE FOR FOLD TOGGLES
// ============================================================
(function() {
  const toggles = document.querySelectorAll('.fold-toggle, .faq-question');
  toggles.forEach(toggle => {
    toggle.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
})();

// ============================================================
// SMOOTH SCROLL FOR NAVBAR LINKS (index.html)
// ============================================================
(function() {
  // Only for home page anchor links
  const homeLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  homeLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

console.log('🚀 Jomel Hernandez | Virtual Professional');
console.log('📧 jomel.hernandez93@gmail.com');
console.log('📱 +63916-553-4649');
