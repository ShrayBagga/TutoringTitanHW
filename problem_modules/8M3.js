// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function gcd(a, b) { a=Math.abs(a); b=Math.abs(b); return b === 0 ? a : gcd(b, a % b); }

const problemGenerators = [
    () => { const m = getRandomInt(2,5); const x1=getRandomInt(2,4), y1=m*x1, x2=getRandomInt(5,8), y2=m*x2; return { problem: `The points (\\(${x1},${y1}\\)) and (\\(${x2},${y2}\\)) are on a line. What is the slope?`, answer: `\\(${m}\\)`, checkAnswer: m.toString() }; },
    () => { const m = getRandomInt(-4,-2); const x1=getRandomInt(1,3), y1=m*x1+5, x2=getRandomInt(4,6), y2=m*x2+5; return { problem: `Find the slope of the line passing through (\\(${x1},${y1}\\)) and (\\(${x2},${y2}\\)).`, answer: `\\(${m}\\)`, checkAnswer: m.toString() }; },
    () => { const m = getRandomInt(2,4); const b = getRandomInt(1,5); return { problem: `What is the slope and y-intercept of the equation \\(y = ${m}x + ${b}\\)?`, answer: `Slope: \\(${m}\\), y-intercept: \\(${b}\\)`, checkAnswer: `${m},${b}` }; },
    () => { const m = -getRandomInt(2,4); const b = getRandomInt(-5,-1); return { problem: `Identify the slope and y-intercept for \\(y = ${m}x ${b}\\).`, answer: `Slope: \\(${m}\\), y-intercept: \\(${b}\\)`, checkAnswer: `${m},${b}` }; },
    () => { const m=getRandomInt(2,5); const graphId = `graph-${Date.now()}`; const graphFunction = { functions: [{ type: 'expression', expression: `function(x){ return ${m}*x; }` }], boundingbox: [-5, 5, 15, -15] }; return { problem: `The graph shows a proportional relationship \\(y=kx\\). What is the unit rate (slope)?`, answer: `The unit rate is \\(${m}\\).`, checkAnswer: m.toString(), graphId, graphFunction }; },
    () => { return { problem: `Which equation represents a proportional relationship: \\(y=3x\\) or \\(y=3x+2\\)?`, answer: `\\(y=3x\\)`, checkAnswer: "y=3x" }; },
    () => { const m=2, b=3; const graphId = `graph-${Date.now()}`; const graphFunction = { functions: [{ type: 'expression', expression: `function(x){ return ${m}*x+${b}; }` }], boundingbox: [-5, 5, 15, -5] }; return { problem: `Graph the equation \\(y = ${m}x + ${b}\\).`, answer: `A line with a y-intercept at \\(${b}\\) and a slope of \\(${m}\\).`, checkAnswer: "graphed", graphId, graphFunction }; },
    () => { const rateA = 25; const rateB = 30; return { problem: `Car A travels at \\(${rateA}\\) mph. Car B travels at \\(${rateB}\\) mph. Which car has a greater speed (slope of distance-time graph)?`, answer: `Car B`, checkAnswer: "Car B" }; },
    () => { const m = 3, b = -2; return { problem: `Write the equation of a line with a slope of \\(${m}\\) and a y-intercept of \\(${b}\\).`, answer: `\\(y = ${m}x - ${Math.abs(b)}\\)`, checkAnswer: `y=${m}x-${Math.abs(b)}` }; },
    () => { const run = getRandomInt(2,4), rise = getRandomInt(run+1, 9); const common = gcd(rise,run); return { problem: `A line goes up \\(${rise}\\) units for every \\(${run}\\) units it moves to the right. What is the slope of the line?`, answer: `\\(\\frac{${rise/common}}{${run/common}}\\)` , checkAnswer: `${rise/common}/${run/common}`}; },
    () => { const p1='(2, 5)', p2='(2, 8)'; return { problem: `What is the slope of a vertical line passing through the points ${p1} and ${p2}?`, answer: `Undefined`, checkAnswer: "Undefined" }; },
    () => { const p1='(3, 4)', p2='(7, 4)'; return { problem: `What is the slope of a horizontal line passing through ${p1} and ${p2}?`, answer: `0`, checkAnswer: "0" }; },
    () => { const m = -2, b = 1; return { problem: `Describe the graph of \\(y = ${m}x + ${b}\\).`, answer: `A line that goes down from left to right and crosses the y-axis at 1.`, checkAnswer: "downward sloping line" }; },
    () => { const x=getRandomInt(2,5), y=getRandomInt(10,20); const k = y/x; return { problem: `A person earns \\($${y}\\) in \\(${x}\\) hours. Is this relationship proportional? If so, what is the constant of proportionality?`, answer: `Yes, it's proportional. The constant is \\(${k}\\) dollars per hour.`, checkAnswer: k.toString() }; },
    () => { const m=getRandomInt(2,4), b=getRandomInt(3,6); return { problem: `Convert the equation \\(${m}x - y = -${b}\\) into slope-intercept form (y=mx+b).`, answer: `\\(y = ${m}x + ${b}\\)`, checkAnswer: `y=${m}x+${b}` }; },
    () => { const m1=3, m2=-1/3; return { problem: `Are the lines \\(y=${m1}x+2\\) and \\(y=${m2}x-4\\) parallel, perpendicular, or neither?`, answer: `Neither`, checkAnswer: "Neither", hint: "Parallel lines have the same slope. Perpendicular lines have negative reciprocal slopes." }; },
    () => { const m=4; return { problem: `Are \\(y=${m}x+1\\) and \\(y=${m}x-5\\) parallel, perpendicular, or neither?`, answer: `Parallel`, checkAnswer: "Parallel" }; },
    () => { const x1=1, y1=2, x2=4, y2=8; const m=(y2-y1)/(x2-x1); return { problem: `A line passes through (\\(${x1},${y1}\\)) and (\\(${x2},${y2}\\)). What is its slope?`, answer: `\\(${m}\\)`, checkAnswer: m.toString() }; },
    () => { return { problem: `What is the slope formula?`, answer: `\\(m = \\frac{y_2 - y_1}{x_2 - x_1}\\)`, checkAnswer: "rise over run" }; },
    () => { const m=getRandomInt(2,5); const b=0; return { problem: `What is the y-intercept of the proportional relationship \\(y=${m}x\\)?`, answer: `0`, checkAnswer: "0" }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Slope is 'rise over run'. The y-intercept is where the line crosses the vertical axis." };
}

export const module = {
    topicId: '8M3',
    topicName: 'Proportionality & Linear Equations',
    generateProblem: generate
};
