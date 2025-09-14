// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
const commonAngles = [30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];

const problemGenerators = [
    () => { const angle = commonAngles[getRandomInt(0,2)]; return { problem: `What is the value of \\(sin(${angle}^{\\circ})\\)? Enter as a decimal to 2 places.`, answer: `\\(${Math.sin(angle*Math.PI/180).toFixed(2)}\\)`, checkAnswer: Math.sin(angle*Math.PI/180).toFixed(2) }; },
    () => { const angle = commonAngles[getRandomInt(0,5)]; return { problem: `What is the value of \\(cos(${angle}^{\\circ})\\)? Enter as a decimal to 2 places.`, answer: `\\(${Math.cos(angle*Math.PI/180).toFixed(2)}\\)`, checkAnswer: Math.cos(angle*Math.PI/180).toFixed(2) }; },
    () => { const angle = commonAngles[getRandomInt(0,2)]; return { problem: `What is the value of \\(tan(${angle}^{\\circ})\\)? Enter as a decimal to 2 places.`, answer: `\\(${Math.tan(angle*Math.PI/180).toFixed(2)}\\)`, checkAnswer: Math.tan(angle*Math.PI/180).toFixed(2) }; },
    () => { const deg = commonAngles[getRandomInt(0,commonAngles.length-1)]; const rad = deg/180; return { problem: `Convert \\(${deg}^{\\circ}\\) to radians. The answer is \\(N\\pi\\). What is N? (as a decimal)`, answer: `\\(${rad}\\)`, checkAnswer: rad.toString() }; },
    () => { const num = getRandomInt(1,3), den=getRandomInt(num+1,6); const deg = (num/den)*180; return { problem: `Convert \\(\\frac{${num}\\pi}{${den}}\\) radians to degrees.`, answer: `\\(${deg}\\)`, checkAnswer: deg.toString() }; },
    () => { const angle=getRandomInt(20,70); const s = Math.sin(angle*Math.PI/180); const c = Math.cos(angle*Math.PI/180); return { problem: `Given \\(sin(\\theta)=${s.toFixed(2)}\\) and \\(cos(\\theta)=${c.toFixed(2)}\\), find \\(tan(\\theta)\\).`, answer: `\\(${(s/c).toFixed(2)}\\)`, checkAnswer: (s/c).toFixed(2) }; },
    () => { const s = getRandomInt(5,9)/10; const val = 1-s*s; return { problem: `Using the identity \\(sin^2(\\theta) + cos^2(\\theta) = 1\\), if \\(sin(\\theta)=${s}\\), what is \\(cos^2(\\theta)\\)?`, answer: `\\(${val}\\)`, checkAnswer: val.toString() }; },
    () => { const a=getRandomInt(3,5),b=getRandomInt(6,10),C=getRandomInt(30,60); const c2=a*a+b*b-2*a*b*Math.cos(C*Math.PI/180); return { problem: `In \\(\\triangle ABC\\), a=${a}, b=${b}, and \\(\\angle C=${C}^{\\circ}\\). Find the length of side c squared.`, answer: `\\(${c2.toFixed(1)}\\)`, checkAnswer: c2.toFixed(1) }; },
    () => { const a=getRandomInt(5,8),A=getRandomInt(30,50),B=getRandomInt(35,55); const b=(a*Math.sin(B*Math.PI/180))/Math.sin(A*Math.PI/180); return { problem: `In \\(\\triangle ABC\\), a=${a}, \\(\\angle A=${A}^{\\circ}\\), and \\(\\angle B=${B}^{\\circ}\\). Find the length of side b.`, answer: `\\(${b.toFixed(1)}\\)`, checkAnswer: b.toFixed(1) }; },
    () => { const period = getRandomInt(2, 6); return { problem: `What is the period of the function \\(y = sin(${period}x)\\)? The answer is \\(N\\pi\\). What is N (as a decimal)?`, answer: `\\(${2/period}\\)`, checkAnswer: (2/period).toString() }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Memorize the unit circle values for sine, cosine, and tangent of common angles." };
}

export const module = {
    topicId: '11M7',
    topicName: 'Trigonometry',
    generateProblem: generate
};