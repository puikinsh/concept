import { logger } from '../utils/logger.js';

// Influencer Profile Page functionality
export function initializeInfluencerProfile() {
  // Initialize tabs
  initializeTabs();

  // Initialize campaign metrics
  initializeCampaignMetrics();

  // Initialize message form
  initializeMessageForm();

  // Initialize tooltips
  initializeTooltips();

  // Initialize rating animations
  initializeRatingAnimations();
}

// Initialize tabs
function initializeTabs() {
  const tabButtons = document.querySelectorAll('[data-bs-toggle="pill"]');

  tabButtons.forEach((button) => {
    button.addEventListener('shown.bs.tab', (e) => {
      // Tab changed event
      const targetTab = e.target.getAttribute('data-bs-target');
      logger.info('Switched to tab:', targetTab);

      // Animate content on tab change
      const tabContent = document.querySelector(targetTab);
      if (tabContent) {
        animateTabContent(tabContent);
      }
    });
  });
}

// Animate tab content
function animateTabContent(content) {
  content.style.opacity = '0';
  content.style.transform = 'translateY(10px)';

  setTimeout(() => {
    content.style.transition = 'all 0.3s ease';
    content.style.opacity = '1';
    content.style.transform = 'translateY(0)';
  }, 50);
}

// Initialize campaign metrics animations
function initializeCampaignMetrics() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateMetrics(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  // Observe all metric cards
  document.querySelectorAll('.campaign-metric').forEach((metric) => {
    observer.observe(metric);
  });

  // Observe stat cards
  document.querySelectorAll('.card-body h1').forEach((stat) => {
    observer.observe(stat);
  });
}

// Animate metrics
function animateMetrics(element) {
  const value = element.querySelector('h5, h1');
  if (!value) return;

  const finalValue = value.textContent;
  const isNumeric = /^\d+k?$/i.test(finalValue);

  if (isNumeric) {
    const numericValue = parseFloat(finalValue);
    const suffix = finalValue.includes('k') ? 'k' : '';
    let currentValue = 0;
    const increment = numericValue / 30;
    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= numericValue) {
        currentValue = numericValue;
        clearInterval(timer);
      }
      value.textContent = Math.round(currentValue) + suffix;
    }, 30);
  }

  // Scale animation
  element.style.transform = 'scale(1.1)';
  setTimeout(() => {
    element.style.transform = 'scale(1)';
  }, 300);
}

// Initialize message form
function initializeMessageForm() {
  const form = document.getElementById('messageForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const _formData = {
      name: document.getElementById('yourName').value,
      email: document.getElementById('yourEmail').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalHtml = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
    submitBtn.disabled = true;

    // Simulate sending message
    setTimeout(() => {
      // Reset button
      submitBtn.innerHTML = originalHtml;
      submitBtn.disabled = false;

      // Show success message
      showNotification('Message sent successfully! Michael will get back to you soon.', 'success');

      // Reset form
      form.reset();

      // Switch to reviews tab
      const reviewsTab = document.getElementById('reviews-tab');
      if (reviewsTab) {
        reviewsTab.click();
      }
    }, 2000);
  });
}

// Initialize tooltips
function initializeTooltips() {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map((tooltipTriggerEl) => {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

// Initialize rating animations
function initializeRatingAnimations() {
  const ratingBlocks = document.querySelectorAll('.rating-star');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateRatingStars(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  ratingBlocks.forEach((block) => {
    observer.observe(block);
  });
}

// Animate rating stars
function animateRatingStars(ratingBlock) {
  const stars = ratingBlock.querySelectorAll('i');
  stars.forEach((star, index) => {
    setTimeout(() => {
      star.style.transform = 'scale(0)';
      star.style.transition = 'transform 0.3s ease';

      setTimeout(() => {
        star.style.transform = 'scale(1.2)';
        setTimeout(() => {
          star.style.transform = 'scale(1)';
        }, 150);
      }, 50);
    }, index * 100);
  });
}

// Handle package selection
document.addEventListener('click', (e) => {
  if (e.target.matches('.pricing-card .btn')) {
    e.preventDefault();
    const card = e.target.closest('.pricing-card');
    const packageName = card.querySelector('.card-header h4').textContent;
    const price = card.querySelector('.card-body h1').textContent;

    showNotification(
      `Selected ${packageName} package (${price}/month). Redirecting to checkout...`,
      'info'
    );
  }
});

// Show notification
function showNotification(message, type = 'info') {
  const alertClass = type === 'error' ? 'danger' : type;
  const alertHtml = `
        <div class="alert alert-${alertClass} alert-dismissible fade show position-fixed top-0 end-0 m-3" role="alert" style="z-index: 1050;">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

  document.body.insertAdjacentHTML('beforeend', alertHtml);

  setTimeout(() => {
    const alert = document.querySelector('.alert');
    if (alert) {
      alert.remove();
    }
  }, 5000);
}

// Social channel hover effects
document.addEventListener('DOMContentLoaded', () => {
  const socialLinks = document.querySelectorAll('.social-channels a');

  socialLinks.forEach((link) => {
    link.addEventListener('mouseenter', function () {
      const icon = this.querySelector('i');
      if (icon) {
        icon.style.transform = 'scale(1.2) rotate(5deg)';
      }
    });

    link.addEventListener('mouseleave', function () {
      const icon = this.querySelector('i');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0)';
      }
    });
  });
});

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeInfluencerProfile);
} else {
  initializeInfluencerProfile();
}
