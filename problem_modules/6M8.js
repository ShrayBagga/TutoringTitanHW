// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => ({ problem: `What is a statistical question?`, answer: `A question that can be answered by collecting data that varies.`, checkAnswer: `A question that can be answered by collecting data that varies.` }),
    () => ({ problem: `Is "How tall is the Eiffel Tower?" a statistical question?`, answer: `No, because it has a single answer. Data does not vary.`, checkAnswer: `No` }),
    () => ({ problem: `Is "How tall are the students in my class?" a statistical question?`, answer: `Yes, because the heights of students will vary.`, checkAnswer: `Yes` }),
    () => ({ problem: `What is the difference between categorical and numerical data?`, answer: `Categorical data are labels or names (e.g., colors), while numerical data are numbers (e.g., height).`, checkAnswer: `Categorical data are labels or names, while numerical data are numbers.` }),
    () => ({ problem: `Is 'favorite ice cream flavor' categorical or numerical data?`, answer: `Categorical`, checkAnswer: `Categorical` }),
    () => ({ problem: `Is 'number of pets' categorical or numerical data?`, answer: `Numerical`, checkAnswer: `Numerical` }),
    () => ({ problem: `What is a 'population' in statistics?`, answer: `The entire group that you want to draw conclusions about.`, checkAnswer: `The entire group` }),
    () => ({ problem: `What is a 'sample' in statistics?`, answer: `A specific group that you will collect data from, which is a subset of the population.`, checkAnswer: `A subset of the population` }),
    () => {
        const pop = "all students at a school";
        const samp = "50 randomly selected students";
        return { problem: `If a survey is conducted with \\(${samp}\\) to find out about the preferences of \\(${pop}\\), which is the sample and which is the population?`, answer: `Sample: \\(${samp}\\). Population: \\(${pop}\\).`, checkAnswer: `Sample:50,Population:all` };
    },
    () => ({ problem: `Why is random sampling important?`, answer: `It helps ensure the sample is representative of the population, reducing bias.`, checkAnswer: `It reduces bias` }),
    () => ({ problem: `What does 'data distribution' mean?`, answer: `It describes how data points are spread out or clustered together.`, checkAnswer: `How data points are spread out` }),
    () => {
        const question = "How many hours do 6th graders sleep per night?";
        return { problem: `You want to answer the question: "${question}". What data would you need to collect?`, answer: `The number of hours of sleep for a sample of 6th graders.`, checkAnswer: `hours of sleep` };
    },
    () => ({ problem: `What is 'variability' in a data set?`, answer: `The extent to which data points differ from each other.`, checkAnswer: `How much data points differ` }),
    () => {
        const setA = "5, 5, 5, 5"; const setB = "2, 5, 8, 12";
        return { problem: `Which data set has more variability: Set A (\\(${setA}\\)) or Set B (\\(${setB}\\))?`, answer: `Set B`, checkAnswer: `Set B` };
    },
    () => ({ problem: `Give an example of a question that would result in numerical data.`, answer: `Examples: How many minutes does it take you to get to school? What is your shoe size?`, checkAnswer: `How many minutes` }),
    () => ({ problem: `Give an example of a question that would result in categorical data.`, answer: `Examples: What is your favorite sport? What month were you born in?`, checkAnswer: `Favorite sport` }),
    () => ({ problem: `What is the first step in a statistical investigation?`, answer: `Formulating a statistical question.`, checkAnswer: `Formulating a question` }),
    () => ({ problem: `Name one way to collect data.`, answer: `Surveys, observations, experiments, or measurements.`, checkAnswer: `Surveys` }),
    () => {
        const topic = "the most popular lunch choice in the cafeteria";
        return { problem: `To investigate \\(${topic}\\), who should you survey?`, answer: `A random sample of students who eat in the cafeteria.`, checkAnswer: `A random sample of students` };
    },
    () => ({ problem: `What does it mean if a data set has a 'peak' or 'cluster'?`, answer: `It means that a large number of the data points are concentrated around a particular value.`, checkAnswer: `Data is concentrated` }),
];

function generate(settings) {
    const problemType = getRandomInt(0, problemGenerators.length - 1);
    const generator = problemGenerators[problemType];
    const problemData = generator();
    return { ...problemData, hint: problemData.hint || "Statistics is about collecting and analyzing data that varies." };
}

export const module = {
    topicId: 'g6_data_statistics_intro',
    topicName: 'Data & Statistics Introduction',
    generateProblem: generate
};
