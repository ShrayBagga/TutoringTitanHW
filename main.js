import { allProblemModules } from './problem_modules/index.js';

document.addEventListener('DOMContentLoaded', () => {
    const topicCheckboxes = document.querySelectorAll('input[name="topic"]');
    const problemCountInput = document.getElementById('problemCount');
    const generateProblemsBtn = document.getElementById('generateProblems');
    const startTestBtn = document.getElementById('startTest');
    const submitTestBtn = document.getElementById('submitTestBtn');
    const problemsContainer = document.getElementById('problemsContainer');
    const resultsContainer = document.getElementById('resultsContainer');
    const welcomeMessage = document.getElementById('welcome-message');

    let generatedProblemsData = [];

    const generateProblems = (isTestMode = false) => {
        const selectedTopicIds = Array.from(topicCheckboxes)
                                    .filter(cb => cb.checked)
                                    .map(cb => cb.value);

        const problemCount = parseInt(problemCountInput.value, 10);

        // Problem count validation (no upper limit)
        if (isNaN(problemCount) || problemCount <= 0) {
            problemsContainer.innerHTML = '<p style="color: red;">Please enter a valid problem count of 1 or more.</p>';
            welcomeMessage.style.display = 'none';
            problemsContainer.style.display = 'block';
            return;
        }

        if (selectedTopicIds.length === 0) {
            problemsContainer.innerHTML = '<p style="color: red;">Please select at least one topic.</p>';
            welcomeMessage.style.display = 'none';
            problemsContainer.style.display = 'block';
            return;
        }

        // --- Reset UI ---
        welcomeMessage.style.display = 'none';
        problemsContainer.innerHTML = '';
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'none';
        submitTestBtn.style.display = isTestMode ? 'block' : 'none';
        problemsContainer.style.display = 'block';
        generatedProblemsData = [];

        const selectedModules = allProblemModules.filter(module => selectedTopicIds.includes(module.topicId));

        for (let i = 0; i < problemCount; i++) {
            const randomModule = selectedModules[Math.floor(Math.random() * selectedModules.length)];
            if (!randomModule) continue;

            const problemData = randomModule.generateProblem({});
            generatedProblemsData.push({ ...problemData, problemText: problemData.problem, graphId: problemData.graphId, graphFunction: problemData.graphFunction });

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

        if (window.MathJax) {
            window.MathJax.typesetPromise([problemsContainer]).catch(console.error);
        }
        addEventListeners();
    };

    function submitAndGradeTest() {
        let score = 0;
        let resultsHTML = '';

        generatedProblemsData.forEach((problemData, index) => {
            const userInput = document.getElementById(`answer-${index}`).value.trim().toLowerCase();
            const correctAnswer = problemData.checkAnswer;
            let isCorrect = false;

            if (Array.isArray(correctAnswer)) {
                isCorrect = correctAnswer.map(ans => ans.toLowerCase()).includes(userInput);
            } else {
                isCorrect = userInput === String(correctAnswer).toLowerCase();
            }
            
            if (isCorrect) score++;

            resultsHTML += `<div class="result-item ${isCorrect ? 'correct' : 'incorrect'}">
                                <p><strong>Problem:</strong> ${problemData.problemText}</p>
                                <p>Your Answer: ${userInput || '<i>No answer</i>'}</p>
                                <p>Correct Answer: ${problemData.answer}</p>
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
                        if (graphBox.style.display === 'block') {
                            graphBox.style.display = 'none';
                            graphBox.innerHTML = '';
                        } else {
                            graphBox.style.display = 'block';
                            renderGraph(graphId, problemData.graphFunction);
                        }
                    }
                }
            });
        });
    }

    function renderGraph(graphId, graphFunctionData) {
        JXG.JSXGraph.freeBoard(document.getElementById(graphId));
        
        const board = JXG.JSXGraph.initBoard(graphId, {
            boundingbox: graphFunctionData.boundingbox || [-5, 5, 5, -5],
            axis: true,
            showCopyright: false
        });
        (graphFunctionData.functions || []).forEach(func => {
            if (func.type === 'expression') board.create('functiongraph', [func.expression], { strokeColor: 'blue', ...func.options });
            else if (func.type === 'point') board.create('point', [func.x, func.y], { name: func.options.name || `(${func.x}, ${func.y})`, color: 'red', size: 3, ...func.options });
            else if (func.type === 'polygon') board.create('polygon', func.vertices, { fillColor: 'lightblue', fillOpacity: 0.4, borders: { strokeColor: 'blue' }, ...func.options});
            else if (func.type === 'line') board.create('line', [func.point1, func.point2], {strokeColor:'black', ...func.options});
            else if (func.type === 'ellipse') board.create('ellipse', [func.center, func.radius], {strokeColor:'black', ...func.options});
            else if (func.type === 'circle') board.create('circle', [func.center, func.radius], {strokeColor:'blue', ...func.options});
        });
        (graphFunctionData.labels || []).forEach(label => {
            board.create('text', [label.x, label.y, label.text], { color: 'black', ...label.options});
        });
    }
    
    generateProblemsBtn.addEventListener('click', () => generateProblems(false));
    startTestBtn.addEventListener('click', () => generateProblems(true));
    submitTestBtn.addEventListener('click', submitAndGradeTest);
});