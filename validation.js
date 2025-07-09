// Basic email validation function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Test the function
console.log('Email validation test:');
console.log('test@example.com:', validateEmail('test@example.com')); // true
console.log('invalid-email:', validateEmail('invalid-email')); // false
console.log('@example.com:', validateEmail('@example.com')); // false 