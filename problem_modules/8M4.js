// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { const x=getRandomInt(2,5); const c1=getRandomInt(2,4), c2=getRandomInt(5,9), c3=c1*x+c2; return { problem: `Solve for x: \\(${c1}x + ${c2} = ${c3}\\)`, answer: `\\(x = ${x}\\)`, checkAnswer: x.toString() }; },
    () => { const n=getRandomInt(10,20); const c1=getRandomInt(2,4), c2=getRandomInt(8,12); const c3=n/c1-c2; return { problem: `Solve for n: \\(\\frac{n}{${c1}} - ${c2} = ${c3}\\)`, answer: `\\(n = ${n}\\)`, checkAnswer: n.toString() }; },
    () => { const y=getRandomInt(2,5); const c1=getRandomInt(3,6), c2=getRandomInt(1,4); const c3=c1*(y-c2); return { problem: `Solve for y: \\(${c1}(y - ${c2}) = ${c3}\\)`, answer: `\\(y = ${y}\\)`, checkAnswer: y.toString() }; },
    () => { const x=getRandomInt(2,4); const c1=5, c2=2, c3=1, c4=c1*x+c3-c2*x; return { problem: `Solve: \\(${c1}x + ${c3} = ${c2}x + ${c4}\\)`, answer: `\\(x = ${x}\\)`, checkAnswer: x.toString() }; },
    () => { const c1=3, c2=5; return { problem: `Solve: \\(${c1}x + ${c2} = ${c1}x - 1\\)`, answer: `No solution`, checkAnswer: "No solution" }; },
    () => { const c1=4, c2=8; return { problem: `Solve: \\(${c1}(x + 2) = ${c1}x + ${c2}\\)`, answer: `Infinitely many solutions`, checkAnswer: "Infinitely many solutions" }; },
    () => { const n=getRandomInt(1,3)*12; const c1=2, c2=3, c3=n/c1+n/c2; return { problem: `Solve for n: \\(\\frac{n}{${c1}} + \\frac{n}{${c2}} = ${c3}\\)`, answer: `\\(n=${n}\\)`, checkAnswer: n.toString(), hint:"Multiply by the least common denominator (6) to clear fractions." }; },
    () => { const x=2.5; const c1=2, c2=4, c3=c1*x+c2; return { problem: `Solve: \\(${c1}x + ${c2} = ${c3}\\)`, answer: `\\(x=${x}\\)`, checkAnswer: x.toString() }; },
    () => { const x=getRandomInt(1,4); const c1=3,c2=2,c3=1,c4=4, res=c1*(x+c2)+c3*(x-c4); return { problem: `Solve: \\(${c1}(x+${c2}) + ${c3}(x-${c4}) = ${res}\\)`, answer: `\\(x=${x}\\)`, checkAnswer: x.toString() }; },
    () => { const p=100; const s1=getRandomInt(10,15), s2=getRandomInt(20,25), s3=getRandomInt(25,30); const s4=p-s1-s2-s3; return { problem: `The sum of angles in a quadrilateral is 360. Three angles are ${s1}, ${s2}, ${s3}. Find the fourth angle, x.`, answer: `\\(x=84\\)`, checkAnswer: "84", hint: "This problem is about geometry, not percentages. The sum of angles is 360 degrees." }; },
    () => { return { problem: `What is the first step in solving \\(5(x - 3) = 25\\)?`, answer: `Distribute the 5 to the terms in the parentheses.`, checkAnswer: "Distribute" }; },
    () => { const x=getRandomInt(2,6); const c1=7, c2=3, c3=c1*x-(x+c2); return { problem: `Solve: \\(${c1}x - (x + ${c2}) = ${c3}\\)`, answer: `\\(x=${x}\\)`, checkAnswer: x.toString(), hint:"Distribute the negative sign." }; },
    () => { const x=10; const c1=0.5, c2=3, c3=c1*x+c2; return { problem: `Solve: \\(${c1}x + ${c2} = ${c3}\\)`, answer: `\\(x=${x}\\)`, checkAnswer: x.toString() }; },
    () => { const c1=3,c2=4,c3=5,c4=6; return { problem: `Combine like terms: \\((${c1}x + ${c2}) + (${c3}x - ${c4})\\)`, answer: `\\(${(c1+c3)}x + ${(c2-c4)}\\)`, checkAnswer: `${c1+c3}x+${c2-c4}` }; },
    () => { const peri=50, w=10, l=(peri-2*w)/2; return { problem: `The perimeter of a rectangle is \\(${peri}\\) cm. Its width is \\(${w}\\) cm. Find the length \\(l\\).`, answer: `\\(l=${l}\\) cm`, checkAnswer: l.toString(), hint:"P = 2l + 2w" }; },
    () => { const x=getRandomInt(20,30); return { problem: `Solve for x: \\(x - 10 = ${x-10}\\)`, answer: `\\(x=${x}\\)`, checkAnswer: x.toString() }; },
    () => { const x=getRandomInt(5,10); const c1=2,c2=3,c3=c1*x+c2*x; return { problem: `Consecutive integers are \\(x\\) and \\(x+1\\). Their sum is 15. Find the integers.`, answer: `7 and 8`, checkAnswer: "7,8" }; },
    () => { const x=-4; const c1=2,c2=8,c3=4,c4=c1*(x+c2)-c3*x; return { problem: `Solve: \\(${c1}(x+${c2}) = ${c3}x + ${c4}\\)`, answer: `\\(x=${x}\\)`, checkAnswer: x.toString() }; },
    () => { const x=1; return { problem: `Does \\(x=${x}\\) solve \\(7x-2=4x+1\\)?`, answer: `Yes`, checkAnswer: "Yes" }; },
    () => { return { problem: `What does it mean if an equation has "no solution"?`, answer: `There is no value of the variable that will make the equation true.`, checkAnswer: "no value" }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "The goal is to isolate the variable. Do the same operation on both sides of the equation." };
}

export const module = {
    topicId: '8M4',
    topicName: 'Solving Linear Equations',
    generateProblem: generate
};
