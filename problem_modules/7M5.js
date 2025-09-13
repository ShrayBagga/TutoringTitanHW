// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function formatAnswer(val, p=2) { return parseFloat(val.toFixed(p)).toString().replace(/\.00$/, ''); }

const problemGenerators = [
    () => { const x = getRandomInt(3, 8); const add = getRandomInt(5, 10); return { problem: `Solve for x: \\(x + ${add} > ${x+add}\\)`, answer: `\\(x > ${x}\\)`, checkAnswer: `x>${x}` }; },
    () => { const x = getRandomInt(10, 20); const sub = getRandomInt(2, 8); return { problem: `Solve for x: \\(x - ${sub} \\le ${x-sub}\\)`, answer: `\\(x \\le ${x}\\)`, checkAnswer: `x<=${x}` }; },
    () => { const x = getRandomInt(2, 6); const mult = getRandomInt(3, 5); return { problem: `Solve for n: \\(${mult}n < ${mult*x}\\)`, answer: `\\(n < ${x}\\)`, checkAnswer: `n<${x}` }; },
    () => { const x = getRandomInt(2, 5); const mult = -getRandomInt(2, 4); return { problem: `Solve for y: \\(${mult}y \\ge ${mult*x}\\)`, answer: `\\(y \\le ${x}\\)`, checkAnswer: `y<=${x}`, hint:"Remember to flip the inequality sign when multiplying or dividing by a negative number." }; },
    () => { const val = getRandomInt(-2, 3); return { problem: `Graph the inequality \\(x \\ge ${val}\\) on a number line.`, answer: `A closed circle at \\(${val}\\) with an arrow pointing to the right.`, checkAnswer: `closed circle at ${val} arrow right` }; },
    () => { const val = getRandomInt(0, 5); return { problem: `Graph \\(n < ${val}\\).`, answer: `An open circle at \\(${val}\\) with an arrow pointing to the left.`, checkAnswer: `open circle at ${val} arrow left` }; },
    () => { const x = getRandomInt(2, 5); const c1 = 2, c2 = 5; return { problem: `Solve: \\(${c1}x + ${c2} > ${c1*x+c2-1}\\)`, answer: `\\(x > ${x-1}\\)`, checkAnswer: `x>${x-1}` }; },
    () => { const x = getRandomInt(3, 6); const c1 = -3, c2 = 10; return { problem: `Solve: \\(${c1}x + ${c2} \\le ${c1*x+c2+3}\\)`, answer: `\\(x \\ge ${x-1}\\)`, checkAnswer: `x>=${x-1}` }; },
    () => { const c = getRandomInt(5, 10); return { problem: `Write an inequality for: "A number is at most \\(${c}\\)".`, answer: `\\(x \\le ${c}\\)`, checkAnswer: `x<=${c}` }; },
    () => { const c = getRandomInt(15, 20); return { problem: `Write an inequality for: "A number is at least \\(${c}\\)".`, answer: `\\(x \\ge ${c}\\)`, checkAnswer: `x>=${c}` }; },
    () => { const limit = 55; return { problem: `The speed limit \\(s\\) on a highway is \\(${limit}\\) mph. Write an inequality representing a legal speed.`, answer: `\\(s \\le ${limit}\\)`, checkAnswer: `s<=${limit}` }; },
    () => { const needed = 200; const saved = getRandomInt(50, 100); return { problem: `You need to save at least \\($${needed}\\). You have already saved \\($${saved}\\). Write an inequality for the amount \\(m\\) you still need.`, answer: `\\(m \\ge ${needed-saved}\\)`, checkAnswer: `m>=${needed-saved}` }; },
    () => { const x = -2; return { problem: `Is \\(x=${x}\\) a solution to the inequality \\(3x - 1 < -5\\)?`, answer: `Yes, because -7 is less than -5.`, checkAnswer: `Yes` }; },
    () => { const n = 5; return { problem: `Is \\(n=${n}\\) a solution to \\(-2n + 4 \\ge -6\\)?`, answer: `Yes, because -6 is greater than or equal to -6.`, checkAnswer: `Yes` }; },
    () => { const x = 10; return { problem: `Is \\(x=${x}\\) a solution to \\(\\frac{x}{5} + 3 > 5\\)?`, answer: `No, because 5 is not greater than 5.`, checkAnswer: `No` }; },
    () => { const limit = 10; const weight = getRandomInt(11, 15); return { problem: `An elevator has a weight limit of \\(w \\le ${limit*100}\\) pounds. A person weighs \\(${weight*10}\\) pounds. Is this allowed?`, answer: `Yes`, checkAnswer: `Yes` }; },
    () => { const temp = getRandomInt(75, 85); return { problem: `To be comfortable, the temperature \\(t\\) in a room should be greater than 70 degrees F. Is a temperature of \\(${temp}^{\\circ}\\)F comfortable?`, answer: `Yes`, checkAnswer: `Yes` }; },
    () => { const x = getRandomInt(3, 6); const d = 2; const c = 5; return { problem: `Solve: \\(\\frac{x}{${d}} - ${c} > ${x/d - c - 1}\\)`, answer: `\\(x > ${2*(x/d-c-1+c)}\\)`, checkAnswer: `x>${2*(x/d-c-1+c)}` }; },
    () => { const x = getRandomInt(2,4); const c1=5, c2=2, c3=8; return { problem: `Solve for x: \\(${c1}(x + ${c2}) < ${c1*(x+c2)+5}\\)`, answer: `\\(x < ${x+1}\\)`, checkAnswer: `x<${x+1}` }; },
    () => { const budget = 50; const cost = 8; const num = Math.floor(budget/cost); return { problem: `You have \\($${budget}\\) to spend on books that cost \\($${cost}\\) each. Write and solve an inequality for the number of books \\(b\\) you can buy.`, answer: `\\(8b \\le 50\\); \\(b \\le ${num}\\). You can buy up to ${num} books.`, checkAnswer: `b<=${num}` }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Isolate the variable. Flip the inequality sign only when multiplying or dividing by a negative." };
}

export const module = {
    topicId: '7M5',
    topicName: 'Solving & Graphing Inequalities',
    generateProblem: generate
};
