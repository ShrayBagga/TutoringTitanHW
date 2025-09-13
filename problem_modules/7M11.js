// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
function formatFraction(num, den) { const common = gcd(num, den); return `\\frac{${num/common}}{${den/common}}`; }

const problemGenerators = [
    // --- Original 20 Problems, Now Randomized ---
    () => { const red=getRandomInt(3,7), blue=getRandomInt(2,5), green=getRandomInt(2,5), total=red+blue+green; return { problem: `A bag contains ${red} red, ${blue} blue, and ${green} green marbles. What is P(green)?`, answer: formatFraction(green, total), checkAnswer: `${green/gcd(green,total)}/${total/gcd(green,total)}` }; },
    () => { const num = getRandomInt(1,3); const sides = 6; return { problem: `What is the probability of rolling a number less than or equal to \\(${num}\\) on a standard ${sides}-sided die?`, answer: formatFraction(num, sides), checkAnswer: `${num/gcd(num,sides)}/${sides/gcd(num,sides)}` }; },
    () => { return { problem: `You flip a coin and roll a die. What is the probability of getting tails and a number less than 3?`, answer: `\\(\\frac{1}{2} \\times \\frac{2}{6} = \\frac{2}{12} = \\frac{1}{6}\\)`, checkAnswer: "1/6" }; },
    () => { const red=getRandomInt(4,6), blue=getRandomInt(4,6), total=red+blue; return { problem: `A bag has ${red} red and ${blue} blue marbles. You pick one, DON'T replace it, then pick another. What is P(blue, then blue)?`, answer: `\\(\\frac{${blue}}{${total}} \\times \\frac{${blue-1}}{${total-1}} = ${formatFraction(blue*(blue-1), total*(total-1))}\\)`, checkAnswer: `${(blue*(blue-1))/gcd(blue*(blue-1),total*(total-1))}/${(total*(total-1))/gcd(blue*(blue-1),total*(total-1))}` }; },
    () => { const red=getRandomInt(3,5), blue=getRandomInt(3,5), total=red+blue; return { problem: `A bag has ${red} red and ${blue} blue marbles. You pick one, you DO replace it, then pick another. What is P(red, then blue)?`, answer: `\\(\\frac{${red}}{${total}} \\times \\frac{${blue}}{${total}} = ${formatFraction(red*blue, total*total)}\\)`, checkAnswer: `${(red*blue)/gcd(red*blue,total*total)}/${(total*total)/gcd(red*blue,total*total)}` }; },
    () => { return { problem: `Are rolling a die and flipping a coin independent or dependent events?`, answer: `Independent`, checkAnswer: "Independent" }; },
    () => { return { problem: `Are drawing two cards from a deck without replacement independent or dependent events?`, answer: `Dependent`, checkAnswer: "Dependent" }; },
    () => { const letters = ["ALGEBRA", "GEOMETRY", "CALCULUS"]; const choice = letters[getRandomInt(0,2)]; const vowels = (choice.match(/[AEIOU]/gi) || []).length; const total = choice.length; return { problem: `What is the probability of randomly choosing a vowel from the letters in "${choice}"?`, answer: formatFraction(vowels, total), checkAnswer: `${vowels/gcd(vowels,total)}/${total/gcd(vowels,total)}` }; },
    () => { const probA = getRandomInt(2,5)/10, probB = getRandomInt(2,5)/10; return { problem: `If P(A) = ${probA} and P(B) = ${probB}, and they are independent, what is P(A and B)?`, answer: `\\(${probA*probB}\\)`, checkAnswer: (probA*probB).toString() }; },
    () => { return { problem: `You roll two dice. What is the probability that their sum is 3?`, answer: formatFraction(2, 36), checkAnswer: "1/18", hint:"The outcomes (1,2) and (2,1) result in a sum of 3." }; },
    () => { const rain = getRandomInt(2,4)/10, wind = getRandomInt(5,7)/10; return { problem: `The probability of rain is ${rain*100}% and the probability of wind is ${wind*100}%. If they are independent, what is the probability of it being rainy AND windy?`, answer: `${rain*wind*100}%`, checkAnswer: `${rain*wind*100}%` }; },
    () => { const red = getRandomInt(5,8), blue = getRandomInt(3,5), total = red + blue; return { problem: `A jar has ${red} red and ${blue} blue jellybeans. You pick one, eat it, then pick another. What is P(blue, then red)?`, answer: `\\(\\frac{${blue}}{${total}} \\times \\frac{${red}}{${total-1}} = ${formatFraction(blue*red, total*(total-1))}\\)`, checkAnswer: `${(blue*red)/gcd(blue*red,total*(total-1))}/${(total*(total-1))/gcd(blue*red,total*(total-1))}` }; },
    () => { const sides = getRandomInt(3,5)*2; return { problem: `A spinner is numbered 1-${sides}. What is P(even number)?`, answer: formatFraction(sides/2, sides), checkAnswer: "1/2" }; },
    () => { return { problem: `From a deck of 52 cards, what is the probability of drawing a face card (Jack, Queen, or King)?`, answer: formatFraction(12, 52), checkAnswer: "3/13", hint:"There are 3 face cards in each of the 4 suits." }; },
    () => { const prob_pass = getRandomInt(70,90)/100; const prob_both = prob_pass * prob_pass; return { problem: `The probability of passing a test is ${prob_pass*100}%. What is the probability that you and your friend (who studies independently) both pass?`, answer: `\\(${prob_both*100}\\%\\)`, checkAnswer: `${prob_both*100}%` }; },
    () => { const sides = 6; const items = getRandomInt(2,3); return { problem: `How many possible outcomes are there when you roll ${items} standard ${sides}-sided dice?`, answer: `\\(${sides**items}\\)`, checkAnswer: (sides**items).toString(), hint:"Use the fundamental counting principle." }; },
    () => { const letters = getRandomInt(2,3); const digits = getRandomInt(1,2); return { problem: `A password is ${letters} letters (A-Z) followed by ${digits} digit (0-9). How many combinations are possible if repetition is allowed?`, answer: `\\(26^{${letters}} \\times 10^{${digits}} = ${26**letters * 10**digits}\\)`, checkAnswer: (26**letters * 10**digits).toString() }; },
    () => { const colors = ["Red", "Green", "Blue", "Yellow"]; const numbers = ["Heads", "Tails"]; const c_choice = colors.slice(0, getRandomInt(2,4)); return { problem: `List the complete sample space for a spinner with colors \\(${c_choice.join(', ')}\\) and a coin.`, answer: `{${c_choice.map(c => `${c[0]}H, ${c[0]}T`).join(', ')}}`, checkAnswer: `{${c_choice.map(c => `${c[0]}H,${c[0]}T`).join(',')}}` }; },
    () => { const defective_rate = getRandomInt(2,10)/100; const pass_rate = 1 - defective_rate; return { problem: `The probability a light bulb is defective is ${defective_rate*100}%. What is the probability it is NOT defective?`, answer: `\\(${pass_rate*100}\\%\\)`, checkAnswer: `${pass_rate*100}%` }; },
    () => { return { problem: `You draw a card from a deck. What is P(King or Club)?`, answer: `\\(\\frac{4}{52} + \\frac{13}{52} - \\frac{1}{52} = \\frac{16}{52} = \\frac{4}{13}\\)`, checkAnswer: "4/13", hint:"Add the probabilities, but subtract the overlap (the King of Clubs)." }; },
    
    // --- New 10 Problems ---
    () => { const red=3, blue=4, green=5, total=12; return { problem: `Using the bag with ${red} red, ${blue} blue, and ${green} green marbles, what is P(red or blue)?`, answer: `\\(\\frac{3}{12} + \\frac{4}{12} = \\frac{7}{12}\\)`, checkAnswer: "7/12" }; },
    () => { const shirts = getRandomInt(3,5), pants = getRandomInt(2,4), shoes = 2; const outfits = shirts*pants*shoes; return { problem: `You have \\(${shirts}\\) shirts, \\(${pants}\\) pairs of pants, and \\(${shoes}\\) pairs of shoes. How many different outfits can you create?`, answer: `\\(${outfits}\\)`, checkAnswer: outfits.toString(), hint: "Multiply the number of options for each choice."}; },
    () => { const p_A = 0.6, p_B_given_A = 0.3; return { problem: `The probability of event A is 0.6. The probability of event B occurring given that A has occurred is 0.3. What is the probability of both A and B occurring?`, answer: `\\(P(A \\text{ and } B) = P(A) \\times P(B|A) = 0.6 \\times 0.3 = 0.18\\)`, checkAnswer: "0.18" }; },
    () => { const boys=12, girls=15, total=27; return { problem: `A class has \\(${boys}\\) boys and \\(${girls}\\) girls. Two students are chosen at random without replacement. What is the probability that both are girls?`, answer: `\\(\\frac{15}{27} \\times \\frac{14}{26} = \\frac{210}{702} \\approx 0.299\\)`, checkAnswer: "210/702" }; },
    () => { const data = [["Cat", 8], ["Dog", 12], ["Fish", 5]]; const total = 25; const dog_prob = 12/25; return { problem: `A survey of pet ownership is shown in the table. What is the probability that a randomly chosen person owns a dog? \n\n| Pet | Frequency |\n|:---:|:---:|\n| Cat | 8 |\n| Dog | 12 |\n| Fish| 5 |`, answer: `\\(\\frac{12}{25}\\) or 48%`, checkAnswer: "12/25" }; },
    () => { return { problem: `A tree diagram is used to represent what kind of probability events?`, answer: `A sequence of events, showing all possible outcomes.`, checkAnswer: "A sequence of events" }; },
    () => { return { problem: `You flip three coins. What is the probability of getting exactly two heads?`, answer: `\\(\\frac{3}{8}\\)`, checkAnswer: "3/8", hint: "The successful outcomes are HHT, HTH, and THH out of 8 total outcomes (2x2x2)." }; },
    () => { const sunny = 0.8; const late = 0.1; const both = sunny * late; return { problem: `The probability of a sunny day is 80%. The probability of the bus being late is 10% (independent events). What is the probability of a sunny day AND the bus being late?`, answer: `\\(0.8 \\times 0.1 = 0.08\\) or 8%`, checkAnswer: "8%" }; },
    () => { const sides = 8; return { problem: `An 8-sided die is rolled. What is the probability of rolling a prime number (2, 3, 5, 7)?`, answer: formatFraction(4,8), checkAnswer: "1/2" }; },
    () => { const total=52; const red=26; const ace=4; const red_ace=2; return { problem: `From a deck of 52 cards, what is P(Red or Ace)?`, answer: `\\(\\frac{26}{52} + \\frac{4}{52} - \\frac{2}{52} = \\frac{28}{52} = \\frac{7}{13}\\)`, checkAnswer: "7/13", hint:"Subtract the probability of the red aces to avoid double counting." }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "For 'and', multiply probabilities. For 'or', add them (and subtract any overlap)." };
}

export const module = {
    topicId: '7M11',
    topicName: 'Simple & Compound Probability',
    generateProblem: generate
};

