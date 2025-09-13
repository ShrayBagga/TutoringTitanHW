import { allProblemModules } from './problem_modules/index.js';

document.addEventListener('DOMContentLoaded', () => {
    // --- Element selection ---
    const topicCheckboxes = document.querySelectorAll('#grade6-topics-checklist input[type="checkbox"]');
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

        // --- Filter modules based on selection ---
        const selectedModules = allProblemModules.filter(module => selectedTopicIds.includes(module.topicId));

        for (let i = 0; i < problemCount; i++) {
            // Pick a random module from the selected ones
            const randomModule = selectedModules[getRandomInt(0, selectedModules.length - 1)];
            
            if (!randomModule) continue;

            // Generate a problem from that module
            const problemData = randomModule.generateProblem({});
            
            generatedProblemsData.push({ ...problemData, problemText: problemData.problem });

            const problemDiv = document.createElement('div');
            problemDiv.className = 'problem-item';
            
            let problemHTML = `<div class="problem-text"><strong>Problem ${i + 1}:</strong> ${problemData.problem}</div>
                             ${problemData.graphId ? `<div id="${problemData.graphId}" class="jxgbox" style="width:400px; height:300px;"></div>` : ''}`;

            if (isTestMode) {
                problemHTML += `<div class="answer-input"><label for="answer-${i}">Your Answer:</label><input type="text" id="answer-${i}"></div>`;
            } else {
                problemHTML += `<div class="solution-section">
                                    <button class="solution-toggle" data-target="hint-${i}">Show Hint</button>
                                    <button class="solution-toggle" data-target="solution-${i}">Show Solution</button>
                                </div>
                                <div id="hint-${i}" class="hint-content" style="display: none;"><strong>Hint:</strong> ${problemData.hint}</div>
                                <div id="solution-${i}" class="solution-content" style="display: none;"><strong>Solution:</strong> ${problemData.answer}</div>`;
            }
            problemDiv.innerHTML = problemHTML;
            problemsContainer.appendChild(problemDiv);
        }

        // --- Render Math and Graphs ---
        if (window.MathJax) {
            window.MathJax.typesetPromise([problemsContainer]).catch(console.error);
        }
        generatedProblemsData.forEach(data => {
            if (data.graphId && data.graphFunction) {
                renderGraph(data.graphId, data.graphFunction);
            }
        });

        // --- Add Event Listeners for new buttons ---
         document.querySelectorAll('.solution-toggle').forEach(button => {
            button.addEventListener('click', (event) => {
                const target = document.getElementById(event.target.dataset.target);
                if (target) {
                    target.style.display = target.style.display === 'block' ? 'none' : 'block';
                }
            });
        });
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

    function renderGraph(graphId, data) {
        const box = document.getElementById(graphId);
        if(!box) return;
        
        JXG.JSXGraph.initBoard(graphId, {
            boundingbox: data.boundingbox || [-5, 5, 5, -5],
            axis: true,
            showCopyright: false
        });
    }
    
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generateProblemsBtn.addEventListener('click', () => generateProblems(false));
    startTestBtn.addEventListener('click', () => generateProblems(true));
    submitTestBtn.addEventListener('click', submitAndGradeTest);
});
