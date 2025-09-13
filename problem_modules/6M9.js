// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function formatAnswer(val) { return parseFloat(val.toFixed(2)).toString().replace(/\.00$/, ''); }

// Creates a sorted list of random numbers for data sets
function createDataSet(count, min, max) {
    let data = [];
    for (let i = 0; i < count; i++) {
        data.push(getRandomInt(min, max));
    }
    return data.sort((a, b) => a - b);
}

const problemGenerators = [
    // --- Existing 20 problems, now fully randomized ---
    () => {
        const data = createDataSet(getRandomInt(3, 5), 5, 20);
        const mean = data.reduce((a,b)=>a+b,0)/data.length;
        return { problem: `Find the mean of the data set: \\(${data.join(', ')}\\).`, answer: `\\(${formatAnswer(mean)}\\)`, checkAnswer: formatAnswer(mean) };
    },
    () => {
        const data = createDataSet(5, 1, 20);
        const median = data[2];
        return { problem: `Find the median of the data set: \\(${data.join(', ')}\\).`, answer: `\\(${median}\\)`, checkAnswer: median.toString() };
    },
    () => {
        const mode = getRandomInt(5,15);
        const data = [mode, getRandomInt(1,4), mode, getRandomInt(16,20), getRandomInt(1,20)].sort((a,b)=>a-b);
        return { problem: `Find the mode of the data set: \\(${data.join(', ')}\\).`, answer: `\\(${mode}\\)`, checkAnswer: mode.toString() };
    },
    () => {
        const data = createDataSet(getRandomInt(4, 6), 1, 30);
        const range = data[data.length-1] - data[0];
        return { problem: `Find the range of the data set: \\(${data.join(', ')}\\).`, answer: `\\(${range}\\)`, checkAnswer: range.toString() };
    },
    () => {
        const outlier = getRandomInt(80, 120);
        const data = [...createDataSet(3, 1, 10), outlier];
        return { problem: `Which measure of center (mean or median) best describes the data set: \\(${data.join(', ')}\\)? Why?`, answer: `Median, because the outlier (${outlier}) skews the mean.`, checkAnswer: `Median` };
    },
    () => {
        const data = [10, 20, 30, 40, 50]; // MAD is easier to teach with a simple, clear set
        const mean = 30;
        const mad = data.reduce((acc, val) => acc + Math.abs(val - mean), 0) / data.length;
        return { problem: `What is the mean absolute deviation (MAD) of \\(${data.join(', ')}\\)? The mean is \\(${mean}\\).`, answer: `\\(${mad}\\)`, checkAnswer: mad.toString(), hint: "Find the average distance of each point from the mean." };
    },
    () => {
        const data = createDataSet(4, 1, 20);
        const median = (data[1]+data[2])/2;
        return { problem: `Find the median of the data set: \\(${data.join(', ')}\\).`, answer: `\\(${formatAnswer(median)}\\)`, checkAnswer: formatAnswer(median) };
    },
    () => {
        const data = createDataSet(6, 1, 20);
        const q1 = data[1];
        const q3 = data[4];
        const iqr = q3 - q1;
        return { problem: `Find the interquartile range (IQR) of the set: \\(${data.join(', ')}\\).`, answer: `\\(${iqr}\\)`, checkAnswer: iqr.toString(), hint: "IQR = Q3 - Q1. Find the median of the upper and lower halves of the data (excluding the overall median)." };
    },
    () => {
        const scores = createDataSet(7, 70, 100);
        const mode = scores[getRandomInt(1,5)];
        scores.push(mode);
        scores.sort((a,b)=>a-b);
        return { problem: `A student's test scores are: \\(${scores.join(', ')}\\). What is the mode score?`, answer: `\\(${mode}\\)`, checkAnswer: mode.toString() };
    },
    () => {
        const count = 4;
        const mean = getRandomInt(80, 90);
        const nums = createDataSet(count - 1, 70, 95);
        const totalNeeded = mean * count;
        const currentTotal = nums.reduce((a,b)=>a+b,0);
        const missing = totalNeeded - currentTotal;
        return { problem: `The mean of four numbers is \\(${mean}\\). Three of the numbers are ${nums.join(', ')}. What is the fourth number?`, answer: `\\(${missing}\\)`, checkAnswer: missing.toString() };
    },
    () => {
        const outlier = getRandomInt(50, 100);
        const data = [...createDataSet(4, 5, 15), outlier].sort((a,b)=>a-b);
        return { problem: `Identify the outlier in the data set: \\(${data.join(', ')}\\).`, answer: `\\(${outlier}\\)`, checkAnswer: outlier.toString(), hint: "An outlier is a value that is much larger or smaller than the other values in a set." };
    },
    () => {
        const data = createDataSet(5, 10, 30);
        const originalRange = data[data.length-1] - data[0];
        const newVal = data[0] - getRandomInt(5, 10);
        const newRange = data[data.length-1] - newVal;
        return { problem: `Consider the set \\(${data.join(', ')}\\). If the number \\(${newVal}\\) is added to the set, what will the new range be?`, answer: `The new range will be \\(${newRange}\\).`, checkAnswer: newRange.toString() };
    },
    () => {
        const data = createDataSet(3, 10, 30);
        const add = getRandomInt(5, 10);
        const originalMean = formatAnswer(data.reduce((a,b)=>a+b,0)/data.length);
        const newMean = formatAnswer((data.reduce((a,b)=>a+b,0) + add*data.length)/data.length);
        return { problem: `If every number in the set \\(${data.join(', ')}\\) is increased by \\(${add}\\), what will the new mean be? The original mean is \\(${originalMean}\\).`, answer: `The new mean will be \\(${newMean}\\).`, checkAnswer: newMean.toString(), hint: "If every number is increased by a value, the mean also increases by that same value." };
    },
    () => {
        const data = [...createDataSet(4, 5, 15), getRandomInt(80,100)].sort((a,b)=>a-b);
        const mean = formatAnswer(data.reduce((a,b)=>a+b,0)/data.length);
        const median = (data[1]+data[2])/2;
        return { problem: `For the set \\(${data.join(', ')}\\), is the mean or median larger?`, answer: `The mean (\\(${mean}\\)) is larger than the median (\\(${median}\\)).`, checkAnswer: "mean" };
    },
    () => {
        const data = createDataSet(5, 10, 20);
        return { problem: `Can the data set \\(${data.join(', ')}\\) have no mode?`, answer: `Yes, because all values appear only once.`, checkAnswer: "Yes" };
    },
    () => {
        const mode1 = getRandomInt(10,15);
        const mode2 = getRandomInt(16,20);
        const data = [mode1, mode1, mode2, mode2, getRandomInt(1,5)].sort((a,b)=>a-b);
        return { problem: `Can a data set have more than one mode? Consider the set \\(${data.join(', ')}\\).`, answer: `Yes, this set is bimodal with modes \\(${mode1}\\) and \\(${mode2}\\).`, checkAnswer: "Yes" };
    },
    () => {
        const heights = createDataSet(5, 60, 70);
        const mean = formatAnswer(heights.reduce((a,b)=>a+b,0)/heights.length);
        return { problem: `The heights of 5 basketball players are \\(${heights.join(', ')}\\) inches. What is the mean height?`, answer: `\\(${mean}\\) inches`, checkAnswer: mean.toString() };
    },
    () => {
        const ages = createDataSet(7, 10, 13);
        const median = ages[3];
        return { problem: `Find the median age from this list of campers: \\(${ages.join(', ')}\\).`, answer: `\\(${median}\\)`, checkAnswer: median.toString() };
    },
    () => {
        const data = createDataSet(5, 1, 100);
        return { problem: `For an odd-sized set like \\(${data.join(', ')}\\), which measure of center is guaranteed to be one of the numbers in the set?`, answer: `The median`, checkAnswer: "median" };
    },
    () => {
        const low = getRandomInt(5, 10);
        const high = getRandomInt(20, 25);
        const data = [low, ...createDataSet(3, low+1, high-1), high];
        const range = data[data.length-1] - data[0];
        return { problem: `A data set has a minimum value of \\(${low}\\) and a maximum value of \\(${high}\\). What is the range?`, answer: `\\(${range}\\)`, checkAnswer: range.toString() };
    },
    // --- New 10 problems ---
    () => {
        const data = createDataSet(4, 10, 30);
        const sum = data.reduce((a,b)=>a+b,0);
        return { problem: `To find the mean of the set \\(${data.join(', ')}\\), you first find the sum of the values, then divide by what number?`, answer: `You divide by \\(${data.length}\\) (the number of values).`, checkAnswer: data.length.toString() };
    },
    () => {
        const data = createDataSet(6, 1, 10);
        const median = formatAnswer((data[2] + data[3])/2);
        return { problem: `To find the median of the set \\(${data.join(', ')}\\), you would find the average of which two numbers?`, answer: `The two middle numbers, \\(${data[2]}\\) and \\(${data[3]}\\).`, checkAnswer: `${data[2]},${data[3]}` };
    },
    () => {
        const scores = [80, 85, 90, 95];
        const desiredMean = 90;
        const neededScore = desiredMean * 5 - scores.reduce((a,b)=>a+b,0);
        return { problem: `A student has scores of \\(${scores.join(', ')}\\) on four tests. What score does she need on the fifth test to have a mean of \\(${desiredMean}\\)?`, answer: `She needs a score of \\(${neededScore}\\).`, checkAnswer: neededScore.toString() };
    },
    () => {
        const data = createDataSet(7, 20, 50);
        const range = data[data.length-1] - data[0];
        const iqr = data[5] - data[1];
        return { problem: `For the set \\(${data.join(', ')}\\), which is larger: the range or the interquartile range (IQR)?`, answer: `The range (\\(${range}\\)) is larger than the IQR (\\(${iqr}\\)).`, checkAnswer: "range" };
    },
    () => {
        const prices = [10, 15, 18, 22, 100];
        const context = ["houses", "cars", "laptops"][getRandomInt(0,2)];
        return { problem: `The prices of 5 ${context} are \\($${prices.join(', $')}\\). An advertisement wants to make the prices seem as high as possible. Should they advertise the mean or the median price?`, answer: `The mean, because it is pulled higher by the outlier.`, checkAnswer: "mean" };
    },
    () => {
        const data = createDataSet(5, 0, 5);
        const sum = data.reduce((a,b)=>a+b,0);
        return { problem: `The number of goals scored in 5 soccer games were: \\(${data.join(', ')}\\). What was the mean number of goals scored per game?`, answer: `\\(${formatAnswer(sum/5)}\\)`, checkAnswer: formatAnswer(sum/5) };
    },
    () => {
        const data = createDataSet(6, 150, 200);
        const median = formatAnswer((data[2]+data[3])/2);
        return { problem: `The weights of 6 pumpkins are \\(${data.join(', ')}\\) pounds. What is the median weight?`, answer: `\\(${median}\\) pounds`, checkAnswer: median };
    },
    () => {
        const data = createDataSet(5, 3, 10);
        const oldMean = data.reduce((a,b)=>a+b,0)/5;
        const removed = data.splice(getRandomInt(1,3), 1)[0];
        const newMean = data.reduce((a,b)=>a+b,0)/4;
        return { problem: `The set is \\(${[...data, removed].sort((a,b)=>a-b).join(', ')}\\). If the value \\(${removed}\\) is removed, will the mean increase or decrease?`, answer: `It will ${newMean > oldMean ? "increase" : "decrease"}.`, checkAnswer: newMean > oldMean ? "increase" : "decrease" };
    },
    () => {
        const data = [1, 5, 2, 8, 3, 9, 4, 10];
        return { problem: `What is the first step to finding the median of the data set: \\(${data.join(', ')}\\)?`, answer: `Order the numbers from least to greatest.`, checkAnswer: "Order the numbers" };
    },
    () => {
        const data = [5, 5, 5, 5, 5];
        return { problem: `What is the range and MAD of the set \\(${data.join(', ')}\\)?`, answer: `The range is 0 and the MAD is 0.`, checkAnswer: "0,0", hint: "If all numbers are the same, there is no variability." };
    }
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