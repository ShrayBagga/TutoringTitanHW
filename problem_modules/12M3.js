// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { const x=getRandomInt(1,4); const crit_point = -(-2*x)/(2*1); return { problem: `Find the critical point of the function \\(f(x) = x^2 - ${2*x}x + 5\\).`, answer: `\\(${crit_point}\\)`, checkAnswer: crit_point.toString() }; },
    () => { const v_t = `96 - 32t`; const time = 3; return { problem: `A ball is thrown upwards with velocity \\(v(t) = 96 - 32t\\). At what time \\(t\\) does it reach its maximum height (when v(t)=0)?`, answer: `\\(${time}\\)`, checkAnswer: time.toString() }; },
    () => { const a=getRandomInt(2,5), b=getRandomInt(1,5); return { problem: `On what x-value is the local minimum for \\(f(x)=x^3 - ${1.5*a}x^2 - ${a*b}x\\)?`, answer: `\\(${(3*a + Math.sqrt(9*a*a + 12*a*b))/6}\\)`, checkAnswer: ((3*a + Math.sqrt(9*a*a + 12*a*b))/6).toFixed(2) }; },
    () => { const r = getRandomInt(2,5); const dr_dt = getRandomInt(2,5); const dA_dt = 2*Math.PI*r*dr_dt; return { problem: `The radius of a circle is increasing at a rate of ${dr_dt} cm/s. How fast is the area increasing when the radius is ${r} cm?`, answer: `\\(${dA_dt.toFixed(1)}\\)`, checkAnswer: dA_dt.toFixed(1) }; },
    () => { return { problem: `If the first derivative of a function is positive on an interval, the function is ____ on that interval. (1=increasing, 2=decreasing)`, answer: `\\(1\\)`, checkAnswer: "1" }; },
    () => { return { problem: `If the second derivative of a function is negative at a critical point, that point is a local _____. (1=maximum, 2=minimum)`, answer: `\\(1\\)`, checkAnswer: "1" }; },
    () => { const x=getRandomInt(1,3); return { problem: `Find the point of inflection for \\(f(x) = x^3 - ${3*x}x^2\\).`, answer: `\\(${x}\\)`, checkAnswer: x.toString() }; },
    () => { const L=20; const x=L/4; const max_area = x*x; return { problem: `What is the maximum area of a rectangle with a perimeter of ${L}?`, answer: `\\(${max_area}\\)`, checkAnswer: max_area.toString() }; },
    () => { const x=getRandomInt(1,3); const slope = 3*x*x - 6*x; return { problem: `Find the slope of the curve \\(y = x^3 - 3x^2 + 2\\) at x = ${x}.`, answer: `\\(${slope}\\)`, checkAnswer: slope.toString() }; },
    () => { return { problem: `Newton's method is used to find the ____ of a function. (1=roots, 2=maxima)`, answer: `\\(1\\)`, checkAnswer: "1" }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Set the first derivative to zero to find critical points (maxima/minima). Set the second derivative to zero to find inflection points." };
}

export const module = {
    topicId: '12M3',
    topicName: 'Applications of Derivatives',
    generateProblem: generate
};