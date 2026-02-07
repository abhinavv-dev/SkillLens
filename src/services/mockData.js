export const mockCandidates = [
    { id: 1, name: 'Liam Johnson', role: 'Frontend Developer', status: 'qualified', score: 88, skills: { React: 90, CSS: 85, JS: 92 } },
    { id: 2, name: 'Emma Wilson', role: 'Frontend Developer', status: 'disqualified', score: 45, skills: { React: 40, CSS: 50, JS: 45 } },
    { id: 3, name: 'Noah Brown', role: 'Backend Developer', status: 'pending', score: 0, skills: {} },
    { id: 4, name: 'Olivia Davis', role: 'Full Stack', status: 'qualified', score: 92, skills: { React: 95, Node: 90, SQL: 88 } },
    { id: 5, name: 'William Miller', role: 'Frontend Developer', status: 'qualified', score: 78, skills: { React: 80, CSS: 75, JS: 78 } },
    { id: 6, name: 'Sophia Tie', role: 'Frontend Developer', status: 'disqualified', score: 60, skills: { React: 65, CSS: 60, JS: 55 } },
    { id: 7, name: 'James White', role: 'DevOps Engineer', status: 'qualified', score: 85, skills: { Docker: 90, AWS: 85, Linux: 80 } },
    { id: 8, name: 'Lucas Green', role: 'Frontend Developer', status: 'in-progress', score: 0, skills: {} },
    { id: 9, name: 'Mia Black', role: 'Backend Developer', status: 'qualified', score: 95, skills: { Node: 98, SQL: 92, Redis: 90 } },
    { id: 10, name: 'Charlotte Grey', role: 'Frontend Developer', status: 'qualified', score: 82, skills: { React: 85, CSS: 80, JS: 80 } },
    { id: 11, name: 'Amelia Rose', role: 'Frontend Developer', status: 'qualified', score: 89, skills: { React: 90, CSS: 88, JS: 89 } },
    { id: 12, name: 'Benjamin Blue', role: 'Frontend Developer', status: 'disqualified', score: 30, skills: { React: 20, CSS: 40, JS: 30 } },
];

export const mockDashboardStats = {
    totalApplicants: 12,
    qualified: 7,
    disqualified: 3, // based on status
    inProgress: 1,
    completionRate: 75.0,
};

export const skillsDistribution = {
    labels: ['Database', 'React', 'Node.js', 'System Design', 'Algorithms'],
    datasets: [
        {
            label: 'Average Score',
            data: [78, 85, 82, 70, 65],
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
        },
    ],
};

export const statusDistribution = {
    labels: ['Qualified', 'Disqualified', 'In Progress', 'Not Started'],
    datasets: [
        {
            data: [7, 2, 1, 2],
            backgroundColor: ['#10B981', '#EF4444', '#3B82F6', '#94A3B8'],
            borderWidth: 0,
        }
    ]
}
