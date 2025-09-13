// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function formatAnswer(val, p=1) { return parseFloat(val.toFixed(p)).toString().replace(/\.0$/, ''); }

const problemGenerators = [
    () => { const like_dog=60, total=100; return { problem: `A survey of 100 people found 60 like dogs. What is the relative frequency of people who like dogs?`, answer: `60% or 0.6`, checkAnswer: "60%" }; },
    () => { const table = "\n\n| | Cat | Dog | Total |\n|:---:|:---:|:---:|:---:|\n| Boys | 10 | 15 | 25 |\n| Girls| 20 | 5 | 25 |\n| Total| 30 | 20 | 50 |"; return { problem: `From the table, how many girls were surveyed?${table}`, answer: `25`, checkAnswer: "25" }; },
    () => { const table = "\n\n| | Cat | Dog | Total |\n|:---:|:---:|:---:|:---:|\n| Boys | 10 | 15 | 25 |\n| Girls| 20 | 5 | 25 |\n| Total| 30 | 20 | 50 |"; return { problem: `From the table, what is the total number of people surveyed?${table}`, answer: `50`, checkAnswer: "50" }; },
    () => { const table = "\n\n| | Cat | Dog | Total |\n|:---:|:---:|:---:|:---:|\n| Boys | 10 | 15 | 25 |\n| Girls| 20 | 5 | 25 |\n| Total| 30 | 20 | 50 |"; return { problem: `Based on the table, what percentage of those surveyed prefer cats?${table}`, answer: `\\(\\frac{30}{50} = 60\\%\\)`, checkAnswer: "60%" }; },
    () => { const table = "\n\n| | Cat | Dog | Total |\n|:---:|:---:|:---:|:---:|\n| Boys | 10 | 15 | 25 |\n| Girls| 20 | 5 | 25 |\n| Total| 30 | 20 | 50 |"; return { problem: `What is the relative frequency of a girl preferring dogs?${table}`, answer: `\\(\\frac{5}{50} = 10\\%\\)`, checkAnswer: "10%" }; },
    () => { const table = "\n\n| | Play Sports | No Sports | Total |\n|:---:|:---:|:---:|:---:|\n| 7th Grade | 40 | 10 | 50 |\n| 8th Grade | 30 | 20 | 50 |\n| Total | 70 | 30 | 100 |"; return { problem: `From the table, what percentage of 8th graders play sports?${table}`, answer: `\\(\\frac{30}{50} = 60\\%\\)`, checkAnswer: "60%", hint:"Focus only on the '8th Grade' row." }; },
    () => { return { problem: `What type of data is displayed in a two-way table?`, answer: `Categorical data for two different variables.`, checkAnswer: "Categorical data" }; },
    () => { return { problem: `What is "marginal relative frequency"?`, answer: `The ratio of the total for a row or column to the grand total.`, checkAnswer: "ratio of a total to the grand total" }; },
    () => { return { problem: `What is "joint relative frequency"?`, answer: `The ratio of a value in the body of the table to the grand total.`, checkAnswer: "ratio of a body value to the grand total" }; },
    () => { return { problem: `What is "conditional relative frequency"?`, answer: `The ratio of a joint frequency to a marginal frequency.`, checkAnswer: "ratio of joint to marginal" }; },
    () => { const boys_yes = 15; const all_yes = 45; const percent = (boys_yes/all_yes)*100; return { problem: `${all_yes} students like pizza. Of those, ${boys_yes} are boys. What percentage of the pizza-likers are boys?`, answer: `\\(${formatAnswer(percent, 1)}\\%\\)`, checkAnswer: `${formatAnswer(percent,1)}%` }; },
    () => { const table = "\n\n| | Read Fiction | Read Non-Fiction | Total |\n|:---:|:---:|:---:|:---:|\n| Under 18 | 70 | 30 | 100 |\n| 18 & Over | 50 | 50 | 100 |\n| Total | 120 | 80 | 200 |"; return { problem: `Is there an association between age and reading preference in the table?${table}`, answer: `Yes, people under 18 seem to prefer fiction more than adults.`, checkAnswer: "Yes" }; },
    () => { const yes_math=20, no_math=5; const yes_sci=15, no_sci=10; return { problem: `In a survey, 20 students like math and 5 dislike it. 15 students like science and 10 dislike it. Can you make a two-way table from this data?`, answer: `No, you need to know how many students fall into each overlapping category (e.g., like math AND science).`, checkAnswer: "No" }; },
    () => { const a=getRandomInt(10,20), b=getRandomInt(10,20), c=getRandomInt(10,20); const row_total=a+b; const col_total=a+c; return { problem: `Fill in the missing value in the two-way table. \n\n| | A | B | Total |\n|:---:|:---:|:---:|:---:|\n| X | ${a} | ${b} | ${row_total} |\n| Y | ${c} | ? | ... |\n| Total| ${col_total} | ...| ...|`, answer: `The value could be anything, more info is needed. The totals must add up.`, checkAnswer: "more info needed" }; },
    () => { const total = 200, percent=0.45; const num = total*percent; return { problem: `Of \\(${total}\\) people surveyed, 45% said yes. How many people said yes?`, answer: `\\(${num}\\)`, checkAnswer: num.toString() }; },
    () => { const table = "\n\n| | Yes | No | Total |\n|:---:|:---:|:---:|:---:|\n| Group 1 | 80 | 20 | 100 |\n| Group 2 | 20 | 80 | 100 |\n| Total | 100 | 100 | 200 |"; return { problem: `Does the table suggest an association between the groups and their answers?${table}`, answer: `Yes, a strong association. Group 1 overwhelmingly said Yes, Group 2 said No.`, checkAnswer: "Yes" }; },
    () => { return { problem: `The numbers in the main body of a two-way table are called ____ frequencies.`, answer: `Joint`, checkAnswer: "Joint" }; },
    () => { return { problem: `The numbers in the "Total" row and "Total" column are called ____ frequencies.`, answer: `Marginal`, checkAnswer: "Marginal" }; },
    () => { const read=150, total=250; const percent = (read/total)*100; return { problem: `Of \\(${total}\\) students, \\(${read}\\) own a red car. Find the relative frequency.`, answer: `\\(${percent}\\%\\)`, checkAnswer: `${percent}%` }; },
    () => { const table = "\n\n| | Play Instrument | No Instrument | Total |\n|:---:|:---:|:---:|:---:|\n| Left-Handed | 5 | 10 | 15 |\n| Right-Handed | 20 | 65 | 85 |\n| Total | 25 | 75 | 100 |"; return { problem: `What percentage of left-handed people in the survey play an instrument?${table}`, answer: `\\(\\frac{5}{15} \\approx 33.3\\%\\)`, checkAnswer: "33.3%" }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Read the table carefully to find which numbers to use for your fraction." };
}

export const module = {
    topicId: '8M12',
    topicName: 'Data Analysis & Two-Way Tables',
    generateProblem: generate
};