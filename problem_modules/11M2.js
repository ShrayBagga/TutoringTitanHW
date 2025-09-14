// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { const num = getRandomInt(4, 100); return { problem: `Simplify: \\(\\sqrt{-${num*num}}\\). Enter the number only.`, answer: `\\(${num}i\\)`, checkAnswer: num.toString() }; },
    () => { const p = getRandomInt(2, 20); const rem = p % 4; let ans; if(rem===0) ans=1; if(rem===1) ans='i'; if(rem===2) ans=-1; if(rem===3) ans='-i'; return { problem: `What is the value of \\(i^${p}\\)? (Enter as a number or i/-i)`, answer: `\\(${ans}\\)`, checkAnswer: ans.toString() }; },
    () => { const a1=getRandomInt(2,8), b1=getRandomInt(3,9), a2=getRandomInt(1,7), b2=getRandomInt(2,8); return { problem: `Simplify: \\((${a1} + ${b1}i) + (${a2} - ${b2}i)\\). What is the real part of the result?`, answer: `\\(${a1+a2}\\)`, checkAnswer: (a1+a2).toString() }; },
    () => { const a1=getRandomInt(5,10), b1=getRandomInt(5,10), a2=getRandomInt(1,4), b2=getRandomInt(1,4); return { problem: `Simplify: \\((${a1} + ${b1}i) - (${a2} + ${b2}i)\\). What is the imaginary part of the result (number only)?`, answer: `\\(${b1-b2}\\)`, checkAnswer: (b1-b2).toString() }; },
    () => { const a1=getRandomInt(2,5), b1=getRandomInt(2,5), a2=getRandomInt(3,6), b2=getRandomInt(3,6); const real=a1*a2-b1*b2; const imag=a1*b2+a2*b1; return { problem: `Multiply: \\((${a1} + ${b1}i)(${a2} + ${b2}i)\\). What is the real part of the product?`, answer: `\\(${real}\\)`, checkAnswer: real.toString() }; },
    () => { const a=getRandomInt(3,7), b=getRandomInt(2,6); return { problem: `What is the complex conjugate of \\(${a} - ${b}i\\)? Enter the imaginary part (number only).`, answer: `\\(${b}\\)`, checkAnswer: b.toString() }; },
    () => { const a=getRandomInt(2,5); const real = a*a; return { problem: `What is the absolute value (modulus) of \\(${a} + ${a}i\\)? Enter the squared value.`, answer: `\\(${2*a*a}\\)`, checkAnswer: (2*a*a).toString() }; },
    () => { const num=getRandomInt(3,8), den_i=getRandomInt(2,5); const imag_part = num/den_i; return { problem: `Simplify the expression \\(\\frac{${num}}{${den_i}i}\\). What is the imaginary part?`, answer: `\\(-${imag_part}\\)`, checkAnswer: (-imag_part).toString() }; },
    () => { const a=getRandomInt(1,4), b=getRandomInt(1,4), c=getRandomInt(5,8); const disc = b*b - 4*a*c; return { problem: `Find the discriminant for \\(${a}x^2 + ${b}x + ${c} = 0\\).`, answer: `\\(${disc}\\)`, checkAnswer: disc.toString() }; },
    () => { const a=1, b=2, c=5; const sqrt_disc = 4; return { problem: `One solution to \\(x^2+2x+5=0\\) is \\(-1+2i\\). What is the real part of the other solution?`, answer: `\\(-1\\)`, checkAnswer: "-1" }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Remember that i^2 = -1. Treat i like a variable, but simplify powers of i." };
}

export const module = {
    topicId: '11M2',
    topicName: 'Complex Numbers',
    generateProblem: generate
};