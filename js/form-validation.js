/**
 * ABC Business Management Consultant
 * Form Validation Script
 * Handles contact form validation and submission
 */

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    // Add real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this);
      });
      
      input.addEventListener('input', function() {
        if (this.parentElement.classList.contains('error')) {
          validateField(this);
        }
      });
    });
    
    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateForm(this)) {
        handleFormSubmission(this);
      }
    });
  }
});

/**
 * Validate individual form field
 */
function validateField(field) {
  const formGroup = field.parentElement;
  const errorElement = formGroup.querySelector('.form-error');
  const fieldName = field.getAttribute('name');
  const fieldValue = field.value.trim();
  
  // Remove previous error state
  formGroup.classList.remove('error');
  
  let errorMessage = '';
  
  // Check if field is required
  if (field.hasAttribute('required') && fieldValue === '') {
    errorMessage = `${getFieldLabel(fieldName)} is required`;
  }
  // Email validation
  else if (fieldName === 'email' && fieldValue !== '') {
    if (!isValidEmail(fieldValue)) {
      errorMessage = 'Please enter a valid email address';
    }
  }
  // Phone validation
  else if (fieldName === 'phone' && fieldValue !== '') {
    if (!isValidPhone(fieldValue)) {
      errorMessage = 'Please enter a valid phone number';
    }
  }
  // Name validation
  else if (fieldName === 'name' && fieldValue !== '') {
    if (fieldValue.length < 2) {
      errorMessage = 'Name must be at least 2 characters';
    }
  }
  // Message validation
  else if (fieldName === 'message' && fieldValue !== '') {
    if (fieldValue.length < 10) {
      errorMessage = 'Message must be at least 10 characters';
    }
  }
  
  // Show error if exists
  if (errorMessage) {
    formGroup.classList.add('error');
    if (errorElement) {
      errorElement.textContent = errorMessage;
    }
    return false;
  }
  
  return true;
}

/**
 * Validate entire form
 */
function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  
  inputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });
  
  return isValid;
}

/**
 * Check if email is valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Check if phone is valid (accepts various formats)
 */
function isValidPhone(phone) {
  // Remove spaces, hyphens, and parentheses
  const cleanPhone = phone.replace(/[\s\-()]/g, '');
  
  // Check if it's 10 digits (Indian mobile) or starts with + and has 10-15 digits
  const phoneRegex = /^(\+?\d{10,15}|\d{10})$/;
  return phoneRegex.test(cleanPhone);
}

/**
 * Get user-friendly field label
 */
function getFieldLabel(fieldName) {
  const labels = {
    'name': 'Name',
    'email': 'Email',
    'phone': 'Phone',
    'company': 'Company Name',
    'message': 'Message'
  };
  
  return labels[fieldName] || fieldName;
}

/**
 * Handle form submission
 */
function handleFormSubmission(form) {
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.innerHTML;
  
  // Show loading state
  submitButton.disabled = true;
  submitButton.innerHTML = 'Sending...';
  
  // Get form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  
  // Log form data (in production, this would be sent to a server)
  console.log('Form submitted with data:', data);
  
  // Simulate API call
  setTimeout(function() {
    // Show success message
    showSuccessMessage(form);
    
    // Reset form
    form.reset();
    
    // Reset button
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonText;
    
    // Remove error states
    form.querySelectorAll('.form-group').forEach(group => {
      group.classList.remove('error');
    });
    
    // Scroll to success message
    const successMessage = document.querySelector('.form-success');
    if (successMessage) {
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 1500);
}

/**
 * Show success message
 */
function showSuccessMessage(form) {
  let successMessage = form.querySelector('.form-success');
  
  // Create success message if it doesn't exist
  if (!successMessage) {
    successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    form.insertBefore(successMessage, form.firstChild);
  }
  
  successMessage.innerHTML = `
    <strong>✓ Success!</strong> Your message has been sent successfully. 
    We'll get back to you as soon as possible.
  `;
  successMessage.style.display = 'block';
  
  // Hide success message after 5 seconds
  setTimeout(function() {
    successMessage.style.display = 'none';
  }, 5000);
}

/**
 * Character counter for textarea (optional enhancement)
 */
function initCharacterCounter() {
  const textareas = document.querySelectorAll('textarea[data-max-length]');
  
  textareas.forEach(textarea => {
    const maxLength = textarea.getAttribute('data-max-length');
    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.style.textAlign = 'right';
    counter.style.fontSize = '0.875rem';
    counter.style.color = 'var(--mid-grey)';
    counter.style.marginTop = '5px';
    
    textarea.parentElement.appendChild(counter);
    
    function updateCounter() {
      const currentLength = textarea.value.length;
      counter.textContent = `${currentLength} / ${maxLength} characters`;
      
      if (currentLength > maxLength) {
        counter.style.color = '#DE350B';
      } else {
        counter.style.color = 'var(--mid-grey)';
      }
    }
    
    textarea.addEventListener('input', updateCounter);
    updateCounter();
  });
}

// Initialize character counter if needed
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('textarea[data-max-length]')) {
    initCharacterCounter();
  }
});

/**
 * Newsletter form validation (if exists)
 */
function initNewsletterForm() {
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (email === '') {
        alert('Please enter your email address');
        return;
      }
      
      if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Handle newsletter signup
      console.log('Newsletter signup:', email);
      alert('Thank you for subscribing to our newsletter!');
      this.reset();
    });
  });
}

// Initialize newsletter form if exists
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.newsletter-form')) {
    initNewsletterForm();
  }
});
