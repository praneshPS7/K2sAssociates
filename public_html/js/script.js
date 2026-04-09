// Loading animation
window.addEventListener('load', function() {
  // Check if this is a page refresh (not initial navigation)
  const navigationEntries = performance.getEntriesByType('navigation');
  if (navigationEntries.length > 0 && navigationEntries[0].type === 'reload') {
    // If refreshed and not on home page, redirect to home
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage !== 'index.html' && currentPage !== '') {
      window.location.href = 'index.html';
      return;
    }
  }

  const loading = document.querySelector('.loading');
  if (loading) {
    setTimeout(() => {
      loading.classList.add('hidden');
    }, 1000);
  }

  // Set active navigation based on current page
  setActiveNavigation();
});

// Set active navigation based on current page
function setActiveNavigation() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
  });
  
  // Find and activate the current page link
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || 
        (currentPage === '' && href === 'index.html') ||
        (currentPage === '/' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Animate cards
      const cards = entry.target.querySelectorAll('.card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('visible');
        }, index * 100);
      });

      // Animate service items
      const serviceItems = entry.target.querySelectorAll('.service-item');
      serviceItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('visible');
        }, index * 50);
      });
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {

  // Observe sections
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => observer.observe(section));

  // Hero visible immediately
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.opacity = '1';
  }

  // Highlight service from URL hash
  const hash = window.location.hash.substring(1);
  if (hash) {
    const selectedService = document.getElementById(hash);
    if (selectedService) {
      selectedService.classList.add('service-highlighted');
      setTimeout(() => {
        selectedService.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }

});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Parallax + Scroll effects
window.addEventListener('scroll', function() {

  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  const servicesSection = document.querySelector('#services');

  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.4}px)`;
  }

  if (heroContent && servicesSection) {
    const servicesTop = servicesSection.offsetTop;
    if (scrolled > servicesTop - 400) {
      heroContent.classList.add('hidden');
    } else {
      heroContent.classList.remove('hidden');
    }
  }

  // Background fade
  const maxScroll = 300;
  const opacity = Math.max(0.3, 1 - (scrolled / maxScroll));
  document.body.style.background = 
    `linear-gradient(to bottom, rgba(51, 51, 51, ${opacity}), rgba(85, 85, 85, ${opacity}))`;

  // Back to top button
  const backToTopButton = document.getElementById('backToTop');
  if (backToTopButton) {
    if (scrolled > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  }

});

console.log("Website Loaded Successfully with Animations");
