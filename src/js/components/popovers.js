// Bootstrap 5 Popovers initialization
import { Popover } from 'bootstrap';

export function initPopovers() {
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  const popoverList = [...popoverTriggerList].map(
    (popoverTriggerEl) => new Popover(popoverTriggerEl)
  );
  return popoverList;
}
