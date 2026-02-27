/**
 * Shared toast notification utility
 * Replaces duplicated showNotification() across 10+ page modules
 */

/**
 * Escape HTML to prevent XSS in notification messages
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Show a toast notification
 * @param {string} message - The notification message
 * @param {'success'|'info'|'warning'|'error'|'danger'} type - Alert type
 * @param {number} duration - Auto-dismiss duration in ms (default 5000)
 */
export function showToast(message, type = 'info', duration = 5000) {
  const alertClass = type === 'error' ? 'danger' : type;
  const safeMessage = escapeHtml(message);

  const wrapper = document.createElement('div');
  wrapper.className = `alert alert-${alertClass} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
  wrapper.setAttribute('role', 'alert');
  wrapper.style.zIndex = '1050';
  wrapper.innerHTML = `
    ${safeMessage}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  document.body.appendChild(wrapper);

  if (duration > 0) {
    setTimeout(() => {
      wrapper.classList.remove('show');
      setTimeout(() => wrapper.remove(), 150);
    }, duration);
  }
}
