// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function formatAnswer(val, p=1) { return parseFloat(val.toFixed(p)).toString().replace(/\.0$/, ''); }

const pythagoreanTriples = [[3,4,5], [5,12,13], [8,15,17], [7,24,25]];

// --- Graphing Helper ---
function createRightTriangleGraph(legA, legB, labels = ['a', 'b', 'c']) {
    const graphId = `g-${Date.now()}`;
    const hyp = Math.sqrt(legA**2 + legB**2);
    const graphFunction = {
        functions: [
            { type: 'point', x: 0, y: 0, options: { name: 'C', size: 2, label: {offset: [-10, -10]} } },
            { type: 'point', x: legB, y: 0, options: { name: 'A', size: 2, label: {offset: [5, -10]} } },
            { type: 'point', x: 0, y: legA, options: { name: 'B', size: 2, label: {offset: [-15, 0]} } }
        ],
        boundingbox: [-2, legB + 2, legA + 2, -2]
    };
    // Triangle sides
    graphFunction.functions.push({ type: 'line', point1: [0,0], point2: [legB,0] });
    graphFunction.functions.push({ type: 'line', point1: [legB,0], point2: [0,legA] });
    graphFunction.functions.push({ type: 'line', point1: [0,legA], point2: [0,0] });
    // Side labels
    graphFunction.labels = [
        { x: legB/2, y: -1, text: labels[1] },
        { x: -1, y: legA/2, text: labels[0] },
        { x: legB/2 + 0.5, y: legA/2 + 0.5, text: labels[2] }
    ];
    // Right angle symbol
    graphFunction.functions.push({type: 'point', x: 0.3, y: 0, options: {visible: false}});
    graphFunction.functions.push({type: 'point', x: 0.3, y: 0.3, options: {visible: false}});
    graphFunction.functions.push({type: 'point', x: 0, y: 0.3, options: {visible: false}});
    graphFunction.functions.push({ type: 'line', point1: [0.3,0], point2: [0.3,0.3] });
    graphFunction.functions.push({ type: 'line', point1: [0.3,0.3], point2: [0,0.3] });

    return { graphId, graphFunction };
}

const problemGenerators = [
    () => { const t = pythagoreanTriples[getRandomInt(0,3)]; const a=t[0], b=t[1], c=t[2]; const {graphId, graphFunction} = createRightTriangleGraph(a,b); return { problem: `A right triangle has legs of length \\(${a}\\) and \\(${b}\\). Find the length of the hypotenuse.`, answer: `\\(${c}\\)`, checkAnswer: c.toString(), graphId, graphFunction }; },
    () => { const t = pythagoreanTriples[getRandomInt(0,3)]; const a=t[0], b=t[1], c=t[2]; const {graphId, graphFunction} = createRightTriangleGraph(a,b, ['a', '?', 'c']); return { problem: `The hypotenuse of a right triangle is \\(${c}\\) and one leg is \\(${a}\\). Find the length of the other leg.`, answer: `\\(${b}\\)`, checkAnswer: b.toString(), graphId, graphFunction }; },
    () => { const a=getRandomInt(5,8), b=getRandomInt(6,9); const c=Math.sqrt(a*a+b*b); return { problem: `The legs of a right triangle are \\(${a}\\) and \\(${b}\\). Find the hypotenuse. Round to one decimal place.`, answer: `\\(${formatAnswer(c)}\\)`, checkAnswer: formatAnswer(c) }; },
    () => { const t = pythagoreanTriples[0]; const m = getRandomInt(2,4); const a=t[0]*m, b=t[1]*m, c=t[2]*m; return { problem: `Do side lengths \\(${a}, ${b}, ${c}\\) form a right triangle? (1=yes, 0=no)`, answer: `1`, checkAnswer: "1" }; },
    () => { const leg = getRandomInt(5,10); const hyp = leg * Math.sqrt(2); return { problem: `In a 45-45-90 triangle, a leg has length \\(${leg}\\). Find the length of the hypotenuse. Round to one decimal place.`, answer: `\\(${formatAnswer(hyp)}\\)`, checkAnswer: formatAnswer(hyp) }; },
    () => { const hyp = getRandomInt(10,20); const leg = hyp / Math.sqrt(2); return { problem: `In a 45-45-90 triangle, the hypotenuse is \\(${hyp}\\). Find the length of a leg. Round to one decimal place.`, answer: `\\(${formatAnswer(leg)}\\)`, checkAnswer: formatAnswer(leg) }; },
    () => { const short = getRandomInt(4,9); const long = short * Math.sqrt(3); const hyp = 2 * short; return { problem: `In a 30-60-90 triangle, the shorter leg is \\(${short}\\). What is the length of the longer leg?`, answer: `\\(${formatAnswer(long)}\\)`, checkAnswer: formatAnswer(long) }; },
    () => { const short = getRandomInt(4,9); const long = short * Math.sqrt(3); const hyp = 2 * short; return { problem: `In a 30-60-90 triangle, the shorter leg is \\(${short}\\). What is the length of the hypotenuse?`, answer: `\\(${hyp}\\)`, checkAnswer: hyp.toString() }; },
    () => { const hyp = getRandomInt(10,20); const short = hyp / 2; const long = short * Math.sqrt(3); return { problem: `In a 30-60-90 triangle, the hypotenuse is \\(${hyp}\\). What is the length of the shorter leg?`, answer: `\\(${short}\\)`, checkAnswer: short.toString() }; },
    () => { const t = pythagoreanTriples[getRandomInt(0,3)]; const opp=t[0], adj=t[1], hyp=t[2]; const {graphId, graphFunction} = createRightTriangleGraph(opp,adj); return { problem: `In the given right triangle with angle A at the origin, find \\(\\sin(A)\\).`, answer: `\\(\\frac{${opp}}{${hyp}}\\)` , checkAnswer: `${opp}/${hyp}`, graphId, graphFunction}; },
    () => { const t = pythagoreanTriples[getRandomInt(0,3)]; const opp=t[0], adj=t[1], hyp=t[2]; const {graphId, graphFunction} = createRightTriangleGraph(opp,adj); return { problem: `In the given right triangle with angle A at the origin, find \\(\\cos(A)\\).`, answer: `\\(\\frac{${adj}}{${hyp}}\\)` , checkAnswer: `${adj}/${hyp}`, graphId, graphFunction}; },
    () => { const t = pythagoreanTriples[getRandomInt(0,3)]; const opp=t[0], adj=t[1], hyp=t[2]; const {graphId, graphFunction} = createRightTriangleGraph(opp,adj); return { problem: `In the given right triangle with angle A at the origin, find \\(\\tan(A)\\).`, answer: `\\(\\frac{${opp}}{${adj}}\\)` , checkAnswer: `${opp}/${adj}`, graphId, graphFunction}; },
    () => { const angle = getRandomInt(20, 70); const hyp = getRandomInt(10, 20); const opp = hyp * Math.sin(angle * Math.PI / 180); return { problem: `In a right triangle, an angle is \\(${angle}^{\\circ}\\) and the hypotenuse is \\(${hyp}\\). Find the length of the opposite side. Round to one decimal place.`, answer: `\\(${formatAnswer(opp)}\\)`, checkAnswer: formatAnswer(opp) }; },
    () => { const angle = getRandomInt(20, 70); const hyp = getRandomInt(10, 20); const adj = hyp * Math.cos(angle * Math.PI / 180); return { problem: `In a right triangle, an angle is \\(${angle}^{\\circ}\\) and the hypotenuse is \\(${hyp}\\). Find the length of the adjacent side. Round to one decimal place.`, answer: `\\(${formatAnswer(adj)}\\)`, checkAnswer: formatAnswer(adj) }; },
    () => { const angle = getRandomInt(20, 70); const adj = getRandomInt(5, 15); const opp = adj * Math.tan(angle * Math.PI / 180); return { problem: `In a right triangle, an angle is \\(${angle}^{\\circ}\\) and the adjacent side is \\(${adj}\\). Find the length of the opposite side. Round to one decimal place.`, answer: `\\(${formatAnswer(opp)}\\)`, checkAnswer: formatAnswer(opp) }; },
    () => { const t = pythagoreanTriples[getRandomInt(0,3)]; const opp=t[0], hyp=t[2]; const angle = Math.asin(opp/hyp) * (180/Math.PI); return { problem: `In a right triangle, the opposite side is \\(${opp}\\) and the hypotenuse is \\(${hyp}\\). Find the measure of the angle. Round to the nearest degree.`, answer: `\\(${formatAnswer(angle,0)}^{\\circ}\\)`, checkAnswer: formatAnswer(angle,0) }; },
    () => { const t = pythagoreanTriples[getRandomInt(0,3)]; const adj=t[1], hyp=t[2]; const angle = Math.acos(adj/hyp) * (180/Math.PI); return { problem: `In a right triangle, the adjacent side is \\(${adj}\\) and the hypotenuse is \\(${hyp}\\). Find the measure of the angle. Round to the nearest degree.`, answer: `\\(${formatAnswer(angle,0)}^{\\circ}\\)`, checkAnswer: formatAnswer(angle,0) }; },
    () => { const t = pythagoreanTriples[getRandomInt(0,3)]; const opp=t[0], adj=t[1]; const angle = Math.atan(opp/adj) * (180/Math.PI); return { problem: `In a right triangle, the opposite side is \\(${opp}\\) and the adjacent side is \\(${adj}\\). Find the measure of the angle. Round to the nearest degree.`, answer: `\\(${formatAnswer(angle,0)}^{\\circ}\\)`, checkAnswer: formatAnswer(angle,0) }; },
    () => { return { problem: `Which trigonometric ratio represents Opposite / Hypotenuse? (1=sin, 2=cos, 3=tan)`, answer: `1`, checkAnswer: "1" }; },
    () => { return { problem: `Which trigonometric ratio represents Adjacent / Hypotenuse? (1=sin, 2=cos, 3=tan)`, answer: `2`, checkAnswer: "2" }; },
];
function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Remember SOH CAH TOA: Sin(Opp/Hyp), Cos(Adj/Hyp), Tan(Opp/Adj)." };
}
export const module = { topicId: '10M8', topicName: 'Right Triangles & Trigonometry', generateProblem: generate };

