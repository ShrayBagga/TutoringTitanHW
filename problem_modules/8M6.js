// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { const x=getRandomInt(2,5); const m=getRandomInt(2,4), b=getRandomInt(1,5); const y=m*x+b; return { problem: `If \\(f(x) = ${m}x + ${b}\\), find \\(f(${x})\\).`, answer: `\\(${y}\\)`, checkAnswer: y.toString() }; },
    () => { return { problem: `Is the relation \\(\\{(1,2), (2,4), (3,6), (1,5)\\}\\) a function?`, answer: `No, because the input 1 has two different outputs.`, checkAnswer: "No" }; },
    () => { return { problem: `Is the equation \\(y = x^2\\) a linear or non-linear function?`, answer: `Non-linear`, checkAnswer: "Non-linear" }; },
    () => { return { problem: `Is \\(y = 5x - 2\\) a linear or non-linear function?`, answer: `Linear`, checkAnswer: "Linear" }; },
    () => { const rateA=getRandomInt(20,30); const rateB=rateA+getRandomInt(5,10); return { problem: `Function A has a rate of change of \\(${rateA}\\). Function B has a rate of change of \\(${rateB}\\). Which function is increasing faster?`, answer: `Function B`, checkAnswer: "Function B" }; },
    () => { const initialA=50; const rateA=10; const initialB=0; const rateB=15; return { problem: `Account A starts with \\($${initialA}\\) and saves \\($${rateA}\\) per week. Account B starts with \\($${initialB}\\) and saves \\($${rateB}\\) per week. Which has a greater initial value?`, answer: `Account A`, checkAnswer: "Account A" }; },
    () => { return { problem: `Describe a function in your own words.`, answer: `A rule that assigns exactly one output for each input.`, checkAnswer: "one output for each input" }; },
    () => { const graphId=`g-${Date.now()}`; const graphFunc={functions:[{expr:`x^2`}]}; return { problem: `Does the graph shown represent a linear function?`, answer: `No, it is a curve (a parabola).`, checkAnswer: "No", graphId, graphFunction:{functions:[{type:'expression', expression:'function(x){return x*x;}'}], boundingbox:[-5,5,10,-2]} }; },
    () => { return { problem: `What is the "vertical line test"?`, answer: `A test to determine if a graph is a function. If a vertical line intersects the graph more than once, it is not a function.`, checkAnswer: "vertical line test" }; },
    () => { const rate=getRandomInt(2,5); return { problem: `A function is described by the equation \\(y=${rate}x\\). What is the initial value (y-intercept)?`, answer: `0`, checkAnswer: "0" }; },
    () => { const data = "(-1, 2), (0, 4), (1, 6)"; return { problem: `What is the rate of change for the linear function represented by the points ${data}?`, answer: `2`, checkAnswer: "2" }; },
    () => { const data = "(0, 5)"; return { problem: `What is the initial value for a function that passes through the point ${data}?`, answer: `5`, checkAnswer: "5" }; },
    () => { return { problem: `Is the set of points \\(\\{(2,3), (4,5), (6,7)\\}\\) a function?`, answer: `Yes`, checkAnswer: "Yes" }; },
    () => { const carA_eq = "y=50x"; const carB_eq = "y=60x"; return { problem: `The distance traveled by Car A is \\(${carA_eq}\\) and Car B is \\(${carB_eq}\\). Which car is faster?`, answer: `Car B`, checkAnswer: "Car B" }; },
    () => { const x=3; const y=x+5; return { problem: `A function machine uses the rule \\(y=x+5\\). If the input is \\(${x}\\), what is the output?`, answer: `\\(${y}\\)`, checkAnswer: y.toString() }; },
    () => { const data = "Input (x): 1, 2, 3. Output (y): 3, 6, 9."; return { problem: `What function rule describes the data: ${data}?`, answer: `\\(y=3x\\)`, checkAnswer: "y=3x" }; },
    () => { const graphId=`g-${Date.now()}`; const graphFunc={functions:[{expr:`x+2`}]}; return { problem: `What is the y-intercept of the function shown in the graph?`, answer: `2`, checkAnswer: "2", graphId, graphFunction:{functions:[{type:'expression', expression:'function(x){return x+2;}'}], boundingbox:[-5,5,5,-5]} }; },
    () => { return { problem: `Does a vertical line (e.g., x=3) represent a function?`, answer: `No, because one input (3) has infinitely many outputs.`, checkAnswer: "No" }; },
    () => { const domains=[1,2,3]; const ranges=[5,10,15]; return { problem: `Identify the domain and range of the function \\(\\{(1,5), (2,10), (3,15)\\}\\).`, answer: `Domain: \\(\\{${domains.join(',')}\\}\\), Range: \\(\\{${ranges.join(',')}\\}\\)`, checkAnswer: "D:{1,2,3},R:{5,10,15}" }; },
    () => { return { problem: `The total cost \\(C\\) of buying \\(t\\) tickets at $10 each is \\(C=10t\\). Which is the independent variable?`, answer: `The number of tickets, \\(t\\)`, checkAnswer: "t" }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "A function has only one output (y) for each input (x)." };
}

export const module = {
    topicId: '8M6',
    topicName: 'Functions',
    generateProblem: generate
};
