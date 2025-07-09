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
