// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => ({ problem: `What is a dot plot used for?`, answer: `To show the frequency of each value in a data set.`, checkAnswer: "frequency" }),
    () => ({ problem: `What is a histogram used for?`, answer: `To show the frequency of data in equal intervals or bins.`, checkAnswer: "frequency in intervals" }),
    () => ({ problem: `What is a box plot (box-and-whisker plot) used for?`, answer: `To show the distribution of a data set using 5 key values: minimum, Q1, median, Q3, and maximum.`, checkAnswer: "distribution using 5 values" }),
    () => ({ problem: `A dot plot has 5 dots above the number 7. What does this mean?`, answer: `The value 7 appeared 5 times in the data set.`, checkAnswer: "7 appeared 5 times" }),
    () => ({ problem: `In a histogram, a bar for the interval 10-19 has a height of 8. What does this mean?`, answer: `There are 8 data points between 10 and 19 (inclusive).`, checkAnswer: "8 data points between 10 and 19" }),
    () => ({ problem: `What does the "box" in a box plot represent?`, answer: `The middle 50% of the data (the range from Q1 to Q3).`, checkAnswer: "middle 50%" }),
    () => ({ problem: `What is the line inside the box of a box plot?`, answer: `The median (or Q2).`, checkAnswer: "median" }),
    () => ({ problem: `What data is needed to create a box plot?`, answer: `The five-number summary: minimum, first quartile (Q1), median, third quartile (Q3), and maximum.`, checkAnswer: "five-number summary" }),
    () => { const data = [1, 2, 2, 3, 3, 3, 4, 5]; return { problem: `For the data \\(${data.join(', ')}\\), what is the peak of the distribution shown on a dot plot?`, answer: `The peak is at 3.`, checkAnswer: "3" }; },
    () => ({ problem: `Can you determine the exact mean from a histogram?`, answer: `No, you can only estimate the mean because individual data values are lost in the intervals.`, checkAnswer: "No" }),
    () => ({ problem: `Can you determine the exact median from a box plot?`, answer: `Yes, it is the line inside the box.`, checkAnswer: "Yes" }),
    () => ({ problem: `If a histogram has a bar missing for an interval, what does that indicate?`, answer: `There is a gap in the data; no values fell within that interval.`, checkAnswer: "a gap" }),
    () => ({ problem: `Which display is better for showing the shape of a distribution for a large numerical data set, a dot plot or a histogram?`, answer: `A histogram.`, checkAnswer: "histogram" }),
    () => ({ problem: `A box plot is described as "skewed right". What does this look like?`, answer: `The whisker and the part of the box on the right side of the median are longer.`, checkAnswer: "right side is longer" }),
    () => ({ problem: `What does the total length of the whiskers and box in a box plot represent?`, answer: `The range of the data.`, checkAnswer: "range" }),
    () => ({ problem: `You survey students about their favorite color. What would be the best way to display this data?`, answer: `A bar graph (or circle graph), since the data is categorical.`, checkAnswer: "bar graph" }),
    () => { const data = "10, 20, 25, 28, 30, 32, 40, 45, 50"; return { problem: `For the data set \\(${data}\\), what is the median (Q2)?`, answer: `30`, checkAnswer: "30" }; },
    () => { const data = [10, 20, 25, 28, 30, 32, 40, 45, 50]; return { problem: `For the data set \\(${data.join(', ')}\\), what is the first quartile (Q1)?`, answer: `22.5`, checkAnswer: "22.5", hint: "The median of the lower half: (20+25)/2" }; },
    () => { const data = [10, 20, 25, 28, 30, 32, 40, 45, 50]; return { problem: `For the data set \\(${data.join(', ')}\\), what is the third quartile (Q3)?`, answer: `42.5`, checkAnswer: "42.5", hint: "The median of the upper half: (40+45)/2" }; },
    () => ({ problem: `What is one advantage of a dot plot over a histogram?`, answer: `A dot plot shows every individual data value.`, checkAnswer: "shows individual values" }),
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Different graphs are used to highlight different features of a data set." };
}

export const module = {
    topicId: '6M11',
    topicName: 'Data Displays',
    generateProblem: generate
};