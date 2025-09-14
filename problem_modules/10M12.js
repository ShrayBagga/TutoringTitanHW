// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

// --- Graphing Helper ---
function createTransformationGraph(preimage, image, labels = ['A', 'B', 'C']) {
    const graphId = `g-${Date.now()}`;
    const [pA, pB, pC] = preimage;
    const [iA, iB, iC] = image;

    const graphFunction = {
        functions: [
            // Preimage Points
            { type: 'point', x: pA[0], y: pA[1], options: { name: labels[0], size: 2, color: 'blue' } },
            { type: 'point', x: pB[0], y: pB[1], options: { name: labels[1], size: 2, color: 'blue' } },
            { type: 'point', x: pC[0], y: pC[1], options: { name: labels[2], size: 2, color: 'blue' } },
            // Image Points
            { type: 'point', x: iA[0], y: iA[1], options: { name: `${labels[0]}'`, size: 2, color: 'red' } },
            { type: 'point', x: iB[0], y: iB[1], options: { name: `${labels[1]}'`, size: 2, color: 'red' } },
            { type: 'point', x: iC[0], y: iC[1], options: { name: `${labels[2]}'`, size: 2, color: 'red' } },
        ],
        boundingbox: [-10, 10, 10, -10]
    };
    // Preimage Polygon
    graphFunction.functions.push({ type: 'polygon', vertices: preimage, options: { fillColor: 'blue', fillOpacity: 0.2, borders: { strokeColor: 'blue' } } });
    // Image Polygon
    graphFunction.functions.push({ type: 'polygon', vertices: image, options: { fillColor: 'red', fillOpacity: 0.2, borders: { strokeColor: 'red' } } });
    
    return { graphId, graphFunction };
}


const problemGenerators = [
    () => { const x=getRandomInt(1,5), y=getRandomInt(1,5), tx=getRandomInt(2,5), ty=-getRandomInt(2,5); const pre=[[x,y],[x+2,y],[x,y+2]], img=pre.map(p=>[p[0]+tx, p[1]+ty]); const {graphId, graphFunction} = createTransformationGraph(pre, img); return { problem: `Triangle ABC is translated to Triangle A'B'C'. If point A is (\\(${x},${y}\\)) and A' is (\\(${x+tx},${y+ty}\\)), what is the translation vector? (Enter as x,y)`, answer: `\\((${tx}, ${ty})\\)`, checkAnswer: `${tx},${ty}`, graphId, graphFunction }; },
    () => { const x=getRandomInt(2,6), y=getRandomInt(2,6); const pre=[[x,y],[x+1,y-2],[x-1,y-2]], img=pre.map(p=>[p[0], -p[1]]); const {graphId, graphFunction} = createTransformationGraph(pre, img); return { problem: `Point (\\(${x},${y}\\)) is reflected across the x-axis. What are the coordinates of the reflected point?`, answer: `(\\( ${x}, ${-y} \\))`, checkAnswer: `${x},${-y}`, graphId, graphFunction }; },
    () => { const x=getRandomInt(2,6), y=getRandomInt(2,6); const pre=[[x,y],[x+1,y-2],[x-1,y-2]], img=pre.map(p=>[-p[0], p[1]]); const {graphId, graphFunction} = createTransformationGraph(pre, img); return { problem: `Point (\\(${x},${y}\\)) is reflected across the y-axis. What are the coordinates of the reflected point?`, answer: `(\\( ${-x}, ${y} \\))`, checkAnswer: `${-x},${y}`, graphId, graphFunction }; },
    () => { const x=getRandomInt(2,5), y=getRandomInt(3,6); const pre=[[x,y],[x+2,y],[x,y-2]], img=pre.map(p=>[-p[1], p[0]]); const {graphId, graphFunction} = createTransformationGraph(pre, img); return { problem: `Point (\\(${x},${y}\\)) is rotated 90 degrees counterclockwise about the origin. What are its new coordinates?`, answer: `(\\( ${-y}, ${x} \\))`, checkAnswer: `${-y},${x}`, graphId, graphFunction }; },
    () => { const x=getRandomInt(2,5), y=getRandomInt(3,6); const pre=[[x,y],[x+2,y],[x,y-2]], img=pre.map(p=>[-p[0], -p[1]]); const {graphId, graphFunction} = createTransformationGraph(pre, img); return { problem: `Point (\\(${x},${y}\\)) is rotated 180 degrees about the origin. What are its new coordinates?`, answer: `(\\( ${-x}, ${-y} \\))`, checkAnswer: `${-x},${-y}`, graphId, graphFunction }; },
    () => { const x=getRandomInt(2,5), y=getRandomInt(3,6); const sf=getRandomInt(2,3); const pre=[[x,y],[x+1,y],[x,y-1]], img=pre.map(p=>[p[0]*sf, p[1]*sf]); const {graphId, graphFunction} = createTransformationGraph(pre, img); return { problem: `Point (\\(${x},${y}\\)) is dilated by a scale factor of \\(${sf}\\) from the origin. What are the new coordinates?`, answer: `(\\( ${x*sf}, ${y*sf} \\))`, checkAnswer: `${x*sf},${y*sf}`, graphId, graphFunction }; },
    () => { return { problem: `Which transformation changes the size of a figure? (1=translation, 2=rotation, 3=reflection, 4=dilation)`, answer: `4`, checkAnswer: "4" }; },
    () => { return { problem: `Which transformations are isometries (preserve distance)? (Enter numbers separated by commas: 1=translation, 2=rotation, 3=reflection, 4=dilation)`, answer: `1,2,3`, checkAnswer: "1,2,3" }; },
    () => { const n = getRandomInt(5,8); return { problem: `How many lines of symmetry does a regular \\(${n}\\)-gon have?`, answer: `\\(${n}\\)`, checkAnswer: n.toString() }; },
    () => { const n = getRandomInt(5,8); const angle = 360/n; return { problem: `What is the smallest angle of rotational symmetry for a regular \\(${n}\\)-gon?`, answer: `\\(${angle}^{\\circ}\\)`, checkAnswer: angle.toString() }; },
    () => { return { problem: `How many lines of symmetry does a circle have? (Enter 999 for infinite)`, answer: `999`, checkAnswer: "999" }; },
    () => { const sf = 0.5; const x=getRandomInt(6,10), y=getRandomInt(8,12); const pre=[[x,y],[x+2,y],[x,y-2]], img=pre.map(p=>[p[0]*sf, p[1]*sf]); const {graphId, graphFunction} = createTransformationGraph(pre, img); return { problem: `Dilate the point (\\(${x},${y}\\)) by a scale factor of \\(${sf}\\). What are the new coordinates?`, answer: `(\\( ${x*sf}, ${y*sf} \\))`, checkAnswer: `${x*sf},${y*sf}`, graphId, graphFunction }; },
    () => { const h=getRandomInt(-5,-2), k=getRandomInt(3,6); return { problem: `A figure is translated left ${-h} units and up ${k} units. Write the transformation rule. (Format: (x+a, y+b))`, answer: `\\((x${h}, y+${k})\\)`, checkAnswer: `(x${h},y+${k})` }; },
    () => { return { problem: `What is the rule for a 90-degree clockwise rotation about the origin? (Format: (ay, bx))`, answer: `\\((y, -x)\\)`, checkAnswer: `(y,-x)` }; },
    () => { const x=getRandomInt(2,5), y=getRandomInt(2,5); return { problem: `A point at (\\(${x},${y}\\)) is reflected across the line y=x. What are its new coordinates?`, answer: `(\\( ${y}, ${x} \\))`, checkAnswer: `${y},${x}` }; },
    () => { const pre_x = getRandomInt(2,4), pre_y = pre_x + 1; const post_x = pre_x, post_y = -pre_y; return { problem: `A reflection maps the point (\\(${pre_x},${pre_y}\\)) to (\\(${post_x},${post_y}\\)). What is the line of reflection? (Enter as y=a or x=b)`, answer: `the x-axis`, checkAnswer: "x-axis" }; },
    () => { const sf=getRandomInt(2,4); return { problem: `A square is dilated by a scale factor of \\(${sf}\\). If the original perimeter was 12, what is the new perimeter?`, answer: `\\(${12*sf}\\)`, checkAnswer: (12*sf).toString() }; },
    () => { const sf=getRandomInt(2,4); return { problem: `A circle is dilated by a scale factor of \\(${sf}\\). If the original area was 10, what is the new area?`, answer: `\\(${10*sf**2}\\)`, checkAnswer: (10*sf**2).toString() }; },
    () => { return { problem: `A glide reflection is a composition of which two transformations? (1=translation, 2=rotation, 3=reflection)`, answer: `1,3`, checkAnswer: "1,3" }; },
    () => { return { problem: `What type of symmetry does the letter 'Z' have? (1=line, 2=rotational, 3=both)`, answer: `2`, checkAnswer: "2" }; },
];
function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Memorize the coordinate rules for each transformation." };
}
export const module = { topicId: '10M12', topicName: 'Transformations & Symmetry', generateProblem: generate };

