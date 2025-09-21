// The Plaza Website - Form Enhancement JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        // Add form validation and enhancement
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                return false;
            }

            // Add loading state to submit button
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.textContent = 'Submitting...';
                submitButton.disabled = true;
            }
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                // Remove error styling as user types
                clearFieldError(this);
            });
        });
    });

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

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Age validation
        if (field.type === 'number' && field.name === 'age' && value) {
            const age = parseInt(value);
            const min = parseInt(field.getAttribute('min')) || 0;
            const max = parseInt(field.getAttribute('max')) || 150;

            if (age < min || age > max) {
                isValid = false;
                errorMessage = `Age must be between ${min} and ${max}`;
            }
        }

        // Display validation result
        if (isValid) {
            clearFieldError(field);
        } else {
            showFieldError(field, errorMessage);
        }

        return isValid;
    }

    function showFieldError(field, message) {
        clearFieldError(field);

        field.style.borderColor = '#e74c3c';
        field.style.backgroundColor = '#fadbd8';

        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.9rem';
        errorDiv.style.marginTop = '0.25rem';
        errorDiv.textContent = message;

        field.parentNode.appendChild(errorDiv);
    }

    function clearFieldError(field) {
        field.style.borderColor = '#bdc3c7';
        field.style.backgroundColor = '';

        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    // Character counter for textarea
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        const maxLength = textarea.getAttribute('maxlength');
        if (maxLength) {
            const counter = document.createElement('div');
            counter.className = 'char-counter';
            counter.style.textAlign = 'right';
            counter.style.fontSize = '0.8rem';
            counter.style.color = '#7f8c8d';
            counter.style.marginTop = '0.25rem';

            textarea.parentNode.appendChild(counter);

            function updateCounter() {
                const remaining = maxLength - textarea.value.length;
                counter.textContent = `${remaining} characters remaining`;
                counter.style.color = remaining < 20 ? '#e74c3c' : '#7f8c8d';
            }

            textarea.addEventListener('input', updateCounter);
            updateCounter();
        }
    });
});