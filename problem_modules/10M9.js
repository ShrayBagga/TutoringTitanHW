// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function formatAnswer(val, p=1) { return parseFloat(val.toFixed(p)).toString().replace(/\.0$/, ''); }

// --- Graphing Helper ---
function createCircleGraph(radius, elements = {}) {
    const graphId = `g-${Date.now()}`;
    const graphFunction = {
        functions: [
            { type: 'point', x: 0, y: 0, options: { name: 'O', size: 1, color: 'black' } },
            { type: 'expression', expression: `x^2+y^2=${radius**2}`, options: { strokeColor: 'blue' } }
        ],
        boundingbox: [-radius-2, radius+2, radius+2, -radius-2],
        labels: []
    };

    if (elements.radius) {
        const angle = getRandomInt(0, 360) * Math.PI / 180;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        graphFunction.functions.push({ type: 'line', point1: [0,0], point2: [x,y] });
        graphFunction.labels.push({ x: x/2, y: y/2, text: `r=${radius}` });
    }
    if (elements.chord) {
        const a1 = getRandomInt(0, 120) * Math.PI / 180;
        const a2 = getRandomInt(180, 270) * Math.PI / 180;
        const x1 = radius * Math.cos(a1); const y1 = radius * Math.sin(a1);
        const x2 = radius * Math.cos(a2); const y2 = radius * Math.sin(a2);
        graphFunction.functions.push({ type: 'line', point1: [x1,y1], point2: [x2,y2], options: {strokeColor:'green'} });
    }
    if (elements.tangent) {
        const x_tan = radius; const y_tan = 0;
        graphFunction.functions.push({ type: 'line', point1: [x_tan, -radius*1.5], point2: [x_tan, radius*1.5], options: {strokeColor:'red'} });
    }
    if (elements.inscribedAngle) {
        const arc = elements.arcMeasure || getRandomInt(60, 120);
        const angle = arc / 2;
        // This is a visual representation, not a precise geometric construction
        const p1_angle = 180 * Math.PI / 180; // ( -r, 0 )
        const p2_angle = (180 - arc) * Math.PI / 180;
        graphFunction.functions.push({ type: 'line', point1: [-radius, 0], point2: [radius * Math.cos(p2_angle), radius * Math.sin(p2_angle)], options: {strokeColor: 'purple'} });
        graphFunction.functions.push({ type: 'line', point1: [-radius, 0], point2: [radius, 0], options: {strokeColor: 'purple'} });
        graphFunction.labels.push({ x: -radius + 1, y: 1, text: `${angle}°` });
    }

    return { graphId, graphFunction };
}

const problemGenerators = [
    () => { const r = getRandomInt(5, 15); const d = r * 2; return { problem: `A circle has a radius of \\(${r}\\). What is its diameter?`, answer: `\\(${d}\\)`, checkAnswer: d.toString() }; },
    () => { const d = getRandomInt(10, 30); const r = d / 2; return { problem: `A circle has a diameter of \\(${d}\\). What is its radius?`, answer: `\\(${r}\\)`, checkAnswer: r.toString() }; },
    () => { const r = getRandomInt(4, 12); const circ = 2 * Math.PI * r; const {graphId, graphFunction} = createCircleGraph(r, {radius: true}); return { problem: `Find the circumference of a circle with radius \\(${r}\\). (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(circ)}\\)`, checkAnswer: formatAnswer(circ), graphId, graphFunction }; },
    () => { const r = getRandomInt(4, 12); const area = Math.PI * r**2; const {graphId, graphFunction} = createCircleGraph(r, {radius: true}); return { problem: `Find the area of a circle with radius \\(${r}\\). (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(area)}\\)`, checkAnswer: formatAnswer(area), graphId, graphFunction }; },
    () => { const arc = getRandomInt(40, 150); return { problem: `The measure of a central angle is \\(${arc}^{\\circ}\\). What is the measure of its intercepted arc?`, answer: `\\(${arc}^{\\circ}\\)`, checkAnswer: arc.toString() }; },
    () => { const arc = getRandomInt(60, 140); const angle = arc / 2; const {graphId, graphFunction} = createCircleGraph(8, {inscribedAngle: true, arcMeasure: arc}); return { problem: `An inscribed angle intercepts an arc of \\(${arc}^{\\circ}\\). What is the measure of the angle?`, answer: `\\(${angle}^{\\circ}\\)`, checkAnswer: angle.toString(), graphId, graphFunction }; },
    () => { const angle = getRandomInt(25, 55); const arc = angle * 2; const {graphId, graphFunction} = createCircleGraph(8, {inscribedAngle: true, arcMeasure: arc}); return { problem: `An inscribed angle measures \\(${angle}^{\\circ}\\). What is the measure of its intercepted arc?`, answer: `\\(${arc}^{\\circ}\\)`, checkAnswer: arc.toString(), graphId, graphFunction }; },
    () => { const r = getRandomInt(8, 15); return { problem: `Write the equation of a circle centered at the origin with a radius of \\(${r}\\).`, answer: `\\(x^2 + y^2 = ${r**2}\\)`, checkAnswer: `x^2+y^2=${r**2}` }; },
    () => { const r_sq = [25, 36, 49, 64, 81, 100][getRandomInt(0,5)]; const r = Math.sqrt(r_sq); return { problem: `What is the radius of the circle defined by the equation \\(x^2 + y^2 = ${r_sq}\\)?`, answer: `\\(${r}\\)`, checkAnswer: r.toString() }; },
    () => { const r = 10; const angle = 90; const length = (angle / 360) * (2 * Math.PI * r); return { problem: `In a circle with radius \\(${r}\\), find the length of an arc with a measure of \\(${angle}^{\\circ}\\). (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(length)}\\)`, checkAnswer: formatAnswer(length) }; },
    () => { const r = getRandomInt(6, 12); const angle = getRandomInt(45, 120); const length = (angle / 360) * (2 * Math.PI * r); return { problem: `Find the length of an arc with measure \\(${angle}^{\\circ}\\) in a circle with radius \\(${r}\\). (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(length)}\\)`, checkAnswer: formatAnswer(length) }; },
    () => { const r = 10; const angle = 60; const area = (angle / 360) * (Math.PI * r**2); return { problem: `In a circle with radius \\(${r}\\), find the area of a sector with a central angle of \\(${angle}^{\\circ}\\). (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(area)}\\)`, checkAnswer: formatAnswer(area) }; },
    () => { const r = getRandomInt(5, 10); const angle = getRandomInt(90, 180); const area = (angle / 360) * (Math.PI * r**2); return { problem: `Find the area of a sector with a \\(${angle}^{\\circ}\\) arc in a circle with radius \\(${r}\\). (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(area)}\\)`, checkAnswer: formatAnswer(area) }; },
    () => { return { problem: `What is the measure of a semicircle arc?`, answer: `\\(180^{\\circ}\\)`, checkAnswer: "180" }; },
    () => { const r = getRandomInt(5,10); const {graphId, graphFunction} = createCircleGraph(r, {tangent: true}); return { problem: `A line is tangent to a circle with radius \\(${r}\\). What is the measure of the angle formed by the tangent line and the radius at the point of tangency?`, answer: `\\(90^{\\circ}\\)`, checkAnswer: "90", graphId, graphFunction }; },
    () => { const d = 10; const dist = getRandomInt(3,4); const chord_half = Math.sqrt((d/2)**2 - dist**2); return { problem: `A chord is \\(${dist}\\) units from the center of a circle with a diameter of \\(${d}\\). Find the length of the chord.`, answer: `\\(${formatAnswer(2*chord_half)}\\)`, checkAnswer: formatAnswer(2*chord_half) }; },
    () => { const angle = 180; return { problem: `An angle inscribed in a semicircle has a measure of how many degrees?`, answer: `\\(90^{\\circ}\\)`, checkAnswer: "90" }; },
    () => { const {graphId, graphFunction} = createCircleGraph(8, {chord: true}); return { problem: `If two chords in a circle are congruent, what is true about their intercepted arcs? (1=arcs are congruent, 2=arcs are supplementary)`, answer: `1`, checkAnswer: "1", graphId, graphFunction }; },
    () => { const r = getRandomInt(3,5), h=getRandomInt(r+1, r+5), k=0; return { problem: `Write the equation of a circle with center (\\(${h},${k}\\)) and radius \\(${r}\\).`, answer: `\\((x-${h})^2 + y^2 = ${r**2}\\)`, checkAnswer: `(x-${h})^2+y^2=${r**2}` }; },
    () => { const r = getRandomInt(4, 8); const c = 2 * Math.PI * r; const a = Math.PI * r**2; return { problem: `The circumference of a circle is \\(${formatAnswer(c)}\\). Find its area.`, answer: `\\(${formatAnswer(a)}\\)`, checkAnswer: formatAnswer(a) }; },
];
function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "An inscribed angle is half its intercepted arc. A central angle is equal to its intercepted arc." };
}
export const module = { topicId: '10M9', topicName: 'Circles', generateProblem: generate };

