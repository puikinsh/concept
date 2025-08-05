// Settings page functionality
export function initializeSettings() {
    // Color scheme buttons
    const colorSchemeButtons = document.querySelectorAll('.color-scheme-btn');
    colorSchemeButtons.forEach(button => {
        button.addEventListener('click', function() {
            colorSchemeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const color = this.dataset.color;
            // Here you would apply the color scheme
            console.log('Color scheme changed to:', color);
        });
    });

    // Font size range
    const fontSizeRange = document.getElementById('fontSize');
    if (fontSizeRange) {
        fontSizeRange.addEventListener('input', function() {
            document.documentElement.style.fontSize = this.value + 'px';
        });
    }

    // Enable desktop notifications
    const desktopNotifications = document.getElementById('desktopNotifications');
    if (desktopNotifications) {
        desktopNotifications.addEventListener('change', function() {
            if (this.checked) {
                if ('Notification' in window) {
                    Notification.requestPermission().then(permission => {
                        if (permission === 'granted') {
                            new Notification('Desktop notifications enabled!', {
                                body: 'You will now receive desktop notifications.',
                                icon: '/assets/images/logo.png'
                            });
                        }
                    });
                }
            }
        });
    }

    // Send test email button
    const sendTestEmailBtn = document.querySelector('.btn-outline-primary');
    if (sendTestEmailBtn && sendTestEmailBtn.textContent.includes('Send Test Email')) {
        sendTestEmailBtn.addEventListener('click', function() {
            const btn = this;
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check me-2"></i>Test Email Sent!';
                btn.classList.remove('btn-outline-primary');
                btn.classList.add('btn-success');
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.remove('btn-success');
                    btn.classList.add('btn-outline-primary');
                    btn.disabled = false;
                }, 3000);
            }, 2000);
        });
    }

    // Copy API key
    const copyApiKeyBtn = document.querySelector('.input-group .btn-outline-secondary');
    if (copyApiKeyBtn) {
        copyApiKeyBtn.addEventListener('click', function() {
            const apiKeyInput = document.getElementById('apiKey');
            apiKeyInput.select();
            document.execCommand('copy');
            
            // Show tooltip
            const tooltip = new bootstrap.Tooltip(this, {
                title: 'Copied!',
                trigger: 'manual'
            });
            tooltip.show();
            
            setTimeout(() => {
                tooltip.hide();
            }, 2000);
        });
    }

    // Generate new API key
    const generateKeyBtn = document.querySelector('.btn-primary');
    if (generateKeyBtn && generateKeyBtn.textContent.includes('Generate New Key')) {
        generateKeyBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to generate a new API key? The old key will be invalidated.')) {
                const newKey = 'sk_test_' + Math.random().toString(36).substr(2, 20);
                document.getElementById('apiKey').value = newKey;
            }
        });
    }

    // Clear cache buttons
    document.querySelectorAll('.btn-outline-secondary').forEach(button => {
        if (button.textContent.includes('Clear') && button.textContent.includes('Cache')) {
            button.addEventListener('click', function() {
                const btn = this;
                const originalText = btn.textContent;
                btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Clearing...';
                btn.disabled = true;

                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-check me-2"></i>Cleared!';
                    btn.classList.remove('btn-outline-secondary');
                    btn.classList.add('btn-success');
                    
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.classList.remove('btn-success');
                        btn.classList.add('btn-outline-secondary');
                        btn.disabled = false;
                    }, 2000);
                }, 1500);
            });
        }
    });

    // Backup now button
    const backupBtn = document.querySelector('.btn-primary');
    if (backupBtn && backupBtn.textContent === 'Backup Now') {
        backupBtn.addEventListener('click', function() {
            const btn = this;
            btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Creating backup...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check me-2"></i>Backup completed!';
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-success');
                
                // Show download link
                const downloadLink = document.createElement('a');
                downloadLink.href = '#';
                downloadLink.className = 'btn btn-sm btn-outline-primary ms-2';
                downloadLink.innerHTML = '<i class="fas fa-download me-1"></i>Download';
                btn.parentNode.insertBefore(downloadLink, btn.nextSibling);
                
                setTimeout(() => {
                    btn.textContent = 'Backup Now';
                    btn.classList.remove('btn-success');
                    btn.classList.add('btn-primary');
                    btn.disabled = false;
                    downloadLink.remove();
                }, 5000);
            }, 3000);
        });
    }

    // Save buttons functionality
    document.querySelectorAll('button[type="submit"]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const btn = this;
            const originalText = btn.textContent;
            
            btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Saving...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check me-2"></i>Saved!';
                btn.classList.add('btn-success');
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.classList.remove('btn-success');
                    btn.disabled = false;
                }, 2000);
            }, 1500);
        });
    });

    // Two-factor authentication toggle
    const enable2FA = document.getElementById('enable2FA');
    if (enable2FA) {
        enable2FA.addEventListener('change', function() {
            if (this.checked) {
                // Show QR code modal
                const modal = new bootstrap.Modal(document.getElementById('twoFactorModal') || createTwoFactorModal());
                modal.show();
            }
        });
    }

    // Integration connect buttons
    document.querySelectorAll('.list-group-item .btn-outline-primary').forEach(button => {
        if (button.textContent === 'Connect') {
            button.addEventListener('click', function() {
                const btn = this;
                btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span>';
                btn.disabled = true;

                setTimeout(() => {
                    btn.textContent = 'Connected';
                    btn.classList.remove('btn-outline-primary');
                    btn.classList.add('btn-success');
                    btn.disabled = true;
                }, 2000);
            });
        }
    });

    // Handle form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            if (form.checkValidity()) {
                // Form is valid, would submit here
                console.log('Form submitted');
            }
            
            form.classList.add('was-validated');
        });
    });
}

// Create Two-Factor Authentication Modal
function createTwoFactorModal() {
    const modalHtml = `
        <div class="modal fade" id="twoFactorModal" tabindex="-1" aria-labelledby="twoFactorModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="twoFactorModalLabel">Enable Two-Factor Authentication</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        <p>Scan this QR code with your authenticator app:</p>
                        <div class="bg-light p-4 d-inline-block mb-3">
                            <i class="fas fa-qrcode fa-8x text-dark"></i>
                        </div>
                        <p>Or enter this code manually:</p>
                        <code class="fs-5">JBSWY3DPEHPK3PXP</code>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary">Verify & Enable</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    return document.getElementById('twoFactorModal');
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSettings);
} else {
    initializeSettings();
}