// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
const problemGenerators = [
    () => { const x=getRandomInt(2,5), y=getRandomInt(3,6); const eq1=`x+y=${x+y}`, eq2=`2x-y=${2*x-y}`; return { problem: `Solve the system by elimination: \\(${eq1}\\) and \\(${eq2}\\).`, answer: `\\(x=${x}, y=${y}\\)`, checkAnswer: `${x},${y}` }; },
    () => { const x=getRandomInt(1,4), y=x+2; const eq1=`y=x+2`, eq2=`3x+y=${3*x+y}`; return { problem: `Solve the system by substitution: \\(${eq1}\\) and \\(${eq2}\\).`, answer: `\\(x=${x}, y=${y}\\)`, checkAnswer: `${x},${y}` }; },
    () => { const m1=1,b1=2,m2=-2,b2=8; const x=2,y=4; const graphId=`g-${Date.now()}`; return { problem: `Solve the system by graphing: \\(y=x+2\\) and \\(y=-2x+8\\)`, answer: `The solution is (\\(${x},${y}\\)).`, checkAnswer: `${x},${y}`, graphId, graphFunction:{functions:[{type:'expression',expression:`x+2`},{type:'expression',expression:`-2*x+8`}],boundingbox:[-2,8,10,-2]} }; },
    () => { return { problem: `Graph the solution to the inequality \\(y > 2x - 1\\).`, answer: `A dashed line for y=2x-1, with the region above the line shaded.`, checkAnswer: "dashed, shaded above" }; },
    () => { return { problem: `Graph the solution to \\(y \\le -x + 3\\).`, answer: `A solid line for y=-x+3, with the region below the line shaded.`, checkAnswer: "solid, shaded below" }; },
    () => { const x=5, y=2; return { problem: `Is (\\(${x},${y}\\)) a solution to the system of inequalities \\(y < x\\) and \\(y > 0\\)?`, answer: `Yes`, checkAnswer: "Yes" }; },
    () => { const x=1, y=4; return { problem: `Is (\\(${x},${y}\\)) a solution to \\(y \\ge 2x+3\\)?`, answer: `No, because 4 is not >= 5.`, checkAnswer: "No" }; },
    () => { const a=10,c=5,p_a=2,p_c=1; const total_p=a*p_a+c*p_c; return { problem: `An adult ticket costs \\($${p_a}\\) and a child ticket costs \\($${p_c}\\). A group of 15 people paid \\($${total_p}\\). How many adults and children were there?`, answer: `${a} adults, ${c} children`, checkAnswer: `${a},${c}` }; },
    () => { return { problem: `How many solutions does a system of parallel lines have?`, answer: `No solution`, checkAnswer: "No solution" }; },
    () => { return { problem: `How many solutions does a system have if the two equations represent the same line?`, answer: `Infinitely many solutions`, checkAnswer: "Infinitely many solutions" }; },
    () => { const x=getRandomInt(2,6), y=getRandomInt(1,5); return { problem: `Create a system of two linear equations whose solution is (\\(${x},${y}\\)).`, answer: `Example: \\(x+y=${x+y}\\) and \\(x-y=${x-y}\\)`, checkAnswer: `x+y=${x+y}` }; },
    () => { const graphId=`g-${Date.now()}`; return { problem: `Graph the solution set for the system of inequalities: \\(y < 2\\) and \\(x > -1\\).`, answer: `The shaded region is the rectangle where x is greater than -1 and y is less than 2.`, checkAnswer: "shaded rectangle", graphId, graphFunction:{functions:[],boundingbox:[-5,5,5,-5]} }; },
    () => { const c=getRandomInt(20,50); return { problem: `You have \\($${c}\\). Candy A costs $2 and Candy B costs $3. Write an inequality representing the number of candies (a, b) you can buy.`, answer: `\\(2a + 3b \\le ${c}\\)`, checkAnswer: `2a+3b<=${c}` }; },
    () => { const x=3, y=-1; return { problem: `Solve the system: \\(2x + 3y = 3\\) and \\(x - 2y = 5\\)`, answer: `\\(x=${x}, y=${y}\\)`, checkAnswer: `${x},${y}` }; },
    () => { return { problem: `Is the boundary line for the inequality \\(2x + 5y > 10\\) solid or dashed?`, answer: `Dashed`, checkAnswer: "Dashed" }; },
    () => { return { problem: `Is the boundary line for \\(y \\ge 4x - 1\\) solid or dashed?`, answer: `Solid`, checkAnswer: "Solid" }; },
    () => { return { problem: `To test which side of the line to shade for an inequality, what is the easiest point to use if the line doesn't pass through it?`, answer: `The origin (0,0)`, checkAnswer: "(0,0)" }; },
    () => { const x=0, y=0; return { problem: `Is (0,0) a solution to \\(3x - 4y < 12\\)?`, answer: `Yes`, checkAnswer: "Yes" }; },
    () => { const n=10, d=15, total=25; const val=0.05*n+0.10*d; return { problem: `You have \\(${total}\\) coins (nickels and dimes) worth \\($${val.toFixed(2)}\\). How many nickels and dimes do you have?`, answer: `${n} nickels, ${d} dimes`, checkAnswer: `${n},${d}` }; },
    () => { return { problem: `What does the shaded region of a system of inequalities represent?`, answer: `All the points that are solutions to all inequalities in the system.`, checkAnswer: "All solutions" }; }
];
function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "For inequalities, shade the region of points that make the statement true." };
}
export const module = { topicId: '9M5', topicName: 'Systems of Equations & Inequalities', generateProblem: generate };