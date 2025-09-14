// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { const t=getRandomInt(1,4); const x=t+getRandomInt(1,3); return { problem: `Given parametric equations x(t)=t+${x-t} and y(t)=${t*2}t, find the x-coordinate at t=${t}.`, answer: `\\(${x}\\)`, checkAnswer: x.toString() }; },
    () => { const t=getRandomInt(1,4); const y=t*t+getRandomInt(1,3); return { problem: `Given x(t)=${t+1} and y(t)=t^2+${y-t*t}, find the y-coordinate at t=${t}.`, answer: `\\(${y}\\)`, checkAnswer: y.toString() }; },
    () => { const b=getRandomInt(2,5); return { problem: `Eliminate the parameter to find the Cartesian equation for x(t)=t+${b}, y(t)=t. The result is y=x-N. What is N?`, answer: `\\(${b}\\)`, checkAnswer: b.toString() }; },
    () => { return { problem: `For x(t)=cos(t) and y(t)=sin(t), eliminate the parameter. The result is x^2+y^2=N. What is N?`, answer: `\\(1\\)`, checkAnswer: "1" }; },
    () => { const t=1; const dx_dt = 2*t; return { problem: `Find the derivative dy/dx for x(t)=t^2, y(t)=3t at t=${t}. What is dx/dt?`, answer: `\\(2\\)`, checkAnswer: "2" }; },
    () => { const t=1; const dy_dt = 3; return { problem: `Find the derivative dy/dx for x(t)=t^2, y(t)=3t at t=${t}. What is dy/dt?`, answer: `\\(3\\)`, checkAnswer: "3" }; },
    () => { const t=getRandomInt(1,4); const dy_dx = 3/(2*t); return { problem: `Find dy/dx for x(t)=t^2, y(t)=3t at t=${t}.`, answer: `\\(${dy_dx.toFixed(1)}\\)`, checkAnswer: dy_dx.toFixed(1) }; },
    () => { const v0=getRandomInt(20,40), angle=getRandomInt(30,60); const t=1; const x = v0*Math.cos(angle*Math.PI/180)*t; return { problem: `A projectile is fired with initial velocity ${v0} m/s at an angle of ${angle} degrees. Given x(t)=v0*cos(theta)*t, what is the horizontal position at t=1 second?`, answer: `\\(${x.toFixed(0)}\\)`, checkAnswer: x.toFixed(0) }; },
    () => { const t=getRandomInt(1,4); const x=2*t, y=t*t; return { problem: `A curve is defined by x(t)=2t, y(t)=t^2. At t=${t}, what is the y-coordinate?`, answer: `\\(${y}\\)`, checkAnswer: y.toString() }; },
    () => { return { problem: `Parametric equations express coordinates as functions of a third variable, often called the ____. What is its value if it is not given?`, answer: `\\(1\\)`, checkAnswer: "1" }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "To eliminate the parameter, solve one equation for t and substitute into the other equation." };
}

export const module = {
    topicId: '12M7',
    topicName: 'Parametric Equations',
    generateProblem: generate
};