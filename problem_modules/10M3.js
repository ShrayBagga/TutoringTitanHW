// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function formatAnswer(val, p=2) { return parseFloat(val.toFixed(p)).toString().replace(/\.00$/, ''); }

// --- Graphing Helper for Transversal Problems ---
function createTransversalGraph() {
    const graphId = `g-${Date.now()}`;
    const m = (getRandomInt(-1, 1) * getRandomInt(1, 4))/10 + 0.1; // shallow slope, non-zero
    const b1 = getRandomInt(2, 4);
    const b2 = getRandomInt(-4, -2);
    const m_trans = -1/m + (getRandomInt(0,1) ? 0.5 : -0.5); // A transversal slope
    const x_int = getRandomInt(-2,2);
    const y_int = m_trans * x_int + getRandomInt(-1,1);

    const graphFunction = {
        functions: [
            { type: 'expression', expression: `function(x){ return ${m}*x+${b1};}` },
            { type: 'expression', expression: `function(x){ return ${m}*x+${b2};}` },
            { type: 'expression', expression: `function(x){ return ${m_trans}*(x-${x_int})+${y_int};}`, options: {strokeColor: '#32CD32'} } // Green transversal
        ],
        boundingbox: [-8, 8, 8, -8]
    };
    return { graphId, graphFunction };
}

const problemGenerators = [
    () => { const m = getRandomInt(2, 5); return { problem: `What is the slope of a line parallel to \\(y = ${m}x + 3\\)?`, answer: `\\(${m}\\)`, checkAnswer: m.toString() }; },
    () => { const m = getRandomInt(2, 5); return { problem: `What is the slope of a line perpendicular to \\(y = ${m}x + 3\\)?`, answer: `\\(-\\frac{1}{${m}}\\)` , checkAnswer: `-1/${m}`}; },
    () => { const m = getRandomInt(2,4); const eq1 = `${m}x - y = 2`, eq2 = `y = ${m}x + 5`; return { problem: `Are the lines \\(${eq1}\\) and \\(${eq2}\\) parallel, perpendicular, or neither? (Enter 1 for parallel, 2 for perpendicular, 3 for neither)`, answer: `1`, checkAnswer: "1" }; },
    () => { const m = getRandomInt(2,4); const eq1 = `y = ${m}x + 1`, eq2 = `x + ${m}y = 3`; return { problem: `Are the lines \\(${eq1}\\) and \\(${eq2}\\) parallel, perpendicular, or neither? (Enter 1 for parallel, 2 for perpendicular, 3 for neither)`, answer: `2`, checkAnswer: "2" }; },
    () => { const angle = getRandomInt(100, 140); const { graphId, graphFunction } = createTransversalGraph(); return { problem: `In the diagram, two parallel lines are cut by a transversal. If an alternate interior angle to \\(x\\) is \\(${angle}^{\\circ}\\), what is \\(x\\)?`, answer: `\\(${angle}^{\\circ}\\)`, checkAnswer: angle.toString(), graphId, graphFunction }; },
    () => { const angle = getRandomInt(60, 80); const { graphId, graphFunction } = createTransversalGraph(); return { problem: `In the diagram, two parallel lines are cut by a transversal. If a corresponding angle to \\(x\\) is \\(${angle}^{\\circ}\\), what is \\(x\\)?`, answer: `\\(${angle}^{\\circ}\\)`, checkAnswer: angle.toString(), graphId, graphFunction }; },
    () => { const angle = getRandomInt(110, 150); const { graphId, graphFunction } = createTransversalGraph(); return { problem: `In the diagram, two parallel lines are cut by a transversal. If a consecutive interior angle to \\(x\\) is \\(${angle}^{\\circ}\\), what is \\(x\\)?`, answer: `\\(${180-angle}^{\\circ}\\)`, checkAnswer: (180-angle).toString(), graphId, graphFunction }; },
    () => { const m = getRandomInt(2,4); const x1 = getRandomInt(1,3), y1 = getRandomInt(2,4); const b = y1 - m*x1; return { problem: `Write the equation of the line that passes through (\\(${x1},${y1}\\)) and is parallel to \\(y=${m}x-5\\). (Enter as y=mx+b)`, answer: `\\(y=${m}x+${b.toFixed(2)}\\)`, checkAnswer: `y=${m}x+${b.toFixed(2)}` }; },
    () => { const m = getRandomInt(2,4); const x1 = getRandomInt(1,3), y1 = getRandomInt(2,4); const b = y1 - (-1/m)*x1; return { problem: `Write the equation of the line that passes through (\\(${x1},${y1}\\)) and is perpendicular to \\(y=${m}x-5\\). (Enter as y=mx+b)`, answer: `\\(y=-\\frac{1}{${m}}x+${b.toFixed(2)}\\)`, checkAnswer: `y=-1/${m}x+${b.toFixed(2)}` }; },
    () => { const m=getRandomInt(2,5); const x1=getRandomInt(1,3), y1=getRandomInt(2,5), x2=x1+getRandomInt(1,3), y2=y1+m*(x2-x1); const x3=getRandomInt(1,3), y3=getRandomInt(2,5), x4=x3+getRandomInt(1,3), y4=y3+m*(x4-x3); return { problem: `Line A passes through (${x1},${y1}) and (${x2},${y2}). Line B passes through (${x3},${y3}) and (${x4},${y4}). Are they parallel? (1=yes, 0=no)`, answer: `1`, checkAnswer: "1" }; },
    () => { const a=getRandomInt(2,5), b=getRandomInt(2,5); const m1=b/a; const m2=-a/b; return { problem: `The diagonals of a kite have slopes of \\(${m1.toFixed(2)}\\) and \\(${m2.toFixed(2)}\\). Are they perpendicular? (1=yes, 0=no)`, answer: `1`, checkAnswer: "1" }; },
    () => { const y1=getRandomInt(2,5); const dist = getRandomInt(3,8); return { problem: `What is the distance between the parallel lines \\(y=${y1}\\) and \\(y=${y1+dist}\\)?`, answer: `\\(${dist}\\)`, checkAnswer: dist.toString() }; },
    () => { const x1=getRandomInt(1,4); const dist = getRandomInt(3,6); return { problem: `What is the distance between the parallel lines \\(x=${x1}\\) and \\(x=${x1+dist}\\)?`, answer: `\\(${dist}\\)`, checkAnswer: dist.toString() }; },
    () => { const angle=getRandomInt(40,80); return { problem: `A transversal intersects two parallel lines. If one angle is \\(${angle}^{\\circ}\\), what is the measure of its adjacent angle that forms a linear pair?`, answer: `\\(${180-angle}^{\\circ}\\)`, checkAnswer: (180-angle).toString() }; },
    () => { const m=getRandomInt(2,5); return { problem: `Find the slope of a line parallel to \\(${m}x - y = 7\\).`, answer: `\\(${m}\\)`, checkAnswer: m.toString() }; },
    () => { const m=getRandomInt(2,5); return { problem: `Find the slope of a line perpendicular to \\(x + ${m}y = 7\\).`, answer: `\\(${m}\\)`, checkAnswer: m.toString() }; },
    () => { const angle=getRandomInt(20,40); const x= (180-angle)/2; return { problem: `In an isosceles triangle, the vertex angle is \\(${angle}^{\\circ}\\). A line is drawn parallel to the base through the vertex. What is the measure of one of the alternate interior angles formed with the legs?`, answer: `\\(${x.toFixed(1)}^{\\circ}\\)`, checkAnswer: x.toFixed(1) }; },
    () => { const m1=getRandomInt(2,4), m2=-1/m1; const b1=getRandomInt(1,3), b2=getRandomInt(-3,-1); const graphId=`g-${Date.now()}`; return { problem: `Graph the lines \\(y=${m1}x+${b1}\\) and \\(y=${m2.toFixed(2)}x+${b2}\\). What is the measure of the angle at their intersection?`, answer: `\\(90^{\\circ}\\)`, checkAnswer: "90", graphId, graphFunction:{functions:[{type:'expression',expression:`${m1}*x+${b1}`},{type:'expression',expression:`${m2}*x+${b2}`}]} }; },
    () => { const m = getRandomInt(2,4); const x1=0, y1=getRandomInt(1,5), x2=getRandomInt(2,4), y2=m*x2+y1; return { problem: `Line A passes through (0, ${y1}) and (${x2}, ${y2}). Line B is perpendicular to Line A. What is the slope of Line B?`, answer: `\\(-\\frac{1}{${m}}\\)` , checkAnswer: `-1/${m}`}; },
    () => { return { problem: `If two lines are perpendicular to the same transversal line, what is their relationship to each other? (1=parallel, 2=perpendicular)`, answer: `1`, checkAnswer: "1" }; },
];
function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Parallel lines have equal slopes. Perpendicular lines have negative reciprocal slopes." };
}
export const module = { topicId: '10M3', topicName: 'Parallel & Perpendicular Lines', generateProblem: generate };

