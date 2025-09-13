// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { return { problem: `If two figures are congruent, what do we know about their corresponding angles and sides?`, answer: `Corresponding angles are equal, and corresponding sides are equal in length.`, checkAnswer: "angles equal, sides equal" }; },
    () => { return { problem: `If two figures are similar, what do we know about their corresponding angles and sides?`, answer: `Corresponding angles are equal, and corresponding sides are proportional.`, checkAnswer: "angles equal, sides proportional" }; },
    () => { const angle=getRandomInt(30,60); return { problem: `Triangle ABC is congruent to Triangle XYZ. If angle A is \\(${angle}^{\\circ}\\), what is the measure of angle X?`, answer: `\\(${angle}^{\\circ}\\)`, checkAnswer: angle.toString() }; },
    () => { const side=getRandomInt(5,10); return { problem: `Pentagon PQRST is congruent to Pentagon LMNOP. If side PQ is \\(${side}\\) cm, what is the length of side LM?`, answer: `\\(${side}\\) cm`, checkAnswer: side.toString() }; },
    () => { const side_s=getRandomInt(3,5); const side_l=side_s*2; return { problem: `Triangle ABC is similar to Triangle DEF. Side AB is \\(${side_s}\\) and corresponding side DE is \\(${side_l}\\). What is the scale factor from ABC to DEF?`, answer: `2`, checkAnswer: "2" }; },
    () => { const side_l=getRandomInt(8,12); const side_s=side_l/2; return { problem: `Rectangle ABCD is similar to Rectangle WXYZ. Side AB is \\(${side_l}\\) and corresponding side WX is \\(${side_s}\\). What is the scale factor from ABCD to WXYZ?`, answer: `\\(0.5\\) or \\(\\frac{1}{2}\\)`, checkAnswer: "0.5" }; },
    () => { const s1=4, h1=6; const s2=s1*3; const h2=h1*3; return { problem: `A small statue is \\(${h1}\\) inches tall and casts a \\(${s1}\\)-inch shadow. A nearby flagpole casts a \\(${s2}\\)-inch shadow. How tall is the flagpole?`, answer: `\\(${h2}\\) inches`, checkAnswer: h2.toString(), hint:"Set up a proportion using similar triangles." }; },
    () => { return { problem: `Which sequence of transformations results in a congruent figure? (e.g., translation, reflection, rotation, dilation)`, answer: `Translation, reflection, and rotation.`, checkAnswer: "Translation, reflection, rotation" }; },
    () => { return { problem: `Which transformation results in a similar, but not congruent, figure (unless the scale factor is 1)?`, answer: `Dilation`, checkAnswer: "Dilation" }; },
    () => { return { problem: `Two squares are always _____. (congruent or similar)`, answer: `Similar`, checkAnswer: "Similar" }; },
    () => { return { problem: `Two circles are always _____. (congruent or similar)`, answer: `Similar`, checkAnswer: "Similar" }; },
    () => { const sf=3; const p1=12; const p2=p1*sf; return { problem: `The perimeter of a triangle is \\(${p1}\\). After a dilation, its perimeter is \\(${p2}\\). What was the scale factor?`, answer: `\\(${sf}\\)`, checkAnswer: sf.toString() }; },
    () => { const sf=2; const a1=10; const a2=a1*sf**2; return { problem: `The area of a rectangle is \\(${a1}\\). It is dilated by a scale factor of \\(${sf}\\). What is the new area?`, answer: `\\(${a2}\\)`, checkAnswer: a2.toString() }; },
    () => { const a=3,b=4,c=5; const sf=getRandomInt(2,4); return { problem: `A right triangle has sides 3, 4, 5. A similar triangle has a shortest side of 6. What are the lengths of the other two sides?`, answer: `8 and 10`, checkAnswer: "8,10" }; },
    () => { return { problem: `True or False: All rectangles are similar.`, answer: `False. Their side ratios may be different.`, checkAnswer: "False" }; },
    () => { return { problem: `A figure is reflected across the y-axis and then translated down 3 units. Is the resulting image congruent to the original?`, answer: `Yes`, checkAnswer: "Yes" }; },
    () => { const ang1=50, ang2=70, ang3=60; return { problem: `Two triangles have angle measures of \\(${ang1}, ${ang2}, ${ang3}\\). Are they necessarily similar?`, answer: `Yes (by AAA similarity).`, checkAnswer: "Yes" }; },
    () => { const side_a=10; const sf=1.5; const side_b=side_a*sf; return { problem: `Figure A has a side of length ${side_a}. Similar Figure B has a corresponding side of length ${side_b}. How many times larger is the perimeter of B?`, answer: `${sf} times larger`, checkAnswer: sf.toString() }; },
    () => { const v1='(0,0),(2,0),(0,3)'; const sf=3; const v2='(0,0),(6,0),(0,9)'; return { problem: `A triangle has vertices ${v1}. After a dilation by a factor of ${sf}, what are the new vertices?`, answer: `${v2}`, checkAnswer: "(0,0),(6,0),(0,9)" }; },
    () => { return { problem: `If you can map one figure onto another using only rigid transformations, the figures are _____.`, answer: `Congruent`, checkAnswer: "Congruent" }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Congruent figures are identical copies. Similar figures are scaled versions of each other." };
}

export const module = {
    topicId: '8M9',
    topicName: 'Congruence & Similarity',
    generateProblem: generate
};
