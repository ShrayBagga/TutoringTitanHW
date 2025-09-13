// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { const x=getRandomInt(2,5), y=getRandomInt(3,6); const eq1=`x+y=${x+y}`, eq2=`x-y=${x-y}`; return { problem: `Solve the system by elimination: \\(${eq1}\\) and \\(${eq2}\\).`, answer: `\\(x=${x}, y=${y}\\)`, checkAnswer: `${x},${y}` }; },
    () => { const x=getRandomInt(1,4), y=2*x; const eq1=`y=${2}x`, eq2=`x+y=${x+y}`; return { problem: `Solve the system by substitution: \\(${eq1}\\) and \\(${eq2}\\).`, answer: `\\(x=${x}, y=${y}\\)`, checkAnswer: `${x},${y}` }; },
    () => { const m1=2, b1=1, m2=-1, b2=4; const x=(b2-b1)/(m1-m2), y=m1*x+b1; const graphId=`g-${Date.now()}`; const graphFunc={functions:[{expr:`${m1}*x+${b1}`},{expr:`${m2}*x+${b2}`}]}; return { problem: `Find the solution to the system by graphing \\(y=${m1}x+${b1}\\) and \\(y=${m2}x+${b2}\\).`, answer: `The solution is the intersection point (\\(${x},${y}\\)).`, checkAnswer: `${x},${y}`, graphId, graphFunction: { functions: [{ type: 'expression', expression: `function(x){return ${m1}*x+${b1};}` }, { type: 'expression', expression: `function(x){return ${m2}*x+${b2};}` }], boundingbox: [-5, 5, 10, -5] } }; },
    () => { const m=3, b1=2, b2=5; return { problem: `How many solutions does the system \\(y=${m}x+${b1}\\) and \\(y=${m}x+${b2}\\) have?`, answer: `No solution (parallel lines).`, checkAnswer: "No solution" }; },
    () => { const m=4, b=1; return { problem: `How many solutions does the system \\(y=${m}x+${b}\\) and \\(2y=8x+2\\) have?`, answer: `Infinitely many solutions (the same line).`, checkAnswer: "Infinitely many solutions" }; },
    () => { const x=1, y=4; return { problem: `Is (\\(${x},${y}\\)) a solution to the system \\(y=x+3\\) and \\(y=-2x+6\\)?`, answer: `Yes`, checkAnswer: "Yes" }; },
    () => { const x=2, y=5; return { problem: `Is (\\(${x},${y}\\)) a solution to \\(x+y=7\\) and \\(2x-y=0\\)?`, answer: `No`, checkAnswer: "No" }; },
    () => { const a=5, b=2, total=a+b; const costA=2, costB=3, totalCost=a*costA+b*costB; return { problem: `You buy \\(${total}\\) items. Apples cost \\($${costA}\\) and bananas cost \\($${costB}\\). You spend \\($${totalCost}\\). How many apples (a) and bananas (b) did you buy?`, answer: `${a} apples, ${b} bananas`, checkAnswer: `${a},${b}`, hint:"Set up two equations: a+b=total and costA*a + costB*b = totalCost" }; },
    () => { return { problem: `What does the solution to a system of linear equations represent on a graph?`, answer: `The point where the two lines intersect.`, checkAnswer: "intersection point" }; },
    () => { const x=10, y=5; const eq1=`2x+3y=35`, eq2=`x-y=5`; return { problem: `Solve by elimination: \\(${eq1}\\) and \\(${eq2}\\).`, answer: `\\(x=${x}, y=${y}\\)`, checkAnswer: `${x},${y}`, hint:"Multiply the second equation by 3." }; },
    () => { const y=3, x=2*y-2; return { problem: `Solve by substitution: \\(x=2y-2\\) and \\(x+2y=10\\).`, answer: `\\(x=${x}, y=${y}\\)`, checkAnswer: `${x},${y}` }; },
    () => { const m=1, b=2; return { problem: `What is a second equation that would create a system with no solution with \\(y=${m}x+${b}\\)?`, answer: `Any equation with the same slope but different y-intercept, e.g., \\(y=${m}x+5\\).`, checkAnswer: `y=${m}x+5` }; },
    () => { return { problem: `Name the three main methods for solving systems of linear equations.`, answer: `Graphing, substitution, and elimination.`, checkAnswer: "Graphing, substitution, elimination" }; },
    () => { const x=getRandomInt(2,5), y=getRandomInt(2,5), c1=getRandomInt(2,4), c2=getRandomInt(2,4); return { problem: `Two numbers have a sum of \\(${x+y}\\) and a difference of \\(${x-y}\\). What are the two numbers?`, answer: `The numbers are \\(${x}\\) and \\(${y}\\).`, checkAnswer: `${x},${y}` }; },
    () => { return { problem: `If two lines have different slopes, how many solutions does the system have?`, answer: `Exactly one solution.`, checkAnswer: "One solution" }; },
    () => { const m=2, b=4; const x=3, y=m*x+b; return { problem: `A line passes through (0,${b}) and has a slope of ${m}. A second line passes through (0,${b+3}) and (${x+1}, ${y-2}). Where do they intersect?`, answer: `They are parallel and do not intersect.`, checkAnswer: "No solution" }; },
    () => { const x=3, y=1; const c1=2, c2=3, s1=c1*x+y; const c3=1, c4=2, s2=c3*x-c4*y; return { problem: `Solve the system: \\(${c1}x+y=${s1}\\) and \\(${c3}x-${c4}y=${s2}\\).`, answer: `\\(x=${x}, y=${y}\\)`, checkAnswer: `${x},${y}` }; },
    () => { const t=5, s=2, d=t+s; const c=10, p=12, tc=c*t+p*s; return { problem: `You bought \\(${d}\\) tickets. Child tickets are \\($${c}\\) and adult tickets are \\($${p}\\). You spent \\($${tc}\\). How many of each?`, answer: `${t} child, ${s} adult`, checkAnswer: `${t},${s}` }; },
    () => { return { problem: `Which method is best for solving \\(y=5x-2\\) and \\(x+y=10\\)?`, answer: `Substitution, because one equation is already solved for y.`, checkAnswer: "Substitution" }; },
    () => { return { problem: `Which method is best for solving \\(3x-2y=8\\) and \\(5x+2y=12\\)?`, answer: `Elimination, because the y-coefficients are opposites.`, checkAnswer: "Elimination" }; },
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "The solution must make BOTH equations true." };
}

export const module = {
    topicId: '8M5',
    topicName: 'Systems of Linear Equations',
    generateProblem: generate
};
