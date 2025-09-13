import { allProblemModules } from './problem_modules/index.js';

document.addEventListener('DOMContentLoaded', () => {
    const topicChecklist = document.getElementById('topic-checklist');
    const problemCountInput = document.getElementById('problemCount');
    const generateProblemsBtn = document.getElementById('generateProblems');
    const startTestBtn = document.getElementById('startTest');
    const submitTestBtn = document.getElementById('submitTestBtn');
    const problemsContainer = document.getElementById('problemsContainer');
    const resultsContainer = document.getElementById('resultsContainer');
    const printProblemsBtn = document.getElementById('printProblems');

    let generatedProblemsData = [];

    // --- Dynamically create the topic checklist from the imported modules ---
    allProblemModules.forEach(module => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = module.topicId;
        checkbox.className = 'topic-checkbox';
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(` ${module.topicName}`));
        topicChecklist.appendChild(label);
    });

    const generateProblems = (isTestMode = false) => {
        const selectedTopicIds = Array.from(document.querySelectorAll('.topic-checkbox:checked')).map(cb => cb.value);
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
        problemsContainer.style.display = 'block';
        generatedProblemsData = [];
        printProblemsBtn.style.display = isTestMode ? 'none' : 'block';
        submitTestBtn.style.display = isTestMode ? 'block' : 'none';

        const possibleModules = allProblemModules.filter(m => selectedTopicIds.includes(m.topicId));

        for (let i = 0; i < problemCount; i++) {
            // --- Randomly select one of the CHOSEN modules to generate a problem ---
            const moduleToUse = possibleModules[Math.floor(Math.random() * possibleModules.length)];
            const problemData = moduleToUse.generateProblem({});
            
            generatedProblemsData.push({ ...problemData, problemText: problemData.problem, graphId: problemData.graphId, graphFunction: problemData.graphFunction });

            const problemDiv = document.createElement('div');
            problemDiv.className = 'problem-item';
            
            let problemHTML = `
                <div class="problem-text"><strong>Problem ${i + 1} (${moduleToUse.topicName}):</strong> ${problemData.problem}</div>
                ${problemData.graphId ? `<div id="${problemData.graphId}" class="jxgbox" style="display:none;"></div>` : ''}
            `;

            if (isTestMode) {
                problemHTML += `<div class="answer-input"><label for="answer-${i}">Your Answer:</label><input type="text" id="answer-${i}"></div>`;
            } else {
                 problemHTML += `
                    <div class="solution-section">
                        <button class="solution-toggle" data-target="hint-${i}">Show Hint</button>
                        <button class="solution-toggle" data-target="solution-${i}">Show Solution</button>
                        ${problemData.graphId ? `<button class="solution-toggle graph-toggle" data-graph-id="${problemData.graphId}">Show Graph</button>` : ''}
                        <div id="hint-${i}" class="hint-content" style="display: none;"><strong>Hint:</strong> ${problemData.hint}</div>
                        <div id="solution-${i}" class="solution-content" style="display: none;"><strong>Solution:</strong> ${problemData.answer}</div>
                    </div>
                `;
            }

            problemDiv.innerHTML = problemHTML;
            problemsContainer.appendChild(problemDiv);
        }

        if (window.MathJax) {
            window.MathJax.typesetPromise([problemsContainer]).catch(err => console.error(err));
        }

        addEventListeners();
    };

    function submitAndGradeTest() {
        let score = 0;
        let resultsHTML = '';

        generatedProblemsData.forEach((problemData, index) => {
            const userInput = document.getElementById(`answer-${index}`).value.trim();
            const correctAnswer = String(problemData.checkAnswer).trim();
            
            const isCorrect = userInput.toLowerCase() === correctAnswer.toLowerCase();
            
            if (isCorrect) score++;

            resultsHTML += `
                <div class="result-item ${isCorrect ? 'correct' : 'incorrect'}">
                    <p><strong>Problem:</strong> ${problemData.problemText}</p>
                    <p>Your Answer: ${userInput || '<i>No answer</i>'}</p>
                    <p>Correct Answer: ${problemData.answer}</p>
                </div>
            `;
        });

        const percentage = (score / generatedProblemsData.length) * 100;
        resultsContainer.innerHTML = `<h3>Test Complete! Your score: ${score}/${generatedProblemsData.length} (${percentage.toFixed(1)}%)</h3>` + resultsHTML;
        resultsContainer.style.display = 'block';
        problemsContainer.style.display = 'none';
        submitTestBtn.style.display = 'none';
        printProblemsBtn.style.display = 'none';

        if (window.MathJax) {
            window.MathJax.typesetPromise([resultsContainer]).catch(err => console.error(err));
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
                        if (graphBox.style.display === 'none' || graphBox.innerHTML.trim() === '') {
                            graphBox.style.display = 'block';
                            renderGraph(graphId, problemData.graphFunction);
                        } else {
                            graphBox.style.display = 'none';
                        }
                    }
                }
            });
        });
    }

    function renderGraph(graphId, graphFunctionData) {
        // Clear previous board if it exists
        if (JXG.boards[graphId]) {
            JXG.JSXGraph.freeBoard(JXG.boards[graphId]);
        }

        const board = JXG.JSXGraph.initBoard(graphId, {
            boundingbox: graphFunctionData.boundingbox || [-10, 10, 10, -10],
            axis: true,
            showCopyright: false,
        });

        (graphFunctionData.functions || []).forEach(func => {
            if (func.type === 'expression') {
                board.create('functiongraph', [func.expression], { strokeColor: 'blue', strokeWidth: 2, ...func.options });
            } else if (func.type === 'point') {
                board.create('point', [func.x, func.y], { name: func.options?.name || `(${func.x}, ${func.y})`, color: 'red', size: 3, ...func.options });
            }
        });
        (graphFunctionData.labels || []).forEach(label => {
            board.create('text', [label.x, label.y, label.text], { color: 'black', ...label.options});
        });
    }
    
    // --- Initial button setup ---
    generateProblemsBtn.addEventListener('click', () => generateProblems(false));
    startTestBtn.addEventListener('click', () => generateProblems(true));
    submitTestBtn.addEventListener('click', submitAndGradeTest);
});