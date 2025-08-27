/**
 * Bootstrap Modal Confirm Dialog utility
 * Replaces native confirm() with Bootstrap modals
 */

/**
 * Show a confirmation dialog using Bootstrap modal
 * @param {Object} options - Configuration options
 * @param {string} options.title - Modal title
 * @param {string} options.message - Confirmation message
 * @param {string} options.confirmText - Confirm button text (default: 'Confirm')
 * @param {string} options.cancelText - Cancel button text (default: 'Cancel')
 * @param {string} options.confirmClass - CSS class for confirm button (default: 'btn-primary')
 * @returns {Promise<boolean>} - Resolves to true if confirmed, false if cancelled
 */
export function confirmDialog(options = {}) {
  const {
    title = 'Confirm Action',
    message = 'Are you sure you want to proceed?',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    confirmClass = 'btn-primary'
  } = options;

  return new Promise((resolve) => {
    // Create modal HTML
    const modalId = `confirm-modal-${Date.now()}`;
    const modalHTML = `
      <div class="modal fade" id="${modalId}" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>${message}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${cancelText}</button>
              <button type="button" class="btn ${confirmClass}" id="${modalId}-confirm">${confirmText}</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modalElement = document.getElementById(modalId);
    const modal = new bootstrap.Modal(modalElement);

    // Handle confirm button click
    const confirmBtn = document.getElementById(`${modalId}-confirm`);
    confirmBtn.addEventListener('click', () => {
      modal.hide();
      resolve(true);
    });

    // Handle modal hidden event
    modalElement.addEventListener('hidden.bs.modal', () => {
      modalElement.remove();
      resolve(false);
    });

    // Show modal
    modal.show();
  });
}

/**
 * Show a delete confirmation dialog
 * @param {string} itemName - Name of the item being deleted
 * @returns {Promise<boolean>}
 */
export function confirmDelete(itemName) {
  return confirmDialog({
    title: 'Delete Confirmation',
    message: `Are you sure you want to delete "${itemName}"? This action cannot be undone.`,
    confirmText: 'Delete',
    confirmClass: 'btn-danger'
  });
}

/**
 * Show a save confirmation dialog
 * @param {string} message - Custom message
 * @returns {Promise<boolean>}
 */
export function confirmSave(message = 'Do you want to save your changes?') {
  return confirmDialog({
    title: 'Save Changes',
    message,
    confirmText: 'Save',
    confirmClass: 'btn-success'
  });
}

export default confirmDialog;
