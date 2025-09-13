// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function formatAnswer(val, p=2) { return parseFloat(val.toFixed(p)).toString().replace(/\.00$/, ''); }

const problemGenerators = [
    () => { const angle = getRandomInt(20, 70); return { problem: `What is the measure of the complement of a \\(${angle}^{\\circ}\\) angle?`, answer: `\\(${90-angle}^{\\circ}\\)`, checkAnswer: (90-angle).toString() }; },
    () => { const angle = getRandomInt(100, 160); return { problem: `Find the supplement of a \\(${angle}^{\\circ}\\) angle.`, answer: `\\(${180-angle}^{\\circ}\\)`, checkAnswer: (180-angle).toString() }; },
    () => { const angle = getRandomInt(30, 80); return { problem: `Two vertical angles are formed by intersecting lines. If one angle is \\(${angle}^{\\circ}\\), what is the measure of the other vertical angle?`, answer: `\\(${angle}^{\\circ}\\)`, checkAnswer: angle.toString() }; },
    () => { const angle = getRandomInt(40, 150); const adj = 180-angle; return { problem: `Two angles are adjacent and form a straight line. If one angle is \\(${angle}^{\\circ}\\), what is the measure of the other angle?`, answer: `\\(${adj}^{\\circ}\\)`, checkAnswer: adj.toString() }; },
    () => { const r = getRandomInt(5, 15); const circ = 2 * Math.PI * r; return { problem: `Find the circumference of a circle with a radius of \\(${r}\\) cm. (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(circ)}\\) cm`, checkAnswer: formatAnswer(circ) }; },
    () => { const d = getRandomInt(10, 20); const circ = Math.PI * d; return { problem: `What is the circumference of a circle with a diameter of \\(${d}\\) inches? (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(circ)}\\) inches`, checkAnswer: formatAnswer(circ) }; },
    () => { const r = getRandomInt(4, 12); const area = Math.PI * r * r; return { problem: `Find the area of a circle with a radius of \\(${r}\\) meters. (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(area)}\\) m\\(^{2}\\)`, checkAnswer: formatAnswer(area) }; },
    () => { const d = getRandomInt(10, 30); const area = Math.PI * (d/2)**2; return { problem: `Calculate the area of a circle with a diameter of \\(${d}\\) feet. (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(area)}\\) ft\\(^{2}\\)`, checkAnswer: formatAnswer(area) }; },
    () => { const a1 = getRandomInt(50, 80); const a2 = getRandomInt(40, 60); const a3 = 180 - a1 - a2; return { problem: `A triangle has angles measuring \\(${a1}^{\\circ}\\) and \\(${a2}^{\\circ}\\). What is the measure of the third angle?`, answer: `\\(${a3}^{\\circ}\\)`, checkAnswer: a3.toString() }; },
    () => { const x = getRandomInt(10, 30); const a1 = 2*x; const a2 = 3*x; const a3 = 180-a1-a2; return { problem: `An angle in a triangle is \\((2x)^{\\circ}\\) and another is \\((3x)^{\\circ}\\). If \\(x=${x}\\), is the triangle acute, obtuse, or right?`, answer: `${(a1>90||a2>90||a3>90) ? "Obtuse" : (a1==90||a2==90||a3==90)?"Right":"Acute"}`, checkAnswer: `${(a1>90||a2>90||a3>90) ? "Obtuse" : (a1==90||a2==90||a3==90)?"Right":"Acute"}` }; },
    () => { const circ = 62.8; const r = circ / (2*3.14); return { problem: `The circumference of a circle is approximately \\(${circ}\\) cm. What is its radius? (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${r}\\) cm`, checkAnswer: r.toString() }; },
    () => { const area = 78.5; const r = Math.sqrt(area/3.14); return { problem: `The area of a circular pizza is \\(${area}\\) sq. inches. What is its radius? (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${r}\\) inches`, checkAnswer: r.toString() }; },
    () => { const x = getRandomInt(15, 25); return { problem: `Solve for \\(x\\) if two complementary angles are \\(x^{\\circ}\\) and \\((2x)^{\\circ}\\).`, answer: `\\(x = 30\\)`, checkAnswer: "30", hint:"The angles sum to 90 degrees." }; },
    () => { const x = getRandomInt(20, 40); return { problem: `Two supplementary angles measure \\((x+20)^{\\circ}\\) and \\(x^{\\circ}\\). Find \\(x\\).`, answer: `\\(x = 80\\)`, checkAnswer: "80", hint:"The angles sum to 180 degrees." }; },
    () => { const pizza_d = 14; const slice_angle = 45; const area = Math.PI*(pizza_d/2)**2; const slice_area = area * (slice_angle/360); return { problem: `A \\(${pizza_d}\\)-inch pizza is cut into 8 equal slices. What is the area of one slice? (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(slice_area)}\\) in\\(^{2}\\)`, checkAnswer: formatAnswer(slice_area) }; },
    () => { const r = 10; const area_semi = 0.5*Math.PI*r**2; return { problem: `What is the area of a semicircle with a radius of \\(${r}\\) units? (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(area_semi)}\\) sq. units`, checkAnswer: formatAnswer(area_semi) }; },
    () => { const total_angle = 360; return { problem: `What is the sum of the angles around a point?`, answer: `\\(360^{\\circ}\\)`, checkAnswer: "360" }; },
    () => { const sq_s = 10; const cir_r = 5; const area = sq_s**2 - Math.PI*cir_r**2; return { problem: `A circle with radius \\(${cir_r}\\) is cut from a square piece of paper with side \\(${sq_s}\\). What is the area of the remaining paper? (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(area)}\\) sq. units`, checkAnswer: formatAnswer(area) }; },
    () => { return { problem: `Can a triangle have two obtuse angles?`, answer: `No, because the sum of angles would exceed 180 degrees.`, checkAnswer: "No" }; },
    () => { const r_outer = 10; const r_inner = 7; const area = Math.PI*(r_outer**2 - r_inner**2); return { problem: `Find the area of a ring (annulus) with an outer radius of \\(${r_outer}\\) and an inner radius of \\(${r_inner}\\). (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(area)}\\) sq. units`, checkAnswer: formatAnswer(area) }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Remember key formulas: Circle Area = pi*r^2, Circumference = 2*pi*r." };
}

export const module = {
    topicId: '7M7',
    topicName: 'Geometry: Angles & Circles',
    generateProblem: generate
};
