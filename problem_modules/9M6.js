// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
const problemGenerators = [
    () => { const b='x', e1=getRandomInt(3,6), e2=getRandomInt(2,5); return { problem: `Simplify: \\(${b}^${e1} \\cdot ${b}^${e2}\\)`, answer: `\\(${b}^{${e1+e2}}\\)`, checkAnswer: `${b}^${e1+e2}` }; },
    () => { const b='y', e1=getRandomInt(7,10), e2=getRandomInt(2,6); return { problem: `Simplify: \\(\\frac{${b}^${e1}}{${b}^${e2}}\\)`, answer: `\\(${b}^{${e1-e2}}\\)`, checkAnswer: `${b}^${e1-e2}` }; },
    () => { const b='z', e1=getRandomInt(2,4), e2=getRandomInt(3,5); return { problem: `Simplify: \\((${b}^${e1})^${e2}\\)`, answer: `\\(${b}^{${e1*e2}}\\)`, checkAnswer: `${b}^${e1*e2}` }; },
    () => { const c=getRandomInt(2,5), b='x', e=getRandomInt(2,4); return { problem: `Simplify: \\((${c}${b})^${e}\\)`, answer: `\\(${c**e}${b}^${e}\\)`, checkAnswer: `${c**e}${b}^${e}` }; },
    () => { const c1=getRandomInt(2,5), c2=getRandomInt(2,5), b='a', e1=getRandomInt(2,4), e2=getRandomInt(3,5); return { problem: `Simplify: \\((${c1}${b}^${e1})(${c2}${b}^${e2})\\)`, answer: `\\(${c1*c2}${b}^{${e1+e2}}\\)`, checkAnswer: `${c1*c2}${b}^${e1+e2}` }; },
    () => { const b='x', e=getRandomInt(3,7); return { problem: `Simplify: \\(\\frac{${b}^${e}}{${b}^${e}}\\)`, answer: `1`, checkAnswer: "1" }; },
    () => { const b='y', e=getRandomInt(2,5); return { problem: `Simplify: \\(${b}^{-${e}}\\).`, answer: `\\(\\frac{1}{${b}^${e}}\\)` , checkAnswer: `1/${b}^${e}`}; },
    () => { const initial=getRandomInt(100,500), rate=1.1, time=getRandomInt(3,5); const final=(initial*(rate**time)).toFixed(2); return { problem: `A population of \\(${initial}\\) grows by 10% each year. Write an exponential function for the population P after t years. What is the population after \\(${time}\\) years?`, answer: `\\(P=${initial}(1.1)^t\\); After ${time} years: ${final}`, checkAnswer: final }; },
    () => { const initial=10000, rate=0.9, time=getRandomInt(2,4); const final=(initial*(rate**time)).toFixed(2); return { problem: `A car worth \\($${initial}\\) depreciates by 10% each year. Write a function for its value V. What is its value after \\(${time}\\) years?`, answer: `\\(V=10000(0.9)^t\\); After ${time} years: $${final}`, checkAnswer: final }; },
    () => { const b=getRandomInt(2,4); const graphId=`g-${Date.now()}`; return { problem: `Does the function \\(y=${b}^x\\) represent exponential growth or decay?`, answer: `Growth`, checkAnswer: "Growth", graphId, graphFunction:{functions:[{type:'expression',expression:`function(x){return ${b}**x;}`}],boundingbox:[-3,3,10,-1]} }; },
    () => { const b=0.5; const graphId=`g-${Date.now()}`; return { problem: `Does the function \\(y=(${b})^x\\) represent exponential growth or decay?`, answer: `Decay`, checkAnswer: "Decay", graphId, graphFunction:{functions:[{type:'expression',expression:`function(x){return ${b}**x;}`}],boundingbox:[-3,3,5,-1]} }; },
    () => { const c=getRandomInt(6,9), b='x', e1=getRandomInt(2,4), e2=getRandomInt(5,7); return { problem: `Simplify the expression \\(\\frac{${c}${b}^${e2}}{${c}${b}^${e1}}\\).`, answer: `\\(${b}^{${e2-e1}}\\)`, checkAnswer: `${b}^${e2-e1}` }; },
    () => { const b=getRandomInt(2,5); return { problem: `What is the y-intercept of the function \\(y=${b}^x\\)?`, answer: `(0, 1)`, checkAnswer: "0,1" }; },
    () => { return { problem: `Is the function \\(y=x^2\\) an exponential function?`, answer: `No, it's a quadratic function.`, checkAnswer: "No" }; },
    () => { const p=100, r=0.05, n=1, t=10; const a = p*(1+r/n)**(n*t); return { problem: `Use the formula \\(A=P(1+r/n)^{nt}\\) for \\(P=$${p}, r=0.05, n=1, t=${t}\\). Find A.`, answer: `\\($${a.toFixed(2)}\\)`, checkAnswer: a.toFixed(2) }; },
    () => { const num = [4,8,16,32]; return { problem: `Is the sequence \\(${num.join(', ')}\\) arithmetic or geometric?`, answer: `Geometric`, checkAnswer: "Geometric" }; },
    () => { const r=2; const seq=[3,6,12,24]; return { problem: `What is the common ratio of the geometric sequence: ${seq.join(', ')}?`, answer: `\\(${r}\\)`, checkAnswer: r.toString() }; },
    () => { const a=5, r=2, n=5; const term=a*r**(n-1); return { problem: `Find the 5th term of a geometric sequence with first term \\(${a}\\) and common ratio \\(${r}\\).`, answer: `\\(${term}\\)`, checkAnswer: term.toString() }; },
    () => { const b=getRandomInt(2,4); return { problem: `Compare \\(y=x^2\\) and \\(y=${b}^x\\) for large values of x. Which grows faster?`, answer: `The exponential function, \\(y=${b}^x\\)`, checkAnswer: `y=${b}^x` }; },
    () => { const half_life=10; const initial=100; const time=30; const final=initial*(0.5)**(time/half_life); return { problem: `A substance has a half-life of ${half_life} years. If you start with ${initial}g, how much is left after ${time} years?`, answer: `\\(${final}\\)g`, checkAnswer: final.toString() }; }
];
function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Exponential functions involve a variable in the exponent." };
}
export const module = { topicId: '9M6', topicName: 'Exponents & Exponential Functions', generateProblem: generate };