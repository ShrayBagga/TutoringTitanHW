// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
const problemGenerators = [
    () => { const a=getRandomInt(2,5), b=getRandomInt(3,6), c=getRandomInt(4,7); return { problem: `Evaluate using order of operations: \\(${a} + ${b} \\times ${c} - 4\\)`, answer: `\\(${a+b*c-4}\\)`, checkAnswer: (a+b*c-4).toString() }; },
    () => { const a=getRandomInt(2,4), b=getRandomInt(3,5), c=getRandomInt(2,3); return { problem: `Evaluate: \\((${a+b})^2 \\div ${c}\\)`, answer: `\\(${((a+b)**2)/c}\\)`, checkAnswer: (((a+b)**2)/c).toString() }; },
    () => { const x=getRandomInt(-5,5), y=getRandomInt(-5,5); const c1=getRandomInt(2,4), c2=getRandomInt(2,4); const res=c1*x-c2*y; return { problem: `Evaluate the expression \\(${c1}x - ${c2}y\\) for \\(x=${x}\\) and \\(y=${y}\\).`, answer: `\\(${res}\\)`, checkAnswer: res.toString() }; },
    () => { return { problem: `Identify the property shown: \\(a + b = b + a\\)`, answer: `Commutative Property of Addition`, checkAnswer: "Commutative Property of Addition" }; },
    () => { return { problem: `Identify the property shown: \\(a(b + c) = ab + ac\\)`, answer: `Distributive Property`, checkAnswer: "Distributive Property" }; },
    () => { return { problem: `Identify the property shown: \\((a + b) + c = a + (b + c)\\)`, answer: `Associative Property of Addition`, checkAnswer: "Associative Property of Addition" }; },
    () => { const num = getRandomInt(10,50); return { problem: `Is \\(${num}\\) a rational number, an integer, a whole number, or a natural number? List all that apply.`, answer: `Rational, Integer, Whole, Natural`, checkAnswer: "Rational,Integer,Whole,Natural" }; },
    () => { const num = -getRandomInt(5,15); return { problem: `To which set(s) of numbers does \\(${num}\\) belong? (Rational, Integer, Whole)`, answer: `Rational, Integer`, checkAnswer: "Rational,Integer" }; },
    () => { const num = Math.sqrt(getRandomInt(2,8)); return { problem: `Is \\(\\sqrt{${Math.round(num**2)}}\\) rational or irrational?`, answer: `Irrational`, checkAnswer: "Irrational" }; },
    () => { const c1=getRandomInt(3,7), c2=getRandomInt(2,5), c3=getRandomInt(4,8); const expr = `${c1}x + ${c2}y - ${c3}`; return { problem: `Identify the terms, coefficients, and constant in the expression \\(${expr}\\).`, answer: `Terms: ${c1}x, ${c2}y, -${c3}. Coefficients: ${c1}, ${c2}. Constant: -${c3}`, checkAnswer: `${c1}x,${c2}y,-${c3}` }; },
    () => { const n1=getRandomInt(2,5), d1=getRandomInt(6,9), n2=getRandomInt(3,6), d2=getRandomInt(7,10); return { problem: `Simplify the expression: \\(\\frac{${n1}}{${d1}} + \\frac{${n2}}{${d2}}\\).`, answer: `\\(\\frac{${n1*d2+n2*d1}}{${d1*d2}}\\)` , checkAnswer: `${n1*d2+n2*d1}/${d1*d2}`}; },
    () => { const num=getRandomInt(10,20); return { problem: `What is the multiplicative inverse (reciprocal) of \\(${num}\\)?`, answer: `\\(\\frac{1}{${num}}\\)` , checkAnswer: `1/${num}`}; },
    () => { const num=getRandomInt(5,15); return { problem: `What is the additive inverse (opposite) of \\(${num}\\)?`, answer: `\\(-${num}\\)` , checkAnswer: `-${num}`}; },
    () => { const c=getRandomInt(2,5); const v1=getRandomInt(3,6); const v2=getRandomInt(2,4); const expr=`${c}x + ${v1} - ${v2}x`; const res=`${c-v2}x + ${v1}`; return { problem: `Simplify by combining like terms: \\(${expr}\\).`, answer: `\\(${res}\\)`, checkAnswer: res }; },
    () => { const n=getRandomInt(5,10), d=getRandomInt(2,4); return { problem: `Translate to an algebraic expression: "The quotient of a number and \\(${d}\\), increased by \\(${n}\\)."`, answer: `\\(\\frac{x}{${d}} + ${n}\\)`, checkAnswer: `x/${d}+${n}` }; },
    () => { return { problem: `Simplify \\(|-8| + |3|\\).`, answer: `11`, checkAnswer: "11" }; },
    () => { const num=getRandomInt(100,200), percent=getRandomInt(10,25); const res=num*(percent/100); return { problem: `Find \\(${percent}\\%\\) of \\(${num}\\).`, answer: `\\(${res}\\)`, checkAnswer: res.toString() }; },
    () => { const a=getRandomInt(2,4), b=getRandomInt(3,5); return { problem: `Simplify the square root: \\(\\sqrt{${a*a*b}}\\).`, answer: `\\(${a}\\sqrt{${b}}\\)` , checkAnswer: `${a}sqrt(${b})`}; },
    () => { const num=-getRandomInt(20,50); return { problem: `Which is greater, \\(${num}\\) or \\(-|${num}|\\)?`, answer: `They are equal.`, checkAnswer: "equal" }; },
    () => { return { problem: `The set of whole numbers and their opposites is called the _____.`, answer: `Integers`, checkAnswer: "Integers" }; }
];
function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Follow the order of operations: PEMDAS." };
}
export const module = { topicId: '9M1', topicName: 'Foundations of Algebra', generateProblem: generate };