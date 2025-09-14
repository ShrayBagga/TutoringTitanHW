// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function formatAnswer(val, p=1) { return parseFloat(val.toFixed(p)).toString().replace(/\.0$/, ''); }

// --- Graphing Helper ---
function createQuadGraph(vertices) {
    const graphId = `g-${Date.now()}`;
    const [A, B, C, D] = vertices;
    const graphFunction = {
        functions: [
            { type: 'point', x: A[0], y: A[1], options: { name: 'A', size: 2 } },
            { type: 'point', x: B[0], y: B[1], options: { name: 'B', size: 2 } },
            { type: 'point', x: C[0], y: C[1], options: { name: 'C', size: 2 } },
            { type: 'point', x: D[0], y: D[1], options: { name: 'D', size: 2 } }
        ],
        boundingbox: [-12, 12, 12, -12]
    };
    graphFunction.functions.push({ type: 'line', point1: A, point2: B });
    graphFunction.functions.push({ type: 'line', point1: B, point2: C });
    graphFunction.functions.push({ type: 'line', point1: C, point2: D });
    graphFunction.functions.push({ type: 'line', point1: D, point2: A });
    return { graphId, graphFunction };
}

const problemGenerators = [
    () => { const a1 = getRandomInt(80, 100); const a2 = getRandomInt(70, 90); const a3 = getRandomInt(100, 110); const a4 = 360 - a1 - a2 - a3; return { problem: `The angles of a quadrilateral measure \\(${a1}^{\\circ}, ${a2}^{\\circ}, ${a3}^{\\circ}\\), and \\(x^{\\circ}\\). Find \\(x\\).`, answer: `\\(${a4}\\)`, checkAnswer: a4.toString() }; },
    () => { const angle = getRandomInt(60, 110); return { problem: `One angle of a parallelogram is \\(${angle}^{\\circ}\\). What is the measure of its consecutive angle?`, answer: `\\(${180-angle}^{\\circ}\\)`, checkAnswer: (180-angle).toString() }; },
    () => { const angle = getRandomInt(70, 120); return { problem: `One angle of a parallelogram is \\(${angle}^{\\circ}\\). What is the measure of its opposite angle?`, answer: `\\(${angle}^{\\circ}\\)`, checkAnswer: angle.toString() }; },
    () => { const side1 = getRandomInt(10, 20); const side2 = getRandomInt(8, 15); const perimeter = 2 * (side1 + side2); return { problem: `The adjacent sides of a parallelogram are \\(${side1}\\) cm and \\(${side2}\\) cm. What is its perimeter?`, answer: `\\(${perimeter}\\) cm`, checkAnswer: perimeter.toString() }; },
    () => { const x = getRandomInt(3, 8); return { problem: `The opposite sides of a parallelogram are \\(2x + 1\\) and \\(${2*x+1}\\). Find the value of x.`, answer: `\\(${x}\\)`, checkAnswer: x.toString() }; },
    () => { const d1_part = getRandomInt(5, 10); return { problem: `In parallelogram ABCD, the diagonals intersect at E. If \\(AE = ${d1_part}\\), what is the length of \\(AC\\)?`, answer: `\\(${2*d1_part}\\)`, checkAnswer: (2*d1_part).toString(), hint: "The diagonals of a parallelogram bisect each other." }; },
    () => { const length = getRandomInt(10, 20); const width = getRandomInt(5, 9); const area = length * width; return { problem: `Find the area of a rectangle with a length of \\(${length}\\) and a width of \\(${width}\\).`, answer: `\\(${area}\\)`, checkAnswer: area.toString() }; },
    () => { const s = getRandomInt(6, 15); const diagonal = s * Math.sqrt(2); return { problem: `What is the length of the diagonal of a square with a side length of \\(${s}\\)? Round to one decimal place.`, answer: `\\(${formatAnswer(diagonal)}\\)`, checkAnswer: formatAnswer(diagonal) }; },
    () => { const d1 = getRandomInt(10, 20); const d2 = getRandomInt(8, 18); const area = 0.5 * d1 * d2; return { problem: `The diagonals of a rhombus are \\(${d1}\\) and \\(${d2}\\). What is its area?`, answer: `\\(${area}\\)`, checkAnswer: area.toString() }; },
    () => { const x = getRandomInt(20, 30); return { problem: `In a rhombus, consecutive angles are \\((2x)^{\\circ}\\) and \\((3x)^{\\circ}\\). What is the value of x?`, answer: `36`, checkAnswer: "36" }; },
    () => { const b1 = getRandomInt(10, 15); const b2 = getRandomInt(16, 25); const midsegment = (b1 + b2) / 2; return { problem: `The bases of a trapezoid are \\(${b1}\\) and \\(${b2}\\). What is the length of the midsegment?`, answer: `\\(${midsegment}\\)`, checkAnswer: midsegment.toString() }; },
    () => { const midsegment = getRandomInt(12, 20); const b1 = getRandomInt(8, 11); const b2 = 2 * midsegment - b1; return { problem: `The midsegment of a trapezoid is \\(${midsegment}\\) and one base is \\(${b1}\\). Find the length of the other base.`, answer: `\\(${b2}\\)`, checkAnswer: b2.toString() }; },
    () => { const angle = getRandomInt(60, 80); return { problem: `In an isosceles trapezoid, one of the lower base angles is \\(${angle}^{\\circ}\\). What is the measure of the other lower base angle?`, answer: `\\(${angle}^{\\circ}\\)`, checkAnswer: angle.toString() }; },
    () => { const angle = getRandomInt(100, 120); return { problem: `In an isosceles trapezoid, one of the upper base angles is \\(${angle}^{\\circ}\\). What is the measure of one of the lower base angles?`, answer: `\\(${180-angle}^{\\circ}\\)`, checkAnswer: (180-angle).toString() }; },
    () => { const s1 = 6; const s2 = 8; const perimeter = 30; const side = (perimeter - s1 - s2) / 2; return { problem: `The perimeter of a kite is \\(${perimeter}\\). One pair of congruent sides has length \\(${s1}\\). Find the length of one of the other congruent sides.`, answer: `\\(${side}\\)`, checkAnswer: side.toString() }; },
    () => { const vertices = [[0,0], [getRandomInt(5,8), getRandomInt(2,4)], [getRandomInt(7,10), getRandomInt(6,9)], [getRandomInt(1,3), getRandomInt(4,7)]]; const { graphId, graphFunction } = createQuadGraph(vertices); return { problem: `What is the name for a quadrilateral with four sides? (Enter the number of vertices)`, answer: `4`, checkAnswer: "4", graphId, graphFunction }; },
    () => { const w = getRandomInt(3,5), l = w + getRandomInt(2,4); const vertices = [[0,0], [l,0], [l,w], [0,w]]; const { graphId, graphFunction } = createQuadGraph(vertices); const slope = (w-0)/(l-0); return { problem: `A rectangle has vertices at (0,0), (${l},0), (${l},${w}), and (0,${w}). What is the slope of its diagonal from (0,0) to (${l},${w})?`, answer: `\\(\\frac{${w}}{${l}}\\)` , checkAnswer: `${w}/${l}`, graphId, graphFunction}; },
    () => { const s = getRandomInt(4, 7); const vertices = [[0,s], [s,0], [0,-s], [-s,0]]; const { graphId, graphFunction } = createQuadGraph(vertices); const d = 2*s; return { problem: `A square is centered at the origin with vertices at (0,${s}), (${s},0), (0,-${s}), and (-${s},0). What is the length of its diagonal?`, answer: `\\(${d}\\)`, checkAnswer: d.toString(), graphId, graphFunction }; },
    () => { const b = getRandomInt(8, 12); const h = getRandomInt(5, 9); const area = b*h; return { problem: `A parallelogram has a base of \\(${b}\\) and a height of \\(${h}\\). Find its area.`, answer: `\\(${area}\\)`, checkAnswer: area.toString() }; },
    () => { return { problem: `A quadrilateral has four equal sides and four right angles. What is its classification number? (1=Rhombus, 2=Rectangle, 3=Square)`, answer: `3`, checkAnswer: "3" }; },
];
function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Know the properties of parallelograms, rectangles, rhombuses, squares, and trapezoids." };
}
export const module = { topicId: '10M6', topicName: 'Quadrilaterals', generateProblem: generate };

