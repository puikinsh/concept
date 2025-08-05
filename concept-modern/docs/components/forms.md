# Forms

Comprehensive form components and patterns for building user-friendly forms with validation.

## Basic Form Elements

### Text Inputs
```html
<div class="mb-3">
  <label for="basicInput" class="form-label">Basic Input</label>
  <input type="text" class="form-control" id="basicInput" placeholder="Enter text">
</div>

<div class="mb-3">
  <label for="emailInput" class="form-label">Email</label>
  <input type="email" class="form-control" id="emailInput" placeholder="name@example.com">
</div>

<div class="mb-3">
  <label for="passwordInput" class="form-label">Password</label>
  <input type="password" class="form-control" id="passwordInput">
</div>
```

### Textarea
```html
<div class="mb-3">
  <label for="textarea" class="form-label">Message</label>
  <textarea class="form-control" id="textarea" rows="3"></textarea>
</div>
```

### Select
```html
<div class="mb-3">
  <label for="selectInput" class="form-label">Select Option</label>
  <select class="form-select" id="selectInput">
    <option selected>Choose...</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </select>
</div>

<!-- Multiple select -->
<select class="form-select" multiple>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</select>
```

### Checkboxes and Radios
```html
<!-- Checkbox -->
<div class="form-check">
  <input class="form-check-input" type="checkbox" id="checkbox1">
  <label class="form-check-label" for="checkbox1">
    Default checkbox
  </label>
</div>

<!-- Radio -->
<div class="form-check">
  <input class="form-check-input" type="radio" name="radioOptions" id="radio1" checked>
  <label class="form-check-label" for="radio1">
    Default radio
  </label>
</div>

<!-- Switch -->
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="switch1">
  <label class="form-check-label" for="switch1">
    Toggle switch
  </label>
</div>
```

## Form Layouts

### Vertical Form
```html
<form>
  <div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input type="text" class="form-control" id="name">
  </div>
  <div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

### Horizontal Form
```html
<form>
  <div class="row mb-3">
    <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-10">
      <input type="email" class="form-control" id="inputEmail">
    </div>
  </div>
  <div class="row mb-3">
    <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword">
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Sign in</button>
</form>
```

### Inline Form
```html
<form class="row row-cols-lg-auto g-3 align-items-center">
  <div class="col-12">
    <input type="text" class="form-control" placeholder="Username">
  </div>
  <div class="col-12">
    <input type="password" class="form-control" placeholder="Password">
  </div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Login</button>
  </div>
</form>
```

## Input Groups

### Basic Input Group
```html
<div class="input-group mb-3">
  <span class="input-group-text">@</span>
  <input type="text" class="form-control" placeholder="Username">
</div>

<div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="Price">
  <span class="input-group-text">.00</span>
</div>

<div class="input-group mb-3">
  <span class="input-group-text">$</span>
  <input type="text" class="form-control">
  <span class="input-group-text">.00</span>
</div>
```

### With Buttons
```html
<div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="Search...">
  <button class="btn btn-primary" type="button">
    <i class="fa-solid fa-search"></i>
  </button>
</div>
```

## Form Validation

### HTML5 Validation
```html
<form class="needs-validation" novalidate>
  <div class="mb-3">
    <label for="validationCustom01" class="form-label">First name</label>
    <input type="text" class="form-control" id="validationCustom01" required>
    <div class="valid-feedback">
      Looks good!
    </div>
    <div class="invalid-feedback">
      Please provide a valid first name.
    </div>
  </div>
  <button class="btn btn-primary" type="submit">Submit</button>
</form>

<script>
// Bootstrap validation
(function() {
  'use strict';
  const forms = document.querySelectorAll('.needs-validation');
  
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();
</script>
```

### Custom Validation
```javascript
// Real-time validation
function validateEmail(input) {
  const email = input.value;
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  if (isValid) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  } else {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
  }
}

// Password strength checker
function checkPasswordStrength(password) {
  let strength = 0;
  
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  
  return {
    score: strength,
    label: ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][strength]
  };
}
```

## Advanced Form Components

### File Upload
```html
<div class="mb-3">
  <label for="formFile" class="form-label">Default file input</label>
  <input class="form-control" type="file" id="formFile">
</div>

<!-- Multiple files -->
<div class="mb-3">
  <label for="formFileMultiple" class="form-label">Multiple files</label>
  <input class="form-control" type="file" id="formFileMultiple" multiple>
</div>

<!-- Custom file upload -->
<div class="upload-area" id="uploadArea">
  <i class="fa-solid fa-cloud-upload-alt fa-3x mb-3"></i>
  <h5>Drag & Drop files here</h5>
  <p>or</p>
  <button class="btn btn-primary">Browse Files</button>
  <input type="file" hidden id="fileInput" multiple>
</div>
```

### Date & Time Inputs
```html
<div class="mb-3">
  <label for="dateInput" class="form-label">Date</label>
  <input type="date" class="form-control" id="dateInput">
</div>

<div class="mb-3">
  <label for="timeInput" class="form-label">Time</label>
  <input type="time" class="form-control" id="timeInput">
</div>

<div class="mb-3">
  <label for="datetimeInput" class="form-label">Date & Time</label>
  <input type="datetime-local" class="form-control" id="datetimeInput">
</div>
```

### Range Slider
```html
<div class="mb-3">
  <label for="rangeInput" class="form-label">Price Range: <span id="rangeValue">50</span></label>
  <input type="range" class="form-range" min="0" max="100" id="rangeInput" value="50">
</div>

<script>
document.getElementById('rangeInput').addEventListener('input', function(e) {
  document.getElementById('rangeValue').textContent = e.target.value;
});
</script>
```

## Form Patterns

### Login Form
```html
<form class="needs-validation" novalidate>
  <div class="mb-3">
    <label for="loginEmail" class="form-label">Email address</label>
    <input type="email" class="form-control" id="loginEmail" required>
    <div class="invalid-feedback">
      Please enter a valid email address.
    </div>
  </div>
  
  <div class="mb-3">
    <label for="loginPassword" class="form-label">Password</label>
    <input type="password" class="form-control" id="loginPassword" required>
    <div class="invalid-feedback">
      Password is required.
    </div>
  </div>
  
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="rememberMe">
    <label class="form-check-label" for="rememberMe">
      Remember me
    </label>
  </div>
  
  <button type="submit" class="btn btn-primary w-100">Sign In</button>
</form>
```

### Multi-Step Form
```html
<form id="multiStepForm">
  <!-- Step indicators -->
  <div class="step-indicators mb-4">
    <div class="step active">1</div>
    <div class="step">2</div>
    <div class="step">3</div>
  </div>
  
  <!-- Step 1 -->
  <div class="form-step active">
    <h5>Personal Information</h5>
    <input type="text" class="form-control mb-3" placeholder="First Name">
    <input type="text" class="form-control mb-3" placeholder="Last Name">
  </div>
  
  <!-- Step 2 -->
  <div class="form-step">
    <h5>Contact Details</h5>
    <input type="email" class="form-control mb-3" placeholder="Email">
    <input type="tel" class="form-control mb-3" placeholder="Phone">
  </div>
  
  <!-- Step 3 -->
  <div class="form-step">
    <h5>Review</h5>
    <p>Please review your information before submitting.</p>
  </div>
  
  <!-- Navigation -->
  <div class="d-flex justify-content-between">
    <button type="button" class="btn btn-secondary" id="prevBtn">Previous</button>
    <button type="button" class="btn btn-primary" id="nextBtn">Next</button>
  </div>
</form>
```

## Form Utilities

### Floating Labels
```html
<div class="form-floating mb-3">
  <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
  <label for="floatingInput">Email address</label>
</div>

<div class="form-floating">
  <select class="form-select" id="floatingSelect">
    <option selected>Select option</option>
    <option value="1">One</option>
    <option value="2">Two</option>
  </select>
  <label for="floatingSelect">Works with selects</label>
</div>
```

### Form Helpers
```html
<div class="mb-3">
  <label for="inputWithHelp" class="form-label">Password</label>
  <input type="password" class="form-control" id="inputWithHelp">
  <div class="form-text">
    Your password must be 8-20 characters long.
  </div>
</div>
```

## JavaScript Form Handling

### Form Submission
```javascript
// AJAX form submission
async function submitForm(formElement) {
  const formData = new FormData(formElement);
  const data = Object.fromEntries(formData);
  
  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      // Handle success
      showAlert('Form submitted successfully!', 'success');
      formElement.reset();
    } else {
      // Handle error
      showAlert('Submission failed. Please try again.', 'danger');
    }
  } catch (error) {
    console.error('Error:', error);
    showAlert('Network error. Please check your connection.', 'danger');
  }
}
```

### Dynamic Form Fields
```javascript
// Add/remove form fields dynamically
function addFormField(container, template) {
  const newField = template.cloneNode(true);
  container.appendChild(newField);
}

function removeFormField(button) {
  button.closest('.form-field').remove();
}
```

## Accessibility

- Always use labels with form controls
- Provide clear error messages
- Use fieldset and legend for grouped inputs
- Ensure keyboard navigation works
- Include aria-describedby for help text
- Test with screen readers

## Best Practices

### DO:
- Use appropriate input types
- Provide clear labels and placeholders
- Validate on both client and server
- Show loading states during submission
- Provide helpful error messages
- Make forms mobile-friendly

### DON'T:
- Don't rely only on color for feedback
- Don't auto-focus without reason
- Don't disable browser autofill
- Don't use placeholder as label
- Don't make forms too long