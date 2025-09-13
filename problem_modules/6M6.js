// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { const l = getRandomInt(5, 12); const w = getRandomInt(3, 8); return { problem: `Find the area of a rectangle with length \\(${l}\\) cm and width \\(${w}\\) cm.`, answer: `\\(${l*w}\\) cm\\(^{2}\\)`, checkAnswer: (l*w).toString() }; },
    () => { const s = getRandomInt(4, 10); return { problem: `Find the area of a square with a side length of \\(${s}\\) inches.`, answer: `\\(${s*s}\\) in\\(^{2}\\)`, checkAnswer: (s*s).toString() }; },
    () => { const b = getRandomInt(6, 14); const h = getRandomInt(4, 9); return { problem: `Find the area of a triangle with a base of \\(${b}\\) m and a height of \\(${h}\\) m.`, answer: `\\(${0.5*b*h}\\) m\\(^{2}\\)`, checkAnswer: (0.5*b*h).toString() }; },
    () => { const b = getRandomInt(5, 10); const h = getRandomInt(4, 8); return { problem: `Find the area of a parallelogram with a base of \\(${b}\\) ft and a height of \\(${h}\\) ft.`, answer: `\\(${b*h}\\) ft\\(^{2}\\)`, checkAnswer: (b*h).toString() }; },
    () => { const b1 = getRandomInt(8, 12); const b2 = getRandomInt(4, 7); const h = getRandomInt(5, 8); return { problem: `Find the area of a trapezoid with bases \\(${b1}\\) and \\(${b2}\\) and height \\(${h}\\).`, answer: `\\(${0.5*(b1+b2)*h}\\)`, checkAnswer: (0.5*(b1+b2)*h).toString() }; },
    () => { const l=getRandomInt(3,6); const w=getRandomInt(3,6); const h=getRandomInt(3,6); return { problem: `Find the volume of a rectangular prism with length \\(${l}\\), width \\(${w}\\), and height \\(${h}\\).`, answer: `\\(${l*w*h}\\) cubic units`, checkAnswer: (l*w*h).toString() }; },
    () => { const s = getRandomInt(3, 7); return { problem: `Find the volume of a cube with side length \\(${s}\\) cm.`, answer: `\\(${s*s*s}\\) cm\\(^{3}\\)`, checkAnswer: (s*s*s).toString() }; },
    () => { const l=getRandomInt(2,5); const w=getRandomInt(2,5); const h=getRandomInt(2,5); return { problem: `Find the surface area of a rectangular prism with dimensions \\(${l} \\times ${w} \\times ${h}\\).`, answer: `\\(${2*(l*w+l*h+w*h)}\\) square units`, checkAnswer: (2*(l*w+l*h+w*h)).toString() }; },
    () => { const s = getRandomInt(2, 6); return { problem: `Find the surface area of a cube with side length \\(${s}\\).`, answer: `\\(${6*s*s}\\) square units`, checkAnswer: (6*s*s).toString() }; },
    () => { const b=getRandomInt(3,5); const h=getRandomInt(4,6); const l=getRandomInt(5,8); const hyp = Math.sqrt(b*b+h*h); return { problem: `Find the surface area of a right triangular prism with base legs \\(${b}\\) and \\(${h}\\) and length \\(${l}\\).`, answer: `\\(${b*h + (b+h+hyp)*l}\\)`, checkAnswer: (b*h + (b+h+hyp)*l).toFixed(2) }; },
    () => { const x1=getRandomInt(1,3), y1=getRandomInt(1,3), x2=getRandomInt(4,6), y2=y1, x3=x1, y3=getRandomInt(4,6); return { problem: `A triangle is plotted at (\\(${x1},${y1}\\)), (\\(${x2},${y2}\\)), and (\\(${x3},${y3}\\)). Find its area.`, answer: `\\(${0.5*(x2-x1)*(y3-y1)}\\) sq. units`, checkAnswer: (0.5*(x2-x1)*(y3-y1)).toString() }; },
    () => { const l1=getRandomInt(8,12), w1=getRandomInt(6,10), l2=getRandomInt(3,5), w2=getRandomInt(3,5); return { problem: `A large rectangle (\\(${l1} \\times ${w1}\\)) has a smaller rectangle (\\(${l2} \\times ${w2}\\)) cut out. Find the area of the remaining shape.`, answer: `\\(${l1*w1 - l2*w2}\\) sq. units`, checkAnswer: (l1*w1 - l2*w2).toString() }; },
    () => { const side = getRandomInt(4, 7); return { problem: `A net of a cube is laid out. If one square face has an area of \\(${side*side}\\) sq. cm, what is the total surface area of the cube?`, answer: `\\(${6*side*side}\\) cm\\(^{2}\\)`, checkAnswer: (6*side*side).toString() }; },
    () => { const num=getRandomInt(3,5), den=getRandomInt(num+1,8), l=getRandomInt(4,10); return { problem: `What is the volume of a rectangular prism with dimensions \\(\\frac{${num}}{${den}}\\) ft, \\(${l}\\) ft, and \\(${den}\\) ft?`, answer: `\\(${num*l}\\) ft\\(^{3}\\)`, checkAnswer: (num*l).toString() }; },
    () => { const area = [25, 36, 49, 64, 81][getRandomInt(0,4)]; return { problem: `The area of a square is \\(${area}\\) m\\(^{2}\\). What is its side length?`, answer: `\\(${Math.sqrt(area)}\\) m`, checkAnswer: Math.sqrt(area).toString() }; },
    () => { const volume = [27, 64, 125][getRandomInt(0,2)]; return { problem: `The volume of a cube is \\(${volume}\\) cm\\(^{3}\\). What is its side length?`, answer: `\\(${Math.cbrt(volume)}\\) cm`, checkAnswer: Math.cbrt(volume).toString() }; },
    () => { const b = 10; const h = 5; return { problem: `A triangular garden has a base of \\(${b}\\) feet and an area of \\(25\\) sq. feet. What is its height?`, answer: `\\(${h}\\) feet`, checkAnswer: h.toString() }; },
    () => { const l = 5; const w = 4; return { problem: `A rectangular room has an area of \\(20\\) sq. meters and a length of \\(${l}\\) meters. What is its width?`, answer: `\\(${w}\\) meters`, checkAnswer: w.toString() }; },
    () => { const l=getRandomInt(5,8), w=getRandomInt(5,8), h=getRandomInt(5,8); return { problem: `How many 1x1x1 unit cubes can fit inside a rectangular prism of size \\(${l} \\times ${w} \\times ${h}\\)?`, answer: `\\(${l*w*h}\\)`, checkAnswer: (l*w*h).toString() }; },
    () => { const l=getRandomInt(8,10), w=getRandomInt(4,6), h=getRandomInt(2,4); return { problem: `A swimming pool is \\(${l}\\)m long, \\(${w}\\)m wide, and \\(${h}\\)m deep. How much water can it hold in cubic meters?`, answer: `\\(${l*w*h}\\) m\\(^{3}\\)`, checkAnswer: (l*w*h).toString() }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Memorize the area and volume formulas for basic shapes." };
}

export const module = {
    topicId: '6M6',
    topicName: 'Geometry: Area & Volume',
    generateProblem: generate
};
