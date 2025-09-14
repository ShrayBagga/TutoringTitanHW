// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

// --- Graphing Helper ---
function createCoordinatePlaneGraph(elements) {
    const graphId = `g-${Date.now()}`;
    const graphFunction = {
        functions: [],
        boundingbox: [-10, 10, 10, -10],
        labels: []
    };
    elements.forEach(el => {
        graphFunction.functions.push(el);
    });
    return { graphId, graphFunction };
}

const problemGenerators = [
    () => { const x = getRandomInt(-5, 5); const y = getRandomInt(-5, 5); let quad = (x > 0 && y > 0) ? "I" : (x < 0 && y > 0) ? "II" : (x < 0 && y < 0) ? "III" : "IV"; if (x === 0 || y === 0) quad = "on an axis"; return { problem: `In which quadrant is the point (\\(${x}, ${y}\\)) located?`, answer: `Quadrant ${quad}`, checkAnswer: quad }; },
    () => { const x = getRandomInt(-5, 5); const y = getRandomInt(-5, 5); const { graphId, graphFunction } = createCoordinatePlaneGraph([{ type: 'point', x: x, y: y, options: {name: 'A', size: 4, color: 'blue'} }]); return { problem: `Plot the point A(\\(${x}, ${y}\\)) on a coordinate plane.`, answer: `Start at origin, move ${Math.abs(x)} units ${x>0?'right':'left'}, then ${Math.abs(y)} units ${y>0?'up':'down'}.`, checkAnswer: "Plotted", isGraph: true, graphId, graphFunction }; },
    () => { const x = getRandomInt(-5, 5); const y = getRandomInt(-5, 5); const { graphId, graphFunction } = createCoordinatePlaneGraph([{ type: 'point', x: x, y: y, options: {name: 'A'} }, { type: 'point', x: x, y: -y, options: {name: "A'"} }]); return { problem: `What are the coordinates of a point reflected across the x-axis from (\\(${x}, ${y}\\))?`, answer: `(\\( ${x}, ${-y} \\))`, checkAnswer: `${x},${-y}`, graphId, graphFunction }; },
    () => { const x = getRandomInt(-5, 5); const y = getRandomInt(-5, 5); const { graphId, graphFunction } = createCoordinatePlaneGraph([{ type: 'point', x: x, y: y, options: {name: 'A'} }, { type: 'point', x: -x, y: y, options: {name: "A'"} }]); return { problem: `What are the coordinates of a point reflected across the y-axis from (\\(${x}, ${y}\\))?`, answer: `(\\( ${-x}, ${y} \\))`, checkAnswer: `${-x},${y}`, graphId, graphFunction }; },
    () => { const x1 = getRandomInt(-5, 5); const y1 = getRandomInt(-5, 5); const x2 = x1; const y2 = getRandomInt(y1+1, 8); const { graphId, graphFunction } = createCoordinatePlaneGraph([{ type: 'line', point1: [x1, y1], point2: [x2, y2] }]); return { problem: `Find the distance between the points (\\(${x1}, ${y1}\\)) and (\\(${x2}, ${y2}\\)).`, answer: `\\(${Math.abs(y2-y1)}\\) units`, checkAnswer: Math.abs(y2-y1).toString(), graphId, graphFunction }; },
    () => { const x1 = getRandomInt(-5, 5); const y1 = getRandomInt(-5, 5); const x2 = getRandomInt(x1+1, 8); const y2 = y1; const { graphId, graphFunction } = createCoordinatePlaneGraph([{ type: 'line', point1: [x1, y1], point2: [x2, y2] }]); return { problem: `Find the distance between (\\(${x1}, ${y1}\\)) and (\\(${x2}, ${y2}\\)).`, answer: `\\(${Math.abs(x2-x1)}\\) units`, checkAnswer: Math.abs(x2-x1).toString(), graphId, graphFunction }; },
    () => { const x = getRandomInt(2, 5); const y = getRandomInt(2, 5); const vertices = [[0,0], [x,0], [x,y], [0,y]]; const { graphId, graphFunction } = createCoordinatePlaneGraph([{ type: 'polygon', vertices: vertices }]); return { problem: `A rectangle has vertices at (0,0), (\\(${x}\\),0), (0,\\(${y}\\)), and (\\(${x}, ${y}\\)). What is its perimeter?`, answer: `\\(${2*(x+y)}\\) units`, checkAnswer: (2*(x+y)).toString(), graphId, graphFunction }; },
    () => { const x = getRandomInt(3, 6); const vertices = [[0,0], [x,0], [x,x], [0,x]]; const { graphId, graphFunction } = createCoordinatePlaneGraph([{ type: 'polygon', vertices: vertices }]); return { problem: `A square has vertices at (0,0), (\\(${x}\\),0), (0,\\(${x}\\)), and (\\(${x}, ${x}\\)). What is its area?`, answer: `\\(${x*x}\\) square units`, checkAnswer: (x*x).toString(), graphId, graphFunction }; },
    () => { const x1 = getRandomInt(-4, -1); const y1 = getRandomInt(-4, -1); return { problem: `If you start at point (\\(${x1}, ${y1}\\)) and move 3 units right and 4 units up, what are your new coordinates?`, answer: `(\\( ${x1+3}, ${y1+4} \\))`, checkAnswer: `${x1+3},${y1+4}` }; },
    () => { const x = getRandomInt(1, 5); return { problem: `The point (\\(${x}\\), y) is in Quadrant IV. Is y positive or negative?`, answer: `Negative`, checkAnswer: "Negative" }; },
    () => { const y = getRandomInt(-5, -1); return { problem: `The point (x, \\(${y}\\)) is in Quadrant III. Is x positive or negative?`, answer: `Negative`, checkAnswer: "Negative" }; },
    () => { const y = getRandomInt(1, 5); return { problem: `What axis does the point (\\(0, ${y}\\)) lie on?`, answer: `The y-axis`, checkAnswer: "y-axis" }; },
    () => { const x = getRandomInt(-5, -1); return { problem: `What axis is the point (\\(${x}, 0\\)) on?`, answer: `The x-axis`, checkAnswer: "x-axis" }; },
    () => { const x = 5; return { problem: `Describe the line given by the equation \\(x = ${x}\\).`, answer: `A vertical line where every point has an x-coordinate of \\(${x}\\).`, checkAnswer: "A vertical line" }; },
    () => { const y = -3; return { problem: `Describe the line \\(y = ${y}\\).`, answer: `A horizontal line where every point has a y-coordinate of \\(${y}\\).`, checkAnswer: "A horizontal line" }; },
    () => { return { problem: `What are the coordinates of the origin?`, answer: `(\\(0, 0\\))`, checkAnswer: "0,0" }; },
    () => { const x1 = getRandomInt(1,3), y1 = getRandomInt(1,3), x2 = getRandomInt(4,6), y2 = getRandomInt(4,6); const midX = (x1+x2)/2, midY = (y1+y2)/2; return { problem: `Find the midpoint between (\\(${x1}, ${y1}\\)) and (\\(${x2}, ${y2}\\)).`, answer: `(\\( ${midX}, ${midY} \\))`, checkAnswer: `${midX},${midY}` }; },
    () => { const x = getRandomInt(2,4), y = getRandomInt(3,5); return { problem: `A map places a school at (0,0) and a library at (\\(${x}, ${y}\\)). If each grid unit is 1 mile, how would you describe the library's location relative to the school?`, answer: `\\(${x}\\) miles east and \\(${y}\\) miles north.`, checkAnswer: `${x} miles east and ${y} miles north.` }; },
    () => { const x = getRandomInt(2, 5); return { problem: `The points (\\(${x}, ${x}\\)) and (\\(-${x}, -${x}\\)) are reflections of each other across what?`, answer: `The origin`, checkAnswer: "The origin" }; },
    () => { const x1=getRandomInt(1,4), y1=getRandomInt(1,4), s=getRandomInt(2,4); const x4=x1+s, y4=y1+s; return { problem: `A square is defined by vertices (\\(${x1},${y1}\\)), (\\(${x1+s},${y1}\\)), and (\\(${x1},${y1+s}\\)). What are the coordinates of the fourth vertex?`, answer: `(\\( ${x4},${y4} \\))`, checkAnswer: `${x4},${y4}` }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "The first number (x) is horizontal, the second (y) is vertical." };
}

export const module = {
    topicId: '6M7',
    topicName: 'The Coordinate Plane',
    generateProblem: generate
};