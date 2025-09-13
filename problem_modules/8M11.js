// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const problemGenerators = [
    () => { return { problem: `A scatter plot shows that as temperature increases, ice cream sales also increase. What type of association is this?`, answer: `Positive association`, checkAnswer: "Positive" }; },
    () => { return { problem: `A scatter plot shows that as the number of hours spent studying increases, the number of mistakes on a test decreases. What type of association is this?`, answer: `Negative association`, checkAnswer: "Negative" }; },
    () => { return { problem: `A scatter plot shows the relationship between a person's shoe size and their favorite color. What type of association would you expect?`, answer: `No association`, checkAnswer: "No association" }; },
    () => { return { problem: `If the points on a scatter plot form a pattern that closely resembles a straight line, the association is _____.`, answer: `Linear`, checkAnswer: "Linear" }; },
    () => { return { problem: `If the points on a scatter plot form a curve, the association is _____.`, answer: `Non-linear`, checkAnswer: "Non-linear" }; },
    () => { return { problem: `What is a "line of best fit" (or trend line) for a scatter plot?`, answer: `A line drawn on the plot that is close to most of the data points, used for making predictions.`, checkAnswer: "A line close to data" }; },
    () => { return { problem: `An "outlier" in a scatter plot is a point that is _____.`, answer: `Far away from the main cluster of data points.`, checkAnswer: "Far away" }; },
    () => { const graphId=`g-${Date.now()}`; return { problem: `Based on the scatter plot, is there a positive, negative, or no association between hours studied and test score?`, answer: `Positive association`, checkAnswer: "Positive", graphId, graphFunction:{functions:[{type:'point',x:1,y:65},{type:'point',x:2,y:70},{type:'point',x:3,y:80},{type:'point',x:4,y:85},{type:'point',x:5,y:95}],boundingbox:[0,6,100,50]} }; },
    () => { return { problem: `A trend line has the equation y = 2x + 5. Predict the value of y when x = 10.`, answer: `\\(y = 2(10) + 5 = 25\\)`, checkAnswer: "25" }; },
    () => { return { problem: `A scatter plot shows a strong positive linear association. What does this mean about the data points?`, answer: `They are tightly clustered around a line that goes up from left to right.`, checkAnswer: "Tightly clustered" }; },
    () => { return { problem: `What is bivariate data?`, answer: `Data that involves two different variables.`, checkAnswer: "Two variables" }; },
    () => { return { problem: `Is the relationship between a person's age and their height linear or non-linear?`, answer: `Non-linear (it flattens out after a certain age).`, checkAnswer: "Non-linear" }; },
    () => { return { problem: `You collect data on the number of hours a candle has burned and its remaining height. What association do you expect?`, answer: `Negative association`, checkAnswer: "Negative" }; },
    () => { return { problem: `A trend line is drawn for data on student height vs. age. Can you use it to predict the height of a 40-year-old?`, answer: `No, this is extrapolation and is likely to be inaccurate as growth stops.`, checkAnswer: "No" }; },
    () => { return { problem: `If two variables have a strong association, does it mean one causes the other?`, answer: `Not necessarily. Correlation does not imply causation.`, checkAnswer: "Not necessarily" }; },
    () => { return { problem: `Describe the data if a scatter plot shows a "cluster".`, answer: `A group of data points are close together in one area of the graph.`, checkAnswer: "Close together" }; },
    () => { const data = "age and number of siblings"; return { problem: `What kind of association would you expect between a person's ${data}?`, answer: `No association`, checkAnswer: "No association" }; },
    () => { return { problem: `A trend line on a scatter plot passes through (2, 5) and (4, 9). What is the slope of the line?`, answer: `2`, checkAnswer: "2" }; },
    () => { return { problem: `The purpose of a scatter plot is to show the relationship between two _____ variables.`, answer: `Numerical`, checkAnswer: "Numerical" }; },
    () => { return { problem: `A line of best fit predicts a score of 85 for 4 hours of study. If a student who studied 4 hours got a 95, what is this point called?`, answer: `An outlier (or just a data point above the trend).`, checkAnswer: "An outlier" }; }
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Look at the overall trend of the points: do they go up, down, or are they random?" };
}

export const module = {
    topicId: '8M11',
    topicName: 'Bivariate Data & Scatter Plots',
    generateProblem: generate
};