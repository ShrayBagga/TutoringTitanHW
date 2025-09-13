// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function formatAnswer(val, p=1) { return parseFloat(val.toFixed(p)).toString().replace(/\.0$/, ''); }

const pythagoreanTriples = [[3,4,5], [5,12,13], [8,15,17], [7,24,25]];

const problemGenerators = [
    () => { const t = pythagoreanTriples[getRandomInt(0,3)]; const a=t[0], b=t[1], c=t[2]; return { problem: `A right triangle has legs of length \\(${a}\\) and \\(${b}\\). What is the length of the hypotenuse?`, answer: `\\(${c}\\)`, checkAnswer: c.toString() }; },
    () => { const t = pythagoreanTriples[getRandomInt(0,3)]; const a=t[0], b=t[1], c=t[2]; return { problem: `The hypotenuse of a right triangle is \\(${c}\\) and one leg is \\(${a}\\). Find the length of the other leg.`, answer: `\\(${b}\\)`, checkAnswer: b.toString() }; },
    () => { const a=getRandomInt(5,8), b=getRandomInt(6,9); const c=Math.sqrt(a*a+b*b); return { problem: `The legs of a right triangle are \\(${a}\\) and \\(${b}\\). Find the hypotenuse. Round to one decimal place.`, answer: `\\(${formatAnswer(c)}\\)`, checkAnswer: formatAnswer(c) }; },
    () => { const c=getRandomInt(10,15), a=getRandomInt(5,9); const b=Math.sqrt(c*c-a*a); return { problem: `A right triangle has a hypotenuse of \\(${c}\\) and a leg of \\(${a}\\). Find the other leg. Round to one decimal place.`, answer: `\\(${formatAnswer(b)}\\)`, checkAnswer: formatAnswer(b) }; },
    () => { const x1=getRandomInt(1,3),y1=getRandomInt(1,3),x2=x1+getRandomInt(3,5),y2=y1+getRandomInt(4,7); const d=Math.sqrt((x2-x1)**2+(y2-y1)**2); return { problem: `Find the distance between points (\\(${x1},${y1}\\)) and (\\(${x2},${y2}\\)). Round to one decimal place.`, answer: `\\(${formatAnswer(d)}\\)`, checkAnswer: formatAnswer(d) }; },
    () => { const a=getRandomInt(5,8), b=a+getRandomInt(1,3), c=b+getRandomInt(1,3); return { problem: `Do side lengths \\(${a}, ${b}, ${c}\\) form a right triangle?`, answer: `No`, checkAnswer: "No" }; },
    () => { const t = pythagoreanTriples[0]; const m = getRandomInt(2,4); const a=t[0]*m, b=t[1]*m, c=t[2]*m; return { problem: `Do side lengths \\(${a}, ${b}, ${c}\\) form a right triangle?`, answer: `Yes`, checkAnswer: "Yes" }; },
    () => { return { problem: `What is the Pythagorean theorem formula?`, answer: `\\(a^2 + b^2 = c^2\\)`, checkAnswer: "a^2+b^2=c^2" }; },
    () => { const h=12, b=5; const l=13; return { problem: `A \\(${l}\\)-foot ladder leans against a wall. The base of the ladder is \\(${b}\\) feet from the wall. How high up the wall does the ladder reach?`, answer: `\\(${h}\\) feet`, checkAnswer: h.toString() }; },
    () => { const w=8, l=6; const d=10; return { problem: `A rectangular screen is \\(${w}\\) inches tall and \\(${l}\\) inches wide. What is the length of its diagonal?`, answer: `\\(${d}\\) inches`, checkAnswer: d.toString() }; },
    () => { const s=getRandomInt(5,10); const d=s*Math.sqrt(2); return { problem: `Find the length of the diagonal of a square with a side length of \\(${s}\\). Round to one decimal place.`, answer: `\\(${formatAnswer(d)}\\)`, checkAnswer: formatAnswer(d) }; },
    () => { return { problem: `The longest side of a right triangle is called the _____.`, answer: `Hypotenuse`, checkAnswer: "Hypotenuse" }; },
    () => { const a=9,b=12,c=15; return { problem: `A baseball diamond is a square with 90 feet between bases. How far is it from home plate to second base? (approx)`, answer: `~127.3 feet`, checkAnswer: "127.3" }; },
    () => { const x1=0,y1=0,x2=getRandomInt(3,6),y2=getRandomInt(4,8); const d=Math.sqrt(x2**2+y2**2); return { problem: `A helicopter takes off and flies ${x2} km east and ${y2} km north. How far is it from its starting point?`, answer: `\\(${formatAnswer(d)}\\) km`, checkAnswer: formatAnswer(d) }; },
    () => { const a=1.5, b=2.0, c=2.5; return { problem: `Do legs of \\(${a}\\) and \\(${b}\\) and hypotenuse of \\(${c}\\) form a right triangle?`, answer: `Yes`, checkAnswer: "Yes" }; },
    () => { return { problem: `What is the converse of the Pythagorean theorem?`, answer: `If the side lengths of a triangle satisfy a^2+b^2=c^2, then it is a right triangle.`, checkAnswer: "If a^2+b^2=c^2, it is a right triangle." }; },
    () => { const area=50, d=10; return { problem: `The diagonal of a square is \\(${d}\\) cm. What is its area?`, answer: `\\(${area}\\) cm\\(^{2}\\)`, checkAnswer: area.toString(), hint:"Use d^2 = 2s^2" }; },
    () => { const x=getRandomInt(3,6); const graphId=`g-${Date.now()}`; const graphFunc={functions:[{type:'point',x:0,y:0},{type:'point',x:x,y:0},{type:'point',x:0,y:x}]}; return { problem: `An isosceles right triangle is drawn with vertices at (0,0), (${x},0), and (0,${x}). Find the hypotenuse length.`, answer: `\\(${formatAnswer(x*Math.sqrt(2))}\\)`, checkAnswer: formatAnswer(x*Math.sqrt(2)), graphId, graphFunction:{functions:[{type:'point',x:0,y:0, options:{name:'A'}},{type:'point',x:x,y:0, options:{name:'B'}},{type:'point',x:0,y:x, options:{name:'C'}}], boundingbox:[-1,x+1,x+1,-1]} }; },
    () => { const d=13; const l=12; const w=5; return { problem: `A rectangular box has a length of ${l} in and a width of ${w} in. A pencil of length ${d} in is placed along the diagonal of the base. Does it fit?`, answer: `Yes, the diagonal is exactly ${d} inches.`, checkAnswer: "Yes" }; },
    () => { const t=pythagoreanTriples[getRandomInt(0,3)]; const s1=t[0], s2=t[1], s3=t[2]; return { problem: `Which side is the hypotenuse in a right triangle with sides \\(${s1}, ${s2}, ${s3}\\)?`, answer: `The longest side, \\(${s3}\\).`, checkAnswer: s3.toString() }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "a^2 + b^2 = c^2, where c is the hypotenuse." };
}

export const module = {
    topicId: '8M7',
    topicName: 'The Pythagorean Theorem',
    generateProblem: generate
};
