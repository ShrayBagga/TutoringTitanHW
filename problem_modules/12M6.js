// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { const r=getRandomInt(3,8), theta=getRandomInt(30,60); const x = r*Math.cos(theta*Math.PI/180); return { problem: `Convert the polar coordinate (r=${r}, \\(\\theta=${theta}^{\\circ}\\)) to rectangular coordinates. What is the x-value?`, answer: `\\(${x.toFixed(1)}\\)`, checkAnswer: x.toFixed(1) }; },
    () => { const r=getRandomInt(3,8), theta=getRandomInt(30,60); const y = r*Math.sin(theta*Math.PI/180); return { problem: `Convert the polar coordinate (r=${r}, \\(\\theta=${theta}^{\\circ}\\)) to rectangular coordinates. What is the y-value?`, answer: `\\(${y.toFixed(1)}\\)`, checkAnswer: y.toFixed(1) }; },
    () => { const x=getRandomInt(3,5), y=getRandomInt(3,5); const r = Math.sqrt(x*x+y*y); return { problem: `Convert the rectangular coordinate (${x},${y}) to polar coordinates. What is the r-value?`, answer: `\\(${r.toFixed(1)}\\)`, checkAnswer: r.toFixed(1) }; },
    () => { const x=getRandomInt(3,5), y=x; const theta = Math.atan(y/x)*180/Math.PI; return { problem: `Convert the rectangular coordinate (${x},${y}) to polar coordinates. What is the angle in degrees?`, answer: `\\(${theta}\\)`, checkAnswer: theta.toString() }; },
    () => { const ax=getRandomInt(1,5), ay=getRandomInt(2,6), bx=getRandomInt(2,6), by=getRandomInt(1,5); const rx=ax+bx; return { problem: `Vector A = <${ax}, ${ay}>. Vector B = <${bx}, ${by}>. Find A+B. What is the x-component?`, answer: `\\(${rx}\\)`, checkAnswer: rx.toString() }; },
    () => { const ax=getRandomInt(5,9), ay=getRandomInt(5,9), bx=getRandomInt(1,4), by=getRandomInt(1,4); const ry=ay-by; return { problem: `Vector A = <${ax}, ${ay}>. Vector B = <${bx}, ${by}>. Find A-B. What is the y-component?`, answer: `\\(${ry}\\)`, checkAnswer: ry.toString() }; },
    () => { const s=getRandomInt(2,5), ax=getRandomInt(2,5), ay=getRandomInt(3,6); return { problem: `Find the scalar product ${s}A for A = <${ax},${ay}>. What is the new x-component?`, answer: `\\(${s*ax}\\)`, checkAnswer: (s*ax).toString() }; },
    () => { const ax=getRandomInt(2,6), ay=getRandomInt(3,7); const mag = Math.sqrt(ax*ax+ay*ay); return { problem: `Find the magnitude of vector A = <${ax},${ay}>.`, answer: `\\(${mag.toFixed(1)}\\)`, checkAnswer: mag.toFixed(1) }; },
    () => { const ax=getRandomInt(1,5), ay=getRandomInt(2,6), bx=getRandomInt(2,6), by=getRandomInt(1,5); const dot = ax*bx + ay*by; return { problem: `Find the dot product of A = <${ax},${ay}> and B = <${bx},${by}>.`, answer: `\\(${dot}\\)`, checkAnswer: dot.toString() }; },
    () => { const r = getRandomInt(2, 5); return { problem: `The polar equation \\(r = ${r}\\) represents a circle. What is its radius?`, answer: `\\(${r}\\)`, checkAnswer: r.toString() }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "x = r*cos(θ), y = r*sin(θ). r^2 = x^2 + y^2, tan(θ) = y/x." };
}

export const module = {
    topicId: '12M6',
    topicName: 'Polar Coordinates and Vectors',
    generateProblem: generate
};