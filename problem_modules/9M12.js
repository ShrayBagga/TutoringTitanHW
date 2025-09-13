// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function createDataSet(count, min, max) { let d=[]; for(let i=0;i<count;i++){d.push(getRandomInt(min,max))}; return d.sort((a,b)=>a-b); }
const problemGenerators = [
    () => { const data=createDataSet(9, 70, 100); return { problem: `Find the five-number summary (min, Q1, median, Q3, max) for the data set: \\(${data.join(', ')}\\).`, answer: `Min: ${data[0]}, Q1: ${(data[1]+data[2])/2}, Median: ${data[4]}, Q3: ${(data[6]+data[7])/2}, Max: ${data[8]}`, checkAnswer: `${data[0]},${(data[1]+data[2])/2},${data[4]},${(data[6]+data[7])/2},${data[8]}` }; },
    () => { const data=createDataSet(10, 50, 95); return { problem: `Create a box-and-whisker plot for the data: \\(${data.join(', ')}\\). What is the median?`, answer: `Median is \\(${(data[4]+data[5])/2}\\)`, checkAnswer: ((data[4]+data[5])/2).toString() }; },
    () => { const data=createDataSet(15, 1, 20); const mean=data.reduce((a,b)=>a+b,0)/data.length; const mad=data.reduce((a,v)=>a+Math.abs(v-mean),0)/data.length; return { problem: `Calculate the mean absolute deviation (MAD) for the data set \\(${data.slice(0,5).join(', ')}, ...\\). The mean is ${mean.toFixed(1)}.`, answer: `MAD \\(\\approx ${mad.toFixed(2)}\\)`, checkAnswer: mad.toFixed(2) }; },
    () => { return { problem: `What does a small standard deviation indicate about a data set?`, answer: `The data points tend to be very close to the mean (not spread out).`, checkAnswer: "close to the mean" }; },
    () => { return { problem: `What does a large interquartile range (IQR) indicate?`, answer: `The middle 50% of the data is widely spread out.`, checkAnswer: "widely spread" }; },
    () => { const dataA = [10,20,30]; const dataB = [5,25,35]; return { problem: `Which data set has a higher standard deviation? A: \\(${dataA.join(',')}\\) or B: \\(${dataB.join(',')}\\)?`, answer: `Set B, because its values are more spread out.`, checkAnswer: "Set B" }; },
    () => { return { problem: `A survey has a margin of error of \\(\\pm3\\%\\). If 52% of people favor a candidate, what is the range of likely support?`, answer: `Between 49% and 55%`, checkAnswer: "49-55%" }; },
    () => { return { problem: `A histogram is skewed to the right. Where would you expect the mean to be in relation to the median?`, answer: `The mean will be greater than the median.`, checkAnswer: "greater than median" }; },
    () => { return { problem: `A histogram is skewed to the left. Where is the mean in relation to the median?`, answer: `The mean will be less than the median.`, checkAnswer: "less than median" }; },
    () => { return { problem: `In a normal distribution (bell curve), what is true about the mean, median, and mode?`, answer: `They are all approximately equal and located at the center.`, checkAnswer: "equal" }; },
    () => { const data=[5,10,15,20,100]; return { problem: `Which is a better measure of center for the data \\(${data.join(',')}\\): mean or median?`, answer: `Median, because of the outlier.`, checkAnswer: "Median" }; },
    () => { return { problem: `What percentage of data falls within the 'box' of a box-and-whisker plot?`, answer: `50%`, checkAnswer: "50" }; },
    () => { return { problem: `Each 'whisker' in a box plot represents what percentage of the data?`, answer: `25%`, checkAnswer: "25" }; },
    () => { const classA_mean=85, classB_mean=84, classA_std=2, classB_std=10; return { problem: `Class A has a mean test score of ${classA_mean} with a standard deviation of ${classA_std}. Class B has a mean of ${classB_mean} with a standard deviation of ${classB_std}. Which class was more consistent?`, answer: `Class A, because it has a smaller standard deviation.`, checkAnswer: "Class A" }; },
    () => { return { problem: `What is the purpose of a five-number summary?`, answer: `To provide a concise summary of the distribution of a dataset.`, checkAnswer: "summarize distribution" }; },
    () => { const iqr = getRandomInt(10,20); const q1 = getRandomInt(60,70); return { problem: `A dataset has a first quartile (Q1) of \\(${q1}\\) and an interquartile range (IQR) of \\(${iqr}\\). What is the third quartile (Q3)?`, answer: `\\(Q3 = ${q1+iqr}\\)`, checkAnswer: (q1+iqr).toString() }; },
    () => { const data=[1,5,10,15,19]; return { problem: `What is the interquartile range (IQR) of the data set: \\(${data.join(', ')}\\)?`, answer: `\\(15 - 5 = 10\\)`, checkAnswer: "10" }; },
    () => { return { problem: `Can the standard deviation of a data set be negative?`, answer: `No, because it is based on squared distances.`, checkAnswer: "No" }; },
    () => { const score=85, mean=75, std=5; const z=(score-mean)/std; return { problem: `A test has a mean of ${mean} and a standard deviation of ${std}. Your score is ${score}. What is your z-score?`, answer: `\\(z=${z}\\)`, checkAnswer: z.toString() }; },
    () => { return { problem: `A positive z-score means the data point is _____ the mean.`, answer: `Above`, checkAnswer: "Above" }; }
];
function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Statistics helps us describe and compare data sets using measures of center and spread." };
}
export const module = { topicId: '9M12', topicName: 'Data Analysis & Statistics', generateProblem: generate };