// problem_modules/CM.js

// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
const fact = (n) => n <= 1 ? 1 : n * fact(n - 1);
const C = (n, k) => fact(n) / (fact(k) * fact(n - k));

const problemGenerators = [
    // --- Calculus I: Limits & Derivatives ---
    () => { const a = getRandomInt(2, 6); const limit = 2 * a; return { problem: `Evaluate the limit: \\(\\lim_{x \\to ${a}} \\frac{x^2 - ${a*a}}{x - ${a}}\\).`, answer: `\\(${limit}\\)`, checkAnswer: limit.toString(), hint: "Factor the numerator." }; },
    () => { const num_coeff = getRandomInt(3, 8); const den_coeff = getRandomInt(1, 2); const limit = num_coeff / den_coeff; return { problem: `Evaluate the limit: \\(\\lim_{x \\to \\infty} \\frac{${num_coeff}x^3 - 2x}{${den_coeff}x^3 + x^2}\\).`, answer: `\\(${limit}\\)`, checkAnswer: limit.toString(), hint: "Divide by the highest power of x." }; },
    () => { const a = getRandomInt(2, 5); return { problem: `Find the derivative of \\(f(x) = \\sin(${a}x^2)\\). At x=1, the result is \\(N \\cdot cos(${a})\\). What is N?`, answer: `\\(${2*a}\\)`, checkAnswer: (2*a).toString(), hint: "Use the Chain Rule." }; },
    () => { const x_val = getRandomInt(1, 3); const y_val = x_val + 1; const deriv = -(x_val / y_val); return { problem: `Find \\(\\frac{dy}{dx}\\) for \\(x^2 + y^2 = ${x_val**2 + y_val**2}\\) at the point (${x_val}, ${y_val}) using implicit differentiation.`, answer: `\\(${deriv.toFixed(2)}\\)`, checkAnswer: deriv.toFixed(2) }; },
    () => { const crit_point = getRandomInt(2, 5); return { problem: `Find the critical point of \\(f(x) = x^2 - ${2 * crit_point}x + 1\\).`, answer: `\\(${crit_point}\\)`, checkAnswer: crit_point.toString(), hint: "Find where the derivative is zero." }; },

    // --- Calculus II: Integrals & Series ---
    () => { const a = getRandomInt(2, 4); const b = getRandomInt(1, 3); const val = (a / 3) * (b**3); return { problem: `Evaluate the definite integral: \\(\\int_{0}^{${b}} ${a}x^2 dx\\).`, answer: `\\(${val}\\)`, checkAnswer: val.toString(), hint: "Use the power rule for integration." }; },
    () => { return { problem: `Evaluate the integral: \\(\\int x \\cos(x) dx\\). The result is \\(x\\sin(x) + N\\). What is N? (1=cos(x), 2=sin(x))`, answer: `\\(1\\)`, checkAnswer: "1", hint: "Use Integration by Parts." }; },
    () => { const a = getRandomInt(2, 5); return { problem: `Evaluate the integral \\(\\int \\frac{1}{\\sqrt{${a*a}-x^2}} dx\\). The result is arcsin(x/N) + C. What is N?`, answer: `\\(${a}\\)`, checkAnswer: a.toString(), hint: "This is the form for the arcsin integral." }; },
    () => { return { problem: `Does the series \\(\\sum_{n=1}^{\\infty} \\frac{1}{n^2}\\) converge or diverge? (1=converge, 2=diverge)`, answer: `\\(1\\)`, checkAnswer: "1", hint: "Use the p-series test." }; },
    () => { return { problem: `Does the series \\(\\sum_{n=1}^{\\infty} \\frac{n!}{100^n}\\) converge or diverge? (1=converge, 2=diverge)`, answer: `\\(2\\)`, checkAnswer: "2", hint: "Use the Ratio Test." }; },
    () => { const x = getRandomInt(1,3); const val = 1 - x + (x**2)/2 - (x**3)/6; return { problem: `Find the first four terms of the Taylor series for \\(e^{-x}\\) centered at 0. What is the value at x=${x}?`, answer: `\\(${val.toFixed(2)}\\)`, checkAnswer: val.toFixed(2) }; },

    // --- Calculus III: Multivariable ---
    () => { const x=2, y=3; const val = 2*x + 3*y*y; return { problem: `Find the partial derivative \\(f_x\\) of \\(f(x,y) = x^2 + y^3\\) at the point (${x},${y}).`, answer: `\\(${2*x}\\)`, checkAnswer: (2*x).toString(), hint: "Treat y as a constant." }; },
    () => { const x=2, y=3; const val = 2*x + 3*y*y; return { problem: `Find the partial derivative \\(f_y\\) of \\(f(x,y) = x^2 + y^3\\) at the point (${x},${y}).`, answer: `\\(${3*y*y}\\)`, checkAnswer: (3*y*y).toString(), hint: "Treat x as a constant." }; },
    () => { const x_b=getRandomInt(1,3), y_b=getRandomInt(1,3); const val = (x_b**2 / 2) * y_b; return { problem: `Evaluate the double integral \\(\\int_{0}^{${y_b}} \\int_{0}^{${x_b}} x dy dx\\).`, answer: `\\(${val}\\)`, checkAnswer: val.toString() }; },
    () => { const a=getRandomInt(2,4), b=getRandomInt(2,4); return { problem: `Find the gradient of \\(f(x,y) = ${a}x^2 + ${b}y\\). The x-component is N*x. What is N?`, answer: `\\(${2*a}\\)`, checkAnswer: (2*a).toString() }; },

    // --- Linear Algebra ---
    () => { const a=1,b=2,c=3,d=4,e=5,f=6,g=7,h=8,i=9; const det = a*(e*i - f*h) - b*(d*i - f*g) + c*(d*h - e*g); return { problem: `Find the determinant of the 3x3 matrix \\(\\begin{pmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\\\ 7 & 8 & 9 \\end{pmatrix}\\).`, answer: `\\(${det}\\)`, checkAnswer: det.toString() }; },
    () => { const a=getRandomInt(2,5), b=getRandomInt(1,3); const val=a+b; return { problem: `Find the eigenvalue of \\(\\begin{pmatrix} ${a} & ${b} \\\\ 0 & ${val} \\end{pmatrix}\\) that is not ${a}.`, answer: `\\(${val}\\)`, checkAnswer: val.toString(), hint: "For a triangular matrix, the eigenvalues are the diagonal entries." }; },
    () => { return { problem: `Is the set of all vectors \\((x,y,z)\\) where \\(x+y+z=0\\) a vector space? (1=yes, 0=no)`, answer: `\\(1\\)`, checkAnswer: "1" }; },
    () => { const x=getRandomInt(2,5); return { problem: `A linear transformation T maps (1,0) to (2,3) and (0,1) to (1,4). What is the first component of T(${x},0)?`, answer: `\\(${2*x}\\)`, checkAnswer: (2*x).toString() }; },
    () => { const v1=[1,1,0], v2=[0,1,1]; return { problem: `Are the vectors (1,1,0) and (0,1,1) linearly independent? (1=yes, 0=no)`, answer: `\\(1\\)`, checkAnswer: "1" }; },

    // --- Differential Equations ---
    () => { const k=getRandomInt(3,6); return { problem: `Verify that \\(y = e^{${k}x}\\) is a solution to \\(y' - ${k}y = 0\\). If it is, enter 1.`, answer: `\\(1\\)`, checkAnswer: "1" }; },
    () => { const k=getRandomInt(2,5); return { problem: `Solve the separable differential equation \\(\\frac{dy}{dx} = ${k}x/y\\). The solution is \\(y^2=kx^2+C\\). What is the coefficient of x^2?`, answer: `\\(${k}\\)`, checkAnswer: k.toString() }; },
    () => { const a=getRandomInt(2,5); return { problem: `Find the integrating factor for the linear DE \\(y' + ${a}y = x\\). The result is \\(e^{Nx}\\). What is N?`, answer: `\\(${a}\\)`, checkAnswer: a.toString() }; },
    () => { const r=getRandomInt(2,4); return { problem: `The characteristic equation for a homogeneous DE is \\(r^2 - ${r+1}r + ${r}=0\\). What is the largest root?`, answer: `\\(${r}\\)`, checkAnswer: r.toString() }; },
    () => { const k=getRandomInt(1,4)/10; return { problem: `A population follows the logistic model \\(P' = ${k}P(1 - P/1000)\\). What is the carrying capacity?`, answer: `\\(1000\\)`, checkAnswer: "1000" }; },

    // --- Discrete Mathematics & Probability ---
    () => { const a=5, b=7, c=3; return { problem: `Let A = {1,2,3,4,5} and B = {4,5,6,7,8}. How many elements are in \\(A \\cup B\\)?`, answer: `\\(8\\)`, checkAnswer: "8" }; },
    () => { const a=5, b=7, c=3; return { problem: `Let A = {1,2,3,4,5} and B = {4,5,6,7,8}. How many elements are in \\(A \\cap B\\)?`, answer: `\\(2\\)`, checkAnswer: "2" }; },
    () => { return { problem: `For the statement "If P then Q", what is the truth value of its contrapositive if the original statement is true? (1=true, 0=false)`, answer: `\\(1\\)`, checkAnswer: "1" }; },
    () => { const n=getRandomInt(5,8); return { problem: `How many distinct permutations can be made from the letters of the word "GOOGLE"?`, answer: `\\(180\\)`, checkAnswer: "180", hint: "6! / (2! * 2!)" }; },
    () => { const p_a=0.5, p_b=0.4, p_a_and_b=0.2; const val = p_a_and_b / p_b; return { problem: `P(A)=${p_a}, P(B)=${p_b}, P(A and B)=${p_a_and_b}. Find the conditional probability P(A|B).`, answer: `\\(${val}\\)`, checkAnswer: val.toString() }; },
    () => { const val = 2.5; return { problem: `A random variable X has values {1,2,3,4} with probabilities {0.4, 0.3, 0.2, 0.1}. What is the expected value of X?`, answer: `\\(2.0\\)`, checkAnswer: "2" }; },
    
    // --- Number Theory & Abstract Algebra ---
    () => { const a=getRandomInt(20,50), n=getRandomInt(3,8); return { problem: `What is \\(${a} \\mod ${n}\\)?`, answer: `\\(${a%n}\\)`, checkAnswer: (a%n).toString() }; },
    () => { const a=getRandomInt(50,100), b=getRandomInt(20,40); const gcd = (x,y) => y===0?x:gcd(y,x%y); return { problem: `Find the greatest common divisor of ${a} and ${b} using the Euclidean algorithm.`, answer: `\\(${gcd(a,b)}\\)`, checkAnswer: gcd(a,b).toString() }; },
    () => { const n=getRandomInt(5,9); return { problem: `In the group of integers modulo ${n} under addition, what is the inverse of 2?`, answer: `\\(${n-2}\\)`, checkAnswer: (n-2).toString() }; },
    () => { return { problem: `Is the set of integers under multiplication a group? (1=yes, 0=no)`, answer: `\\(0\\)`, checkAnswer: "0", hint: "Consider the inverse of 2." }; },

    // --- More Assorted Topics ---
    () => { const n=getRandomInt(4,6); const val=2**n - 1; return { problem: `How many non-empty subsets does a set with ${n} elements have?`, answer: `\\(${val}\\)`, checkAnswer: val.toString() }; },
    () => { return { problem: `Is the function f(x) = |x| differentiable at x=0? (1=yes, 0=no)`, answer: `\\(0\\)`, checkAnswer: "0", hint: "It has a sharp corner." }; },
    () => { return { problem: `L'Hopital's Rule is used to evaluate limits of what indeterminate form? (Enter as a fraction)`, answer: `\\(0/0\\)`, checkAnswer: "0/0" }; },
    () => { const a = getRandomInt(2, 4); return { problem: `Find the volume of the solid generated by revolving the region bounded by \\(y = \\sqrt{x}\\), y=0, x=0, x=${a*a} about the x-axis. (in terms of pi)`, answer: `\\(${0.5*a**4}\\)`, checkAnswer: (0.5*a**4).toString() }; },
    () => { const x=getRandomInt(2,5), y=x+getRandomInt(1,3); return { problem: `Find the cross product of vectors <1,0,${x}> and <0,1,${y}>. What is the z-component?`, answer: `\\(1\\)`, checkAnswer: "1" }; },
    () => { const val=getRandomInt(3,5); return { problem: `A 3x3 identity matrix has what value for its determinant?`, answer: `\\(1\\)`, checkAnswer: "1" }; },
    () => { return { problem: `What is the eccentricity of a circle?`, answer: `\\(0\\)`, checkAnswer: "0" }; },
    () => { const a=getRandomInt(2,4), b=getRandomInt(2,4); return { problem: `Solve the recurrence relation \\(a_n = ${a}a_{n-1}\\) with \\(a_0 = ${b}\\). What is a_2?`, answer: `\\(${b*a*a}\\)`, checkAnswer: (b*a*a).toString() }; },
    () => { return { problem: `What is the value of the integral \\(\\int_{-1}^{1} x^3 dx\\)?`, answer: `\\(0\\)`, checkAnswer: "0", hint: "It's an odd function over a symmetric interval." }; },
    () => { const n=getRandomInt(3,5); const val = (n-1); return { problem: `How many generators does the cyclic group Z_${n} have?`, answer: `\\(${val}\\)`, checkAnswer: val.toString(), hint: "The number of integers less than n and relatively prime to n." }; },
    () => { const val=getRandomInt(4,8); return { problem: `If a function's derivative is constant, what is the degree of the original function?`, answer: `\\(1\\)`, checkAnswer: "1" }; },
    () => { const val=getRandomInt(3,6); return { problem: `What is the chromatic number of a complete graph with ${val} vertices (K_${val})?`, answer: `\\(${val}\\)`, checkAnswer: val.toString(), hint: "In a complete graph, every vertex is connected to every other vertex." }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Think back to your core principles!" };
}

export const module = {
    topicId: 'CM',
    topicName: 'College Math',
    generateProblem: generate
};