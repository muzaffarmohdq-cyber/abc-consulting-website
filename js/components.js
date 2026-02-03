/**
 * ABC Business Management Consultant
 * Reusable UI Components
 */

/**
 * Modal Component
 */
class Modal {
  constructor(modalId) {
    this.modal = document.getElementById(modalId);
    this.closeBtn = this.modal ? this.modal.querySelector('.modal-close') : null;
    this.init();
  }
  
  init() {
    if (!this.modal) return;
    
    // Close on close button click
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }
    
    // Close on outside click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('show')) {
        this.close();
      }
    });
  }
  
  open() {
    if (this.modal) {
      this.modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }
  
  close() {
    if (this.modal) {
      this.modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  }
}

/**
 * Alert Component
 */
function showAlert(message, type = 'info', duration = 5000) {
  const alertContainer = document.createElement('div');
  alertContainer.className = `alert alert-${type}`;
  alertContainer.innerHTML = message;
  
  // Find or create alert wrapper
  let alertWrapper = document.querySelector('.alert-wrapper');
  if (!alertWrapper) {
    alertWrapper = document.createElement('div');
    alertWrapper.className = 'alert-wrapper';
    alertWrapper.style.position = 'fixed';
    alertWrapper.style.top = '20px';
    alertWrapper.style.right = '20px';
    alertWrapper.style.zIndex = '10000';
    alertWrapper.style.maxWidth = '400px';
    document.body.appendChild(alertWrapper);
  }
  
  alertWrapper.appendChild(alertContainer);
  
  // Auto remove after duration
  if (duration > 0) {
    setTimeout(() => {
      alertContainer.style.opacity = '0';
      setTimeout(() => {
        alertContainer.remove();
      }, 300);
    }, duration);
  }
  
  return alertContainer;
}

/**
 * Loading Spinner
 */
function showSpinner(container) {
  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  spinner.id = 'loading-spinner';
  
  if (container) {
    container.appendChild(spinner);
  } else {
    document.body.appendChild(spinner);
  }
  
  return spinner;
}

function hideSpinner() {
  const spinner = document.getElementById('loading-spinner');
  if (spinner) {
    spinner.remove();
  }
}

/**
 * Testimonial Carousel (Simple)
 */
class TestimonialCarousel {
  constructor(carouselId) {
    this.carousel = document.getElementById(carouselId);
    this.items = this.carousel ? this.carousel.querySelectorAll('.carousel-item') : [];
    this.currentIndex = 0;
    this.autoplayInterval = null;
    this.init();
  }
  
  init() {
    if (!this.carousel || this.items.length === 0) return;
    
    // Show first item
    this.showItem(0);
    
    // Create navigation buttons
    this.createNavigation();
    
    // Auto play
    this.startAutoplay();
  }
  
  createNavigation() {
    const navContainer = document.createElement('div');
    navContainer.className = 'carousel-nav';
    navContainer.style.display = 'flex';
    navContainer.style.justifyContent = 'center';
    navContainer.style.gap = '10px';
    navContainer.style.marginTop = '20px';
    
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '←';
    prevBtn.className = 'btn btn-secondary';
    prevBtn.addEventListener('click', () => this.prev());
    
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '→';
    nextBtn.className = 'btn btn-secondary';
    nextBtn.addEventListener('click', () => this.next());
    
    navContainer.appendChild(prevBtn);
    navContainer.appendChild(nextBtn);
    this.carousel.appendChild(navContainer);
  }
  
  showItem(index) {
    this.items.forEach((item, i) => {
      if (i === index) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
    this.currentIndex = index;
  }
  
  next() {
    const nextIndex = (this.currentIndex + 1) % this.items.length;
    this.showItem(nextIndex);
    this.resetAutoplay();
  }
  
  prev() {
    const prevIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.showItem(prevIndex);
    this.resetAutoplay();
  }
  
  startAutoplay(interval = 5000) {
    this.autoplayInterval = setInterval(() => {
      this.next();
    }, interval);
  }
  
  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }
  
  resetAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  }
}

/**
 * Statistics Counter Animation
 */
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

/**
 * Initialize counters when they come into view
 */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        const target = parseInt(entry.target.getAttribute('data-count'));
        animateCounter(entry.target, target);
        entry.target.classList.add('counted');
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => {
    observer.observe(counter);
  });
}

// Initialize counters on page load
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.stat-number[data-count]')) {
    initCounters();
  }
});

/**
 * Lazy Load Images
 */
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => {
    imageObserver.observe(img);
  });
}

// Initialize lazy loading on page load
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('img[data-src]')) {
    initLazyLoading();
  }
});

/**
 * Copy to Clipboard
 */
function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showAlert('Copied to clipboard!', 'success', 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  } else {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showAlert('Copied to clipboard!', 'success', 2000);
  }
}

/**
 * Export components for use in other files
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Modal,
    showAlert,
    showSpinner,
    hideSpinner,
    TestimonialCarousel,
    animateCounter,
    copyToClipboard
  };
}
