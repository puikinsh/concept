// Import Bootstrap
import * as bootstrap from 'bootstrap';
import { logger } from '../utils/logger.js';

// E-commerce Products Page functionality
export function initializeProducts() {
  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map((tooltipTriggerEl) => {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Product search functionality
  const searchInput = document.getElementById('productSearch');
  if (searchInput) {
    searchInput.addEventListener(
      'keyup',
      debounce((e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterProducts(searchTerm);
      }, 300)
    );
  }

  // Category filter
  const categoryFilter = document.getElementById('categoryFilter');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', () => {
      applyFilters();
    });
  }

  // Sort functionality
  const sortBy = document.getElementById('sortBy');
  if (sortBy) {
    sortBy.addEventListener('change', function () {
      sortProducts(this.value);
    });
  }

  // Add to cart buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('.btn-primary') && e.target.textContent.includes('Add to Cart')) {
      e.preventDefault();
      const productCard = e.target.closest('.product-card');
      const productName = productCard.querySelector('.card-title a').textContent;
      addToCart(productName);
    }
  });

  // Wishlist buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('.product-actions .btn')) {
      const btn = e.target.closest('.btn');
      if (btn.querySelector('.fa-heart')) {
        e.preventDefault();
        toggleWishlist(btn);
      }
    }
  });

  // Add product form
  const addProductForm = document.getElementById('addProductForm');
  if (addProductForm) {
    addProductForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleAddProduct();
    });
  }

  // Quick view functionality
  document.addEventListener('click', (e) => {
    if (e.target.closest('.product-actions .btn')) {
      const btn = e.target.closest('.btn');
      if (btn.querySelector('.fa-eye')) {
        e.preventDefault();
        const productCard = btn.closest('.product-card');
        showQuickView(productCard);
      }
    }
  });
}

// Debounce helper
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Filter products by search term
function filterProducts(searchTerm) {
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach((card) => {
    const productName = card.querySelector('.card-title').textContent.toLowerCase();
    const productDescription = card.querySelector('.text-muted.small').textContent.toLowerCase();

    if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
      card.parentElement.style.display = '';
    } else {
      card.parentElement.style.display = 'none';
    }
  });
}

// Apply all filters
function applyFilters() {
  const category = document.getElementById('categoryFilter').value;
  const searchTerm = document.getElementById('productSearch').value.toLowerCase();

  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach((card) => {
    let show = true;

    // Apply search filter
    if (searchTerm) {
      const productName = card.querySelector('.card-title').textContent.toLowerCase();
      const productDescription = card.querySelector('.text-muted.small').textContent.toLowerCase();
      show = productName.includes(searchTerm) || productDescription.includes(searchTerm);
    }

    // Apply category filter (would need data attributes on cards in real implementation)
    if (category && show) {
      // In a real app, you'd check the product's category
      // For demo purposes, we'll just show all for now
    }

    card.parentElement.style.display = show ? '' : 'none';
  });
}

// Sort products
function sortProducts(sortType) {
  const container = document.querySelector('.row').parentElement;
  const productCols = Array.from(container.querySelectorAll('.col-xl-3.col-lg-4'));

  productCols.sort((a, b) => {
    const priceA = parseFloat(a.querySelector('.h5.text-primary').textContent.replace('$', ''));
    const priceB = parseFloat(b.querySelector('.h5.text-primary').textContent.replace('$', ''));
    const nameA = a.querySelector('.card-title a').textContent;
    const nameB = b.querySelector('.card-title a').textContent;

    switch (sortType) {
      case 'price-low':
        return priceA - priceB;
      case 'price-high':
        return priceB - priceA;
      case 'newest':
        // In real app, would sort by date
        return 0;
      case 'rating':
        // In real app, would sort by rating
        return 0;
      default:
        return nameA.localeCompare(nameB);
    }
  });

  // Re-append sorted elements
  productCols.forEach((col) => container.appendChild(col));
}

// Add to cart
function addToCart(productName) {
  // Show success notification
  const alertHtml = `
        <div class="alert alert-success alert-dismissible fade show position-fixed top-0 end-0 m-3" role="alert" style="z-index: 1050;">
            <i class="fas fa-check-circle me-2"></i>
            <strong>${productName}</strong> added to cart!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

  document.body.insertAdjacentHTML('beforeend', alertHtml);

  // Auto-dismiss after 3 seconds
  setTimeout(() => {
    const alert = document.querySelector('.alert');
    if (alert) {
      const bsAlert = new bootstrap.Alert(alert);
      bsAlert.close();
    }
  }, 3000);

  // Update cart counter (if exists)
  updateCartCounter();
}

// Toggle wishlist
function toggleWishlist(btn) {
  const icon = btn.querySelector('i');
  const productCard = btn.closest('.product-card');
  const productName = productCard.querySelector('.card-title a').textContent;

  if (icon.classList.contains('far')) {
    // Add to wishlist
    icon.classList.remove('far');
    icon.classList.add('fas', 'text-danger');
    showNotification(`${productName} added to wishlist!`, 'success');
  } else {
    // Remove from wishlist
    icon.classList.remove('fas', 'text-danger');
    icon.classList.add('far');
    showNotification(`${productName} removed from wishlist!`, 'info');
  }
}

// Handle add product
function handleAddProduct() {
  const formData = {
    name: document.getElementById('productName').value,
    category: document.getElementById('productCategory').value,
    price: document.getElementById('productPrice').value,
    stock: document.getElementById('productStock').value,
    sku: document.getElementById('productSKU').value,
    description: document.getElementById('productDescription').value
  };

  // In real app, would send to server
  logger.info('Adding product:', formData);

  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
  if (modal) {
    modal.hide();
  }

  // Reset form
  document.getElementById('addProductForm').reset();

  // Show success message
  showNotification('Product added successfully!', 'success');
}

// Show quick view
function showQuickView(productCard) {
  const productName = productCard.querySelector('.card-title a').textContent;
  const _price = productCard.querySelector('.h5.text-primary').textContent;
  const _description = productCard.querySelector('.text-muted.small').textContent;

  // In a real app, this would open a modal with full product details
  logger.info('Quick view for:', productName);
  showNotification(`Quick view: ${productName}`, 'info');
}

// Update cart counter
function updateCartCounter() {
  // In real app, would update actual cart count
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
  document.addEventListener('DOMContentLoaded', initializeProducts);
} else {
  initializeProducts();
}
