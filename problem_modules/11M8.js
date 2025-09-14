// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { const a1=getRandomInt(2,7), d=getRandomInt(2,5), n=getRandomInt(10,20); const an = a1 + (n-1)*d; return { problem: `Find the ${n}th term of an arithmetic sequence with first term ${a1} and common difference ${d}.`, answer: `\\(${an}\\)`, checkAnswer: an.toString() }; },
    () => { const a1=getRandomInt(2,5), r=getRandomInt(2,4), n=getRandomInt(5,8); const an = a1 * r**(n-1); return { problem: `Find the ${n}th term of a geometric sequence with first term ${a1} and common ratio ${r}.`, answer: `\\(${an}\\)`, checkAnswer: an.toString() }; },
    () => { const a1=getRandomInt(1,5), d=getRandomInt(2,4), n=getRandomInt(10,15); const an = a1 + (n-1)*d; const sum = n/2*(a1+an); return { problem: `Find the sum of the first ${n} terms of an arithmetic series with \\(a_1=${a1}\\) and \\(d=${d}\\).`, answer: `\\(${sum}\\)`, checkAnswer: sum.toString() }; },
    () => { const a1=getRandomInt(1,4), r=getRandomInt(2,3), n=getRandomInt(4,6); const sum = a1 * (1-r**n)/(1-r); return { problem: `Find the sum of the first ${n} terms of a geometric series with \\(a_1=${a1}\\) and \\(r=${r}\\).`, answer: `\\(${sum}\\)`, checkAnswer: sum.toString() }; },
    () => { const a1=getRandomInt(10,20), r=1/getRandomInt(2,4); const sum = a1 / (1-r); return { problem: `Find the sum of the infinite geometric series with \\(a_1=${a1}\\) and \\(r=1/${1/r}\\).`, answer: `\\(${sum}\\)`, checkAnswer: sum.toString() }; },
    () => { const n=getRandomInt(4,6); const sum = n*(n+1)/2; return { problem: `Evaluate the summation: \\(\\sum_{i=1}^{${n}} i\\)`, answer: `\\(${sum}\\)`, checkAnswer: sum.toString() }; },
    () => { const n = getRandomInt(3,5); const sum = n*(n+1)*(2*n+1)/6; return { problem: `Evaluate: \\(\\sum_{k=1}^{${n}} k^2\\).`, answer: `\\(${sum}\\)`, checkAnswer: sum.toString() }; },
    () => { const a1=getRandomInt(3,6), d=getRandomInt(3,6); const seq = `${a1}, ${a1+d}, ${a1+2*d}, ...`; return { problem: `Is the sequence \\(${seq}\\) arithmetic or geometric? What is the common difference/ratio?`, answer: `\\(${d}\\)`, checkAnswer: d.toString() }; },
    () => { const a1=getRandomInt(2,4), r=getRandomInt(2,4); const seq = `${a1}, ${a1*r}, ${a1*r*r}, ...`; return { problem: `Is the sequence \\(${seq}\\) arithmetic or geometric? What is the common difference/ratio?`, answer: `\\(${r}\\)`, checkAnswer: r.toString() }; },
    () => { const n=getRandomInt(4,7); const fact = (n) => (n<=1)?1:n*fact(n-1); return { problem: `Evaluate \\(${n}!\\)`, answer: `\\(${fact(n)}\\)`, checkAnswer: fact(n).toString() }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Arithmetic sequences have a common difference. Geometric sequences have a common ratio." };
}

export const module = {
    topicId: '11M8',
    topicName: 'Sequences & Series',
    generateProblem: generate
};