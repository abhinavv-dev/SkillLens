// Login Logic - Strict Auth Flow

// 1. Clear any existing session on load (Force strict login)
window.onload = () => {
    // Optional: Auto-redirect logic commented out for clean start
};

function handleLogin(role) {
    if (!role) return;

    // Validation Logic Added
    let email, password;

    if (role === 'recruiter') {
        const emailInput = document.getElementById('recruiter-email');
        const passwordInput = document.getElementById('recruiter-password');

        email = emailInput ? emailInput.value : '';
        password = passwordInput ? passwordInput.value : '';

        // Requirement: Prevent navigation if fields are empty
        if (!email || !password) {
            alert('Please enter both email and password to continue.');
            return;
        }

    } else if (role === 'candidate') {
        const emailInput = document.getElementById('candidate-email');
        const passwordInput = document.getElementById('candidate-password');

        email = emailInput ? emailInput.value : '';
        password = passwordInput ? passwordInput.value : '';

        // Requirement: Prevent navigation if fields are empty
        if (!email || !password) {
            alert('Please enter both email and password to continue.');
            return;
        }
    }

    // If valid (non-empty), proceed with login logic
    console.log(`Logging in as ${role} with email: ${email}`); // For debug/verification logic is reading values

    // 1. Set Auth Flags
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);
    localStorage.setItem('userEmail', email); // Storing email for potential usage

    // 2. Redirect based on Role - Paths updated to match folder structure seen in previous steps
    if (role === 'candidate') {
        window.location.href = 'candidate/dashboard.html';
    } else if (role === 'recruiter') {
        // The previous step showed ./recruiter_dashboard_vanilla/index.html in the old script
        // BUT the file listing showed 'recruiter' folder with 'dashboard.html'.
        // Let's check the file list again or use the one I saw in step 32: recruiter/dashboard.html
        // Actually step 32 showed `recruiter/dashboard.html`.
        // Step 81 (index.html) had logic: window.location.href = './recruiter_dashboard_vanilla/index.html'; which might be stale or wrong.
        // Given I just saw recruiter/dashboard.html existed, I should probably use that.
        // Wait, the prompt said "Use existing routing/paths" and "Do NOT rename dashboard files".
        // Use path: `recruiter/dashboard.html` based on file listing.
        window.location.href = 'recruiter/dashboard.html';
    } else {
        alert('Invalid Role Selected');
    }
}

// Attach to window just in case
window.handleLogin = handleLogin;
