import { allProblemModules } from './problem_modules/index.js';

document.addEventListener('DOMContentLoaded', () => {
    const topicCheckboxes = document.querySelectorAll('#topic-checklist input[type="checkbox"]');
    const problemCountInput = document.getElementById('problemCount');
    const generateProblemsBtn = document.getElementById('generateProblems');
    const startTestBtn = document.getElementById('startTest');
    const submitTestBtn = document.getElementById('submitTestBtn');
    const problemsContainer = document.getElementById('problemsContainer');
    const resultsContainer = document.getElementById('resultsContainer');

    let generatedProblemsData = [];

    const generateProblems = (isTestMode = false) => {
        const selectedTopicIds = Array.from(topicCheckboxes)
                                    .filter(cb => cb.checked)
                                    .map(cb => cb.value);

        const problemCount = parseInt(problemCountInput.value, 10);

        if (selectedTopicIds.length === 0) {
            problemsContainer.innerHTML = '<p style="color: red;">Please select at least one topic.</p>';
            return;
        }
        if (isNaN(problemCount) || problemCount <= 0 || problemCount > 50) {
            problemsContainer.innerHTML = '<p style="color: red;">Please enter a valid problem count (1-50).</p>';
            return;
        }

        // --- Reset UI ---
        problemsContainer.innerHTML = '';
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'none';
        submitTestBtn.style.display = isTestMode ? 'block' : 'none';
        problemsContainer.style.display = 'block';
        generatedProblemsData = [];

        // --- Filter modules based on user's checkbox selection ---
        const selectedModules = allProblemModules.filter(module => selectedTopicIds.includes(module.topicId));

        for (let i = 0; i < problemCount; i++) {
            // Pick a random module from the selected ones
            const randomModule = selectedModules[Math.floor(Math.random() * selectedModules.length)];
            
            if (!randomModule) continue;

            // Generate a problem from that module
            const problemData = randomModule.generateProblem({});
            
            generatedProblemsData.push({ ...problemData, problemText: problemData.problem });

            const problemDiv = document.createElement('div');
            problemDiv.className = 'problem-item';
            
            let problemHTML = `<div class="problem-text"><strong>Problem ${i + 1} (${randomModule.topicName}):</strong> ${problemData.problem}</div>
                             ${problemData.graphId ? `<div id="${problemData.graphId}" class="jxgbox" style="display:none;"></div>` : ''}`;

            if (isTestMode) {
                problemHTML += `<div class="answer-input"><label for="answer-${i}">Your Answer:</label><input type="text" id="answer-${i}"></div>`;
            } else {
                problemHTML += `<div class="solution-section">
                                    <button class="solution-toggle" data-target="hint-${i}">Show Hint</button>
                                    <button class="solution-toggle" data-target="solution-${i}">Show Solution</button>
                                    ${problemData.graphId ? `<button class="solution-toggle graph-toggle" data-graph-id="${problemData.graphId}">Show Graph</button>` : ''}
                                </div>
                                <div id="hint-${i}" class="hint-content" style="display: none;"><strong>Hint:</strong> ${problemData.hint}</div>
                                <div id="solution-${i}" class="solution-content" style="display: none;"><strong>Solution:</strong> ${problemData.answer}</div>`;
            }
            problemDiv.innerHTML = problemHTML;
            problemsContainer.appendChild(problemDiv);
        }

        // --- Render Math and Add Event Listeners ---
        if (window.MathJax) {
            window.MathJax.typesetPromise([problemsContainer]).catch(console.error);
        }
        addEventListeners();
    };

    function submitAndGradeTest() {
        let score = 0;
        let resultsHTML = '';

        generatedProblemsData.forEach((data, index) => {
            const userInput = document.getElementById(`answer-${index}`).value.trim();
            const correctAnswer = String(data.checkAnswer).trim();
            const isCorrect = userInput.toLowerCase() === correctAnswer.toLowerCase();
            
            if (isCorrect) score++;

            resultsHTML += `<div class="result-item ${isCorrect ? 'correct' : 'incorrect'}">
                                <p><strong>Problem:</strong> ${data.problemText}</p>
                                <p>Your Answer: ${userInput || '<i>No answer</i>'}</p>
                                <p>Correct Answer: ${data.answer}</p>
                            </div>`;
        });

        const percentage = (score / generatedProblemsData.length) * 100;
        resultsContainer.innerHTML = `<h3>Test Complete! Your score: ${score}/${generatedProblemsData.length} (${percentage.toFixed(1)}%)</h3>` + resultsHTML;
        resultsContainer.style.display = 'block';
        problemsContainer.style.display = 'none';
        submitTestBtn.style.display = 'none';

        if (window.MathJax) {
            window.MathJax.typesetPromise([resultsContainer]).catch(console.error);
        }
    }

    function addEventListeners() {
        document.querySelectorAll('.solution-toggle').forEach(button => {
            button.addEventListener('click', (event) => {
                const targetId = event.target.dataset.target;
                if (targetId) {
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.style.display = targetElement.style.display === 'block' ? 'none' : 'block';
                    }
                }

                if (event.target.classList.contains('graph-toggle')) {
                    const graphId = event.target.dataset.graphId;
                    const problemData = generatedProblemsData.find(p => p.graphId === graphId);
                    if (problemData && problemData.graphFunction) {
                        const graphBox = document.getElementById(graphId);
                        // Clear previous graph before rendering a new one
                        graphBox.innerHTML = ''; 
                        graphBox.style.display = 'block';
                        renderGraph(graphId, problemData.graphFunction);
                    }
                }
            });
        });
    }

    function renderGraph(graphId, graphFunctionData) {
        const board = JXG.JSXGraph.initBoard(graphId, {
            boundingbox: graphFunctionData.boundingbox || [-5, 5, 5, -5],
            axis: true,
            showCopyright: false
        });
        (graphFunctionData.functions || []).forEach(func => {
            if (func.type === 'expression') board.create('functiongraph', [func.expression], { strokeColor: 'blue', ...func.options });
            else if (func.type === 'point') board.create('point', [func.x, func.y], { name: `(${func.x}, ${func.y})`, color: 'red', size: 3, ...func.options });
        });
        (graphFunctionData.labels || []).forEach(label => {
            board.create('text', [label.x, label.y, label.text], { color: 'black', ...label.options});
        });
    }
    
    generateProblemsBtn.addEventListener('click', () => generateProblems(false));
    startTestBtn.addEventListener('click', () => generateProblems(true));
    submitTestBtn.addEventListener('click', submitAndGradeTest);
});