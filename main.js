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
    const printProblemsBtn = document.getElementById('printProblems');
    const problemsContainer = document.getElementById('problemsContainer');
    const difficultyAdjustment = document.getElementById('difficultyAdjustment');

    console.log('Elements check:');
    console.log('gradeLevelRadios count:', gradeLevelRadios.length);
    console.log('challengeModeCheckbox element:', challengeModeCheckbox);
    console.log('satPrepModeCheckbox element:', satPrepModeCheckbox);
    console.log('mathTopicSelect element:', mathTopicSelect);

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
        console.log('--- updateUIAndLoadTopics Called ---');
        const selectedGradeRadio = document.querySelector('input[name="gradeLevel"]:checked');
        const selectedGrade = selectedGradeRadio ? selectedGradeRadio.value : null;
        const inChallengeMode = challengeModeCheckbox.checked;
        const inSatPrepMode = satPrepModeCheckbox.checked;

        console.log(`Current Selections: Grade=${selectedGrade}, Challenge=${inChallengeMode}, SAT=${inSatPrepMode}`);

        // Logic to ensure mutual exclusivity/priority
        if (inSatPrepMode) {
            // If SAT Prep is active, uncheck all grade radios and challenge mode
            gradeLevelRadios.forEach(radio => radio.checked = false);
            challengeModeCheckbox.checked = false;
            difficultyAdjustment.style.display = 'none';
            console.log('Mode: SAT Prep is active. Grade and Challenge unchecked.');
        } else if (inChallengeMode && selectedGrade) {
            // If Challenge Mode is active AND a grade is selected
            satPrepModeCheckbox.checked = false; // Uncheck SAT Prep
            difficultyAdjustment.style.display = 'block';
            console.log(`Mode: Challenge Mode active for ${selectedGrade}. SAT Prep unchecked.`);
        } else if (selectedGrade) {
            // If only a grade is selected (no challenge, no SAT prep)
            challengeModeCheckbox.checked = false; // Uncheck challenge
            satPrepModeCheckbox.checked = false; // Uncheck SAT Prep
            difficultyAdjustment.style.display = 'none'; // Difficulty is for challenge mode
            console.log(`Mode: Standard Grade ${selectedGrade} is active.`);
        } else {
            // No specific mode or grade selected (e.g., on initial load before any grade is checked)
            challengeModeCheckbox.checked = false;
            satPrepModeCheckbox.checked = false;
            difficultyAdjustment.style.display = 'none';
            console.log('Mode: No grade or specific mode selected, resetting modes.');
        }

        loadTopicsInternal();
    }

    function loadTopicsInternal() {
        console.log('--- loadTopicsInternal Called ---');
        const selectedGrade = document.querySelector('input[name="gradeLevel"]:checked')?.value;
        const inChallengeMode = challengeModeCheckbox.checked;
        const inSatPrepMode = satPrepModeCheckbox.checked;

        mathTopicSelect.innerHTML = '<option value="">Select a topic</option>'; // Clear existing options

        let currentTopics = [];
        if (inSatPrepMode) {
            currentTopics = satPrepTopics;
            console.log('Topics source: SAT Prep');
        } else if (selectedGrade) {
            if (inChallengeMode && challengeTopics[selectedGrade]) {
                currentTopics = challengeTopics[selectedGrade];
                console.log('Topics source: Challenge Mode for', selectedGrade);
            } else {
                currentTopics = topics[selectedGrade];
                console.log('Topics source: Standard Topics for', selectedGrade);
            }
        } else {
            console.log('Topics source: No active selection, currentTopics remains empty.');
        }

        console.log('Current Topics array before population:', currentTopics);

        if (currentTopics && currentTopics.length > 0) {
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
            mathTopicSelect.value = 'mix_all_topics'; // Select "Mix of All Topics" by default
            console.log('Topic selector populated and enabled. "Mix of All Topics" selected.');
        } else {
            mathTopicSelect.disabled = true;
            console.log('No topics available, topic selector disabled.');
        }
    }

    // Attach event listeners
    gradeLevelRadios.forEach(radio => radio.addEventListener('change', updateUIAndLoadTopics));
    challengeModeCheckbox.addEventListener('change', updateUIAndLoadTopics);
    satPrepModeCheckbox.addEventListener('change', updateUIAndLoadTopics);

    // Initial setup: Call updateUIAndLoadTopics once to populate the dropdown
    // This is crucial for the initial state when the page loads.
    updateUIAndLoadTopics();
    console.log('--- Initial updateUIAndLoadTopics call completed ---');

    // --- Problem Generation Button Logic ---
    generateProblemsBtn.addEventListener('click', () => {
        const selectedGrade = document.querySelector('input[name="gradeLevel"]:checked')?.value;
        const selectedTopic = mathTopicSelect.value;
        const problemCount = parseInt(problemCountInput.value, 10);
        const inChallengeMode = challengeModeCheckbox.checked;
        const inSatPrepMode = satPrepModeCheckbox.checked;
        const difficulty = document.querySelector('input[name="difficulty"]:checked')?.value || 'medium';

        console.log('Generate Problems Clicked. Current settings:', { selectedGrade, selectedTopic, problemCount, inChallengeMode, inSatPrepMode, difficulty });

        if (!selectedTopic || selectedTopic === '') {
            problemsContainer.innerHTML = '<p style="color: red;">Please select a topic.</p>';
            printProblemsBtn.style.display = 'none';
            console.log('Error: No topic selected.');
            return;
        }
        if (isNaN(problemCount) || problemCount <= 0) {
            problemsContainer.innerHTML = '<p style="color: red;">Please enter a valid problem count (1-20).</p>';
            printProblemsBtn.style.display = 'none';
            console.log('Error: Invalid problem count.');
            return;
        }

        problemsContainer.innerHTML = '';
        generatedProblemsData = [];

        printProblemsBtn.style.display = 'block';

        const settings = {
            decimalPlaces: 2,
            polyMaxDegree: 4,
            polyMaxCoeff: 10,
            trigMaxCoeff: 5,
            trigFreqMax: 4,
            expLogMaxCoeff: 3,
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
                    if (inChallengeMode && challengeTopics[selectedGrade]) {
                        availableTopicsForMix = challengeTopics[selectedGrade];
                    } else {
                        availableTopicsForMix = topics[selectedGrade];
                    }
                }

                const actualSelectableTopics = availableTopicsForMix.filter(t =>
                    t.value !== 'mix_all_topics' &&
                    !t.text.includes('not yet implemented')
                );

                if (actualSelectableTopics.length === 0) {
                    problemData = { problem: `No specific topics available for mixing in this selection.`, answer: 'N/A', hint: 'N/A' };
                    console.warn('Mix of all topics selected, but no actual selectable topics found.');
                } else {
                    actualTopicToGenerate = actualSelectableTopics[getRandomInt(0, actualSelectableTopics.length - 1)].value;
                    console.log(`Mix mode: Generating problem for topic: ${actualTopicToGenerate}`);
                }
            } else {
                console.log(`Specific topic selected: ${actualTopicToGenerate}`);
            }


            try {
                if (inSatPrepMode) {
                    problemData = generateSatPrepProblem(actualTopicToGenerate, settings);
                } else if (inChallengeMode) {
                    switch (actualTopicToGenerate) {
                        case 'challenge_complex_algebra':
                            problemData = generateChallengeComplexAlgebra(settings);
                            break;
                        case 'challenge_advanced_number_theory':
                            problemData = generateChallengeAdvancedNumberTheory(settings);
                            break;
                        case 'challenge_advanced_geometry':
                            problemData = generateChallengeAdvancedGeometry(settings);
                            break;
                        case 'challenge_vector_basics':
                            problemData = generateChallengeVectorBasics(settings);
                            break;
                        case 'challenge_complex_functions':
                            problemData = generateChallengeComplexFunctions(settings);
                            break;
                        case 'challenge_advanced_trig_identities':
                            problemData = generateChallengeAdvancedTrigIdentities(settings);
                            break;
                        case 'challenge_optimization':
                            problemData = generateChallengeOptimization(settings);
                            break;
                        case 'challenge_advanced_derivatives':
                            problemData = generateChallengeAdvancedDerivatives(settings);
                            break;
                        case 'challenge_advanced_integrals':
                            problemData = generateChallengeAdvancedIntegrals(settings);
                            break;
                        case 'challenge_differential_equations':
                            problemData = generateChallengeDifferentialEquations(settings);
                            break;
                        default:
                            problemData = { problem: `Error: Unknown challenge topic '${actualTopicToGenerate}'`, answer: 'N/A', hint: 'N/A' };
                            console.error(`Unknown challenge topic: ${actualTopicToGenerate}`);
                    }
                } else {
                    switch (selectedGrade) { // This switch uses selectedGrade, not actualTopicToGenerate for dispatching
                        case 'grade6':
                            problemData = generateGrade6Problem(actualTopicToGenerate, settings);
                            break;
                        case 'grade7':
                            problemData = generateGrade7Problem(actualTopicToGenerate, settings);
                            break;
                        case 'grade8':
                            problemData = generateGrade8Problem(actualTopicToGenerate, settings);
                            break;
                        case 'grade9':
                            problemData = generateAlgebraProblem(actualTopicToGenerate, settings);
                            break;
                        case 'grade10':
                            problemData = generateGeometryProblem(actualTopicToGenerate, settings);
                            break;
                        case 'grade11':
                            problemData = generatePrecalcProblem(actualTopicToGenerate, settings);
                            break;
                        case 'grade12':
                            problemData = generateCalculusProblem(actualTopicToGenerate, settings);
                            break;
                        default:
                            problemData = { problem: `Error: No grade selected or unknown topic '${actualTopicToGenerate}' for grade ${selectedGrade}`, answer: 'N/A', hint: 'N/A' };
                            console.error(`Unknown standard topic for grade ${selectedGrade}: ${actualTopicToGenerate}`);
                    }
                }

                if (!problemData || !problemData.problem) {
                    problemData = { problem: `Failed to generate problem for topic ${actualTopicToGenerate}.`, answer: 'N/A', hint: 'N/A' };
                    console.error(`Problem data is incomplete or missing for topic: ${actualTopicToGenerate}`);
                }

            } catch (error) {
                console.error(`CRITICAL ERROR generating problem for topic ${actualTopicToGenerate}:`, error);
                problemData = { problem: `Error generating problem. (${error.message})`, answer: 'N/A', hint: 'N/A' };
            }

            const problemDiv = document.createElement('div');
            problemDiv.className = 'problem-item';
            problemDiv.innerHTML = `
                <div class="problem-text"><strong>Problem ${i + 1}:</strong> ${problemData.problem}</div>
                ${problemData.graphId ? `<div id="${problemData.graphId}" class="jxgbox" style="width:300px; height:300px;"></div>` : ''}
                <div class="solution-section">
                    <button class="solution-toggle" data-target="hint-${i}">Show Hint</button>
                    <button class="solution-toggle" data-target="solution-${i}">Show Solution</button>
                    ${problemData.graphFunction ? `<button class="solution-toggle graph-toggle" data-graph-target="${problemData.graphId}" data-graph-function="${btoa(JSON.stringify(problemData.graphFunction))}" style="margin-left: 10px;">Show Graph</button>` : ''}
                    <div id="hint-${i}" class="hint-content"><strong>Hint:</strong> ${problemData.hint}</div>
                    <div id="solution-${i}" class="solution-content"><strong>Solution:</strong> ${problemData.answer}</div>
                </div>
            `;
            problemsContainer.appendChild(problemDiv);

            generatedProblemsData.push({
                problem: `Problem ${i + 1}: ${problemData.problem}`,
                answer: `Solution: ${problemData.answer}`,
                hint: `Hint: ${problemData.hint}`
            });
        }

        if (window.MathJax) {
            window.MathJax.typesetPromise([problemsContainer]).then(() => {
                console.log('MathJax typesetting complete.');
                renderAllGraphs();
            }).catch((err) => {
                console.error('MathJax typesetting failed:', err);
            });
        } else {
             console.warn('MathJax not loaded, skipping typesetting.');
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

        document.querySelectorAll('.graph-toggle').forEach(button => {
            button.addEventListener('click', (event) => {
                const graphTargetId = event.target.dataset.graphTarget;
                const graphFuncData = JSON.parse(atob(event.target.dataset.graphFunction));
                renderGraph(graphTargetId, graphFuncData);
            });
        });
    });

    printProblemsBtn.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        let y = 20;
        const margin = 10;
        const lineHeight = 7;
        const problemIndent = 5;

        doc.setFontSize(16);
        doc.text("Titan Training - Math Practice Problems", doc.internal.pageSize.getWidth() / 2, y, { align: 'center' });
        y += 15;

        doc.setFontSize(10);

        generatedProblemsData.forEach((problemData, index) => {
            // PDF conversion: Remove MathJax delimiters and simplify LaTeX commands
            const problemText = problemData.problem
                .replace(/\\\((.*?)\\\)/g, '$1') // Inline math
                .replace(/\\\[(.*?)\\\]/g, '$1') // Display math
                .replace(/\\frac\{(.*?)\}\{(.*?)\}/g, '($1)/($2)') // Fractions
                .replace(/\\sqrt\{(.*?)\}/g, 'sqrt($1)') // Square roots
                .replace(/\\cdot/g, '*') // Dot product
                .replace(/\\times/g, '*') // Multiplication
                .replace(/\\div/g, '/') // Division
                .replace(/\\approx/g, '~')
                .replace(/\\ge/g, '>=')
                .replace(/\\le/g, '<=')
                .replace(/\\pm/g, '+/-')
                .replace(/\\infty/g, 'infinity')
                .replace(/\\alpha/g, 'alpha')
                .replace(/\\beta/g, 'beta')
                .replace(/\\phi/g, 'phi')
                .replace(/\\theta/g, 'theta')
                .replace(/\\sum/g, 'Sum')
                .replace(/\\int/g, 'Integral')
                .replace(/\\ln/g, 'ln')
                .replace(/\\sin/g, 'sin')
                .replace(/\\cos/g, 'cos')
                .replace(/\\tan/g, 'tan')
                .replace(/\\cot/g, 'cot')
                .replace(/\\text\{(.*?)\}/g, '$1') // Text within LaTeX
                .replace(/\\dots/g, '...')
                .replace(/\\\\/g, '\n') // Newline in LaTeX
                .replace(/\s*([+\-*\/=<>])\s*/g, ' $1 '); // Standardize spacing around operators

            const answerText = problemData.answer
                 .replace(/\\\((.*?)\\\)/g, '$1')
                .replace(/\\\[(.*?)\\\]/g, '$1')
                .replace(/\\frac\{(.*?)\}\{(.*?)\}/g, '($1)/($2)')
                .replace(/\\sqrt\{(.*?)\}/g, 'sqrt($1)')
                .replace(/\\cdot/g, '*')
                .replace(/\\times/g, '*')
                .replace(/\\div/g, '/')
                .replace(/\\approx/g, '~')
                .replace(/\\ge/g, '>=')
                .replace(/\\le/g, '<=')
                .replace(/\\pm/g, '+/-')
                .replace(/\\infty/g, 'infinity')
                .replace(/\\alpha/g, 'alpha')
                .replace(/\\beta/g, 'beta')
                .replace(/\\phi/g, 'phi')
                .replace(/\\theta/g, 'theta')
                .replace(/\\sum/g, 'Sum')
                .replace(/\\int/g, 'Integral')
                .replace(/\\ln/g, 'ln')
                .replace(/\\sin/g, 'sin')
                .replace(/\\cos/g, 'cos')
                .replace(/\\tan/g, 'tan')
                .replace(/\\cot/g, 'cot')
                .replace(/\\text\{(.*?)\}/g, '$1')
                .replace(/\\dots/g, '...')
                .replace(/\\\\/g, '\n')
                .replace(/\s*([+\-*\/=<>])\s*/g, ' $1 ');

            const hintText = problemData.hint
                 .replace(/\\\((.*?)\\\)/g, '$1')
                .replace(/\\\[(.*?)\\\]/g, '$1')
                .replace(/\\frac\{(.*?)\}\{(.*?)\}/g, '($1)/($2)')
                .replace(/\\sqrt\{(.*?)\}/g, 'sqrt($1)')
                .replace(/\\cdot/g, '*')
                .replace(/\\times/g, '*')
                .replace(/\\div/g, '/')
                .replace(/\\approx/g, '~')
                .replace(/\\ge/g, '>=')
                .replace(/\\le/g, '<=')
                .replace(/\\pm/g, '+/-')
                .replace(/\\infty/g, 'infinity')
                .replace(/\\alpha/g, 'alpha')
                .replace(/\\beta/g, 'beta')
                .replace(/\\phi/g, 'phi')
                .replace(/\\theta/g, 'theta')
                .replace(/\\sum/g, 'Sum')
                .replace(/\\int/g, 'Integral')
                .replace(/\\ln/g, 'ln')
                .replace(/\\sin/g, 'sin')
                .replace(/\\cos/g, 'cos')
                .replace(/\\tan/g, 'tan')
                .replace(/\\cot/g, 'cot')
                .replace(/\\text\{(.*?)\}/g, '$1')
                .replace(/\\dots/g, '...')
                .replace(/\\\\/g, '\n')
                .replace(/\s*([+\-*\/=<>])\s*/g, ' $1 ');

            if (y + (lineHeight * 3) + 20 > doc.internal.pageSize.getHeight() - margin) {
                doc.addPage();
                y = margin;
            }

            doc.setFontSize(10);
            const problemLines = doc.splitTextToSize(problemText, doc.internal.pageSize.getWidth() - 2 * margin);
            doc.text(problemLines, margin, y);
            y += (problemLines.length * lineHeight);

            doc.text(`Solution: _____________________________________________________`, margin + problemIndent, y + lineHeight);
            y += 2 * lineHeight;

            doc.text(`Hint: ${hintText}`, margin + problemIndent, y + lineHeight);
            y += 2 * lineHeight;

            doc.setDrawColor(200, 200, 200);
            doc.line(margin, y, doc.internal.pageSize.getWidth() - margin, y);
            y += 5;
        });

        doc.save('Titan_Training_Problems.pdf');
    });
});