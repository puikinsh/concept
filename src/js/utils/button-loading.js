/**
 * Shared button loading state utility
 * Replaces duplicated loading/spinner patterns across page modules
 */

const originalStates = new WeakMap();

/**
 * Set a button to loading state
 * @param {HTMLButtonElement} btn - The button element
 * @param {string} text - Loading text to display
 */
export function setLoading(btn, text = 'Loading...') {
  if (!btn) {
    return;
  }
  originalStates.set(btn, btn.innerHTML);
  btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status"></span>${text}`;
  btn.disabled = true;
}

/**
 * Reset a button from loading state to its original content
 * @param {HTMLButtonElement} btn - The button element
 * @param {string} [successText] - Optional success text to show briefly before restoring
 * @param {string} [successClass] - Optional CSS class to add during success state
 * @param {number} [successDuration=2000] - How long to show success state (ms)
 */
export function resetLoading(btn, successText, successClass, successDuration = 2000) {
  if (!btn) {
    return;
  }
  const original = originalStates.get(btn);
  if (!original) {
    return;
  }

  if (successText) {
    btn.innerHTML = successText;
    if (successClass) {
      btn.classList.add(successClass);
    }
    setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled = false;
      if (successClass) {
        btn.classList.remove(successClass);
      }
    }, successDuration);
  } else {
    btn.innerHTML = original;
    btn.disabled = false;
  }
}
