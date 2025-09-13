// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
function formatFraction(num, den) { const common = gcd(num, den); return `\\frac{${num/common}}{${den/common}}`; }

const problemGenerators = [
    () => { const evens = 3, sides = 6; return { problem: `What is the probability of rolling an even number on a standard ${sides}-sided die?`, answer: formatFraction(evens, sides), checkAnswer: "1/2" }; },
    () => { const hearts = 13, total = 52; return { problem: `What is the probability of drawing a heart from a standard deck of ${total} cards?`, answer: formatFraction(hearts, total), checkAnswer: "1/4" }; },
    () => ({ problem: `What is the probability of an event that is certain to happen?`, answer: `1`, checkAnswer: "1" }),
    () => ({ problem: `What is the probability of an event that is impossible?`, answer: `0`, checkAnswer: "0" }),
    () => { const red = getRandomInt(3, 6); const blue = getRandomInt(3, 6); const total = red + blue; return { problem: `A bag contains \\(${red}\\) red marbles and \\(${blue}\\) blue marbles. What is the probability of picking a red marble?`, answer: formatFraction(red, total), checkAnswer: `${red/gcd(red,total)}/${total/gcd(red,total)}` }; },
    () => ({ problem: `The probability of rain is 40%. What is the probability that it will NOT rain?`, answer: `60%`, checkAnswer: "60%" }),
    () => ({ problem: `You flip a coin. What is the sample space (all possible outcomes)?`, answer: `\\(\\{Heads, Tails\\}\\)`, checkAnswer: "{Heads,Tails}" }),
    () => { return { problem: `What is the theoretical probability of flipping a coin and getting heads?`, answer: `\\(\\frac{1}{2}\\)`, checkAnswer: "1/2" }; },
    () => { const heads = 45, totalFlips = 100; return { problem: `You flip a coin \\(${totalFlips}\\) times and get \\(${heads}\\) heads. What is the experimental probability of getting heads?`, answer: formatFraction(heads, totalFlips), checkAnswer: `${heads/gcd(heads,totalFlips)}/${totalFlips/gcd(heads,totalFlips)}` }; },
    () => { const prob = 0.25, spins = 200; return { problem: `The probability of a spinner landing on blue is \\(${prob}\\). If you spin it \\(${spins}\\) times, how many times would you expect it to land on blue?`, answer: `\\(${prob*spins}\\) times`, checkAnswer: (prob*spins).toString() }; },
    () => { const val = getRandomInt(1, 6); return { problem: `What is the probability of rolling a \\(${val}\\) on a standard 6-sided die?`, answer: `\\(\\frac{1}{6}\\)`, checkAnswer: "1/6" }; },
    () => { const red=3, green=4, blue=5, total = red+green+blue; return { problem: `A spinner has ${red} red, ${green} green, and ${blue} blue sections. What is P(blue)?`, answer: formatFraction(blue, total), checkAnswer: `${blue/gcd(blue,total)}/${total/gcd(blue,total)}` }; },
    () => { return { problem: `You roll a die and flip a coin. How many possible outcomes are there?`, answer: `12`, checkAnswer: "12", hint: "Use the fundamental counting principle: 6 outcomes for the die x 2 outcomes for the coin." }; },
    () => { return { problem: `A number from 1 to 10 is chosen. What is P(even or greater than 5)?`, answer: `\\(\\frac{7}{10}\\)`, checkAnswer: "7/10", hint: "The unique numbers satisfying the condition are 2,4,6,7,8,9,10." }; },
    () => { return { problem: `What is the complement of rolling a 6 on a die?`, answer: `Rolling a 1, 2, 3, 4, or 5.`, checkAnswer: "Rolling a 1, 2, 3, 4, or 5." }; },
    () => { return { problem: `If a day of the week is chosen randomly, what is the probability it starts with the letter 'T'?`, answer: formatFraction(2, 7), checkAnswer: "2/7" }; },
    () => { const red = 5, notRed = 7, total = red + notRed; return { problem: `A bag has \\(${total}\\) marbles. The probability of picking red is \\(\\frac{${red}}{${total}}\\). How many marbles are NOT red?`, answer: `\\(${notRed}\\)`, checkAnswer: notRed.toString() }; },
    () => { return { problem: `A weather forecast states a 90% chance of sunshine. Is this event likely, unlikely, or neither?`, answer: `Likely`, checkAnswer: "Likely" }; },
    () => { return { problem: `What is the probability of picking a vowel from the letters in "MATHEMATICS"?`, answer: formatFraction(4, 11), checkAnswer: "4/11" }; },
    () => { return { problem: `You roll two dice. What is the probability that the sum of the numbers is 7?`, answer: formatFraction(6, 36), checkAnswer: "1/6", hint:"The combinations are (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) out of 36 total outcomes." }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Probability = (Favorable Outcomes) / (Total Possible Outcomes)." };
}

export const module = {
    topicId: '6M12',
    topicName: 'Basic Probability',
    generateProblem: generate
};