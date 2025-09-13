// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { const num = getRandomInt(-50, -5); return { problem: `What is the absolute value of \\(${num}\\)?`, answer: `\\(${Math.abs(num)}\\)`, checkAnswer: Math.abs(num).toString() }; },
    () => { const n1 = getRandomInt(-10, 10); const n2 = getRandomInt(-10, 10); const op = n1 > n2 ? '>' : '<'; return { problem: `Use < or > to compare the integers: \\(${n1}\\) ___ \\(${n2}\\)`, answer: `\\(${op}\\)`, checkAnswer: op }; },
    () => { const temp = getRandomInt(-20, -5); return { problem: `The temperature was \\(${temp}^{\\circ}\\)C. Represent this as an integer.`, answer: `\\(${temp}\\)`, checkAnswer: temp.toString() }; },
    () => { const depth = getRandomInt(100, 500); return { problem: `A submarine is \\(${depth}\\) feet below sea level. Represent its position as an integer.`, answer: `\\(-${depth}\\)`, checkAnswer: `-${depth}` }; },
    () => { const num = getRandomInt(15, 30); return { problem: `What is the opposite of \\(${num}\\)?`, answer: `\\(-${num}\\)`, checkAnswer: `-${num}` }; },
    () => { const num = getRandomInt(-30, -15); return { problem: `What is the opposite of \\(${num}\\)?`, answer: `\\(${Math.abs(num)}\\)`, checkAnswer: Math.abs(num).toString() }; },
    () => { const x = getRandomInt(-5, 5); const y = getRandomInt(-5, 5); return { problem: `Find the distance between \\(${x}\\) and \\(${y}\\) on a number line.`, answer: `\\(${Math.abs(x - y)}\\)`, checkAnswer: Math.abs(x - y).toString() }; },
    () => { const nums = [-getRandomInt(1,5), getRandomInt(1,5), 0, -getRandomInt(6,10), getRandomInt(6,10)].sort((a,b)=>a-b).join(', '); return { problem: `Order the integers from least to greatest: \\(${[...nums.split(', ')].sort(() => Math.random() - 0.5).join(', ')}\\)`, answer: `\\(${nums}\\)`, checkAnswer: nums.replace(/ /g, '') }; },
    () => { const amount = getRandomInt(50, 100); return { problem: `A withdrawal of \\($${amount}\\) from a bank account can be represented by what integer?`, answer: `\\(-${amount}\\)`, checkAnswer: `-${amount}` }; },
    () => { const gain = getRandomInt(5, 15); return { problem: `A football team gained \\(${gain}\\) yards on a play. Represent this as an integer.`, answer: `\\(+${gain}\\) or \\(${gain}\\)`, checkAnswer: gain.toString() }; },
    () => { const x = getRandomInt(2, 6); return { problem: `Which is greater: \\(${x}\\) or its opposite?`, answer: `\\(${x}\\)`, checkAnswer: x.toString() }; },
    () => { const x = getRandomInt(-6, -2); return { problem: `Which is greater: \\(${x}\\) or its opposite?`, answer: `\\(${Math.abs(x)}\\)`, checkAnswer: Math.abs(x).toString() }; },
    () => { const temp1 = getRandomInt(5, 15); const temp2 = getRandomInt(-10, -1); return { problem: `The temperature rose from \\(${temp2}^{\\circ}\\)C to \\(${temp1}^{\\circ}\\)C. What was the change in temperature?`, answer: `\\(${temp1 - temp2}^{\\circ}\\)C`, checkAnswer: (temp1 - temp2).toString() }; },
    () => { return { problem: `What does \\(|-15|\\) represent?`, answer: `The distance of -15 from 0 on the number line.`, checkAnswer: "The distance of -15 from 0 on the number line." }; },
    () => { const n1 = getRandomInt(-8, -1); const n2 = getRandomInt(1, 8); return { problem: `Is the statement true or false? \\(${n1} > ${n2}\\)`, answer: `False`, checkAnswer: "False" }; },
    () => { const num = -getRandomInt(1, 10)/2; return { problem: `Locate \\(${num}\\) on a number line. Is it to the left or right of -1?`, answer: `To the ${num < -1 ? 'left' : 'right'}.`, checkAnswer: num < -1 ? 'left' : 'right' }; },
    () => { const n1 = getRandomInt(-5, 0); const n2 = getRandomInt(1, 5); return { problem: `A number \\(n\\) satisfies \\(${n1} < n < ${n2}\\). Which integer is a possible value of \\(n\\)?`, answer: `Any integer between \\(${n1}\\) and \\(${n2}\\), e.g., \\(${n1+1}\\).`, checkAnswer: (n1+1).toString() }; },
    () => { const elevationA = getRandomInt(100, 200); const elevationB = -getRandomInt(50, 100); return { problem: `City A is at an elevation of \\(${elevationA}\\) ft. City B is at \\(${elevationB}\\) ft. Which city has a higher elevation?`, answer: `City A`, checkAnswer: "City A" }; },
    () => { const num = getRandomInt(-10, 10); return { problem: `What is the value of \\(-(-${num}))\\)?`, answer: `\\(${num}\\)`, checkAnswer: num.toString() }; },
    () => { const n1 = -getRandomInt(1, 5); const n2 = -getRandomInt(6, 10); return { problem: `Which temperature is colder, \\(${n1}^{\\circ}\\)C or \\(${n2}^{\\circ}\\)C?`, answer: `\\(${n2}^{\\circ}\\)C`, checkAnswer: n2.toString() }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Think about a number line. Numbers to the right are greater." };
}

export const module = {
    topicId: '6M3',
    topicName: 'The Number System',
    generateProblem: generate
};
