// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

// --- Graphing Helper ---
function createTransformationGraph(preimage, image, labels = ['A', 'B', 'C']) {
    const graphId = `g-${Date.now()}`;
    const [pA, pB, pC] = preimage;
    const [iA, iB, iC] = image;

    const graphFunction = {
        functions: [
            // Preimage Points & Polygon
            { type: 'polygon', vertices: preimage, options: { fillColor: 'blue', fillOpacity: 0.2, borders: { strokeColor: 'blue' } } },
            // Image Points & Polygon
            { type: 'polygon', vertices: image, options: { fillColor: 'red', fillOpacity: 0.2, borders: { strokeColor: 'red' } } },
        ],
        boundingbox: [-10, 10, 10, -10]
    };
    
    return { graphId, graphFunction };
}

const problemGenerators = [
    () => { const x=getRandomInt(1,5), y=getRandomInt(1,5), tx=getRandomInt(2,5), ty=getRandomInt(2,5); const pre=[[x,y],[x+1,y],[x,y+1]], img=pre.map(p=>[p[0]+tx, p[1]+ty]); const {graphId, graphFunction} = createTransformationGraph(pre, img); return { problem: `Translate the point (\\(${x},${y}\\)) by \\(${tx}\\) units to the right and \\(${ty}\\) units up.`, answer: `(\\( ${x+tx}, ${y+ty} \\))`, checkAnswer: `${x+tx},${y+ty}`, graphId, graphFunction }; },
    () => { const x=getRandomInt(2,6), y=getRandomInt(2,6); const pre=[[x,y],[x+1,y],[x,y+1]], img=pre.map(p=>[p[0],-p[1]]); const {graphId, graphFunction} = createTransformationGraph(pre, img); return { problem: `Reflect the point (\\(${x},${y}\\)) across the x-axis.`, answer: `(\\( ${x}, ${-y} \\))`, checkAnswer: `${x},${-y}`, graphId, graphFunction }; },
    () => { const x=getRandomInt(2,6), y=getRandomInt(2,6); const pre=[[x,y],[x+1,y],[x,y+1]], img=pre.map(p=>[-p[0],p[1]]); const {graphId, graphFunction} = createTransformationGraph(pre, img); return { problem: `Reflect the point (\\(${x},${y}\\)) across the y-axis.`, answer: `(\\( ${-x}, ${y} \\))`, checkAnswer: `${-x},${y}`, graphId, graphFunction }; },
    () => { const x=getRandomInt(2,5), y=getRandomInt(3,6); const pre=[[x,y],[x+1,y],[x,y+1]], img=pre.map(p=>[-p[1],p[0]]); const {graphId, graphFunction} = createTransformationGraph(pre, img); return { problem: `Rotate the point (\\(${x},${y}\\)) 90 degrees counterclockwise about the origin.`, answer: `(\\( ${-y}, ${x} \\))`, checkAnswer: `${-y},${x}`, graphId, graphFunction }; },
    () => { const x=getRandomInt(2,5), y=getRandomInt(3,6); const pre=[[x,y],[x+1,y],[x,y+1]], img=pre.map(p=>[-p[0],-p[1]]); const {graphId, graphFunction} = createTransformationGraph(pre, img); return { problem: `Rotate the point (\\(${x},${y}\\)) 180 degrees about the origin.`, answer: `(\\( ${-x}, ${-y} \\))`, checkAnswer: `${-x},${-y}`, graphId, graphFunction }; },
    () => { const x=getRandomInt(1,3), y=getRandomInt(1,3); const sf=getRandomInt(2,3); const pre=[[x,y],[x+1,y],[x,y+1]], img=pre.map(p=>[p[0]*sf,p[1]*sf]); const {graphId, graphFunction} = createTransformationGraph(pre, img); return { problem: `Dilate the point (\\(${x},${y}\\)) by a scale factor of \\(${sf}\\) from the origin.`, answer: `(\\( ${x*sf}, ${y*sf} \\))`, checkAnswer: `${x*sf},${y*sf}`, graphId, graphFunction }; },
    () => { return { problem: `Which transformation changes the size of a figure?`, answer: `Dilation`, checkAnswer: "Dilation" }; },
    () => { return { problem: `Which transformations are rigid (preserve size and shape)?`, answer: `Translation, rotation, and reflection.`, checkAnswer: "Translation, rotation, reflection" }; },
    () => { const p='(3, -4)'; const a='(3, 4)'; return { problem: `The point ${p} is reflected across the x-axis. What is the new point?`, answer: `\\(${a}\\)`, checkAnswer: "3,4" }; },
    () => { const p='(5, 2)'; const a='(-5, 2)'; return { problem: `The point ${p} is reflected across the y-axis. What is the new point?`, answer: `\\(${a}\\)`, checkAnswer: "-5,2" }; },
    () => { const v1='(1,1)', v2='(3,1)', v3='(1,4)'; const tv1='(2,3)', tv2='(4,3)', tv3='(2,6)'; return { problem: `A triangle with vertices ${v1}, ${v2}, ${v3} is translated 1 unit right and 2 units up. What are the new vertices?`, answer: `${tv1}, ${tv2}, ${tv3}`, checkAnswer: "(2,3),(4,3),(2,6)" }; },
    () => { const sf=0.5; const p='(8,10)'; const a='(4,5)'; return { problem: `Dilate the point ${p} by a scale factor of \\(${sf}\\).`, answer: `\\(${a}\\)`, checkAnswer: "4,5" }; },
    () => { return { problem: `A figure is translated left 5 and down 2. Describe the translation rule.`, answer: `\\((x, y) \\rightarrow (x-5, y-2)\\)`, checkAnswer: "(x-5, y-2)" }; },
    () => { return { problem: `What is the rule for a 90-degree clockwise rotation?`, answer: `\\((x, y) \\rightarrow (y, -x)\\)`, checkAnswer: "(y, -x)" }; },
    () => { const p='(2,3)'; const p270='(3,-2)'; return { problem: `A point at ${p} is rotated 270 degrees counterclockwise. What are its new coordinates?`, answer: `\\(${p270}\\)`, checkAnswer: "3,-2" }; },
    () => { const p1='A(1,2)', p2='B(3,4)'; const rp1='A\'(1,-2)', rp2='B\'(3,-4)'; return { problem: `A line segment with endpoints ${p1} and ${p2} is reflected across the x-axis. What are the new endpoints?`, answer: `${rp1} and ${rp2}`, checkAnswer: "(1,-2),(3,-4)" }; },
    () => { const sf=3; return { problem: `If a figure is dilated by a scale factor of \\(${sf}\\), its perimeter is multiplied by what number?`, answer: `\\(${sf}\\)`, checkAnswer: sf.toString() }; },
    () => { const sf=3; return { problem: `If a figure is dilated by a scale factor of \\(${sf}\\), its area is multiplied by what number?`, answer: `\\(${sf*sf}\\)`, checkAnswer: (sf*sf).toString() }; },
    () => { const shape="square"; const p="(-2,-3)"; return { problem: `A ${shape} is rotated 180 degrees. If one vertex was at ${p}, where is its new position?`, answer: `(2,3)`, checkAnswer: "2,3" }; },
    () => { return { problem: `A sequence of transformations is performed: a reflection over the y-axis, then a translation up 2 units. Write the rule.`, answer: `\\((x,y) \\rightarrow (-x, y+2)\\)`, checkAnswer: "(-x, y+2)" }; },
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Memorize the rules for each transformation on a coordinate (x,y)." };
}

export const module = {
    topicId: '8M8',
    topicName: 'Transformations',
    generateProblem: generate
};