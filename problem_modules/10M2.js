// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
const problemGenerators = [
    () => ({ problem: `Given that p is true and q is false, what is the truth value of the conjunction \\(p \\land q\\)? (1=true, 0=false)`, answer: `0`, checkAnswer: "0" }),
    () => ({ problem: `Given that p is true and q is false, what is the truth value of the disjunction \\(p \\lor q\\)? (1=true, 0=false)`, answer: `1`, checkAnswer: "1" }),
    () => ({ problem: `Given that p is true, what is the truth value of the negation \\(\\neg p\\)? (1=true, 0=false)`, answer: `0`, checkAnswer: "0" }),
    () => ({ problem: `Is the converse of "If a figure is a square, then it is a rectangle" true or false? (1=true, 0=false)`, answer: `0`, checkAnswer: "0" }),
    () => ({ problem: `Is the contrapositive of a true conditional statement always true or always false? (1=true, 0=false)`, answer: `1`, checkAnswer: "1" }),
    () => { const seq = [2,5,8,11]; return { problem: `Find the next number in the sequence using inductive reasoning: ${seq.join(', ')}`, answer: `14`, checkAnswer: "14" }; },
    () => { const val = getRandomInt(10, 20); return { problem: `Provide a numerical counterexample for the statement "All odd numbers are prime."`, answer: `9`, checkAnswer: "9" }; },
    () => { const angle = 90; return { problem: `Use the Law of Detachment. Given: "If an angle is a right angle, its measure is 90 degrees. Angle B is a right angle." What is the measure of angle B?`, answer: `\\(${angle}^{\\circ}\\)`, checkAnswer: angle.toString() }; },
    () => ({ problem: `Given "If p then q" and "If q then r", what statement follows from the Law of Syllogism?`, answer: `If p then r`, checkAnswer: "If p then r" }),
    () => ({ problem: `A statement that is written in "if-then" form is called a _____.`, answer: `conditional`, checkAnswer: "conditional" }),
    () => ({ problem: `The "if" part of an if-then statement is the _____.`, answer: `hypothesis`, checkAnswer: "hypothesis" }),
    () => ({ problem: `The "then" part of an if-then statement is the _____.`, answer: `conclusion`, checkAnswer: "conclusion" }),
    () => ({ problem: `A statement formed by switching the hypothesis and conclusion is the _____.`, answer: `converse`, checkAnswer: "converse" }),
    () => ({ problem: `A statement formed by negating both the hypothesis and conclusion is the _____.`, answer: `inverse`, checkAnswer: "inverse" }),
    () => ({ problem: `Reasoning based on patterns is called _____.`, answer: `inductive`, checkAnswer: "inductive" }),
    () => ({ problem: `Reasoning based on facts, definitions, and logic is called _____.`, answer: `deductive`, checkAnswer: "deductive" }),
    () => { const seq = [3, 6, 12, 24]; return { problem: `Find the next number in the sequence: ${seq.join(', ')}`, answer: `48`, checkAnswer: "48" }; },
    () => ({ problem: `Given p is false and q is true, what is the truth value of \\(p \\rightarrow q\\)? (1=true, 0=false)`, answer: `1`, checkAnswer: "1" }),
    () => ({ problem: `A statement that can be written as "p if and only if q" is a _____.`, answer: `biconditional`, checkAnswer: "biconditional" }),
    () => ({ problem: `Provide a numerical counterexample for "The square root of a number is always smaller than the number."`, answer: `1`, checkAnswer: "1" }),
];
function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Understand conditional statements, converse, inverse, and contrapositive." };
}
export const module = { topicId: '10M2', topicName: 'Logic & Reasoning', generateProblem: generate };