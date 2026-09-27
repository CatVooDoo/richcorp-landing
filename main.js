/**
 * Rich Corp Website - Main JavaScript
 * Pure vanilla JS implementation
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initContactForm();
  setCurrentYear();
});

/**
 * Navbar scroll effect
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  
  if (!navbar) return;
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  
  // Initial check
  handleScroll();
  
  // Throttled scroll listener
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-menu-link');
  
  if (!mobileToggle || !mobileMenuOverlay) return;
  
  let isOpen = false;
  
  const toggleMenu = () => {
    isOpen = !isOpen;
    
    if (isOpen) {
      mobileMenuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Animate hamburger to X
      const hamburgers = mobileToggle.querySelectorAll('.hamburger');
      hamburgers[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      hamburgers[1].style.opacity = '0';
      hamburgers[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      mobileMenuOverlay.classList.remove('active');
      document.body.style.overflow = '';
      
      // Reset hamburger
      const hamburgers = mobileToggle.querySelectorAll('.hamburger');
      hamburgers[0].style.transform = '';
      hamburgers[0].style.opacity = '';
      hamburgers[1].style.transform = '';
      hamburgers[1].style.opacity = '';
      hamburgers[2].style.transform = '';
    }
  };
  
  mobileToggle.addEventListener('click', toggleMenu);
  
  // Close menu on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (isOpen) {
        toggleMenu();
      }
    });
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      toggleMenu();
    }
  });
}

/**
 * Scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
  // Section titles
  const sectionTitle = document.querySelector('.section-title');
  if (sectionTitle) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '-50px'
    });
    
    observer.observe(sectionTitle);
  }
  
  // Service cards with stagger effect
  const serviceCards = document.querySelectorAll('.service-card');
  if (serviceCards.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add stagger delay via inline style
          entry.target.style.transitionDelay = `${index * 0.1}s`;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '-50px'
    });
    
    serviceCards.forEach(card => observer.observe(card));
  }
  
  // Contact form
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '-50px'
    });
    
    observer.observe(contactForm);
  }
}

/**
 * Contact form handling
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Here you would typically send the data to a server
    // For now, just log and show a success message
    console.log('Form submitted:', data);
    
    // Visual feedback
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span>Отправлено!</span>';
    submitBtn.style.backgroundColor = 'var(--color-accent)';
    submitBtn.style.color = 'var(--color-white)';
    
    // Reset form
    form.reset();
    
    // Reset button after delay
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.style.backgroundColor = '';
      submitBtn.style.color = '';
    }, 3000);
  });
}

/**
 * Set current year in footer
 */
function setCurrentYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
