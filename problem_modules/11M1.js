// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { const c1=getRandomInt(2,5),p1=3,c2=getRandomInt(3,6),p2=2,c3=getRandomInt(4,8); const c4=getRandomInt(1,4),p4=3,c5=getRandomInt(2,5),p5=2; const problemExpr = `(${c1}x^${p1} + ${c2}x^${p2} - ${c3}) + (${c4}x^${p4} - ${c5}x^${p2} + 1)`; const answerExpr = `${c1+c4}x^3+${c2-c5}x^2-${c3-1}`; return { problem: `Add the polynomials: \\(${problemExpr}\\). What is the coefficient of the x^2 term?`, answer: `\\(${c2-c5}\\)`, checkAnswer: (c2-c5).toString() }; },
    () => { const c1=getRandomInt(5,8),p1=3,c2=getRandomInt(2,4),p2=2,c3=getRandomInt(1,5); const c4=getRandomInt(2,4),p4=3,c5=getRandomInt(1,3),p5=2,c6=getRandomInt(2,6); const problemExpr = `(${c1}x^${p1} - ${c2}x^${p2} + ${c3}) - (${c4}x^${p1} + ${c5}x^${p2} - ${c6})`; const answerExpr = `${c1-c4}x^3-${c2+c5}x^2+${c3+c6}`; return { problem: `Subtract the polynomials: \\(${problemExpr}\\). What is the constant term?`, answer: `\\(${c3+c6}\\)`, checkAnswer: (c3+c6).toString() }; },
    () => { const c1=getRandomInt(2,5); const c2=getRandomInt(3,6),c3=getRandomInt(2,4), p2=2; const problemExpr = `${c1}x(${c2}x^${p2} + ${c3})`; const answerExpr = `${c1*c2}x^3+${c1*c3}x`; return { problem: `Multiply: \\(${problemExpr}\\). What is the new coefficient of the highest degree term?`, answer: `\\(${c1*c2}\\)`, checkAnswer: (c1*c2).toString() }; },
    () => { const a=getRandomInt(2,6), b=getRandomInt(2,6); const problemExpr = `(x + ${a})(x + ${b})`; const answerExpr = `x^2+${a+b}x+${a*b}`; return { problem: `Multiply using FOIL: \\(${problemExpr}\\). What is the constant term?`, answer: `\\(${a*b}\\)`, checkAnswer: (a*b).toString() }; },
    () => { const a=getRandomInt(3,7), b=getRandomInt(2,5); const problemExpr = `(x - ${a})(x + ${b})`; const answerExpr = `x^2+${b-a}x-${a*b}`; return { problem: `Multiply: \\(${problemExpr}\\). What is the coefficient of the x term?`, answer: `\\(${b-a}\\)`, checkAnswer: (b-a).toString() }; },
    () => { const a=getRandomInt(2,6); const problemExpr = `(x + ${a})^2`; const answerExpr = `x^2+${2*a}x+${a*a}`; return { problem: `Find the special product: \\(${problemExpr}\\). What is the constant term?`, answer: `\\(${a*a}\\)`, checkAnswer: (a*a).toString() }; },
    () => { const a=getRandomInt(3,7); const problemExpr = `(x - ${a})^2`; const answerExpr = `x^2-${2*a}x+${a*a}`; return { problem: `Find the special product: \\(${problemExpr}\\). What is the coefficient of the x term?`, answer: `\\(-${2*a}\\)`, checkAnswer: (-2*a).toString() }; },
    () => { const a=getRandomInt(4,8); const problemExpr = `(x + ${a})(x - ${a})`; const answerExpr = `x^2-${a*a}`; return { problem: `Find the special product: \\(${problemExpr}\\). What is the constant term?`, answer: `\\(-${a*a}\\)`, checkAnswer: (-a*a).toString() }; },
    () => { const a=getRandomInt(2,4),b=getRandomInt(2,4),c=getRandomInt(3,5); const problemExpr=`(${a}x-${b})(${c}x+${a})`; const ans_x2=a*c,ans_x=a*a-b*c,ans_c=-b*a; return { problem: `Multiply the binomials: \\(${problemExpr}\\). What is the coefficient of the x term?`, answer: `\\(${ans_x}\\)`, checkAnswer: ans_x.toString() }; },
    () => { const a=getRandomInt(2,5); const problemExpr=`(x-${a})(x^2+${a}x+${a*a})`; return { problem: `Multiply: \\(${problemExpr}\\). What is the resulting constant term?`, answer: `\\(-${a*a*a}\\)`, checkAnswer: (-a*a*a).toString(), hint:"This is a difference of cubes pattern." }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Remember to combine like terms by adding/subtracting coefficients of the same power of x." };
}

export const module = {
    topicId: '11M1',
    topicName: 'Polynomial Arithmetic',
    generateProblem: generate
};