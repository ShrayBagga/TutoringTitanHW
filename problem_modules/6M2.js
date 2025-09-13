// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
function formatFraction(num, den) { const common = gcd(num, den); return `\\frac{${num/common}}{${den/common}}`; }
function formatAnswer(val, places=2) { return parseFloat(val.toFixed(places)).toString().replace(/\.00$/, ''); }

const problemGenerators = [
    () => { const n1 = getRandomInt(1, 4), d1 = getRandomInt(5, 8), n2 = getRandomInt(1, 4), d2 = d1; return { problem: `Add the fractions: \\(\\frac{${n1}}{${d1}} + \\frac{${n2}}{${d2}}\\).`, answer: formatFraction(n1 + n2, d1), checkAnswer: formatAnswer((n1+n2)/d1) }; },
    () => { const n1 = getRandomInt(5, 8), d1 = getRandomInt(9, 12), n2 = getRandomInt(1, 4), d2 = d1; return { problem: `Subtract the fractions: \\(\\frac{${n1}}{${d1}} - \\frac{${n2}}{${d2}}\\).`, answer: formatFraction(n1 - n2, d1), checkAnswer: formatAnswer((n1-n2)/d1) }; },
    () => { const n1 = getRandomInt(1, 5), d1 = getRandomInt(2, 6), n2 = getRandomInt(1, 5), d2 = getRandomInt(2, 6); return { problem: `Multiply the fractions: \\(\\frac{${n1}}{${d1}} \\times \\frac{${n2}}{${d2}}\\).`, answer: formatFraction(n1 * n2, d1 * d2), checkAnswer: formatAnswer((n1*n2)/(d1*d2)) }; },
    () => { const n1 = getRandomInt(1, 5), d1 = getRandomInt(2, 6), n2 = getRandomInt(1, 5), d2 = getRandomInt(2, 6); return { problem: `Divide the fractions: \\(\\frac{${n1}}{${d1}} \\div \\frac{${n2}}{${d2}}\\).`, answer: formatFraction(n1 * d2, d1 * n2), checkAnswer: formatAnswer((n1*d2)/(d1*n2)) }; },
    () => { const n1 = getRandomInt(1, 5), d1 = getRandomInt(2, 4), n2 = getRandomInt(1, 5), d2 = getRandomInt(5, 8); const lcm = (d1*d2)/gcd(d1,d2); const new_n1=n1*(lcm/d1); const new_n2=n2*(lcm/d2); return { problem: `Add with unlike denominators: \\(\\frac{${n1}}{${d1}} + \\frac{${n2}}{${d2}}\\).`, answer: formatFraction(new_n1 + new_n2, lcm), checkAnswer: formatAnswer((new_n1+new_n2)/lcm) }; },
    () => { const w = getRandomInt(2, 5), n = getRandomInt(1, 4), d = getRandomInt(n + 1, 8); return { problem: `Convert the mixed number to an improper fraction: \\(${w}\\frac{${n}}{${d}}\\).`, answer: `\\(\\frac{${w*d+n}}{${d}}\\)` , checkAnswer: `${w*d+n}/${d}`}; },
    () => { const n = getRandomInt(7, 15), d = getRandomInt(2, 6); const w = Math.floor(n/d); const r = n % d; return { problem: `Convert the improper fraction to a mixed number: \\(\\frac{${n}}{${d}}\\).`, answer: `\\(${w}\\frac{${r}}{${d}}\\)` , checkAnswer: `${w} ${r}/${d}`}; },
    () => { const d1 = getRandomInt(10, 50) / 10; const d2 = getRandomInt(10, 50) / 10; return { problem: `Add the decimals: \\(${d1} + ${d2}\\).`, answer: `\\(${formatAnswer(d1+d2)}\\)`, checkAnswer: formatAnswer(d1+d2) }; },
    () => { const d1 = getRandomInt(50, 100) / 10; const d2 = getRandomInt(10, 49) / 10; return { problem: `Subtract the decimals: \\(${d1} - ${d2}\\).`, answer: `\\(${formatAnswer(d1-d2)}\\)`, checkAnswer: formatAnswer(d1-d2) }; },
    () => { const d1 = getRandomInt(2, 9) / 10; const d2 = getRandomInt(2, 9) / 10; return { problem: `Multiply the decimals: \\(${d1} \\times ${d2}\\).`, answer: `\\(${formatAnswer(d1*d2)}\\)`, checkAnswer: formatAnswer(d1*d2) }; },
    () => { const div = getRandomInt(2, 5); const q = getRandomInt(10, 20) / 10; const dvd = div * q; return { problem: `Divide the decimals: \\(${formatAnswer(dvd)} \\div ${div}\\).`, answer: `\\(${q}\\)`, checkAnswer: q.toString() }; },
    () => { const n = getRandomInt(1, 4); const d = [10, 100][getRandomInt(0,1)]; return { problem: `Convert the fraction \\(\\frac{${n}}{${d}}\\) to a decimal.`, answer: `\\(${n/d}\\)`, checkAnswer: (n/d).toString() }; },
    () => { const dec = getRandomInt(1, 9) / 10; const d = 10; const n = dec * d; return { problem: `Convert the decimal \\(${dec}\\) to a fraction.`, answer: formatFraction(n, d), checkAnswer: `${n/gcd(n,d)}/${d/gcd(n,d)}` }; },
    () => { const i = getRandomInt(3, 6); const n = 1; const d = getRandomInt(2, 4); const t = i * (n/d); return { problem: `A recipe needs \\(\\frac{${n}}{${d}}\\) cups of flour. If you want to make \\(${i}\\) batches, how much flour do you need?`, answer: formatFraction(t * d, d), checkAnswer: formatAnswer(t) }; },
    () => { const t = getRandomInt(10, 20); const p = getRandomInt(3, 5); return { problem: `A pizza has \\(${t}\\) slices. If it's shared equally among \\(${p}\\) people, how many slices does each person get as a mixed number?`, answer: `\\(${Math.floor(t/p)}\\frac{${t%p}}{${p}}\\)`, checkAnswer: `${Math.floor(t/p)} ${t%p}/${p}` }; },
    () => { const c = getRandomInt(25, 75) / 100; const q = getRandomInt(5, 10); return { problem: `One candy costs \\($${c.toFixed(2)}\\). How much would \\(${q}\\) candies cost?`, answer: `\\($${formatAnswer(c*q)}\\)`, checkAnswer: formatAnswer(c*q) }; },
    () => { const m = getRandomInt(10, 20); const c = getRandomInt(15, 25) / 10; const n = Math.floor(m / c); return { problem: `You have \\($${m}\\). How many notebooks can you buy if each one costs \\($${c.toFixed(2)}\\)?`, answer: `\\(${n}\\) notebooks`, checkAnswer: n.toString() }; },
    () => { const n1=getRandomInt(1, 5), d1=8; const d2=0.125 * n1 + 0.25; return { problem: `Compare using <, >, or =: \\(\\frac{${n1}}{${d1}}\\) ___ \\(${d2}\\)`, answer: `${(n1/d1) > d2 ? '>' : '<'}`, checkAnswer: `${(n1/d1) > d2 ? '>' : '<'}` }; },
    () => { const n = getRandomInt(1234, 5678) / 1000; const r = Math.round(n * 100) / 100; return { problem: `Round the decimal \\(${n}\\) to the nearest hundredth.`, answer: `\\(${r}\\)`, checkAnswer: r.toString() }; },
    () => { const w=getRandomInt(1,3), n=getRandomInt(1,2), d=getRandomInt(3,4), m=getRandomInt(2,3); const impN=w*d+n; const resN=impN*m; return { problem: `Multiply: \\(${w}\\frac{${n}}{${d}} \\times ${m}\\). Give your answer as a mixed number.`, answer: `\\(${Math.floor(resN/d)}\\frac{${resN%d}}{${d}}\\)`, checkAnswer: `${Math.floor(resN/d)} ${resN%d}/${d}`}; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Remember to find common denominators for addition/subtraction." };
}

export const module = {
    topicId: '6M2',
    topicName: 'Fraction & Decimal Operations',
    generateProblem: generate
};
