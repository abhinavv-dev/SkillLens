// Strict Authentication Guard
const checkAuth = () => {
    const role = localStorage.getItem('userRole');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    // Guard: Check login and role
    if (isLoggedIn !== 'true' || role !== 'recruiter') {
        console.warn('Unauthorized Access. Redirecting to Login...');
        window.location.href = '../index.html'; // Go up to root login
    }
};
checkAuth();

document.addEventListener('DOMContentLoaded', () => {
    // Navigation Logic
    const navItems = document.querySelectorAll('.nav-item[data-view]');
    const views = document.querySelectorAll('.view-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetView = item.dataset.view;

            // Update Active State
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Toggle Views
            views.forEach(view => {
                view.classList.remove('active');
                if (view.id === targetView) {
                    view.classList.add('active');
                }
            });
        });
    });

    // Profile Logic
    const profileTrigger = document.querySelector('.profile-trigger');
    const profileDropdown = document.querySelector('.profile-dropdown');

    if (profileTrigger && profileDropdown) {
        profileTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!profileTrigger.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove('active');
            }
        });
    }

    // Logout Function (Strict)
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '../index.html';
    };

    // Logout Buttons (Sidebar + Dropdown)
    const logoutBtns = document.querySelectorAll('.logout-btn');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            handleLogout();
        });
    });

    // Profile Click
    const profileLink = document.querySelector('.profile-link');
    if (profileLink) {
        profileLink.addEventListener('click', () => {
            // Redirect to profile page
            window.location.href = 'profile.html';
        });
    }

    // Mock Data rendering (Candidates)
    const candidates = [
        { name: "John Doe", role: "Frontend Dev", score: "85%", status: "Pending" },
        { name: "Sarah Smith", role: "Data Scientist", score: "92%", status: "Selected" },
        { name: "Mike Johnson", role: "Backend Dev", score: "45%", status: "Rejected" },
        { name: "Emily Davis", role: "UI Designer", score: "78%", status: "Pending" }
    ];

    const tbody = document.getElementById('candidatesBody');
    if (tbody) {
        tbody.innerHTML = ''; // prevent duplicates if re-run
        candidates.forEach(c => {
            const row = document.createElement('tr');
            const statusClass = c.status === 'Selected' ? 'status-selected' : c.status === 'Rejected' ? 'status-rejected' : 'status-pending';

            row.innerHTML = `
                <td>${c.name}</td>
                <td>${c.role}</td>
                <td>${c.score}</td>
                <td><span class="status-badge ${statusClass}">${c.status}</span></td>
                <td><button class="btn-primary btn-sm">View</button></td>
            `;
            tbody.appendChild(row);
        });
    }

    // Mock Tests rendering
    const tests = [
        { title: "React Fundamentals", role: "Frontend Dev", applicants: 45 },
        { title: "Python for Data Science", role: "Data Scientist", applicants: 23 },
        { title: "Java Backend", role: "Backend Dev", applicants: 12 }
    ];

    const testsBody = document.getElementById('testsBody');
    if (testsBody) {
        testsBody.innerHTML = '';
        tests.forEach(t => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${t.title}</td>
                <td>${t.role}</td>
                <td>${t.applicants}</td>
                <td><button class="btn-primary btn-sm">Edit</button></td>
            `;
            testsBody.appendChild(row);
        });
    }
});

window.createJob = (e) => {
    e.preventDefault();
    alert("Job Created Successfully!");
};
