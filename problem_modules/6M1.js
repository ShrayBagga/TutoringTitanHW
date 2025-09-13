// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function formatAnswer(val) { return parseFloat(val.toFixed(2)).toString().replace(/\.00$/, ''); }
const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

const problemGenerators = [
    () => { const n1 = getRandomInt(100, 500); const n2 = getRandomInt(100, 500); return { problem: `Find the sum: \\(${n1} + ${n2}\\)`, answer: `\\(${n1 + n2}\\)`, checkAnswer: (n1 + n2).toString() }; },
    () => { const n1 = getRandomInt(500, 1000); const n2 = getRandomInt(100, 499); return { problem: `Find the difference: \\(${n1} - ${n2}\\)`, answer: `\\(${n1 - n2}\\)`, checkAnswer: (n1 - n2).toString() }; },
    () => { const n1 = getRandomInt(10, 50); const n2 = getRandomInt(10, 50); return { problem: `Calculate the product: \\(${n1} \\times ${n2}\\)`, answer: `\\(${n1 * n2}\\)`, checkAnswer: (n1 * n2).toString() }; },
    () => { const divisor = getRandomInt(5, 15); const quotient = getRandomInt(10, 30); const dividend = divisor * quotient; return { problem: `Calculate the quotient: \\(${dividend} \\div ${divisor}\\)`, answer: `\\(${quotient}\\)`, checkAnswer: quotient.toString() }; },
    () => { const n1 = getRandomInt(2, 5); const n2 = getRandomInt(2, 5); const n3 = getRandomInt(2, 5); return { problem: `Evaluate using order of operations: \\(${n1} + ${n2} \\times ${n3}\\)`, answer: `\\(${n1 + n2 * n3}\\)`, checkAnswer: (n1 + n2 * n3).toString(), hint: "Remember PEMDAS." }; },
    () => { const n1 = getRandomInt(10, 20); const n2 = getRandomInt(2, 5); const n3 = getRandomInt(2, 5); return { problem: `Evaluate: \\((${n1} - ${n2}) \\div ${n3}\\)`, answer: `\\(${formatAnswer((n1-n2)/n3)}\\)`, checkAnswer: formatAnswer((n1 - n2) / n3) }; },
    () => { const base = getRandomInt(2, 4); const exp = getRandomInt(3, 5); return { problem: `Evaluate the exponent: \\(${base}^${exp}\\)`, answer: `\\(${Math.pow(base, exp)}\\)`, checkAnswer: Math.pow(base, exp).toString() }; },
    () => { const num = getRandomInt(20, 50); const factors = Array.from({length: num}, (_, i) => i + 1).filter(i => num % i === 0).join(', '); return { problem: `List all the factors of \\(${num}\\).`, answer: `\\(${factors}\\)`, checkAnswer: factors.replace(/ /g, '') }; },
    () => { const num = getRandomInt(5, 15); const multipleCount = 5; const multiples = Array.from({length: multipleCount}, (_, i) => num * (i + 1)).join(', '); return { problem: `List the first \\(${multipleCount}\\) multiples of \\(${num}\\).`, answer: `\\(${multiples}\\)`, checkAnswer: multiples.replace(/ /g, '') }; },
    () => { const n1 = getRandomInt(10, 20) * 2; const n2 = getRandomInt(10, 20) * 3; const result = gcd(n1, n2); return { problem: `Find the Greatest Common Factor (GCF) of \\(${n1}\\) and \\(${n2}\\).`, answer: `\\(${result}\\)`, checkAnswer: result.toString() }; },
    () => { const n1 = getRandomInt(4, 10); const n2 = getRandomInt(4, 10); const lcm = (a, b) => (a * b) / gcd(a, b); const result = lcm(n1, n2); return { problem: `Find the Least Common Multiple (LCM) of \\(${n1}\\) and \\(${n2}\\).`, answer: `\\(${result}\\)`, checkAnswer: result.toString() }; },
    () => { const items = getRandomInt(5, 10); const cost = getRandomInt(15, 25); const total = items * cost; return { problem: `Maria buys \\(${items}\\) books, and each book costs \\($${cost}\\). What is the total cost?`, answer: `\\($${total}\\)`, checkAnswer: total.toString() }; },
    () => { const total = getRandomInt(100, 200); const groups = getRandomInt(5, 10); const remainder = total % groups; const quotient = Math.floor(total / groups); return { problem: `A teacher has \\(${total}\\) pencils to distribute among \\(${groups}\\) students. How many pencils will each student get, and how many will be left over?`, answer: `Each student gets \\(${quotient}\\) pencils with \\(${remainder}\\) left over.`, checkAnswer: `${quotient},${remainder}` }; },
    () => { const start = getRandomInt(50, 100); const add = getRandomInt(20, 30); const subtract = getRandomInt(10, 15); return { problem: `John had \\($${start}\\). He earned \\($${add}\\) and spent \\($${subtract}\\). How much money does he have left?`, answer: `\\($${start + add - subtract}\\)`, checkAnswer: (start + add - subtract).toString() }; },
    () => { const num = getRandomInt(20, 50); const isPrime = (n) => { for(let i = 2, s = Math.sqrt(n); i <= s; i++) if(n % i === 0) return false; return n > 1; }; return { problem: `Is the number \\(${num}\\) prime or composite?`, answer: `\\(${isPrime(num) ? "Prime" : "Composite"}\\)`, checkAnswer: isPrime(num) ? "Prime" : "Composite" }; },
    () => { const num = getRandomInt(100, 300); const rounded = Math.round(num / 10) * 10; return { problem: `Round \\(${num}\\) to the nearest ten.`, answer: `\\(${rounded}\\)`, checkAnswer: rounded.toString() }; },
    () => { const num = getRandomInt(1000, 5000); const rounded = Math.round(num / 100) * 100; return { problem: `Round \\(${num}\\) to the nearest hundred.`, answer: `\\(${rounded}\\)`, checkAnswer: rounded.toString() }; },
    () => { const n1 = getRandomInt(5, 10); const n2 = getRandomInt(10, 15); const n3 = getRandomInt(15, 20); return { problem: `Estimate the sum by rounding each number to the nearest ten: \\(${n1} + ${n2} + ${n3}\\)`, answer: `\\(${Math.round(n1/10)*10 + Math.round(n2/10)*10 + Math.round(n3/10)*10}\\)`, checkAnswer: (Math.round(n1/10)*10 + Math.round(n2/10)*10 + Math.round(n3/10)*10).toString() }; },
    () => { const num = getRandomInt(20, 30); const primeFactors = (n) => { const factors = []; let divisor = 2; while (n >= 2) { if (n % divisor === 0) { factors.push(divisor); n = n / divisor; } else { divisor++; } } return factors.join(' x '); }; return { problem: `Find the prime factorization of \\(${num}\\).`, answer: `\\(${primeFactors(num)}\\)`, checkAnswer: primeFactors(num).replace(/ /g, '') }; },
    () => { const a = getRandomInt(2, 4); const b = getRandomInt(3, 5); const c = getRandomInt(4, 6); return { problem: `Apply the distributive property: \\(${a}(${b} + ${c})\\)`, answer: `\\(${a*b} + ${a*c} = ${a*(b+c)}\\)`, checkAnswer: (a*(b+c)).toString() }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Review the rules for arithmetic operations." };
}

export const module = {
    topicId: '6M1',
    topicName: 'Arithmetic Operations',
    generateProblem: generate
};
