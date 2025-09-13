// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function formatAnswer(val, p=2) { return parseFloat(val.toFixed(p)).toString().replace(/\.00$/, ''); }

const perfectSquares = [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144];

const problemGenerators = [
    () => { const num = [2,3,5,7,11][getRandomInt(0,4)]; return { problem: `Is \\(\\sqrt{${num}}\\) a rational or irrational number?`, answer: `Irrational`, checkAnswer: "Irrational" }; },
    () => { const sq = perfectSquares[getRandomInt(0, perfectSquares.length-1)]; return { problem: `Is \\(\\sqrt{${sq}}\\) a rational or irrational number?`, answer: `Rational`, checkAnswer: "Rational" }; },
    () => { const num = getRandomInt(1,5); const den = getRandomInt(6,9); return { problem: `Is the number \\(\\frac{${num}}{${den}}\\) rational or irrational?`, answer: `Rational`, checkAnswer: "Rational" }; },
    () => { return { problem: `Is the number \\(\\pi\\) rational or irrational?`, answer: `Irrational`, checkAnswer: "Irrational" }; },
    () => { const sq = perfectSquares[getRandomInt(0, perfectSquares.length-1)]; return { problem: `What is the value of \\(\\sqrt{${sq}}\\)?`, answer: `\\(${Math.sqrt(sq)}\\)`, checkAnswer: Math.sqrt(sq).toString() }; },
    () => { const num = -perfectSquares[getRandomInt(0, perfectSquares.length-1)]; return { problem: `What is the value of \\(-\\sqrt{${-num}}\\)?`, answer: `\\(-${Math.sqrt(-num)}\\)`, checkAnswer: (-Math.sqrt(-num)).toString() }; },
    () => { const num = getRandomInt(2,8)**3; return { problem: `Find the cube root: \\(\\sqrt[3]{${num}}\\).`, answer: `\\(${Math.cbrt(num)}\\)`, checkAnswer: Math.cbrt(num).toString() }; },
    () => { const num = getRandomInt(20, 60); const lower = Math.floor(Math.sqrt(num))**2; const upper = Math.ceil(Math.sqrt(num))**2; return { problem: `The value of \\(\\sqrt{${num}}\\) is between which two consecutive integers?`, answer: `Between \\(${Math.sqrt(lower)}\\) and \\(${Math.sqrt(upper)}\\)`, checkAnswer: `${Math.sqrt(lower)},${Math.sqrt(upper)}` }; },
    () => { const num = 0.25; return { problem: `Estimate \\(\\sqrt{${num}}\\) to the nearest tenth.`, answer: `\\(0.5\\)`, checkAnswer: "0.5" }; },
    () => { const num = getRandomInt(50, 90); const estimate = formatAnswer(Math.sqrt(num), 1); return { problem: `Estimate \\(\\sqrt{${num}}\\) to the nearest tenth.`, answer: `Approximately \\(${estimate}\\)`, checkAnswer: estimate }; },
    () => { const nums = [`\\(\\sqrt{25}\\)`, `\\(5.1\\)`, `\\(\\pi\\)`].sort(()=>Math.random()-0.5); return { problem: `Order the following numbers from least to greatest: ${nums.join(', ')}.`, answer: `\\(\\pi, \\sqrt{25}, 5.1\\)`, checkAnswer: `pi,sqrt(25),5.1` }; },
    () => { const num = 0.333; return { problem: `Convert the repeating decimal \\(0.\\bar{3}\\) to a fraction.`, answer: `\\(\\frac{1}{3}\\)`, checkAnswer: "1/3" }; },
    () => { const num = 2/3; return { problem: `Convert the fraction \\(\\frac{2}{3}\\) to a decimal.`, answer: `\\(0.\\bar{6}\\)`, checkAnswer: "0.66" }; },
    () => { const area = perfectSquares[getRandomInt(0, perfectSquares.length-1)]; return { problem: `A square has an area of \\(${area}\\) square meters. What is the length of one side?`, answer: `\\(${Math.sqrt(area)}\\) meters`, checkAnswer: Math.sqrt(area).toString() }; },
    () => { const vol = [8, 27, 64, 125][getRandomInt(0,3)]; return { problem: `A cube has a volume of \\(${vol}\\) cubic inches. What is the length of one edge?`, answer: `\\(${Math.cbrt(vol)}\\) inches`, checkAnswer: Math.cbrt(vol).toString() }; },
    () => { const num = 3; return { problem: `Which point on a number line best represents \\(\\sqrt{${num}}?\\)`, answer: `A point between 1 and 2, closer to 2 (approx 1.73).`, checkAnswer: "between 1 and 2" }; },
    () => { const a = `\\(\\sqrt{9}\\)`; const b = 3; return { problem: `Compare using <, >, or =: \\(${a}\\) ___ \\(${b}\\)`, answer: `=`, checkAnswer: "=" }; },
    () => { const a = `\\(\\sqrt{10}\\)`; const b = 3; return { problem: `Compare using <, >, or =: \\(${a}\\) ___ \\(${b}\\)`, answer: `>`, checkAnswer: ">" }; },
    () => { const dec = getRandomInt(1, 9)/10; return { problem: `Is ${dec} a rational or irrational number?`, answer: `Rational`, checkAnswer: "Rational" }; },
    () => { return { problem: `Give an example of an irrational number.`, answer: `\\(\\pi, \\sqrt{2}, e\\)`, checkAnswer: "pi" }; },
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Rational numbers can be written as fractions, irrational numbers cannot." };
}

export const module = {
    topicId: '8M1',
    topicName: 'The Real Number System',
    generateProblem: generate
};
