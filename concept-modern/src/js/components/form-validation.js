// Bootstrap 5 Form Validation
export function initFormValidation() {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');
  
  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      form.classList.add('was-validated');
    }, false);
  });
  
  // Real-time validation
  const inputs = document.querySelectorAll('.needs-validation input, .needs-validation textarea, .needs-validation select');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      if (input.checkValidity()) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
      } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
      }
    });
  });
}