// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
const problemGenerators = [
    () => { const m=getRandomInt(2,5), b=getRandomInt(1,6); return { problem: `Write the equation of a line with a slope of \\(${m}\\) and a y-intercept of \\(${b}\\).`, answer: `\\(y = ${m}x + ${b}\\)`, checkAnswer: `y=${m}x+${b}` }; },
    () => { const m=getRandomInt(2,4), x1=getRandomInt(1,3), y1=m*x1+getRandomInt(2,4); const b=y1-m*x1; return { problem: `Write the equation of a line with a slope of \\(${m}\\) that passes through the point (\\(${x1},${y1}\\)).`, answer: `\\(y = ${m}x + ${b}\\)`, checkAnswer: `y=${m}x+${b}` }; },
    () => { const x1=getRandomInt(1,3), y1=getRandomInt(2,5), x2=x1+getRandomInt(2,4), y2=y1+getRandomInt(2,5); const m=(y2-y1)/(x2-x1); const b=y1-m*x1; return { problem: `Write the equation of the line that passes through the points (\\(${x1},${y1}\\)) and (\\(${x2},${y2}\\)).`, answer: `\\(y = ${m.toFixed(2)}x + ${b.toFixed(2)}\\)`, checkAnswer: `y=${m.toFixed(2)}x+${b.toFixed(2)}` }; },
    () => { const m=getRandomInt(2,5), b=getRandomInt(1,6); return { problem: `Write an equation for a line that is parallel to \\(y = ${m}x - 1\\) and passes through the point (0, \\(${b}\\)).`, answer: `\\(y = ${m}x + ${b}\\)`, checkAnswer: `y=${m}x+${b}` }; },
    () => { const m=getRandomInt(2,5), b=getRandomInt(1,6); const perp_m = `-1/${m}`; return { problem: `Write an equation for a line that is perpendicular to \\(y = ${m}x + 3\\) and passes through the point (0, \\(${b}\\)).`, answer: `\\(y = -\\frac{1}{${m}}x + ${b}\\)`, checkAnswer: `y=-1/${m}x+${b}` }; },
    () => { const x_int=4, y_int=8; return { problem: `Write an equation of a line with an x-intercept of \\(${x_int}\\) and a y-intercept of \\(${y_int}\\).`, answer: `\\(y = -2x + 8\\)`, checkAnswer: `y=-2x+8` }; },
    () => { const m=getRandomInt(2,4), x1=getRandomInt(1,3), y1=m*x1-getRandomInt(1,3); return { problem: `Write an equation in point-slope form for a line with slope \\(${m}\\) passing through (\\(${x1},${y1}\\)).`, answer: `\\(y - ${y1} = ${m}(x - ${x1})\\)`, checkAnswer: `y-${y1}=${m}(x-${x1})` }; },
    () => { const m=2, b=5; const eq=`y=${m}x+${b}`; return { problem: `A table of values for a linear function includes (0, ${b}) and (1, ${m+b}). What is the equation?`, answer: `\\(${eq}\\)`, checkAnswer: eq }; },
    () => { const m=3, b=1; const eq=`y=${m}x+${b}`; const graphId=`g-${Date.now()}`; return { problem: `Write the equation for the line shown in the graph.`, answer: `\\(${eq}\\)`, checkAnswer: eq, graphId, graphFunction:{functions:[{type:'expression',expression:`function(x){return ${m}*x+${b};}`}],boundingbox:[-3,3,10,-2]} }; },
    () => { const a=getRandomInt(2,5), b=getRandomInt(3,6), c=a*b; return { problem: `Convert the equation \\(${a}x + y = ${c}\\) from standard form to slope-intercept form.`, answer: `\\(y = -${a}x + ${c}\\)`, checkAnswer: `y=-${a}x+${c}` }; },
    () => { const m=getRandomInt(2,4), b=getRandomInt(1,5); return { problem: `Convert \\(y=${m}x+${b}\\) to standard form (Ax + By = C).`, answer: `\\(-${m}x + y = ${b}\\) or \\(${m}x - y = -${b}\\)`, checkAnswer: `${m}x-y=-${b}` }; },
    () => { const b=getRandomInt(2,8); return { problem: `Write the equation of a horizontal line that passes through the point (3, \\(${b}\\)).`, answer: `\\(y = ${b}\\)`, checkAnswer: `y=${b}` }; },
    () => { const a=getRandomInt(2,8); return { problem: `Write the equation of a vertical line that passes through the point (\\(${a}\\), 4).`, answer: `\\(x = ${a}\\)`, checkAnswer: `x=${a}` }; },
    () => { const initial=100, rate=25, months=6; const total=initial+rate*months; return { problem: `You start with \\($${initial}\\) and deposit \\($${rate}\\) per month. Write a linear equation for your savings \\(S\\) after \\(m\\) months.`, answer: `\\(S = ${rate}m + ${initial}\\)`, checkAnswer: `S=25m+100` }; },
    () => { const m=3; return { problem: `Find the equation of a line parallel to \\(y=3x+1\\) that passes through the origin.`, answer: `\\(y=3x\\)`, checkAnswer: "y=3x" }; },
    () => { const m=-1/2; return { problem: `Find the equation of a line perpendicular to \\(y=2x-4\\) that passes through the origin.`, answer: `\\(y = -\\frac{1}{2}x\\)`, checkAnswer: "y=-1/2x" }; },
    () => { const m=0, b=getRandomInt(1,10); return { problem: `A line has a slope of \\(${m}\\) and passes through (5, \\(${b}\\)). What is its equation?`, answer: `\\(y=${b}\\)`, checkAnswer: `y=${b}` }; },
    () => { const x_int=5; return { problem: `A line has an undefined slope and passes through (\\(${x_int}\\), 2). What is its equation?`, answer: `\\(x=${x_int}\\)`, checkAnswer: `x=${x_int}` }; },
    () => { const x1=2,y1=5,x2=4,y2=5; return { problem: `Write the equation of the line through (\\(${x1},${y1}\\)) and (\\(${x2},${y2}\\)).`, answer: `\\(y=${y1}\\)`, checkAnswer: `y=${y1}` }; },
    () => { const x1=3,y1=2,x2=3,y2=7; return { problem: `Write the equation of the line through (\\(${x1},${y1}\\)) and (\\(${x2},${y2}\\)).`, answer: `\\(x=${x1}\\)`, checkAnswer: `x=${x1}` }; }
];
function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Start with a form like y=mx+b or y-y1=m(x-x1) and plug in the given information." };
}
export const module = { topicId: '9M4', topicName: 'Writing Linear Functions', generateProblem: generate };