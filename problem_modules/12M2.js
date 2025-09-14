// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { const c = getRandomInt(5, 20); return { problem: `Find the derivative of the constant function \\(f(x) = ${c}\\).`, answer: `\\(0\\)`, checkAnswer: "0" }; },
    () => { const m = getRandomInt(2, 10); return { problem: `Find the derivative of \\(f(x) = ${m}x\\).`, answer: `\\(${m}\\)`, checkAnswer: m.toString() }; },
    () => { const a = getRandomInt(2, 5); const p = getRandomInt(3, 6); const new_a = a * p; const new_p = p - 1; return { problem: `Find the derivative of \\(f(x) = ${a}x^${p}\\). What is the new coefficient?`, answer: `\\(${new_a}\\)`, checkAnswer: new_a.toString() }; },
    () => { const a = getRandomInt(2, 4); const b = getRandomInt(3, 6); const x_val = getRandomInt(1, 3); const slope = 2 * a * x_val; return { problem: `Find the slope of the tangent line to \\(f(x) = ${a}x^2 - ${b}\\) at \\(x = ${x_val}\\).`, answer: `\\(${slope}\\)`, checkAnswer: slope.toString() }; },
    () => { const a = getRandomInt(2,4); return { problem: `Find the derivative of \\(f(x) = sin(${a}x)\\). What is the coefficient of the resulting cosine term?`, answer: `\\(${a}\\)`, checkAnswer: a.toString() }; },
    () => { const a = getRandomInt(2,4); return { problem: `Find the derivative of \\(f(x) = cos(${a}x)\\). What is the coefficient of the resulting sine term?`, answer: `\\(-${a}\\)`, checkAnswer: (-a).toString() }; },
    () => { const a = getRandomInt(2,5); return { problem: `Find the derivative of \\(f(x) = e^{${a}x}\\). What is the coefficient?`, answer: `\\(${a}\\)`, checkAnswer: a.toString() }; },
    () => { const x_val = getRandomInt(2,5); return { problem: `Find the derivative of \\(f(x) = ln(x)\\) at \\(x=${x_val}\\). The answer is 1/N. What is N?`, answer: `\\(${x_val}\\)`, checkAnswer: x_val.toString() }; },
    () => { const x_val = 1; const deriv = 2*x_val + 3*x_val*x_val; return { problem: `Use the product rule on \\(f(x) = x^2(x+1)\\). What is the value of the derivative at x=${x_val}?`, answer: `\\(5\\)`, checkAnswer: "5" }; },
    () => { const x_val = 1; const deriv = (2*x_val*(x_val+1) - x_val*x_val*1) / ((x_val+1)**2); return { problem: `Use the quotient rule on \\(f(x) = \\frac{x^2}{x+1}\\). What is the value of the derivative at x=${x_val}?`, answer: `\\(${0.75}\\)`, checkAnswer: "0.75" }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Remember the power rule: d/dx(ax^n) = n*ax^(n-1)." };
}

export const module = {
    topicId: '12M2',
    topicName: 'Derivatives',
    generateProblem: generate
};