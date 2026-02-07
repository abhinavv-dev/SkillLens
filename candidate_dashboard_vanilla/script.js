// Role Guard
const role = localStorage.getItem('userRole');
if (role !== 'candidate') {
    window.location.href = '../login.html';
}

document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Logic ---
    const navBtns = document.querySelectorAll('.nav-btn');
    const views = document.querySelectorAll('.view-container');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            navBtns.forEach(b => b.classList.remove('active'));
            views.forEach(v => v.classList.add('hidden'));

            // Add active to clicked
            btn.classList.add('active');
            const targetId = `${btn.dataset.view}-view`;
            document.getElementById(targetId).classList.remove('hidden');
        });
    });

    // --- Chart Logic ---
    const ctx = document.getElementById('skillsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Coding Skills', 'Problem Solving', 'Technical Knowledge'],
            datasets: [{
                label: 'Score',
                data: [85, 75, 92],
                backgroundColor: [
                    '#3b82f6',
                    '#f59e0b',
                    '#10b981'
                ],
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // --- Tests Rendering ---
    const companies = [
        { name: 'Google', role: 'Full Stack Developer' },
        { name: 'Amazon', role: 'Data Scientist' },
        { name: 'Infosys', role: 'EQA Engineer' },
        { name: 'Microsoft', role: 'Backend Developer' },
        { name: 'TCS', role: 'DevOps Engineer' },
        { name: 'Wipro', role: 'UI-UX Designer' },
        { name: 'Accenture', role: 'Cyber Security Analyst' },
        { name: 'Oracle', role: 'AI-ML Specialist' }
    ];

    const testsGrid = document.getElementById('tests-grid');

    // Helper to generate logo color/text
    const getLogoStyle = (name) => {
        // Simple mock logos using text
        return `<h2 class="company-name-text" style="color: #333">${name}</h2>`;
    };

    companies.forEach(company => {
        const card = document.createElement('div');
        card.className = 'company-card';
        card.innerHTML = `
            <div class="company-logo">
                <!-- Ideally images, using text for fallback offline/vanilla -->
                 ${getLogoStyle(company.name)}
            </div>
            <div class="role-text">Role: ${company.role}</div>
            <button class="apply-btn" onclick="applyTest('${company.name}')">Apply</button>
        `;
        testsGrid.appendChild(card);
    });

    // --- Global Actions ---
    window.resumeTest = () => {
        alert("Resuming Front-End Developer Test...");
    };

    window.applyTest = (company) => {
        alert(`Application started for ${company}!`);
    };
});
