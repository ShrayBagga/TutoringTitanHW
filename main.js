console.log('--- main.js loaded and executing! ---'); // VERIFY THIS IS THE FIRST LINE IN YOUR CONSOLE

import {
    generateGrade6Problem,
    generateGrade7Problem,
    generateGrade8Problem,
    generateAlgebraProblem,
    generateGeometryProblem,
    generatePrecalcProblem,
    generateCalculusProblem,
    generateSatPrepProblem,
    renderAllGraphs,
    renderGraph,
    JXGBOARDS,
    getRandomInt,
    generateChallengeComplexAlgebra,
    generateChallengeAdvancedNumberTheory,
    generateChallengeAdvancedGeometry,
    generateChallengeVectorBasics,
    generateChallengeComplexFunctions,
    generateChallengeAdvancedTrigIdentities,
    generateChallengeOptimization,
    generateChallengeAdvancedDerivatives,
    generateChallengeAdvancedIntegrals,
    generateChallengeDifferentialEquations
} from './problems.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('--- DOMContentLoaded Fired ---');

    const gradeLevelRadios = document.querySelectorAll('input[name="gradeLevel"]');
    const challengeModeCheckbox = document.getElementById('challengeMode');
    const satPrepModeCheckbox = document.getElementById('satPrepMode');
    const mathTopicSelect = document.getElementById('mathTopic');
    const problemCountInput = document.getElementById('problemCount');
    const generateProblemsBtn = document.getElementById('generateProblems');
    const startTestBtn = document.getElementById('startTest');
    const printProblemsBtn = document.getElementById('printProblems');
    const submitTestBtn = document.getElementById('submitTestBtn');
    const problemsContainer = document.getElementById('problemsContainer');
    const resultsContainer = document.getElementById('resultsContainer');
    const difficultyAdjustment = document.getElementById('difficultyAdjustment');

    let generatedProblemsData = [];

    const topics = {
        grade6: [
            { value: 'arithmetic_operations', text: 'Basic Arithmetic (+ - * /)' },
            { value: 'fractions_decimals_percent', text: 'Fractions, Decimals, Percentages' },
            { value: 'geometry_basic_shapes', text: 'Basic Geometry (Area/Perimeter)' },
            { value: 'ratios_proportions', text: 'Ratios and Proportions' }
        ],
        grade7: [
            { value: 'integers_rational_numbers', text: 'Integers & Rational Numbers' },
            { value: 'expressions_equations_basic', text: 'Basic Expressions & Equations' },
            { value: 'angles_triangles', text: 'Angles and Triangles' },
            { value: 'probability_simple', text: 'Simple Probability' }
        ],
        grade8: [
            { value: 'linear_equations_systems_basic', text: 'Linear Equations & Basic Systems' },
            { value: 'exponents_scientific_notation', text: 'Exponents & Scientific Notation' },
            { value: 'pythagorean_theorem_basic', text: 'Pythagorean Theorem (Basic)' },
            { value: 'functions_introduction', text: 'Introduction to Functions' }
        ],
        grade9: [
            { value: 'algebra_linear_equations', text: 'Linear Equations' },
            { value: 'algebra_quadratic_equations', text: 'Quadratic Equations' },
            { value: 'algebra_polynomial_operations', text: 'Polynomial Operations' },
            { value: 'algebra_system_equations', text: 'System of Equations (2 vars)' }
        ],
        grade10: [
            { value: 'geometry_area_perimeter', text: 'Area and Perimeter' },
            { value: 'geometry_volume_surface_area', text: 'Volume and Surface Area' },
            { value: 'geometry_pythagorean_theorem', text: 'Pythagorean Theorem' },
            { value: 'geometry_trigonometry_basics', text: 'Basic Trigonometry (SOH CAH TOA)' }
        ],
        grade11: [
            { value: 'precalc_functions_graphing', text: 'Functions and Graphing' },
            { value: 'precalc_log_exp', text: 'Logarithms and Exponentials' },
            { value: 'precalc_trig_equations', text: 'Trigonometric Equations' },
            { value: 'precalc_sequences_series', text: 'Sequences and Series' }
        ],
        grade12: [
            { value: 'calculus_limits', text: 'Limits' },
            { value: 'calculus_derivatives', text: 'Derivatives' },
            { value: 'calculus_integrals', text: 'Integrals' },
            { value: 'calculus_applications', text: 'Calculus Applications' }
        ]
    };

    const challengeTopics = {
        grade9: [
            { value: 'challenge_complex_algebra', text: 'Complex Algebra' },
            { value: 'challenge_advanced_number_theory', text: 'Advanced Number Theory' }
        ],
        grade10: [
            { value: 'challenge_advanced_geometry', text: 'Advanced Geometry' },
            { value: 'challenge_vector_basics', text: 'Vector Basics' }
        ],
        grade11: [
            { value: 'challenge_complex_functions', text: 'Complex Functions' },
            { value: 'challenge_advanced_trig_identities', text: 'Advanced Trig Identities' },
            { value: 'challenge_optimization', text: 'Optimization Problems' },
        ],
        grade12: [
            { value: 'challenge_advanced_derivatives', text: 'Advanced Derivatives' },
            { value: 'challenge_advanced_integrals', text: 'Advanced Integrals' },
            { value: 'challenge_differential_equations', text: 'Differential Equations (Basic)' }
        ]
    };

    const satPrepTopics = [
        { value: 'sat_linear_equations', text: 'Linear Equations & Inequalities' },
        { value: 'sat_quadratic_functions', text: 'Quadratic Functions' },
        { value: 'sat_polynomials', text: 'Polynomials & Rational Expressions' },
        { value: 'sat_systems_equations', text: 'Systems of Equations' },
        { value: 'sat_functions', text: 'Functions & Function Notation' },
        { value: 'sat_geometry_area_volume', text: 'Geometry (Area, Volume, Lines, Angles)' },
        { value: 'sat_trigonometry_basics', text: 'Basic Trigonometry' },
        { value: 'sat_exponents_roots', text: 'Exponents and Roots' },
        { value: 'sat_data_analysis', text: 'Data Analysis & Statistics' },
        { value: 'sat_probability', text: 'Probability' }
    ];

    function updateUIAndLoadTopics() {
        const selectedGradeRadio = document.querySelector('input[name="gradeLevel"]:checked');
        const selectedGrade = selectedGradeRadio ? selectedGradeRadio.value : null;
        const inChallengeMode = challengeModeCheckbox.checked;
        const inSatPrepMode = satPrepModeCheckbox.checked;

        // Logic to ensure mutual exclusivity/priority
        if (inSatPrepMode) {
            gradeLevelRadios.forEach(radio => radio.checked = false);
            challengeModeCheckbox.checked = false;
            difficultyAdjustment.style.display = 'none';
        } else if (inChallengeMode && selectedGrade) {
            satPrepModeCheckbox.checked = false; 
            difficultyAdjustment.style.display = 'block';
        } else if (selectedGrade) {
            challengeModeCheckbox.checked = false;
            satPrepModeCheckbox.checked = false;
            difficultyAdjustment.style.display = 'none';
        } else {
            challengeModeCheckbox.checked = false;
            satPrepModeCheckbox.checked = false;
            difficultyAdjustment.style.display = 'none';
        }
        loadTopicsInternal();
    }

    function loadTopicsInternal() {
        const selectedGrade = document.querySelector('input[name="gradeLevel"]:checked')?.value;
        const inChallengeMode = challengeModeCheckbox.checked;
        const inSatPrepMode = satPrepModeCheckbox.checked;

        mathTopicSelect.innerHTML = '<option value="">Select a topic</option>';

        let currentTopics = [];
        if (inSatPrepMode) {
            currentTopics = satPrepTopics;
        } else if (selectedGrade) {
            if (inChallengeMode && challengeTopics[selectedGrade]) {
                currentTopics = challengeTopics[selectedGrade];
            } else {
                currentTopics = topics[selectedGrade] || [];
            }
        }

        if (currentTopics.length > 0) {
            const mixOption = document.createElement('option');
            mixOption.value = 'mix_all_topics';
            mixOption.textContent = 'Mix of All Topics';
            mathTopicSelect.appendChild(mixOption);

            currentTopics.forEach(topic => {
                const option = document.createElement('option');
                option.value = topic.value;
                option.textContent = topic.text;
                mathTopicSelect.appendChild(option);
            });
            mathTopicSelect.disabled = false;
            mathTopicSelect.value = 'mix_all_topics';
        } else {
            mathTopicSelect.disabled = true;
        }
    }

    gradeLevelRadios.forEach(radio => radio.addEventListener('change', updateUIAndLoadTopics));
    challengeModeCheckbox.addEventListener('change', updateUIAndLoadTopics));
    satPrepModeCheckbox.addEventListener('change', updateUIAndLoadTopics));
    updateUIAndLoadTopics();

    const generateProblems = (isTestMode = false) => {
        const selectedGrade = document.querySelector('input[name="gradeLevel"]:checked')?.value;
        const selectedTopic = mathTopicSelect.value;
        const problemCount = parseInt(problemCountInput.value, 10);
        const inChallengeMode = challengeModeCheckbox.checked;
        const inSatPrepMode = satPrepModeCheckbox.checked;
        const difficulty = document.querySelector('input[name="difficulty"]:checked')?.value || 'medium';

        if (!selectedTopic || selectedTopic === '') {
            problemsContainer.innerHTML = '<p style="color: red;">Please select a topic.</p>';
            return;
        }
        if (isNaN(problemCount) || problemCount <= 0 || problemCount > 20) {
            problemsContainer.innerHTML = '<p style="color: red;">Please enter a valid problem count (1-20).</p>';
            return;
        }

        problemsContainer.innerHTML = '';
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'none';
        generatedProblemsData = [];

        printProblemsBtn.style.display = isTestMode ? 'none' : 'block';
        submitTestBtn.style.display = isTestMode ? 'block' : 'none';

        const settings = {
            decimalPlaces: 2,
            difficulty: difficulty
        };

        for (let i = 0; i < problemCount; i++) {
            let problemData;
            let actualTopicToGenerate = selectedTopic;

            if (selectedTopic === 'mix_all_topics') {
                let availableTopicsForMix = [];
                if (inSatPrepMode) {
                    availableTopicsForMix = satPrepTopics;
                } else if (selectedGrade) {
                    availableTopicsForMix = (inChallengeMode && challengeTopics[selectedGrade]) ? challengeTopics[selectedGrade] : topics[selectedGrade];
                }
                const actualSelectableTopics = availableTopicsForMix.filter(t => t.value !== 'mix_all_topics');
                if (actualSelectableTopics.length > 0) {
                    actualTopicToGenerate = actualSelectableTopics[getRandomInt(0, actualSelectableTopics.length - 1)].value;
                }
            }

            try {
                 if (inSatPrepMode) {
                    problemData = generateSatPrepProblem(actualTopicToGenerate, settings);
                } else if (inChallengeMode) {
                    switch (actualTopicToGenerate) {
                        case 'challenge_complex_algebra': problemData = generateChallengeComplexAlgebra(settings); break;
                        case 'challenge_advanced_number_theory': problemData = generateChallengeAdvancedNumberTheory(settings); break;
                        case 'challenge_advanced_geometry': problemData = generateChallengeAdvancedGeometry(settings); break;
                        case 'challenge_vector_basics': problemData = generateChallengeVectorBasics(settings); break;
                        case 'challenge_complex_functions': problemData = generateChallengeComplexFunctions(settings); break;
                        case 'challenge_advanced_trig_identities': problemData = generateChallengeAdvancedTrigIdentities(settings); break;
                        case 'challenge_optimization': problemData = generateChallengeOptimization(settings); break;
                        case 'challenge_advanced_derivatives': problemData = generateChallengeAdvancedDerivatives(settings); break;
                        case 'challenge_advanced_integrals': problemData = generateChallengeAdvancedIntegrals(settings); break;
                        case 'challenge_differential_equations': problemData = generateChallengeDifferentialEquations(settings); break;
                        default: problemData = { problem: `Error: Unknown challenge topic '${actualTopicToGenerate}'`, answer: 'N/A', hint: 'N/A' };
                    }
                } else {
                    switch (selectedGrade) {
                        case 'grade6': problemData = generateGrade6Problem(actualTopicToGenerate, settings); break;
                        case 'grade7': problemData = generateGrade7Problem(actualTopicToGenerate, settings); break;
                        case 'grade8': problemData = generateGrade8Problem(actualTopicToGenerate, settings); break;
                        case 'grade9': problemData = generateAlgebraProblem(actualTopicToGenerate, settings); break;
                        case 'grade10': problemData = generateGeometryProblem(actualTopicToGenerate, settings); break;
                        case 'grade11': problemData = generatePrecalcProblem(actualTopicToGenerate, settings); break;
                        case 'grade12': problemData = generateCalculusProblem(actualTopicToGenerate, settings); break;
                        default: problemData = { problem: `Error: No grade selected or unknown topic`, answer: 'N/A', hint: 'N/A' };
                    }
                }

                if (!problemData || !problemData.problem) {
                    problemData = { problem: `Failed to generate problem for topic ${actualTopicToGenerate}.`, answer: 'N/A', hint: 'N/A', checkAnswer: 'N/A' };
                }

            } catch (error) {
                console.error(`CRITICAL ERROR generating problem for topic ${actualTopicToGenerate}:`, error);
                problemData = { problem: `Error generating problem. (${error.message})`, answer: 'N/A', hint: 'N/A', checkAnswer: 'N/A' };
            }

            const problemDiv = document.createElement('div');
            problemDiv.className = 'problem-item';
            
            let problemHTML = `
                <div class="problem-text"><strong>Problem ${i + 1}:</strong> ${problemData.problem}</div>
                ${problemData.graphId ? `<div id="${problemData.graphId}" class="jxgbox" style="width:300px; height:300px;"></div>` : ''}
            `;

            if (isTestMode) {
                problemHTML += `
                    <div class="answer-input">
                        <label for="answer-${i}">Your Answer:</label>
                        <input type="text" id="answer-${i}" name="answer-${i}">
                    </div>
                `;
            } else {
                 problemHTML += `
                    <div class="solution-section">
                        <button class="solution-toggle" data-target="hint-${i}">Show Hint</button>
                        <button class="solution-toggle" data-target="solution-${i}">Show Solution</button>
                        ${problemData.graphFunction ? `<button class="solution-toggle graph-toggle" data-graph-target="${problemData.graphId}" data-graph-function="${btoa(JSON.stringify(problemData.graphFunction))}" style="margin-left: 10px;">Show Graph</button>` : ''}
                        <div id="hint-${i}" class="hint-content"><strong>Hint:</strong> ${problemData.hint}</div>
                        <div id="solution-${i}" class="solution-content"><strong>Solution:</strong> ${problemData.answer}</div>
                    </div>
                `;
            }

            problemDiv.innerHTML = problemHTML;
            problemsContainer.appendChild(problemDiv);

            generatedProblemsData.push({
                problem: `Problem ${i + 1}: ${problemData.problem}`,
                answer: problemData.answer,
                checkAnswer: problemData.checkAnswer || problemData.answer.replace(/\\\(|\\\)|\\\[|\\\]/g, ''), // Fallback for checkAnswer
                hint: problemData.hint
            });
        }

        if (window.MathJax) {
            window.MathJax.typesetPromise([problemsContainer]).then(() => {
                renderAllGraphs();
            }).catch((err) => console.error('MathJax typesetting failed:', err));
        } else {
             renderAllGraphs();
        }

        document.querySelectorAll('.solution-toggle').forEach(button => {
            button.addEventListener('click', (event) => {
                const targetId = event.target.dataset.target;
                if (targetId) {
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.style.display = targetElement.style.display === 'block' ? 'none' : 'block';
                    }
                }
            });
        });
    };

    function submitAndGradeTest() {
        let score = 0;
        let resultsHTML = '';

        generatedProblemsData.forEach((problemData, index) => {
            const userInput = document.getElementById(`answer-${index}`).value.trim();
            const correctAnswer = String(problemData.checkAnswer).trim();
            const isCorrect = userInput.toLowerCase() === correctAnswer.toLowerCase();
            
            if (isCorrect) {
                score++;
            }

            resultsHTML += `
                <div class="result-item ${isCorrect ? 'correct' : 'incorrect'}">
                    <p><strong>${problemData.problem.split(':</strong> ')[1]}</strong></p>
                    <p>Your Answer: ${userInput || '<i>No answer</i>'}</p>
                    <p>Correct Answer: ${problemData.answer}</p>
                </div>
            `;
        });

        const percentage = (score / generatedProblemsData.length) * 100;
        resultsContainer.innerHTML = `<h3>Test Complete! Your score: ${score}/${generatedProblemsData.length} (${percentage.toFixed(1)}%)</h3>` + resultsHTML;
        resultsContainer.style.display = 'block';
        problemsContainer.style.display = 'none'; // Hide original problems
        submitTestBtn.style.display = 'none';

        if (window.MathJax) {
            window.MathJax.typesetPromise([resultsContainer]);
        }
    }


    generateProblemsBtn.addEventListener('click', () => generateProblems(false));
    startTestBtn.addEventListener('click', () => generateProblems(true));
    submitTestBtn.addEventListener('click', submitAndGradeTest);

    printProblemsBtn.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        let y = 20;
        doc.setFontSize(16);
        doc.text("Titan Training - Math Practice Problems", doc.internal.pageSize.getWidth() / 2, y, { align: 'center' });
        y += 15;
        doc.setFontSize(10);

        generatedProblemsData.forEach((problemData) => {
             // Simplified PDF conversion logic
            const problemText = problemData.problem.replace(/\\\(|\\\)|\\\[|\\\]/g, '');
            const answerText = problemData.answer.replace(/\\\(|\\\)|\\\[|\\\]/g, '');
            const hintText = problemData.hint.replace(/\\\(|\\\)|\\\[|\\\]/g, '');

            if (y > 280) { // Simple page break
                doc.addPage();
                y = 20;
            }

            const problemLines = doc.splitTextToSize(problemText, 180);
            doc.text(problemLines, 10, y);
            y += problemLines.length * 7;
            doc.text(`Solution: ________________`, 15, y += 7);
            y += 14;
        });

        doc.save('Titan_Training_Problems.pdf');
    });
});