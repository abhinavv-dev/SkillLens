// 🧠 TEST STATE
const testState = {
    company: "Unknown",
    quizAnswer: null,
    subjectiveAnswer: "",
    codingAnswer: "",
    startTime: Date.now()
};

let timerInterval;

document.addEventListener('DOMContentLoaded', () => {
    // 1️⃣ Initialize
    initCompany();
    startTimer(30 * 60); // 30 Minutes

    // 2️⃣ Block Navigation
    window.addEventListener('beforeunload', (e) => {
        e.preventDefault();
        e.returnValue = '';
    });

    // 3️⃣ Input Listeners
    document.getElementById('quizInput').addEventListener('input', (e) => {
        testState.quizAnswer = e.target.value.trim(); // Capture text answer
    });
    document.getElementById('subjectiveInput').addEventListener('input', (e) =>
        testState.subjectiveAnswer = e.target.value
    );
    document.getElementById('codingInput').addEventListener('input', (e) =>
        testState.codingAnswer = e.target.value
    );
});

// 🏢 INIT COMPANY (URL Param)
function initCompany() {
    const params = new URLSearchParams(window.location.search);
    const company = params.get('company');
    if (company) {
        testState.company = company;
        document.getElementById('companyName').innerText = company + " Assessment";
    }
}

// ⏳ TIMER LOGIC
function startTimer(duration) {
    let timer = duration, minutes, seconds;
    const display = document.getElementById('timerDisplay');

    timerInterval = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(timerInterval);
            finalSubmit();
        }
    }, 1000);
}

// 🧙 WIZARD NAVIGATION
window.nextStep = (step) => {
    document.querySelector('.wizard-step.active').classList.remove('active');
    document.getElementById(`step${step}`).classList.add('active');
};

window.prevStep = (step) => {
    document.querySelector('.wizard-step.active').classList.remove('active');
    document.getElementById(`step${step}`).classList.add('active');
};

// ✅ FINAL SUBMIT
window.finalSubmit = async () => {
    clearInterval(timerInterval);

    // 1. Data Persistence
    saveAttempt();

    // 🚀 N8N INTEGRATION: SUBMIT TEST
    const email = localStorage.getItem('userEmail');
    const payload = {
        email: email,
        company: testState.company,
        results: testState
    };

    try {
        await fetch('https://daddys27.app.n8n.cloud/webhook/candidate/submit-test', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        console.log("📝 TEST SUBMITTED TO BACKEND");
    } catch (e) {
        console.error("Test submission error:", e);
    }

    // 3. Show Success
    document.getElementById('successModal').style.display = 'flex';
};

function saveAttempt() {
    const STORAGE_KEY = 'candidateStats';
    let stats = localStorage.getItem(STORAGE_KEY);

    try {
        stats = stats ? JSON.parse(stats) : { attemptedTests: 0, testAttempts: [] };
    } catch (e) {
        stats = { attemptedTests: 0, testAttempts: [] };
    }

    if (!stats.testAttempts) stats.testAttempts = [];

    // Simple Scoring
    const isCorrect = testState.quizAnswer === '3';

    const newAttempt = {
        company: testState.company,
        date: new Date().toISOString(),
        quizCorrect: isCorrect,
        subjectiveLength: testState.subjectiveAnswer.length,
        codingLength: testState.codingAnswer.length
    };

    stats.attemptedTests++;
    stats.testAttempts.push(newAttempt);
    if (stats.quizScoreHistory) stats.quizScoreHistory.push(isCorrect ? 1 : 0);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}
