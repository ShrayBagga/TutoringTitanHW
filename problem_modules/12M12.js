// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { const k=getRandomInt(2,6); return { problem: `Solve the differential equation \\(\\frac{dy}{dx} = ${k}x\\). The solution is \\(y = Nx^2 + C\\). What is N?`, answer: `\\(${k/2}\\)`, checkAnswer: (k/2).toString() }; },
    () => { const k=getRandomInt(2,5); return { problem: `Solve \\(\\frac{dy}{dx} = y\\) with initial condition y(0)=${k}. What is y(1)?`, answer: `\\(${k*Math.E.toFixed(2)}\\)`, checkAnswer: (k*Math.E).toFixed(2) }; },
    () => { return { problem: `What is the order of the differential equation \\(y'' + 2y' + y = 0\\)?`, answer: `\\(2\\)`, checkAnswer: "2" }; },
    () => { const k=getRandomInt(2,5); return { problem: `Is \\(y = e^{${k}x}\\) a solution to \\(y' - ${k}y = 0\\)? (1=yes, 0=no)`, answer: `\\(1\\)`, checkAnswer: "1" }; },
    () => { const k=getRandomInt(3,7); return { problem: `Find the general solution to \\(\\frac{dy}{dt} = ${k}\\). The solution is y = Nt+C. What is N?`, answer: `\\(${k}\\)`, checkAnswer: k.toString() }; },
    () => { return { problem: `A population grows according to the model \\(\\frac{dP}{dt} = 0.05P\\). Is this growth exponential or linear? (1=exp, 2=lin)`, answer: `\\(1\\)`, checkAnswer: "1" }; },
    () => { const k=getRandomInt(2,5); return { problem: `Solve the separable differential equation \\(\\frac{dy}{dx} = \\frac{x}{y}\\). The solution is \\(y^2 = x^2 + C\\). If C=0, what is y when x=${k}?`, answer: `\\(${k}\\)`, checkAnswer: k.toString() }; },
    () => { const T0=100, Ts=20, k=0.1, t=5; const Tt = Ts + (T0-Ts)*Math.exp(-k*t); return { problem: `Using Newton's Law of Cooling, \\(T(t) = T_s + (T_0-T_s)e^{-kt}\\), find T(5) if \\(T_s=20, T_0=100, k=0.1\\).`, answer: `\\(${Tt.toFixed(0)}\\)`, checkAnswer: Tt.toFixed(0) }; },
    () => { return { problem: `A general solution to a differential equation contains an arbitrary ____. (1=constant, 2=variable)`, answer: `\\(1\\)`, checkAnswer: "1" }; },
    () => { const a=getRandomInt(2,4); return { problem: `Solve \\(y'' = ${a}\\). The solution is \\(y=Nx^2+C_1x+C_2\\). What is N?`, answer: `\\(${a/2}\\)`, checkAnswer: (a/2).toString() }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Separate variables (if possible), then integrate both sides to solve." };
}

export const module = {
    topicId: '12M12',
    topicName: 'Intro to Differential Equations',
    generateProblem: generate
};