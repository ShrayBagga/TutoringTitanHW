// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { const b=getRandomInt(2,5), p=getRandomInt(2,4); const res = b**p; return { problem: `Solve for x: \\(${b}^x = ${res}\\)`, answer: `\\(${p}\\)`, checkAnswer: p.toString() }; },
    () => { const b=getRandomInt(2,4), res=getRandomInt(2,4); const arg = b**res; return { problem: `Evaluate \\(log_{${b}}(${arg})\\)`, answer: `\\(${res}\\)`, checkAnswer: res.toString() }; },
    () => { const b=10, p=getRandomInt(2,5); const arg=10**p; return { problem: `Evaluate \\(log(${arg})\\)`, answer: `\\(${p}\\)`, checkAnswer: p.toString() }; },
    () => { const arg=getRandomInt(2,10); return { problem: `Use the change of base formula to find \\(log_3(${arg})\\). Round to two decimal places.`, answer: `\\(${Math.log(arg)/Math.log(3)}\\)`, checkAnswer: (Math.log(arg)/Math.log(3)).toFixed(2) }; },
    () => { const x=getRandomInt(2,5), y=getRandomInt(2,5); return { problem: `Expand using logarithm properties: \\(log(xy)\\). If \\(log(x)=${Math.log10(x)}\\) and \\(log(y)=${Math.log10(y)}\\), what is the sum?`, answer: `\\(${Math.log10(x)+Math.log10(y)}\\)`, checkAnswer: (Math.log10(x*y)).toFixed(4) }; },
    () => { const x=getRandomInt(5,10), y=getRandomInt(2,4); return { problem: `Expand: \\(log(\\frac{x}{y})\\). If \\(log(x)=${Math.log10(x)}\\) and \\(log(y)=${Math.log10(y)}\\), what is the result?`, answer: `\\(${Math.log10(x)-Math.log10(y)}\\)`, checkAnswer: (Math.log10(x/y)).toFixed(4) }; },
    () => { const x=getRandomInt(2,6), p=getRandomInt(2,5); return { problem: `Expand: \\(log(${x}^${p})\\). If log(${x}) is ${Math.log10(x)}, what is the result?`, answer: `\\(${p*Math.log10(x)}\\)`, checkAnswer: (p*Math.log10(x)).toFixed(4) }; },
    () => { const b=getRandomInt(2,4); const x=getRandomInt(2,5); const res=b**x; return { problem: `Solve for x: \\(${b}^{x+1} = ${res*b}\\)`, answer: `\\(${x}\\)`, checkAnswer: x.toString() }; },
    () => { const x=getRandomInt(25,100); return { problem: `Solve for x: \\(log_5(x) = ${Math.log(x)/Math.log(5)}\\)`, answer: `\\(${x}\\)`, checkAnswer: x.toString() }; },
    () => { const p=2000, r=0.05, t=getRandomInt(5,10); const val = p * Math.exp(r*t); return { problem: `Using \\(A=Pe^{rt}\\), find the amount A for P=$${p}, r=0.05, t=${t}. Round to the nearest whole number.`, answer: `\\(${Math.round(val)}\\)`, checkAnswer: Math.round(val).toString() }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Logarithms are the inverse of exponents. log_b(x) = y is equivalent to b^y = x." };
}

export const module = {
    topicId: '11M4',
    topicName: 'Exponential & Logarithmic Functions',
    generateProblem: generate
};