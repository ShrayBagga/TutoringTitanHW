// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function formatAnswer(val) { return parseFloat(val.toFixed(2)).toString().replace(/\.00$/, ''); }

const problemGenerators = [
    () => { const data = [getRandomInt(5,10), getRandomInt(10,15), getRandomInt(15,20)]; const mean = data.reduce((a,b)=>a+b,0)/data.length; return { problem: `Find the mean of the data set: \\(${data.join(', ')}\\).`, answer: `\\(${formatAnswer(mean)}\\)`, checkAnswer: formatAnswer(mean) }; },
    () => { const data = [getRandomInt(1,5), getRandomInt(6,10), getRandomInt(11,15)].sort((a,b)=>a-b); const median = data[1]; return { problem: `Find the median of the data set: \\(${data.join(', ')}\\).`, answer: `\\(${median}\\)`, checkAnswer: median.toString() }; },
    () => { const mode = getRandomInt(5,15); const data = [mode, getRandomInt(1,4), mode, getRandomInt(16,20)].sort((a,b)=>a-b); return { problem: `Find the mode of the data set: \\(${data.join(', ')}\\).`, answer: `\\(${mode}\\)`, checkAnswer: mode.toString() }; },
    () => { const data = [getRandomInt(1,5), getRandomInt(20,25), getRandomInt(26,30)].sort((a,b)=>a-b); const range = data[data.length-1] - data[0]; return { problem: `Find the range of the data set: \\(${data.join(', ')}\\).`, answer: `\\(${range}\\)`, checkAnswer: range.toString() }; },
    () => { const data = [1,2,3,100]; return { problem: `Which measure of center (mean or median) best describes the data set: \\(${data.join(', ')}\\)? Why?`, answer: `Median, because the outlier (100) skews the mean.`, checkAnswer: `Median` }; },
    () => { const data = [10, 20, 30, 40, 50]; const mean = 30; const mad = data.reduce((acc, val) => acc + Math.abs(val - mean), 0) / data.length; return { problem: `What is the mean absolute deviation (MAD) of \\(${data.join(', ')}\\)? The mean is \\(${mean}\\).`, answer: `\\(${mad}\\)`, checkAnswer: mad.toString(), hint: "Find the average distance of each point from the mean." }; },
    () => { const data = [getRandomInt(1,5), getRandomInt(6,10), getRandomInt(11,15), getRandomInt(16,20)].sort((a,b)=>a-b); const median = (data[1]+data[2])/2; return { problem: `Find the median of: \\(${data.join(', ')}\\).`, answer: `\\(${median}\\)`, checkAnswer: median.toString() }; },
    () => { const data = [5, 8, 12, 13]; const q1 = (5+8)/2; const q3 = (12+13)/2; const iqr = q3 - q1; return { problem: `Find the interquartile range (IQR) of: \\(${data.join(', ')}\\).`, answer: `\\(${iqr}\\)`, checkAnswer: iqr.toString(), hint: "IQR = Q3 - Q1." }; },
    () => { const data = [10, 20, 20, 30, 30, 30, 40]; return { problem: `A student's test scores are: \\(${data.join(', ')}\\). What is the mode score?`, answer: `\\(30\\)`, checkAnswer: "30" }; },
    () => { const mean = 85; const nums = [70, 80, 90]; const missing = mean * 4 - nums.reduce((a,b)=>a+b,0); return { problem: `The mean of four numbers is \\(${mean}\\). Three are 70, 80, and 90. What is the fourth?`, answer: `\\(${missing}\\)`, checkAnswer: missing.toString() }; },
    () => { const outlier = getRandomInt(50, 100); const data = [getRandomInt(1,5), getRandomInt(6,10), outlier]; return { problem: `Identify the outlier in: \\(${data.join(', ')}\\).`, answer: `\\(${outlier}\\)`, checkAnswer: outlier.toString() }; },
    () => { const data = [5, 6, 7, 8, 9]; return { problem: `If 1 is added to the set \\(${data.join(', ')}\\), how will the range change?`, answer: `The range will increase from 4 to 8.`, checkAnswer: "increase" }; },
    () => { const data = [10, 20, 30]; return { problem: `If every number in \\(${data.join(', ')}\\) is increased by 5, what happens to the mean?`, answer: `The mean also increases by 5.`, checkAnswer: "increases by 5" }; },
    () => { const data = [1, 2, 10]; const mean = formatAnswer((1+2+10)/3); const median = 2; return { problem: `For \\(${data.join(', ')}\\), is the mean or median larger?`, answer: `The mean (\\(${mean}\\)) is larger than the median (\\(${median}\\)).`, checkAnswer: "mean" }; },
    () => { return { problem: `Can a data set have no mode?`, answer: `Yes, if all values appear with the same frequency.`, checkAnswer: "Yes" }; },
    () => { return { problem: `Can a data set have more than one mode?`, answer: `Yes, if two or more values are tied for the highest frequency.`, checkAnswer: "Yes" }; },
    () => { const heights = [60, 62, 62, 64, 67]; const mean = heights.reduce((a,b)=>a+b,0)/heights.length; return { problem: `The heights of 5 players are \\(${heights.join(', ')}\\). What is the mean height?`, answer: `\\(${mean}\\) inches`, checkAnswer: mean.toString() }; },
    () => { const ages = [10, 11, 11, 12, 12, 12, 13]; const median = 12; return { problem: `Find the median age from this list: \\(${ages.join(', ')}\\).`, answer: `\\(${median}\\)`, checkAnswer: median.toString() }; },
    () => { const data = [15, 20, 25, 30, 35]; return { problem: `For an odd-sized set like \\(${data.join(', ')}\\), which measure of center is always one of the numbers in the set?`, answer: `The median`, checkAnswer: "median" }; },
    () => { const low = getRandomInt(5, 10); const high = getRandomInt(20, 25); return { problem: `A data set has a minimum of \\(${low}\\) and a maximum of \\(${high}\\). What is the range?`, answer: `\\(${high-low}\\)`, checkAnswer: (high-low).toString() }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Mean is average, Median is middle, Mode is most frequent." };
}

export const module = {
    topicId: '6M9',
    topicName: 'Measures of Central Tendency',
    generateProblem: generate
};
