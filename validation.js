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
