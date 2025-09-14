import { allProblemModules } from './problem_modules/index.js';
import { firebaseConfig } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    // --- Initialize Firebase ---
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();

    // --- UI Elements ---
    const topicCheckboxes = document.querySelectorAll('input[name="topic"]');
    const problemCountInput = document.getElementById('problemCount');
    const generateProblemsBtn = document.getElementById('generateProblems');
    const startTestBtn = document.getElementById('startTest');
    const submitTestBtn = document.getElementById('submitTestBtn');
    const generatePdfWorksheetBtn = document.getElementById('generatePdfWorksheet');
    const generatePdfAnswersBtn = document.getElementById('generatePdfAnswers');
    const problemsContainer = document.getElementById('problemsContainer');
    const resultsContainer = document.getElementById('resultsContainer');
    const welcomeMessage = document.getElementById('welcome-message');

    // --- Auth UI Elements ---
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userStatusDiv = document.getElementById('user-status');
    const userEmailSpan = document.getElementById('user-email');
    const authModal = document.getElementById('authModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const authForm = document.getElementById('authForm');
    const authTitle = document.getElementById('authTitle');
    const authEmailInput = document.getElementById('authEmail');
    const authPasswordInput = document.getElementById('authPassword');
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    const authToggleLink = document.getElementById('authToggleLink');
    const authToggleText = document.getElementById('authToggleText');
    const authError = document.getElementById('authError');

    let isSignUpMode = false;
    let generatedProblemsData = [];
    let isTestMode = false;
    const boardInstances = {};

    // --- Auth State Management ---
    auth.onAuthStateChanged(user => {
        if (user) {
            // User is signed in
            userEmailSpan.textContent = user.email;
            userStatusDiv.style.display = 'flex';
            loginBtn.style.display = 'none';
        } else {
            // User is signed out
            userStatusDiv.style.display = 'none';
            loginBtn.style.display = 'block';
        }
    });
    
    // --- Auth Event Listeners ---
    loginBtn.addEventListener('click', () => {
        authModal.style.display = 'flex';
    });

    closeModalBtn.addEventListener('click', () => {
        authModal.style.display = 'none';
    });

    logoutBtn.addEventListener('click', () => {
        auth.signOut();
    });
    
    authToggleLink.addEventListener('click', (e) => {
        e.preventDefault();
        isSignUpMode = !isSignUpMode;
        authTitle.textContent = isSignUpMode ? 'Sign Up' : 'Login';
        authSubmitBtn.textContent = isSignUpMode ? 'Sign Up' : 'Login';
        authToggleText.innerHTML = isSignUpMode ? 'Already have an account? <a href="#" id="authToggleLink">Login</a>' : 'Don\'t have an account? <a href="#" id="authToggleLink">Sign Up</a>';
        // Re-add event listener to the new link
        document.getElementById('authToggleLink').addEventListener('click', arguments.callee);
        authError.textContent = '';
    });

    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = authEmailInput.value;
        const password = authPasswordInput.value;
        authError.textContent = '';

        if (isSignUpMode) {
            // Sign up user
            auth.createUserWithEmailAndPassword(email, password)
                .then(userCredential => {
                    authModal.style.display = 'none';
                    authForm.reset();
                })
                .catch(error => {
                    authError.textContent = error.message;
                });
        } else {
            // Login user
            auth.signInWithEmailAndPassword(email, password)
                .then(userCredential => {
                    authModal.style.display = 'none';
                    authForm.reset();
                })
                .catch(error => {
                    authError.textContent = error.message;
                });
        }
    });


    // --- Problem Generation Logic ---
    const generateProblems = (testMode = false) => {
        isTestMode = testMode;
        const selectedTopicIds = Array.from(topicCheckboxes)
                                    .filter(cb => cb.checked)
                                    .map(cb => cb.value);

        const problemCount = parseInt(problemCountInput.value, 10);

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

        welcomeMessage.style.display = 'none';
        problemsContainer.innerHTML = '';
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'none';
        submitTestBtn.style.display = isTestMode ? 'block' : 'none';
        problemsContainer.style.display = 'block';
        generatedProblemsData = [];
        Object.values(boardInstances).forEach(JXG.JSXGraph.freeBoard);


        const selectedModules = allProblemModules.filter(module => selectedTopicIds.includes(module.topicId));

        for (let i = 0; i < problemCount; i++) {
            const randomModule = selectedModules[Math.floor(Math.random() * selectedModules.length)];
            if (!randomModule) continue;

            let problemData = randomModule.generateProblem({});
            
            if (problemData.graphId) {
                problemData.graphId = `graph-container-${i}`;
            }

            generatedProblemsData.push({ ...problemData, problemText: problemData.problem, topicName: randomModule.topicName });

            const problemDiv = document.createElement('div');
            problemDiv.className = 'problem-item';
            
            let problemHTML = `<div class="problem-text"><strong>Problem ${i + 1} (${randomModule.topicName}):</strong> ${problemData.problem}</div>
                             ${problemData.graphId ? `<div id="${problemData.graphId}" class="jxgbox" style="width: 500px; height: 400px; display:none;"></div>` : ''}`;

            if (isTestMode) {
                problemHTML += `<div class="answer-input"><label for="answer-${i}">Your Answer:</label><input type="text" id="answer-${i}"></div>`;
            } else {
                problemHTML += `<div class="solution-section">
                                    <button class="solution-toggle" data-target="hint-${i}">Show Hint</button>
                                    <button class="solution-toggle" data-target="solution-${i}">Show Solution</button>
                                    ${problemData.graphId ? `<button class="solution-toggle graph-toggle" data-graph-id="${problemData.graphId}">Show Diagram</button>` : ''}
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
    
    const generatePdf = (includeAnswers = false) => {
        if (generatedProblemsData.length === 0) {
            alert("Please generate problems first!");
            return;
        }
    
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
    
        doc.setFontSize(22);
        doc.text("Titan Training", 105, 20, null, null, "center");
        doc.setFontSize(16);
        doc.text(isTestMode ? "Test" : "Worksheet", 105, 30, null, null, "center");
    
        let yPosition = 45;
    
        generatedProblemsData.forEach((problem, index) => {
            const problemText = `Problem ${index + 1} (${problem.topicName}): ${problem.problemText.replace(/\\\(|\\\)/g, '$')}`;
            const splitText = doc.splitTextToSize(problemText, 180);
    
            if (yPosition + (splitText.length * 10) > 280) {
                doc.addPage();
                yPosition = 20;
            }
    
            doc.setFontSize(12);
            doc.text(splitText, 15, yPosition);
            yPosition += splitText.length * 7;
    
            if (isTestMode || !includeAnswers) {
                yPosition += 20;
            }
        });
    
        if (includeAnswers && !isTestMode) {
            doc.addPage();
            doc.setFontSize(22);
            doc.text("Answer Key", 105, 20, null, null, "center");
            yPosition = 35;
    
            generatedProblemsData.forEach((problem, index) => {
                const answerText = `Problem ${index + 1}: ${problem.answer.replace(/\\\(|\\\)/g, '$')}`;
                const splitAnswer = doc.splitTextToSize(answerText, 180);
    
                if (yPosition + (splitAnswer.length * 10) > 280) {
                    doc.addPage();
                    yPosition = 20;
                }
    
                doc.setFontSize(12);
                doc.text(splitAnswer, 15, yPosition);
                yPosition += splitAnswer.length * 7 + 5;
            });
        }
    
        const fileName = includeAnswers ? "Titan_Training_Worksheet_with_Answers.pdf" : "Titan_Training_Worksheet.pdf";
        doc.save(fileName);
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
                    const problemIndex = parseInt(graphId.split('-').pop(), 10);
                    const problemData = generatedProblemsData[problemIndex];
                    const graphBox = document.getElementById(graphId);

                    if (problemData && graphBox) {
                        if (graphBox.style.display === 'block') {
                            graphBox.style.display = 'none';
                            renderGraph(graphId, null, true);
                        } else {
                            graphBox.style.display = 'block';
                            renderGraph(graphId, problemData.graphFunction);
                        }
                    }
                }
            });
        });
    }

    function renderGraph(graphId, graphFunctionData, free = false) {
        if (boardInstances[graphId]) {
            JXG.JSXGraph.freeBoard(boardInstances[graphId]);
            delete boardInstances[graphId];
        }

        if (free || !graphFunctionData) {
            const graphBox = document.getElementById(graphId);
            if(graphBox) graphBox.innerHTML = '';
            return;
        }

        const boardOptions = {
            boundingbox: graphFunctionData.boundingbox || [-10, 10, 10, -10],
            showCopyright: false,
            showNavigation: true
        };

        boardOptions.axis = !graphFunctionData.diagram;

        const board = JXG.JSXGraph.initBoard(graphId, boardOptions);
        boardInstances[graphId] = board;

        (graphFunctionData.functions || []).forEach(func => {
            if (func.type === 'expression') {
                board.create('functiongraph', [func.expression], { strokeColor: 'blue', ...func.options });
            } else if (func.type === 'point') {
                board.create('point', [func.x, func.y], { name: func.options.name || '', color: 'red', size: 3, ...func.options });
            } else if (func.type === 'polygon') {
                board.create('polygon', func.vertices, { fillColor: 'lightblue', fillOpacity: 0.4, borders: { strokeColor: 'blue' }, ...func.options });
            } else if (func.type === 'line') {
                board.create('line', [func.point1, func.point2], { strokeColor: 'black', ...func.options });
            } else if (func.type === 'ellipse') {
                board.create('ellipse', [func.center, func.radius], { strokeColor: 'black', ...func.options });
            } else if (func.type === 'circle') {
                board.create('circle', [func.center, func.radius], { strokeColor: 'blue', ...func.options });
            }
        });

        (graphFunctionData.labels || []).forEach(label => {
            board.create('text', [label.x, label.y, label.text], { color: 'black', ...label.options });
        });
    }
    
    generateProblemsBtn.addEventListener('click', () => generateProblems(false));
    startTestBtn.addEventListener('click', () => generateProblems(true));
    submitTestBtn.addEventListener('click', submitAndGradeTest);
    generatePdfWorksheetBtn.addEventListener('click', () => generatePdf(false));
    generatePdfAnswersBtn.addEventListener('click', () => generatePdf(true));
});
