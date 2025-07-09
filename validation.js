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

console.log('\nRequired field validation test:');
console.log('"hello":', validateRequired('hello')); // true
console.log('"":', validateRequired('')); // false
console.log('"   ":', validateRequired('   ')); // false
console.log('"  hello  ":', validateRequired('  hello  ')); // true 