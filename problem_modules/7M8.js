// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function formatAnswer(val, p=2) { return parseFloat(val.toFixed(p)).toString().replace(/\.00$/, ''); }

const problemGenerators = [
    () => { return { problem: `If you slice a rectangular prism parallel to its base, what 2D shape is the cross-section?`, answer: `A rectangle`, checkAnswer: "Rectangle" }; },
    () => { return { problem: `If you slice a cube with a plane that passes through opposite corners diagonally, what shape is the cross-section?`, answer: `A rectangle`, checkAnswer: "Rectangle" }; },
    () => { return { problem: `What 2D shape is formed by slicing a cylinder parallel to its base?`, answer: `A circle`, checkAnswer: "Circle" }; },
    () => { return { problem: `What 2D shape is formed by slicing a cylinder perpendicular to its base, through the center?`, answer: `A rectangle`, checkAnswer: "Rectangle" }; },
    () => { return { problem: `If you slice a square pyramid parallel to its base, what shape is the cross-section?`, answer: `A square`, checkAnswer: "Square" }; },
    () => { return { problem: `If you slice a square pyramid through its apex and perpendicular to the base, what shape is the cross-section?`, answer: `A triangle`, checkAnswer: "Triangle" }; },
    () => { return { problem: `What 3D figure has two parallel, congruent circular bases?`, answer: `A cylinder`, checkAnswer: "Cylinder" }; },
    () => { const b = getRandomInt(3,6), h = getRandomInt(4,7), l = getRandomInt(8,12); const sa = b*h + (b+h+Math.sqrt(b*b+h*h))*l; return { problem: `Find the surface area of a right triangular prism whose base is a right triangle with legs \\(${b}\\) and \\(${h}\\), and whose length is \\(${l}\\).`, answer: `\\(${formatAnswer(sa)}\\) sq. units`, checkAnswer: formatAnswer(sa) }; },
    () => { const b = getRandomInt(4,8), h = getRandomInt(5,10), l = getRandomInt(10,15); const vol = 0.5 * b * h * l; return { problem: `Find the volume of a triangular prism whose triangular base has a base of \\(${b}\\) and height of \\(${h}\\), and prism length is \\(${l}\\).`, answer: `\\(${vol}\\) cubic units`, checkAnswer: vol.toString() }; },
    () => { const l=5,w=4,h=3; const box1_v = l*w*h; const box2_v = (l+2)*(w+2)*(h+2); return { problem: `A box measures ${l}x${w}x${h}. A second box has each dimension increased by 2. How much greater is the volume of the second box?`, answer: `\\(${box2_v-box1_v}\\) cubic units greater`, checkAnswer: (box2_v-box1_v).toString() }; },
    () => { return { problem: `Describe the faces of a triangular pyramid.`, answer: `Four triangular faces.`, checkAnswer: "Four triangular faces" }; },
    () => { const r=getRandomInt(3,5), h=getRandomInt(6,10); const sa = 2*Math.PI*r*h + 2*Math.PI*r*r; return { problem: `Find the surface area of a cylinder with radius \\(${r}\\) and height \\(${h}\\). (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(sa)}\\) sq. units`, checkAnswer: formatAnswer(sa) }; },
    () => { const r=getRandomInt(2,4), h=getRandomInt(5,8); const vol = Math.PI*r*r*h; return { problem: `Find the volume of a cylinder with radius \\(${r}\\) and height \\(${h}\\). (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(vol)}\\) cubic units`, checkAnswer: formatAnswer(vol) }; },
    () => { const shape = ["cube", "rectangular prism"][getRandomInt(0,1)]; return { problem: `How many faces does a \\(${shape}\\) have?`, answer: `6`, checkAnswer: "6" }; },
    () => { return { problem: `If you slice a cone parallel to its base, what is the shape of the cross-section?`, answer: `A circle`, checkAnswer: "Circle" }; },
    () => { const l=10, w=10, h=10; const sa = 6*l*l; return { problem: `A large cube is made of smaller 1x1x1 unit cubes. If the large cube has a side length of ${l}, what is its surface area?`, answer: `\\(${sa}\\)`, checkAnswer: sa.toString() }; },
    () => { const l=3, w=4, h=5; const vol = l*w*h; return { problem: `A fish tank is a rectangular prism with dimensions ${l}ft x ${w}ft x ${h}ft. What is its volume?`, answer: `\\(${vol}\\) cubic feet`, checkAnswer: vol.toString() }; },
    () => { const r_can = 2, h_can = 5; const vol_can = Math.PI*r_can*r_can*h_can; const l_box=10, w_box=10, h_box=5; const vol_box = l_box*w_box*h_box; const num_cans = Math.floor(vol_box/vol_can); return { problem: `How many cylindrical cans of radius ${r_can}\" and height ${h_can}\" can fit inside a box that is ${l_box}\"x${w_box}\"x${h_box}\"? (approximate)`, answer: `Approximately \\(${num_cans}\\) cans`, checkAnswer: num_cans.toString(), hint:"Compare the volumes." }; },
    () => { const r=4; const area_base = Math.PI*r*r; const vol = 4/3*Math.PI*r*r*r; return { problem: `What 3D shape produces a circular cross-section no matter which direction it is sliced through the center?`, answer: `A sphere`, checkAnswer: "Sphere" }; },
    () => { const outer=6, inner=4; const vol = outer**3 - inner**3; return { problem: `A hollow cube has an outer side length of ${outer} cm and an inner side length of ${inner} cm. What is the volume of the material the cube is made of?`, answer: `\\(${vol}\\) cm\\(^{3}\\)`, checkAnswer: vol.toString() }; },
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Visualize the 3D shape and how the plane would cut through it." };
}

export const module = {
    topicId: '7M8',
    topicName: 'Geometry: 3D Figures & Slicing',
    generateProblem: generate
};
