// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function createDataSet(count, min, max) { let d=[]; for(let i=0;i<count;i++){d.push(getRandomInt(min,max))}; return d.sort((a,b)=>a-b); }
function getMedian(data) { const mid = Math.floor(data.length / 2); return data.length % 2 !== 0 ? data[mid] : (data[mid-1]+data[mid])/2; }
function getMean(data) { return data.reduce((a,b)=>a+b,0)/data.length; }

const problemGenerators = [
    () => { const d1 = createDataSet(5, 5, 10); const d2 = createDataSet(5, 15, 20); const m1 = getMedian(d1); const m2 = getMedian(d2); return { problem: `Class A's test scores: \\(${d1.join(', ')}\\). Class B's scores: \\(${d2.join(', ')}\\). Which class has a higher median score?`, answer: `Class B (Median ${m2} vs ${m1})`, checkAnswer: "Class B" }; },
    () => { const d1 = [1, 2, 3, 10]; const d2 = [3, 4, 5, 6]; const r1 = 9, r2 = 3; return { problem: `Which data set has a greater variability (range)? Set A: \\(${d1.join(', ')}\\) or Set B: \\(${d2.join(', ')}\\)?`, answer: `Set A has a greater range (${r1} vs ${r2}).`, checkAnswer: "Set A" }; },
    () => { const centerA = 20; const centerB = 30; return { problem: `The median height for 7th graders is \\(${centerA}\\) inches. The median for 8th graders is \\(${centerB}\\) inches. What is the difference between the median heights?`, answer: `\\(${centerB - centerA}\\) inches`, checkAnswer: (centerB-centerA).toString() }; },
    () => { const dataA = [10, 20, 30, 40, 50]; const dataB = [25, 28, 30, 32, 35]; const madA = 12, madB = 2.4; return { problem: `Which data set shows less variability based on its Mean Absolute Deviation (MAD)? Set A (MAD=${madA}) or Set B (MAD=${madB})?`, answer: `Set B has less variability.`, checkAnswer: "Set B" }; },
    () => { return { problem: `Two box plots are shown. Box A is much wider than Box B. What can you infer about the data?`, answer: `The data in Box A is more spread out (has greater variability) than the data in Box B.`, checkAnswer: "A is more spread out" }; },
    () => { return { problem: `The median line in Box Plot A is at 50. The median in Box Plot B is at 70. How much greater is the median of B than A?`, answer: `20`, checkAnswer: "20" }; },
    () => { const classA_avg = 85; const classB_avg = 75; return { problem: `The mean score for Class A was \\(${classA_avg}\\). The mean for Class B was \\(${classB_avg}\\). On average, which class performed better?`, answer: `Class A`, checkAnswer: "Class A" }; },
    () => { const dataA = [5,10,15]; const dataB = [10,20,30]; const meanA=10, meanB=20; return { problem: `Compare the means of Data Set A (\\(${dataA.join(',')}\\)) and Data Set B (\\(${dataB.join(',')}\\)).`, answer: `The mean of Set B (${meanB}) is double the mean of Set A (${meanA}).`, checkAnswer: "B is double A" }; },
    () => { return { problem: `If two data sets have the same median, does that mean their data is identical?`, answer: `No, they can have very different ranges, means, and overall distributions.`, checkAnswer: "No" }; },
    () => { const iqrA = 5, iqrB = 15; return { problem: `Box Plot A has an IQR of \\(${iqrA}\\). Box Plot B has an IQR of \\(${iqrB}\\). Which data set has a more consistent middle 50%?`, answer: `Box Plot A, because its IQR is smaller.`, checkAnswer: "Box Plot A" }; },
    () => { return { problem: `The dot plot for Class A is clustered around 80. The dot plot for Class B is spread evenly from 60 to 100. Which class has more variability?`, answer: `Class B`, checkAnswer: "Class B" }; },
    () => { const shift = getRandomInt(5, 10); const d1 = [1,2,3,4,5]; const d2 = d1.map(n=>n+shift); return { problem: `Look at these two data sets. A: \\(${d1.join(', ')}\\). B: \\(${d2.join(', ')}\\). How does the distribution of B compare to A?`, answer: `The distribution of B is the same shape as A, but shifted \\(${shift}\\) units to the right.`, checkAnswer: `shifted ${shift} right` }; },
    () => { const medianA=50, medianB=50, iqrA=10, iqrB=30; return { problem: `Two data sets have the same median of \\(${medianA}\\), but Set A has an IQR of \\(${iqrA}\\) and Set B has an IQR of \\(${iqrB}\\). Which set is more spread out in the middle?`, answer: `Set B`, checkAnswer: "Set B" }; },
    () => { return { problem: `What measure of variability is calculated by looking at a box plot?`, answer: `The Interquartile Range (IQR) and the total range.`, checkAnswer: "IQR" }; },
    () => { const mean_diff = 10; const mad = 2; return { problem: `The difference between the mean heights of two groups of plants is \\(${mean_diff}\\) cm. The Mean Absolute Deviation (MAD) for both groups is about \\(${mad}\\) cm. Is the difference in means significant?`, answer: `Yes, because the difference in means (10) is 5 times the variability (2).`, checkAnswer: "Yes" }; },
    () => { const overlap = "significant"; return { problem: `The dot plots for two data sets show a \\(${overlap}\\) overlap. What does this suggest about the two sets?`, answer: `They are relatively similar.`, checkAnswer: "similar" }; },
    () => { const overlap = "little"; return { problem: `The box plots for two data sets show very \\(${overlap}\\) overlap. What does this suggest?`, answer: `The two data sets are quite different from each other.`, checkAnswer: "different" }; },
    () => { const minA=10,maxA=50,minB=60,maxB=100; return { problem: `The range for Team A's points is [${minA}, ${maxA}]. The range for Team B is [${minB}, ${maxB}]. What can you infer?`, answer: `Team B consistently scores more points than Team A.`, checkAnswer: "Team B scores more" }; },
    () => { const girls_median = 64; const boys_median = 66; return { problem: `The median height of girls is ${girls_median} inches and for boys is ${boys_median} inches. What informal inference can you make?`, answer: `On average, the boys in this group are taller than the girls.`, checkAnswer: "boys are taller" }; },
    () => { const d1 = [6,7,8]; const d2 = [1,2,15]; return { problem: `Both sets have a mean of 7: Set A (\\(${d1.join(',')}\\)) and Set B (\\(${d2.join(',')}\\)). Which set's mean is a better representation of its center?`, answer: `Set A, because its data has much less variability.`, checkAnswer: "Set A" }; },
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Compare measures of center (mean, median) and measures of spread (range, IQR, MAD)." };
}

export const module = {
    topicId: '7M10',
    topicName: 'Comparing Data Sets',
    generateProblem: generate
};
