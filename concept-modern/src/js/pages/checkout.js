// Checkout Page functionality
export function initializeCheckout() {
    // Form validation
    initializeFormValidation();
    
    // Payment method handling
    handlePaymentMethodChange();
    
    // Promo code
    handlePromoCode();
    
    // Card number formatting
    initializeCardFormatting();
    
    // Checkout steps
    initializeCheckoutSteps();
}

// Initialize form validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            if (form.checkValidity()) {
                // Process form
                console.log('Form is valid');
            }
            
            form.classList.add('was-validated');
        });
    });
}

// Handle payment method changes
function handlePaymentMethodChange() {
    const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
    
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Hide all payment forms
            document.getElementById('creditCardForm').style.display = 'none';
            document.getElementById('paypalForm').style.display = 'none';
            document.getElementById('applePayForm').style.display = 'none';
            
            // Show selected payment form
            switch(this.id) {
                case 'creditCard':
                    document.getElementById('creditCardForm').style.display = 'block';
                    break;
                case 'paypal':
                    document.getElementById('paypalForm').style.display = 'block';
                    break;
                case 'applePay':
                    document.getElementById('applePayForm').style.display = 'block';
                    break;
            }
        });
    });
}

// Handle promo code
function handlePromoCode() {
    const promoButton = document.querySelector('#promoCode + button');
    if (promoButton) {
        promoButton.addEventListener('click', function() {
            const promoCode = document.getElementById('promoCode').value;
            
            if (promoCode) {
                // Simulate promo code validation
                if (promoCode.toUpperCase() === 'SAVE10') {
                    applyDiscount(10);
                    showNotification('Promo code applied! 10% discount', 'success');
                } else {
                    showNotification('Invalid promo code', 'error');
                }
            }
        });
    }
}

// Apply discount
function applyDiscount(percentage) {
    const subtotal = 1648.00;
    const discount = subtotal * (percentage / 100);
    const newTotal = subtotal - discount + 15.00 + 149.67; // Including shipping and tax
    
    // Update UI (in real app, would recalculate properly)
    console.log(`Applied ${percentage}% discount: -$${discount.toFixed(2)}`);
}

// Initialize card number formatting
function initializeCardFormatting() {
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryInput = document.getElementById('expiry');
    const cvvInput = document.getElementById('cvv');
    
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
            
            // Detect card type
            detectCardType(value);
        });
    }
    
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
    
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
        });
    }
}

// Detect card type
function detectCardType(number) {
    const cardIcons = document.querySelectorAll('.input-group-text i');
    
    // Reset all icons
    cardIcons.forEach(icon => {
        icon.style.opacity = '0.3';
    });
    
    // Detect and highlight card type
    if (number.startsWith('4')) {
        // Visa
        document.querySelector('.fa-cc-visa').style.opacity = '1';
    } else if (number.startsWith('5') || number.startsWith('2')) {
        // Mastercard
        document.querySelector('.fa-cc-mastercard').style.opacity = '1';
    } else if (number.startsWith('3')) {
        // Amex
        document.querySelector('.fa-cc-amex').style.opacity = '1';
    }
}

// Initialize checkout steps
function initializeCheckoutSteps() {
    const steps = document.querySelectorAll('.step');
    let currentStep = 1; // Starting at shipping
    
    // Add click handlers for completed steps
    steps.forEach((step, index) => {
        if (step.classList.contains('active') && index < currentStep) {
            step.style.cursor = 'pointer';
            step.addEventListener('click', function() {
                goToStep(index);
            });
        }
    });
}

// Go to specific step
function goToStep(stepIndex) {
    console.log('Going to step:', stepIndex);
    // In real app, would handle step navigation
}

// Complete order
window.completeOrder = function() {
    // Validate all forms
    const shippingForm = document.getElementById('shippingForm');
    const isValid = shippingForm.checkValidity();
    
    if (!isValid) {
        shippingForm.classList.add('was-validated');
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Show loading state
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
    button.disabled = true;
    
    // Simulate order processing
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        
        // Show success
        showNotification('Order completed successfully!', 'success');
        
        // Redirect to order confirmation
        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
    }, 2000);
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
    }, 5000);
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCheckout);
} else {
    initializeCheckout();
}