// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { 
        return { 
            problem: `You want to simulate flipping a fair coin. What tool could you use?`, 
            answer: `A random number generator (1=heads, 2=tails), a 6-sided die (even=heads, odd=tails), or actually flipping a coin.`, 
            // CORRECTED: checkAnswer is now an array of acceptable short answers.
            checkAnswer: ["coin", "a coin", "flipping a coin", "die", "a die", "a 6-sided die", "random number generator", "a random number generator"] 
        }; 
    },
    () => { return { problem: `How could you use a standard 6-sided die to simulate an event with a 1/3 probability of success?`, answer: `Let rolling a 1 or 2 be a success, and 3, 4, 5, 6 be a failure.`, checkAnswer: ["rolling a 1 or 2", "roll a 1 or 2"] }; },
    () => { return { problem: `A basketball player makes 75% of their free throws. How could you simulate one free throw using a random number generator from 1 to 4?`, answer: `Let the numbers 1, 2, and 3 represent a made shot, and 4 represent a missed shot.`, checkAnswer: ["1,2,3 is a make", "use numbers 1-3"] }; },
    () => { return { problem: `In a simulation of 100 coin flips, you get 55 heads. What is the experimental probability of getting heads?`, answer: `\\(\\frac{55}{100} = 55\\%\\)`, checkAnswer: "55%" }; },
    () => { return { problem: `Why are simulations useful in probability?`, answer: `They help estimate probabilities of complex events that are difficult to calculate theoretically.`, checkAnswer: ["estimate complex events", "to estimate probabilities"] }; },
    () => { return { problem: `You want to simulate guessing correctly on a 4-option multiple choice question. How could you use a spinner?`, answer: `Use a spinner with 4 equal sections. Let one section represent the correct answer.`, checkAnswer: "spinner with 4 sections" }; },
    () => { const prob = "20%"; return { problem: `An event has a \\(${prob}\\) chance of occurring. How can you simulate this with random digits from 0-9?`, answer: `Let two digits (e.g., 0 and 1) represent the event occurring, and the other eight digits represent it not occurring.`, checkAnswer: ["two digits", "use 2 digits"] }; },
    () => { const trials = 50; const successes = 10; return { problem: `A simulation is run \\(${trials}\\) times, and a desired outcome occurs \\(${successes}\\) times. What is the experimental probability?`, answer: `\\(\\frac{${successes}}{${trials}} = \\frac{1}{5}\\)`, checkAnswer: "1/5" }; },
    () => { return { problem: `To simulate the probability of having a boy or a girl, what is the most common and simple tool to use?`, answer: `A fair coin.`, checkAnswer: ["a coin", "coin"] }; },
    () => { return { problem: `The more trials you run in a simulation, the closer the experimental probability will get to the ____ probability.`, answer: `Theoretical`, checkAnswer: "theoretical" }; },
    () => { const cereal = "1/5"; return { problem: `A prize is packed in \\(${cereal}\\) of cereal boxes. How would you use a 6-sided die to simulate opening one box?`, answer: `This is difficult with a die. A better tool would be a random number generator from 1-5, where 1 is finding a prize.`, checkAnswer: "random number generator" }; },
    () => { return { problem: `You simulate rolling two dice and summing them 100 times. You find the sum is 7 twelve times. What is your experimental probability of rolling a sum of 7?`, answer: `\\(\\frac{12}{100} = 12\\%\\)`, checkAnswer: "12%" }; },
    () => { const items=["a coin", "a die", "a spinner"]; const i=getRandomInt(0,2); return { problem: `Name a device that can be used to generate random outcomes for a simulation.`, answer: `Examples: ${items[i]}`, checkAnswer: ["a coin", "a die", "a spinner", "coin", "die", "spinner"] }; },
    () => { return { problem: `What is the first step in designing a probability simulation?`, answer: `Identify the simple event and its theoretical probability.`, checkAnswer: ["identify the event", "identify the simple event"] }; },
    () => { const rain_prob = 0.6; return { problem: `To simulate a 60% chance of rain, you could use 10 colored marbles. How many should be 'rain' colored?`, answer: `6`, checkAnswer: "6" }; },
    () => { return { problem: `True or False: A single trial of a simulation can prove a theory.`, answer: `False. Many trials are needed to get a reliable estimate.`, checkAnswer: "False" }; },
    () => { const prob = "1/6"; return { problem: `You want to simulate an event with a \\(${prob}\\) probability. What is a simple and appropriate tool?`, answer: `A standard 6-sided die.`, checkAnswer: ["a die", "die", "a 6-sided die"] }; },
    () => { const exp_prob = 0.52, theo_prob = 0.5; return { problem: `The theoretical probability of heads is 50%. A simulation of 1000 flips gives an experimental probability of 52%. Is this result reasonable?`, answer: `Yes, experimental results are rarely exactly the same as theoretical ones, especially with a limited number of trials.`, checkAnswer: "Yes" }; },
    () => { const teamA_win = 0.7; return { problem: `Team A has a 70% chance of winning a game. Describe a simulation using random numbers 0-9 to predict if they win.`, answer: `Let digits 0-6 represent a win for Team A, and 7-9 represent a loss.`, checkAnswer: "0-6 win" }; },
    () => { return { problem: `What is the purpose of conducting a large number of trials in a simulation?`, answer: `To improve the accuracy of the experimental probability and make it a better estimate of the theoretical probability.`, checkAnswer: ["improve accuracy", "to improve accuracy"] }; },
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "A simulation uses random chance to model real-world situations." };
}

export const module = {
    topicId: '7M12',
    topicName: 'Probability Simulations',
    generateProblem: generate
};