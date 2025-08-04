// Bootstrap 5 Tooltips initialization
import { Tooltip } from 'bootstrap';

export function initTooltips() {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl));
  return tooltipList;
}