// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function formatAnswer(val, p=2) { return parseFloat(val.toFixed(p)).toString().replace(/\.00$/, ''); }
function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); return b === 0 ? a : gcd(b, a % b); }
function formatFraction(num, den) { 
    if (den < 0) { num = -num; den = -den; }
    const common = gcd(num, den); 
    return `\\frac{${num/common}}{${den/common}}`; 
}

const problemGenerators = [
    // Integers
    () => { const n1 = getRandomInt(-20, -5); const n2 = getRandomInt(5, 20); return { problem: `Find the sum: \\(${n1} + ${n2}\\)`, answer: `\\(${n1 + n2}\\)`, checkAnswer: (n1 + n2).toString() }; },
    () => { const n1 = getRandomInt(-15, -5); const n2 = getRandomInt(-15, -5); return { problem: `Calculate: \\(${n1} + (${n2})\\)`, answer: `\\(${n1 + n2}\\)`, checkAnswer: (n1 + n2).toString() }; },
    () => { const n1 = getRandomInt(10, 20); const n2 = getRandomInt(-30, -21); return { problem: `Find the difference: \\(${n1} - (${n2})\\)`, answer: `\\(${n1 - n2}\\)`, checkAnswer: (n1 - n2).toString() }; },
    () => { const n1 = getRandomInt(-5, 5); const n2 = getRandomInt(-12, -6); return { problem: `Calculate the product: \\(${n1} \\times ${n2}\\)`, answer: `\\(${n1 * n2}\\)`, checkAnswer: (n1 * n2).toString() }; },
    () => { const n1 = getRandomInt(5, 10); const n2 = getRandomInt(-8, -3); return { problem: `What is \\(${n1} \\times ${n2}\\)?`, answer: `\\(${n1 * n2}\\)`, checkAnswer: (n1 * n2).toString() }; },
    () => { const divisor = getRandomInt(-10, -2); const quotient = getRandomInt(5, 15); const dividend = divisor * quotient; return { problem: `Calculate the quotient: \\(${dividend} \\div ${divisor}\\)`, answer: `\\(${quotient}\\)`, checkAnswer: quotient.toString() }; },
    () => { const start = getRandomInt(-10, -5); const change = getRandomInt(15, 20); return { problem: `The temperature started at \\(${start}^{\\circ}\\)F and rose by \\(${change}^{\\circ}\\)F. What is the final temperature?`, answer: `\\(${start + change}^{\\circ}\\)F`, checkAnswer: (start+change).toString() }; },
    
    // Decimals
    () => { const d1 = -getRandomInt(10, 50) / 10; const d2 = getRandomInt(10, 50) / 10; return { problem: `Add the decimals: \\(${d1} + ${d2}\\).`, answer: `\\(${formatAnswer(d1+d2)}\\)`, checkAnswer: formatAnswer(d1+d2) }; },
    () => { const d1 = getRandomInt(50, 100) / 10; const d2 = -getRandomInt(10, 49) / 10; return { problem: `Subtract the decimals: \\(${d1} - (${d2})\\).`, answer: `\\(${formatAnswer(d1-d2)}\\)`, checkAnswer: formatAnswer(d1-d2) }; },
    () => { const d1 = -getRandomInt(2, 9) / 10; const d2 = getRandomInt(2, 9) / 10; return { problem: `Multiply the decimals: \\(${d1} \\times ${d2}\\).`, answer: `\\(${formatAnswer(d1*d2)}\\)`, checkAnswer: formatAnswer(d1*d2) }; },
    () => { const divisor = getRandomInt(2, 5); const quotient = -getRandomInt(10, 20) / 10; const dividend = divisor * quotient; return { problem: `Divide the decimals: \\(${formatAnswer(dividend)} \\div ${divisor}\\).`, answer: `\\(${formatAnswer(quotient)}\\)`, checkAnswer: formatAnswer(quotient) }; },

    // Fractions
    () => { const n1 = -getRandomInt(1, 4); const d1 = getRandomInt(5, 8); const n2 = getRandomInt(1, 4); const d2 = d1; return { problem: `Add the fractions: \\(\\frac{${n1}}{${d1}} + \\frac{${n2}}{${d2}}\\).`, answer: formatFraction(n1 + n2, d1), checkAnswer: `${(n1+n2)/gcd(n1+n2, d1)}/${d1/gcd(n1+n2,d1)}` }; },
    () => { const n1 = getRandomInt(5, 8); const d1 = getRandomInt(9, 12); const n2 = -getRandomInt(1, 4); const d2 = d1; return { problem: `Subtract: \\(\\frac{${n1}}{${d1}} - (\\frac{${n2}}{${d2}})\\).`, answer: formatFraction(n1 - n2, d1), checkAnswer: `${(n1-n2)/gcd(n1-n2, d1)}/${d1/gcd(n1-n2,d1)}` }; },
    () => { const n1 = -getRandomInt(1, 5); const d1 = getRandomInt(2, 6); const n2 = getRandomInt(1, 5); const d2 = getRandomInt(2, 6); return { problem: `Multiply the fractions: \\(\\frac{${n1}}{${d1}} \\times \\frac{${n2}}{${d2}}\\).`, answer: formatFraction(n1 * n2, d1 * d2), checkAnswer: `${(n1*n2)/gcd(n1*n2,d1*d2)}/${(d1*d2)/gcd(n1*n2,d1*d2)}` }; },
    () => { const n1 = getRandomInt(1, 5); const d1 = getRandomInt(2, 6); const n2 = -getRandomInt(1, 5); const d2 = getRandomInt(2, 6); return { problem: `Divide: \\(\\frac{${n1}}{${d1}} \\div (\\frac{${n2}}{${d2}})\\).`, answer: formatFraction(n1 * d2, d1 * n2), checkAnswer: `${(n1*d2)/gcd(n1*d2,d1*n2)}/${(d1*n2)/gcd(n1*d2,d1*n2)}` }; },

    // Mixed Rational Numbers
    () => { const n1 = getRandomInt(-10, 10); const d1 = getRandomInt(2, 5) / 10; return { problem: `Find the sum of \\(${n1}\\) and \\(${d1}\\).`, answer: `\\(${formatAnswer(n1+d1)}\\)`, checkAnswer: formatAnswer(n1+d1) }; },
    () => { const n1 = -getRandomInt(1, 3); const d1 = 4; const dec = getRandomInt(25, 75) / 100; const sum = (n1/d1)+dec; return { problem: `Calculate \\(\\frac{${n1}}{${d1}} + ${dec}\\). Give your answer as a decimal.`, answer: `\\(${formatAnswer(sum)}\\)`, checkAnswer: formatAnswer(sum) }; },
    () => { const val = -getRandomInt(2, 5); const exp = 3; return { problem: `Evaluate \\((${val})^${exp}\\).`, answer: `\\(${val**exp}\\)`, checkAnswer: (val**exp).toString(), hint: "A negative base to an odd power results in a negative number." }; },
    () => { const stock = 25.50; const change = -1.25; const days = 3; const final = stock + change * days; return { problem: `A stock starts at \\($${stock.toFixed(2)}\\). It drops \\($${Math.abs(change).toFixed(2)}\\) each day for \\(${days}\\) days. What is its final price?`, answer: `\\($${final.toFixed(2)}\\)`, checkAnswer: final.toFixed(2) }; },
    () => { const depth = 20.5; const rate = -2.5; const time = 5; const final = depth + rate * time; return { problem: `A submarine is at a depth of \\(${depth}\\) m. It descends at a rate of \\(${Math.abs(rate)}\\) m/s for \\(${time}\\) seconds. What is its new depth? (Represent depth as a negative number)`, answer: `\\(${-final}\\) m`, checkAnswer: (-final).toString() }; },
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Remember the rules for operating with negative numbers (signs)." };
}

export const module = {
    topicId: '7M1',
    topicName: 'Operations with Rational Numbers',
    generateProblem: generate
};
