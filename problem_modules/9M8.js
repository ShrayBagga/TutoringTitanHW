// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
const problemGenerators = [
    () => { const r1=getRandomInt(2,5), r2=getRandomInt(r1+1,8); return { problem: `Solve by factoring: \\(x^2 - ${r1+r2}x + ${r1*r2} = 0\\)`, answer: `\\(x = ${r1}, x = ${r2}\\)`, checkAnswer: `${r1},${r2}` }; },
    () => { const r1=getRandomInt(2,6), r2=-getRandomInt(1,4); return { problem: `Solve by factoring: \\(x^2 + ${-(r1+r2)}x ${r1*r2} = 0\\)`, answer: `\\(x = ${r1}, x = ${r2}\\)`, checkAnswer: `${r1},${r2}` }; },
    () => { const r=getRandomInt(3,8); return { problem: `Solve by factoring: \\(x^2 - ${r*r} = 0\\)`, answer: `\\(x = ${r}, x = -${r}\\)`, checkAnswer: `${r},-${r}` }; },
    () => { const n=getRandomInt(4,9); return { problem: `Solve by taking square roots: \\(x^2 = ${n*n}\\)`, answer: `\\(x = \\pm${n}\\)`, checkAnswer: `+-${n}` }; },
    () => { const n=getRandomInt(2,4), s=getRandomInt(10,20)*n; return { problem: `Solve by taking square roots: \\(${n}x^2 = ${s*n}\\)`, answer: `\\(x = \\pm\\sqrt{${s}}\\)`, checkAnswer: `+-sqrt(${s})` }; },
    () => { const x=getRandomInt(2,5), c=getRandomInt(1,6); return { problem: `Solve by completing the square: \\(x^2 + ${2*x}x + ${c} = ${x*x+2*x*c+c}\\)`, answer: `\\(x = ${x}\\)`, checkAnswer: x.toString() }; },
    () => { const a=1, b=getRandomInt(2,5)*2, c=getRandomInt(1,5); const x1=(-b+Math.sqrt(b*b-4*a*c))/(2*a); const x2=(-b-Math.sqrt(b*b-4*a*c))/(2*a); return { problem: `Solve using the quadratic formula: \\(${a}x^2 + ${b}x + ${c} = 0\\)`, answer: `\\(x \\approx ${x1.toFixed(2)}, x \\approx ${x2.toFixed(2)}\\)`, checkAnswer: `${x1.toFixed(2)},${x2.toFixed(2)}` }; },
    () => { const a=2, b=5, c=2; const r1=-0.5, r2=-2; return { problem: `Solve using the quadratic formula: \\(${a}x^2 + ${b}x + ${c} = 0\\)`, answer: `\\(x = ${r1}, x = ${r2}\\)`, checkAnswer: `${r1},${r2}` }; },
    () => { const a=1, b=4, c=4; const d=b*b-4*a*c; return { problem: `Find the discriminant for \\(x^2 + 4x + 4 = 0\\) and determine the number of real solutions.`, answer: `Discriminant: \\(${d}\\), 1 real solution`, checkAnswer: `${d},1` }; },
    () => { const a=1, b=2, c=5; const d=b*b-4*a*c; return { problem: `Find the discriminant for \\(x^2 + 2x + 5 = 0\\) and state the number of real solutions.`, answer: `Discriminant: \\(${d}\\), 0 real solutions`, checkAnswer: `${d},0` }; },
    () => { const a=1, b=6, c=5; const d=b*b-4*a*c; return { problem: `Find the discriminant for \\(x^2 + 6x + 5 = 0\\) and state the number of real solutions.`, answer: `Discriminant: \\(${d}\\), 2 real solutions`, checkAnswer: `${d},2` }; },
    () => { const r1=5, r2=6; return { problem: `A rocket's height is \\(h = -16t^2 + 80t\\). When does it hit the ground (h=0)?`, answer: `At \\(t=5\\) seconds`, checkAnswer: "5" }; },
    () => { const area=100; const width=10; const length=10; return { problem: `The length of a garden is 4 more than its width. The area is 96 sq ft. Find the dimensions.`, answer: `Width = 8 ft, Length = 12 ft`, checkAnswer: "8,12" }; },
    () => { const r1=getRandomInt(3,7); return { problem: `Solve for x: \\(x(x - ${r1}) = 0\\)`, answer: `\\(x = 0, x = ${r1}\\)`, checkAnswer: `0,${r1}` }; },
    () => { const a=getRandomInt(2,5), r1=getRandomInt(3,6); return { problem: `Solve: \\(${a}x^2 - ${a*r1*r1} = 0\\)`, answer: `\\(x = \\pm${r1}\\)`, checkAnswer: `+-${r1}` }; },
    () => { return { problem: `What is the quadratic formula?`, answer: `\\(x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}\\)`, checkAnswer: "quadratic formula" }; },
    () => { const r1=1, r2=7; return { problem: `Find the solutions to \\((x-1)(x-7)=0\\).`, answer: `\\(x=1, x=7\\)`, checkAnswer: "1,7" }; },
    () => { return { problem: `When is completing the square a good method to use?`, answer: `When the 'a' coefficient is 1 and the 'b' coefficient is an even number.`, checkAnswer: "b is even" }; },
    () => { const x=getRandomInt(2,6); const c=x+3; return { problem: `Solve by completing the square: \\(x^2 - 6x + 5 = 0\\)`, answer: `x=1, x=5`, checkAnswer: "1,5" }; },
    () => { const n1=getRandomInt(5,9); const n2=n1+2; return { problem: `The product of two consecutive odd integers is ${n1*n2}. What are the integers?`, answer: `\\(${n1}\\) and \\(${n2}\\)`, checkAnswer: `${n1},${n2}` }; },
];
function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Set the equation to 0, then choose your method: factoring, square roots, completing the square, or quadratic formula." };
}
export const module = { topicId: '9M8', topicName: 'Solving Quadratic Equations', generateProblem: generate };