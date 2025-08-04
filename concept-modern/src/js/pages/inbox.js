// Inbox Page functionality
import * as bootstrap from 'bootstrap';

export function initializeInbox() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Email data for different folders
    const emailData = {
        inbox: [
            {
                id: 1,
                from: 'John Doe',
                initials: 'JD',
                color: 'primary',
                subject: 'Q4 Product Launch Strategy Meeting',
                preview: 'Hi team, I wanted to reach out regarding our upcoming Q4 product launch strategy meeting...',
                time: '2:30 PM',
                starred: true,
                unread: true,
                attachments: true,
                labels: ['work', 'important']
            },
            {
                id: 2,
                from: 'Sarah Miller',
                initials: 'SM',
                color: 'success',
                subject: 'Budget Review - Updated Figures',
                preview: 'Please find attached the updated budget figures for Q4. We need to discuss the marketing allocation...',
                time: '11:45 AM',
                starred: false,
                unread: true,
                attachments: true,
                labels: ['work']
            },
            {
                id: 3,
                from: 'Michael Chen',
                initials: 'MC',
                color: 'warning',
                subject: 'Re: Website Redesign Proposal',
                preview: 'I\'ve reviewed the mockups and they look great! I have a few suggestions about the color scheme...',
                time: '10:30 AM',
                starred: false,
                unread: false,
                attachments: false,
                labels: ['personal']
            },
            {
                id: 4,
                from: 'Emily Johnson',
                initials: 'EJ',
                color: 'danger',
                subject: 'Team Building Event - Save the Date!',
                preview: 'Mark your calendars! Our annual team building event is scheduled for next month. We\'ll be...',
                time: 'Yesterday',
                starred: true,
                unread: false,
                attachments: false,
                labels: ['personal']
            },
            {
                id: 5,
                from: 'David Wilson',
                initials: 'DW',
                color: 'info',
                subject: 'API Documentation Update',
                preview: 'The API documentation has been updated with the new endpoints. Please review section 3.2 for...',
                time: 'Yesterday',
                starred: false,
                unread: false,
                attachments: true,
                labels: ['work']
            }
        ],
        starred: [
            {
                id: 1,
                from: 'John Doe',
                initials: 'JD',
                color: 'primary',
                subject: 'Q4 Product Launch Strategy Meeting',
                preview: 'Hi team, I wanted to reach out regarding our upcoming Q4 product launch strategy meeting...',
                time: '2:30 PM',
                starred: true,
                unread: true,
                attachments: true,
                labels: ['work', 'important']
            },
            {
                id: 4,
                from: 'Emily Johnson',
                initials: 'EJ',
                color: 'danger',
                subject: 'Team Building Event - Save the Date!',
                preview: 'Mark your calendars! Our annual team building event is scheduled for next month. We\'ll be...',
                time: 'Yesterday',
                starred: true,
                unread: false,
                attachments: false,
                labels: ['personal']
            }
        ],
        sent: [
            {
                id: 6,
                from: 'Me',
                to: 'John Doe',
                initials: 'ME',
                color: 'secondary',
                subject: 'Re: Q4 Product Launch Strategy Meeting',
                preview: 'Thanks for the update John. I\'ve reviewed the documents and have some feedback...',
                time: '1:15 PM',
                starred: false,
                unread: false,
                attachments: false,
                labels: ['work']
            }
        ],
        drafts: [
            {
                id: 7,
                from: 'Draft',
                to: 'Marketing Team',
                initials: 'DR',
                color: 'secondary',
                subject: 'New Campaign Ideas',
                preview: 'Hi team, I\'ve been thinking about our next campaign and wanted to share some initial ideas...',
                time: 'Draft',
                starred: false,
                unread: false,
                attachments: false,
                labels: []
            }
        ],
        trash: []
    };

    let currentFolder = 'inbox';
    let selectedEmails = new Set();

    // Initialize email list
    renderEmails(currentFolder);

    // Folder navigation
    document.querySelectorAll('[data-folder]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const folder = e.currentTarget.dataset.folder;
            
            // Update active state
            document.querySelectorAll('[data-folder]').forEach(el => el.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            // Render emails for selected folder
            currentFolder = folder;
            renderEmails(folder);
        });
    });

    // Select all checkbox
    const selectAllCheckbox = document.getElementById('selectAll');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', (e) => {
            const checkboxes = document.querySelectorAll('.email-checkbox');
            checkboxes.forEach(cb => {
                cb.checked = e.target.checked;
                const emailId = parseInt(cb.value);
                if (e.target.checked) {
                    selectedEmails.add(emailId);
                } else {
                    selectedEmails.delete(emailId);
                }
            });
        });
    }

    // Email item interactions
    document.addEventListener('click', (e) => {
        // Email checkbox
        if (e.target.classList.contains('email-checkbox')) {
            const emailId = parseInt(e.target.value);
            if (e.target.checked) {
                selectedEmails.add(emailId);
            } else {
                selectedEmails.delete(emailId);
            }
        }

        // Star toggle
        if (e.target.closest('.star-toggle')) {
            e.preventDefault();
            const star = e.target.closest('.star-toggle');
            const emailId = parseInt(star.dataset.emailId);
            toggleStar(emailId);
        }

        // Email item click (not on checkbox or star)
        if (e.target.closest('.email-item') && !e.target.closest('.email-checkbox') && !e.target.closest('.star-toggle')) {
            window.location.href = '/pages/email/details.html';
        }
    });

    function renderEmails(folder) {
        const emailItems = document.getElementById('emailItems');
        const emails = emailData[folder] || [];
        
        if (emails.length === 0) {
            emailItems.innerHTML = `
                <div class="text-center py-5">
                    <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
                    <p class="text-muted">No emails in ${folder}</p>
                </div>
            `;
            return;
        }
        
        emailItems.innerHTML = emails.map(email => `
            <div class="email-item border-bottom p-3 hover-bg-light ${email.unread ? 'fw-bold' : ''}" data-email-id="${email.id}">
                <div class="d-flex align-items-center">
                    <div class="form-check me-3">
                        <input class="form-check-input email-checkbox" type="checkbox" value="${email.id}">
                    </div>
                    <div class="avatar bg-${email.color} text-white rounded-circle d-flex align-items-center justify-content-center me-3">
                        <span class="avatar-initial">${email.initials}</span>
                    </div>
                    <div class="flex-grow-1 min-width-0">
                        <div class="d-flex align-items-center mb-1">
                            <h6 class="mb-0 me-2">${email.from}</h6>
                            ${email.to ? `<small class="text-muted">to ${email.to}</small>` : ''}
                            ${email.attachments ? `<i class="fa-solid fa-paperclip text-muted ms-2"></i>` : ''}
                            <div class="ms-auto text-muted small">${email.time}</div>
                        </div>
                        <div class="text-truncate">${email.subject}</div>
                        <div class="text-muted small text-truncate">${email.preview}</div>
                        ${email.labels.length > 0 ? `
                            <div class="mt-1">
                                ${email.labels.map(label => `
                                    <span class="badge bg-${getLabelColor(label)} me-1">${label}</span>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                    <button class="star-toggle btn btn-link text-decoration-none ms-2 hover-text-warning" data-email-id="${email.id}">
                        <i class="fa${email.starred ? 's' : 'r'} fa-star ${email.starred ? 'text-warning' : 'text-muted'}"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    function getLabelColor(label) {
        const colors = {
            work: 'success',
            personal: 'primary',
            important: 'warning',
            private: 'danger'
        };
        return colors[label] || 'secondary';
    }

    function toggleStar(emailId) {
        // Find email in all folders and toggle star
        Object.keys(emailData).forEach(folder => {
            const email = emailData[folder].find(e => e.id === emailId);
            if (email) {
                email.starred = !email.starred;
                // Update UI
                const star = document.querySelector(`[data-email-id="${emailId}"] i`);
                if (star) {
                    star.classList.toggle('fas');
                    star.classList.toggle('far');
                    star.classList.toggle('text-warning');
                    star.classList.toggle('text-muted');
                }
            }
        });
    }
}

// Add custom styles
const style = document.createElement('style');
style.textContent = `
    .avatar {
        width: 40px !important;
        height: 40px !important;
        min-width: 40px !important;
        min-height: 40px !important;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }
    
    .avatar-initial {
        font-size: 0.875rem;
        font-weight: 600;
        color: white;
        line-height: 1;
    }
    
    .hover-bg-light:hover {
        background-color: #f8f9fa !important;
        cursor: pointer;
    }
    
    .hover-text-warning:hover {
        color: #ffc107 !important;
        cursor: pointer;
    }
    
    .min-width-0 {
        min-width: 0;
    }
    
    .email-item {
        transition: background-color 0.15s ease-in-out;
    }
    
    .email-checkbox {
        cursor: pointer;
    }
    
    .list-group-item-action:hover {
        background-color: #f8f9fa;
    }
    
    .list-group-item-action.active {
        background-color: #e9ecef;
        color: #212529;
        border-color: transparent;
    }
`;
document.head.appendChild(style);

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeInbox);
} else {
    initializeInbox();
}