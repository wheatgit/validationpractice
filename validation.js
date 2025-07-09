// Basic email validation function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Required field validation function
function validateRequired(value) {
    return value.trim().length > 0;
}

// Test the functions
console.log('Email validation test:');
console.log('test@example.com:', validateEmail('test@example.com')); // true
console.log('invalid-email:', validateEmail('invalid-email')); // false
console.log('@example.com:', validateEmail('@example.com')); // false

// Password strength validation function
function validatePasswordStrength(password) {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    
    return hasMinLength && hasUpperCase && hasLowerCase && hasNumber;
}

// Password match validation function
function validatePasswordMatch(password, confirmation) {
    return password === confirmation;
}

// Postal code validation function
function validatePostalCode(postalCode, country) {
    if (!postalCode.trim()) return false;
    
    const patterns = {
        'US': /^\d{5}(-\d{4})?$/,
        'CA': /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
        'UK': /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/i,
        'AU': /^\d{4}$/,
        'DE': /^\d{5}$/,
        'FR': /^\d{5}$/,
        'JP': /^\d{3}-\d{4}$/,
        'BR': /^\d{5}-\d{3}$/,
        'IN': /^\d{6}$/,
        'MX': /^\d{5}$/
    };
    
    return patterns[country] ? patterns[country].test(postalCode) : true;
}

// Error messages
const ErrorMessages = {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    passwordStrength: 'Password must be at least 8 characters with uppercase, lowercase, and number',
    passwordMatch: 'Passwords do not match',
    postalCode: (country) => {
        const formats = {
            'US': 'Enter a valid US ZIP code (e.g., 12345 or 12345-6789)',
            'CA': 'Enter a valid Canadian postal code (e.g., A1A 1A1)',
            'UK': 'Enter a valid UK postcode (e.g., SW1A 1AA)',
            'AU': 'Enter a valid Australian postcode (e.g., 2000)',
            'DE': 'Enter a valid German postal code (e.g., 12345)',
            'FR': 'Enter a valid French postal code (e.g., 75001)',
            'JP': 'Enter a valid Japanese postal code (e.g., 123-4567)',
            'BR': 'Enter a valid Brazilian postal code (e.g., 12345-678)',
            'IN': 'Enter a valid Indian postal code (e.g., 123456)',
            'MX': 'Enter a valid Mexican postal code (e.g., 12345)'
        };
        return formats[country] || 'Enter a valid postal code';
    }
};


class FieldValidator {
    constructor(fieldId, rules) {
        this.field = document.getElementById(fieldId);
        this.errorElement = document.getElementById(`${fieldId}-error`);
        this.rules = rules;
        this.isValid = false;
    }
    
    validate() {
        const value = this.field.value;
        let isValid = true;
        let errorMessage = '';
        
        // Check required first
        if (this.rules.includes('required') && !validateRequired(value)) {
            isValid = false;
            errorMessage = ErrorMessages.required;
        } else if (value.trim()) {
            // Only validate other rules if field is not empty
            for (const rule of this.rules) {
                if (rule === 'required') continue;
                
                let ruleValid = true;
                switch (rule) {
                    case 'email':
                        ruleValid = validateEmail(value);
                        if (!ruleValid) errorMessage = ErrorMessages.email;
                        break;
                    case 'passwordStrength':
                        ruleValid = validatePasswordStrength(value);
                        if (!ruleValid) errorMessage = ErrorMessages.passwordStrength;
                        break;
                    case 'postalCode':
                        const country = document.getElementById('country').value;
                        ruleValid = validatePostalCode(value, country);
                        if (!ruleValid) errorMessage = ErrorMessages.postalCode(country);
                        break;
                }
                
                if (!ruleValid) {
                    isValid = false;
                    break;
                }
            }
        }
        
        this.isValid = isValid;
        this.updateUI(errorMessage);
        return isValid;
    }
    
    updateUI(errorMessage) {
        if (this.isValid) {
            this.field.classList.remove('error');
            this.field.classList.add('valid');
            this.errorElement.textContent = '';
            this.errorElement.style.display = 'none';
        } else {
            this.field.classList.remove('valid');
            this.field.classList.add('error');
            this.errorElement.textContent = errorMessage;
            this.errorElement.style.display = 'block';
        }
    }
    
    clearValidation() {
        this.field.classList.remove('error', 'valid');
        this.errorElement.textContent = '';
        this.errorElement.style.display = 'none';
        this.isValid = false;
    }
}

// Form manager class
class FormManager {
    constructor() {
        this.form = document.getElementById('registrationForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.validators = new Map();
        this.isFormValid = false;
        
        this.initializeValidators();
    }
    
    initializeValidators() {
        // Email validator
        this.validators.set('email', new FieldValidator('email', ['required', 'email']));
        
        // Country validator
        this.validators.set('country', new FieldValidator('country', ['required']));
        
        // Postal code validator
        this.validators.set('postalCode', new FieldValidator('postalCode', ['required', 'postalCode']));
        
        // Password validator
        this.validators.set('password', new FieldValidator('password', ['required', 'passwordStrength']));
        
        // Password confirmation validator
        this.validators.set('passwordConfirm', new FieldValidator('passwordConfirm', ['required']));
    }
    
    validateAll() {
        let allValid = true;
        
        for (const [fieldName, validator] of this.validators) {
            const isValid = validator.validate();
            if (!isValid) allValid = false;
        }
        
        this.isFormValid = allValid;
        this.updateSubmitButton();
        
        return this.isFormValid;
    }
    
    updateSubmitButton() {
        if (this.isFormValid) {
            this.submitBtn.disabled = false;
            this.submitBtn.classList.remove('disabled');
        } else {
            this.submitBtn.disabled = true;
            this.submitBtn.classList.add('disabled');
        }
    }
    
    setupEventListeners() {
        // Add input and blur listeners to all fields
        for (const [fieldName, validator] of this.validators) {
            validator.field.addEventListener('input', () => {
                validator.validate();
                this.validatePasswordMatch();
                this.updateSubmitButton();
            });
            
            validator.field.addEventListener('blur', () => {
                validator.validate();
                this.validatePasswordMatch();
                this.updateSubmitButton();
            });
        }
        
        // Country change - revalidate postal code
        document.getElementById('country').addEventListener('change', () => {
            this.validators.get('postalCode').validate();
            this.validatePasswordMatch();
            this.updateSubmitButton();
        });
    }
    
    validatePasswordMatch() {
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;
        const passwordConfirmValidator = this.validators.get('passwordConfirm');
        
        if (passwordConfirm && password !== passwordConfirm) {
            passwordConfirmValidator.isValid = false;
            passwordConfirmValidator.updateUI(ErrorMessages.passwordMatch);
        } else if (passwordConfirm) {
            passwordConfirmValidator.isValid = true;
            passwordConfirmValidator.updateUI('');
        }
    }
}
