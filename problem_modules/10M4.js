// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

// --- Graphing Helper ---
function createTriangleGraph(vertices) {
    const graphId = `g-${Date.now()}`;
    const graphFunction = {
        functions: [
            { type: 'point', x: vertices[0][0], y: vertices[0][1], options: { name: 'A', size: 2 } },
            { type: 'point', x: vertices[1][0], y: vertices[1][1], options: { name: 'B', size: 2 } },
            { type: 'point', x: vertices[2][0], y: vertices[2][1], options: { name: 'C', size: 2 } }
        ],
        boundingbox: [-10, 10, 10, -10] // A standard bounding box
    };
    // Add lines to connect the points
    graphFunction.functions.push({ type: 'line', point1: vertices[0], point2: vertices[1] });
    graphFunction.functions.push({ type: 'line', point1: vertices[1], point2: vertices[2] });
    graphFunction.functions.push({ type: 'line', point1: vertices[2], point2: vertices[0] });

    return { graphId, graphFunction };
}

const problemGenerators = [
    () => { const a1 = getRandomInt(50, 70); const a2 = getRandomInt(40, 60); const a3 = 180 - a1 - a2; return { problem: `Two angles in a triangle measure \\(${a1}^{\\circ}\\) and \\(${a2}^{\\circ}\\). Find the measure of the third angle.`, answer: `\\(${a3}^{\\circ}\\)`, checkAnswer: a3.toString() }; },
    () => { const s1 = getRandomInt(5, 8); const s2 = s1; const s3 = getRandomInt(3, s1-1); return { problem: `A triangle has side lengths \\(${s1}, ${s2}, ${s3}\\). Classify it by its sides. (1=scalene, 2=isosceles, 3=equilateral)`, answer: `2`, checkAnswer: "2" }; },
    () => { const s1 = getRandomInt(5, 8); const s2 = s1 + getRandomInt(1,3); const s3 = s2 + getRandomInt(1,3); return { problem: `A triangle has side lengths \\(${s1}, ${s2}, ${s3}\\). Classify it by its sides. (1=scalene, 2=isosceles, 3=equilateral)`, answer: `1`, checkAnswer: "1" }; },
    () => { const angle = getRandomInt(40, 50); const exterior = 180 - angle; return { problem: `The two remote interior angles of a triangle are \\(${angle}^{\\circ}\\) and \\(${angle+10}^{\\circ}\\). What is the measure of the exterior angle?`, answer: `\\(${2*angle+10}^{\\circ}\\)`, checkAnswer: (2*angle+10).toString(), hint: "The exterior angle is the sum of the two remote interior angles." }; },
    () => { const x = getRandomInt(10, 20); const angleA = 3*x; const angleB = 2*x; const angleC = 180-5*x; return { problem: `The angles of a triangle are \\(3x\\), \\(2x\\), and \\(${angleC}\\). If \\(x=${x}\\), is the triangle acute, right, or obtuse? (1=acute, 2=right, 3=obtuse)`, answer: `3`, checkAnswer: "3" }; },
    () => { const { graphId, graphFunction } = createTriangleGraph([[0,0], [5,0], [2.5,4.33]]); return { problem: `In the diagram, \\(\\triangle ABC \\cong \\triangle DEF\\). If \\(AB = 5\\), what is the length of \\(DE\\)?`, answer: `5`, checkAnswer: "5", graphId, graphFunction }; },
    () => { const { graphId, graphFunction } = createTriangleGraph([[0,0], [6,0], [3,5]]); return { problem: `In the diagram, \\(\\triangle ABC \\cong \\triangle DEF\\). If \\(m\\angle B = 60^{\\circ}\\), what is \\(m\\angle E\\)?`, answer: `\\(60^{\\circ}\\)`, checkAnswer: "60", graphId, graphFunction }; },
    () => { const x = getRandomInt(5, 10); return { problem: `In \\(\\triangle ABC \\cong \\triangle XYZ\\), \\(AB = 2x - 4\\) and \\(XY = ${2*x-4}\\). Find the value of x.`, answer: `\\(${x}\\)`, checkAnswer: x.toString() }; },
    () => { const x = getRandomInt(10, 20); return { problem: `In \\(\\triangle CAT \\cong \\triangle DOG\\), \\(m\\angle A = 5x\\) and \\(m\\angle O = ${5*x}\\). Find the value of x.`, answer: `\\(${x}\\)`, checkAnswer: x.toString() }; },
    () => { return { problem: `Name the congruence postulate shown by two triangles with three corresponding sides marked as equal. (1=SSS, 2=SAS, 3=ASA, 4=AAS)`, answer: `1`, checkAnswer: "1" }; },
    () => { return { problem: `Name the congruence postulate shown by two triangles with two sides and the included angle marked as equal. (1=SSS, 2=SAS, 3=ASA, 4=AAS)`, answer: `2`, checkAnswer: "2" }; },
    () => { return { problem: `Name the congruence postulate shown by two triangles with two angles and the included side marked as equal. (1=SSS, 2=SAS, 3=ASA, 4=AAS)`, answer: `3`, checkAnswer: "3" }; },
    () => { return { problem: `Name the congruence postulate shown by two triangles with two angles and a non-included side marked as equal. (1=SSS, 2=SAS, 3=ASA, 4=AAS)`, answer: `4`, checkAnswer: "4" }; },
    () => { const baseAngle = getRandomInt(50, 70); const vertexAngle = 180 - 2*baseAngle; return { problem: `In isosceles \\(\\triangle ABC\\) with base AC, if \\(m\\angle A = ${baseAngle}^{\\circ}\\), what is \\(m\\angle B\\)?`, answer: `\\(${vertexAngle}^{\\circ}\\)`, checkAnswer: vertexAngle.toString() }; },
    () => { const vertexAngle = getRandomInt(40, 80); const baseAngle = (180 - vertexAngle)/2; return { problem: `In isosceles \\(\\triangle ABC\\) with vertex angle B, if \\(m\\angle B = ${vertexAngle}^{\\circ}\\), what is \\(m\\angle C\\)?`, answer: `\\(${baseAngle}^{\\circ}\\)`, checkAnswer: baseAngle.toString() }; },
    () => { const x = getRandomInt(3, 7); return { problem: `In isosceles \\(\\triangle XYZ\\), leg \\(XY = 2x+1\\) and leg \\(YZ = ${2*x+1}\\). Find x.`, answer: `\\(${x}\\)`, checkAnswer: x.toString() }; },
    () => { return { problem: `What does CPCTC stand for?`, answer: `Corresponding Parts of Congruent Triangles are Congruent`, checkAnswer: "Corresponding Parts of Congruent Triangles are Congruent" }; },
    () => { const { graphId, graphFunction } = createTriangleGraph([[0,0], [8,0], [4,6]]); return { problem: `Given \\(\\triangle ABC\\) is congruent to \\(\\triangle DEF\\) in the diagram, and \\(DF=7\\), what is the length of \\(AC\\)?`, answer: `7`, checkAnswer: "7", graphId, graphFunction }; },
    () => { const leg = getRandomInt(5, 9); return { problem: `In an isosceles right triangle, one leg is \\(${leg}\\) cm long. What is the length of the other leg?`, answer: `\\(${leg}\\) cm`, checkAnswer: leg.toString() }; },
    () => { return { problem: `If \\(\\triangle JKL \\cong \\triangle MNO\\), which angle corresponds to \\(\\angle L\\)? (Enter the single letter)`, answer: `O`, checkAnswer: "O" }; },
];
function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Remember SSS, SAS, ASA, AAS congruence postulates. The sum of angles in a triangle is 180." };
}
export const module = { topicId: '10M4', topicName: 'Triangles & Congruence', generateProblem: generate };