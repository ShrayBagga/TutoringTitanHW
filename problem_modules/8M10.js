// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function formatAnswer(val, p=1) { return parseFloat(val.toFixed(p)).toString().replace(/\.0$/, ''); }

const problemGenerators = [
    () => { const r=getRandomInt(2,5), h=getRandomInt(5,10); const vol=Math.PI*r*r*h; return { problem: `Find the volume of a cylinder with radius \\(${r}\\) and height \\(${h}\\). (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(vol)}\\) cubic units`, checkAnswer: formatAnswer(vol) }; },
    () => { const r=getRandomInt(2,5), h=getRandomInt(5,10); const vol=(1/3)*Math.PI*r*r*h; return { problem: `Find the volume of a cone with radius \\(${r}\\) and height \\(${h}\\). (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(vol)}\\) cubic units`, checkAnswer: formatAnswer(vol) }; },
    () => { const r=getRandomInt(2,5); const vol=(4/3)*Math.PI*r**3; return { problem: `Find the volume of a sphere with radius \\(${r}\\). (Use \\(\\pi \\approx 3.14\\))`, answer: `\\(${formatAnswer(vol)}\\) cubic units`, checkAnswer: formatAnswer(vol) }; },
    () => { const d=getRandomInt(6,12), h=getRandomInt(8,15); const r=d/2; const vol=Math.PI*r*r*h; return { problem: `A can of soup is a cylinder with a diameter of \\(${d}\\) cm and a height of \\(${h}\\) cm. What is its volume?`, answer: `\\(${formatAnswer(vol)}\\) cm\\(^{3}\\)`, checkAnswer: formatAnswer(vol) }; },
    () => { const d=getRandomInt(6,12), h=d; const r=d/2; const vol=(1/3)*Math.PI*r*r*h; return { problem: `An ice cream cone has a diameter of \\(${d}\\) inches and a height of \\(${h}\\) inches. Find its volume.`, answer: `\\(${formatAnswer(vol)}\\) in\\(^{3}\\)`, checkAnswer: formatAnswer(vol) }; },
    () => { const d=getRandomInt(10,20); const r=d/2; const vol=(4/3)*Math.PI*r**3; return { problem: `A basketball has a diameter of \\(${d}\\) inches. What is its volume?`, answer: `\\(${formatAnswer(vol)}\\) in\\(^{3}\\)`, checkAnswer: formatAnswer(vol) }; },
    () => { const r=3, h=5; const vol_cyl=Math.PI*r*r*h; const vol_cone=(1/3)*vol_cyl; return { problem: `A cylinder and a cone have the same radius (\\(${r}\\)) and height (\\(${h}\\)). If the cylinder's volume is \\(${formatAnswer(vol_cyl)}\\), what is the cone's volume?`, answer: `\\(${formatAnswer(vol_cone)}\\)`, checkAnswer: formatAnswer(vol_cone) }; },
    () => { const r=3; const vol_sphere=(4/3)*Math.PI*r**3; const vol_cyl=Math.PI*r*r*(2*r); return { problem: `A sphere has radius \\(${r}\\). A cylinder has radius \\(${r}\\) and height \\(2r\\). How does the sphere's volume relate to the cylinder's?`, answer: `The sphere's volume is 2/3 of the cylinder's volume.`, checkAnswer: "2/3" }; },
    () => { const vol=314, h=10; const r=Math.sqrt(vol/(Math.PI*h)); return { problem: `A cylinder has a volume of \\(${vol}\\) and a height of \\(${h}\\). What is its radius?`, answer: `\\(${formatAnswer(r)}\\)`, checkAnswer: formatAnswer(r) }; },
    () => { const vol=37.68, r=3; const h = (vol*3)/(Math.PI*r*r); return { problem: `A cone has a volume of \\(${vol}\\) and a radius of \\(${r}\\). What is its height?`, answer: `\\(${formatAnswer(h)}\\)`, checkAnswer: formatAnswer(h) }; },
    () => { const vol=523.33, r=5; return { problem: `The volume of a sphere is approximately \\(${vol}\\). What is its radius?`, answer: `\\(${r}\\)`, checkAnswer: r.toString() }; },
    () => { const r=2, h=10; const vol=Math.PI*r*r*h; return { problem: `A pipe is a cylinder with radius ${r} inches and length ${h} feet. What is its volume in cubic inches?`, answer: `\\(${formatAnswer(vol*12)}\\) in\\(^{3}\\)`, checkAnswer: formatAnswer(vol*12), hint: "Convert height to inches first." }; },
    () => { const r=10; const vol=(1/2)*(4/3)*Math.PI*r**3; return { problem: `Find the volume of a hemisphere with a radius of \\(${r}\\).`, answer: `\\(${formatAnswer(vol)}\\)`, checkAnswer: formatAnswer(vol) }; },
    () => { const r_cone=3, h_cone=4; const r_hemi=3; const vol = (1/3)*Math.PI*r_cone**2*h_cone + (1/2)*(4/3)*Math.PI*r_hemi**3; return { problem: `Find the volume of a composite figure made of a cone (r=${r_cone}, h=${h_cone}) on top of a hemisphere (r=${r_hemi}).`, answer: `\\(${formatAnswer(vol)}\\)`, checkAnswer: formatAnswer(vol) }; },
    () => { return { problem: `If you double the radius of a cylinder, what happens to its volume?`, answer: `It becomes 4 times larger.`, checkAnswer: "4 times larger" }; },
    () => { return { problem: `If you double the height of a cone, what happens to its volume?`, answer: `It doubles.`, checkAnswer: "It doubles" }; },
    () => { return { problem: `If you double the radius of a sphere, what happens to its volume?`, answer: `It becomes 8 times larger.`, checkAnswer: "8 times larger" }; },
    () => { const d=12,h=2; const vol = Math.PI*(d/2)**2*h; return { problem: `A circular puddle has a diameter of ${d} ft and is ${h} inches deep. Find the volume in cubic feet.`, answer: `\\(${formatAnswer(vol/12)}\\) ft\\(^{3}\\)`, checkAnswer: formatAnswer(vol/12) }; },
    () => { const r=5,h=10; const vol = Math.PI*r*r*h; return { problem: `A cylindrical water tank has a radius of \\(${r}\\)m and height of \\(${h}\\)m. How many cubic meters of water can it hold?`, answer: `\\(${formatAnswer(vol)}\\) m\\(^{3}\\)`, checkAnswer: formatAnswer(vol) }; },
    () => { const r=6; const vol=4/3*Math.PI*r**3; return { problem: `An orange is roughly a sphere with a radius of ${r} cm. What is its approximate volume?`, answer: `\\(${formatAnswer(vol)}\\) cm\\(^{3}\\)`, checkAnswer: formatAnswer(vol) }; },
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Memorize the volume formulas. V(cyl)=pi*r^2*h, V(cone)=(1/3)pi*r^2*h, V(sphere)=(4/3)pi*r^3." };
}

export const module = {
    topicId: '8M10',
    topicName: 'Volume: Cones, Cylinders, Spheres',
    generateProblem: generate
};

