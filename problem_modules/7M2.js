// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function formatAnswer(val, p=2) { return parseFloat(val.toFixed(p)).toString().replace(/\.00$/, ''); }

const problemGenerators = [
    () => { const c1 = getRandomInt(2, 7); const v1 = getRandomInt(3, 8); const c2 = -getRandomInt(2, 5); return { problem: `Simplify the expression: \\(${c1}x + ${v1} + ${c2}x\\)`, answer: `\\(${(c1+c2)}x + ${v1}\\)`, checkAnswer: `${c1+c2}x+${v1}` }; },
    () => { const a = getRandomInt(-5, -2); const b = getRandomInt(3, 7); const c = getRandomInt(2, 5); return { problem: `Use the distributive property to expand: \\(${a}(${b}x - ${c})\\)`, answer: `\\(${a*b}x - ${a*c}\\)`, checkAnswer: `${a*b}x-${a*c}` }; },
    () => { const c1 = getRandomInt(4, 8) * 2; const c2 = getRandomInt(3, 6) * 2; const gcf = 2; return { problem: `Factor the expression: \\(${c1}y - ${c2}\\)`, answer: `\\(${gcf}(${c1/gcf}y - ${c2/gcf})\\)`, checkAnswer: `${gcf}(${c1/gcf}y-${c2/gcf})` }; },
    () => { const x = getRandomInt(2, 6); const c1 = getRandomInt(2, 5); const c2 = getRandomInt(5, 10); return { problem: `Solve for x: \\(${c1}x + ${c2} = ${c1*x+c2}\\)`, answer: `\\(x = ${x}\\)`, checkAnswer: x.toString() }; },
    () => { const y = getRandomInt(3, 8); const c1 = getRandomInt(2, 4); const c2 = getRandomInt(1, 5); return { problem: `Solve for y: \\(${c1}(y - ${c2}) = ${c1*(y-c2)}\\)`, answer: `\\(y = ${y}\\)`, checkAnswer: y.toString() }; },
    () => { const item = ["pencils", "erasers", "notebooks"][getRandomInt(0,2)]; const cost = getRandomInt(5, 15)/10; const num = getRandomInt(3, 7); const total = cost*num; return { problem: `The cost of one ${item} is \\($${cost.toFixed(2)}\\). Write an expression for the cost of \\(n\\) ${item}. If \\(n=${num}\\), what is the total cost?`, answer: `Expression: \\(${cost.toFixed(2)}n\\); Total Cost: \\($${total.toFixed(2)}\\)`, checkAnswer: total.toFixed(2) }; },
    () => { const initial = getRandomInt(20, 50); const fee = getRandomInt(3, 5); const weeks = getRandomInt(4, 8); const final = initial - fee*weeks; return { problem: `You have \\($${initial}\\) in an account. You withdraw \\($${fee}\\) each week for \\(w\\) weeks. Write an expression for the remaining amount. How much is left after \\(${weeks}\\) weeks?`, answer: `Expression: \\(${initial} - ${fee}w\\); Amount left: \\($${final}\\)`, checkAnswer: final.toString() }; },
    () => { const l = '2w - 3'; const w = getRandomInt(5, 10); const actualL = 2*w-3; const perimeter = 2*(actualL+w); return { problem: `The length of a rectangle is 3 less than twice its width (\\(l = ${l}\\)). If the width is \\(${w}\\) cm, what is the perimeter?`, answer: `\\(${perimeter}\\) cm`, checkAnswer: perimeter.toString() }; },
    () => { const a = getRandomInt(2,5), b = getRandomInt(2,5), c = getRandomInt(10,20); return { problem: `Write an equation for: "The sum of a number \\(x\\) and \\(${a}\\) is \\(${b}\\)."`, answer: `\\(x + ${a} = ${b}\\)`, checkAnswer: `x+${a}=${b}` }; },
    () => { const x = getRandomInt(-5, -2); const c1 = 3, c2 = 5; const res = c1*x-c2; return { problem: `Solve for x: \\(${c1}x - ${c2} = ${res}\\)`, answer: `\\(x=${x}\\)`, checkAnswer: x.toString() }; },
    () => { const n = getRandomInt(20, 30); const c1 = 2, c2 = 10; const res = n/c1 + c2; return { problem: `Solve for n: \\(\\frac{n}{${c1}} + ${c2} = ${res}\\)`, answer: `\\(n=${n}\\)`, checkAnswer: n.toString() }; },
    () => { const x = getRandomInt(2, 4); const c1 = 5, c2 = 2, c3 = 1; const res = c1*x + c3 - c2*x; return { problem: `Solve for x: \\(${c1}x + ${c3} = ${c2}x + ${res+c2*x-c3}\\)`, answer: `\\(x=${x}\\)`, checkAnswer: x.toString() }; },
    () => { const p = getRandomInt(50, 100); const i = 0.05; const t = getRandomInt(2, 5); const interest = p*i*t; return { problem: `The formula for simple interest is \\(I = prt\\). Find the interest \\(I\\) if the principal \\(p\\) is \\($${p}\\), the rate \\(r\\) is \\(0.05\\), and the time \\(t\\) is \\(${t}\\) years.`, answer: `\\($${interest.toFixed(2)}\\)`, checkAnswer: interest.toFixed(2) }; },
    () => { const f = getRandomInt(50, 70); const c = (f-32)*5/9; return { problem: `Use the formula \\(C = \\frac{5}{9}(F - 32)\\) to convert \\(${f}^{\\circ}\\)F to Celsius.`, answer: `\\(${formatAnswer(c, 1)}\\)^{\\circ}\\)C`, checkAnswer: formatAnswer(c,1) }; },
    () => { const apples = getRandomInt(3,6); const cost = 1.5; const tax = 0.1; const total = apples * cost * (1+tax); return { problem: `Apples cost \\($${cost.toFixed(2)}\\) each. You buy \\(${apples}\\) apples. With a \\(${tax*100}\\%\\) sales tax, what is the total cost?`, answer: `\\($${total.toFixed(2)}\\)`, checkAnswer: total.toFixed(2) }; },
    () => { const x = 2.5; const c1 = 2; const c2 = 3; const res = c1*x + c2; return { problem: `Solve for x: \\(${c1}x + ${c2} = ${res}\\)`, answer: `\\(x=${x}\\)`, checkAnswer: x.toString() }; },
    () => { const x = 'x'; const y = 'y'; const c1=getRandomInt(2,4),c2=getRandomInt(3,5),c3=getRandomInt(4,6),c4=getRandomInt(5,7); return { problem: `Add the expressions: \\((${c1}x + ${c2}y)\\) and \\((${c3}x - ${c4}y)\\)`, answer: `\\(${(c1+c3)}x + ${(c2-c4)}y\\)`, checkAnswer: `${c1+c3}x+${c2-c4}y` }; },
    () => { const x = 'x'; const y = 'y'; const c1=getRandomInt(5,8),c2=getRandomInt(5,8),c3=getRandomInt(2,4),c4=getRandomInt(2,4); return { problem: `Subtract \\((${c3}x - ${c4}y)\\) from \\((${c1}x + ${c2}y)\\)`, answer: `\\(${(c1-c3)}x + ${(c2+c4)}y\\)`, checkAnswer: `${c1-c3}x+${c2+c4}y` }; },
    () => { const w = 5; const l = 2*w+4; const area = w*l; return { problem: `The length of a rectangle is 4 more than twice its width. If the width is ${w} ft, what is the area?`, answer: `\\(${area}\\) ft\\(^{2}\\)`, checkAnswer: area.toString() }; },
    () => { const age = getRandomInt(10, 12); const relation = `3a - 5`; const dadAge = 3*age-5; return { problem: `A father's age is 5 years less than 3 times his son's age \\(a\\). If the son is \\(${age}\\) years old, how old is the father?`, answer: `\\(${dadAge}\\) years old`, checkAnswer: dadAge.toString() }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Remember to combine like terms and use inverse operations." };
}

export const module = {
    topicId: '7M2',
    topicName: 'Expressions & Equations',
    generateProblem: generate
};
