// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function formatAnswer(val, p=2) { return parseFloat(val.toFixed(p)).toString().replace(/\.00$/, ''); }

const problemGenerators = [
    () => { const scale = getRandomInt(2, 5); const drawing = getRandomInt(3, 8); const actual = drawing * scale; return { problem: `The scale of a drawing is 1 inch = ${scale} feet. If a wall is \\(${drawing}\\) inches long in the drawing, how long is the actual wall?`, answer: `\\(${actual}\\) feet`, checkAnswer: actual.toString() }; },
    () => { const scale = getRandomInt(10, 20); const actual = getRandomInt(5, 10) * scale; const drawing = actual / scale; return { problem: `A map has a scale of 1 cm = ${scale} km. If the actual distance between two cities is \\(${actual}\\) km, how far apart are they on the map?`, answer: `\\(${drawing}\\) cm`, checkAnswer: drawing.toString() }; },
    () => { const actual = 12; const drawing = 3; const scale = actual / drawing; return { problem: `A model car is \\(${drawing}\\) inches long. The actual car is \\(${actual}\\) feet long. What is the scale of the model in feet per inch?`, answer: `1 inch = \\(${scale}\\) feet`, checkAnswer: scale.toString() }; },
    () => { const s_w = 4, s_l = 6, factor = 2; return { problem: `A rectangle is \\(${s_w}\\) cm by \\(${s_l}\\) cm. If you create a scale drawing with a scale factor of \\(${factor}\\), what are the new dimensions?`, answer: `\\(${s_w*factor}\\) cm by \\(${s_l*factor}\\) cm`, checkAnswer: `${s_w*factor},${s_l*factor}` }; },
    () => { const s_w = 10, s_l = 15, factor = 0.5; return { problem: `A photograph is \\(${s_w}\"\\) by \\(${s_l}\"\\). You want to reduce it using a scale factor of \\(${factor}\\). What are the new dimensions?`, answer: `\\(${s_w*factor}\"\\) by \\(${s_l*factor}\"\\)`, checkAnswer: `${s_w*factor},${s_l*factor}` }; },
    () => { const actual_area = 100; const factor = 3; const new_area = actual_area * (factor**2); return { problem: `A square garden has an area of \\(${actual_area}\\) sq. ft. If you enlarge it by a scale factor of \\(${factor}\\), what is the new area?`, answer: `\\(${new_area}\\) sq. ft`, checkAnswer: new_area.toString(), hint:"The area changes by the square of the scale factor." }; },
    () => { const drawing_area = 25; const factor = 2; const actual_area = drawing_area * (factor**2); return { problem: `The area of a shape on a drawing is \\(${drawing_area}\\) sq. cm. The scale is 1 cm = ${factor} m. What is the actual area?`, answer: `\\(${actual_area}\\) sq. m`, checkAnswer: actual_area.toString() }; },
    () => { const w = 5, l = 8; return { problem: `Reproduce a \\(${w} \\times ${l}\\) rectangle using a scale factor of 1.5. What is the new length and width?`, answer: `New width: \\(${w*1.5}\\), New length: \\(${l*1.5}\\)`, checkAnswer: `${w*1.5},${l*1.5}` }; },
    () => { const actual = 50, drawing = 2; const scale = actual/drawing; return { problem: `An actual building is \\(${actual}\\) meters tall. A model of it is \\(${drawing}\\) cm tall. What is the scale in m/cm?`, answer: `\\(${scale}\\) m/cm`, checkAnswer: scale.toString() }; },
    () => { const factor = getRandomInt(2,4); const side = getRandomInt(3,5); return { problem: `A triangle has side lengths \\(${side}, ${side+1}, ${side+2}\\). What are the side lengths of a similar triangle with a scale factor of \\(${factor}\\)?`, answer: `\\(${side*factor}, ${(side+1)*factor}, ${(side+2)*factor}\\)`, checkAnswer: `${side*factor},${(side+1)*factor},${(side+2)*factor}` }; },
    () => { return { problem: `If a scale factor is greater than 1, the new figure is an _____.`, answer: `Enlargement`, checkAnswer: "Enlargement" }; },
    () => { return { problem: `If a scale factor is less than 1, the new figure is a _____.`, answer: `Reduction`, checkAnswer: "Reduction" }; },
    () => { const s = '1/2 inch = 5 feet'; return { problem: `What is the scale factor of a drawing with the scale \\(${s}\\)?`, answer: `1/120`, checkAnswer: "1/120", hint:"Convert feet to inches (5 feet = 60 inches), then find the ratio (0.5/60)." }; },
    () => { const scale = 1/100; const actual = 500; const model = actual * scale; return { problem: `A model airplane is built with a scale factor of \\(${scale}\\). If the actual plane's wingspan is \\(${actual}\\) cm, what is the model's wingspan?`, answer: `\\(${model}\\) cm`, checkAnswer: model.toString() }; },
    () => { const peri_drawing = 20; const factor = 3; const peri_actual = peri_drawing * factor; return { problem: `The perimeter of a polygon on a scale drawing is \\(${peri_drawing}\\) cm. If the scale factor is \\(${factor}\\), what is the perimeter of the actual polygon?`, answer: `\\(${peri_actual}\\) cm`, checkAnswer: peri_actual.toString() }; },
    () => { const s1 = 6, s2 = 9; const factor = s2/s1; return { problem: `Two triangles are similar. A side on the smaller triangle is \\(${s1}\\) cm and the corresponding side on the larger triangle is \\(${s2}\\) cm. What is the scale factor from the smaller to the larger triangle?`, answer: `\\(${factor}\\)`, checkAnswer: factor.toString() }; },
    () => { const scale = "1 cm = 2 meters"; const graphId = `graph-${Date.now()}`; const graphFunction = { functions: [], boundingbox: [0, 6, 4, 0] }; return { problem: `A rectangular room is 4cm by 3cm on a drawing with a scale of \\(${scale}\\). What are the actual dimensions?`, answer: `8 meters by 6 meters`, checkAnswer: "8,6" }; },
    () => { const actual = 15; const scale = 3; const drawing = actual/scale; return { problem: `A 15-foot tree is represented in a drawing with a scale of 1 inch = 3 feet. How tall is the tree in the drawing?`, answer: `\\(${drawing}\\) inches`, checkAnswer: drawing.toString() }; },
    () => { const factor = 0.25; const actual = 20; const drawing = actual*factor; return { problem: `A map is created with a scale factor of \\(${factor}\\). If a road is \\(${actual}\\) km long, how long is it on the map?`, answer: `\\(${drawing}\\) km`, checkAnswer: drawing.toString() }; },
    () => { const actual_w = 12, actual_l = 16, scale = 4; return { problem: `A rectangular park is \\(${actual_w}\\) ft by \\(${actual_l}\\) ft. You make a scale drawing with a scale of 1 inch = ${scale} feet. What is the area of the drawing in square inches?`, answer: `\\(${(actual_w/scale)*(actual_l/scale)}\\) sq. inches`, checkAnswer: ((actual_w/scale)*(actual_l/scale)).toString() }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Set up a proportion to relate the drawing dimensions to the actual dimensions." };
}

export const module = {
    topicId: '7M6',
    topicName: 'Scale Drawings & Figures',
    generateProblem: generate
};
