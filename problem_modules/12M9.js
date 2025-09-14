// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { return { problem: `Solve for x in \\([0, 2\\pi]\\): \\(2sin(x) - 1 = 0\\). The smaller solution is \\(\\pi/N\\). What is N?`, answer: `\\(6\\)`, checkAnswer: "6" }; },
    () => { return { problem: `Solve for x in \\([0, 2\\pi]\\): \\(cos^2(x) - 1 = 0\\). How many solutions are there?`, answer: `\\(2\\)`, checkAnswer: "2" }; },
    () => { const val = Math.cos(15*Math.PI/180); return { problem: `Use a sum/difference identity to find the exact value of cos(15). The answer is (sqrt(A)+sqrt(B))/4. What is A?`, answer: `\\(6\\)`, checkAnswer: "6" }; },
    () => { const val = Math.sin(75*Math.PI/180); return { problem: `Use a sum/difference identity to find the exact value of sin(75). The answer is (sqrt(A)+sqrt(B))/4. What is B?`, answer: `\\(2\\)`, checkAnswer: "2" }; },
    () => { const angle = getRandomInt(15,30); const val = 2*Math.sin(angle*Math.PI/180)*Math.cos(angle*Math.PI/180); return { problem: `Use a double angle identity to find the value of \\(sin(${2*angle}^{\\circ})\\) if \\(sin(${angle}^{\\circ})=${Math.sin(angle*Math.PI/180).toFixed(2)}\\) and \\(cos(${angle}^{\\circ})=${Math.cos(angle*Math.PI/180).toFixed(2)}\\).`, answer: `\\(${val.toFixed(2)}\\)`, checkAnswer: val.toFixed(2) }; },
    () => { const angle = getRandomInt(20,40); const val = Math.cos(angle*Math.PI/180)**2 - Math.sin(angle*Math.PI/180)**2; return { problem: `Use a double angle identity to find \\(cos(${2*angle}^{\\circ})\\) if \\(cos(${angle}^{\\circ})=${Math.cos(angle*Math.PI/180).toFixed(2)}\\).`, answer: `\\(${val.toFixed(2)}\\)`, checkAnswer: val.toFixed(2) }; },
    () => { const val = Math.sqrt((1-Math.cos(45*Math.PI/180))/2); return { problem: `Use a half-angle identity to find the value of \\(sin(22.5^{\\circ})\\).`, answer: `\\(${val.toFixed(2)}\\)`, checkAnswer: val.toFixed(2) }; },
    () => { return { problem: `Simplify the expression \\(\\frac{1-cos^2(x)}{sin(x)}\\). The result is \\(sin^N(x)\\). What is N?`, answer: `\\(1\\)`, checkAnswer: "1" }; },
    () => { return { problem: `Which of the following is an even function? (1=sin(x), 2=cos(x), 3=tan(x))`, answer: `\\(2\\)`, checkAnswer: "2" }; },
    () => { const amp = getRandomInt(2, 5); return { problem: `What is the amplitude of the function \\(y = ${amp}cos(3x) - 1\\)?`, answer: `\\(${amp}\\)`, checkAnswer: amp.toString() }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Familiarize yourself with Pythagorean, sum/difference, double-angle, and half-angle identities." };
}

export const module = {
    topicId: '12M9',
    topicName: 'Advanced Trigonometry',
    generateProblem: generate
};