// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { const a=getRandomInt(1,5), b=getRandomInt(1,5), c=getRandomInt(1,5), d=getRandomInt(1,5); return { problem: `Find the determinant of the matrix \\(\\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix}\\).`, answer: `\\(${a*d-b*c}\\)`, checkAnswer: (a*d-b*c).toString() }; },
    () => { const a=getRandomInt(1,4),b=getRandomInt(1,4),c=getRandomInt(1,4),d=getRandomInt(1,4); const e=getRandomInt(1,4),f=getRandomInt(1,4),g=getRandomInt(1,4),h=getRandomInt(1,4); return { problem: `Add the matrices: \\(\\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix} + \\begin{pmatrix} ${e} & ${f} \\\\ ${g} & ${h} \\end{pmatrix}\\). What is the element in the first row, first column?`, answer: `\\(${a+e}\\)`, checkAnswer: (a+e).toString() }; },
    () => { const a=getRandomInt(5,9),b=getRandomInt(5,9),c=getRandomInt(5,9),d=getRandomInt(5,9); const e=getRandomInt(1,4),f=getRandomInt(1,4),g=getRandomInt(1,4),h=getRandomInt(1,4); return { problem: `Subtract the matrices: \\(\\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix} - \\begin{pmatrix} ${e} & ${f} \\\\ ${g} & ${h} \\end{pmatrix}\\). What is the element in the second row, second column?`, answer: `\\(${d-h}\\)`, checkAnswer: (d-h).toString() }; },
    () => { const s=getRandomInt(2,5); const a=getRandomInt(1,5), b=getRandomInt(1,5); return { problem: `Perform scalar multiplication: \\(${s} \\times \\begin{pmatrix} ${a} & ${b} \\\\ ${a+1} & ${b+1} \\end{pmatrix}\\). What is the top-left element?`, answer: `\\(${s*a}\\)`, checkAnswer: (s*a).toString() }; },
    () => { const a=getRandomInt(1,3),b=getRandomInt(1,3),c=getRandomInt(1,3),d=getRandomInt(1,3); const e=getRandomInt(2,4),f=getRandomInt(2,4),g=getRandomInt(2,4),h=getRandomInt(2,4); const res = a*e+b*g; return { problem: `Multiply the matrices: \\(\\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix} \\begin{pmatrix} ${e} & ${f} \\\\ ${g} & ${h} \\end{pmatrix}\\). What is the top-left element of the product?`, answer: `\\(${res}\\)`, checkAnswer: res.toString() }; },
    () => { const a=getRandomInt(2,5),b=getRandomInt(1,3),c=getRandomInt(1,3),d=getRandomInt(2,5); const det=a*d-b*c; return { problem: `Find the inverse of \\(\\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix}\\). What is the new top-left element, before dividing by the determinant?`, answer: `\\(${d}\\)`, checkAnswer: d.toString() }; },
    () => { const x=getRandomInt(2,5), y=getRandomInt(1,4); const a=1,b=1,c=x+y, d=1,e=-1,f=x-y; return { problem: `Solve the system \\(${a}x+${b}y=${c}\\) and \\(${d}x+${e}y=${f}\\) using Cramer's rule. What is the value of x?`, answer: `\\(${x}\\)`, checkAnswer: x.toString() }; },
    () => { return { problem: `What is the dimension of the matrix \\(\\begin{pmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{pmatrix}\\)? (rows x columns)`, answer: `\\(2 \\times 3\\)`, checkAnswer: "2,3" }; },
    () => { return { problem: `For two matrices to be added or subtracted, they must have the same _____.`, answer: `dimensions`, checkAnswer: "dimensions" }; },
    () => { const det = getRandomInt(2,10); return { problem: `A matrix has a determinant of 0. What does this imply about its inverse?`, answer: `It does not exist. The value is 0.`, checkAnswer: "0" }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "For matrix multiplication, multiply rows of the first matrix by columns of the second." };
}

export const module = {
    topicId: '11M11',
    topicName: 'Matrices',
    generateProblem: generate
};