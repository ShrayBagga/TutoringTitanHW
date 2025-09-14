// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { const r=getRandomInt(3,9); return { problem: `What is the radius of the circle \\(x^2 + y^2 = ${r*r}\\)?`, answer: `\\(${r}\\)`, checkAnswer: r.toString() }; },
    () => { const h=getRandomInt(1,5), k=getRandomInt(1,5), r=getRandomInt(2,6); return { problem: `What is the x-coordinate of the center of the circle \\((x-${h})^2 + (y-${k})^2 = ${r*r}\\)?`, answer: `\\(${h}\\)`, checkAnswer: h.toString() }; },
    () => { const h=getRandomInt(1,5), k=getRandomInt(1,5); return { problem: `What is the y-coordinate of the vertex of the parabola \\(y = (x-${h})^2 + ${k}\\)?`, answer: `\\(${k}\\)`, checkAnswer: k.toString() }; },
    () => { const p=getRandomInt(2,5); const focus=p; return { problem: `For the parabola \\(x^2 = ${4*p}y\\), what is the y-coordinate of the focus?`, answer: `\\(${focus}\\)`, checkAnswer: focus.toString() }; },
    () => { const a=getRandomInt(5,9), b=getRandomInt(2,4); return { problem: `For the ellipse \\(\\frac{x^2}{${a*a}} + \\frac{y^2}{${b*b}} = 1\\), what is the length of the major axis?`, answer: `\\(${2*a}\\)`, checkAnswer: (2*a).toString() }; },
    () => { const a=getRandomInt(5,9), b=getRandomInt(2,4); return { problem: `For the ellipse \\(\\frac{x^2}{${a*a}} + \\frac{y^2}{${b*b}} = 1\\), what is the length of the minor axis?`, answer: `\\(${2*b}\\)`, checkAnswer: (2*b).toString() }; },
    () => { const a=getRandomInt(3,6), b=getRandomInt(2,5); return { problem: `For the hyperbola \\(\\frac{x^2}{${a*a}} - \\frac{y^2}{${b*b}} = 1\\), what is the x-coordinate of a vertex? Enter the positive value.`, answer: `\\(${a}\\)`, checkAnswer: a.toString() }; },
    () => { const a=getRandomInt(3,6); return { problem: `What is the standard form of a circle with center (0,0) and radius ${a}? If r^2 = ${a*a}, what is r?`, answer: `\\(${a}\\)`, checkAnswer: a.toString() }; },
    () => { return { problem: `An ellipse is defined by the set of all points where the sum of the distances to two fixed points (foci) is constant. If this sum is 10, what is the length of the major axis?`, answer: `\\(10\\)`, checkAnswer: "10" }; },
    () => { const h=getRandomInt(1,5), k=h+getRandomInt(1,3), r=k-h; return { problem: `A circle has a diameter with endpoints at (\\(${h},${h}\\)) and (\\(${k},${k}\\)). What is its radius squared?`, answer: `\\(${ ( (k-h)**2 + (k-h)**2 )/4 }\\)`, checkAnswer: ( ( (k-h)**2 + (k-h)**2 )/4 ).toString() }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Memorize the standard form equations for circles, parabolas, ellipses, and hyperbolas." };
}

export const module = {
    topicId: '11M9',
    topicName: 'Conic Sections',
    generateProblem: generate
};