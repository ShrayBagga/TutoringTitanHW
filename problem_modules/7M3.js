// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function formatAnswer(val, p=2) { return parseFloat(val.toFixed(p)).toString().replace(/\.00$/, ''); }

const problemGenerators = [
    () => { const y = getRandomInt(10, 30); const x = getRandomInt(2, 5); const k = y/x; return { problem: `A car travels \\(${y}\\) miles in \\(${x}\\) hours. What is the constant of proportionality (unit rate) in miles per hour?`, answer: `\\(${k}\\) mph`, checkAnswer: k.toString() }; },
    () => { const k = getRandomInt(2, 6); return { problem: `Does the equation \\(y = ${k}x\\) represent a proportional relationship?`, answer: `Yes`, checkAnswer: "Yes" }; },
    () => { const k = getRandomInt(2, 6); const b = getRandomInt(1, 5); return { problem: `Does the equation \\(y = ${k}x + ${b}\\) represent a proportional relationship?`, answer: `No, because of the added constant \\(+${b}\\).`, checkAnswer: "No" }; },
    () => { const k = 1.50; const x = getRandomInt(3, 8); const y = k*x; return { problem: `Apples cost \\($${k.toFixed(2)}\\) per pound. What is the cost of \\(${x}\\) pounds of apples?`, answer: `\\($${y.toFixed(2)}\\)`, checkAnswer: y.toFixed(2) }; },
    () => { const k = 3; const graphId = `graph-${Date.now()}`; const graphFunction = { functions: [{ type: 'expression', expression: `function(x){ return ${k}*x; }` }], boundingbox: [0, 5, 16, 0] }; return { problem: `What is the constant of proportionality \\(k\\) in the equation \\(y=kx\\) represented by the graphed line?`, answer: `\\(k=${k}\\)`, checkAnswer: k.toString(), graphId, graphFunction }; },
    () => { const x1=2, y1=8, x2=5, y2=20; return { problem: `The table shows a proportional relationship. Find the constant of proportionality. \n\n| x | ${x1} | ${x2} |\n|:---:|:---:|:---:|\n| y | ${y1} | ${y2} |`, answer: `\\(k = 4\\)`, checkAnswer: "4", hint:"Find y/x for any pair." }; },
    () => { const x1=3, y1=getRandomInt(4,6), x2=getRandomInt(7,10); const y2 = (y1/x1)*x2; return { problem: `If \\(y\\) is proportional to \\(x\\), and \\(y=${y1}\\) when \\(x=${x1}\\), what is \\(y\\) when \\(x=${x2}\\)?`, answer: `\\(y=${formatAnswer(y2)}\\)`, checkAnswer: formatAnswer(y2) }; },
    () => { return { problem: `What are the two key characteristics of the graph of a proportional relationship?`, answer: `It is a straight line, and it passes through the origin (0,0).`, checkAnswer: "straight line, passes through origin" }; },
    () => { const miles = getRandomInt(5, 8); const cm = miles * 2.5; return { problem: `On a map, \\(1\\) cm represents \\(2.5\\) miles. If two cities are \\(${miles}\\) cm apart on the map, what is the actual distance?`, answer: `\\(${cm}\\) miles`, checkAnswer: cm.toString() }; },
    () => { const words = getRandomInt(120, 180); const minutes = getRandomInt(3, 5); const rate = words/minutes; return { problem: `You can type \\(${words}\\) words in \\(${minutes}\\) minutes. What is your typing speed in words per minute?`, answer: `\\(${rate}\\) words per minute`, checkAnswer: rate.toString() }; },
    () => { const p1 = 20, v1 = 5, p2 = 32; const v2 = (v1/p1)*p2; return { problem: `A recipe calls for \\(${v1}\\) cups of flour for \\(${p1}\\) cookies. How much flour do you need for \\(${p2}\\) cookies?`, answer: `\\(${v2}\\) cups`, checkAnswer: v2.toString() }; },
    () => { const k = getRandomInt(2,4)*10; const x = getRandomInt(2,5); return { problem: `A machine produces \\(${k}\\) widgets per hour. Write an equation relating the number of widgets \\(y\\) to the hours \\(x\\).`, answer: `\\(y = ${k}x\\)`, checkAnswer: `y=${k}x` }; },
    () => { const graphId = `graph-${Date.now()}`; const graphFunction = { functions: [{ type: 'point', x: 1, y: 5, options:{name:'(1, 5)'} }], boundingbox: [0, 6, 6, 0] }; return { problem: `A graph of a proportional relationship passes through the point (1, 5). What is the equation of the line?`, answer: `\\(y = 5x\\)`, checkAnswer: `y=5x`, graphId, graphFunction }; },
    () => { const frac_k_n = 2, frac_k_d = 3; const x = getRandomInt(6, 12); const y = (frac_k_n/frac_k_d)*x; return { problem: `The constant of proportionality is \\(\\frac{${frac_k_n}}{${frac_k_d}}\\). If \\(x=${x}\\), what is \\(y\\)?`, answer: `\\(y=${y}\\)`, checkAnswer: y.toString() }; },
    () => { const recipe = {sugar: 1.5, flour: 2.5}; const multiplier = 3; return { problem: `A recipe uses 1.5 cups of sugar for every 2.5 cups of flour. If you use ${recipe.flour * multiplier} cups of flour, how much sugar do you need?`, answer: `\\(${recipe.sugar * multiplier}\\) cups of sugar`, checkAnswer: (recipe.sugar*multiplier).toString() }; },
    () => { return { problem: `Identify the unit rate if you earn $45 in 5 hours.`, answer: `\\($9\\) per hour`, checkAnswer: "9" }; },
    () => { const discount = 15; const items = 3; const unit_discount = discount/items; return { problem: `A store offers a \\($${discount}\\) discount for every \\(${items}\\) items purchased. What is the discount per item?`, answer: `\\($${unit_discount}\\) per item`, checkAnswer: unit_discount.toString() }; },
    () => { const k = 0.75; const x = 12; const y = k*x; return { problem: `The equation \\(y = ${k}x\\) relates cost \\(y\\) to pounds of bananas \\(x\\). What is the cost for \\(${x}\\) pounds?`, answer: `\\($${y}\\)`, checkAnswer: y.toString() }; },
    () => { return { problem: `The point (1, k) on the graph of a proportional relationship gives what key piece of information?`, answer: `The value of k, the constant of proportionality (or unit rate).`, checkAnswer: "constant of proportionality" }; },
    () => { const water = 128; const bottles = 8; const rate = water / bottles; return { problem: `A pack of \\(${bottles}\\) bottles of water contains a total of \\(${water}\\) fluid ounces. What is the unit rate in ounces per bottle?`, answer: `\\(${rate}\\) ounces per bottle`, checkAnswer: rate.toString() }; },
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "In a proportional relationship, the ratio y/x is always constant." };
}

export const module = {
    topicId: '7M3',
    topicName: 'Ratios & Proportional Relationships',
    generateProblem: generate
};
