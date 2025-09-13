// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { const b = getRandomInt(2,5); const e1 = getRandomInt(3,5); const e2 = getRandomInt(2,4); return { problem: `Simplify: \\(${b}^${e1} \\cdot ${b}^${e2}\\)`, answer: `\\(${b}^{${e1+e2}}\\)`, checkAnswer: `${b}^${e1+e2}` }; },
    () => { const b = getRandomInt(2,5); const e1 = getRandomInt(6,9); const e2 = getRandomInt(2,5); return { problem: `Simplify: \\(\\frac{${b}^${e1}}{${b}^${e2}}\\)`, answer: `\\(${b}^{${e1-e2}}\\)`, checkAnswer: `${b}^${e1-e2}` }; },
    () => { const b = getRandomInt(2,5); const e1 = getRandomInt(2,3); const e2 = getRandomInt(2,3); return { problem: `Simplify: \\((${b}^${e1})^${e2}\\)`, answer: `\\(${b}^{${e1*e2}}\\)`, checkAnswer: `${b}^${e1*e2}` }; },
    () => { const b = getRandomInt(2,9); return { problem: `Simplify: \\(${b}^0\\)`, answer: `1`, checkAnswer: "1" }; },
    () => { const b = getRandomInt(2,5); const e = getRandomInt(2,4); return { problem: `Simplify: \\(${b}^{-${e}}\\). Write your answer as a fraction.`, answer: `\\(\\frac{1}{${b}^${e}}\\)`, checkAnswer: `1/${b**e}` }; },
    () => { const n = getRandomInt(2,9)*1000; const sci = `${n/1000} \\times 10^3`; return { problem: `Write \\(${n}\\) in scientific notation.`, answer: `\\(${sci}\\)`, checkAnswer: sci.replace(/ /g,'') }; },
    () => { const d = getRandomInt(2,9)/100; const sci = `${d*100} \\times 10^{-2}`; return { problem: `Write \\(${d}\\) in scientific notation.`, answer: `\\(${sci}\\)`, checkAnswer: sci.replace(/ /g,'') }; },
    () => { const c = getRandomInt(2,9); const e = getRandomInt(4,7); const std = c * (10**e); return { problem: `Convert \\(${c} \\times 10^${e}\\) to standard notation.`, answer: `\\(${std.toLocaleString()}\\)`, checkAnswer: std.toString() }; },
    () => { const c = getRandomInt(2,9); const e = -getRandomInt(2,4); const std = c * (10**e); return { problem: `Convert \\(${c} \\times 10^${e}\\) to standard notation.`, answer: `\\(${std}\\)`, checkAnswer: std.toString() }; },
    () => { const c1=2,e1=5,c2=3,e2=4; const res = `6 \\times 10^9`; return { problem: `Compute: \\((${c1} \\times 10^${e1}) \\cdot (${c2} \\times 10^${e2})\\)`, answer: `\\(${res}\\)`, checkAnswer: res.replace(/ /g,'') }; },
    () => { const c1=8,e1=7,c2=4,e2=3; const res = `2 \\times 10^4`; return { problem: `Compute: \\(\\frac{${c1} \\times 10^${e1}}{${c2} \\times 10^${e2}}\\)`, answer: `\\(${res}\\)`, checkAnswer: res.replace(/ /g,'') }; },
    () => { const num = getRandomInt(10,20); return { problem: `How many times larger is \\(10^${num}\\) than \\(10^${num-1}\\)?`, answer: `10 times larger`, checkAnswer: "10" }; },
    () => { const pop_earth = 7.8 * 10**9; const pop_mars = 1 * 10**0; return { problem: `The population of Earth is about \\(7.8 \\times 10^9\\). If a future Mars colony has 1 person, how many times larger is Earth's population?`, answer: `\\(7.8 \\times 10^9\\) times larger`, checkAnswer: "7.8e9" }; },
    () => { const b1=2,e1=3,b2=5,e2=2; const res = (b1**e1)*(b2**e2); return { problem: `Simplify the expression: \\(${b1}^${e1} \\cdot ${b2}^${e2}\\)`, answer: `\\(${res}\\)`, checkAnswer: res.toString() }; },
    () => { return { problem: `Is \\(5^{-2}\\) positive or negative?`, answer: `Positive`, checkAnswer: "Positive" }; },
    () => { const num = 1/8; return { problem: `Write \\(${num}\\) using a negative exponent with a base of 2.`, answer: `\\(2^{-3}\\)`, checkAnswer: "2^-3" }; },
    () => { const dist_sun = 9.3 * 10**7; const dist_moon = 2.4 * 10**5; return { problem: `The distance to the Sun is \\(9.3 \\times 10^7\\) miles. The distance to the Moon is \\(2.4 \\times 10^5\\) miles. How much farther is the Sun?`, answer: `Approx. \\(9.276 \\times 10^7\\) miles`, checkAnswer: "9.276e7" }; },
    () => { const c1=4, e1=5, c2=5, e2=5; const res = `9 \\times 10^5`; return { problem: `Add in scientific notation: \\((${c1} \\times 10^${e1}) + (${c2} \\times 10^${e2})\\)`, answer: `\\(${res}\\)`, checkAnswer: "9e5" }; },
    () => { const c1=9, e1=6, c2=2, e2=5; const res = `8.8 \\times 10^6`; return { problem: `Subtract: \\((${c1} \\times 10^${e1}) - (${c2} \\times 10^${e2})\\)`, answer: `\\(${res}\\)`, checkAnswer: "8.8e6" }; },
    () => { const l=10**4, w=10**3, area=10**7; return { problem: `A rectangular field is \\(10^4\\) meters long and \\(10^3\\) meters wide. What is its area in square meters, expressed as a power of 10?`, answer: `\\(10^7\\) m\\(^{2}\\)`, checkAnswer: "10^7" }; },
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Remember the exponent rules: when multiplying, add exponents; when dividing, subtract." };
}

export const module = {
    topicId: '8M2',
    topicName: 'Exponents & Scientific Notation',
    generateProblem: generate
};
