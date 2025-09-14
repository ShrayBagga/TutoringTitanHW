// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
const fact = (n) => n<=1?1:n*fact(n-1);
const C = (n,k) => fact(n)/(fact(k)*fact(n-k));

const problemGenerators = [
    () => { const n=getRandomInt(4,6), k=2; const coeff = C(n,k); return { problem: `Find the coefficient of the \\(x^${n-k}y^${k}\\) term in the expansion of \\((x+y)^${n}\\).`, answer: `\\(${coeff}\\)`, checkAnswer: coeff.toString() }; },
    () => { const n=getRandomInt(5,7), k=3; const coeff = C(n,k); return { problem: `What is the coefficient of the 4th term in the expansion of \\((x+y)^${n}\\)?`, answer: `\\(${coeff}\\)`, checkAnswer: coeff.toString() }; },
    () => { const n=getRandomInt(3,5); const a=getRandomInt(2,4); const k=1; const coeff = C(n,k)*(a**(n-k)); return { problem: `Find the coefficient of the xy term in \\((${a}x+y)^${n}\\) if n=${n}.`, answer: `\\(${C(n,1)*a*1}\\)`, checkAnswer: (C(n,1)*a).toString() }; },
    () => { const n=10, k=getRandomInt(2,4); return { problem: `Calculate the binomial coefficient \\(\\binom{${n}}{${k}}\\).`, answer: `\\(${C(n,k)}\\)`, checkAnswer: C(n,k).toString() }; },
    () => { const n=getRandomInt(4,6); return { problem: `How many terms are in the expansion of \\((a+b)^${n}\\)?`, answer: `\\(${n+1}\\)`, checkAnswer: (n+1).toString() }; },
    () => { const row=getRandomInt(3,6); const entry=getRandomInt(1,row-1); return { problem: `What is the ${entry+1}th number in row ${row} of Pascal's Triangle (starting from row 0)?`, answer: `\\(${C(row,entry)}\\)`, checkAnswer: C(row,entry).toString() }; },
    () => { const n=getRandomInt(3,5), a=2, k=2; const coeff = C(n,k)*(a**(n-k))*((-1)**k); return { problem: `Find the coefficient of the \\(x^${n-k}\\) term of \\((${a}x-1)^${n}\\).`, answer: `\\(${coeff}\\)`, checkAnswer: coeff.toString() }; },
    () => { const n=getRandomInt(4,6); return { problem: `The sum of the coefficients in the expansion of \\((x+y)^${n}\\) is \\(2^N\\). What is N?`, answer: `\\(${n}\\)`, checkAnswer: n.toString() }; },
    () => { const n=getRandomInt(3,5); return { problem: `What is the coefficient of the last term of \\((x+2)^${n}\\)?`, answer: `\\(${2**n}\\)`, checkAnswer: (2**n).toString() }; },
    () => { const n=getRandomInt(4,6); return { problem: `The coefficients of \\((x+y)^${n}\\) are found in which row of Pascal's Triangle?`, answer: `\\(${n}\\)`, checkAnswer: n.toString() }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "The coefficient of the x^(n-k)y^k term is given by the binomial coefficient C(n,k)." };
}

export const module = {
    topicId: '12M11',
    topicName: 'Binomial Theorem',
    generateProblem: generate
};