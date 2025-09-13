// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { return { problem: `To find out the favorite TV show of all 7th graders in a school, a survey is given to 50 students in the cafeteria. Is this sample representative?`, answer: `It might be, but it could be biased if not all students eat in the cafeteria. A random sample from all 7th graders is better.`, checkAnswer: "biased" }; },
    () => { return { problem: `What is a random sample?`, answer: `A sample in which every member of the population has an equal chance of being selected.`, checkAnswer: "equal chance" }; },
    () => { return { problem: `You want to know the average height of players in the NBA. Would surveying professional basketball players be a biased or unbiased sample?`, answer: `Unbiased (or representative), because you are surveying the exact population you are interested in.`, checkAnswer: "Unbiased" }; },
    () => { const pop = 1000, sample_size = 100, fav = 60; const estimate = (fav/sample_size)*pop; return { problem: `In a random sample of \\(${sample_size}\\) students from a school of \\(${pop}\\), \\(${fav}\\) said they prefer pizza. Predict the number of students in the school who prefer pizza.`, answer: `About \\(${estimate}\\) students.`, checkAnswer: estimate.toString() }; },
    () => { return { problem: `Why would surveying only people at a library be a biased sample to find a city's favorite book genre?`, answer: `People at a library are more likely to enjoy reading than the general population.`, checkAnswer: "biased" }; },
    () => { const pop = 500, sample_size = 50, defective = 3; const percent = (defective/sample_size)*100; const estimate = pop*(defective/sample_size); return { problem: `A factory produces \\(${pop}\\) widgets. A random sample of \\(${sample_size}\\) finds \\(${defective}\\) are defective. What is the best prediction for the total number of defective widgets?`, answer: `About \\(${estimate}\\) widgets.`, checkAnswer: estimate.toString() }; },
    () => { return { problem: `To get a random sample of students from a school, you could: a) survey your friends, b) survey every 10th student from a list, c) survey the basketball team.`, answer: `b) survey every 10th student from a list (Systematic Sampling).`, checkAnswer: "b" }; },
    () => { return { problem: `Can we make a valid inference about a population from a biased sample?`, answer: `No, inferences from biased samples are often inaccurate.`, checkAnswer: "No" }; },
    () => { const sample1 = 10, sample2 = 1000; return { problem: `You conduct two random surveys to find the average number of pets. Sample 1 has \\(${sample1}\\) people, Sample 2 has \\(${sample2}\\) people. Which sample is likely to produce a more reliable inference?`, answer: `Sample 2, because it is much larger.`, checkAnswer: "Sample 2" }; },
    () => { const pop = 20000, sample=200, support=120; const estimate = (support/sample)*pop; return { problem: `In a town of \\(${pop}\\) voters, a random sample of \\(${sample}\\) people were asked about a candidate. \\(${support}\\) said they would vote for them. How many votes can the candidate expect?`, answer: `Around \\(${estimate}\\) votes.`, checkAnswer: estimate.toString() }; },
    () => { return { problem: `What does it mean to make an "inference" in statistics?`, answer: `To make a conclusion or prediction about a population based on data from a sample.`, checkAnswer: "make a conclusion" }; },
    () => { const pop_A=1000, pop_B=100000; return { problem: `A random sample of 100 people is taken from City A (pop. ${pop_A}) and City B (pop. ${pop_B}). For which city is the sample a smaller fraction of the population?`, answer: `City B`, checkAnswer: "City B" }; },
    () => { return { problem: `A radio station asks listeners to call in to vote for their favorite song. Is this a random sample?`, answer: `No, it's a voluntary response sample and is biased towards people who listen to that station and feel strongly.`, checkAnswer: "No" }; },
    () => { const total_fish = 500; const tagged_sample=50; const second_sample=40; const tagged_recaught=4; const estimate = (tagged_sample*second_sample)/tagged_recaught; return { problem: `Scientists use the capture-recapture method. They tag \\(${tagged_sample}\\) fish and release them. Later, they catch \\(${second_sample}\\) fish and find \\(${tagged_recaught}\\) are tagged. Estimate the total fish population.`, answer: `The estimated population is \\(${estimate}\\).`, checkAnswer: estimate.toString(), hint:"(tagged / total) = (recaught tagged / caught)" }; },
    () => { return { problem: `True or False: The larger the random sample, the more likely it is to accurately represent the population.`, answer: `True`, checkAnswer: "True" }; },
    () => { const school = "Oak Middle School"; return { problem: `To find the favorite subject of students at \\(${school}\\), you survey every student in one 7th grade math class. Is this sample random and representative?`, answer: `No, it is not random and only represents one specific class.`, checkAnswer: "No" }; },
    () => { const sample_mean = 7.5; return { problem: `A random sample of 7th graders' sleep hours gives a mean of \\(${sample_mean}\\) hours. What is a reasonable inference about the mean sleep hours for all 7th graders?`, answer: `It is likely close to \\(${sample_mean}\\) hours.`, checkAnswer: "close to 7.5" }; },
    () => { const pop = 300, sample = 30, late = 6; const estimate = pop * (late/sample); return { problem: `Out of \\(${pop}\\) employees, a random sample of \\(${sample}\\) are checked for tardiness. \\(${late}\\) were late. Predict how many employees in total were late.`, answer: `About \\(${estimate}\\) employees.`, checkAnswer: estimate.toString() }; },
    () => { return { problem: `You want to know the most common type of car in your town. Where would be a biased place to collect your sample?`, answer: `A dealership for a specific brand (e.g., a Ford dealership).`, checkAnswer: "dealership" }; },
    () => { return { problem: `What is the main goal of using sampling?`, answer: `To gather information about a large population without having to survey every single individual.`, checkAnswer: "gather information" }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "A good sample should be random and large enough to be representative of the whole population." };
}

export const module = {
    topicId: '7M9',
    topicName: 'Random Sampling & Inferences',
    generateProblem: generate
};
