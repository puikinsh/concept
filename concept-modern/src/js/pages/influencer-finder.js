// Influencer Finder Page functionality
export function initializeInfluencerFinder() {
    // Initialize search functionality
    initializeSearch();
    
    // Initialize filters
    initializeFilters();
    
    // Initialize favorite toggle
    initializeFavorites();
    
    // Initialize tooltips
    initializeTooltips();
    
    // Initialize social stats animation
    initializeSocialStats();
}

// Initialize search functionality
function initializeSearch() {
    const searchForm = document.querySelector('.influencer-search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input[type="search"]');
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                performSearch(searchTerm);
            }
        });
    }
}

// Perform search
function performSearch(searchTerm) {
    console.log('Searching for:', searchTerm);
    
    // Show loading state
    const influencerCards = document.querySelectorAll('.influencer-card');
    influencerCards.forEach(card => {
        card.style.opacity = '0.5';
        card.style.pointerEvents = 'none';
    });
    
    // Simulate search
    setTimeout(() => {
        influencerCards.forEach(card => {
            card.style.opacity = '1';
            card.style.pointerEvents = 'auto';
        });
        
        showNotification(`Found ${influencerCards.length} influencers matching "${searchTerm}"`, 'success');
    }, 1000);
}

// Initialize filters
function initializeFilters() {
    // Sort by change
    const sortBy = document.getElementById('sortBy');
    if (sortBy) {
        sortBy.addEventListener('change', function() {
            applySort(this.value);
        });
    }
    
    // Rating filter
    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    ratingInputs.forEach(input => {
        input.addEventListener('change', function() {
            console.log('Rating filter:', this.value);
        });
    });
    
    // Platform filters
    const platformCheckboxes = document.querySelectorAll('.platform-filter input[type="checkbox"]');
    platformCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateFilterCount();
        });
    });
    
    // Category filters
    const categoryCheckboxes = document.querySelectorAll('.category-filter input[type="checkbox"]');
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateFilterCount();
        });
    });
}

// Apply sorting
function applySort(sortType) {
    console.log('Sorting by:', sortType);
    
    const container = document.querySelector('.col-xl-9');
    const cards = Array.from(document.querySelectorAll('.influencer-card'));
    
    // Sort cards based on type
    cards.sort((a, b) => {
        switch(sortType) {
            case 'followers':
                return getFollowerCount(b) - getFollowerCount(a);
            case 'engagement':
                return Math.random() - 0.5; // Random for demo
            case 'rating':
                return getRating(b) - getRating(a);
            case 'recent':
                return Math.random() - 0.5; // Random for demo
            default:
                return 0;
        }
    });
    
    // Reorder cards in DOM
    cards.forEach(card => {
        container.appendChild(card);
    });
}

// Get follower count from card (simplified)
function getFollowerCount(card) {
    const stats = card.querySelectorAll('.social-stat span.fw-bold');
    let total = 0;
    stats.forEach(stat => {
        const value = stat.textContent;
        const num = parseFloat(value);
        const multiplier = value.includes('M') ? 1000000 : value.includes('K') ? 1000 : 1;
        total += num * multiplier;
    });
    return total;
}

// Get rating from card
function getRating(card) {
    const stars = card.querySelectorAll('.rating-star .fas.fa-star');
    return stars.length;
}

// Update filter count
function updateFilterCount() {
    const activeFilters = document.querySelectorAll('.filter-sidebar input[type="checkbox"]:checked').length;
    console.log('Active filters:', activeFilters);
}

// Initialize favorites
function initializeFavorites() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-outline-secondary') && e.target.closest('.influencer-actions')) {
            const btn = e.target.closest('.btn-outline-secondary');
            toggleFavorite(btn);
        }
        
        if (e.target.closest('.btn-warning') && e.target.closest('.influencer-actions')) {
            const btn = e.target.closest('.btn-warning');
            toggleFavorite(btn);
        }
    });
}

// Toggle favorite status
function toggleFavorite(button) {
    const icon = button.querySelector('i');
    const isFavorite = button.classList.contains('btn-warning');
    
    if (isFavorite) {
        button.classList.remove('btn-warning');
        button.classList.add('btn-outline-secondary');
        icon.classList.remove('fas');
        icon.classList.add('far');
        button.setAttribute('data-bs-original-title', 'Add to favorites');
        showNotification('Removed from favorites', 'info');
    } else {
        button.classList.remove('btn-outline-secondary');
        button.classList.add('btn-warning');
        icon.classList.remove('far');
        icon.classList.add('fas');
        button.setAttribute('data-bs-original-title', 'Remove from favorites');
        showNotification('Added to favorites', 'success');
    }
}

// Initialize tooltips
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Initialize social stats animation
function initializeSocialStats() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSocialStats(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.user-social-box').forEach(box => {
        observer.observe(box);
    });
}

// Animate social stats
function animateSocialStats(box) {
    const stats = box.querySelectorAll('.social-stat span.fw-bold');
    
    stats.forEach((stat, index) => {
        setTimeout(() => {
            stat.style.transform = 'scale(1.2)';
            setTimeout(() => {
                stat.style.transform = 'scale(1)';
            }, 200);
        }, index * 100);
    });
}

// Apply filters (global function)
window.applyFilters = function() {
    // Collect all filter values
    const filters = {
        sortBy: document.getElementById('sortBy').value,
        rating: document.querySelector('input[name="rating"]:checked').value,
        platforms: Array.from(document.querySelectorAll('.platform-filter input:checked')).map(cb => cb.id),
        categories: Array.from(document.querySelectorAll('.category-filter input:checked')).map(cb => cb.id),
        ageRange: document.getElementById('ageRange').value,
        followerRange: document.getElementById('followerRange').value
    };
    
    console.log('Applying filters:', filters);
    
    // Show loading
    const cards = document.querySelectorAll('.influencer-card');
    cards.forEach(card => card.style.opacity = '0.5');
    
    // Simulate filter application
    setTimeout(() => {
        cards.forEach(card => card.style.opacity = '1');
        showNotification('Filters applied successfully', 'success');
    }, 500);
};

// Reset filters (global function)
window.resetFilters = function() {
    // Reset sort
    document.getElementById('sortBy').value = 'followers';
    
    // Reset rating
    document.getElementById('ratingAll').checked = true;
    
    // Reset age and follower range
    document.getElementById('ageRange').value = '';
    document.getElementById('followerRange').value = '';
    
    // Reset checkboxes to defaults
    const defaultChecked = ['facebook', 'instagram', 'twitter', 'youtube', 'lifestyle', 'fitness'];
    document.querySelectorAll('.filter-sidebar input[type="checkbox"]').forEach(cb => {
        cb.checked = defaultChecked.includes(cb.id);
    });
    
    showNotification('Filters reset', 'info');
};

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
    }, 3000);
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeInfluencerFinder);
} else {
    initializeInfluencerFinder();
}