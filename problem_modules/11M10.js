// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { const x=getRandomInt(2,5), y=getRandomInt(1,4); return { problem: `Solve the system: \\(x+y=${x+y}\\) and \\(x-y=${x-y}\\). What is the value of x?`, answer: `\\(${x}\\)`, checkAnswer: x.toString() }; },
    () => { const x=getRandomInt(1,4), y=x+2; return { problem: `Solve the system: \\(y=x+2\\) and \\(3x+y=${3*x+y}\\). What is the value of y?`, answer: `\\(${y}\\)`, checkAnswer: y.toString() }; },
    () => { const x=1,y=3,z=2; return { problem: `Solve the 3-variable system: \\(x+y+z=6\\), \\(x-y+z=0\\), \\(2x+y-z=3\\). What is the value of z?`, answer: `\\(${z}\\)`, checkAnswer: z.toString() }; },
    () => { const x=getRandomInt(2,4), y=x*x; return { problem: `Solve the nonlinear system: \\(y=x^2\\) and \\(y=x+${x*x-x}\\). What is the value of x?`, answer: `\\(${x}\\)`, checkAnswer: x.toString() }; },
    () => { const r=5, x=3, y=4; return { problem: `Solve the system: \\(x^2+y^2=${r*r}\\) and \\(y=\\frac{4}{3}x\\). What is the positive y-value?`, answer: `\\(${y}\\)`, checkAnswer: y.toString() }; },
    () => { const x=getRandomInt(2,5), y=x+1, z=x+2; return { problem: `Three numbers sum to ${x+y+z}. The second is one more than the first. The third is two more than the first. What is the smallest number?`, answer: `\\(${x}\\)`, checkAnswer: x.toString() }; },
    () => { return { problem: `A system of a line and a parabola can have at most how many solutions?`, answer: `2`, checkAnswer: "2" }; },
    () => { return { problem: `A system of two distinct circles can have at most how many solutions?`, answer: `2`, checkAnswer: "2" }; },
    () => { const x=2, y=5; return { problem: `Find the intersection of \\(y=x+3\\) and \\(y=2x+1\\). What is the y-coordinate?`, answer: `\\(${y}\\)`, checkAnswer: y.toString() }; },
    () => { const x=1,y=2,z=3; return { problem: `Is (1,2,3) a solution to the system \\(x+y+z=6\\), \\(2x-y+z=3\\), \\(3x+y-z=2\\)? What is x+y+z?`, answer: `\\(6\\)`, checkAnswer: "6" }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Use substitution or elimination. For 3-variable systems, eliminate one variable twice to create a 2-variable system." };
}

export const module = {
    topicId: '11M10',
    topicName: 'Systems of Equations',
    generateProblem: generate
};