// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { const a = getRandomInt(2,8); const p = getRandomInt(2,5); const new_coeff = a/(p+1); return { problem: `Find the indefinite integral of \\(${a}x^${p}\\). What is the coefficient of the resulting term?`, answer: `\\(${new_coeff.toFixed(2)}\\)`, checkAnswer: new_coeff.toFixed(2) }; },
    () => { const a=getRandomInt(1,4), b=getRandomInt(2,5); const val = 0.5*a*(b*b - 0*0); return { problem: `Evaluate the definite integral: \\(\\int_{0}^{${b}} ${a}x dx\\).`, answer: `\\(${val}\\)`, checkAnswer: val.toString() }; },
    () => { const a=getRandomInt(1,3), b=getRandomInt(1,3); const val = (a/3)*(b**3) - (a/3)*(0**3); return { problem: `Evaluate: \\(\\int_{0}^{${b}} ${a}x^2 dx\\).`, answer: `\\(${val}\\)`, checkAnswer: val.toString() }; },
    () => { const b=getRandomInt(1,4); const val = Math.sin(b)-Math.sin(0); return { problem: `Evaluate: \\(\\int_{0}^{${b}} cos(x) dx\\). Round to 2 decimal places.`, answer: `\\(${val.toFixed(2)}\\)`, checkAnswer: val.toFixed(2) }; },
    () => { const b=getRandomInt(1,4); const val = -Math.cos(b)-(-Math.cos(0)); return { problem: `Evaluate: \\(\\int_{0}^{${b}} sin(x) dx\\). Round to 2 decimal places.`, answer: `\\(${val.toFixed(2)}\\)`, checkAnswer: val.toFixed(2) }; },
    () => { const b=getRandomInt(2,5); const val = Math.exp(b) - Math.exp(1); return { problem: `Evaluate: \\(\\int_{1}^{${b}} e^x dx\\). Round to the nearest whole number.`, answer: `\\(${Math.round(val)}\\)`, checkAnswer: Math.round(val).toString() }; },
    () => { const b=getRandomInt(3,8); const val = Math.log(b) - Math.log(1); return { problem: `Evaluate: \\(\\int_{1}^{${b}} \\frac{1}{x} dx\\). Round to 2 decimal places.`, answer: `\\(${val.toFixed(2)}\\)`, checkAnswer: val.toFixed(2) }; },
    () => { const v_t = `3t^2`; const dist = 4**3 - 1**3; return { problem: `If velocity is \\(v(t) = 3t^2\\), find the total distance traveled from t=1 to t=4.`, answer: `\\(63\\)`, checkAnswer: "63" }; },
    () => { const a=getRandomInt(2,4), n=getRandomInt(2,4); const val = (a/(n+1)); return { problem: `Solve \\(\\int ${a}u^${n} du\\) using u-substitution. If u=x+1, what is the new coefficient?`, answer: `\\(${val.toFixed(2)}\\)`, checkAnswer: val.toFixed(2) }; },
    () => { return { problem: `The Fundamental Theorem of Calculus relates derivatives and _____. (1=integrals, 2=limits)`, answer: `\\(1\\)`, checkAnswer: "1" }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Integration is the reverse of differentiation. The power rule for integrals is ∫x^n dx = (x^(n+1))/(n+1) + C." };
}

export const module = {
    topicId: '12M4',
    topicName: 'Integrals',
    generateProblem: generate
};