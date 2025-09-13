// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
const problemGenerators = [
    () => { const d=getRandomInt(3,6); const c=getRandomInt(2,7); return { problem: `What is the degree of the polynomial \\(5x^${d} - 2x^2 + ${c}\\)?`, answer: `\\(${d}\\)`, checkAnswer: d.toString() }; },
    () => { const c1=getRandomInt(2,5),p1=2,c2=getRandomInt(3,6),p2=1,c3=getRandomInt(4,8); const c4=getRandomInt(1,4),p4=2,c5=getRandomInt(2,5),p5=1; return { problem: `Add the polynomials: \\((${c1}x^${p1} + ${c2}x - ${c3}) + (${c4}x^${p4} - ${c5}x + 1)\\)`, answer: `\\(${(c1+c4)}x^2 + ${(c2-c5)}x - ${c3-1}\\)`, checkAnswer: `${c1+c4}x^2+${c2-c5}x-${c3-1}` }; },
    () => { const c1=getRandomInt(5,8),c2=getRandomInt(2,4),c3=getRandomInt(1,5); const c4=getRandomInt(2,4),c5=getRandomInt(1,3),c6=getRandomInt(2,6); return { problem: `Subtract: \\((${c1}x^2 - ${c2}x + ${c3}) - (${c4}x^2 + ${c5}x - ${c6})\\)`, answer: `\\(${(c1-c4)}x^2 - ${(c2+c5)}x + ${c3+c6}\\)`, checkAnswer: `${c1-c4}x^2-${c2+c5}x+${c3+c6}` }; },
    () => { const c1=getRandomInt(2,5); const c2=getRandomInt(3,6),c3=getRandomInt(2,4); return { problem: `Multiply: \\(${c1}x(${c2}x + ${c3})\\)`, answer: `\\(${c1*c2}x^2 + ${c1*c3}x\\)`, checkAnswer: `${c1*c2}x^2+${c1*c3}x` }; },
    () => { const a=getRandomInt(2,6), b=getRandomInt(2,6); return { problem: `Multiply using FOIL: \\((x + ${a})(x + ${b})\\)`, answer: `\\(x^2 + ${a+b}x + ${a*b}\\)`, checkAnswer: `x^2+${a+b}x+${a*b}` }; },
    () => { const a=getRandomInt(3,7), b=getRandomInt(2,5); return { problem: `Multiply: \\((x - ${a})(x + ${b})\\)`, answer: `\\(x^2 + ${b-a}x - ${a*b}\\)`, checkAnswer: `x^2+${b-a}x-${a*b}` }; },
    () => { const a=getRandomInt(2,6); return { problem: `Find the special product: \\((x + ${a})^2\\)`, answer: `\\(x^2 + ${2*a}x + ${a*a}\\)`, checkAnswer: `x^2+${2*a}x+${a*a}` }; },
    () => { const a=getRandomInt(3,7); return { problem: `Find the special product: \\((x - ${a})^2\\)`, answer: `\\(x^2 - ${2*a}x + ${a*a}\\)`, checkAnswer: `x^2-${2*a}x+${a*a}` }; },
    () => { const a=getRandomInt(4,8); return { problem: `Find the special product: \\((x + ${a})(x - ${a})\\)`, answer: `\\(x^2 - ${a*a}\\)`, checkAnswer: `x^2-${a*a}` }; },
    () => { const c=getRandomInt(2,5)*3, d=getRandomInt(2,5)*3; return { problem: `Factor out the greatest common factor (GCF): \\(${c}x + ${d}y\\)`, answer: `\\(3(${c/3}x + ${d/3}y)\\)`, checkAnswer: `3(${c/3}x+${d/3}y)` }; },
    () => { const a=getRandomInt(2,6), b=getRandomInt(3,7); return { problem: `Factor the trinomial: \\(x^2 + ${a+b}x + ${a*b}\\)`, answer: `\\((x+${a})(x+${b})\\)`, checkAnswer: `(x+${a})(x+${b})` }; },
    () => { const a=-getRandomInt(2,6), b=getRandomInt(3,7); return { problem: `Factor: \\(x^2 + ${a+b}x + ${a*b}\\)`, answer: `\\((x+${a})(x+${b})\\)`, checkAnswer: `(x${a})(x+${b})` }; },
    () => { const a=getRandomInt(4,9); return { problem: `Factor the difference of squares: \\(x^2 - ${a*a}\\)`, answer: `\\((x - ${a})(x + ${a})\\)`, checkAnswer: `(x-${a})(x+${a})` }; },
    () => { const a=getRandomInt(2,5); return { problem: `Factor the perfect square trinomial: \\(x^2 + ${2*a}x + ${a*a}\\)`, answer: `\\((x+${a})^2\\)`, checkAnswer: `(x+${a})^2` }; },
    () => { const a=2, b=3, c=1; const poly=`2x^2+7x+3`; return { problem: `Factor the trinomial by grouping: \\(${poly}\\)`, answer: `\\((2x+1)(x+3)\\)`, checkAnswer: `(2x+1)(x+3)` }; },
    () => { return { problem: `A polynomial with two terms is called a _____.`, answer: `Binomial`, checkAnswer: "Binomial" }; },
    () => { return { problem: `A polynomial with three terms is called a _____.`, answer: `Trinomial`, checkAnswer: "Trinomial" }; },
    () => { const s=getRandomInt(3,7); const expr = `x+${s}`; return { problem: `The area of a rectangle is \\(x^2+${s+2}x+${2*s}\\). If one side is \\((x+2)\\), what is the other side?`, answer: `\\(${expr}\\)`, checkAnswer: expr }; },
    () => { return { problem: `Can \\(x^2 + 25\\) be factored using real numbers?`, answer: `No, it is a sum of squares and is prime.`, checkAnswer: "No" }; },
    () => { const c=getRandomInt(2,4); return { problem: `Factor completely: \\(${c}x^2 - ${c*16}\\)`, answer: `\\(${c}(x-4)(x+4)\\)`, checkAnswer: `${c}(x-4)(x+4)` }; }
];
function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Look for patterns like GCF, difference of squares, or trinomials." };
}
export const module = { topicId: '9M7', topicName: 'Polynomials & Factoring', generateProblem: generate };