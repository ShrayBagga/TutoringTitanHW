// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { const a=getRandomInt(2,9); return { problem: `What is the domain of the function \\(f(x) = \\sqrt{x-${a}}\\)? The answer is x >= N. What is N?`, answer: `\\(${a}\\)`, checkAnswer: a.toString() }; },
    () => { const a=getRandomInt(2,9); return { problem: `What is the range of the function \\(f(x) = x^2+${a}\\)? The answer is y >= N. What is N?`, answer: `\\(${a}\\)`, checkAnswer: a.toString() }; },
    () => { const a=getRandomInt(2,5); return { problem: `Is the function \\(f(x) = x^${a}\\) even, odd, or neither, if a is even? (1=even, 2=odd, 3=neither)`, answer: `\\(1\\)`, checkAnswer: "1" }; },
    () => { const a=getRandomInt(3,5); return { problem: `Is the function \\(f(x) = x^${a}\\) even, odd, or neither, if a is odd? (1=even, 2=odd, 3=neither)`, answer: `\\(2\\)`, checkAnswer: "2" }; },
    () => { const h=getRandomInt(1,5); return { problem: `Describe the horizontal shift of \\(y=(x-${h})^2\\) from \\(y=x^2\\). (Enter a number; positive for right, negative for left)`, answer: `\\(${h}\\)`, checkAnswer: h.toString() }; },
    () => { const k=getRandomInt(1,5); return { problem: `Describe the vertical shift of \\(y=x^2+${k}\\) from \\(y=x^2\\). (Enter a number; positive for up, negative for down)`, answer: `\\(${k}\\)`, checkAnswer: k.toString() }; },
    () => { const a=getRandomInt(2,5); return { problem: `Does \\(y=${a}x^2\\) represent a vertical stretch or shrink compared to \\(y=x^2\\)? (1=stretch, 2=shrink)`, answer: `\\(1\\)`, checkAnswer: "1" }; },
    () => { return { problem: `A function is reflected across the x-axis. If the original function was y=f(x), what is the new function? (y = ? * f(x))`, answer: `\\(-1\\)`, checkAnswer: "-1" }; },
    () => { const b=getRandomInt(2,4); return { problem: `Does \\(y=( ${b}x )^2\\) represent a horizontal stretch or shrink compared to \\(y=x^2\\)? (1=stretch, 2=shrink)`, answer: `\\(2\\)`, checkAnswer: "2" }; },
    () => { const r1=getRandomInt(1,3), r2=getRandomInt(4,6); return { problem: `A polynomial has roots at x=${r1} and x=${r2}. What is a possible factor of the polynomial? (x-N). Give the value of N for the smallest root.`, answer: `\\(${r1}\\)`, checkAnswer: r1.toString() }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Domain refers to possible x-values. Range refers to possible y-values. Transformations inside the function argument are often horizontal and inverse of the sign." };
}

export const module = {
    topicId: '12M8',
    topicName: 'Advanced Function Analysis',
    generateProblem: generate
};