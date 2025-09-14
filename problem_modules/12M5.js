// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { const a=getRandomInt(1,3), b=getRandomInt(2,4); const area = (a/3)*(b**3); return { problem: `Find the area under the curve \\(y = ${a}x^2\\) from x=0 to x=${b}.`, answer: `\\(${area.toFixed(1)}\\)`, checkAnswer: area.toFixed(1) }; },
    () => { const a=getRandomInt(2,5), b=getRandomInt(1,3); const area = (a*b); return { problem: `Find the area of the region bounded by \\(y=${a}\\), the x-axis, x=0, and x=${b}.`, answer: `\\(${area}\\)`, checkAnswer: area.toString() }; },
    () => { const m=getRandomInt(1,3), c=getRandomInt(1,3), b=getRandomInt(2,4); const area = (m/2)*(b**2)+c*b; return { problem: `Find the area under \\(y=${m}x+${c}\\) from x=0 to x=${b}.`, answer: `\\(${area}\\)`, checkAnswer: area.toString() }; },
    () => { const R=getRandomInt(3,6), r=getRandomInt(1,2); const vol = Math.PI * (R*R - r*r) * 5; return { problem: `A washer is formed by rotating the region between y=${R} and y=${r} (from x=0 to x=5) around the x-axis. What is its volume? (in terms of pi)`, answer: `\\(${vol/Math.PI}\\)`, checkAnswer: (vol/Math.PI).toString() }; },
    () => { const r=getRandomInt(2,5), h=getRandomInt(3,6); const vol = Math.PI * (r**2) * h; return { problem: `Use the disk method to find the volume of a cylinder with radius ${r} and height ${h}. (in terms of pi)`, answer: `\\(${vol/Math.PI}\\)`, checkAnswer: (vol/Math.PI).toString() }; },
    () => { const b=getRandomInt(2,4); const len = (1/27)*((4+9*b*b)**1.5 - 8); return { problem: `Find the arc length of \\(y=x^{3/2}\\) from x=0 to x=${b}.`, answer: `\\(${len.toFixed(1)}\\)`, checkAnswer: len.toFixed(1) }; },
    () => { const avgLower = getRandomInt(1, 3); const avgUpper = getRandomInt(avgLower + 2, avgLower + 5); const avgCoeff = 6; const avgFunc = `${avgCoeff}x`; const avgAntideriv = (x) => (avgCoeff / 2) * x * x; const definiteIntegral = avgAntideriv(avgUpper) - avgAntideriv(avgLower); const avgValue = definiteIntegral / (avgUpper - avgLower); return { problem: `Find the average value of \\(f(x) = ${avgFunc}\\) on the interval \\([${avgLower}, ${avgUpper}]\\).`, answer: `\\(${avgValue}\\)`, checkAnswer: avgValue.toString() }; },
    () => { const b=getRandomInt(2,4); const area = Math.exp(b)-1; return { problem: `Find the area under the curve \\(y=e^x\\) from x=0 to x=${b}.`, answer: `\\(${area.toFixed(1)}\\)`, checkAnswer: area.toFixed(1) }; },
    () => { const upper=getRandomInt(3,5); const area = 0.5*(upper**2 - 1**2); return { problem: `Find the area between the curves \\(y=x\\) and \\(y=1/x\\) from x=1 to x=${upper}.`, answer: `\\(${(area - Math.log(upper)).toFixed(1)}\\)`, checkAnswer: (area - Math.log(upper)).toFixed(1) }; },
    () => { const work = 0.5*10*(5**2); return { problem: `A spring with spring constant k=10 N/m is stretched from its natural length to 5 m. How much work is done?`, answer: `\\(125\\)`, checkAnswer: "125" }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "The area under a curve f(x) from a to b is the definite integral of f(x) from a to b." };
}

export const module = {
    topicId: '12M5',
    topicName: 'Applications of Integrals',
    generateProblem: generate
};