// --- Helper Functions ---
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function formatAnswer(val, p=2) { return parseFloat(val.toFixed(p)).toString().replace(/\.00$/, ''); }

const problemGenerators = [
    () => { const price = getRandomInt(20, 80); const tax_rate = 0.07; const tax_amount = price * tax_rate; return { problem: `What is the 7% sales tax on an item that costs \\($${price}\\)?`, answer: `\\($${formatAnswer(tax_amount)}\\)`, checkAnswer: formatAnswer(tax_amount) }; },
    () => { const price = getRandomInt(50, 150); const tax_rate = 0.085; const total = price * (1 + tax_rate); return { problem: `An item costs \\($${price}\\). What is the total cost including an 8.5% sales tax?`, answer: `\\($${formatAnswer(total)}\\)`, checkAnswer: formatAnswer(total) }; },
    () => { const bill = getRandomInt(40, 100); const tip_rate = 0.15; const tip_amount = bill * tip_rate; return { problem: `Your dinner bill is \\($${bill}\\). How much is a 15% tip?`, answer: `\\($${formatAnswer(tip_amount)}\\)`, checkAnswer: formatAnswer(tip_amount) }; },
    () => { const bill = getRandomInt(30, 90); const tip_rate = 0.20; const total = bill * (1 + tip_rate); return { problem: `Calculate the total cost of a \\($${bill}\\) meal with a 20% tip.`, answer: `\\($${formatAnswer(total)}\\)`, checkAnswer: formatAnswer(total) }; },
    () => { const price = getRandomInt(100, 500); const discount_rate = 0.25; const sale_price = price * (1 - discount_rate); return { problem: `A coat is originally \\($${price}\\). It's on sale for 25% off. What is the sale price?`, answer: `\\($${formatAnswer(sale_price)}\\)`, checkAnswer: formatAnswer(sale_price) }; },
    () => { const price = getRandomInt(40, 80); const discount_rate = 0.10; const amount_saved = price * discount_rate; return { problem: `How much do you save on a \\($${price}\\) pair of shoes with a 10% discount?`, answer: `\\($${formatAnswer(amount_saved)}\\)`, checkAnswer: formatAnswer(amount_saved) }; },
    () => { const original = getRandomInt(50, 80); const new_price = getRandomInt(90, 120); const increase = new_price - original; const percent_increase = (increase / original) * 100; return { problem: `The price of a ticket increased from \\($${original}\\) to \\($${new_price}\\). What is the percent increase?`, answer: `\\(${formatAnswer(percent_increase, 1)}\\%\\)`, checkAnswer: `${formatAnswer(percent_increase,1)}%` }; },
    () => { const original = getRandomInt(200, 300); const new_price = getRandomInt(150, 190); const decrease = original - new_price; const percent_decrease = (decrease / original) * 100; return { problem: `A phone's price dropped from \\($${original}\\) to \\($${new_price}\\). What is the percent decrease?`, answer: `\\(${formatAnswer(percent_decrease, 1)}\\%\\)`, checkAnswer: `${formatAnswer(percent_decrease,1)}%` }; },
    () => { const principal = 1000; const rate = 0.04; const time = getRandomInt(2, 5); const interest = principal * rate * time; return { problem: `Calculate the simple interest on a principal of \\($${principal}\\) at a rate of 4% for \\(${time}\\) years.`, answer: `\\($${formatAnswer(interest)}\\)`, checkAnswer: formatAnswer(interest) }; },
    () => { const sales = 5000; const commission_rate = 0.08; const earnings = sales * commission_rate; return { problem: `A salesperson earns an 8% commission on their sales. If they sell \\($${sales}\\) worth of goods, how much do they earn?`, answer: `\\($${formatAnswer(earnings)}\\)`, checkAnswer: formatAnswer(earnings) }; },
    () => { const actual = 50; const estimate = getRandomInt(52, 55); const error = estimate - actual; const percent_error = (error / actual) * 100; return { problem: `You estimated there were \\(${estimate}\\) jellybeans, but there were actually \\(${actual}\\). What is the percent error?`, answer: `\\(${formatAnswer(percent_error)}\\%\\)`, checkAnswer: `${formatAnswer(percent_error)}%` }; },
    () => { const sale_price = 75; const discount_rate = 0.25; const original_price = sale_price / (1 - discount_rate); return { problem: `A game is on sale for \\($${sale_price}\\), which is 25% off the original price. What was the original price?`, answer: `\\($${formatAnswer(original_price)}\\)`, checkAnswer: formatAnswer(original_price) }; },
    () => { const price = getRandomInt(80, 120); const discount = 0.20; const tax = 0.05; const final = price * (1-discount) * (1+tax); return { problem: `A \\($${price}\\) item has a 20% discount, and then a 5% sales tax is applied to the discounted price. What is the final cost?`, answer: `\\($${formatAnswer(final)}\\)`, checkAnswer: formatAnswer(final) }; },
    () => { const wholesale = 40; const markup_rate = 0.75; const retail = wholesale * (1 + markup_rate); return { problem: `A store buys a shirt for \\($${wholesale}\\) and marks it up by 75%. What is the retail price?`, answer: `\\($${formatAnswer(retail)}\\)`, checkAnswer: formatAnswer(retail) }; },
    () => { const salary = 500; const commission = 0.05; const sales = 4000; const total_pay = salary + commission * sales; return { problem: `An employee earns \\($${salary}\\) per week plus a 5% commission on sales. If they sell \\($${sales}\\), what are their total earnings?`, answer: `\\($${formatAnswer(total_pay)}\\)`, checkAnswer: formatAnswer(total_pay) }; },
    () => { const students = 120; const percent_bus = 60; const num_bus = students * (percent_bus/100); return { problem: `In a school of \\(${students}\\) students, \\(${percent_bus}\\%\\) take the bus. How many students take the bus?`, answer: `\\(${num_bus}\\) students`, checkAnswer: num_bus.toString() }; },
    () => { const correct = 18; const total = 20; const percent = (correct/total)*100; return { problem: `You got \\(${correct}\\) questions right on a \\(${total}\\)-question test. What was your score as a percentage?`, answer: `\\(${percent}\\%\\)`, checkAnswer: `${percent}%` }; },
    () => { const down_payment_percent = 0.20; const car_price = 15000; const down_payment = car_price * down_payment_percent; return { problem: `You need to make a 20% down payment on a \\($${car_price}\\) car. How much is the down payment?`, answer: `\\($${formatAnswer(down_payment)}\\)`, checkAnswer: formatAnswer(down_payment) }; },
    () => { const goal = 500; const raised = 350; const percent_raised = (raised/goal)*100; return { problem: `A charity has raised \\($${raised}\\) of their \\($${goal}\\) goal. What percentage of their goal have they raised?`, answer: `\\(${percent_raised}\\%\\)`, checkAnswer: `${percent_raised}%` }; },
    () => { const fees = 50; const budget = 2000; const percent_fees = (fees/budget)*100; return { problem: `Your monthly budget is \\($${budget}\\). You spend \\($${fees}\\) on bank fees. What percentage of your budget is spent on fees?`, answer: `\\(${formatAnswer(percent_fees, 1)}\\%\\)`, checkAnswer: `${formatAnswer(percent_fees,1)}%` }; },
];

function generate(settings) {
    const generator = problemGenerators[getRandomInt(0, problemGenerators.length - 1)];
    return { ...generator(), hint: generator().hint || "Remember to convert percentages to decimals (divide by 100) before calculating." };
}

export const module = {
    topicId: '7M4',
    topicName: 'Percent Applications',
    generateProblem: generate
};
