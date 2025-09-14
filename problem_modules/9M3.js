// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
const problemGenerators = [
    () => { const m=getRandomInt(2,5), b=getRandomInt(1,4); const eq=`y=${m}x+${b}`; const graphId=`g-${Date.now()}`; return { problem: `Graph the linear function \\(${eq}\\).`, answer: `A line with slope \\(${m}\\) and y-intercept \\(${b}\\).`, checkAnswer: "graphed", graphId, graphFunction:{functions:[{type:'expression',expression:`function(x){return ${m}*x+${b};}`}],boundingbox:[-5,5,15,-5]} }; },
    () => { const m=-getRandomInt(2,5), b=getRandomInt(-4,-1); const eq=`y=${m}x${b}`; const graphId=`g-${Date.now()}`; return { problem: `Graph the linear function \\(${eq}\\).`, answer: `A line with slope \\(${m}\\) and y-intercept \\(${b}\\).`, checkAnswer: "graphed", graphId, graphFunction:{functions:[{type:'expression',expression:`function(x){return ${m}*x+${b};}`}],boundingbox:[-5,5,5,-15]} }; },
    () => { const x_int=getRandomInt(2,6), y_int=getRandomInt(2,6); return { problem: `Find the x- and y-intercepts of the equation \\(${y_int}x + ${x_int}y = ${x_int*y_int}\\).`, answer: `x-intercept: \\((${x_int},0)\\), y-intercept: \\((0,${y_int})\\)`, checkAnswer: `${x_int},${y_int}` }; },
    () => { const m=getRandomInt(2,4); const eq=`y=${m}x`; return { problem: `What is the slope of the line \\(${eq}\\)?`, answer: `\\(${m}\\)`, checkAnswer: m.toString() }; },
    () => { const b=getRandomInt(3,8); const eq=`y=${b}`; return { problem: `What is the slope of the horizontal line \\(${eq}\\)?`, answer: `0`, checkAnswer: "0" }; },
    () => { const a=getRandomInt(2,7); const eq=`x=${a}`; return { problem: `What is the slope of the vertical line \\(${eq}\\)?`, answer: `Undefined`, checkAnswer: "Undefined" }; },
    () => { const p1='(2,3)', p2='(5,9)'; const m=2; return { problem: `Find the slope of the line passing through ${p1} and ${p2}.`, answer: `\\(${m}\\)`, checkAnswer: m.toString() }; },
    () => { const m=getRandomInt(2,4), b=getRandomInt(1,5); const eq=`${m}x-y=-${b}`; return { problem: `Rewrite \\(${eq}\\) in slope-intercept form (y=mx+b).`, answer: `\\(y=${m}x+${b}\\)`, checkAnswer: `y=${m}x+${b}` }; },
    () => { const m=getRandomInt(2,5); return { problem: `A line has a slope of \\(${m}\\). For every 1-unit increase in x, y increases by how much?`, answer: `\\(${m}\\) units`, checkAnswer: m.toString() }; },
    () => { const m=-getRandomInt(2,5); return { problem: `A line has a slope of \\(${m}\\). For every 1-unit increase in x, y changes by how much?`, answer: `Decreases by \\(${-m}\\) units`, checkAnswer: `${m}` }; },
    () => { const m=getRandomInt(2,4); const eq=`y-2=${m}(x-1)`; return { problem: `A line is given by \\(${eq}\\). What is its slope?`, answer: `\\(${m}\\)`, checkAnswer: m.toString(), hint:"This is in point-slope form." }; },
    () => { const m=3, b=5; const x=4, y=m*x+b; return { problem: `Is the point \\((${x},${y})\\) on the line \\(y=${m}x+${b}\\)?`, answer: `Yes`, checkAnswer: "Yes" }; },
    () => { return { problem: `What does the 'b' in \\(y=mx+b\\) represent?`, answer: `The y-intercept, the point where the line crosses the y-axis.`, checkAnswer: "y-intercept" }; },
    () => { const rate = getRandomInt(10,25); const initial = getRandomInt(50,100); const eq = `y=${rate}x+${initial}`; return { problem: `The value of a collectible is given by \\(${eq}\\), where x is years. What is the initial value?`, answer: `\\($${initial}\\)`, checkAnswer: initial.toString() }; },
    () => { const rate = getRandomInt(10,25); const initial = getRandomInt(50,100); const eq = `y=${rate}x+${initial}`; return { problem: `The value of a collectible is \\(${eq}\\), where x is years. What is the rate of increase per year?`, answer: `\\($${rate}\\) per year`, checkAnswer: rate.toString() }; },
    () => { const m = `\\frac{2}{3}`; const graphId=`g-${Date.now()}`; return { problem: `Graph a line that passes through (1,1) and has a slope of \\(${m}\\).`, answer: `Plot (1,1). From there, go up 2 units and right 3 units to find another point.`, checkAnswer: "graphed", graphId, graphFunction:{functions:[{type:'expression',expression:`function(x){return (2/3)*(x-1)+1;}`}],boundingbox:[-5,5,5,-5]} }; },
    () => { const x_int=4, y_int=-2; return { problem: `A line has an x-intercept of ${x_int} and a y-intercept of ${y_int}. What is its slope?`, answer: `\\(\\frac{1}{2}\\)`, checkAnswer: "0.5" }; },
    () => { return { problem: `True or false: The graph of a linear function is always a straight line.`, answer: `True`, checkAnswer: "True" }; },
    () => { const a=getRandomInt(2,5), b=a+getRandomInt(1,3); return { problem: `Which function is steeper: \\(y=${a}x\\) or \\(y=${b}x\\)?`, answer: `\\(y=${b}x\\)`, checkAnswer: `y=${b}x` }; },
    () => { const a=getRandomInt(2,5); return { problem: `How does the graph of \\(y=x+${a}\\) compare to the graph of \\(y=x\\)?`, answer: `It is shifted up by \\(${a}\\) units.`, checkAnswer: `shifted up ${a}` }; },
];
function generate(settings) {
    const problem = problemGenerators[getRandomInt(0, problemGenerators.length - 1)]();
    return { ...problem, hint: problem.hint || "y=mx+b, where m is the slope and b is the y-intercept." };
}
export const module = { topicId: '9M3', topicName: 'Graphing Linear Functions', generateProblem: generate };