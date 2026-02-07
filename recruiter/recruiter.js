// Strict Authentication Guard
const checkAuth = () => {
    const role = localStorage.getItem('userRole');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn !== 'true' || role !== 'recruiter') {
        console.warn('Unauthorized Access. Redirecting to Login...');
        window.location.href = '../index.html';
    }
};
checkAuth();

// --- 1. RECRUITER STATE MANAGER ---
class RecruiterStateManager {
    constructor() {
        this.STORAGE_KEY = 'recruiterState';
        this.data = this.loadData();
    }

    loadData() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) return JSON.parse(stored);

        return {
            tests: [
                { id: 1, title: 'React Frontend Developer', role: 'Frontend', status: 'Active', applicants: 15, completed: 8 },
                { id: 2, title: 'Node.js Backend Engineer', role: 'Backend', status: 'Active', applicants: 12, completed: 5 },
                { id: 3, title: 'Data Science Intern', role: 'Data Science', status: 'Closed', applicants: 45, completed: 40 }
            ],
            candidates: [
                { id: 101, name: "Alice Freeman", role: "Frontend", test: "React Frontend Developer", status: "Pending", score: "85%", answers: { subjective: "...", quiz: "B) Virtual DOM", coding: "..." } },
                { id: 102, name: "Bob Smith", role: "Backend", test: "Node.js Backend Engineer", status: "Rejected", score: "45%", answers: { subjective: "...", quiz: "A) Event Loop", coding: "..." } }
            ]
        };
    }

    save() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
        this.updateUI();
    }

    getMetrics() {
        const c = this.data.candidates;
        return {
            totalTests: this.data.tests.length,
            totalCandidates: c.length,
            selected: c.filter(x => x.status === 'Selected').length,
            rejected: c.filter(x => x.status === 'Rejected').length,
            pending: c.filter(x => x.status === 'Pending').length
        };
    }

    getCandidates() { return this.data.candidates; }
    getTests() { return this.data.tests; }

    // 🚀 N8N INTEGRATION: CREATE TEST & GENERATE BLUEPRINT
    async addTest(testData) {
        const email = localStorage.getItem('userEmail');

        try {
            // 1. Create Test Entry
            const createRes = await fetch('https://mythic025.app.n8n.cloud/webhook/recruiter/create-test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...testData, recuriterEmail: email })
            });
            const createdTest = await createRes.json();

            // 2. Generate Blueprint (Background process usually, but we hit the trigger)
            fetch('https://daddys27.app.n8n.cloud/webhook/genrateBluePrint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ testId: createdTest.id || Date.now(), title: testData.title })
            }).catch(e => console.error("Blueprint error:", e));

            // Local Update
            this.data.tests.push({
                id: createdTest.id || Date.now(),
                title: testData.title,
                role: testData.role,
                status: 'Active',
                applicants: 0,
                completed: 0
            });
            this.save();
            return true;
        } catch (e) {
            console.error("Create test error:", e);
            // Fallback local add if webhook fails
            this.data.tests.push({ id: Date.now(), ...testData, status: 'Active', applicants: 0, completed: 0 });
            this.save();
        }
    }

    updateCandidateStatus(id, newStatus) {
        const candidate = this.data.candidates.find(c => c.id === id);
        if (candidate) {
            candidate.status = newStatus;
            this.save();
            showToast(`Candidate marked as ${newStatus}`, newStatus === 'Selected' ? 'success' : 'error');
        }
    }

    updateTest(id, updatedData) {
        const testIndex = this.data.tests.findIndex(t => t.id === id);
        if (testIndex !== -1) {
            this.data.tests[testIndex] = { ...this.data.tests[testIndex], ...updatedData };
            this.save();
            showToast('Test Updated Successfully!', 'success');
        }
    }

    updateUI() {
        renderDashboard();
        renderApplications();
        renderTests();
    }
}

const stateManager = new RecruiterStateManager();

// --- 2. CORE RENDER LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    stateManager.updateUI();
    setupNavigation();
});

function renderDashboard() {
    const metrics = stateManager.getMetrics();
    if (document.getElementById('stat-total-tests')) document.getElementById('stat-total-tests').innerText = metrics.totalTests;
    if (document.getElementById('stat-total-candidates')) document.getElementById('stat-total-candidates').innerText = metrics.totalCandidates;
    if (document.getElementById('stat-selected')) document.getElementById('stat-selected').innerText = metrics.selected;
    if (document.getElementById('stat-rejected')) document.getElementById('stat-rejected').innerText = metrics.rejected;
    updateChart(metrics);
}

let dashboardChart;
function updateChart(metrics) {
    const ctx = document.getElementById('recruiterChart');
    if (!ctx) return;
    if (dashboardChart) dashboardChart.destroy();
    dashboardChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Pending', 'Selected', 'Rejected'],
            datasets: [{
                label: 'Candidate Status',
                data: [metrics.pending, metrics.selected, metrics.rejected],
                backgroundColor: ['#FBBF24', '#10B981', '#EF4444'],
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1, color: '#94A3B8' }, grid: { color: '#334155' } },
                x: { ticks: { color: '#94A3B8' }, grid: { display: false } }
            }
        }
    });
}

function renderApplications() {
    const tbody = document.getElementById('candidatesBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    const candidates = stateManager.getCandidates();
    candidates.forEach(c => {
        const row = document.createElement('tr');
        const statusClass = c.status === 'Selected' ? 'status-selected' : c.status === 'Rejected' ? 'status-rejected' : 'status-pending';
        row.innerHTML = `
            <td>
                <div style="font-weight: 500">${c.name}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted)">${c.test}</div>
            </td>
            <td>${c.role}</td>
            <td>${c.score}</td>
            <td><span class="status-badge ${statusClass}">${c.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon" title="View Test" onclick="viewTest(${c.id})">👁️</button>
                    ${c.status === 'Pending' ? `
                        <button class="btn-icon success" title="Select" onclick="updateStatus(${c.id}, 'Selected')">✅</button>
                        <button class="btn-icon danger" title="Reject" onclick="updateStatus(${c.id}, 'Rejected')">❌</button>
                    ` : ''}
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function renderTests() {
    const tbody = document.getElementById('testsBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    const tests = stateManager.getTests();
    tests.forEach(t => {
        const row = document.createElement('tr');
        const badgeClass = t.status === 'Active' ? 'status-selected' : 'status-rejected';
        row.innerHTML = `
            <td><div style="font-weight: 500">${t.title}</div></td>
            <td>${t.role}</td>
            <td>${t.applicants} Applicants</td>
            <td><span class="status-badge ${badgeClass}">${t.status}</span></td>
            <td><button class="btn-secondary btn-sm" onclick="editTest(${t.id})">Edit</button></td>
        `;
        tbody.appendChild(row);
    });
}

window.updateStatus = (id, status) => stateManager.updateCandidateStatus(id, status);
window.viewTest = (id) => {
    const c = stateManager.getCandidates().find(x => x.id === id);
    if (!c) return;
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal-box" style="max-width: 600px; text-align: left;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1.5rem;">
                <h2>${c.name}'s Results</h2>
                <button class="btn-secondary btn-sm" onclick="this.closest('.modal-overlay').remove()">Close</button>
            </div>
            <div class="test-section"><h4>Subjective</h4><div class="code-snippet">${c.answers.subjective}</div></div>
            <div class="test-section"><h4>Quiz</h4><div class="code-snippet">${c.answers.quiz}</div></div>
            <div class="test-section"><h4>Coding</h4><div class="code-snippet">${c.answers.coding}</div></div>
        </div>
    `;
    document.body.appendChild(modal);
};

window.editTest = (id) => {
    const t = stateManager.getTests().find(x => x.id === id);
    if (!t) return;
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal-box" style="max-width: 500px; text-align: left;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1.5rem;">
                <h2>Edit Test</h2>
                <button class="btn-secondary btn-sm" onclick="this.closest('.modal-overlay').remove()">Close</button>
            </div>
            <form onsubmit="updateTestSubmit(event, ${t.id})">
                <div class="form-group"><label>Title</label><input type="text" name="title" value="${t.title}" required></div>
                <div class="form-group"><label>Status</label><select name="status"><option value="Active" ${t.status === 'Active' ? 'selected' : ''}>Active</option><option value="Closed" ${t.status === 'Closed' ? 'selected' : ''}>Closed</option></select></div>
                <div class="modal-actions"><button type="submit" class="btn-primary">Save</button></div>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
};

window.updateTestSubmit = (e, id) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    stateManager.updateTest(id, { title: formData.get('title'), status: formData.get('status') });
    e.target.closest('.modal-overlay').remove();
};

window.createJob = async (e) => {
    e.preventDefault();
    const title = e.target.querySelector('input[type="text"]').value;
    const role = e.target.querySelector('select').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');

    submitBtn.innerText = 'Creating...';
    submitBtn.disabled = true;

    await stateManager.addTest({ title, role });

    showToast('Job Created & Blueprint Triggered!', 'success');
    e.target.reset();
    submitBtn.innerText = 'Create Assessment';
    submitBtn.disabled = false;
    document.querySelector('.nav-item[data-view="manage-tests"]').click();
};

const handleLogout = () => {
    localStorage.clear();
    window.location.href = '../index.html';
};

function setupProfileEvents() {
    const trigger = document.querySelector('.profile-trigger');
    const dropdown = document.querySelector('.profile-dropdown');
    if (trigger && dropdown) {
        trigger.addEventListener('click', (e) => { e.stopPropagation(); dropdown.classList.toggle('active'); });
        document.addEventListener('click', () => dropdown.classList.remove('active'));
    }
    document.querySelectorAll('.logout-btn').forEach(btn => btn.addEventListener('click', handleLogout));
}

function showToast(msg, type = 'success') {
    const toast = document.createElement('div');
    toast.style.cssText = `position: fixed; bottom: 20px; right: 20px; background: ${type === 'success' ? '#10B981' : '#EF4444'}; color: white; padding: 1rem 2rem; border-radius: 8px; z-index: 1000;`;
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function setupNavigation() {
    document.querySelectorAll('.nav-item[data-view]').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
            item.classList.add('active');
            document.getElementById(item.dataset.view).classList.add('active');
        });
    });
    setupProfileEvents();
}
