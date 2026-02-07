// 0. Strict Auth Guard
// Must run immediately to prevent flash of content
const checkAuth = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const role = localStorage.getItem('userRole');

    // Guard: Check login AND role using strict equality
    if (isLoggedIn !== 'true' || role !== 'candidate') {
        console.warn('Unauthorized Access. Redirecting to Login...');
        window.location.href = '../index.html'; // Go up to root login
    }
};
checkAuth();

// DOM Loaded Logic
document.addEventListener('DOMContentLoaded', () => {
    // 1. Profile Dropdown Logic
    const profileTrigger = document.querySelector('.profile-trigger');
    const profileDropdown = document.querySelector('.profile-dropdown');

    if (profileTrigger && profileDropdown) {
        // Toggle dropdown
        profileTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!profileTrigger.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove('active');
            }
        });
    }

    // 2. Logout Logic (Strict)
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.clear(); // Wipe everything
            window.location.href = '../index.html';
        });
    }

    // 3. Profile Modal Logic
    const profileLink = document.querySelector('.profile-link');
    if (profileLink) {
        profileLink.addEventListener('click', (e) => {
            // Check if we are already on profile page to avoid reload? Not strictly necessary.
            // But we need to allow default link behavior if it was an <a> tag. 
            // Since it is a <div>, we must use JS.
            e.preventDefault(); // Good practice even for divs if they catch bubbled events
            window.location.href = 'profile.html';
        });
    }

    // 4. Apply Button Logic (Only runs on tests page)
    const applyButtons = document.querySelectorAll('.btn-apply');

    applyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.test-card');
            const role = card.querySelector('.role-title').innerText.replace('Role: ', '');
            const companyAlt = card.querySelector('.company-logo').alt;

            const message = `Successfully applied for ${role} at ${companyAlt}!`;

            // UI Feedback
            alert(message);
            console.log(`[Application] User applied to: ${companyAlt} - ${role}`);

            // Change button state
            e.target.innerText = 'Applied';
            e.target.style.backgroundColor = '#10B981'; // Green
            e.target.disabled = true;
        });
    });
});
