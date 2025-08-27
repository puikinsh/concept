import { logger } from '../utils/logger.js';

// Product Single Page functionality
export function initializeProductSingle() {
  // Initialize star rating for review
  initializeStarRating();

  // Handle add to cart
  const addToCartBtn = document.querySelector('.btn-primary.btn-lg');
  if (addToCartBtn && addToCartBtn.textContent.includes('Add to Cart')) {
    addToCartBtn.addEventListener('click', handleAddToCart);
  }

  // Handle buy now
  const buyNowBtn = document.querySelector('.btn-success.btn-lg');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', handleBuyNow);
  }

  // Handle wishlist
  const wishlistBtn = document.querySelector('.btn-outline-secondary.btn-lg');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', toggleWishlist);
  }

  // Handle review form submission
  const reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', handleReviewSubmit);
  }

  // Storage option price updates
  const storageOptions = document.querySelectorAll('input[name="storage"]');
  storageOptions.forEach((option) => {
    option.addEventListener('change', updatePrice);
  });

  // Initialize product image zoom (optional enhancement)
  initializeImageZoom();
}

// Initialize star rating
function initializeStarRating() {
  const stars = document.querySelectorAll('.star-rating i');
  let selectedRating = 0;

  stars.forEach((star) => {
    star.addEventListener('click', function () {
      selectedRating = parseInt(this.getAttribute('data-rating'));
      updateStarDisplay(selectedRating);
    });

    star.addEventListener('mouseenter', function () {
      const rating = parseInt(this.getAttribute('data-rating'));
      updateStarDisplay(rating);
    });
  });

  document.querySelector('.star-rating').addEventListener('mouseleave', () => {
    updateStarDisplay(selectedRating);
  });

  function updateStarDisplay(rating) {
    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.remove('far');
        star.classList.add('fas', 'text-warning');
      } else {
        star.classList.remove('fas', 'text-warning');
        star.classList.add('far');
      }
    });
  }
}

// Handle add to cart
function handleAddToCart() {
  const productName = document.querySelector('.product-info h1').textContent;
  const quantity = document.getElementById('quantity').value;
  const color = document.querySelector('input[name="color"]:checked').nextElementSibling
    .textContent;
  const storage = document.querySelector('input[name="storage"]:checked').nextElementSibling
    .textContent;

  const cartItem = {
    name: productName,
    quantity,
    color,
    storage,
    price: getCurrentPrice()
  };

  // In real app, would add to cart state/backend
  logger.info('Adding to cart:', cartItem);

  showNotification(`${productName} added to cart!`, 'success');
  updateCartCounter();
}

// Handle buy now
function handleBuyNow() {
  const productName = document.querySelector('.product-info h1').textContent;

  // In real app, would redirect to checkout with product
  logger.info('Buy now:', productName);

  // For demo, just show notification
  showNotification('Redirecting to checkout...', 'info');

  // Simulate redirect
  setTimeout(() => {
    window.location.href = '/pages/ecommerce/checkout.html';
  }, 1500);
}

// Toggle wishlist
function toggleWishlist(e) {
  const btn = e.currentTarget;
  const icon = btn.querySelector('i');
  const productName = document.querySelector('.product-info h1').textContent;

  if (icon.classList.contains('far')) {
    icon.classList.remove('far');
    icon.classList.add('fas', 'text-danger');
    showNotification(`${productName} added to wishlist!`, 'success');
  } else {
    icon.classList.remove('fas', 'text-danger');
    icon.classList.add('far');
    showNotification(`${productName} removed from wishlist!`, 'info');
  }
}

// Handle review submission
function handleReviewSubmit(e) {
  e.preventDefault();

  const rating = document.querySelectorAll('.star-rating .fas').length;
  const title = document.getElementById('reviewTitle').value;
  const text = document.getElementById('reviewText').value;
  const name = document.getElementById('reviewName').value;
  const email = document.getElementById('reviewEmail').value;

  if (rating === 0) {
    showNotification('Please select a rating', 'warning');
    return;
  }

  const review = {
    rating,
    title,
    text,
    name,
    email,
    date: new Date().toISOString()
  };

  // In real app, would submit to backend
  logger.info('Submitting review:', review);

  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('reviewModal'));
  modal.hide();

  // Reset form
  e.target.reset();
  document.querySelectorAll('.star-rating i').forEach((star) => {
    star.classList.remove('fas', 'text-warning');
    star.classList.add('far');
  });

  showNotification('Thank you for your review!', 'success');
}

// Update price based on storage selection
function updatePrice() {
  const basePrice = 1199;
  const storagePrices = {
    '256GB': 0,
    '512GB': 200,
    '1TB': 600
  };

  const selectedStorage = document.querySelector('input[name="storage"]:checked').nextElementSibling
    .textContent;
  const newPrice = basePrice + (storagePrices[selectedStorage] || 0);

  document.querySelector('.price h3').textContent = `$${newPrice.toFixed(2)}`;
}

// Get current price
function getCurrentPrice() {
  return document.querySelector('.price h3').textContent;
}

// Initialize image zoom (basic implementation)
function initializeImageZoom() {
  const mainImage = document.getElementById('mainImage');
  if (!mainImage) return;

  mainImage.addEventListener('mouseenter', function () {
    this.style.cursor = 'zoom-in';
  });

  mainImage.addEventListener('click', () => {
    // In real app, would open lightbox or zoom modal
    logger.info('Image zoom clicked');
  });
}

// Update cart counter
function updateCartCounter() {
  const cartCounter = document.querySelector('.cart-counter');
  if (cartCounter) {
    const currentCount = parseInt(cartCounter.textContent) || 0;
    cartCounter.textContent = currentCount + 1;
  }
}

// Show notification
function showNotification(message, type = 'info') {
  const alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3" role="alert" style="z-index: 1050;">
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
  }, 3000);
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeProductSingle);
} else {
  initializeProductSingle();
}
