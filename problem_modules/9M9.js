// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
const problemGenerators = [
    () => { const a=getRandomInt(1,3); return { problem: `Does the parabola \\(y=${a}x^2 - 2x + 5\\) open upwards or downwards?`, answer: `Upwards`, checkAnswer: "Upwards" }; },
    () => { const a=-getRandomInt(1,3); return { problem: `Does the parabola \\(y=${a}x^2 - 2x + 5\\) open upwards or downwards?`, answer: `Downwards`, checkAnswer: "Downwards" }; },
    () => { const h=getRandomInt(-4,4), k=getRandomInt(-3,3); return { problem: `Find the vertex of the parabola \\(y = 2(x - ${h})^2 + ${k}\\).`, answer: `(\\( ${h}, ${k} \\))`, checkAnswer: `${h},${k}` }; },
    () => { const a=1, b=-6, c=5; const x=-b/(2*a), y=a*x**2+b*x+c; return { problem: `Find the vertex of \\(y = x^2 - 6x + 5\\).`, answer: `(\\( ${x}, ${y} \\))`, checkAnswer: `${x},${y}` }; },
    () => { const a=1, b=4, c=3; return { problem: `Find the axis of symmetry for \\(y = x^2 + 4x + 3\\).`, answer: `\\(x = -2\\)`, checkAnswer: "x=-2" }; },
    () => { const c=getRandomInt(1,9); return { problem: `What is the y-intercept of \\(y = 2x^2 + 3x - ${c}\\)?`, answer: `(\\(0, -${c}\\))`, checkAnswer: `0,-${c}` }; },
    () => { const r1=1, r2=5; return { problem: `Find the x-intercepts (roots) of \\(y = (x-1)(x-5)\\).`, answer: `(\\(1,0\\)) and (\\(5,0\\))`, checkAnswer: `1,5` }; },
    () => { const a=1, b=-6, c=8; const r1=2, r2=4; return { problem: `Find the roots of \\(y=x^2-6x+8\\) by factoring.`, answer: `\\(x=2, x=4\\)`, checkAnswer: "2,4" }; },
    () => { const h=3, k=4; const graphId=`g-${Date.now()}`; return { problem: `Graph the function \\(y = (x-3)^2 + 4\\).`, answer: `A parabola opening upwards with vertex at (3,4).`, checkAnswer: "graphed", graphId, graphFunction:{functions:[{type:'expression',expression:`(x-3)**2+4`}],boundingbox:[-2,8,20,-2]} }; },
    () => { const a=-1, h=1, k=2; const graphId=`g-${Date.now()}`; return { problem: `Graph \\(y = -(x-1)^2 + 2\\).`, answer: `A parabola opening downwards with vertex at (1,2).`, checkAnswer: "graphed", graphId, graphFunction:{functions:[{type:'expression',expression:`-(x-1)**2+2`}],boundingbox:[-4,6,4,-10]} }; },
    () => { return { problem: `Does \\(y=x^2+2x-5\\) have a maximum or minimum value?`, answer: `A minimum value, because it opens upwards.`, checkAnswer: "Minimum" }; },
    () => { return { problem: `Does \\(y=-3x^2+6x+1\\) have a maximum or minimum value?`, answer: `A maximum value, because it opens downwards.`, checkAnswer: "Maximum" }; },
    () => { const a=2; const b=-8; const c=1; const x=-b/(2*a); const y=a*x*x+b*x+c; return { problem: `Find the minimum value of the function \\(y=2x^2-8x+1\\).`, answer: `The minimum value is \\(${y}\\).`, checkAnswer: y.toString() }; },
    () => { const a=1; const b=2; const c=3; return { problem: `How does the graph of \\(y=x^2+3\\) compare to \\(y=x^2\\)?`, answer: `It is shifted up 3 units.`, checkAnswer: "shifted up 3" }; },
    () => { const a=1; const b=2; const c=3; return { problem: `How does the graph of \\(y=(x-2)^2\\) compare to \\(y=x^2\\)?`, answer: `It is shifted right 2 units.`, checkAnswer: "shifted right 2" }; },
    () => { const a=3; return { problem: `How does the graph of \\(y=3x^2\\) compare to \\(y=x^2\\)?`, answer: `It is narrower (vertically stretched).`, checkAnswer: "narrower" }; },
    () => { const a=1,b=-8,c=15; return { problem: `A ball is thrown with height \\(h = t^2-8t+15\\). At what times \\(t\\) is the ball at ground level (h=0)?`, answer: `At \\(t=3\\) and \\(t=5\\) seconds.`, checkAnswer: "3,5" }; },
    () => { const a=-1,b=4,c=5; const x=-b/(2*a); const y=a*x*x+b*x+c; return { problem: `A rocket's height is given by \\(h=-t^2+4t+5\\). What is the maximum height it reaches?`, answer: `The maximum height is \\(${y}\\).`, checkAnswer: y.toString() }; },
    () => { const r1=-2, r2=4; return { problem: `Write a quadratic function in factored form with roots at \\(x=${r1}\\) and \\(x=${r2}\\).`, answer: `\\(y=(x+2)(x-4)\\)`, checkAnswer: "y=(x+2)(x-4)" }; },
    () => { const h=1, k=5; return { problem: `Write a quadratic function in vertex form with a vertex at (\\(${h},${k}\\)).`, answer: `\\(y=(x-1)^2+5\\)`, checkAnswer: "y=(x-1)^2+5" }; }
];
function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "The vertex of y=ax^2+bx+c is at x=-b/(2a)." };
}
export const module = { topicId: '9M9', topicName: 'Graphing Quadratic Functions', generateProblem: generate };