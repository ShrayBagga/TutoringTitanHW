// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function formatAnswer(val, p=1) { return parseFloat(val.toFixed(p)).toString().replace(/\.0$/, ''); }

// --- Graphing Helper ---
function createSimilarTrianglesGraph(v1, scaleFactor) {
    const graphId = `g-${Date.now()}`;
    const v2 = v1.map(p => [p[0] * scaleFactor + 2, p[1] * scaleFactor]); // Dilate and shift for visibility
    const graphFunction = {
        functions: [
            { type: 'point', x: v1[0][0], y: v1[0][1], options: { name: 'A', size: 2, color: 'blue' } },
            { type: 'point', x: v1[1][0], y: v1[1][1], options: { name: 'B', size: 2, color: 'blue' } },
            { type: 'point', x: v1[2][0], y: v1[2][1], options: { name: 'C', size: 2, color: 'blue' } },
            { type: 'point', x: v2[0][0], y: v2[0][1], options: { name: 'D', size: 2, color: 'red' } },
            { type: 'point', x: v2[1][0], y: v2[1][1], options: { name: 'E', size: 2, color: 'red' } },
            { type: 'point', x: v2[2][0], y: v2[2][1], options: { name: 'F', size: 2, color: 'red' } },
        ],
        boundingbox: [-15, 15, 15, -15]
    };
    graphFunction.functions.push({ type: 'line', point1: v1[0], point2: v1[1], options:{strokeColor:'blue'} });
    graphFunction.functions.push({ type: 'line', point1: v1[1], point2: v1[2], options:{strokeColor:'blue'} });
    graphFunction.functions.push({ type: 'line', point1: v1[2], point2: v1[0], options:{strokeColor:'blue'} });
    graphFunction.functions.push({ type: 'line', point1: v2[0], point2: v2[1], options:{strokeColor:'red'} });
    graphFunction.functions.push({ type: 'line', point1: v2[1], point2: v2[2], options:{strokeColor:'red'} });
    graphFunction.functions.push({ type: 'line', point1: v2[2], point2: v2[0], options:{strokeColor:'red'} });
    return { graphId, graphFunction };
}

const problemGenerators = [
    () => { const side_s = getRandomInt(3, 5); const side_l = side_s * 2; return { problem: `\\(\\triangle ABC \\sim \\triangle DEF\\). Side AB is \\(${side_s}\\) and corresponding side DE is \\(${side_l}\\). What is the scale factor from \\(\\triangle ABC\\) to \\(\\triangle DEF\\)?`, answer: `2`, checkAnswer: "2" }; },
    () => { const side_l = getRandomInt(8, 12); const side_s = side_l / 2; return { problem: `Rectangle ABCD is similar to Rectangle WXYZ. Side AB is \\(${side_l}\\) and corresponding side WX is \\(${side_s}\\). What is the scale factor from ABCD to WXYZ?`, answer: `\\(0.5\\)`, checkAnswer: "0.5" }; },
    () => { const sf = getRandomInt(2,4); const s_sm = getRandomInt(3,5), s_md = s_sm + 2; const s_lg = s_md + 2; const l_md = s_md * sf; const l_lg = s_lg * sf; return { problem: `\\(\\triangle ABC \\sim \\triangle XYZ\\). The sides of \\(\\triangle ABC\\) are ${s_sm}, ${s_md}, ${s_lg}. The shortest side of \\(\\triangle XYZ\\) is \\(${s_sm * sf}\\). What are the lengths of the other two sides?`, answer: `\\(${l_md}\\) and \\(${l_lg}\\)`, checkAnswer: `${l_md},${l_lg}` }; },
    () => { const h1=getRandomInt(4,6), s1=getRandomInt(2,4); const sf=getRandomInt(3,5); const h2=h1*sf, s2=s1*sf; return { problem: `A \\(${h1}\\)-foot tall person casts a \\(${s1}\\)-foot shadow. A nearby tree casts a \\(${s2}\\)-foot shadow. How tall is the tree?`, answer: `\\(${h2}\\) feet`, checkAnswer: h2.toString() }; },
    () => { const vertices = [[0,0], [getRandomInt(3,4),0], [0,getRandomInt(2,3)]]; const sf = getRandomInt(2,3); const {graphId, graphFunction} = createSimilarTrianglesGraph(vertices, sf); return { problem: `In the diagram, \\(\\triangle ABC \\sim \\triangle DEF\\). What is the scale factor of the dilation from ABC to DEF?`, answer: `\\(${sf}\\)`, checkAnswer: sf.toString(), graphId, graphFunction }; },
    () => { return { problem: `Which postulate proves two triangles are similar if two pairs of corresponding angles are congruent? (1=AA, 2=SSS, 3=SAS)`, answer: `1`, checkAnswer: "1" }; },
    () => { return { problem: `Which postulate proves two triangles are similar if all three pairs of corresponding sides are proportional? (1=AA, 2=SSS, 3=SAS)`, answer: `2`, checkAnswer: "2" }; },
    () => { return { problem: `Which postulate proves two triangles are similar if two pairs of corresponding sides are proportional and the included angles are congruent? (1=AA, 2=SSS, 3=SAS)`, answer: `3`, checkAnswer: "3" }; },
    () => { const a=getRandomInt(3,5), b=a+1, c=a+2; const sf=getRandomInt(2,4); return { problem: `\\(\\triangle ABC\\) has sides ${a}, ${b}, ${c}. \\(\\triangle XYZ\\) has sides ${a*sf}, ${b*sf}, ${c*sf}. Are the triangles similar? (1=yes, 0=no)`, answer: `1`, checkAnswer: "1" }; },
    () => { const a1=getRandomInt(40,60), b1=getRandomInt(70,80), c1=180-a1-b1; const a2=a1, b2=b1, c2=c1; return { problem: `\\(\\triangle ABC\\) has angles ${a1}, ${b1}, ${c1}. \\(\\triangle XYZ\\) has angles ${a2}, ${b2}, ${c2}. Are the triangles similar? (1=yes, 0=no)`, answer: `1`, checkAnswer: "1" }; },
    () => { const peri_s = getRandomInt(10, 20); const sf = getRandomInt(2, 4); const peri_l = peri_s * sf; return { problem: `The perimeter of a small polygon is \\(${peri_s}\\). It is similar to a larger polygon with a scale factor of \\(${sf}\\). What is the perimeter of the larger polygon?`, answer: `\\(${peri_l}\\)`, checkAnswer: peri_l.toString() }; },
    () => { const area_s = getRandomInt(10, 20); const sf = getRandomInt(2, 4); const area_l = area_s * (sf**2); return { problem: `The area of a small polygon is \\(${area_s}\\). It is similar to a larger polygon with a scale factor of \\(${sf}\\). What is the area of the larger polygon?`, answer: `\\(${area_l}\\)`, checkAnswer: area_l.toString() }; },
    () => { const area_l = 100; const sf = 2; const area_s = area_l / (sf**2); return { problem: `The area of a large photo is \\(${area_l}\\) sq. inches. You reduce it by a scale factor of 1/${sf}. What is the new area?`, answer: `\\(${area_s}\\) sq. inches`, checkAnswer: area_s.toString() }; },
    () => { const base = getRandomInt(10, 20); const mid = base / 2; return { problem: `A line parallel to one side of a triangle intersects the other two sides, dividing them proportionally. If the base of the large triangle is \\(${base}\\) and the line is a midsegment, what is its length?`, answer: `\\(${mid}\\)`, checkAnswer: mid.toString() }; },
    () => { const part1 = getRandomInt(3, 5); const part2 = getRandomInt(6, 8); const side1 = getRandomInt(4, 7); const side2 = (part2 * side1) / part1; return { problem: `An angle bisector in a triangle divides the opposite side into segments of length \\(${part1}\\) and \\(${part2}\\). If the side adjacent to the first segment is \\(${side1}\\), what is the length of the other adjacent side?`, answer: `\\(${formatAnswer(side2)}\\)`, checkAnswer: formatAnswer(side2) }; },
    () => { const scale = 50; const map_dist = getRandomInt(3, 7); const actual_dist = map_dist * scale; return { problem: `The scale of a map is 1 inch = ${scale} miles. If two cities are \\(${map_dist}\\) inches apart on the map, how far are they in reality?`, answer: `\\(${actual_dist}\\) miles`, checkAnswer: actual_dist.toString() }; },
    () => { const a=3,b=4,c=5; const sf=getRandomInt(3,5); return { problem: `A right triangle has sides 3, 4, 5. A similar triangle has a hypotenuse of \\(${c*sf}\\). What are the lengths of its legs?`, answer: `\\(${a*sf}, ${b*sf}\\)`, checkAnswer: `${a*sf},${b*sf}` }; },
    () => { const vertices = [[0,0], [4,0], [2,3]]; const sf = 0.5; const {graphId, graphFunction} = createSimilarTrianglesGraph(vertices, sf); return { problem: `In the diagram, \\(\\triangle DEF\\) is a reduction of \\(\\triangle ABC\\). What is the scale factor from ABC to DEF?`, answer: `\\(${sf}\\)`, checkAnswer: sf.toString(), graphId, graphFunction }; },
    () => { const peri_ratio = 3; const area_ratio = peri_ratio**2; return { problem: `The ratio of the perimeters of two similar polygons is 3:1. What is the ratio of their areas? (Enter as x:y)`, answer: `\\(${area_ratio}:1\\)`, checkAnswer: `${area_ratio}:1` }; },
    () => { const area_ratio_val = 16; const peri_ratio = Math.sqrt(area_ratio_val); return { problem: `The ratio of the areas of two similar polygons is 16:1. What is the ratio of their perimeters? (Enter as x:y)`, answer: `\\(${peri_ratio}:1\\)`, checkAnswer: `${peri_ratio}:1` }; },
];
function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Similar figures have proportional sides and equal angles. Remember AA, SSS, and SAS similarity." };
}
export const module = { topicId: '10M7', topicName: 'Similarity', generateProblem: generate };

