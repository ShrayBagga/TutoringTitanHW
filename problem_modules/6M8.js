// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

// --- Content Pools for Randomization ---
const numericalContexts = ["the heights of students in a class", "the number of pets each student owns", "the time it takes for students to get to school", "the shoe sizes of players on a team"];
const categoricalContexts = ["the favorite ice cream flavors of students", "the birth month of each student", "the most popular sport in a school", "the eye color of people in a room"];
const singleAnswerContexts = ["how tall you are", "the height of Mount Everest", "how many wheels are on a bicycle", "what the temperature is right now"];

const problemGenerators = [
    // --- Existing 20 problems, now with randomized contexts ---
    () => ({ problem: `What is a statistical question?`, answer: `A question that can be answered by collecting data that varies.`, checkAnswer: `A question that can be answered by collecting data that varies.` }),
    () => {
        const context = singleAnswerContexts[getRandomInt(0, singleAnswerContexts.length - 1)];
        return { problem: `Is "What is ${context}?" a statistical question?`, answer: `No, because it has a single, factual answer. The data does not vary.`, checkAnswer: `No` };
    },
    () => {
        const context = numericalContexts[getRandomInt(0, numericalContexts.length - 1)];
        return { problem: `Is "What are ${context}?" a statistical question?`, answer: `Yes, because the answer will vary from person to person.`, checkAnswer: `Yes` };
    },
    () => ({ problem: `What is the difference between categorical and numerical data?`, answer: `Categorical data are labels or names (e.g., colors), while numerical data are numbers (e.g., height).`, checkAnswer: `Categorical data are labels or names, while numerical data are numbers.` }),
    () => {
        const context = categoricalContexts[getRandomInt(0, categoricalContexts.length - 1)];
        return { problem: `Is data collected about "${context}" categorical or numerical?`, answer: `Categorical`, checkAnswer: `Categorical` };
    },
    () => {
        const context = numericalContexts[getRandomInt(0, numericalContexts.length - 1)];
        return { problem: `Is data about "${context}" categorical or numerical?`, answer: `Numerical`, checkAnswer: `Numerical` };
    },
    () => ({ problem: `What is a 'population' in statistics?`, answer: `The entire group that you want to draw conclusions about.`, checkAnswer: `The entire group` }),
    () => ({ problem: `What is a 'sample' in statistics?`, answer: `A specific group that you will collect data from, which is a subset of the population.`, checkAnswer: `A subset of the population` }),
    () => {
        const pop = "all middle school students in a city";
        const samp = `${getRandomInt(50, 100)} randomly selected students from each middle school`;
        return { problem: `To study \\(${pop}\\), a researcher surveys \\(${samp}\\). Which is the sample and which is the population?`, answer: `Sample: \\(${samp}\\). Population: \\(${pop}\\).`, checkAnswer: `Sample,Population` };
    },
    () => ({ problem: `Why is random sampling important?`, answer: `It helps ensure the sample is representative of the population, reducing bias.`, checkAnswer: `It reduces bias` }),
    () => ({ problem: `What does 'data distribution' mean?`, answer: `It describes how data points are spread out or clustered together.`, checkAnswer: `How data points are spread out` }),
    () => {
        const context = numericalContexts[getRandomInt(0, numericalContexts.length - 1)];
        return { problem: `You want to investigate \\(${context}\\). What data would you need to collect?`, answer: `You would need to collect that specific data (e.g., height, number of pets) from a sample of individuals.`, checkAnswer: `collect data` };
    },
    () => ({ problem: `What is 'variability' in a data set?`, answer: `The extent to which data points differ from each other.`, checkAnswer: `How much data points differ` }),
    () => {
        const staticNum = getRandomInt(5,10);
        const setA = `${staticNum}, ${staticNum}, ${staticNum}, ${staticNum}`; 
        const setB = `${staticNum-3}, ${staticNum}, ${staticNum+2}, ${staticNum+5}`;
        return { problem: `Which data set has more variability: Set A (\\(${setA}\\)) or Set B (\\(${setB}\\))?`, answer: `Set B`, checkAnswer: `Set B` };
    },
    () => {
        const question = numericalContexts[getRandomInt(0, numericalContexts.length - 1)];
        return { problem: `Give an example of a question you could ask to gather data about \\(${question}\\).`, answer: `How tall are you in inches? How many pets live in your home?`, checkAnswer: `How tall are you` };
    },
    () => {
        const question = categoricalContexts[getRandomInt(0, categoricalContexts.length - 1)];
        return { problem: `Give an example of a question you could ask to gather data about \\(${question}\\).`, answer: `What is your favorite flavor of ice cream? What sport do you prefer to watch?`, checkAnswer: `What is your favorite` };
    },
    () => ({ problem: `What is the first step in a statistical investigation?`, answer: `Formulating a statistical question.`, checkAnswer: `Formulating a question` }),
    () => ({ problem: `Name one way to collect data.`, answer: `Surveys, observations, experiments, or measurements.`, checkAnswer: `Surveys` }),
    () => {
        const topic = categoricalContexts[getRandomInt(0, categoricalContexts.length - 1)];
        return { problem: `To investigate \\(${topic}\\), who should you survey?`, answer: `A random sample of the population you are interested in (e.g., students in the school).`, checkAnswer: `A random sample` };
    },
    () => ({ problem: `What does it mean if a data set has a 'peak' or 'cluster'?`, answer: `It means that a large number of the data points are concentrated around a particular value.`, checkAnswer: `Data is concentrated` }),
    // --- New 10 problems ---
    () => ({ problem: `Which type of data can be described by a mean: categorical or numerical?`, answer: `Numerical`, checkAnswer: `Numerical` }),
    () => {
        const context = ["all the trees in a forest", "all the cars in a city"];
        const sample = ["100 trees in a specific area", "500 cars registered in the city"];
        const index = getRandomInt(0,1);
        return { problem: `A scientist wants to study \\(${context[index]}\\). They collect data from \\(${sample[index]}\\). Identify the population.`, answer: `The population is \\(${context[index]}\\).`, checkAnswer: `all` };
    },
    () => {
        const question = ["What is the most common car color?", "What is the average price of a house?"];
        const type = ["Categorical", "Numerical"];
        const index = getRandomInt(0,1);
        return { problem: `What type of data would you collect to answer the question: "${question[index]}"?`, answer: `\\(${type[index]}\\)`, checkAnswer: type[index] };
    },
    () => ({ problem: `A survey asks "Do you prefer summer or winter?". What kind of data will this question generate?`, answer: `Categorical`, checkAnswer: `Categorical` }),
    () => ({ problem: `A survey asks "How many books did you read last month?". What kind of data will this question generate?`, answer: `Numerical`, checkAnswer: `Numerical` }),
    () => ({ problem: `True or False: A statistical question can have only one possible answer.`, answer: `False`, checkAnswer: `False` }),
    () => {
        const context = ["your teacher's age", "the ages of all the teachers in the school"];
        const index = getRandomInt(0,1);
        return { problem: `Which of these is a statistical question: "What is ${context[0]}?" or "What are ${context[1]}?"`, answer: `What are ${context[1]}?`, checkAnswer: "What are the ages of all the teachers in the school?" };
    },
    () => ({ problem: `What is a potential problem if a sample is not chosen randomly?`, answer: `The sample may be biased and not accurately represent the population.`, checkAnswer: `biased` }),
    () => {
        const data = [1, 1, 1, 10, 10, 20];
        return { problem: `Describe the distribution of this data set: \\(${data.join(', ')}\\).`, answer: `The data has two clusters, one around 1 and another around 10.`, checkAnswer: "two clusters" };
    },
    () => ({ problem: `If you survey only your friends to find the most popular music artist, is your sample representative of the whole school?`, answer: `No, because your friends may have similar tastes that are different from the rest of the school.`, checkAnswer: `No` }),
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Statistics is about collecting and analyzing data that varies." };
}

export const module = {
    topicId: '6M8',
    topicName: 'Data & Statistics Introduction',
    generateProblem: generate
};