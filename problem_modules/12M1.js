// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { const c = getRandomInt(2, 8); const val = getRandomInt(1, 5); const limit = c; return { problem: `Evaluate the limit: \\(\\lim_{x \\to ${val}} ${c}\\)`, answer: `\\(${limit}\\)`, checkAnswer: limit.toString() }; },
    () => { const m = getRandomInt(2, 5); const b = getRandomInt(1, 10); const val = getRandomInt(1, 4); const limit = m * val + b; return { problem: `Evaluate the limit: \\(\\lim_{x \\to ${val}} (${m}x + ${b})\\)`, answer: `\\(${limit}\\)`, checkAnswer: limit.toString() }; },
    () => { const a = getRandomInt(2, 4); const b = getRandomInt(1, 5); const val = getRandomInt(1, 3); const limit = a * (val**2) + b; return { problem: `Evaluate the limit: \\(\\lim_{x \\to ${val}} (${a}x^2 + ${b})\\)`, answer: `\\(${limit}\\)`, checkAnswer: limit.toString() }; },
    () => { const a = getRandomInt(2, 6); const limit = 2 * a; return { problem: `Evaluate the limit: \\(\\lim_{x \\to ${a}} \\frac{x^2 - ${a*a}}{x - ${a}}\\).`, answer: `\\(${limit}\\)`, checkAnswer: limit.toString(), hint: "Factor the numerator and simplify." }; },
    () => { const num_coeff = getRandomInt(2, 5); const den_coeff = getRandomInt(1, 4); const limit = num_coeff / den_coeff; return { problem: `Evaluate the limit: \\(\\lim_{x \\to \\infty} \\frac{${num_coeff}x^2 + 1}{${den_coeff}x^2 - 3x}\\). Round to 2 decimal places.`, answer: `\\(${limit.toFixed(2)}\\)`, checkAnswer: limit.toFixed(2) }; },
    () => { return { problem: `Evaluate the limit: \\(\\lim_{x \\to \\infty} \\frac{x}{x^2 + 1}\\).`, answer: `\\(0\\)`, checkAnswer: "0" }; },
    () => { return { problem: `For the function \\(f(x) = \\frac{1}{x-3}\\), at what value of x is there an infinite discontinuity?`, answer: `\\(3\\)`, checkAnswer: "3" }; },
    () => { const val = getRandomInt(2,5); const limit = Math.sin(val); return { problem: `If a function is continuous at x=${val}, and \\(f(${val})=${limit.toFixed(2)}\\), what is \\(\\lim_{x \\to ${val}} f(x)\\)?`, answer: `\\(${limit.toFixed(2)}\\)`, checkAnswer: limit.toFixed(2) }; },
    () => { const a = getRandomInt(2,5); return { problem: `Evaluate the limit: \\(\\lim_{h \\to 0} \\frac{((${a}+h)^2 - ${a*a})}{h}\\). This is the definition of a derivative.`, answer: `\\(${2*a}\\)`, checkAnswer: (2*a).toString(), hint: "Expand the numerator, simplify, and then evaluate the limit." }; },
    () => { return { problem: `Find the value of c that makes the function \\(f(x) = \\begin{cases} x+1, & x < 2 \\\\ cx, & x \\ge 2 \\end{cases}\\) continuous at x=2.`, answer: `\\(1.5\\)`, checkAnswer: "1.5" }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "For limits of continuous functions, direct substitution often works. For indeterminate forms, try algebraic manipulation." };
}

export const module = {
    topicId: '12M1',
    topicName: 'Limits and Continuity',
    generateProblem: generate
};