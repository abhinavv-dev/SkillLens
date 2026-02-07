// Login Logic - Strict Auth Flow

// 1. Clear any existing session on load (Force strict login)
// window.onload = () => {
//     // Optional: Auto-redirect logic commented out for clean start
// };

function handleLogin(role) {
    if (!role) return;

    // Validation Logic with Inline Errors
    let emailInput, passwordInput, emailError, passwordError;

    if (role === 'recruiter') {
        emailInput = document.getElementById('recruiter-email');
        passwordInput = document.getElementById('recruiter-password');
        emailError = document.getElementById('recruiter-email-error');
        passwordError = document.getElementById('recruiter-password-error');
    } else if (role === 'candidate') {
        emailInput = document.getElementById('candidate-email');
        passwordInput = document.getElementById('candidate-password');
        emailError = document.getElementById('candidate-email-error');
        passwordError = document.getElementById('candidate-password-error');
    }

    const email = emailInput ? emailInput.value : '';
    const password = passwordInput ? passwordInput.value : '';

    // Helper: Show Error
    const showError = (element, message) => {
        if (element) {
            element.textContent = message;
            element.style.visibility = 'visible';
        }
    };

    // Helper: Clear Errors
    const clearErrors = () => {
        if (emailError) emailError.style.visibility = 'hidden';
        if (passwordError) passwordError.style.visibility = 'hidden';
    };

    // Auto-dismiss errors on input
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            if (emailError) emailError.style.visibility = 'hidden';
        });
    }
    if (passwordInput) {
        passwordInput.addEventListener('input', () => {
            if (passwordError) passwordError.style.visibility = 'hidden';
        });
    }

    // Clear previous errors
    clearErrors();

    // Requirement: Prevent navigation if fields are empty
    let hasError = false;

    if (!email) {
        showError(emailError, 'Please enter email.');
        hasError = true;
    }
    if (!password) {
        showError(passwordError, 'Please enter password.');
        hasError = true;
    }

    if (hasError) return;

    // --- VALIDATION LOGIC START ---

    // 1. Email Validation
    // Rules: Must contain '@', Must contain '.com', '@' must be before '.com'
    const atIndex = email.indexOf('@');
    const dotComIndex = email.indexOf('.com');

    if (atIndex === -1 || dotComIndex === -1 || atIndex > dotComIndex) {
        showError(emailError, 'Incorrect email format');
        return;
    }

    // 2. Password Validation
    // Rules: Min 8 chars, 1 Uppercase (A-Z), 1 Digit (0-9)
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const isLongEnough = password.length >= 8;

    if (!isLongEnough || !hasUpperCase || !hasNumber) {
        showError(passwordError, 'Password must contain at least 8 characters, one uppercase letter, and one number');
        return;
    }
    // --- VALIDATION LOGIC END ---

    // If valid (non-empty), proceed with login logic
    console.log(`Logging in as ${role} with email: ${email}`);

    // Show loading state
    const loginBtn = document.querySelector(role === 'recruiter' ? '.recruiter .btn-select' : '.candidate .btn-select');
    const originalBtnText = loginBtn ? loginBtn.innerText : '';
    if (loginBtn) {
        loginBtn.innerText = 'Logging in...';
        loginBtn.disabled = true;
    }

    // 🚀 N8N INTEGRATION: AUTH LOGIN
    fetch('https://jainil2658.app.n8n.cloud/webhook/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
    })
        .then(response => {
            if (!response.ok) throw new Error('Login failed');
            return response.json();
        })
        .then(data => {
            // 1. Set Auth Flags
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userRole', role);
            localStorage.setItem('userEmail', email);

            // 2. Redirect based on Role
            if (role === 'candidate') {
                window.location.href = 'candidate/dashboard.html';
            } else if (role === 'recruiter') {
                window.location.href = 'recruiter/dashboard.html';
            }
        })
        .catch(error => {
            console.error('Login Error:', error);
            const errorElement = role === 'recruiter' ? document.getElementById('recruiter-password-error') : document.getElementById('candidate-password-error');
            if (errorElement) {
                errorElement.textContent = 'Authentication failed. Please check your credentials.';
                errorElement.style.visibility = 'visible';
            }
        })
        .finally(() => {
            if (loginBtn) {
                loginBtn.innerText = originalBtnText;
                loginBtn.disabled = false;
            }
        });
}

// Attach to window just in case
window.handleLogin = handleLogin;
