// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { const b=getRandomInt(2,4), p=getRandomInt(2,3); const num = b**p; return { problem: `Rewrite \\(\\sqrt[${p}]{${num}}\\) using a rational exponent. What is the value of the expression?`, answer: `\\(${b}\\)`, checkAnswer: b.toString() }; },
    () => { const b=getRandomInt(2,5), p=getRandomInt(3,5); return { problem: `Simplify \\((${b}^${p})^{1/${p}}\\)`, answer: `\\(${b}\\)`, checkAnswer: b.toString() }; },
    () => { const b=getRandomInt(2,5), p1=getRandomInt(2,4), p2=getRandomInt(2,4); return { problem: `Simplify \\(${b}^{${p1}/${p2}} \\cdot ${b}^{1/${p2}}\\). What is the numerator of the exponent in the answer?`, answer: `\\(${p1+1}\\)`, checkAnswer: (p1+1).toString() }; },
    () => { const b=getRandomInt(4,9); return { problem: `Evaluate \\(${b}^{3/2}\\).`, answer: `\\(${b*Math.sqrt(b)}\\)`, checkAnswer: (b*Math.sqrt(b)).toString() }; },
    () => { const x=getRandomInt(2,4)**2; const num = x-getRandomInt(1,x-1); return { problem: `Solve the equation \\(\\sqrt{x - ${num}} = ${Math.sqrt(x-num)}\\).`, answer: `\\(${x}\\)`, checkAnswer: x.toString() }; },
    () => { const x=getRandomInt(2,5); const res = x*x; return { problem: `Solve \\(\\sqrt[3]{x+${res-x}} = ${x}\\).`, answer: `\\(${res}\\)`, checkAnswer: res.toString() }; },
    () => { const x=4; return { problem: `Solve for x: \\((x-2)^{2/3} = ${ (x-2)**(2/3) }\\).`, answer: `\\(10\\)`, checkAnswer: "10" }; },
    () => { const b=getRandomInt(2,3); const p = getRandomInt(2,3); const num = b**(2*p); return { problem: `Simplify \\(\\sqrt{${b}^{${p}}}\\) and express it as \\(${b}^n\\). What is n?`, answer: `\\(${p/2}\\)`, checkAnswer: (p/2).toString() }; },
    () => { const n1=getRandomInt(2,5); const n2=getRandomInt(2,5); return { problem: `Simplify \\(\\sqrt{${n1}} \\cdot \\sqrt{${n2}}\\). The result is \\(\\sqrt{N}\\). What is N?`, answer: `\\(${n1*n2}\\)`, checkAnswer: (n1*n2).toString() }; },
    () => { const b=getRandomInt(2,4); const p=getRandomInt(3,5); return { problem: `Rewrite \\(x^{${b}/${p}}\\) in radical form. What is the index of the radical?`, answer: `\\(${p}\\)`, checkAnswer: p.toString() }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "A rational exponent a/b corresponds to the b-th root of the number raised to the a-th power." };
}

export const module = {
    topicId: '11M3',
    topicName: 'Radical & Rational Exponents',
    generateProblem: generate
};