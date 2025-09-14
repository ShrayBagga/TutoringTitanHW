// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { const a=getRandomInt(1,3), b=getRandomInt(4,6); const A=1/(b-a), B=-1/(b-a); return { problem: `Decompose \\(\\frac{1}{(x+${a})(x+${b})}\\) into partial fractions \\(\\frac{A}{x+${a}} + \\frac{B}{x+${b}}\\). What is A?`, answer: `\\(${A.toFixed(2)}\\)`, checkAnswer: A.toFixed(2) }; },
    () => { const a=getRandomInt(1,3), b=getRandomInt(4,6); const A=1/(b-a), B=-1/(b-a); return { problem: `Decompose \\(\\frac{1}{(x+${a})(x+${b})}\\) into partial fractions \\(\\frac{A}{x+${a}} + \\frac{B}{x+${b}}\\). What is B?`, answer: `\\(${B.toFixed(2)}\\)`, checkAnswer: B.toFixed(2) }; },
    () => { const a=getRandomInt(2,5); const val = 1/a; return { problem: `Decompose \\(\\frac{x}{(x-${a})(x+${a})}\\). The term over (x-${a}) has a numerator of N. What is N?`, answer: `\\(0.5\\)`, checkAnswer: "0.5" }; },
    () => { const A=getRandomInt(2,5), B=getRandomInt(1,4); const num = A+B; return { problem: `Decompose \\(\\frac{${num}x+${-A+B}}{(x-1)(x+1)}\\). What is the numerator over (x-1)?`, answer: `\\(${A}\\)`, checkAnswer: A.toString() }; },
    () => { const a=getRandomInt(2,4); const A=1, B= -1, C= -a; return { problem: `Decompose \\(\\frac{x^2}{(x-1)(x^2+${a})}\\). Numerator over (x-1) is A. What is A?`, answer: `\\(${1/(1+a)}\\)`, checkAnswer: (1/(1+a)).toFixed(2) }; },
    () => { const val=1; return { problem: `For \\(\\frac{1}{x^2(x-1)}\\), the term \\(\\frac{A}{x}\\) has A=?`, answer: `\\(-1\\)`, checkAnswer: "-1" }; },
    () => { const val=1; return { problem: `For \\(\\frac{1}{x^2(x-1)}\\), the term \\(\\frac{B}{x^2}\\) has B=?`, answer: `\\(-1\\)`, checkAnswer: "-1" }; },
    () => { const val=1; return { problem: `For \\(\\frac{1}{x^2(x-1)}\\), the term \\(\\frac{C}{x-1}\\) has C=?`, answer: `\\(1\\)`, checkAnswer: "1" }; },
    () => { return { problem: `The first step in partial fraction decomposition is to make sure the degree of the numerator is ___ than the degree of the denominator. (1=less, 2=greater)`, answer: `\\(1\\)`, checkAnswer: "1" }; },
    () => { return { problem: `If a factor in the denominator is \\((x+a)^3\\), how many partial fractions will it generate?`, answer: `\\(3\\)`, checkAnswer: "3" }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Set the original fraction equal to the sum of its decomposed parts. Solve for the unknown numerators." };
}

export const module = {
    topicId: '12M10',
    topicName: 'Partial Fractions',
    generateProblem: generate
};