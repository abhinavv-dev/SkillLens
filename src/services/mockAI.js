export const mockAIService = {
    // Simulates parsing a Job Description
    parseJD: async (text) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simple keyword extraction simulation
                const skills = [];
                if (text.toLowerCase().includes('react')) skills.push('React');
                if (text.toLowerCase().includes('node')) skills.push('Node.js');
                if (text.toLowerCase().includes('python')) skills.push('Python');
                if (text.toLowerCase().includes('sql') || text.toLowerCase().includes('database')) skills.push('SQL');
                if (text.toLowerCase().includes('aws') || text.toLowerCase().includes('cloud')) skills.push('AWS');
                if (text.toLowerCase().includes('css') || text.toLowerCase().includes('tailwind')) skills.push('CSS');

                const experience = text.match(/(\d+)\+?\s*years?/i);
                const expLevel = experience ? `${experience[1]} Years` : 'Mid-Level';

                resolve({
                    skills: skills.length > 0 ? skills : ['General Programming', 'Problem Solving'],
                    experienceLevel: expLevel,
                    suggestedOr: ['Communication', 'Teamwork'],
                    difficulty: 'Hard',
                    generatedQuestions: [
                        { id: 1, type: 'mcq', question: 'What is the Virtual DOM in React?', options: ['A copy of the real DOM', 'A browser API', 'A database'], correct: 'A copy of the real DOM' },
                        { id: 2, type: 'code', question: 'Write a function to reverse a string in JavaScript.', starterCode: 'function reverseString(str) {\n  \n}' },
                        { id: 3, type: 'text', question: 'Explain the difference between SQL and NoSQL.', difficulty: 'Medium' }
                    ]
                });
            }, 1500); // Simulate network latency
        });
    },

    // Simulates scoring an assessment
    scoreAssessment: async (answers) => {
        // Mock scoring logic
        return {
            score: 85,
            breakdown: {
                'React': 90,
                'Problem Solving': 80
            },
            passed: true,
            feedback: "Strong understanding of React concepts. Could improve on edge case handling in coding tasks."
        };
    }
};
