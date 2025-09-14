// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { const m1=getRandomInt(2,5), b1=getRandomInt(1,5), m2=getRandomInt(1,3), b2=getRandomInt(1,3); const x=getRandomInt(1,4); const res = (m1*x+b1)+(m2*x+b2); return { problem: `Given \\(f(x) = ${m1}x+${b1}\\) and \\(g(x) = ${m2}x+${b2}\\), find \\((f+g)(${x})\\).`, answer: `\\(${res}\\)`, checkAnswer: res.toString() }; },
    () => { const m1=getRandomInt(4,8), b1=getRandomInt(2,6), m2=getRandomInt(1,3), b2=getRandomInt(1,3); const x=getRandomInt(1,4); const res = (m1*x+b1)-(m2*x+b2); return { problem: `Given \\(f(x) = ${m1}x+${b1}\\) and \\(g(x) = ${m2}x+${b2}\\), find \\((f-g)(${x})\\).`, answer: `\\(${res}\\)`, checkAnswer: res.toString() }; },
    () => { const m1=getRandomInt(2,4), b1=getRandomInt(1,3), m2=getRandomInt(2,4), b2=getRandomInt(1,3); const x=getRandomInt(1,3); const res = (m1*x+b1)*(m2*x+b2); return { problem: `Given \\(f(x) = ${m1}x+${b1}\\) and \\(g(x) = ${m2}x+${b2}\\), find \\((f \\cdot g)(${x})\\).`, answer: `\\(${res}\\)`, checkAnswer: res.toString() }; },
    () => { const m1=getRandomInt(2,5), b1=0, m2=getRandomInt(2,3), b2=0; const x=getRandomInt(2,5); const res = (m1*x+b1)/(m2*x+b2); return { problem: `Given \\(f(x) = ${m1}x\\) and \\(g(x) = ${m2}x\\), find \\((f/g)(${x})\\).`, answer: `\\(${res}\\)`, checkAnswer: res.toString() }; },
    () => { const m1=getRandomInt(2,4), b1=getRandomInt(1,3), m2=getRandomInt(1,3), b2=getRandomInt(1,3); const x=getRandomInt(1,4); const g_x = m2*x+b2; const f_g_x = m1*g_x+b1; return { problem: `Given \\(f(x) = ${m1}x+${b1}\\) and \\(g(x) = ${m2}x+${b2}\\), find \\(f(g(${x}))\\).`, answer: `\\(${f_g_x}\\)`, checkAnswer: f_g_x.toString() }; },
    () => { const m1=getRandomInt(2,4), b1=getRandomInt(1,3), m2=getRandomInt(1,3), b2=getRandomInt(1,3); const x=getRandomInt(1,4); const f_x = m1*x+b1; const g_f_x = m2*f_x+b2; return { problem: `Given \\(f(x) = ${m1}x+${b1}\\) and \\(g(x) = ${m2}x+${b2}\\), find \\(g(f(${x}))\\).`, answer: `\\(${g_f_x}\\)`, checkAnswer: g_f_x.toString() }; },
    () => { const m=getRandomInt(2,5), b=getRandomInt(1,8); const x=getRandomInt(2,6); const inv_x = (x-b)/m; return { problem: `Find the inverse of \\(f(x)=${m}x+${b}\\). What is \\(f^{-1}(${x})\\)?`, answer: `\\(${inv_x}\\)`, checkAnswer: inv_x.toString() }; },
    () => { const a=getRandomInt(2,4), x=getRandomInt(2,4); const res = Math.sqrt(x-1); return { problem: `Find the inverse of \\(f(x)=x^2+1\\) for \\(x \\ge 0\\). What is \\(f^{-1}(${x*x+1})\\)?`, answer: `\\(${x}\\)`, checkAnswer: x.toString() }; },
    () => { const m=getRandomInt(2,5),b=getRandomInt(1,5); return { problem: `If \\(f(x)=x+${b}\\) and \\(g(x)=x-${b}\\), what is \\(f(g(${m}))\\)?`, answer: `\\(${m}\\)`, checkAnswer: m.toString() }; },
    () => { const x=getRandomInt(2,5); const res = x*x*x+x; return { problem: `Given \\(f(x)=x^2+x\\) and \\(g(x)=x-1\\), find \\(f(g(${x+1}))\\).`, answer: `\\(${res}\\)`, checkAnswer: res.toString() }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "For f(g(x)), plug the entire g(x) function into the x of the f(x) function." };
}

export const module = {
    topicId: '11M6',
    topicName: 'Function Operations & Composition',
    generateProblem: generate
};