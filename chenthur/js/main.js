/* =====================================================
   CHENTHUR JEWELLERS - Main JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Loading Screen ----
  initLoader();
  
  // ---- Header Scroll Effect ----
  initHeaderScroll();
  
  // ---- Mobile Menu ----
  initMobileMenu();
  
  // ---- Scroll Reveal Animations ----
  initScrollReveal();
  
  // ---- Animated Counters ----
  initCounters();
  
  // ---- Back to Top Button ----
  initBackToTop();
  
  // ---- Hero Particles ----
  initHeroParticles();
  
  // ---- Gallery Filters ----
  initGalleryFilters();
  
  // ---- Lightbox ----
  initLightbox();
  
  // ---- Smooth Scroll for Nav Links ----
  initSmoothScroll();
  
  // ---- Active Nav Link ----
  setActiveNavLink();
});

/* ---- Loading Screen ---- */
function initLoader() {
  const loader = document.querySelector('.loader');
  if (!loader) return;
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 1800);
  });
  
  // Fallback: hide loader after 3 seconds max
  setTimeout(() => {
    if (loader && !loader.classList.contains('hidden')) {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }, 3000);
}

/* ---- Header Scroll ---- */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  }, { passive: true });
}

/* ---- Mobile Menu ---- */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-menu');
  if (!toggle || !menu) return;
  
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
  });
  
  // Close menu when clicking a link
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('active')) {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ---- Scroll Reveal ---- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => revealObserver.observe(el));
}

/* ---- Animated Counters ---- */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length === 0) return;
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-count'), 10);
  const suffix = element.getAttribute('data-suffix') || '';
  const duration = 2000;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease-out cubic
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(easedProgress * target);
    
    element.textContent = current + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

/* ---- Back to Top ---- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });
  
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---- Hero Particles ---- */
function initHeroParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.classList.add('hero-particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (5 + Math.random() * 5) + 's';
    particle.style.width = (2 + Math.random() * 3) + 'px';
    particle.style.height = particle.style.width;
    container.appendChild(particle);
  }
}

/* ---- Gallery Filters ---- */
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (filterBtns.length === 0 || galleryItems.length === 0) return;
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      galleryItems.forEach((item, index) => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          item.style.display = '';
          item.style.animation = `fadeInUp 0.5s ease ${index * 0.05}s both`;
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ---- Lightbox ---- */
function initLightbox() {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;
  
  const lightboxImg = lightbox.querySelector('img');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  
  // Open lightbox on gallery item click
  document.querySelectorAll('.gallery-item img, .collection-card-image img').forEach(img => {
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Close lightbox
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
  
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ---- Smooth Scroll ---- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ---- Active Nav Link ---- */
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ---- Form Handling ---- */
document.addEventListener('submit', (e) => {
  if (e.target.classList.contains('contact-form')) {
    e.preventDefault();
    
    const btn = e.target.querySelector('.btn');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '✓ Message Sent!';
    btn.style.background = '#25D366';
    btn.style.borderColor = '#25D366';
    
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.style.borderColor = '';
      e.target.reset();
    }, 3000);
  }
});
