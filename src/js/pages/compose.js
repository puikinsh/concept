// Email Compose Page functionality
import Quill from 'quill';
import { logger } from '../utils/logger.js';
import { confirmDialog } from '../utils/confirm-dialog.js';
import { showToast } from '../utils/toast.js';
import 'quill/dist/quill.snow.css';

export function initializeCompose() {
  // Initialize Quill editor for email body
  const _editor = new Quill('#emailEditor', {
    theme: 'snow',
    placeholder: 'Write your message here...',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ direction: 'rtl' }],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ['clean'],
        ['link', 'image', 'video']
      ]
    }
  });

  // Handle file attachments
  const fileInput = document.getElementById('fileAttachment');
  const attachmentArea = document.querySelector('.attachment-area');

  if (fileInput && attachmentArea) {
    // File input change
    fileInput.addEventListener('change', handleFileSelect);

    // Drag and drop
    attachmentArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      attachmentArea.classList.add('drag-over');
    });

    attachmentArea.addEventListener('dragleave', () => {
      attachmentArea.classList.remove('drag-over');
    });

    attachmentArea.addEventListener('drop', (e) => {
      e.preventDefault();
      attachmentArea.classList.remove('drag-over');
      handleFiles(e.dataTransfer.files);
    });
  }

  // Handle form submission
  const composeForm = document.getElementById('composeForm');
  if (composeForm) {
    composeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSendEmail();
    });
  }

  // Handle discard button
  const discardBtn = document.querySelector('button[type="button"]:has(.fa-trash)');
  if (discardBtn) {
    discardBtn.addEventListener('click', handleDiscard);
  }

  // Handle save draft
  const saveDraftBtn = document.querySelector('button[type="button"]:has(.fa-save)');
  if (saveDraftBtn) {
    saveDraftBtn.addEventListener('click', handleSaveDraft);
  }
}

function handleFileSelect(e) {
  handleFiles(e.target.files);
}

function handleFiles(files) {
  logger.info('Files attached:', files);
  // In a real app, would handle file upload and display

  // Show notification
  showToast(`${files.length} file(s) attached successfully`, 'success');
}

function handleSendEmail() {
  const to = document.getElementById('toEmail').value;
  const cc = document.getElementById('ccEmail').value;
  const bcc = document.getElementById('bccEmail').value;
  const subject = document.getElementById('emailSubject').value;

  if (!to) {
    showToast('Please enter at least one recipient', 'error');
    return;
  }

  if (!subject) {
    showToast('Please enter a subject', 'error');
    return;
  }

  // In a real app, would send the email
  logger.info('Sending email...', { to, cc, bcc, subject });
  showToast('Email sent successfully!', 'success');

  // Redirect to inbox after delay
  setTimeout(() => {
    window.location.href = '/pages/email/inbox.html';
  }, 1500);
}

async function handleDiscard() {
  const confirmed = await confirmDialog({
    title: 'Discard Email',
    message: 'Are you sure you want to discard this email? Any unsaved changes will be lost.',
    confirmText: 'Discard',
    confirmClass: 'btn-danger'
  });

  if (confirmed) {
    window.location.href = '/pages/email/inbox.html';
  }
}

function handleSaveDraft() {
  // In a real app, would save the draft
  showToast('Draft saved successfully', 'success');
}

// Add drag-over styles
const style = document.createElement('style');
style.textContent = `
    .attachment-area.drag-over {
        background-color: #e9ecef;
        border-color: #5969ff;
        border-style: dashed;
    }
    
    .attachment-area.drag-over * {
        pointer-events: none;
    }
    
    #emailEditor {
        min-height: 300px;
    }
    
    .ql-toolbar {
        border-top-left-radius: 0.375rem;
        border-top-right-radius: 0.375rem;
    }
    
    .ql-container {
        border-bottom-left-radius: 0.375rem;
        border-bottom-right-radius: 0.375rem;
    }
`;
document.head.appendChild(style);

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeCompose);
} else {
  initializeCompose();
}
