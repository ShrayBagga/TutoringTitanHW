// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
const problemGenerators = [
    () => { const x=getRandomInt(2,6); const c1=getRandomInt(3,5), c2=getRandomInt(4,8), res=c1*x+c2; return { problem: `Solve for x: \\(${c1}x + ${c2} = ${res}\\)`, answer: `\\(x = ${x}\\)`, checkAnswer: x.toString() }; },
    () => { const x=getRandomInt(3,7); const c1=getRandomInt(6,9), c2=getRandomInt(2,5), res=c1-c2*x; return { problem: `Solve for x: \\(${c1} - ${c2}x = ${res}\\)`, answer: `\\(x = ${x}\\)`, checkAnswer: x.toString() }; },
    () => { const x=getRandomInt(2,5); const c1=getRandomInt(4,7), c2=getRandomInt(2,5), c3=getRandomInt(1,3), res=c1*x-c3*x+c2; return { problem: `Solve for x: \\(${c1}x + ${c2} = ${c3}x + ${res+c3*x-c2}\\)`, answer: `\\(x = ${x}\\)`, checkAnswer: x.toString() }; },
    () => { const x=getRandomInt(2,6); const c1=getRandomInt(2,4), c2=getRandomInt(1,5), res=c1*(x+c2); return { problem: `Solve for x: \\(${c1}(x + ${c2}) = ${res}\\)`, answer: `\\(x = ${x}\\)`, checkAnswer: x.toString() }; },
    () => { const x=getRandomInt(1,5)*12; const res=x/2+x/3+x/4; return { problem: `Solve for x: \\(\\frac{x}{2} + \\frac{x}{3} + \\frac{x}{4} = ${res}\\)`, answer: `\\(x=${x}\\)`, checkAnswer: x.toString(), hint: "Multiply by the LCD of 12." }; },
    () => { const x=getRandomInt(2,7); const c1=getRandomInt(2,5), res=c1*x; return { problem: `Solve the inequality: \\(${c1}x > ${res-c1}\\)`, answer: `\\(x > ${x-1}\\)`, checkAnswer: `x>${x-1}` }; },
    () => { const x=getRandomInt(3,8); const c1=-getRandomInt(2,5), res=c1*x; return { problem: `Solve the inequality: \\(${c1}x < ${res-c1}\\)`, answer: `\\(x > ${x-1}\\)`, checkAnswer: `x>${x-1}`, hint:"Flip the inequality sign." }; },
    () => { const x=getRandomInt(2,5); const c1=3, c2=5, c3=10, res=c1*x-c2+c3; return { problem: `Solve: \\(${c1}x - ${c2} \\le ${res-c3}\\)`, answer: `\\(x \\le ${x}\\)`, checkAnswer: `x<=${x}` }; },
    () => { const l=getRandomInt(1,3), h=getRandomInt(4,7); return { problem: `Solve the compound inequality: \\(${l} < x + 2 < ${h}\\)`, answer: `\\(${l-2} < x < ${h-2}\\)`, checkAnswer: `${l-2}<x<${h-2}` }; },
    () => { const val=getRandomInt(2,5); return { problem: `Solve the absolute value equation: \\(|x| = ${val}\\)`, answer: `\\(x = ${val}\\) or \\(x = -${val}\\)`, checkAnswer: `${val},-${val}` }; },
    () => { const val=getRandomInt(3,6); const res=val-2; return { problem: `Solve: \\(|x - 2| = ${res}\\)`, answer: `\\(x = ${val}\\) or \\(x = ${4-val}\\)`, checkAnswer: `${val},${4-val}` }; },
    () => { const val=getRandomInt(2,5); return { problem: `Solve the absolute value inequality: \\(|x| < ${val}\\)`, answer: `\\(-${val} < x < ${val}\\)`, checkAnswer: `-${val}<x<${val}` }; },
    () => { const val=getRandomInt(3,6); return { problem: `Solve: \\(|x| \\ge ${val}\\)`, answer: `\\(x \\ge ${val}\\) or \\(x \\le -${val}\\)`, checkAnswer: `x>=${val} or x<=-${val}` }; },
    () => { const formula=`A=P(1+rt)`; const v=`r`; return { problem: `Solve the formula \\(${formula}\\) for \\(${v}\\).`, answer: `\\(r = \\frac{A-P}{Pt}\\)`, checkAnswer: `(A-P)/(Pt)` }; },
    () => { const formula=`P=2l+2w`; const v=`l`; return { problem: `Solve the formula \\(${formula}\\) for \\(${v}\\).`, answer: `\\(l = \\frac{P-2w}{2}\\)`, checkAnswer: `(P-2w)/2` }; },
    () => { const c1=2, c2=3, c3=c1+c2; return { problem: `What is the solution to \\(${c1}x + ${c2} = ${c1}x + ${c3}\\)?`, answer: `No solution`, checkAnswer: "No solution" }; },
    () => { const c1=3; return { problem: `What is the solution to \\(${c1}(x+1) = ${c1}x + ${c1}\\)?`, answer: `All real numbers`, checkAnswer: "All real numbers" }; },
    () => { const items=getRandomInt(3,6), cost=getRandomInt(5,8), budget=items*cost+getRandomInt(10,20); return { problem: `You have \\($${budget}\\). You buy \\(${items}\\) items that cost \\($${cost}\\) each. Write an inequality for the amount of money \\(m\\) you can spend on one more item.`, answer: `\\(m \\le ${budget-items*cost}\\)`, checkAnswer: `m<=${budget-items*cost}` }; },
    () => { const base=50, rate=15, goal=200; const weeks=(goal-base)/rate; return { problem: `You have \\($${base}\\) and save \\($${rate}\\) per week. How many weeks until you have at least \\($${goal}\\)?`, answer: `At least \\(${Math.ceil(weeks)}\\) weeks`, checkAnswer: Math.ceil(weeks).toString() }; },
    () => { const x = getRandomInt(100,200); return { problem: `Solve for x: \\(0.1x + 5 = ${0.1*x+5}\\)`, answer: `\\(x=${x}\\)`, checkAnswer: x.toString() }; }
];
function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Whatever you do to one side of the equation, you must do to the other." };
}
export const module = { topicId: '9M2', topicName: 'Solving Linear Equations & Inequalities', generateProblem: generate };