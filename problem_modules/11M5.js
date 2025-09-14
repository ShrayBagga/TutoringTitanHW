// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { const n=getRandomInt(3,7); return { problem: `Simplify the expression: \\(\\frac{x^2 - ${n*n}}{x - ${n}}\\). For x=10, what is the value?`, answer: `\\(10+${n}\\)`, checkAnswer: (10+n).toString()}; },
    () => { const a=getRandomInt(2,5), b=getRandomInt(2,5); return { problem: `Simplify: \\(\\frac{${a*b}x^3}{${a}x}\\). For x=2, what is the value?`, answer: `\\(${b*4}\\)`, checkAnswer: (b*4).toString() }; },
    () => { const a=2,b=3,c=4,d=6; return { problem: `Multiply: \\(\\frac{${a}x}{${b}} \\cdot \\frac{${c}}{${d}x}\\). What is the simplified numerical value?`, answer: `\\(${a*c/(b*d)}\\)`, checkAnswer: (a*c/(b*d)).toString()}; },
    () => { const a=3,b=5,c=9,d=10; return { problem: `Divide: \\(\\frac{${a}x}{${b}} \\div \\frac{${c}x}{${d}}\\). What is the simplified numerical value?`, answer: `\\(${a*d/(b*c)}\\)`, checkAnswer: (a*d/(b*c)).toString()}; },
    () => { const a=getRandomInt(2,6); return { problem: `For what value of x is the expression \\(\\frac{x+1}{x^2-${a*a}}\\) undefined? Enter the positive value.`, answer: `\\(${a}\\)`, checkAnswer: a.toString() }; },
    () => { const a=3,b=5; const den='(x-a)(x-b)'; return { problem: `What is the least common denominator of \\(\\frac{1}{x-${a}}\\) and \\(\\frac{1}{x-${b}}\\)? If x=10, what is the value?`, answer: `\\(${(10-a)*(10-b)}\\)`, checkAnswer: ((10-a)*(10-b)).toString() }; },
    () => { const x=getRandomInt(2,5)*12; return { problem: `Solve the equation: \\(\\frac{x}{4} + \\frac{x}{6} = ${x/4+x/6}\\).`, answer: `\\(${x}\\)`, checkAnswer: x.toString() }; },
    () => { const x=4; return { problem: `Solve the proportion: \\(\\frac{x+1}{${x+2}} = \\frac{x}{${x+1}}\\).`, answer: `\\(-1/2\\)`, checkAnswer: "-0.5" }; },
    () => { const a=getRandomInt(2,5); return { problem: `What is the vertical asymptote of \\(y = \\frac{1}{x-${a}}\\)? Enter the x-value.`, answer: `\\(${a}\\)`, checkAnswer: a.toString() }; },
    () => { const a=getRandomInt(2,5); return { problem: `What is the horizontal asymptote of \\(y = \\frac{${a}x}{x-1}\\)? Enter the y-value.`, answer: `\\(${a}\\)`, checkAnswer: a.toString() }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "To solve rational equations, multiply by the LCD to eliminate denominators. Watch for extraneous solutions." };
}

export const module = {
    topicId: '11M5',
    topicName: 'Rational Expressions & Functions',
    generateProblem: generate
};