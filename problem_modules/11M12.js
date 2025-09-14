// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { const n=getRandomInt(4,7); const fact = (k) => k<=1?1:k*fact(k-1); return { problem: `How many ways can you arrange ${n} distinct books on a shelf?`, answer: `\\(${fact(n)}\\)`, checkAnswer: fact(n).toString() }; },
    () => { const n=getRandomInt(8,12), r=getRandomInt(2,4); const perm = (n,r) => n<r?0:fact(n)/fact(n-r); const fact=(k)=>k<=1?1:k*fact(k-1); return { problem: `Calculate the number of permutations: \\(P(${n},${r})\\)`, answer: `\\(${perm(n,r)}\\)`, checkAnswer: perm(n,r).toString() }; },
    () => { const n=getRandomInt(8,12), r=getRandomInt(2,4); const comb = (n,r) => n<r?0:fact(n)/(fact(r)*fact(n-r)); const fact=(k)=>k<=1?1:k*fact(k-1); return { problem: `Calculate the number of combinations: \\(C(${n},${r})\\)`, answer: `\\(${comb(n,r)}\\)`, checkAnswer: comb(n,r).toString() }; },
    () => { const pA=getRandomInt(3,6)/10, pB=getRandomInt(2,5)/10; return { problem: `If P(A)=${pA} and P(B)=${pB} and the events are independent, what is P(A and B)?`, answer: `\\(${pA*pB}\\)`, checkAnswer: (pA*pB).toString() }; },
    () => { const pA=getRandomInt(2,4)/10, pB=getRandomInt(3,5)/10; return { problem: `If P(A)=${pA} and P(B)=${pB} and the events are mutually exclusive, what is P(A or B)?`, answer: `\\(${pA+pB}\\)`, checkAnswer: (pA+pB).toString() }; },
    () => { const red=5, blue=7, total=12; const prob = (blue/total)*((blue-1)/(total-1)); return { problem: `A bag has 5 red and 7 blue marbles. Two are drawn without replacement. What is P(blue and blue)? (as a decimal)`, answer: `\\(${prob.toFixed(2)}\\)`, checkAnswer: prob.toFixed(2) }; },
    () => { const pA=0.6, pBgivenA=0.4; const pAandB = pA*pBgivenA; return { problem: `Given P(A)=${pA} and P(B|A)=${pBgivenA}, find P(A and B).`, answer: `\\(${pAandB}\\)`, checkAnswer: pAandB.toString() }; },
    () => { const score=85, mean=75, std=5; const z = (score-mean)/std; return { problem: `A test has a mean of ${mean} and a standard deviation of ${std}. Your score is ${score}. What is your z-score?`, answer: `\\(${z}\\)`, checkAnswer: z.toString() }; },
    () => { const margin=getRandomInt(2,5); const percent=getRandomInt(48,52); return { problem: `A poll shows ${percent}% support with a margin of error of \\(\\pm${margin}\\%\\). What is the lowest possible value for the true support?`, answer: `\\(${percent-margin}\\)`, checkAnswer: (percent-margin).toString() }; },
    () => { const n=6, p=0.5, k=getRandomInt(2,4); const C = (n,k)=>fact(n)/(fact(k)*fact(n-k)); const fact=k=>k<=1?1:k*fact(k-1); const prob = C(n,k) * (p**k) * ((1-p)**(n-k)); return { problem: `Find the binomial probability of getting exactly ${k} heads in ${n} coin flips. (as a decimal)`, answer: `\\(${prob.toFixed(3)}\\)`, checkAnswer: prob.toFixed(3) }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Permutations are for ordered arrangements, combinations are for unordered groups." };
}

export const module = {
    topicId: '11M12',
    topicName: 'Probability & Statistics',
    generateProblem: generate
};