// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
const problemGenerators = [
    () => { const n=getRandomInt(2,5)**2*2; return { problem: `Simplify the radical: \\(\\sqrt{${n}}\\).`, answer: `\\(${Math.sqrt(n/2)}\\sqrt{2}\\)`, checkAnswer: `${Math.sqrt(n/2)}sqrt(2)` }; },
    () => { const n=getRandomInt(2,4)**2*3; return { problem: `Simplify: \\(\\sqrt{${n}}\\).`, answer: `\\(${Math.sqrt(n/3)}\\sqrt{3}\\)`, checkAnswer: `${Math.sqrt(n/3)}sqrt(3)` }; },
    () => { const c1=getRandomInt(2,5), c2=getRandomInt(2,5), r=getRandomInt(2,7); return { problem: `Simplify: \\(${c1}\\sqrt{${r}} + ${c2}\\sqrt{${r}}\\).`, answer: `\\(${(c1+c2)}\\sqrt{${r}}\\)` , checkAnswer: `${c1+c2}sqrt(${r})`}; },
    () => { const c1=getRandomInt(6,9), c2=getRandomInt(2,5), r=getRandomInt(2,7); return { problem: `Simplify: \\(${c1}\\sqrt{${r}} - ${c2}\\sqrt{${r}}\\).`, answer: `\\(${(c1-c2)}\\sqrt{${r}}\\)` , checkAnswer: `${c1-c2}sqrt(${r})`}; },
    () => { const r1=getRandomInt(2,5), r2=getRandomInt(2,5); return { problem: `Multiply the radicals: \\(\\sqrt{${r1}} \\cdot \\sqrt{${r2}}\\).`, answer: `\\(\\sqrt{${r1*r2}}\\)` , checkAnswer: `sqrt(${r1*r2})`}; },
    () => { const c1=getRandomInt(2,4), r1=getRandomInt(2,3), c2=getRandomInt(2,4), r2=getRandomInt(5,7); return { problem: `Multiply: \\((${c1}\\sqrt{${r1}})(${c2}\\sqrt{${r2}})\\).`, answer: `\\(${c1*c2}\\sqrt{${r1*r2}}\\)` , checkAnswer: `${c1*c2}sqrt(${r1*r2})`}; },
    () => { const n=getRandomInt(10,20)*2, d=2; return { problem: `Simplify the expression: \\(\\frac{\\sqrt{${n}}}{\\sqrt{${d}}}\\).`, answer: `\\(\\sqrt{${n/d}}\\)` , checkAnswer: `sqrt(${n/d})`}; },
    () => { const n=getRandomInt(2,5); const d=getRandomInt(n+1,9); return { problem: `Rationalize the denominator: \\(\\frac{${n}}{\\sqrt{${d}}}\\).`, answer: `\\(\\frac{${n}\\sqrt{${d}}}{${d}}\\)` , checkAnswer: `${n}sqrt(${d})/${d}`}; },
    () => { const x=getRandomInt(3,8)**2; return { problem: `Solve the radical equation: \\(\\sqrt{x} = ${Math.sqrt(x)}\\).`, answer: `\\(x = ${x}\\)`, checkAnswer: x.toString() }; },
    () => { const x=getRandomInt(2,7); const res=Math.sqrt(x+2); return { problem: `Solve: \\(\\sqrt{x+2} = ${res.toFixed(3)}\\). (Hint: square both sides)`, answer: `\\(x = ${x}\\)`, checkAnswer: x.toString() }; },
    () => { const graphId=`g-${Date.now()}`; return { problem: `Graph the function \\(y = \\sqrt{x}\\).`, answer: `A curve starting at (0,0) and increasing to the right.`, checkAnswer: "graphed", graphId, graphFunction:{functions:[{type:'expression',expression:`Math.sqrt(x)`}],boundingbox:[-2,10,5,-2]} }; },
    () => { const c=getRandomInt(2,5); const graphId=`g-${Date.now()}`; return { problem: `How does the graph of \\(y = \\sqrt{x} + ${c}\\) compare to \\(y=\\sqrt{x}\\)?`, answer: `It is shifted up by \\(${c}\\) units.`, checkAnswer: `shifted up ${c}`, graphId, graphFunction:{functions:[{type:'expression',expression:`Math.sqrt(x)+${c}`},{type:'expression',expression:`Math.sqrt(x)`,options:{strokeColor:'gray'}}],boundingbox:[-2,10,10,-2]} }; },
    () => { const c=getRandomInt(2,5); const graphId=`g-${Date.now()}`; return { problem: `How does \\(y = \\sqrt{x - ${c}}\\) compare to \\(y=\\sqrt{x}\\)?`, answer: `It is shifted right by \\(${c}\\) units.`, checkAnswer: `shifted right ${c}`, graphId, graphFunction:{functions:[{type:'expression',expression:`Math.sqrt(x-${c})`},{type:'expression',expression:`Math.sqrt(x)`,options:{strokeColor:'gray'}}],boundingbox:[-2,10,5,-2]} }; },
    () => { return { problem: `What is the domain of the function \\(y = \\sqrt{x}\\)?`, answer: `\\(x \\ge 0\\)`, checkAnswer: "x>=0" }; },
    () => { const c=getRandomInt(3,8); return { problem: `What is the domain of \\(y = \\sqrt{x - ${c}}\\)?`, answer: `\\(x \\ge ${c}\\)`, checkAnswer: `x>=${c}` }; },
    () => { const x=getRandomInt(4,9)**2; return { problem: `Solve for x: \\(2\\sqrt{x} = ${2*Math.sqrt(x)}\\).`, answer: `\\(x=${x}\\)`, checkAnswer: x.toString() }; },
    () => { const r1=18, r2=8; const s1=9*2, s2=4*2; const res_c1=3, res_c2=2, res_r=2; return { problem: `Simplify and combine: \\(\\sqrt{18} + \\sqrt{8}\\).`, answer: `\\(5\\sqrt{2}\\)`, checkAnswer: "5sqrt(2)" }; },
    () => { return { problem: `An extraneous solution to a radical equation is a solution that...`, answer: `...does not work when plugged back into the original equation.`, checkAnswer: "does not work" }; },
    () => { const x=getRandomInt(2,5); const res=x-1; return { problem: `Solve for x: \\(\\sqrt{x+2} = x\\). (Check for extraneous solutions)`, answer: `x=2`, checkAnswer: "2" }; },
    () => { const a=getRandomInt(3,6), b=getRandomInt(a+1, 9); return { problem: `A right triangle has legs of length \\(${a}\\) and \\(${b}\\). Find the hypotenuse in simplest radical form.`, answer: `\\(\\sqrt{${a*a+b*b}}\\)` , checkAnswer: `sqrt(${a*a+b*b})`}; }
];
function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "You can only add or subtract radicals if they have the same number inside the square root." };
}
export const module = { topicId: '9M10', topicName: 'Radicals & Radical Functions', generateProblem: generate };