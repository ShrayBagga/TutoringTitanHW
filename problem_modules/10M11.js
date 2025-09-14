// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function formatAnswer(val, p=1) { return parseFloat(val.toFixed(p)).toString().replace(/\.0$/, ''); }

// --- Graphing Helper for 3D Shapes (2D representation) ---
function create3DShapeGraph(shape, params) {
    const graphId = `g-${Date.now()}`;
    const graphFunction = { functions: [], labels: [], boundingbox: [-12, 12, 12, -12] };
    
    if (shape === 'cylinder') {
        const { r, h } = params;
        // Draw ellipses for top and bottom and lines for sides
        graphFunction.functions.push({ type: 'ellipse', center: [0, h/2], radius: [r, r/4] });
        graphFunction.functions.push({ type: 'ellipse', center: [0, -h/2], radius: [r, r/4] });
        graphFunction.functions.push({ type: 'line', point1: [-r, h/2], point2: [-r, -h/2] });
        graphFunction.functions.push({ type: 'line', point1: [r, h/2], point2: [r, -h/2] });
    } else if (shape === 'cone') {
        const { r, h } = params;
        graphFunction.functions.push({ type: 'ellipse', center: [0, -h/2], radius: [r, r/4] });
        graphFunction.functions.push({ type: 'line', point1: [0, h/2], point2: [-r, -h/2] });
        graphFunction.functions.push({ type: 'line', point1: [0, h/2], point2: [r, -h/2] });
    } else if (shape === 'sphere') {
         const { r } = params;
         graphFunction.functions.push({ type: 'circle', center: [0,0], radius: r });
         graphFunction.functions.push({ type: 'ellipse', center: [0,0], radius: [r, r/3], options: {dash: 2} });
    }

    return { graphId, graphFunction };
}

const problemGenerators = [
    () => { const l=getRandomInt(5,8), w=getRandomInt(4,7), h=getRandomInt(3,6); const sa = 2*(l*w + l*h + w*h); return { problem: `Find the surface area of a rectangular prism with length ${l}, width ${w}, and height ${h}.`, answer: `\\(${sa}\\)`, checkAnswer: sa.toString() }; },
    () => { const l=getRandomInt(5,8), w=getRandomInt(4,7), h=getRandomInt(3,6); const vol = l*w*h; return { problem: `Find the volume of a rectangular prism with length ${l}, width ${w}, and height ${h}.`, answer: `\\(${vol}\\)`, checkAnswer: vol.toString() }; },
    () => { const s = getRandomInt(4, 9); const sa = 6 * s**2; return { problem: `Find the surface area of a cube with side length ${s}.`, answer: `\\(${sa}\\)`, checkAnswer: sa.toString() }; },
    () => { const s = getRandomInt(4, 9); const vol = s**3; return { problem: `Find the volume of a cube with side length ${s}.`, answer: `\\(${vol}\\)`, checkAnswer: vol.toString() }; },
    () => { const r = getRandomInt(3, 6); const h = getRandomInt(7, 12); const sa = 2 * Math.PI * r * (r + h); const {graphId, graphFunction} = create3DShapeGraph('cylinder', {r,h}); return { problem: `Find the surface area of a cylinder with radius \\(${r}\\) and height \\(${h}\\). (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(sa)}\\)`, checkAnswer: formatAnswer(sa), graphId, graphFunction }; },
    () => { const r = getRandomInt(3, 6); const h = getRandomInt(7, 12); const vol = Math.PI * r**2 * h; const {graphId, graphFunction} = create3DShapeGraph('cylinder', {r,h}); return { problem: `Find the volume of a cylinder with radius \\(${r}\\) and height \\(${h}\\). (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(vol)}\\)`, checkAnswer: formatAnswer(vol), graphId, graphFunction }; },
    () => { const r = getRandomInt(3, 6); const h = getRandomInt(r+1, 10); const slant = Math.sqrt(r**2 + h**2); const sa = Math.PI * r * (r + slant); const {graphId, graphFunction} = create3DShapeGraph('cone', {r,h}); return { problem: `Find the surface area of a cone with radius \\(${r}\\) and height \\(${h}\\). (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(sa)}\\)`, checkAnswer: formatAnswer(sa), graphId, graphFunction }; },
    () => { const r = getRandomInt(3, 6); const h = getRandomInt(7, 12); const vol = (1/3) * Math.PI * r**2 * h; const {graphId, graphFunction} = create3DShapeGraph('cone', {r,h}); return { problem: `Find the volume of a cone with radius \\(${r}\\) and height \\(${h}\\). (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(vol)}\\)`, checkAnswer: formatAnswer(vol), graphId, graphFunction }; },
    () => { const r = getRandomInt(4, 8); const sa = 4 * Math.PI * r**2; const {graphId, graphFunction} = create3DShapeGraph('sphere', {r}); return { problem: `Find the surface area of a sphere with radius \\(${r}\\). (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(sa)}\\)`, checkAnswer: formatAnswer(sa), graphId, graphFunction }; },
    () => { const r = getRandomInt(4, 8); const vol = (4/3) * Math.PI * r**3; const {graphId, graphFunction} = create3DShapeGraph('sphere', {r}); return { problem: `Find the volume of a sphere with radius \\(${r}\\). (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(vol)}\\)`, checkAnswer: formatAnswer(vol), graphId, graphFunction }; },
    () => { const s = getRandomInt(4,7); const area_base = s**2; const h = getRandomInt(5,9); const slant = Math.sqrt((s/2)**2 + h**2); const lat_area = 2 * s * slant; const sa = area_base + lat_area; return { problem: `Find the surface area of a square pyramid with base side \\(${s}\\) and height \\(${h}\\).`, answer: `\\(${formatAnswer(sa)}\\)`, checkAnswer: formatAnswer(sa) }; },
    () => { const s = getRandomInt(4,7); const h = getRandomInt(5,9); const vol = (1/3) * s**2 * h; return { problem: `Find the volume of a square pyramid with base side \\(${s}\\) and height \\(${h}\\).`, answer: `\\(${formatAnswer(vol)}\\)`, checkAnswer: formatAnswer(vol) }; },
    () => { const sa = 150; const s = Math.sqrt(sa/6); return { problem: `The surface area of a cube is \\(${sa}\\) sq. units. What is its side length?`, answer: `\\(${s}\\)`, checkAnswer: s.toString() }; },
    () => { const vol = [64, 125, 216][getRandomInt(0,2)]; const s = Math.cbrt(vol); return { problem: `The volume of a cube is \\(${vol}\\) cubic units. What is its side length?`, answer: `\\(${s}\\)`, checkAnswer: s.toString() }; },
    () => { const vol = 314; const r = 5; const h = vol / (Math.PI * r**2); return { problem: `The volume of a cylinder is \\(${vol}\\) cm\\(^{3}\\) and its radius is \\(${r}\\) cm. Find its height. (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(h,0)}\\) cm`, checkAnswer: formatAnswer(h,0) }; },
    () => { const sa_sph = 314; const r = Math.sqrt(sa_sph / (4*Math.PI)); return { problem: `The surface area of a sphere is \\(${sa_sph}\\) sq. in. Find its radius. (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(5\\) in`, checkAnswer: "5" }; },
    () => { const s1_vol=getRandomInt(2,4)**3; const s2_vol=getRandomInt(5,7)**3; const ratio = s1_vol / s2_vol; return { problem: `Two cubes have volumes of \\(${s1_vol}\\) and \\(${s2_vol}\\). What is the ratio of their side lengths?`, answer: `\\(${Math.cbrt(s1_vol)}:${Math.cbrt(s2_vol)}\\)`, checkAnswer: `${Math.cbrt(s1_vol)}:${Math.cbrt(s2_vol)}` }; },
    () => { const r_cyl=3, h_cyl=10; const r_cone=3, h_cone=6; const vol = Math.PI*r_cyl**2*h_cyl + (1/3)*Math.PI*r_cone**2*h_cone; return { problem: `A composite figure is a cylinder (r=${r_cyl}, h=${h_cyl}) with a cone (r=${r_cone}, h=${h_cone}) on top. Find the total volume. (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(vol)}\\)`, checkAnswer: formatAnswer(vol) }; },
    () => { const sf = getRandomInt(2,4); return { problem: `If the dimensions of a rectangular prism are all multiplied by a scale factor of \\(${sf}\\), by what factor is the volume multiplied?`, answer: `\\(${sf**3}\\)`, checkAnswer: (sf**3).toString() }; },
    () => { const sf = getRandomInt(2,4); return { problem: `If the dimensions of a rectangular prism are all multiplied by a scale factor of \\(${sf}\\), by what factor is the surface area multiplied?`, answer: `\\(${sf**2}\\)`, checkAnswer: (sf**2).toString() }; },
];
function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Memorize the surface area and volume formulas for prisms, pyramids, cylinders, cones, and spheres." };
}
export const module = { topicId: '10M11', topicName: 'Surface Area & Volume', generateProblem: generate };

