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

// --- 🧠 GLOBAL TEST LOGIC ---
const testTemplate = {
    quiz: {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks and Text Markup Language",
            "Home Tool Markup Language"
        ],
        correctAnswer: 0
    },
    subjective: {
        question: "Explain the difference between var, let, and const."
    },
    coding: {
        question: "Write a function to check if a number is a palindrome."
    }
};

class CandidateStateManager {
    constructor() {
        this.storageKey = 'candidateState';
        this.statsKey = 'candidateStats'; // 💾 PER USER REQUEST
        this.state = this.loadState();
        this.stats = this.loadStats();
    }

    loadState() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) return JSON.parse(stored);

        // Default Legacy State (Keep for compatibility)
        return {
            isLoggedIn: true,
            userRole: 'candidate',
            profile: { name: 'Candidate User' },
            stats: { attempted: 0, pending: 0, selected: 0, rejected: 0 },
            applications: [], // Legacy tracking
            theme: localStorage.getItem('theme') || 'dark'
        };
    }

    loadStats() {
        const stored = localStorage.getItem(this.statsKey);
        if (stored) return JSON.parse(stored);

        // 💾 DATA PERSISTENCE RULES
        const defaultStats = {
            attemptedTests: 0,
            testHistory: [],
            quizScoreHistory: [] // To track correct/incorrect
        };
        localStorage.setItem(this.statsKey, JSON.stringify(defaultStats));
        return defaultStats;
    }

    // 🚀 N8N INTEGRATION: DASHBOARD DATA
    async fetchDashboardData() {
        const email = localStorage.getItem('userEmail');
        try {
            const response = await fetch(`https://jainil2658.app.n8n.cloud/webhook/candidate/dashboard?email=${email}`);
            const data = await response.json();
            // Map incoming data to state
            if (data.stats) this.state.stats = data.stats;
            if (data.testHistory) this.stats.testHistory = data.testHistory;
            this.saveState();
            this.saveStats();
            return data;
        } catch (e) {
            console.error("Dashboard fetch error:", e);
        }
    }

    // 🚀 N8N INTEGRATION: GET PROFILE
    async fetchProfile() {
        const email = localStorage.getItem('userEmail');
        try {
            const response = await fetch(`https://mythic025.app.n8n.cloud/webhook/candidate/profile?email=${email}`);
            const data = await response.json();
            localStorage.setItem('candidateProfile', JSON.stringify(data));
            return data;
        } catch (e) {
            console.error("Profile fetch error:", e);
        }
    }

    // 🚀 N8N INTEGRATION: UPDATE PROFILE
    async updateProfile(profileData) {
        try {
            const response = await fetch('https://mythic025.app.n8n.cloud/webhook/candidate/profile/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profileData)
            });
            const data = await response.json();
            localStorage.setItem('candidateProfile', JSON.stringify(profileData));
            return data;
        } catch (e) {
            console.error("Profile update error:", e);
            throw e;
        }
    }

    // 🚀 N8N INTEGRATION: APPLY FOR TEST
    async applyForTest(testId, company) {
        const email = localStorage.getItem('userEmail');
        try {
            const response = await fetch('https://mythic025.app.n8n.cloud/webhook/candidate/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, testId, company })
            });
            const data = await response.json();
            window.location.href = `test.html?company=${encodeURIComponent(company)}`;
            return data;
        } catch (e) {
            console.error("Apply error:", e);
            // Fallback to navigation anyway if webhook is down or async
            window.location.href = `test.html?company=${encodeURIComponent(company)}`;
        }
    }

    saveStats() {
        localStorage.setItem(this.statsKey, JSON.stringify(this.stats));
    }

    saveState(newState = this.state) {
        this.state = newState;
        localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    }

    // ✅ SUBMIT TEST BUTTON — LOGIC
    submitTestSession(answers) {
        // Evaluate Quiz
        const isCorrect = parseInt(answers.quizAnswer) === testTemplate.quiz.correctAnswer;

        // Update Internal Stats
        this.stats.attemptedTests++;
        this.stats.quizScoreHistory.push(isCorrect ? 1 : 0);
        this.stats.testHistory.push({
            date: new Date().toISOString(),
            quizCorrect: isCorrect,
            subjectiveLength: answers.subjectiveAnswer.length,
            codingLength: answers.codingAnswer.length
        });

        // Sync with dashboard legacy stats (for immediate UI compatibility)
        this.state.stats.attempted++;

        this.saveStats();
        this.saveState();

        return true;
    }

    // Helper to get raw stats
    getStats() {
        return this.stats;
    }

    logout() {
        localStorage.clear();
        window.location.href = '../index.html';
    }
}

// Global Instance
window.candidateState = new CandidateStateManager();


// DOM Loaded Logic
document.addEventListener('DOMContentLoaded', () => {
    // === THEME LOGIC ===
    const themeBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = themeBtn ? themeBtn.querySelector('span') : null;

    function updateThemeIcon(mode) {
        if (themeBtn) {
            // If themeBtn directly contains text or icon
            themeBtn.innerHTML = mode === 'light' ? '☀️' : '🌙';
        }
    }

    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        // Default is Dark (no class). Light is .light-mode
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            updateThemeIcon('light');
        } else {
            document.body.classList.remove('light-mode');
            updateThemeIcon('dark');
        }
    }

    // Init immediately
    initTheme();

    if (themeBtn) {
        themeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isLight = document.body.classList.toggle('light-mode');
            const newTheme = isLight ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);

            // 📢 DISPATCH EVENT FOR CHART OR OTHER UI
            window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
        });
    }

    // 1. Profile Dropdown Logic
    // Fix: dashboard.html has two .profile-trigger elements (theme btn + profile icon).
    // The theme btn has id="theme-toggle-btn", so we exclude it to find the actual profile icon.
    const profileTrigger = document.querySelector('.profile-trigger:not(#theme-toggle-btn)');
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
            e.preventDefault();
            window.location.href = 'profile.html';
        });
    }

    // 4. Apply Button Logic is now handled by inline onclick in tests.html or renderer
});
