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
