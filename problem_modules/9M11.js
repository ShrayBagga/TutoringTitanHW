// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
const problemGenerators = [
    () => { const n=getRandomInt(3,7); return { problem: `Simplify the expression: \\(\\frac{x - ${n}}{x^2 - ${n*n}}\\).`, answer: `\\(\\frac{1}{x+${n}}\\)` , checkAnswer: `1/(x+${n})`}; },
    () => { const a=getRandomInt(2,5), b=getRandomInt(2,5); return { problem: `Simplify: \\(\\frac{${a*b}x^2}{${a}x}\\).`, answer: `\\(${b}x\\)`, checkAnswer: `${b}x` }; },
    () => { const a=2,b=3,c=4,d=6; return { problem: `Multiply: \\(\\frac{${a}x}{${b}} \\cdot \\frac{${c}}{${d}x}\\).`, answer: `\\(\\frac{${a*c}}{${b*d}}\\)` , checkAnswer: `${a*c}/${b*d}`}; },
    () => { const a=3,b=5,c=9,d=10; return { problem: `Divide: \\(\\frac{${a}x}{${b}} \\div \\frac{${c}x}{${d}}\\).`, answer: `\\(\\frac{${a*d}}{${b*c}}\\)` , checkAnswer: `${a*d}/${b*c}`}; },
    () => { const a=getRandomInt(2,5); return { problem: `For what value of x is the expression \\(\\frac{x+1}{x-${a}}\\) undefined?`, answer: `\\(x=${a}\\)`, checkAnswer: a.toString() }; },
    () => { const a=getRandomInt(2,6); return { problem: `Find the excluded values for \\(\\frac{5}{x(x+${a})}\\).`, answer: `\\(x=0\\) and \\(x=-${a}\\)`, checkAnswer: `0,-${a}` }; },
    () => { const a=3,b=5; const den='xy'; return { problem: `Find the least common denominator of \\(\\frac{${a}}{x}\\) and \\(\\frac{${b}}{y}\\).`, answer: `\\(${den}\\)`, checkAnswer: den }; },
    () => { const a=2, b=4; return { problem: `Add the expressions: \\(\\frac{x}{${a}} + \\frac{x}{${b}}\\).`, answer: `\\(\\frac{3x}{4}\\)`, checkAnswer: "3x/4" }; },
    () => { const a=3, b=6; return { problem: `Subtract: \\(\\frac{5}{${a}x} - \\frac{2}{${b}x}\\).`, answer: `\\(\\frac{8}{6x}\\) or \\(\\frac{4}{3x}\\)`, checkAnswer: "4/(3x)" }; },
    () => { const x=getRandomInt(2,5)*6; return { problem: `Solve the equation: \\(\\frac{x}{2} + \\frac{x}{3} = ${x/2+x/3}\\).`, answer: `\\(x=${x}\\)`, checkAnswer: x.toString() }; },
    () => { const x=getRandomInt(2,5); return { problem: `Solve for x: \\(\\frac{10}{x} = ${10/x}\\).`, answer: `\\(x=${x}\\)`, checkAnswer: x.toString() }; },
    () => { const x=4; return { problem: `Solve the proportion: \\(\\frac{x}{3} = \\frac{8}{6}\\).`, answer: `\\(x=${x}\\)`, checkAnswer: x.toString() }; },
    () => { const r1=10, t1=2, r2=5, t2=4; return { problem: `It takes a painter \\(${t1}\\) hours to paint a room. His apprentice takes \\(${t2}\\) hours. How long will it take them working together?`, answer: `\\(\\frac{4}{3}\\) hours or 1 hr 20 min`, checkAnswer: "4/3" }; },
    () => { const d=120, r1=60, r2=40; return { problem: `You drive ${d} miles at ${r1} mph and return the same distance at ${r2} mph. What is your average speed?`, answer: `48 mph`, checkAnswer: "48" }; },
    () => { const graphId=`g-${Date.now()}`; return { problem: `Graph the function \\(y = \\frac{1}{x}\\).`, answer: `A hyperbola with two branches in quadrants I and III.`, checkAnswer: "graphed", graphId, graphFunction:{functions:[{type:'expression',expression:`1/x`}],boundingbox:[-5,5,5,-5]} }; },
    () => { return { problem: `The graph of \\(y = \\frac{1}{x}\\) has a vertical asymptote at _____.`, answer: `\\(x=0\\)`, checkAnswer: "x=0" }; },
    () => { return { problem: `The graph of \\(y = \\frac{1}{x}\\) has a horizontal asymptote at _____.`, answer: `\\(y=0\\)`, checkAnswer: "y=0" }; },
    () => { const a=3; return { problem: `Simplify: \\(\\frac{x^2 - 2x - 3}{x-3}\\).`, answer: `\\(x+1\\)`, checkAnswer: "x+1" }; },
    () => { return { problem: `An inverse variation is described by the equation \\(y = k/x\\). If y=5 when x=2, what is k?`, answer: `\\(k=10\\)`, checkAnswer: "10" }; },
    () => { return { problem: `If y varies inversely with x, and y=4 when x=3, what is y when x=6?`, answer: `\\(y=2\\)`, checkAnswer: "2" }; },
];
function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "When adding or subtracting, you must find a common denominator." };
}
export const module = { topicId: '9M11', topicName: 'Rational Expressions & Functions', generateProblem: generate };