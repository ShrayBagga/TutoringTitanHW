// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function formatAnswer(val, p=1) { return parseFloat(val.toFixed(p)).toString().replace(/\.0$/, ''); }

// --- Graphing Helper ---
function createShapeGraph(shape, params) {
    const graphId = `g-${Date.now()}`;
    const graphFunction = { functions: [], labels: [], boundingbox: [-12, 12, 12, -12] };
    
    if (shape === 'triangle') {
        const { b, h } = params;
        const v = [[0,0], [b,0], [getRandomInt(1, b-1), h]];
        graphFunction.functions.push({ type: 'polygon', vertices: v });
    } else if (shape === 'rectangle') {
        const { l, w } = params;
        const v = [[0,0], [l,0], [l,w], [0,w]];
        graphFunction.functions.push({ type: 'polygon', vertices: v });
    } else if (shape === 'trapezoid') {
        const { b1, b2, h } = params;
        const offset = Math.abs(b1 - b2) / 2;
        const v = [[0,0], [b1,0], [b1-offset, h], [offset, h]];
        graphFunction.functions.push({ type: 'polygon', vertices: v });
    } else if (shape === 'circle') {
        const { r } = params;
        graphFunction.functions.push({ type: 'expression', expression: `x^2+y^2=${r**2}` });
    }

    return { graphId, graphFunction };
}

const problemGenerators = [
    () => { const l = getRandomInt(8, 15); const w = getRandomInt(5, 7); const area = l * w; const {graphId, graphFunction} = createShapeGraph('rectangle', {l,w}); return { problem: `Find the area of a rectangle with length \\(${l}\\) and width \\(${w}\\).`, answer: `\\(${area}\\)`, checkAnswer: area.toString(), graphId, graphFunction }; },
    () => { const s = getRandomInt(5, 12); const area = s * s; return { problem: `Find the area of a square with side length \\(${s}\\).`, answer: `\\(${area}\\)`, checkAnswer: area.toString() }; },
    () => { const b = getRandomInt(10, 20); const h = getRandomInt(6, 12); const area = 0.5 * b * h; const {graphId, graphFunction} = createShapeGraph('triangle', {b,h}); return { problem: `Find the area of a triangle with base \\(${b}\\) and height \\(${h}\\).`, answer: `\\(${area}\\)`, checkAnswer: area.toString(), graphId, graphFunction }; },
    () => { const b = getRandomInt(9, 16); const h = getRandomInt(5, 8); const area = b * h; return { problem: `Find the area of a parallelogram with base \\(${b}\\) and height \\(${h}\\).`, answer: `\\(${area}\\)`, checkAnswer: area.toString() }; },
    () => { const d1 = getRandomInt(8, 14); const d2 = getRandomInt(10, 16); const area = 0.5 * d1 * d2; return { problem: `A rhombus has diagonals of length \\(${d1}\\) and \\(${d2}\\). Find its area.`, answer: `\\(${area}\\)`, checkAnswer: area.toString() }; },
    () => { const b1 = getRandomInt(10, 15); const b2 = getRandomInt(6, 9); const h = getRandomInt(5, 8); const area = 0.5 * (b1 + b2) * h; const {graphId, graphFunction} = createShapeGraph('trapezoid', {b1,b2,h}); return { problem: `Find the area of a trapezoid with bases \\(${b1}\\) and \\(${b2}\\) and height \\(${h}\\).`, answer: `\\(${area}\\)`, checkAnswer: area.toString(), graphId, graphFunction }; },
    () => { const r = getRandomInt(5, 12); const area = Math.PI * r**2; const {graphId, graphFunction} = createShapeGraph('circle', {r}); return { problem: `Find the area of a circle with radius \\(${r}\\). (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(area)}\\)`, checkAnswer: formatAnswer(area), graphId, graphFunction }; },
    () => { const d = getRandomInt(10, 20); const r = d/2; const area = Math.PI * r**2; return { problem: `Find the area of a circle with a diameter of \\(${d}\\). (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(area)}\\)`, checkAnswer: formatAnswer(area) }; },
    () => { const s = getRandomInt(4, 8); const n = 6; const apothem = (s * Math.sqrt(3)) / 2; const perimeter = n * s; const area = 0.5 * apothem * perimeter; return { problem: `Find the area of a regular hexagon with a side length of \\(${s}\\). Round to one decimal place.`, answer: `\\(${formatAnswer(area)}\\)`, checkAnswer: formatAnswer(area) }; },
    () => { const a = getRandomInt(5, 9); const n = 5; const perimeter = n* (2*a*Math.tan(Math.PI/n)); const area = 0.5 * a * perimeter; return { problem: `Find the area of a regular pentagon with an apothem of \\(${a}\\). Round to one decimal place.`, answer: `\\(${formatAnswer(area)}\\)`, checkAnswer: formatAnswer(area) }; },
    () => { const rect_l = 10, rect_w = 8; const tri_b = 8, tri_h = 6; const total_area = (rect_l*rect_w) + (0.5*tri_b*tri_h); return { problem: `Find the area of a composite figure made of a \\(${rect_l} \\times ${rect_w}\\) rectangle and a triangle with base \\(${tri_b}\\) and height \\(${tri_h}\\).`, answer: `\\(${total_area}\\)`, checkAnswer: total_area.toString() }; },
    () => { const sq_s = 10; const cir_r = 5; const area = sq_s**2 - Math.PI*cir_r**2; return { problem: `A circle of radius \\(${cir_r}\\) is removed from a square with side \\(${sq_s}\\). Find the area of the remaining shaded region. (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(area)}\\)`, checkAnswer: formatAnswer(area) }; },
    () => { const area = [49, 64, 81, 100][getRandomInt(0,3)]; const s = Math.sqrt(area); return { problem: `The area of a square is \\(${area}\\) sq. units. What is its side length?`, answer: `\\(${s}\\)`, checkAnswer: s.toString() }; },
    () => { const area = 153.86; const r = Math.sqrt(area/Math.PI); return { problem: `The area of a circle is \\(${area}\\) sq. cm. What is its radius? (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(7\\)`, checkAnswer: "7" }; },
    () => { const area = getRandomInt(30,50); const b = getRandomInt(10,15); const h = 2*area/b; return { problem: `The area of a triangle is \\(${area}\\). Its base is \\(${b}\\). Find its height.`, answer: `\\(${formatAnswer(h)}\\)`, checkAnswer: formatAnswer(h) }; },
    () => { const s1=getRandomInt(3,5), s2=s1+2, sf=2; const area1=s1*s2; const area2=area1*(sf**2); return { problem: `A rectangle has dimensions \\(${s1} \\times ${s2}\\). If it is dilated by a scale factor of \\(${sf}\\), what is the area of the new rectangle?`, answer: `\\(${area2}\\)`, checkAnswer: area2.toString() }; },
    () => { const r_outer = 10; const r_inner = getRandomInt(6,8); const area = Math.PI*(r_outer**2 - r_inner**2); return { problem: `Find the area of an annulus (ring) with an outer radius of \\(${r_outer}\\) and an inner radius of \\(${r_inner}\\). (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(area)}\\)`, checkAnswer: formatAnswer(area) }; },
    () => { const s = getRandomInt(4, 7); const n = 8; const apothem = s / (2*Math.tan(Math.PI/n)); const perimeter = n*s; const area = 0.5 * apothem * perimeter; return { problem: `Find the area of a regular octagon with a side length of \\(${s}\\). Round to one decimal place.`, answer: `\\(${formatAnswer(area)}\\)`, checkAnswer: formatAnswer(area) }; },
    () => { const r = 10; const angle = getRandomInt(45, 120); const area = (angle/360)*Math.PI*r**2; return { problem: `Find the area of a sector of a circle with radius \\(${r}\\) and a central angle of \\(${angle}^{\\circ}\\). (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(area)}\\)`, checkAnswer: formatAnswer(area) }; },
    () => { const s_rect = getRandomInt(8,12); const r_semi = s_rect/2; const area = s_rect**2 + 0.5*Math.PI*r_semi**2; return { problem: `A composite figure is a square with side \\(${s_rect}\\) and a semicircle on top. Find the total area. (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(area)}\\)`, checkAnswer: formatAnswer(area) }; },
];
function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Memorize the area formulas for common polygons and circles." };
}
export const module = { topicId: '10M10', topicName: 'Area of Polygons & Circles', generateProblem: generate };

