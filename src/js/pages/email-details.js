// Email Details Page functionality
import * as bootstrap from 'bootstrap';
import { logger } from '../utils/logger.js';

export function initializeEmailDetails() {
  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map((tooltipTriggerEl) => {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Handle email actions
  const emailActions = {
    reply: document.querySelector('button[title="Reply"]'),
    replyAll: document.querySelector('button[title="Reply All"]'),
    forward: document.querySelector('button[title="Forward"]'),
    star: document.querySelector('button[title="Star"]'),
    delete: document.querySelector('button[title="Delete"]')
  };

  // Reply button
  if (emailActions.reply) {
    emailActions.reply.addEventListener('click', () => {
      scrollToReply();
      focusReplyTextarea();
    });
  }

  // Reply All button
  if (emailActions.replyAll) {
    emailActions.replyAll.addEventListener('click', () => {
      scrollToReply();
      focusReplyTextarea();
      // In real app, would populate CC field with all recipients
    });
  }

  // Forward button
  if (emailActions.forward) {
    emailActions.forward.addEventListener('click', () => {
      window.location.href = '/pages/email/compose.html?action=forward';
    });
  }

  // Star button
  if (emailActions.star) {
    emailActions.star.addEventListener('click', function () {
      const icon = this.querySelector('i');
      if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas', 'text-warning');
        showNotification('Email starred', 'success');
      } else {
        icon.classList.remove('fas', 'text-warning');
        icon.classList.add('far');
        showNotification('Star removed', 'info');
      }
    });
  }

  // Delete button
  if (emailActions.delete) {
    emailActions.delete.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this email?')) {
        showNotification('Email deleted', 'success');
        setTimeout(() => {
          window.location.href = '/pages/email/inbox.html';
        }, 1000);
      }
    });
  }

  // Handle reply form
  const replyForm = document.getElementById('replyForm');
  if (replyForm) {
    replyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleReplySubmit();
    });
  }

  // Handle attachment downloads
  document.querySelectorAll('.attachment-item button').forEach((btn) => {
    btn.addEventListener('click', function () {
      const fileName = this.closest('.attachment-item').querySelector('h6').textContent;
      showNotification(`Downloading ${fileName}...`, 'info');
      // In real app, would trigger actual download
    });
  });

  // Handle attachment clicks
  document.querySelectorAll('.attachment-item').forEach((item) => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', function (e) {
      if (!e.target.closest('button')) {
        const fileName = this.querySelector('h6').textContent;
        logger.info('Preview file:', fileName);
        // In real app, would open preview modal
      }
    });
  });
}

function scrollToReply() {
  const replySection = document.querySelector('.email-reply');
  if (replySection) {
    replySection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function focusReplyTextarea() {
  const textarea = document.querySelector('.email-reply textarea');
  if (textarea) {
    setTimeout(() => {
      textarea.focus();
    }, 500);
  }
}

function handleReplySubmit() {
  const textarea = document.querySelector('.email-reply textarea');
  const replyText = textarea.value.trim();

  if (!replyText) {
    showNotification('Please enter a reply message', 'error');
    return;
  }

  // In real app, would send the reply
  showNotification('Reply sent successfully!', 'success');

  // Clear textarea
  textarea.value = '';

  // Add reply to the conversation (demo)
  addReplyToConversation(replyText);
}

function addReplyToConversation(replyText) {
  const emailBody = document.querySelector('.email-body');
  const replyHtml = `
        <div class="reply-message mt-4 p-3 bg-light rounded">
            <div class="d-flex align-items-center mb-2">
                <img src="https://placehold.co/40x40/5969ff/ffffff?text=ME&font=montserrat" alt="Me" class="rounded-circle me-2" width="40" height="40">
                <div>
                    <h6 class="mb-0">Me</h6>
                    <small class="text-muted">Just now</small>
                </div>
            </div>
            <p class="mb-0">${replyText}</p>
        </div>
    `;

  emailBody.insertAdjacentHTML('beforeend', replyHtml);
}

function showNotification(message, type = 'info') {
  const alertClass =
    type === 'error' ? 'alert-danger' : type === 'success' ? 'alert-success' : 'alert-info';

  const alert = document.createElement('div');
  alert.className = `alert ${alertClass} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
  alert.style.zIndex = '1050';
  alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

  document.body.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 5000);
}

// Add hover effect styles
const style = document.createElement('style');
style.textContent = `
    .attachment-item {
        transition: all 0.2s ease;
    }
    
    .attachment-item:hover {
        background-color: #f8f9fa;
        transform: translateY(-2px);
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .email-actions button {
        transition: all 0.2s ease;
    }
    
    .email-actions button:hover {
        transform: translateY(-1px);
    }
    
    .reply-message {
        animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeEmailDetails);
} else {
  initializeEmailDetails();
}
