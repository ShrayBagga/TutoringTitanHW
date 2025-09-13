// Helper functions

// Helper functions
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

export function formatAnswer(value, decimalPlaces) {
    if (typeof value === 'number') {
        return parseFloat(value.toFixed(decimalPlaces)).toString();
    }
    return value;
}

export function formatFraction(numerator, denominator) {
    if (denominator === 0) return 'Undefined';
    if (numerator % denominator === 0) {
        return (numerator / denominator).toString();
    }
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const commonDivisor = gcd(Math.abs(numerator), Math.abs(denominator));
    const simpNum = numerator / commonDivisor;
    const simpDen = denominator / commonDivisor;
    if (simpDen < 0) {
        return `\\frac{${-simpNum}}{${-simpDen}}`;
    }
    return `\\frac{${simpNum}}{${simpDen}}`;
}

export function formatPolynomial(terms) {
    let polyStr = '';
    if (terms.length === 0) {
        return '0';
    }

    for (let i = terms.length - 1; i >= 0; i--) {
        const coeff = terms[i];
        if (coeff === 0) {
            continue;
        }

        let termStr = '';
        const absCoeff = Math.abs(coeff);
        const sign = coeff > 0 ? '+' : '-';

        if (polyStr !== '' && coeff > 0) {
             polyStr += ` + `;
        } else if (coeff < 0) {
             polyStr += ` - `;
        }
        
        if (i === 0) {
            termStr = `${absCoeff}`;
        } else if (i === 1) {
            termStr = (absCoeff === 1) ? 'x' : `${absCoeff}x`;
        } else {
            termStr = (absCoeff === 1) ? `x^${i}` : `${absCoeff}x^${i}`;
        }

        polyStr += termStr;
    }
    
    if (polyStr.startsWith(' + ')) {
        polyStr = polyStr.substring(3);
    }
    return polyStr.trim() || '0';
}


// JSXGraph related functions
export const JXGBOARDS = {};

export function renderAllGraphs() {
    document.querySelectorAll('.jxgbox').forEach(box => {
        if (JXGBOARDS[box.id]) {
            JXGBOARDS[box.id] = null;
        }
        box.style.display = 'none'; // Hide all graph boxes initially
    });
}

export function renderGraph(graphId, graphFunctionData) {
    const graphBox = document.getElementById(graphId);
    if (!graphBox) {
        console.error(`Graph container with ID ${graphId} not found.`);
        return;
    }

    graphBox.style.display = 'block';

    const board = JXG.JSXGraph.initBoard(graphId, {
        boundingbox: graphFunctionData.boundingbox || [-10, 10, 10, -10],
        axis: true,
        showCopyright: false,
    });
    JXGBOARDS[graphId] = board;

    graphFunctionData.functions.forEach(func => {
        if (func.type === 'expression') {
            board.create('functiongraph', [func.expression], func.options || { strokeColor: 'blue', strokeWidth: 2 });
        } else if (func.type === 'point') {
            board.create('point', [func.x, func.y], func.options || { name: `(${func.x}, ${func.y})`, color: 'red', size: 3 });
        }
    });
}

// Problem generation dispatchers
export function generateGrade6Problem(topic, settings) {
    switch (topic) {
        case 'arithmetic_operations': return generateArithmeticOperations(settings);
        case 'fractions_decimals_percent': return generateFractionsDecimalsPercent(settings);
        case 'geometry_basic_shapes': return generateGeometryBasicShapes(settings);
        case 'ratios_proportions': return generateRatiosProportions(settings);
        default: return { problem: `Error: Unknown Grade 6 topic '${topic}'`, answer: 'N/A', hint: 'N/A' };
    }
}

export function generateGrade7Problem(topic, settings) {
    switch (topic) {
        case 'integers_rational_numbers': return generateIntegersRationalNumbers(settings);
        case 'expressions_equations_basic': return generateExpressionsEquationsBasic(settings);
        case 'angles_triangles': return generateAnglesTriangles(settings);
        case 'probability_simple': return generateProbabilitySimple(settings);
        default: return { problem: `Error: Unknown Grade 7 topic '${topic}'`, answer: 'N/A', hint: 'N/A' };
    }
}

export function generateGrade8Problem(topic, settings) {
    switch (topic) {
        case 'linear_equations_systems_basic': return generateLinearEquationsSystemsBasic(settings);
        case 'exponents_scientific_notation': return generateExponentsScientificNotation(settings);
        case 'pythagorean_theorem_basic': return generatePythagoreanTheoremBasic(settings);
        case 'functions_introduction': return generateFunctionsIntroduction(settings);
        default: return { problem: `Error: Unknown Grade 8 topic '${topic}'`, answer: 'N/A', hint: 'N/A' };
    }
}

export function generateAlgebraProblem(topic, settings) {
    switch (topic) {
        case 'algebra_linear_equations': return generateAlgebraLinearEquations(settings);
        case 'algebra_quadratic_equations': return generateAlgebraQuadraticEquations(settings);
        case 'algebra_polynomial_operations': return generateAlgebraPolynomialOperations(settings);
        case 'algebra_system_equations': return generateAlgebraSystemEquations(settings);
        default: return { problem: `Error: Unknown Algebra I topic '${topic}'`, answer: 'N/A', hint: 'N/A' };
    }
}

export function generateGeometryProblem(topic, settings) {
    switch (topic) {
        case 'geometry_area_perimeter': return generateGeometryAreaPerimeter(settings);
        case 'geometry_volume_surface_area': return generateGeometryVolumeSurfaceArea(settings);
        case 'geometry_pythagorean_theorem': return generatePythagoreanTheoremBasic(settings);
        case 'geometry_trigonometry_basics': return generateGeometryTrigonometryBasics(settings);
        default: return { problem: `Error: Unknown Geometry topic '${topic}'`, answer: 'N/A', hint: 'N/A' };
    }
}

export function generatePrecalcProblem(topic, settings) {
    switch (topic) {
        case 'precalc_functions_graphing': return generatePrecalcFunctionsGraphing(settings);
        case 'precalc_log_exp': return generatePrecalcLogExp(settings);
        case 'precalc_trig_equations': return generatePrecalcTrigEquations(settings);
        case 'precalc_sequences_series': return generatePrecalcSequencesSeries(settings);
        default: return { problem: `Error: Unknown Precalculus topic '${topic}'`, answer: 'N/A', hint: 'N/A' };
    }
}

export function generateCalculusProblem(topic, settings) {
    switch (topic) {
        case 'calculus_limits': return generateCalculusLimits(settings);
        case 'calculus_derivatives': return generateCalculusDerivatives(settings);
        case 'calculus_integrals': return generateCalculusIntegrals(settings);
        case 'calculus_applications': return generateCalculusApplications(settings);
        default: return { problem: `Error: Unknown Calculus topic '${topic}'`, answer: 'N/A', hint: 'N/A' };
    }
}

export function generateSatPrepProblem(topic, settings) {
    switch (topic) {
        case 'sat_linear_equations': return generateAlgebraLinearEquations(settings);
        case 'sat_quadratic_functions': return generateAlgebraQuadraticEquations(settings);
        case 'sat_polynomials': return generateAlgebraPolynomialOperations(settings);
        case 'sat_systems_equations': return generateAlgebraSystemEquations(settings);
        case 'sat_functions': return generatePrecalcFunctionsGraphing(settings);
        case 'sat_geometry_area_volume': return getRandomInt(0,1) === 0 ? generateGeometryAreaPerimeter(settings) : generateGeometryVolumeSurfaceArea(settings);
        case 'sat_trigonometry_basics': return generateGeometryTrigonometryBasics(settings);
        case 'sat_exponents_roots': return generateExponentsScientificNotation(settings);
        case 'sat_data_analysis': return generateSatDataAnalysis(settings);
        case 'sat_probability': return generateProbabilitySimple(settings);
        default: return { problem: `Error: Unknown SAT topic '${topic}'`, answer: 'N/A', hint: 'N/A' };
    }
}

// --- NEW/UPDATED: Challenge problem generation ---
export function generateChallengeComplexAlgebra(settings) {
    const type = getRandomInt(0, 2);
    let problem, answer, checkAnswer, hint;

    const a1 = getRandomInt(-5, 5);
    const b1 = getRandomInt(-5, 5);
    const a2 = getRandomInt(-5, 5);
    const b2 = getRandomInt(-5, 5);

    if (type === 0) { // Addition/Subtraction
        const op = getRandomInt(0, 1); // 0 for add, 1 for subtract
        const realPart = op === 0 ? a1 + a2 : a1 - a2;
        const imagPart = op === 0 ? b1 + b2 : b1 - b2;
        
        problem = `Simplify the expression: \\((${a1} ${b1 >= 0 ? '+' : '-'} ${Math.abs(b1)}i) ${op === 0 ? '+' : '-'} (${a2} ${b2 >= 0 ? '+' : '-'} ${Math.abs(b2)}i)\\).`;
        answer = `\\(${realPart} ${imagPart >= 0 ? '+' : '-'} ${Math.abs(imagPart)}i\\)`;
        checkAnswer = `${realPart} ${imagPart >= 0 ? '+' : '-'} ${Math.abs(imagPart)}i`.replace(/\s/g, '');
        hint = "Combine the real parts and the imaginary parts separately.";
    } else if (type === 1) { // Multiplication
        const realPart = a1 * a2 - b1 * b2;
        const imagPart = a1 * b2 + a2 * b1;
        problem = `Simplify the expression: \\((${a1} ${b1 >= 0 ? '+' : '-'} ${Math.abs(b1)}i) \\cdot (${a2} ${b2 >= 0 ? '+' : '-'} ${Math.abs(b2)}i)\\).`;
        answer = `\\(${realPart} ${imagPart >= 0 ? '+' : '-'} ${Math.abs(imagPart)}i\\)`;
        checkAnswer = `${realPart} ${imagPart >= 0 ? '+' : '-'} ${Math.abs(imagPart)}i`.replace(/\s/g, '');
        hint = "Use the FOIL method and remember that \\(i^2 = -1\\).";
    } else { // Division
         if (a2 === 0 && b2 === 0) return generateChallengeComplexAlgebra(settings);
         const denominator = a2 * a2 + b2 * b2;
         const realPartNum = a1 * a2 + b1 * b2;
         const imagPartNum = b1 * a2 - a1 * b2;
         
         problem = `Simplify the expression: \\(\\frac{${a1} ${b1 >= 0 ? '+' : '-'} ${Math.abs(b1)}i}{${a2} ${b2 >= 0 ? '+' : '-'} ${Math.abs(b2)}i}\\).`;
         answer = `\\(${formatFraction(realPartNum, denominator)} ${imagPartNum >= 0 ? '+' : '-'} ${formatFraction(Math.abs(imagPartNum), denominator)}i\\)`;
         checkAnswer = `${realPartNum/denominator} ${imagPartNum >= 0 ? '+' : '-'} ${Math.abs(imagPartNum)/denominator}i`.replace(/\s/g, '');
         hint = "Multiply the numerator and denominator by the conjugate of the denominator.";
    }
    return { problem, answer, checkAnswer, hint };
}

export function generateChallengeAdvancedNumberTheory(settings) {
    return { problem: "Challenge: Advanced Number Theory (not yet implemented)", answer: "N/A", checkAnswer: "N/A", hint: "N/A" };
}
// ... other challenge functions remain the same ...
// NOTE: I will omit the rest of the challenge functions for brevity, but they would remain in your actual file.

// --- Individual problem generation functions (examples with checkAnswer) ---

function generateArithmeticOperations(settings) {
    const type = getRandomInt(0, 3);
    let num1 = getRandomInt(1, 100);
    let num2 = getRandomInt(1, 100);
    let problem, answer, checkAnswer, hint;

    switch (type) {
        case 0:
            problem = `What is \\(${num1} + ${num2}\\)?`;
            checkAnswer = (num1 + num2).toString();
            answer = `\\(${checkAnswer}\\)`;
            hint = "Add the two numbers together.";
            break;
        case 1:
            if (num1 < num2) [num1, num2] = [num2, num1];
            problem = `What is \\(${num1} - ${num2}\\)?`;
            checkAnswer = (num1 - num2).toString();
            answer = `\\(${checkAnswer}\\)`;
            hint = "Subtract the second number from the first.";
            break;
        case 2:
            num1 = getRandomInt(1, 12);
            num2 = getRandomInt(1, 12);
            problem = `What is \\(${num1} \\times ${num2}\\)?`;
            checkAnswer = (num1 * num2).toString();
            answer = `\\(${checkAnswer}\\)`;
            hint = "Multiply the two numbers.";
            break;
        case 3:
            num2 = getRandomInt(1, 10);
            num1 = num2 * getRandomInt(2, 12);
            problem = `What is \\(${num1} \\div ${num2}\\)?`;
            checkAnswer = (num1 / num2).toString();
            answer = `\\(${checkAnswer}\\)`;
            hint = "Divide the first number by the second.";
            break;
    }
    return { problem, answer, checkAnswer, hint };
}

function generateExpressionsEquationsBasic(settings) {
    // ... (rest of the file remains the same)
    // For brevity, I'll only show the changed function and the first few standard ones.
    // In your project, you would keep the entire contents of the original file
    // and just apply the changes shown.
    const type = getRandomInt(0, 2);
    let problem, answer, checkAnswer, hint;

    switch (type) {
        case 0:
            const coeff1 = getRandomInt(2, 10);
            const const1 = getRandomInt(1, 15);
            const coeff2 = getRandomInt(2, 10);
            const const2 = getRandomInt(1, 15);
            problem = `Simplify the expression: \\(${coeff1}x + ${const1} + ${coeff2}x - ${const2}\\).`;
            checkAnswer = `${coeff1 + coeff2}x+${const1 - const2}`.replace('+-', '-');
            answer = `\\(${coeff1 + coeff2}x + ${const1 - const2}\\)`;
            hint = "Combine like terms (terms with 'x' and constant terms separately).";
            break;
        case 1:
            const xVal = getRandomInt(1, 20);
            const eqNum = getRandomInt(2, 10);
            const result = xVal + eqNum;
            problem = `Solve for \\(x\\): \\(x + ${eqNum} = ${result}\\).`;
            checkAnswer = xVal.toString();
            answer = `\\(x = ${xVal}\\)`;
            hint = "Use the inverse operation to isolate \\(x\\).";
            break;
        case 2:
            const evalCoeff = getRandomInt(2, 7);
            const evalConst = getRandomInt(1, 10);
            const evalX = getRandomInt(-5, 5);
            problem = `Evaluate the expression \\(${evalCoeff}x + ${evalConst}\\) when \\(x = ${evalX}\\).`;
            checkAnswer = (evalCoeff * evalX + evalConst).toString();
            answer = `\\(${checkAnswer}\\)`;
            hint = "Substitute the given value of \\(x\\) into the expression and simplify.";
            break;
    }
    return { problem, answer, checkAnswer, hint };
}

// ... All other problem generation functions from your original file would follow here ...
// Make sure to copy the rest of your original problems.js file content below this point.

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

export function formatAnswer(value, decimalPlaces) {
    if (typeof value === 'number') {
        return parseFloat(value.toFixed(decimalPlaces)).toString();
    }
    return value;
}

export function formatFraction(numerator, denominator) {
    if (denominator === 0) return 'Undefined';
    if (numerator % denominator === 0) {
        return (numerator / denominator).toString();
    }
    return `\\frac{${numerator}}{${denominator}}`;
}

export function formatPolynomial(terms) {
    let polyStr = '';
    if (terms.length === 0) {
        return '0';
    }

    for (let i = terms.length - 1; i >= 0; i--) {
        const coeff = terms[i];
        if (coeff === 0) {
            continue;
        }

        let termStr = '';
        const absCoeff = Math.abs(coeff);
        const sign = coeff >= 0 ? '+' : '-';

        if (i === 0) {
            termStr = `${absCoeff}`;
        } else if (i === 1) {
            termStr = (absCoeff === 1) ? 'x' : `${absCoeff}x`;
        } else {
            termStr = (absCoeff === 1) ? `x^${i}` : `${absCoeff}x^${i}`;
        }

        if (polyStr === '') {
            if (coeff < 0) {
                polyStr += '-';
            }
            polyStr += termStr;
        } else {
            polyStr += ` ${sign} ${termStr}`;
        }
    }

    if (polyStr === '') {
        return '0';
    }

    polyStr = polyStr.replace(/\s*\+\s*\-\s*/g, ' - ');
    polyStr = polyStr.replace(/\s*\-\s*\+\s*/g, ' - ');
    polyStr = polyStr.replace(/^\+\s*/, '');

    return polyStr.trim();
}

// JSXGraph related functions
export const JXGBOARDS = {};

export function renderAllGraphs() {
    document.querySelectorAll('.jxgbox').forEach(box => {
        if (JXGBOARDS[box.id]) {
            JXGBOARDS[box.id].clear();
            JXGBOARDS[box.id] = null;
        }
        box.style.display = 'none';
    });
}

export function renderGraph(graphId, graphFunctionData) {
    const graphBox = document.getElementById(graphId);
    if (!graphBox) {
        console.error(`Graph container with ID ${graphId} not found.`);
        return;
    }

    graphBox.style.display = 'block';

    if (JXGBOARDS[graphId]) {
        JXGBOARDS[graphId].clear();
    }

    const board = JXG.JSXGraph.initBoard(graphId, {
        boundingbox: graphFunctionData.boundingbox || [-10, 10, 10, -10],
        axis: true,
        showCopyright: false,
        showNavigation: true,
        pan: { enabled: true, showNavigation: false },
        zoom: { enabled: true, showNavigation: false }
    });
    JXGBOARDS[graphId] = board;

    graphFunctionData.functions.forEach(func => {
        if (func.type === 'expression') {
            board.create('functiongraph', [func.expression], func.options || { strokeColor: 'blue', strokeWidth: 2 });
        } else if (func.type === 'point') {
            board.create('point', [func.x, func.y], func.options || { name: `(${func.x}, ${func.y})`, color: 'red', size: 3 });
        } else if (func.type === 'line') {
             board.create('line', [func.point1, func.point2], func.options || { strokeColor: 'purple', strokeWidth: 2 });
        }
    });

    if (graphFunctionData.labels) {
        graphFunctionData.labels.forEach(label => {
            board.create('text', [label.x, label.y, label.text], label.options || { color: 'black' });
        });
    }
}

// Problem generation dispatchers (these functions decide which specific problem to generate based on topic)
export function generateGrade6Problem(topic, settings) {
    switch (topic) {
        case 'arithmetic_operations': return generateArithmeticOperations(settings);
        case 'fractions_decimals_percent': return generateFractionsDecimalsPercent(settings);
        case 'geometry_basic_shapes': return generateGeometryBasicShapes(settings);
        case 'ratios_proportions': return generateRatiosProportions(settings);
        default: return { problem: `Error: Unknown Grade 6 topic '${topic}'`, answer: 'N/A', hint: 'N/A' };
    }
}

export function generateGrade7Problem(topic, settings) {
    switch (topic) {
        case 'integers_rational_numbers': return generateIntegersRationalNumbers(settings);
        case 'expressions_equations_basic': return generateExpressionsEquationsBasic(settings);
        case 'angles_triangles': return generateAnglesTriangles(settings);
        case 'probability_simple': return generateProbabilitySimple(settings);
        default: return { problem: `Error: Unknown Grade 7 topic '${topic}'`, answer: 'N/A', hint: 'N/A' };
    }
}

export function generateGrade8Problem(topic, settings) {
    switch (topic) {
        case 'linear_equations_systems_basic': return generateLinearEquationsSystemsBasic(settings);
        case 'exponents_scientific_notation': return generateExponentsScientificNotation(settings);
        case 'pythagorean_theorem_basic': return generatePythagoreanTheoremBasic(settings);
        case 'functions_introduction': return generateFunctionsIntroduction(settings);
        default: return { problem: `Error: Unknown Grade 8 topic '${topic}'`, answer: 'N/A', hint: 'N/A' };
    }
}

export function generateAlgebraProblem(topic, settings) {
    switch (topic) {
        case 'algebra_linear_equations': return generateAlgebraLinearEquations(settings);
        case 'algebra_quadratic_equations': return generateAlgebraQuadraticEquations(settings);
        case 'algebra_polynomial_operations': return generateAlgebraPolynomialOperations(settings);
        case 'algebra_system_equations': return generateAlgebraSystemEquations(settings);
        default: return { problem: `Error: Unknown Algebra I topic '${topic}'`, answer: 'N/A', hint: 'N/A' };
    }
}

export function generateGeometryProblem(topic, settings) {
    switch (topic) {
        case 'geometry_area_perimeter': return generateGeometryAreaPerimeter(settings);
        case 'geometry_volume_surface_area': return generateGeometryVolumeSurfaceArea(settings);
        case 'geometry_pythagorean_theorem': return generatePythagoreanTheoremBasic(settings); // Reusing basic for now
        case 'geometry_trigonometry_basics': return generateGeometryTrigonometryBasics(settings);
        default: return { problem: `Error: Unknown Geometry topic '${topic}'`, answer: 'N/A', hint: 'N/A' };
    }
}

export function generatePrecalcProblem(topic, settings) {
    switch (topic) {
        case 'precalc_functions_graphing': return generatePrecalcFunctionsGraphing(settings);
        case 'precalc_log_exp': return generatePrecalcLogExp(settings);
        case 'precalc_trig_equations': return generatePrecalcTrigEquations(settings);
        case 'precalc_sequences_series': return generatePrecalcSequencesSeries(settings);
        default: return { problem: `Error: Unknown Precalculus topic '${topic}'`, answer: 'N/A', hint: 'N/A' };
    }
}

export function generateCalculusProblem(topic, settings) {
    switch (topic) {
        case 'calculus_limits': return generateCalculusLimits(settings);
        case 'calculus_derivatives': return generateCalculusDerivatives(settings);
        case 'calculus_integrals': return generateCalculusIntegrals(settings);
        case 'calculus_applications': return generateCalculusApplications(settings);
        default: return { problem: `Error: Unknown Calculus topic '${topic}'`, answer: 'N/A', hint: 'N/A' };
    }
}

export function generateSatPrepProblem(topic, settings) {
    switch (topic) {
        case 'sat_linear_equations': return generateAlgebraLinearEquations(settings);
        case 'sat_quadratic_functions': return generateAlgebraQuadraticEquations(settings);
        case 'sat_polynomials': return generateAlgebraPolynomialOperations(settings);
        case 'sat_systems_equations': return generateAlgebraSystemEquations(settings);
        case 'sat_functions': return generatePrecalcFunctionsGraphing(settings);
        case 'sat_geometry_area_volume': return getRandomInt(0,1) === 0 ? generateGeometryAreaPerimeter(settings) : generateGeometryVolumeSurfaceArea(settings);
        case 'sat_trigonometry_basics': return generateGeometryTrigonometryBasics(settings);
        case 'sat_exponents_roots': return generateExponentsScientificNotation(settings);
        case 'sat_data_analysis': return generateSatDataAnalysis(settings); // NEW: Specific SAT
        case 'sat_probability': return generateProbabilitySimple(settings);
        default: return { problem: `Error: Unknown SAT topic '${topic}'`, answer: 'N/A', hint: 'N/A' };
    }
}

// Challenge problem generation dispatchers
export function generateChallengeComplexAlgebra(settings) {
    // Implement specific complex algebra problems here
    return { problem: "Challenge: Complex Algebra problem (not yet implemented)", answer: "N/A", hint: "N/A" };
}

export function generateChallengeAdvancedNumberTheory(settings) {
    // Implement specific advanced number theory problems here
    return { problem: "Challenge: Advanced Number Theory problem (not yet implemented)", answer: "N/A", hint: "N/A" };
}

export function generateChallengeAdvancedGeometry(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint;

    if (type === 0) {
        const radius = getRandomInt(5, 10);
        const angleDeg = getRandomInt(30, 90);
        const angleRad = angleDeg * Math.PI / 180;
        const areaSector = 0.5 * radius * radius * angleRad;
        const areaTriangle = 0.5 * radius * radius * Math.sin(angleRad);
        const areaSegment = areaSector - areaTriangle;
        problem = `A circle has a radius of \\(${radius}\\) cm. A sector of this circle has a central angle of \\(${angleDeg}^\\circ\\). Find the area of the circular segment formed by this sector (round to ${settings.decimalPlaces} decimal places).`;
        answer = `${formatAnswer(areaSegment, settings.decimalPlaces)} \\(\\text{ cm}^2\\)`;
        hint = "Area of segment = Area of sector - Area of triangle. Area of sector = \\(\\frac{1}{2}r^2\\theta\\) (radians). Area of triangle = \\(\\frac{1}{2}ab\\sin(C)\\).";
    } else if (type === 1) {
        const R1 = getRandomInt(4, 8);
        const R2 = getRandomInt(1, R1 - 1);
        const H = getRandomInt(5, 10);
        const frustumVolume = (1/3) * Math.PI * H * (R1 * R1 + R1 * R2 + R2 * R2);
        problem = `Find the volume of a frustum of a cone with a top radius of \\(${R2}\\) cm, a bottom radius of \\(${R1}\\) cm, and a height of \\(${H}\\) cm (round to ${settings.decimalPlaces} decimal places).`;
        answer = `${formatAnswer(frustumVolume, settings.decimalPlaces)} \\(\\text{ cm}^3\\)`;
        hint = "Volume of frustum = \\(\\frac{1}{3}\\pi H(R_1^2 + R_1R_2 + R_2^2)\\).";
    } else if (type === 2) {
        const R1_sa = getRandomInt(4, 8);
        const R2_sa = getRandomInt(1, R1_sa - 1);
        const H_sa = getRandomInt(5, 10);
        const slantHeight = Math.sqrt(H_sa * H_sa + (R1_sa - R2_sa) * (R1_sa - R2_sa));
        const frustumSA = Math.PI * (R1_sa * R1_sa + R2_sa * R2_sa + (R1_sa + R2_sa) * slantHeight);
        problem = `Find the surface area of a frustum of a cone with a top radius of \\(${R2_sa}\\) cm, a bottom radius of \\(${R1_sa}\\) cm, and a height of \\(${H_sa}\\) cm (round to ${settings.decimalPlaces} decimal places).`;
        answer = `${formatAnswer(frustumSA, settings.decimalPlaces)} \\(\\text{ cm}^2\\)`;
        hint = "Surface area of frustum = \\(\\pi (R_1^2 + R_2^2 + (R_1+R_2)l)\\), where \\(l\\) is the slant height.";
    } else if (type === 3) {
        const propType = getRandomInt(0, 1);
        if (propType === 0) {
            const radius = getRandomInt(3, 8);
            const distToCenter = getRandomInt(radius + 2, radius + 10);
            const tangentLength = Math.sqrt(distToCenter * distToCenter - radius * radius);
            if (tangentLength !== Math.floor(tangentLength)) return generateChallengeAdvancedGeometry(settings);
            problem = `A tangent segment is drawn from an external point \\(${distToCenter}\\) units away from the center of a circle with radius \\(${radius}\\) units. Find the length of the tangent segment.`;
            answer = `${tangentLength}`;
            hint = "The tangent to a circle is perpendicular to the radius at the point of tangency. Use the Pythagorean theorem.";
        } else {
            const a = getRandomInt(2, 8);
            const b = getRandomInt(2, 8);
            const c = getRandomInt(2, 8);
            const d = (a * b) / c;
            if (d !== Math.floor(d)) return generateChallengeAdvancedGeometry(settings);
            problem = `Two chords intersect inside a circle. The segments of one chord are \\(${a}\\) and \\(${b}\\). The segments of the other chord are \\(${c}\\) and \\(x\\). Find \\(x\\).`;
            answer = `${d}`;
            hint = "Use the intersecting chords theorem: \\(a \\cdot b = c \\cdot d\\).";
        }
    } else {
        const outerSquareSide = getRandomInt(10, 20);
        const innerCircleRadius = getRandomInt(2, Math.floor(outerSquareSide / 2) - 1);
        const areaSquare = outerSquareSide * outerSquareSide;
        const areaCircle = Math.PI * innerCircleRadius * innerCircleRadius;
        const prob = areaCircle / areaSquare;
        problem = `A dart is thrown randomly at a square target with side length \\(${outerSquareSide}\\) inches. Inside the square is a circle with radius \\(${innerCircleRadius}\\) inches, centered in the square. What is the probability that the dart lands inside the circle? (Round to ${settings.decimalPlaces} decimal places)`;
        answer = `${formatAnswer(prob, settings.decimalPlaces)}`;
        hint = "Geometric probability = (Favorable Area) / (Total Area).";
    }
    return { problem, answer: `\\(${answer}\\)`, hint };
}

export function generateChallengeVectorBasics(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint;

    const vecA = [getRandomInt(-5, 5), getRandomInt(-5, 5)];
    const vecB = [getRandomInt(-5, 5), getRandomInt(-5, 5)];

    if (type === 0) {
        const dotProd = vecA[0] * vecB[0] + vecA[1] * vecB[1];
        problem = `Find the dot product of vectors \\(\\vec{u} = \\left<${vecA[0]}, ${vecA[1]}\\right>\\) and \\(\\vec{v} = \\left<${vecB[0]}, ${vecB[1]}\\right>\\).`;
        answer = `${dotProd}`;
        hint = "The dot product of \\(\\left<u_1, u_2\\right>\\) and \\(\\left<v_1, v_2\\right>\\) is \\(u_1v_1 + u_2v_2\\).";
    } else if (type === 1) {
        const mag = Math.sqrt(vecA[0] * vecA[0] + vecA[1] * vecA[1]);
        problem = `Find the magnitude of the vector \\(\\vec{u} = \\left<${vecA[0]}, ${vecA[1]}\\right>\\) (round to ${settings.decimalPlaces} decimal places).`;
        answer = `${formatAnswer(mag, settings.decimalPlaces)}`;
        hint = "The magnitude of a vector \\(\\left<x, y\\right>\\) is \\(\\sqrt{x^2 + y^2}\\).";
    } else if (type === 2) {
        const op = getRandomInt(0, 1);
        let resultVec;
        let opSymbol;
        if (op === 0) {
            resultVec = [vecA[0] + vecB[0], vecA[1] + vecB[1]];
            opSymbol = '+';
        } else {
            resultVec = [vecA[0] - vecB[0], vecA[1] - vecB[1]];
            opSymbol = '-';
        }
        problem = `Given \\(\\vec{u} = \\left<${vecA[0]}, ${vecA[1]}\\right>\\) and \\(\\vec{v} = \\left<${vecB[0]}, ${vecB[1]}\\right>\\), find \\(\\vec{u} ${opSymbol} \\vec{v}\\).`;
        answer = `\\left<${resultVec[0]}, ${resultVec[1]}\\right>`;
        hint = "To add or subtract vectors, add or subtract their corresponding components.";
    } else if (type === 3) {
        const scalar = getRandomInt(-3, 3);
        if (scalar === 0) return generateChallengeVectorBasics(settings);
        const resultVec = [scalar * vecA[0], scalar * vecA[1]];
        problem = `Given \\(\\vec{u} = \\left<${vecA[0]}, ${vecA[1]}\\right>\\), find \\(${scalar}\\vec{u}\\).`;
        answer = `\\left<${resultVec[0]}, ${resultVec[1]}\\right>`;
        hint = "To multiply a vector by a scalar, multiply each component of the vector by the scalar.";
    } else {
        const dotProd = vecA[0] * vecB[0] + vecA[1] * vecB[1];
        const magA = Math.sqrt(vecA[0] * vecA[0] + vecA[1] * vecA[1]);
        const magB = Math.sqrt(vecB[0] * vecB[0] + vecB[1] * vecB[1]);
        if (magA === 0 || magB === 0) return generateChallengeVectorBasics(settings);
        const cosTheta = dotProd / (magA * magB);
        const angleDeg = Math.acos(Math.max(-1, Math.min(1, cosTheta))) * 180 / Math.PI;
        problem = `Find the angle between vectors \\(\\vec{u} = \\left<${vecA[0]}, ${vecA[1]}\\right>\\) and \\(\\vec{v} = \\left<${vecB[0]}, ${vecB[1]}\\right>\\) to the nearest degree.`;
        answer = `${Math.round(angleDeg)}^\\circ`;
        hint = "Use the formula \\(\\cos(\\theta) = \\frac{\\vec{u} \\cdot \\vec{v}}{|\\vec{u}||\\vec{v}|}\\).";
    }
    return { problem, answer: `\\(${answer}\\)`, hint };
}

export function generateChallengeComplexFunctions(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint, graphId, graphFunction;

    if (type === 0) {
        const f_m = getRandomInt(2, 5);
        const f_b = getRandomInt(1, 5);
        const g_m = getRandomInt(2, 5);
        const g_b = getRandomInt(1, 5);
        const comp_m = f_m * g_m;
        const comp_b = f_m * g_b + f_b;
        problem = `Given \\(f(x) = ${f_m}x + ${f_b}\\) and \\(g(x) = ${g_m}x + ${g_b}\\), find \\(f(g(x))\\).`;
        answer = `${comp_m}x + ${comp_b}`;
        hint = "Substitute \\(g(x)\\) into \\(f(x)\\).";
    } else if (type === 1) {
        const transformType = getRandomInt(0, 2);
        const parentFunc = 'x^2';
        let transformedFunc, description;

        if (transformType === 0) {
            const k = getRandomInt(-5, 5);
            transformedFunc = `(x)^2 ${k >= 0 ? '+' : '-'} ${Math.abs(k)}`;
            description = `a vertical shift of \\(${Math.abs(k)}\\) units ${k > 0 ? 'up' : 'down'}`;
        } else if (transformType === 1) {
            const h = getRandomInt(-5, 5);
            if (h > 0) {
                transformedFunc = `(x - ${h})^2`;
            } else if (h < 0) {
                transformedFunc = `(x + ${Math.abs(h)})^2`;
            } else {
                transformedFunc = `x^2`;
            }
            description = `a horizontal shift of \\(${Math.abs(h)}\\) units to the ${h > 0 ? 'right' : 'left'}`;
        } else {
            const a = parseFloat(getRandomArbitrary(0.5, 3).toFixed(1));
            transformedFunc = `${a}x^2`;
            description = `a vertical ${a > 1 ? 'stretch' : 'shrink'} by a factor of \\(${a}\\)`;
        }

        problem = `Describe the transformation from the parent function \\(f(x) = x^2\\) to \\(g(x) = ${transformedFunc}\\).`;
        answer = description;
        hint = "Recall how adding/subtracting constants or multiplying by constants affects the graph of a function (outside vs. inside the parentheses).";
    } else if (type === 2) {
        const aComp = getRandomInt(1, 5);
        problem = `Find the domain of the composite function \\(f(g(x))\\) if \\(f(x) = \\sqrt{x}\\) and \\(g(x) = x - ${aComp}\\).`;
        answer = `x \\ge ${aComp}`;
        hint = "The domain of a composite function \\(f(g(x))\\) requires that \\(x\\) is in the domain of \\(g\\) and \\(g(x)\\) is in the domain of \\(f\\). For square roots, the expression under the radical must be non-negative.";
    } else if (type === 3) {
        const cubeCoeff = getRandomInt(1, 3);
        const cubeConst = getRandomInt(1, 5);
        problem = `Find the inverse function \\(f^{-1}(x)\\) for \\(f(x) = (${cubeCoeff}x + ${cubeConst})^3\\).`;
        answer = `f^{-1}(x) = \\frac{\\sqrt[3]{x} - ${cubeConst}}{${cubeCoeff}}`;
        hint = "Replace \\(f(x)\\) with \\(y\\), swap \\(x\\) and \\(y\\), then solve for \\(y\\). Remember to take the cube root.";
    } else {
        const aTransform = getRandomInt(-2, 2);
        if (aTransform === 0) return generateChallengeComplexFunctions(settings);
        const hTransform = getRandomInt(-3, 3);
        const kTransform = getRandomInt(-3, 3);
        const parent = 'x^2';
        let transformed = `${aTransform === 1 ? '' : aTransform}`;
        if (hTransform > 0) {
            transformed += `(x - ${hTransform})^2`;
        } else if (hTransform < 0) {
            transformed += `(x + ${Math.abs(hTransform)})^2`;
        } else {
            transformed += `x^2`;
        }
        if (kTransform !== 0) {
            transformed += ` ${kTransform > 0 ? '+' : '-'} ${Math.abs(kTransform)}`;
        }

        problem = `Describe the transformations from \\(f(x) = x^2\\) to \\(g(x) = ${transformed}\\).`;
        answer = `Vertical ${aTransform > 0 ? (Math.abs(aTransform) > 1 ? 'stretch' : 'shrink') : 'reflection and ' + (Math.abs(aTransform) > 1 ? 'stretch' : 'shrink')} by factor of \\(${Math.abs(aTransform)}\\), horizontal shift ${Math.abs(hTransform)} units to the ${hTransform > 0 ? 'right' : 'left'}, vertical shift ${Math.abs(kTransform)} units ${kTransform > 0 ? 'up' : 'down'}.`;
        hint = "Analyze the effect of each constant: \\(a\\) (vertical stretch/shrink/reflection), \\(h\\) (horizontal shift), and \\(k\\) (vertical shift).";
    }
    return { problem, answer: `\\(${answer}\\)`, hint };
}

export function generateChallengeAdvancedTrigIdentities(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint;

    if (type === 0) {
        const trigFn = ['\\sin', '\\cos', '\\tan'][getRandomInt(0, 2)];
        let identityQuestion, identityAnswer, identityHint;
        if (trigFn === '\\sin') {
            identityQuestion = `Expand using a double angle identity: \\(\\sin(2x)\\).`;
            identityAnswer = `2\\sin(x)\\cos(x)`;
            identityHint = "Recall the double angle identity for sine.";
        } else if (trigFn === '\\cos') {
            identityQuestion = `Expand using a double angle identity: \\(\\cos(2x)\\).`;
            const form = getRandomInt(0, 2);
            if (form === 0) identityAnswer = `\\cos^2(x) - \\sin^2(x)`;
            else if (form === 1) identityAnswer = `2\\cos^2(x) - 1`;
            else identityAnswer = `1 - 2\\sin^2(x)`;
            identityHint = "Recall the double angle identity for cosine. There are three common forms.";
        } else {
            identityQuestion = `Expand using a double angle identity: \\(\\tan(2x)\\).`;
            identityAnswer = `\\frac{2\\tan(x)}{1 - \\tan^2(x)}`;
            identityHint = "Recall the double angle identity for tangent.";
        }
        problem = identityQuestion;
        answer = `\\(${identityAnswer}\\)`;
        hint = identityHint;
    } else if (type === 1) {
        const trigFn = ['\\sin', '\\cos'][getRandomInt(0, 1)];
        const angleA = ['\\alpha', '\\theta'][getRandomInt(0, 1)];
        const angleB = ['\\beta', '\\phi'][getRandomInt(0, 1)];
        if (angleA === angleB) return generateChallengeAdvancedTrigIdentities(settings);
        const op = getRandomInt(0, 1);
        let problemExp, answerExp, hintExp;

        if (trigFn === '\\sin') {
            problemExp = `Expand using a sum/difference identity: \\(${trigFn}(${angleA} ${op === 0 ? '+' : '-'} ${angleB})\\).`;
            answerExp = `\\sin(${angleA})\\cos(${angleB}) ${op === 0 ? '+' : '-'} \\cos(${angleA})\\sin(${angleB})`;
            hintExp = "Recall the sum/difference identity for sine: sin(A ± B) = sin A cos B ± cos A sin B.";
        } else {
            problemExp = `Expand using a sum/difference identity: \\(${trigFn}(${angleA} ${op === 0 ? '+' : '-'} ${angleB})\\).`;
            answerExp = `\\cos(${angleA})\\cos(${angleB}) ${op === 0 ? '-' : '+'} \\sin(${angleA})\\sin(${angleB})`;
            hintExp = "Recall the sum/difference identity for cosine: cos(A ± B) = cos A cos B ∓ sin A sin B.";
        }
        problem = problemExp;
        answer = `\\(${answerExp}\\)`;
        hint = hintExp;
    } else if (type === 2) {
        const halfAngleFunc = ['\\sin', '\\cos'][getRandomInt(0, 1)];
        let halfAngleProblem, halfAngleAnswer, halfAngleHint;
        if (halfAngleFunc === '\\sin') {
            halfAngleProblem = `Write the half-angle identity for \\(\\sin(\\frac{x}{2})\\).`;
            halfAngleAnswer = `\\pm\\sqrt{\\frac{1 - \\cos(x)}{2}}`;
            halfAngleHint = "Recall the half-angle identity for sine. The sign depends on the quadrant of \\(\\frac{x}{2}\\).";
        } else {
            halfAngleProblem = `Write the half-angle identity for \\(\\cos(\\frac{x}{2})\\).`;
            halfAngleAnswer = `\\pm\\sqrt{\\frac{1 + \\cos(x)}{2}}`;
            halfAngleHint = "Recall the half-angle identity for cosine. The sign depends on the quadrant of \\(\\frac{x}{2}\\).";
        }
        problem = halfAngleProblem;
        answer = `\\(${halfAngleAnswer}\\)`;
        hint = halfAngleHint;
    } else if (type === 3) {
        const prodToSumFunc = getRandomInt(0, 1);
        const angleX = ['A', 'x'][getRandomInt(0, 1)];
        const angleY = ['B', 'y'][getRandomInt(0, 1)];
        if (angleX === angleY) return generateChallengeAdvancedTrigIdentities(settings);
        let prodToSumProblem, prodToSumAnswer, prodToSumHint;

        if (prodToSumFunc === 0) {
            prodToSumProblem = `Rewrite the product as a sum: \\(\\sin(${angleX})\\cos(${angleY})\\).`;
            prodToSumAnswer = `\\frac{1}{2}[\\sin(${angleX} + ${angleY}) + \\sin(${angleX} - ${angleY})]`;
            prodToSumHint = "Use the product-to-sum identity: \\(\\sin A \\cos B = \\frac{1}{2}[\\sin(A+B) + \\sin(A-B)]\\).";
        } else {
            prodToSumProblem = `Rewrite the product as a sum: \\(\\cos(${angleX})\\cos(${angleY})\\).`;
            prodToSumAnswer = `\\frac{1}{2}[\\cos(${angleX} + ${angleY}) + \\cos(${angleX} - ${angleY})]`;
            prodToSumHint = "Use the product-to-sum identity: \\(\\cos A \\cos B = \\frac{1}{2}[\\cos(A+B) + \\cos(A-B)]\\).";
        }
        problem = prodToSumProblem;
        answer = `\\(${prodToSumAnswer}\\)`;
        hint = prodToSumHint;
    } else {
        const complexTrigType = getRandomInt(0, 0);
        if (complexTrigType === 0) {
            problem = `Solve for \\(x\\) in the interval \\([0, 2\\pi]\\): \\(2\\sin^2(x) + \\sin(x) - 1 = 0\\).`;
            answer = `x = \\frac{\\pi}{6}, \\frac{5\\pi}{6}, \\frac{3\\pi}{2}`;
            hint = "Treat this as a quadratic equation by letting \\(u = \\sin(x)\\). Solve for \\(u\\), then solve for \\(x\\).";
        }
    }
    return { problem, answer: `\\(${answer}\\)`, hint };
}

export function generateChallengeOptimization(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint;

    if (type === 0) {
        const k = getRandomInt(5, 10);
        if (k % 3 !== 0) return generateChallengeOptimization(settings);
        const xVal = Math.sqrt(k / 3);
        const yVal = k - xVal * xVal;
        const maxArea = 2 * xVal * yVal;
        problem = `A rectangle is inscribed under the parabola \\(y = ${k} - x^2\\) in the first and second quadrants, with its base on the x-axis. Find the maximum area of the rectangle. (Round to ${settings.decimalPlaces} decimal places)`;
        answer = `${formatAnswer(maxArea, settings.decimalPlaces)}`;
        hint = "Express the area of the rectangle as a function of \\(x\\). Then find the derivative of the area function, set it to zero, and solve for \\(x\\) to find the dimensions that maximize the area.";
    } else if (type === 1) {
        const sum = getRandomInt(10, 20);
        const num1 = sum / 2;
        const num2 = sum / 2;
        const minSumOfSquares = num1 * num1 + num2 * num2;
        problem = `Find two positive numbers whose sum is \\(${sum}\\) and whose sum of squares is a minimum. What is this minimum sum of squares?`;
        answer = `${minSumOfSquares}`;
        hint = "Let the two numbers be \\(x\\) and \\(y\\). Express one variable in terms of the other using the sum constraint. Then substitute into the sum of squares expression and use calculus to find the minimum.";
    } else if (type === 2) {
        const price = getRandomInt(10, 20);
        const costPerItem = getRandomInt(2, 5);
        const aProf = getRandomInt(10, 20);
        const bProf = getRandomInt(1, 3);
        const optimalX = aProf / (2 * bProf);
        if (optimalX !== Math.floor(optimalX)) return generateChallengeOptimization(settings);
        const maxProfit = aProf * optimalX - bProf * optimalX * optimalX;
        problem = `A company's profit function is given by \\(P(x) = ${aProf}x - ${bProf}x^2\\), where \\(x\\) is the number of units produced. Find the number of units that maximizes profit and the maximum profit.`;
        answer = `Units: \\(${optimalX}\\), Max Profit: \\(${maxProfit}\\)`;
        hint = "Find the derivative of the profit function, set it to zero, and solve for \\(x\\) to find the number of units that maximizes profit. Then substitute this value back into the profit function.";
    } else if (type === 3) {
        const lineM = getRandomInt(-2, 2);
        const lineB = getRandomInt(1, 5);
        const pointX = getRandomInt(5, 10);
        const pointY = getRandomInt(1, 5);
        const optX = (pointX - lineM * lineB + lineM * pointY) / (1 + lineM * lineM);
        const optY = lineM * optX + lineB;
        const minDist = Math.sqrt(Math.pow(optX - pointX, 2) + Math.pow(optY - pointY, 2));
        problem = `Find the minimum distance from the point \\((${pointX}, ${pointY})\\) to the line \\(y = ${lineM}x + ${lineB}\\) (round to ${settings.decimalPlaces} decimal places).`;
        answer = `${formatAnswer(minDist, settings.decimalPlaces)}`;
        hint = "Minimize the distance squared function. Express the distance squared as a function of one variable, find its derivative, set to zero, and solve.";
    } else {
        const edge = getRandomInt(2, 5);
        const dVdt = getRandomInt(5, 15);
        const dxdt = dVdt / (3 * edge * edge);
        problem = `The volume of a cube is increasing at a rate of \\(${dVdt}\\) \\(\\text{cm}^3/s\\). How fast is the side length increasing when the side length is \\(${edge}\\) cm? (Round to ${settings.decimalPlaces} decimal places)`;
        answer = `${formatAnswer(dxdt, settings.decimalPlaces)} \\(\\text{ cm/s}\\)`;
        hint = "Write the volume formula in terms of the side length. Differentiate both sides with respect to time \\(t\\) and solve for the unknown rate.";
    }
    return { problem, answer: `\\(${answer}\\)`, hint };
}

export function generateChallengeAdvancedDerivatives(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint;

    switch (type) {
        case 0:
            const a = getRandomInt(1, 5);
            const b = getRandomInt(1, 5);
            const c = getRandomInt(1, 5);
            const d = getRandomInt(1, 5);
            const numeratorCoeff = a * d - b * c;
            problem = `Find the derivative of \\(f(x) = \\frac{${a}x + ${b}}{${c}x + ${d}}\\).`;
            answer = `f'(x) = \\frac{${numeratorCoeff}}{(${c}x + ${d})^2}`;
            hint = "Use the quotient rule: \\((\\frac{u}{v})' = \\frac{u'v - uv'}{v^2}\\).";
            break;
        case 1:
            const rSq = getRandomInt(10, 25);
            problem = `Find \\(\\frac{dy}{dx}\\) for the equation \\(x^2 + y^2 = ${rSq}\\).`;
            answer = `\\frac{dy}{dx} = -\\frac{x}{y}`;
            hint = "Differentiate both sides with respect to \\(x\\), remembering to apply the chain rule for terms involving \\(y\\) (e.g., \\(\\frac{d}{dx}(y^2) = 2y\\frac{dy}{dx}\\)).";
            break;
        case 2:
            const coeff3 = getRandomInt(1, 5);
            const coeff2 = getRandomInt(1, 5);
            const coeff1 = getRandomInt(1, 5);
            const constant = getRandomInt(1, 5);
            const poly = `${coeff3}x^3 ${coeff2 >= 0 ? '+' : '-'} ${Math.abs(2 * coeff2)}x^2 ${coeff1 >= 0 ? '+' : '-'} ${Math.abs(coeff1)}x ${constant >= 0 ? '+' : '-'} ${Math.abs(constant)}`;
            const firstDeriv = `${3 * coeff3}x^2 ${2 * coeff2 >= 0 ? '+' : '-'} ${Math.abs(2 * coeff2)}x ${coeff1 >= 0 ? '+' : '-'} ${Math.abs(coeff1)}`;
            const secondDeriv = `${6 * coeff3}x ${2 * coeff2 >= 0 ? '+' : '-'} ${Math.abs(2 * coeff2)}`;
            problem = `Find the second derivative of \\(f(x) = ${poly}\\).`;
            answer = `f''(x) = ${secondDeriv}`;
            hint = "Find the first derivative, then differentiate the result to find the second derivative.";
            break;
        case 3:
            const chainType = getRandomInt(0, 1);
            const innerCoeff = getRandomInt(2, 5);
            const innerConst = getRandomInt(1, 5);
            let chainProblem, chainAnswer, chainHint;

            if (chainType === 0) {
                chainProblem = `Find the derivative of \\(f(x) = \\sin(${innerCoeff}x + ${innerConst})\\).`;
                chainAnswer = `${innerCoeff}\\cos(${innerCoeff}x + ${innerConst})`;
                chainHint = "Use the chain rule: \\(\\frac{d}{dx}[\\sin(g(x))] = \\cos(g(x)) \\cdot g'(x)\\).";
            } else {
                chainProblem = `Find the derivative of \\(f(x) = e^{${innerCoeff}x + ${innerConst}}\\).`;
                chainAnswer = `${innerCoeff}e^{${innerCoeff}x + ${innerConst}}`;
                chainHint = "Use the chain rule: \\(\\frac{d}{dx}[e^{g(x)}] = e^{g(x)} \\cdot g'(x)\\).";
            }
            problem = chainProblem;
            answer = `\\(${chainAnswer}\\)`;
            hint = chainHint;
            break;
        case 4:
            const ladderLength = getRandomInt(10, 20);
            const initialX = getRandomInt(6, 9);
            const dxdt = getRandomInt(1, 3);
            const initialY = Math.sqrt(ladderLength * ladderLength - initialX * initialX);
            if (initialY !== Math.floor(initialY)) return generateChallengeAdvancedDerivatives(settings);
            const dydt = -(initialX / initialY) * dxdt;
            problem = `A \\(${ladderLength}\\)-foot ladder is leaning against a wall. If the base of the ladder is sliding away from the wall at \\(${dxdt}\\) ft/s, how fast is the top of the ladder sliding down the wall when the base is \\(${initialX}\\) feet from the wall? (Round to ${settings.decimalPlaces} decimal places)`;
            answer = `${formatAnswer(dydt, settings.decimalPlaces)} ft/s`;
            hint = "Write the volume formula in terms of the side length. Differentiate both sides with respect to time \\(t\\) and solve for the unknown rate.";
            break;
    }
    return { problem, answer: `\\(${answer}\\)`, hint };
}

export function generateChallengeAdvancedIntegrals(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint;

    if (type === 0) {
        const a = getRandomInt(2, 4);
        const b = getRandomInt(1, 5);
        const n = getRandomInt(2, 4);
        const newPower = n + 1;
        const newCoeffNum = 1;
        const newCoeffDen = a * newPower;
        problem = `Evaluate the indefinite integral: \\(\\int (${a}x + ${b})^{${n}} dx\\).`;
        answer = `\\frac{${newCoeffNum}}{${newCoeffDen}}(${a}x + ${b})^{${newPower}} + C`;
        hint = "Use u-substitution. Let \\(u = ${a}x + ${b}\\). Then find \\(du\\).";
    } else if (type === 1) {
        const m1 = getRandomInt(2, 4);
        const c1 = getRandomInt(1, 5);
        const m2 = getRandomInt(1, m1 - 1);
        const c2 = getRandomInt(1, 5);
        const intersectX = (c2 - c1) / (m1 - m2);
        if (intersectX !== Math.floor(intersectX)) return generateChallengeAdvancedIntegrals(settings);

        const lowerBound = Math.min(0, intersectX - getRandomInt(1,2));
        const upperBound = Math.max(0, intersectX + getRandomInt(1,2));

        const func1 = (x) => m1 * x + c1;
        const func2 = (x) => m2 * x + c2;

        const upperFunc = func1(lowerBound + 1) > func2(lowerBound + 1) ? func1 : func2;
        const lowerFunc = upperFunc === func1 ? func2 : func1;

        const areaIntegral = (x) => 0.5 * (m1 - m2) * x * x + (c1 - c2) * x;
        const exactArea = Math.abs(areaIntegral(upperBound) - areaIntegral(lowerBound));

        problem = `Find the area bounded by the curves \\(y = ${m1}x + ${c1}\\) and \\(y = ${m2}x + ${c2}\\) between \\(x = ${lowerBound}\\) and \\(x = ${upperBound}\\). (Round to ${settings.decimalPlaces} decimal places)`;
        answer = `${formatAnswer(exactArea, settings.decimalPlaces)}`;
        hint = "Identify the upper and lower functions in the given interval. Integrate the difference of the functions from the lower to the upper bound: \\(\\int_{a}^{b} (f(x) - g(x)) dx\\).";
    } else if (type === 2) {
        const coeff = getRandomInt(1, 3);
        problem = `Evaluate the indefinite integral: \\(\\int ${coeff}xe^x dx\\).`;
        answer = `${coeff}(xe^x - e^x) + C`;
        hint = "Use integration by parts: \\(\\int u dv = uv - \\int v du\\). Choose \\(u = x\\) and \\(dv = e^x dx\\).";
    } else if (type === 3) {
        const a_trig = getRandomInt(2, 5);
        const a_sq = a_trig * a_trig;
        problem = `Evaluate the indefinite integral: \\(\\int \\frac{1}{\\sqrt{${a_sq} - x^2}} dx\\).`;
        answer = `\\arcsin(\\frac{x}{${a_trig}}) + C`;
        hint = "Use trigonometric substitution. Let \\(x = ${a_trig}\\sin(\\theta)\\).";
    } else {
        const a_part = getRandomInt(1, 3);
        const b_part = getRandomInt(4, 6);
        if (a_part === b_part) return generateChallengeAdvancedIntegrals(settings);
        const coeffDenom = b_part - a_part;
        if (coeffDenom === 0) return generateChallengeAdvancedIntegrals(settings);
        const coeffA = formatFraction(1, coeffDenom);
        const coeffB = formatFraction(-1, coeffDenom);
        problem = `Evaluate the indefinite integral: \\(\\int \\frac{1}{(x + ${a_part})(x + ${b_part})} dx\\).`;
        answer = `${coeffA}\\ln|x + ${a_part}| ${coeffB >= 0 ? '+' : '-'} ${Math.abs(coeffB)}\\ln|x + ${b_part}| + C`;
        hint = "Use partial fraction decomposition to rewrite the integrand before integrating.";
    }
    return { problem, answer: `\\(${answer}\\\\)`, hint };
}

export function generateChallengeDifferentialEquations(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint;

    if (type === 0) {
        const k = getRandomInt(1, 5);
        problem = `Solve the differential equation: \\(\\frac{dy}{dx} = ${k}x\\).`;
        answer = `y = \\frac{${k}}{2}x^2 + C`;
        hint = "Separate the variables \\(y\\) and \\(x\\) and integrate both sides.";
    } else if (type === 1) {
        const k = getRandomInt(1, 3);
        problem = `Verify that \\(y = Ce^{${k}x}\\\\) is a solution to the differential equation \\(\\frac{dy}{dx} = ${k}y\\\\).`;
        answer = "If \\(y = Ce^{${k}x}\\\\), then \\(\\frac{dy}{dx} = C(${k})e^{${k}x} = ${k}(Ce^{${k}x}) = ${k}y\\\\). Since \\(\\frac{dy}{dx} = ${k}y\\\\), the solution is verified.";
        hint = "Find the derivative of the proposed solution \\(y\\) with respect to \\(x\\), and then substitute \\(y\\) and \\(\\frac{dy}{dx}\\) into the differential equation to see if it holds true.";
    } else if (type === 2) {
        const k = getRandomInt(1, 3);
        problem = `Solve the first-order linear differential equation: \\(\\frac{dy}{dx} + ${k}y = 0\\).`;
        answer = `y = Ce^{-${k}x}`;
        hint = "This is a separable equation. Separate variables and integrate. Alternatively, recognize it as a first-order linear homogeneous equation.";
    } else if (type === 3) {
        const initialPop = getRandomInt(100, 500);
        const growthRate = getRandomArbitrary(0.01, 0.05).toFixed(2);
        const time = getRandomInt(2, 5);
        const finalPop = initialPop * Math.exp(growthRate * time);
        problem = `The population of a city grows at a rate proportional to its current population. If the initial population is \\(${initialPop}\\) and the growth rate is \\(${growthRate * 100}\\%\\) per year, what will the population be after \\(${time}\\) years? (Round to nearest integer)`;
        answer = `${Math.round(finalPop)}`;
        hint = "Use the exponential growth model: \\(P(t) = P_0 e^{kt}\\), where \\(P_0\\) is the initial population, \\(k\\) is the growth rate, and \\(t\\) is time.";
    } else {
        const a_ivp = getRandomInt(1, 5);
        const c_ivp = getRandomInt(1, 10);
        problem = `Solve the initial value problem: \\(\\frac{dy}{dx} = ${a_ivp}x\\), with \\(y(0) = ${c_ivp}\\).`;
        answer = `y = \\frac{${a_ivp}}{2}x^2 + ${c_ivp}`;
        hint = "First, integrate the differential equation to find the general solution. Then, use the initial condition to find the value of the constant of integration.";
    }
    return { problem, answer: `\\(${answer}\\\\)`, hint };
}

// --- NEW: SAT Specific Problem Functions ---
function generateSatDataAnalysis(settings) {
    const type = getRandomInt(0, 1); // 0: Mean, 1: Median
    let problem, answer, hint;

    if (type === 0) { // Mean
        const numCount = getRandomInt(4, 7);
        const numbers = Array.from({ length: numCount }, () => getRandomInt(5, 25));
        const sum = numbers.reduce((acc, curr) => acc + curr, 0);
        const mean = sum / numCount;
        problem = `Find the mean of the following data set: \\(${numbers.join(', ')}\\\\).`;
        answer = formatAnswer(mean, settings.decimalPlaces);
        hint = "The mean is the sum of all values divided by the number of values.";
    } else { // Median
        const numCount = getRandomInt(5, 8); // Ensure odd number for simplicity of median in this example
        const numbers = Array.from({ length: numCount }, () => getRandomInt(10, 50)).sort((a, b) => a - b);
        const median = numbers[Math.floor(numCount / 2)];
        problem = `Find the median of the following data set: \\(${numbers.join(', ')}\\\\).`;
        answer = `${median}`;
        hint = "The median is the middle value of a data set when it is ordered from least to greatest.";
    }
    return { problem, answer: `\\(${answer}\\)`, hint };
}

// Individual problem generation functions (examples, more to be added)
// (These are the functions called by the dispatchers above)

function generateArithmeticOperations(settings) {
    const type = getRandomInt(0, 5);
    let num1 = getRandomInt(1, 100);
    let num2 = getRandomInt(1, 100);
    let problem, answer, hint;

    switch (type) {
        case 0:
            problem = `What is \\(${num1} + ${num2}\\)?`;
            answer = (num1 + num2).toString();
            hint = "Add the two numbers together.";
            break;
        case 1:
            if (num1 < num2) [num1, num2] = [num2, num1];
            problem = `What is \\(${num1} - ${num2}\\)?`;
            answer = (num1 - num2).toString();
            hint = "Subtract the second number from the first.";
            break;
        case 2:
            num1 = getRandomInt(1, 12);
            num2 = getRandomInt(1, 12);
            problem = `What is \\(${num1} \\times ${num2}\\)?`;
            answer = (num1 * num2).toString();
            hint = "Multiply the two numbers.";
            break;
        case 3:
            num2 = getRandomInt(1, 10);
            num1 = num2 * getRandomInt(2, 12);
            problem = `What is \\(${num1} \\div ${num2}\\)?`;
            answer = (num1 / num2).toString();
            hint = "Divide the first number by the second.";
            break;
        case 4:
            const op1 = ['+', '-', '*', '/'][getRandomInt(0, 3)];
            const op2 = ['+', '-', '*', '/'][getRandomInt(0, 3)];
            let n1 = getRandomInt(2, 10);
            let n2 = getRandomInt(2, 10);
            let n3 = getRandomInt(2, 10);
            let expression = `${n1} ${op1} ${n2} ${op2} ${n3}`;
            try {
                // Ensure division by zero is handled for eval
                if (expression.includes('/ 0')) {
                    return generateArithmeticOperations(settings);
                }
                answer = eval(expression.replace('*', '*').replace('/', '/')).toString();
            } catch (e) {
                return generateArithmeticOperations(settings); // Regenerate if eval fails
            }
            problem = `Evaluate: \\(${expression.replace('*', '\\times').replace('/', '\\div')}\\).`;
            hint = "Follow the order of operations (PEMDAS/BODMAS).";
            break;
        case 5:
            n1 = getRandomInt(2, 5);
            n2 = getRandomInt(2, 5);
            n3 = getRandomInt(2, 5);
            const n4 = getRandomInt(2, 5);
            const expType = getRandomInt(0,1);
            if (expType === 0) {
                expression = `(${n1} + ${n2}) * ${n3} - ${n4}`;
                answer = ((n1 + n2) * n3 - n4).toString();
            } else {
                if (n4 === 0 || (n2 - n3) % n4 !== 0) return generateArithmeticOperations(settings); // Avoid division by zero and non-integer results
                expression = `${n1} + (${n2} - ${n3}) / ${n4}`;
                answer = (n1 + (n2 - n3) / n4).toString();
            }
            problem = `Evaluate: \\(${expression.replace('*', '\\times').replace('/', '\\div')}\\).`;
            hint = "Remember the order of operations: Parentheses/Brackets, Exponents/Orders, Multiplication and Division (left-to-right), Addition and Subtraction (left-to-right).";
            break;
    }
    return { problem, answer: `\\(${answer}\\)`, hint };
}

function generateFractionsDecimalsPercent(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint;

    function commonDivisor(a, b) {
        return b === 0 ? a : commonDivisor(b, a % b);
    }

    switch (type) {
        case 0:
            const num = getRandomInt(1, 9);
            const den = getRandomInt(2, 10);
            problem = `Convert the fraction \\(\\frac{${num}}{${den}}\\) to a decimal (round to ${settings.decimalPlaces} places).`;
            answer = formatAnswer(num / den, settings.decimalPlaces);
            hint = "Divide the numerator by the denominator.";
            break;
        case 1:
            const percent = getRandomInt(5, 95);
            const number = getRandomInt(50, 200);
            problem = `What is \\(${percent}\\%\\) of \\(${number}\\)?`;
            answer = formatAnswer((percent / 100) * number, settings.decimalPlaces);
            hint = "Convert the percentage to a decimal and multiply by the number.";
            break;
        case 2:
            const f1_num = getRandomInt(1, 5);
            const f1_den = getRandomInt(2, 6);
            const d2_val = parseFloat(getRandomArbitrary(0.1, 0.9).toFixed(settings.decimalPlaces)); // Ensure decimal value
            const numbers = [`\\(\\frac{${f1_num}}{${f1_den}}\\)`, `\\(${d2_val}\\)`];
            const numericalValues = [f1_num / f1_den, d2_val];
            const sortedNumbers = numericalValues.sort((a, b) => a - b).map(v => {
                if (v === f1_num / f1_den) return `\\(\\frac{${f1_num}}{${f1_den}}\\)`;
                return `\\(${formatAnswer(v, settings.decimalPlaces)}\\)` ;
            });
            problem = `Order the following numbers from least to greatest: ${numbers.join(', ')}.`;
            answer = `${sortedNumbers.join(' < ')}`;
            hint = "Convert all numbers to the same format (e.g., decimals) to compare them easily.";
            break;
        case 3:
            const decimal = parseFloat(getRandomArbitrary(0.1, 0.9).toFixed(1));
            const denominator = 10; // For single decimal place, denominator is 10
            const numerator = decimal * denominator;
            const gcd = commonDivisor(numerator, denominator);
            problem = `Convert \\(${decimal}\\) to a fraction in simplest form.`;
            answer = `\\frac{${numerator / gcd}}{${denominator / gcd}}`;
            hint = "Write the decimal as a fraction over a power of 10, then simplify.";
            break;
        case 4:
            const n1_frac = getRandomInt(1, 5);
            const d1_frac = getRandomInt(2, 6);
            const n2_frac = getRandomInt(1, 5);
            const d2_frac = getRandomInt(2, 6);
            const fracOp = getRandomInt(0, 1); // 0: add, 1: subtract

            const commonDen = (d1_frac * d2_frac) / commonDivisor(d1_frac, d2_frac);
            const newN1 = n1_frac * (commonDen / d1_frac);
            const newN2 = n2_frac * (commonDen / d2_frac);
            let finalNum;
            let problemStr;

            if (fracOp === 0) {
                finalNum = newN1 + newN2;
                problemStr = `Add: \\(\\frac{${n1_frac}}{${d1_frac}} + \\frac{${n2_frac}}{${d2_frac}}\\)`;
            } else {
                finalNum = newN1 - newN2;
                problemStr = `Subtract: \\(\\frac{${n1_frac}}{${d1_frac}} - \\frac{${n2_frac}}{${d2_frac}}\\)`;
            }
            const finalGcd = commonDivisor(Math.abs(finalNum), commonDen);
            answer = `\\frac{${finalNum / finalGcd}}{${commonDen / finalGcd}}`;
            problem = problemStr;
            hint = "Find a common denominator, then add or subtract the numerators. Simplify the resulting fraction.";
            break;
    }
    return { problem, answer: `\\(${answer}\\)`, hint };
}

function generateGeometryBasicShapes(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint;

    switch (type) {
        case 0:
            const length = getRandomInt(5, 15);
            const width = getRandomInt(3, 10);
            problem = `Find the area of a rectangle with length \\(${length}\\) cm and width \\(${width}\\) cm.`;
            answer = `${length * width} \\(\\text{ cm}^2\\)`;
            hint = "Area of a rectangle = length \\(\\times\\) width.";
            break;
        case 1:
            const sideA = getRandomInt(3, 8);
            const sideB = getRandomInt(3, 8);
            const sideC = getRandomInt(3, 8);
            problem = `Find the perimeter of a triangle with sides measuring \\(${sideA}\\) cm, \\(${sideB}\\) cm, and \\(${sideC}\\) cm.`;
            answer = `${sideA + sideB + sideC} \\(\\text{ cm}\\)`;
            hint = "Perimeter is the sum of all side lengths.";
            break;
        case 2:
            const radius = getRandomInt(3, 10);
            problem = `Find the area of a circle with radius \\(${radius}\\) cm (use \\(\\pi \\approx 3.14\\) and round to ${settings.decimalPlaces} places).`;
            answer = formatAnswer(Math.PI * radius * radius, settings.decimalPlaces) + ` \\(\\text{ cm}^2\\)`;
            hint = "Area of a circle = \\(\\pi r^2\\).";
            break;
        case 3:
            const sideSq = getRandomInt(4, 12);
            problem = `Find the area of a square with a side length of \\(${sideSq}\\) meters.`;
            answer = `${sideSq * sideSq} \\(\\text{ m}^2\\)`;
            hint = "Area of a square = side \\(\\times\\) side (or side squared).";
            break;
        case 4:
            const rectLength = getRandomInt(6, 15);
            const rectWidth = getRandomInt(4, 10);
            problem = `Find the perimeter of a rectangle with length \\(${rectLength}\\) inches and width \\(${rectWidth}\\) inches.`;
            answer = `${2 * (rectLength + rectWidth)} \\(\\text{ inches}\\)`;
            hint = "Perimeter of a rectangle = \\(2 \\times \\text{(length + width)}\\).";
            break;
    }
    return { problem, answer: `\\(${answer}\\)`, hint };
}

function generateRatiosProportions(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint;

    function gcd(a, b) {
        return b === 0 ? a : gcd(b, a % b);
    }

    switch (type) {
        case 0:
            const val1 = getRandomInt(2, 10);
            const val2 = getRandomInt(2, 10);
            problem = `Write the ratio of \\(${val1}\\) to \\(${val2}\\) in simplest form.`;
            const commonDivisor = gcd(val1, val2);
            answer = `${val1 / commonDivisor}:${val2 / commonDivisor}`;
            hint = "Divide both parts of the ratio by their greatest common divisor.";
            break;
        case 1:
            const a = getRandomInt(1, 10);
            const b = getRandomInt(a + 1, 15);
            const x = getRandomInt(1, 10);
            const c = b * x;
            problem = `Solve for \\(x\\): \\(\\frac{${a}}{${b}} = \\frac{x}{${c}}\\)`;
            answer = `x = ${a * x}`; // This looks like a logical error, should be a*c/b
            // Corrected answer logic:
            answer = `x = ${formatAnswer((a * c) / b, settings.decimalPlaces)}`;
            hint = "Cross-multiply and then solve for \\(x\\).";
            break;
        case 2:
            const boys = getRandomInt(5, 15);
            const girls = getRandomInt(5, 15);
            const totalStudents = boys + girls;
            const ratioGcd = (a, b) => b === 0 ? a : ratioGcd(b, a % b);
            const commonDiv = ratioGcd(boys, girls);
            problem = `In a class, there are \\(${boys}\\) boys and \\(${girls}\\) girls. What is the ratio of boys to girls in simplest form?`;
            answer = `${boys / commonDiv}:${girls / commonDiv}`;
            hint = "Form the ratio and simplify by dividing both numbers by their greatest common divisor.";
            break;
        case 3:
            const originalLength = getRandomInt(5, 20);
            const scaleFactor = getRandomInt(2, 5); // Ensure integer scale factor
            const scaledLength = originalLength * scaleFactor;
            problem = `A drawing has a length of \\(${originalLength}\\) cm. If it is scaled up to a length of \\(${scaledLength}\\) cm, what is the scale factor?`;
            answer = `${scaleFactor}`;
            hint = "Scale factor = New length / Original length.";
            break;
        case 4:
            const kVal = getRandomInt(2, 5);
            const x1 = getRandomInt(3, 10);
            const y1 = kVal * x1;
            const x2 = getRandomInt(x1 + 1, 15);
            problem = `If \\(y\\) is directly proportional to \\(x\\), and \\(y = ${y1}\\) when \\(x = ${x1}\\), what is \\(y\\) when \\(x = ${x2}\\)?`;
            answer = `${kVal * x2}`;
            hint = "First find the constant of proportionality \\(k\\) using \\(y = kx\\). Then use \\(k\\) to find the new \\(y\\) value.";
            break;
    }
    return { problem, answer: `\\(${answer}\\)`, hint };
}

function generateIntegersRationalNumbers(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint;

    function commonDivisor(a, b) {
        return b === 0 ? a : commonDivisor(b, a % b);
    }

    switch (type) {
        case 0:
            const num = getRandomInt(-20, 20);
            problem = `What is the absolute value of \\(${num}\\)?`;
            answer = Math.abs(num).toString();
            hint = "The absolute value of a number is its distance from zero, always positive.";
            break;
        case 1:
            const num1 = getRandomInt(-10, 10);
            const num2 = getRandomInt(-10, 10);
            if (num1 === num2) return generateIntegersRationalNumbers(settings);
            const comparison = num1 > num2 ? '>' : '<';
            problem = `Compare: \\(${num1}\\) ___ \\(${num2}\\). Choose \\(<\\), \\(>\\), or \\(=\\).`;
            answer = comparison;
            hint = "Numbers further to the right on a number line are greater.";
            break;
        case 2:
            const valA = getRandomInt(-10, 10);
            const valB = getRandomInt(-10, 10);
            const operation = getRandomInt(0, 3);
            let result;
            let opSymbol;

            switch (operation) {
                case 0: result = valA + valB; opSymbol = '+'; break;
                case 1: result = valA - valB; opSymbol = '-'; break;
                case 2: result = valA * valB; opSymbol = '\\times'; break;
                case 3:
                    if (valB === 0) return generateIntegersRationalNumbers(settings);
                    if (valA % valB !== 0) return generateIntegersRationalNumbers(settings);
                    result = valA / valB; opSymbol = '\\div';
                    break;
            }
            problem = `Calculate: \\(${valA} ${opSymbol} ${valB}\\)`;
            answer = result.toString();
            hint = "Follow the rules for operations with positive and negative numbers.";
            break;
        case 3:
            const r1 = getRandomInt(-5, 5);
            const f_num = getRandomInt(-5, 5);
            const f_den = getRandomInt(2, 5);
            const d_val = parseFloat(getRandomArbitrary(-5.0, 5.0).toFixed(1));

            const values = [r1, f_num / f_den, d_val];
            const displayValues = [`\\(${r1}\\)`, `\\(\\frac{${f_num}}{${f_den}}\\)`, `\\(${d_val}\\)`];
            const sortedDisplayValues = values.slice().sort((a, b) => a - b).map(val => {
                if (val === r1) return `\\(${r1}\\)`;
                if (val === f_num / f_den) return `\\(\\frac{${f_num}}{${f_den}}\\)`;
                return `\\(${d_val}\\)`;
            });
            problem = `Order the following rational numbers from least to greatest: ${displayValues.join(', ')}.`;
            answer = sortedDisplayValues.join(' < ');
            hint = "Convert all numbers to decimal form to compare them easily.";
            break;
        case 4:
            const p1 = getRandomInt(-10, 10);
            const p2 = getRandomInt(-10, 10);
            problem = `What is the distance between \\(${p1}\\) and \\(${p2}\\) on a number line?`;
            answer = Math.abs(p1 - p2).toString();
            hint = "The distance between two points on a number line is the absolute value of their difference.";
            break;
    }
    return { problem, answer: `\\(${answer}\\)`, hint };
}

function generateExpressionsEquationsBasic(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint;

    switch (type) {
        case 0:
            const coeff1 = getRandomInt(2, 10);
            const const1 = getRandomInt(1, 15);
            const coeff2 = getRandomInt(2, 10);
            const const2 = getRandomInt(1, 15);
            problem = `Simplify the expression: \\(${coeff1}x + ${const1} + ${coeff2}x - ${const2}\\).`;
            answer = `${coeff1 + coeff2}x + ${const1 - const2}`;
            hint = "Combine like terms (terms with 'x' and constant terms separately).";
            break;
        case 1:
            const xVal = getRandomInt(1, 20);
            const operation = getRandomInt(0, 3);
            let eqNum = getRandomInt(2, 10);
            let result;
            let opSymbol;
            switch (operation) {
                case 0:
                    result = xVal + eqNum; opSymbol = '+';
                    problem = `Solve for \\(x\\): \\(x + ${eqNum} = ${result}\\).`;
                    break;
                case 1:
                    result = xVal - eqNum; opSymbol = '-';
                    problem = `Solve for \\(x\\): \\(x - ${eqNum} = ${result}\\).`;
                    break;
                case 2:
                    result = xVal * eqNum; opSymbol = '\\times';
                    problem = `Solve for \\(x\\): \\(${eqNum}x = ${result}\\).`;
                    break;
                case 3:
                    if (eqNum === 0) return generateExpressionsEquationsBasic(settings); // Avoid division by zero
                    result = xVal / eqNum; opSymbol = '\\div';
                    problem = `Solve for \\(x\\): \\(\\frac{x}{${eqNum}} = ${formatAnswer(result, settings.decimalPlaces)}\\).`;
                    break;
            }
            answer = `x = ${formatAnswer(xVal, settings.decimalPlaces)}`;
            hint = "Use the inverse operation to isolate \\(x\\).";
            break;
        case 2:
            const val = getRandomInt(5, 20);
            const term = getRandomInt(2, 5);
            const scenarios = [
                `five more than a number \\(n\\)`, `\\(n + 5\\)`, `Increase a number by five.`,
                `a number \\(x\\) decreased by ${val}`, `\\(x - ${val}\\)`, `Subtract ${val} from a number.`,
                `the product of ${term} and a number \\(y\\)`, `\\(${term}y\\)`, `Multiply a number by ${term}.`,
                `the quotient of a number \\(a\\) and ${term}`, `\\(\\frac{a}{${term}}\\)`, `Divide a number by ${term}.`
            ];
            const scenarioIndex = getRandomInt(0, scenarios.length / 3 - 1) * 3;
            problem = `Translate the phrase into an algebraic expression: "${scenarios[scenarioIndex]}".`;
            answer = scenarios[scenarioIndex + 1];
            hint = scenarios[scenarioIndex + 2];
            break;
        case 3:
            const evalCoeff = getRandomInt(2, 7);
            const evalConst = getRandomInt(1, 10);
            const evalX = getRandomInt(-5, 5);
            problem = `Evaluate the expression \\(${evalCoeff}x + ${evalConst}\\) when \\(x = ${evalX}\\).`;
            answer = (evalCoeff * evalX + evalConst).toString();
            hint = "Substitute the given value of \\(x\\) into the expression and simplify.";
            break;
        case 4:
            const propType = getRandomInt(0, 2);
            let propProblem, propAnswer, propHint;
            if (propType === 0) {
                const nA = getRandomInt(2, 10);
                const nB = getRandomInt(2, 10);
                propProblem = `Identify the property shown: \\(${nA} + ${nB} = ${nB} + ${nA}\\).`;
                propAnswer = "Commutative Property of Addition";
                propHint = "The order of numbers changes, but the result stays the same.";
            } else if (propType === 1) {
                const nA = getRandomInt(2, 5);
                const nB = getRandomInt(2, 5);
                const nC = getRandomInt(2, 5);
                propProblem = `Identify the property shown: \\((${nA} + ${nB}) + ${nC} = ${nA} + (${nB} + ${nC})\\).`;
                propAnswer = "Associative Property of Addition";
                propHint = "The grouping of numbers changes, but the result stays the same.";
            } else {
                const nA = getRandomInt(2, 5);
                const nB = getRandomInt(2, 5);
                const nC = getRandomInt(2, 5);
                propProblem = `Identify the property shown: \\(${nA}(${nB} + ${nC}) = ${nA} \\times ${nB} + ${nA} \\times ${nC}\\).`;
                propAnswer = "Distributive Property";
                propHint = "A number outside parentheses is multiplied by each term inside.";
            }
            problem = propProblem;
            answer = propAnswer;
            hint = propHint;
            break;
    }
    return { problem, answer: `\\(${answer}\\)`, hint };
}

function generateAnglesTriangles(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint;

    switch (type) {
        case 0:
            const angle = getRandomInt(10, 80);
            const angleType = getRandomInt(0, 1);
            if (angleType === 0) {
                problem = `Find the complement of an angle measuring \\(${angle}^\\circ\\).`;
                answer = `${90 - angle}^\\circ`;
                hint = "Complementary angles add up to \\(90^\\circ\\).";
            } else {
                problem = `Find the supplement of an angle measuring \\(${angle}^\\circ\\).`;
                answer = `${180 - angle}^\\circ`;
                hint = "Supplementary angles add up to \\(180^\\circ\\).";
            }
            break;
        case 1:
            const angleA = getRandomInt(30, 80);
            const angleB = getRandomInt(30, 80);
            const angleC = 180 - angleA - angleB;
            problem = `Two angles of a triangle measure \\(${angleA}^\\circ\\) and \\(${angleB}^\\circ\\). What is the measure of the third angle?`;
            answer = `${angleC}^\\circ`;
            hint = "The sum of the angles in a triangle is \\(180^\\circ\\).";
            break;
        case 2:
            const base = getRandomInt(5, 15);
            const height = getRandomInt(3, 10);
            const area = 0.5 * base * height;
            problem = `Find the area of a triangle with a base of \\(${base}\\) cm and a height of \\(${height}\\) cm.`;
            answer = `${area} \\(\\text{ cm}^2\\)`;
            hint = "Area of a triangle = \\(\\frac{1}{2} \\times \\text{base} \\times \\text{height}\\).";
            break;
        case 3:
            const a1 = getRandomInt(30, 80);
            const a2 = getRandomInt(30, 80);
            const a3 = 180 - a1 - a2;
            let angleClassification;
            if (a1 === 90 || a2 === 90 || a3 === 90) angleClassification = "Right";
            else if (a1 > 90 || a2 > 90 || a3 > 90) angleClassification = "Obtuse";
            else angleClassification = "Acute";
            problem = `Classify the triangle with angles \\(${a1}^\\circ\\), \\(${a2}^\\circ\\), and \\(${a3}^\\circ\\) by its angles.`;
            answer = `${angleClassification} triangle`;
            hint = "A right triangle has one \\(90^\\circ\\) angle. An obtuse triangle has one angle greater than \\(90^\\circ\\). An acute triangle has all angles less than \\(90^\\circ\\).";
            break;
        case 4:
            const s1 = getRandomInt(3, 10);
            const s2 = getRandomInt(3, 10);
            const s3 = getRandomInt(3, 10);
            let sideClassification;
            if (s1 === s2 && s2 === s3) sideClassification = "Equilateral";
            else if (s1 === s2 || s1 === s3 || s2 === s3) sideClassification = "Isosceles";
            else sideClassification = "Scalene";
            problem = `Classify the triangle with side lengths \\(${s1}\\), \\(${s2}\\), and \\(${s3}\\) by its sides.`;
            answer = `${sideClassification} triangle`;
            hint = "Equilateral: all sides equal. Isosceles: two sides equal. Scalene: no sides equal.";
            break;
    }
    return { problem, answer: `\\(${answer}\\)`, hint };
}

function generateProbabilitySimple(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint;
    const totalItems = getRandomInt(10, 30);
    const desiredItems = getRandomInt(1, Math.floor(totalItems / 2));

    switch (type) {
        case 0:
            problem = `A bag contains \\(${totalItems}\\) marbles, \\(${desiredItems}\\) of which are red. What is the probability of picking a red marble?`;
            answer = formatFraction(desiredItems, totalItems);
            hint = "Probability = (Number of favorable outcomes) / (Total number of possible outcomes). Simplify the fraction.";
            break;
        case 1:
            const otherItems = totalItems - desiredItems;
            const secondDesiredItems = getRandomInt(1, Math.floor(otherItems / 2));
            problem = `A box has \\(${totalItems}\\) balls: \\(${desiredItems}\\) red and \\(${otherItems}\\) blue. If you pick a red ball, replace it, then pick a blue ball, what is the probability of this sequence?`;
            const probRed = desiredItems / totalItems;
            const probBlue = otherItems / totalItems;
            answer = formatFraction(desiredItems * otherItems, totalItems * totalItems);
            hint = "For independent events with replacement, multiply the probabilities of each event.";
            break;
        case 2:
            const firstPick = getRandomInt(1, desiredItems - 1);
            const secondPick = getRandomInt(1, totalItems - desiredItems - 1);
            problem = `A bag contains \\(${totalItems}\\) fruits: \\(${desiredItems}\\) apples and \\(${totalItems - desiredItems}\\) oranges. If you pick an apple, and then without replacement, pick another apple, what is the probability?`;
            if (desiredItems < 2) return generateProbabilitySimple(settings);
            answer = formatFraction(desiredItems * (desiredItems - 1), totalItems * (totalItems - 1));
            hint = "For events without replacement, the total number of items and the number of desired items decrease after the first pick.";
            break;
        case 3:
            const coinResult = getRandomInt(0, 1);
            const diceResult = getRandomInt(1, 6);
            problem = `What is the probability of flipping a coin and getting ${coinResult === 0 ? 'Heads' : 'Tails'}, AND rolling a \\(${diceResult}\\) on a standard six-sided die?`;
            answer = formatFraction(1 * 1, 2 * 6);
            hint = "For independent events, multiply their individual probabilities.";
            break;
        case 4:
            const dieRoll1 = getRandomInt(1, 3);
            let dieRoll2 = getRandomInt(4, 6);
            if (dieRoll1 === dieRoll2) dieRoll2 = getRandomInt(1, 6);
            problem = `What is the probability of rolling a \\(${dieRoll1}\\) OR a \\(${dieRoll2}\\) on a standard six-sided die?`;
            answer = formatFraction(1 + 1, 6);
            hint = "For mutually exclusive events, add their individual probabilities.";
            break;
    }
    return { problem, answer: `\\(${answer}\\)`, hint };
}

function generateLinearEquationsSystemsBasic(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint;
    let graphId, graphFunction;

    switch (type) {
        case 0:
            const xVal = getRandomInt(1, 10);
            const coeff = getRandomInt(2, 5);
            const constant = getRandomInt(1, 10);
            const result = coeff * xVal + constant;
            problem = `Solve for \\(x\\): \\(${coeff}x + ${constant} = ${result}\\).`;
            answer = `x = ${xVal}`;
            hint = "First, isolate the term with \\(x\\) by adding or subtracting the constant. Then, divide by the coefficient of \\(x\\).";
            break;
        case 1:
            const xVal2 = getRandomInt(2, 7);
            const coeffA = getRandomInt(3, 8);
            const constA = getRandomInt(1, 5);
            const coeffB = getRandomInt(1, coeffA - 1);
            const constB = getRandomInt(6, 10);
            const equationLHS = coeffA * xVal2 + constA;
            const equationRHS = coeffB * xVal2 + constB;
            const newCoeff = coeffA - coeffB;
            const newConst = constB - constA;
            if (newCoeff === 0 || newConst % newCoeff !== 0) return generateLinearEquationsSystemsBasic(settings);
            problem = `Solve for \\(x\\): \\(${coeffA}x + ${constA} = ${coeffB}x + ${constB}\\).`;
            answer = `x = ${xVal2}`;
            hint = "Gather all \\(x\\) terms on one side and constant terms on the other. Then solve for \\(x\\).";
            break;
        case 2:
            const xVal3 = getRandomInt(1, 5);
            const yVal3 = getRandomInt(1, 5);
            const eq1_const = xVal3 + yVal3;
            const eq2_const = 2 * xVal3 - yVal3;
            problem = `Solve the system of equations:\n\\[x + y = ${eq1_const}\\]\n\\[2x - y = ${eq2_const}\\]`;
            answer = `x = ${xVal3}, y = ${yVal3}`;
            hint = "Use substitution or elimination. For example, from the first equation, \\(y = ${eq1_const} - x\\), substitute this into the second equation.";
            break;
        case 3:
            const m = getRandomInt(-3, 3);
            const b = getRandomInt(-5, 5);
            if (m === 0 && settings.difficulty !== 'easy') {
                return generateLinearEquationsSystemsBasic(settings);
            }
            const equation = `y = ${m}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)}`;
            problem = `Graph the linear equation: \\(${equation}\\).`;
            answer = `The graph is a straight line with slope ${m} and y-intercept ${b}.`;

            graphId = `graph-${Date.now()}-${getRandomInt(0, 1000)}`;
            graphFunction = {
                functions: [{ type: 'expression', expression: `function(x){ return ${m}*x + ${b}; }` }],
                boundingbox: [-5, 5, 5, -5]
            };
            hint = "Plot the y-intercept, then use the slope (rise over run) to find other points.";
            break;
        case 4:
            const ineqCoeff = getRandomInt(2, 5);
            const ineqConst = getRandomInt(1, 10);
            const ineqResult = getRandomInt(10, 20);
            const ineqOp = ['<', '>', '\\le', '\\ge'][getRandomInt(0, 3)];
            let solutionX;
            let finalIneqOp = ineqOp;

            solutionX = (ineqResult - ineqConst) / ineqCoeff;

            if (ineqCoeff < 0) {
                if (finalIneqOp === '<') finalIneqOp = '>';
                else if (finalIneqOp === '>') finalIneqOp = '<';
                else if (finalIneqOp === '\\le') finalIneqOp = '\\ge';
                else if (finalIneqOp === '\\ge') finalIneqOp = '\\le';
            }

            problem = `Solve the inequality: \\(${ineqCoeff}x + ${ineqConst} ${ineqOp} ${ineqResult}\\).`;
            answer = `x ${finalIneqOp} ${formatAnswer(solutionX, settings.decimalPlaces)}`;
            hint = "Solve the inequality like an equation, but remember to flip the inequality sign if you multiply or divide by a negative number.";
            break;
    }
    return { problem, answer: `\\(${answer}\\)`, hint, graphId, graphFunction };
}

function generateExponentsScientificNotation(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint;

    switch (type) {
        case 0:
            const base = getRandomInt(2, 5);
            const exp1 = getRandomInt(2, 5);
            const exp2 = getRandomInt(2, 5);
            const op = getRandomInt(0, 1);
            if (op === 0) {
                problem = `Simplify: \\(${base}^{${exp1}} \\cdot ${base}^{${exp2}}\\)`;
                answer = `${base}^{${exp1 + exp2}}`;
                hint = "When multiplying powers with the same base, add the exponents.";
            } else {
                if (exp1 < exp2) {
                    [exp1, exp2] = [exp2, exp1];
                }
                problem = `Simplify: \\(\\frac{${base}^{${exp1}}}{${base}^{${exp2}}}\\)`;
                answer = `${base}^{${exp1 - exp2}}`;
                hint = "When dividing powers with the same base, subtract the exponents.";
            }
            break;
        case 1:
            const mainNum = parseFloat(getRandomArbitrary(1.0, 9.9).toFixed(1));
            const exponent = getRandomInt(2, 6);
            const standardNum = mainNum * Math.pow(10, exponent);
            problem = `Write \\(${mainNum} \\times 10^{${exponent}}\\) in standard notation.`;
            answer = standardNum.toString();
            hint = "Move the decimal point to the right by the number of places indicated by the positive exponent.";
            break;
        case 2:
            let largeNum = getRandomInt(10000, 999999);
            const numStr = largeNum.toString();
            const firstDigit = numStr[0];
            const decimalPart = numStr.substring(1).replace(/0+$/, '');
            const sciExp = numStr.length - 1;
            let sciAnswer;
            if (decimalPart.length > 0) {
                sciAnswer = `${firstDigit}.${decimalPart} \\times 10^{${sciExp}}`;
            } else {
                sciAnswer = `${firstDigit} \\times 10^{${sciExp}}`;
            }
            problem = `Write \\(${largeNum}\\) in scientific notation.`;
            answer = sciAnswer;
            hint = "Place the decimal after the first non-zero digit and count how many places it moved.";
            break;
        case 3:
            const negBase = getRandomInt(2, 5);
            const negExp = getRandomInt(-3, -1);
            problem = `Simplify: \\(${negBase}^{${negExp}}\\)`;
            answer = `\\frac{1}{${negBase}^{${Math.abs(negExp)}}}`;
            hint = "A negative exponent means to take the reciprocal of the base raised to the positive exponent.";
            break;
        case 4:
            const zeroBase = getRandomInt(1, 10);
            problem = `Simplify: \\(${zeroBase}^0\\)`;
            answer = `1`;
            hint = "Any non-zero number raised to the power of zero is 1.";
            break;
    }
    return { problem, answer: `\\(${answer}\\)`, hint };
}

function generatePythagoreanTheoremBasic(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint;

    switch (type) {
        case 0:
            const legA = getRandomInt(3, 8);
            const legB = getRandomInt(3, 8);
            const hypotenuseSq = legA * legA + legB * legB;
            const hypotenuse = Math.sqrt(hypotenuseSq);
            if (hypotenuse !== Math.floor(hypotenuse)) {
                return generatePythagoreanTheoremBasic(settings);
            }
            problem = `In a right-angled triangle, the two shorter sides (legs) measure \\(${legA}\\) and \\(${legB}\\). Find the length of the hypotenuse.`;
            answer = `${hypotenuse}`;
            hint = "Use the Pythagorean theorem: \\(a^2 + b^2 = c^2\\), where \\(c\\) is the hypotenuse.";
            break;
        case 1:
            const legX = getRandomInt(3, 8);
            const hypC = getRandomInt(5, 12);
            const legYSq = hypC * hypC - legX * legX;
            const legY = Math.sqrt(legYSq);
            if (legY <= 0 || legY !== Math.floor(legY)) {
                return generatePythagoreanTheoremBasic(settings);
            }
            problem = `In a right-angled triangle, one leg measures \\(${legX}\\) and the hypotenuse measures \\(${hypC}\\). Find the length of the other leg.`;
            answer = `${legY}`;
            hint = "Rearrange the Pythagorean theorem to solve for a leg: \\(a^2 = c^2 - b^2\\).";
            break;
        case 2:
            const side1 = getRandomInt(3, 10);
            const side2 = getRandomInt(3, 10);
            const side3 = getRandomInt(3, 10);
            const sidesArr = [side1, side2, side3].sort((a, b) => a - b);
            const isRight = (sidesArr[0] * sidesArr[0] + sidesArr[1] * sidesArr[1] === sidesArr[2] * sidesArr[2]);
            problem = `Are the sides \\(${side1}\\), \\(${side2}\\), and \\(${side3}\\) the sides of a right-angled triangle?`;
            answer = isRight ? "Yes" : "No";
            hint = "Check if \\(a^2 + b^2 = c^2\\) holds true for the given side lengths, where \\(c\\) is the longest side.";
            break;
        case 3:
            const tripleIndex = getRandomInt(0, 2);
            const triples = [[3, 4, 5], [5, 12, 13], [8, 15, 17]];
            const chosenTriple = triples[tripleIndex];
            const multiplier = getRandomInt(1, 3);
            const a_mult = chosenTriple[0] * multiplier;
            const b_mult = chosenTriple[1] * multiplier;
            const c_mult = chosenTriple[2] * multiplier;
            problem = `If two legs of a right triangle are \\(${a_mult}\\) and \\(${b_mult}\\), what is the length of the hypotenuse?`;
            answer = `${c_mult}`;
            hint = "Recognize common Pythagorean triples or use the Pythagorean theorem.";
            break;
        case 4:
            const x1 = getRandomInt(-5, 5);
            const y1 = getRandomInt(-5, 5);
            const x2 = getRandomInt(-5, 5);
            const y2 = getRandomInt(-5, 5);
            const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            problem = `Find the distance between the points \\((${x1}, ${y1})\\) and \\((${x2}, ${y2})\\) (round to ${settings.decimalPlaces} decimal places).`;
            answer = formatAnswer(distance, settings.decimalPlaces);
            hint = "Use the distance formula: \\(d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\\).";
            break;
    }
    return { problem, answer: `\\(${answer}\\)`, hint };
}

function generateFunctionsIntroduction(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint, graphId, graphFunction;

    switch (type) {
        case 0:
            const m = getRandomInt(2, 5);
            const b = getRandomInt(1, 10);
            const xVal = getRandomInt(-5, 5);
            const result = m * xVal + b;
            problem = `If \\(f(x) = ${m}x + ${b}\\), find \\(f(${xVal})\\).`;
            answer = `${result}`;
            hint = "Substitute the value of \\(x\\) into the function's equation and simplify.";
            break;
        case 1:
            const m2 = getRandomInt(1, 3);
            const b2 = getRandomInt(0, 5);
            const points = [];
            for (let i = 0; i < 3; i++) {
                const x = i + 1;
                const y = m2 * x + b2;
                points.push(`(\\( ${x}, ${y} \\))`);
            }
            problem = `A function has the following points: ${points.join(', ')}. Which equation represents this function?`;
            answer = `f(x) = ${m2}x + ${b2}`;
            hint = "Look for a consistent pattern in how \\(y\\) changes with \\(x\\) (slope) and find the \\(y\\)-intercept.";
            break;
        case 2:
            const numPoints = getRandomInt(3, 5);
            const domainSet = new Set();
            const rangeSet = new Set();
            const pointList = [];
            for (let i = 0; i < numPoints; i++) {
                const x = getRandomInt(1, 10);
                const y = getRandomInt(1, 10);
                domainSet.add(x);
                rangeSet.add(y);
                pointList.push(`(\\( ${x}, ${y} \\))`);
            }
            problem = `What are the domain and range of the relation defined by the points: ${pointList.join(', ')}?`;
            const domain = Array.from(domainSet).sort((a, b) => a - b).join(', ');
            const range = Array.from(rangeSet).sort((a, b) => a - b).join(', ');
            answer = `Domain: \\(\\{${domain}\\}\\), Range: \\(\\{${range}\\}\\)`;
            hint = "The domain is the set of all unique \\(x\\)-values. The range is the set of all unique \\(y\\)-values.";
            break;
        case 3:
            const relationType = getRandomInt(0, 1);
            let pointsForRelation = [];
            let problemRel, answerRel, hintRel;
            if (relationType === 0) {
                for (let i = 0; i < 3; i++) {
                    const x = getRandomInt(1, 5);
                    const y = getRandomInt(1, 5);
                    pointsForRelation.push(`(\\( ${x}, ${y} \\))`);
                }
                problemRel = `Is the relation defined by the points ${pointsForRelation.join(', ')} a function?`;
                answerRel = "Yes";
                hintRel = "In a function, each input (x-value) must have exactly one output (y-value).";
            } else {
                const commonX = getRandomInt(1, 5);
                pointsForRelation.push(`(\\( ${commonX}, ${getRandomInt(1, 5)} \\))`);
                pointsForRelation.push(`(\\( ${commonX}, ${getRandomInt(6, 10)} \\))`);
                pointsForRelation.push(`(\\( ${getRandomInt(1, 5)}, ${getRandomInt(1, 5)} \\))`);
                problemRel = `Is the relation defined by the points ${pointsForRelation.join(', ')} a function?`;
                answerRel = "No";
                hintRel = "In a function, each input (x-value) must have exactly one output (y-value). If an x-value repeats with different y-values, it's not a function.";
            }
            problem = problemRel;
            answer = answerRel;
            hint = hintRel;
            break;
        case 4:
            const graphM = getRandomInt(-2, 2);
            const graphB = getRandomInt(-3, 3);
            const tablePoints = [];
            const graphPoints = [];
            for (let i = -2; i <= 2; i++) {
                const y = graphM * i + graphB;
                tablePoints.push(`(\\( ${i}, ${y} \\))`);
                graphPoints.push({ type: 'point', x: i, y: y, options: { name: `(${i}, ${y})`, color: 'blue', size: 3 } });
            }
            problem = `Graph the function represented by the table of values: ${tablePoints.join(', ')}.`;
            answer = `The graph is a line passing through the given points.`;
            graphId = `graph-table-${Date.now()}`;
            graphFunction = {
                functions: graphPoints,
                boundingbox: [-5, 5, 5, -5]
            };
            hint = "Plot each point from the table on the coordinate plane and connect them.";
            break;
    }
    return { problem, answer: `\\(${answer}\\)`, hint, graphId, graphFunction };
}

function generateAlgebraLinearEquations(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint;

    switch (type) {
        case 0:
            const xVal = getRandomInt(-5, 5);
            const coeff1 = getRandomInt(2, 7);
            const const1 = getRandomInt(1, 10);
            const coeff2 = getRandomInt(1, coeff1 - 1);
            const const2 = getRandomInt(1, 10);
            const result = coeff1 * xVal + const1 - coeff2 * xVal + const2;
            problem = `Solve for \\(x\\): \\(${coeff1}x + ${const1} - ${coeff2}x + ${const2} = ${result}\\).`;
            answer = `x = ${xVal}`;
            hint = "Combine like terms on each side of the equation. Then, isolate \\(x\\).";
            break;
        case 1:
            const xValP = getRandomInt(-5, 5);
            const outsideCoeff = getRandomInt(2, 4);
            const insideConst = getRandomInt(1, 5);
            const rhs = outsideCoeff * (xValP + insideConst);
            problem = `Solve for \\(x\\): \\(${outsideCoeff}(x + ${insideConst}) = ${rhs}\\).`;
            answer = `x = ${xValP}`;
            hint = "Distribute the number outside the parentheses. Then solve the two-step equation.";
            break;
        case 2:
            const variables = ['a', 'b', 'c', 'x', 'y', 'z'];
            const solveFor = variables[getRandomInt(0, 2)];
            let otherVar1 = variables[getRandomInt(3, 4)];
            let otherVar2 = variables[getRandomInt(4, 5)];

            while (solveFor === otherVar1) otherVar1 = variables[getRandomInt(3, 4)];
            while (solveFor === otherVar2 || otherVar1 === otherVar2) otherVar2 = variables[getRandomInt(4, 5)];

            let eqProblem, eqAnswer;
            const eqType = getRandomInt(0, 1);
            if (eqType === 0) {
                eqProblem = `Solve \\(${solveFor}${otherVar1} + ${otherVar2} = ${variables[getRandomInt(0, 5)]}\\) for \\(${solveFor}\\).`;
                eqAnswer = `${solveFor} = \\frac{${variables[getRandomInt(0, 5)]} - ${otherVar2}}{${otherVar1}}`;
            } else {
                const v1 = 'A', v2 = 'l', v3 = 'w';
                eqProblem = `Solve \\(${v1} = ${v2}${v3}\\) for \\(${v2}\\).`;
                eqAnswer = `${v2} = \\frac{${v1}}{${v3}}`;
            }
            problem = `Solve the equation: ${eqProblem}`;
            answer = eqAnswer;
            hint = "Isolate the variable you are solving for using inverse operations, treating other variables as constants.";
            break;
        case 3:
            const fracNum = getRandomInt(1, 5);
            const fracDen = getRandomInt(2, 5);
            const constTerm = getRandomInt(1, 10);
            const resultVal = getRandomInt(5, 15);
            const xSolution = (resultVal - constTerm) * fracDen / fracNum;
            if (xSolution !== Math.floor(xSolution)) return generateAlgebraLinearEquations(settings);
            problem = `Solve for \\(x\\): \\(\\frac{${fracNum}x}{${fracDen}} + ${constTerm} = ${resultVal}\\).`;
            answer = `x = ${xSolution}`;
            hint = "Multiply the entire equation by the least common denominator to eliminate fractions, then solve.";
            break;
        case 4:
            const ineqXVal = getRandomInt(-5, 5);
            const ineqCoeffA = getRandomInt(3, 8);
            const ineqConstA = getRandomInt(1, 5);
            const ineqCoeffB = getRandomInt(1, ineqCoeffA - 1);
            const ineqConstB = getRandomInt(6, 10);
            const ineqOp = ['<', '>', '\\le', '\\ge'][getRandomInt(0, 3)];
            let finalIneqOp = ineqOp;
            const combinedCoeff = ineqCoeffA - ineqCoeffB;
            const combinedConst = ineqConstB - ineqConstA;
            const solution = combinedConst / combinedCoeff;

            if (combinedCoeff < 0) {
                if (finalIneqOp === '<') finalIneqOp = '>';
                else if (finalIneqOp === '>') finalIneqOp = '<';
                else if (finalIneqOp === '\\le') finalIneqOp = '\\ge';
                else if (finalIneqOp === '\\ge') finalIneqOp = '\\le';
            }
            problem = `Solve the inequality: \\(${ineqCoeffA}x + ${ineqConstA} ${ineqOp} ${ineqCoeffB}x + ${ineqConstB}\\).`;
            answer = `x ${finalIneqOp} ${formatAnswer(solution, settings.decimalPlaces)}`;
            hint = "Move all \\(x\\) terms to one side and constants to the other. Remember to flip the inequality sign if you multiply or divide by a negative number.";
            break;
    }
    return { problem, answer: `\\(${answer}\\)`, hint };
}

function generateAlgebraQuadraticEquations(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint;

    switch (type) {
        case 0:
            const r1 = getRandomInt(-5, 5);
            let r2 = getRandomInt(-5, 5);
            while (r1 === r2) r2 = getRandomInt(-5, 5);
            const b = -(r1 + r2);
            const c = r1 * r2;
            problem = `Solve by factoring: \\(x^2 ${b >= 0 ? '+' : '-'} ${Math.abs(b)}x ${c >= 0 ? '+' : '-'} ${Math.abs(c)} = 0\\).`;
            answer = `x = ${-r1}, x = ${-r2}`;
            hint = "Find two numbers that multiply to \\(${c}\\) and add to \\(${b}\\).";
            break;
        case 1:
            const root1 = getRandomInt(-3, 3);
            let root2 = getRandomInt(-3, 3);
            while (root1 === root2) root2 = getRandomInt(-3, 3);
            const A = getRandomInt(1, 2);
            const B = -A * (root1 + root2);
            const C = A * root1 * root2;
            problem = `Solve using the quadratic formula: \\(${A}x^2 ${B >= 0 ? '+' : '-'} ${Math.abs(B)}x ${C >= 0 ? '+' : '-'} ${Math.abs(C)} = 0\\).`;
            answer = `x = ${Math.min(root1, root2)}, x = ${Math.max(root1, root2)}`;
            hint = "The quadratic formula is \\(x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\).";
            break;
        case 2:
            const h = getRandomInt(-5, 5);
            const k = getRandomInt(-5, 5);
            const aVal = getRandomInt(1, 3);
            problem = `Find the vertex of the parabola: \\(y = ${aVal}(x ${h >= 0 ? '-' : '+'} ${Math.abs(h)})^2 ${k >= 0 ? '+' : '-'} ${Math.abs(k)}\\).`;
            answer = `Vertex: (${h}, ${k})`;
            hint = "The vertex form of a parabola is \\(y = a(x-h)^2 + k\\), where \\((h, k)\\) is the vertex.";
            break;
        case 3:
            const rA1 = getRandomInt(-3, 3);
            let rA2 = getRandomInt(-3, 3);
            while (rA1 === rA2) rA2 = getRandomInt(-3, 3);
            const factorA = getRandomInt(2, 3);
            const factorB = factorA * (rA1 + rA2);
            const factorC = factorA * rA1 * rA2;
            problem = `Solve by factoring: \\(${factorA}x^2 ${factorB >= 0 ? '+' : '-'} ${Math.abs(factorB)}x ${factorC >= 0 ? '+' : '-'} ${Math.abs(factorC)} = 0\\).`;
            answer = `x = ${rA1}, x = ${rA2}`;
            hint = "Use the 'ac method' or trial and error to factor the quadratic expression when the leading coefficient is not 1.";
            break;
        case 4:
            const xRoot = getRandomInt(-5, 5);
            const constantTerm = getRandomInt(1, 10);
            const bComp = -2 * xRoot;
            const cComp = xRoot * xRoot + constantTerm;
            problem = `Solve by completing the square: \\(x^2 ${bComp >= 0 ? '+' : '-'} ${Math.abs(bComp)}x ${cComp >= 0 ? '+' : '-'} ${Math.abs(cComp)} = 0\\).`;
            answer = `x = ${xRoot} \\pm \\sqrt{${-constantTerm}}`;
            hint = "Move the constant term to the right side, then add \\((\\frac{b}{2})^2\\) to both sides to complete the square on the left.";
            break;
    }
    return { problem, answer: `\\(${answer}\\)`, hint };
}

function generateGeometryAreaPerimeter(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint;

    switch (type) {
        case 0:
            const radius = getRandomInt(3, 10);
            const area = Math.PI * radius * radius;
            const circumference = 2 * Math.PI * radius;
            problem = `A circle has a radius of \\(${radius}\\) units. Find its area and circumference (use \\(\\pi\\) in your answer or round to ${settings.decimalPlaces} decimal places).`;
            answer = `Area = \\(${formatAnswer(area, settings.decimalPlaces)}\\) sq units, Circumference = \\(${formatAnswer(circumference, settings.decimalPlaces)}\\) units`;
            hint = "Area = \\(\\pi r^2\\). Circumference = \\(2 \\pi r\\).";
            break;
        case 1:
            const base1 = getRandomInt(5, 15);
            const base2 = getRandomInt(3, base1 - 1);
            const height = getRandomInt(4, 10);
            const trapArea = 0.5 * (base1 + base2) * height;
            problem = `Find the area of a trapezoid with parallel bases of \\(${base1}\\) cm and \\(${base2}\\) cm, and a height of \\(${height}\\) cm.`;
            answer = `${trapArea} \\(\\text{ cm}^2\\)`;
            hint = "Area of a trapezoid = \\(\\frac{1}{2}(b_1 + b_2)h\\).";
            break;
        case 2:
            const pBase = getRandomInt(6, 12);
            const pHeight = getRandomInt(4, 8);
            const pArea = pBase * pHeight;
            problem = `A parallelogram has a base of \\(${pBase}\\) meters and a height of \\(${pHeight}\\) meters. Find its area.`;
            answer = `${pArea} \\(\\text{ m}^2\\)`;
            hint = "Area of a parallelogram = base \\(\\times\\) height.";
            break;
        case 3:
            const rectL = getRandomInt(5, 10);
            const rectW = getRandomInt(3, 8);
            const triBase = rectW;
            const triHeight = getRandomInt(2, 6);
            const totalArea = (rectL * rectW) + (0.5 * triBase * triHeight);
            problem = `A composite shape is made of a rectangle with length \\(${rectL}\\) and width \\(${rectW}\\), and a triangle on top of the width with height \\(${triHeight}\\). Find the total area.`;
            answer = `${totalArea} square units`;
            hint = "Calculate the area of each individual shape and then add them together.";
            break;
        case 4:
            const diameter = getRandomInt(6, 20);
            const radiusFromDiam = diameter / 2;
            const areaFromDiam = Math.PI * radiusFromDiam * radiusFromDiam;
            const circumferenceFromDiam = Math.PI * diameter;
            problem = `A circle has a diameter of \\(${diameter}\\) units. Find its area and circumference (round to ${settings.decimalPlaces} decimal places).`;
            answer = `Area = \\(${formatAnswer(areaFromDiam, settings.decimalPlaces)}\\) sq units, Circumference = \\(${formatAnswer(circumferenceFromDiam, settings.decimalPlaces)}\\) units`;
            hint = "Radius is half the diameter. Area = \\(\\pi r^2\\). Circumference = \\(\\pi d\\).";
            break;
    }
    return { problem, answer: `\\(${answer}\\)`, hint };
}

function generateGeometryVolumeSurfaceArea(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint;

    switch (type) {
        case 0:
            const length = getRandomInt(2, 6);
            const width = getRandomInt(2, 6);
            const height = getRandomInt(2, 6);
            const volume = length * width * height;
            const surfaceArea = 2 * (length * width + length * height + width * height);
            problem = `A rectangular prism has length \\(${length}\\), width \\(${width}\\), and height \\(${height}\\). Find its volume and surface area.`;
            answer = `Volume = \\(${volume}\\) cubic units, Surface Area = \\(${surfaceArea}\\) square units`;
            hint = "Volume = length \\(\\times\\) width \\(\\times\\) height. Surface Area = \\(2(lw + lh + wh)\\).";
            break;
        case 1:
            const radius = getRandomInt(2, 5);
            const cylHeight = getRandomInt(3, 8);
            const cylVolume = Math.PI * radius * radius * cylHeight;
            const cylSurfaceArea = 2 * Math.PI * radius * (radius + cylHeight);
            problem = `A cylinder has a radius of \\(${radius}\\) cm and a height of \\(${cylHeight}\\) cm. Find its volume and surface area (round to ${settings.decimalPlaces} decimal places).`;
            answer = `Volume = \\(${formatAnswer(cylVolume, settings.decimalPlaces)}\\) \\(\\text{ cm}^3\\), Surface Area = \\(${formatAnswer(cylSurfaceArea, settings.decimalPlaces)}\\) \\(\\text{ cm}^2\\)`;
            hint = "Volume = \\(\\pi r^2 h\\). Surface Area = \\(2\\pi r(r + h)\\).";
            break;
        case 2:
            const coneRadius = getRandomInt(2, 6);
            const coneHeight = getRandomInt(3, 8);
            const coneVolume = (1/3) * Math.PI * coneRadius * coneRadius * coneHeight;
            problem = `A cone has a radius of \\(${coneRadius}\\) inches and a height of \\(${coneHeight}\\) inches. Find its volume (round to ${settings.decimalPlaces} decimal places).`;
            answer = `${formatAnswer(coneVolume, settings.decimalPlaces)} \\(\\text{ in}^3\\)`;
            hint = "Volume of a cone = \\(\\frac{1}{3}\\pi r^2 h\\).";
            break;
        case 3:
            const sphereRadius = getRandomInt(2, 7);
            const sphereVolume = (4/3) * Math.PI * Math.pow(sphereRadius, 3);
            const sphereSurfaceArea = 4 * Math.PI * Math.pow(sphereRadius, 2);
            problem = `A sphere has a radius of \\(${sphereRadius}\\) meters. Find its volume and surface area (round to ${settings.decimalPlaces} decimal places).`;
            answer = `Volume = \\(${formatAnswer(sphereVolume, settings.decimalPlaces)}\\) \\(\\text{ m}^3\\), Surface Area = \\(${formatAnswer(sphereSurfaceArea, settings.decimalPlaces)}\\) \\(\\text{ m}^2\\)`;
            hint = "Volume of a sphere = \\(\\frac{4}{3}\\pi r^3\\). Surface Area of a sphere = \\(4\\pi r^2\\).";
            break;
        case 4:
            const baseSide = getRandomInt(3, 8);
            const pyramidHeight = getRandomInt(4, 10);
            const pyramidVolume = (1/3) * baseSide * baseSide * pyramidHeight;
            problem = `A square pyramid has a base side length of \\(${baseSide}\\) cm and a height of \\(${pyramidHeight}\\) cm. Find its volume.`;
            answer = `${formatAnswer(pyramidVolume, settings.decimalPlaces)} \\(\\text{ cm}^3\\)`;
            hint = "Volume of a pyramid = \\(\\frac{1}{3} \\times \\text{base area} \\times \\text{height}\\).";
            break;
    }
    return { problem, answer: `\\(${answer}\\)`, hint };
}

function generateGeometryTrigonometryBasics(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint, graphId, graphFunction;

    const angles = [30, 45, 60];

    switch (type) {
        case 0:
            const a = getRandomInt(5, 15);
            const theta = angles[getRandomInt(0, angles.length - 1)];
            const sideToFind = getRandomInt(0, 2);
            let problemSide, hintRatio, solutionVar;

            if (theta === 30) {
                const k = getRandomInt(2, 10);
                const hypotenuse_val = 2 * k;
                const opposite = k;
                const adjacent_val = k * Math.sqrt(3);

                if (sideToFind === 0) {
                    problemSide = `Given a right triangle with hypotenuse \\(${hypotenuse_val}\\) and an angle of \\(${theta}^\\circ\\), find the length of the side opposite to the angle.`;
                    solutionVar = `\\(${formatAnswer(opposite, settings.decimalPlaces)}\\)`;
                    hintRatio = "Use sine: \\(\\sin(\\theta) = \\frac{\\text{opposite}}{\\text{hypotenuse}}\\).";
                } else if (sideToFind === 1) {
                    problemSide = `Given a right triangle with hypotenuse \\(${hypotenuse_val}\\) and an angle of \\(${theta}^\\circ\\), find the length of the side adjacent to the angle.`;
                    solutionVar = `\\(${formatAnswer(adjacent_val, settings.decimalPlaces)}\\)`;
                    hintRatio = "Use cosine: \\(\\cos(\\theta) = \\frac{\\text{adjacent}}{\\text{hypotenuse}}\\).";
                } else {
                     problemSide = `Given a right triangle with a side opposite to a \\(${theta}^\\circ\\) angle measuring \\(${opposite}\\), find the length of the hypotenuse.`;
                    solutionVar = `\\(${formatAnswer(hypotenuse_val, settings.decimalPlaces)}\\)`;
                    hintRatio = "Use sine: \\(\\sin(\\theta) = \\frac{\\text{opposite}}{\\text{hypotenuse}}\\).";
                }

                graphId = `triangle-graph-${Date.now()}`;
                graphFunction = {
                    boundingbox: [0, hypotenuse_val + 2, hypotenuse_val + 2, 0],
                    functions: [],
                    labels: [
                        { x: k * Math.sqrt(3) / 2, y: k / 2, text: `${theta}°`, options: { fixed: true, offset: [0,0] } },
                        { x: k * Math.sqrt(3), y: 0, text: 'B', options: { fixed: true, offset: [5, -15] } },
                        { x: 0, y: 0, text: 'A', options: { fixed: true, offset: [-15, -15] } },
                        { x: 0, y: k, text: 'C', options: { fixed: true, offset: [-15, 5] } },
                    ]
                };
                const ptA = [0, 0];
                const ptB = [k * Math.sqrt(3), 0];
                const ptC = [0, k];
                graphFunction.functions.push({ type: 'line', point1: ptA, point2: ptB, options: { strokeColor: 'black' } });
                graphFunction.functions.push({ type: 'line', point1: ptB, point2: ptC, options: { strokeColor: 'black' } });
                graphFunction.functions.push({ type: 'line', point1: ptC, point2: ptA, options: { strokeColor: 'black' } });
                const p1 = [0,0];
                const p2 = [0.5, 0];
                const p3 = [0, 0.5];
                graphFunction.functions.push({ type: 'point', x: p1[0], y: p1[1], options: { visible: false } });
                graphFunction.functions.push({ type: 'point', x: p2[0], y: p2[1], options: { visible: false } });
                graphFunction.functions.push({ type: 'point', x: p3[0], y: p3[1], options: { visible: false } });
                graphFunction.functions.push({ type: 'line', point1: p2, point2: [p2[0], p3[1]], options: { strokeColor: 'black', strokeWidth: 1 } });
                graphFunction.functions.push({ type: 'line', point1: [p2[0], p3[1]], point2: p3, options: { strokeColor: 'black', strokeWidth: 1 } });

            } else if (theta === 45) {
                const k = getRandomInt(2, 10);
                const leg_val = k;
                const hypotenuse_val = k * Math.sqrt(2);

                if (sideToFind === 0 || sideToFind === 1) {
                    problemSide = `Given a right triangle with hypotenuse \\(${formatAnswer(hypotenuse_val, settings.decimalPlaces)}\\) and an angle of \\(${theta}^\\circ\\), find the length of one of the legs.`;
                    solutionVar = `\\(${formatAnswer(leg_val, settings.decimalPlaces)}\\)`;
                    hintRatio = "Use sine or cosine: \\(\\sin(\\theta) = \\frac{\\text{opposite}}{\\text{hypotenuse}}\\).";
                } else {
                    problemSide = `Given a right triangle with a leg measuring \\(${leg_val}\\) and an angle of \\(${theta}^\\circ\\), find the length of the hypotenuse.`;
                    solutionVar = `\\(${formatAnswer(hypotenuse_val, settings.decimalPlaces)}\\)`;
                    hintRatio = "Use sine or cosine: \\(\\cos(\\theta) = \\frac{\\text{adjacent}}{\\text{hypotenuse}}\\).";
                }

                graphId = `triangle-graph-${Date.now()}`;
                graphFunction = {
                    boundingbox: [0, hypotenuse_val + 2, hypotenuse_val + 2, 0],
                    functions: [],
                    labels: [
                        { x: k/2, y: k/2, text: `${theta}°`, options: { fixed: true, offset: [0,0] } },
                        { x: k, y: 0, text: 'B', options: { fixed: true, offset: [5, -15] } },
                        { x: 0, y: 0, text: 'A', options: { fixed: true, offset: [-15, -15] } },
                        { x: 0, y: k, text: 'C', options: { fixed: true, offset: [-15, 5] } },
                    ]
                };
                const ptA = [0, 0];
                const ptB = [k, 0];
                const ptC = [0, k];
                graphFunction.functions.push({ type: 'line', point1: ptA, point2: ptB, options: { strokeColor: 'black' } });
                graphFunction.functions.push({ type: 'line', point1: ptB, point2: ptC, options: { strokeColor: 'black' } });
                graphFunction.functions.push({ type: 'line', point1: ptC, point2: ptA, options: { strokeColor: 'black' } });
                const p1 = [0,0];
                const p2 = [0.5, 0];
                const p3 = [0, 0.5];
                graphFunction.functions.push({ type: 'point', x: p1[0], y: p1[1], options: { visible: false } });
                graphFunction.functions.push({ type: 'point', x: p2[0], y: p2[1], options: { visible: false } });
                graphFunction.functions.push({ type: 'point', x: p3[0], y: p3[1], options: { visible: false } });
                graphFunction.functions.push({ type: 'line', point1: p2, point2: [p2[0], p3[1]], options: { strokeColor: 'black', strokeWidth: 1 } });
                graphFunction.functions.push({ type: 'line', point1: [p2[0], p3[1]], point2: p3, options: { strokeColor: 'black', strokeWidth: 1 } });
            } else if (theta === 60) {
                const k = getRandomInt(2, 10);
                const opposite_val = k * Math.sqrt(3);
                const adjacent_val = k;
                const hypotenuse_val = 2 * k;

                if (sideToFind === 0) {
                    problemSide = `Given a right triangle with an adjacent side measuring \\(${adjacent_val}\\) and an angle of \\(${theta}^\\circ\\), find the length of the side opposite to the angle.`;
                    solutionVar = `\\(${formatAnswer(opposite_val, settings.decimalPlaces)}\\)`;
                    hintRatio = "Use tangent: \\(\\tan(\\theta) = \\frac{\\text{opposite}}{\\text{adjacent}}\\).";
                } else if (sideToFind === 1) {
                    problemSide = `Given a right triangle with an opposite side measuring \\(${opposite_val}\\) and an angle of \\(${theta}^\\circ\\), find the length of the side adjacent to the angle.`;
                    solutionVar = `\\(${formatAnswer(adjacent_val, settings.decimalPlaces)}\\)`;
                    hintRatio = "Use tangent: \\(\\tan(\\theta) = \\frac{\\text{opposite}}{\\text{adjacent}}\\).";
                } else {
                    problemSide = `Given a right triangle with an opposite side measuring \\(${opposite_val}\\) and an angle of \\(${theta}^\\circ\\), find the length of the hypotenuse.`;
                    solutionVar = `\\(${formatAnswer(hypotenuse_val, settings.decimalPlaces)}\\)`;
                    hintRatio = "Use sine: \\(\\sin(\\theta) = \\frac{\\text{opposite}}{\\text{hypotenuse}}\\).";
                }

                graphId = `triangle-graph-${Date.now()}`;
                graphFunction = {
                    boundingbox: [0, hypotenuse_val + 2, hypotenuse_val + 2, 0],
                    functions: [],
                    labels: [
                        { x: k * Math.sqrt(3) / 2, y: k / 2, text: `${theta}°`, options: { fixed: true, offset: [0,0] } },
                        { x: k, y: 0, text: 'B', options: { fixed: true, offset: [5, -15] } },
                        { x: 0, y: 0, text: 'A', options: { fixed: true, offset: [-15, -15] } },
                        { x: k, y: k * Math.sqrt(3), text: 'C', options: { fixed: true, offset: [-15, 5] } },
                    ]
                };
                const ptA = [0, 0];
                const ptB = [k, 0];
                const ptC = [k, k * Math.sqrt(3)];
                graphFunction.functions.push({ type: 'line', point1: ptA, point2: ptB, options: { strokeColor: 'black' } });
                graphFunction.functions.push({ type: 'line', point1: ptB, point2: ptC, options: { strokeColor: 'black' } });
                graphFunction.functions.push({ type: 'line', point1: ptC, point2: ptA, options: { strokeColor: 'black' } });
                const p1 = [k,0];
                const p2 = [k, 0.5];
                const p3 = [k-0.5, 0];
                graphFunction.functions.push({ type: 'point', x: p1[0], y: p1[1], options: { visible: false } });
                graphFunction.functions.push({ type: 'point', x: p2[0], y: p2[1], options: { visible: false } });
                graphFunction.functions.push({ type: 'point', x: p3[0], y: p3[1], options: { visible: false } });
                graphFunction.functions.push({ type: 'line', point1: p2, point2: [p3[0], p2[1]], options: { strokeColor: 'black', strokeWidth: 1 } });
                graphFunction.functions.push({ type: 'line', point1: [p3[0], p2[1]], point2: p3, options: { strokeColor: 'black', strokeWidth: 1 } });

            } else {
                problemSide = `A right triangle has a hypotenuse of length \\(${a}\\) and an angle of \\(${theta}^\\circ\\). Find the length of the side opposite to the angle.`;
                solutionVar = `\\(${formatAnswer(a * Math.sin(theta * Math.PI / 180), settings.decimalPlaces)}\\)`;
                hintRatio = "Use sine: \\(\\sin(\\theta) = \\frac{\\text{opposite}}{\\text{hypotenuse}}\\).";
            }

            problem = problemSide;
            answer = solutionVar;
            hint = hintRatio;
            break;
        case 1:
            const opp = getRandomInt(3, 10);
            const adj = getRandomInt(3, 10);
            const hyp = Math.sqrt(opp * opp + adj * adj);
            if (hyp !== Math.floor(hyp)) return generateGeometryTrigonometryBasics(settings);

            const angleOpposite = formatAnswer(Math.round(Math.asin(opp / hyp) * 180 / Math.PI), 0);
            problem = `In a right triangle, the side opposite an angle is \\(${opp}\\) and the hypotenuse is \\(${hyp}\\). Find the measure of the angle to the nearest degree.`;
            answer = `${angleOpposite}^\\circ`;
            hint = "Use inverse sine: \\(\\theta = \\sin^{-1}(\\frac{\\text{opposite}}{\\text{hypotenuse}})\\).";
            break;
        case 2:
            const degrees = getRandomInt(30, 360);
            const radians = degrees * (Math.PI / 180);
            problem = `Convert \\(${degrees}^\\circ\\) to radians (express in terms of \\(\\pi\\) if possible, otherwise round to ${settings.decimalPlaces} decimal places).`;
            let radAnswer;
            if (degrees % 180 === 0) {
                radAnswer = `${degrees / 180}\\pi`;
            } else if (degrees % 90 === 0) {
                radAnswer = `${degrees / 90}\\frac{\\pi}{2}`;
            } else if (degrees % 60 === 0) {
                radAnswer = `${degrees / 60}\\frac{\\pi}{3}`;
            } else if (degrees % 45 === 0) {
                radAnswer = `${degrees / 45}\\frac{\\pi}{4}`;
            } else if (degrees % 30 === 0) {
                radAnswer = `${degrees / 30}\\frac{\\pi}{6}`;
            } else {
                radAnswer = formatAnswer(radians, settings.decimalPlaces);
            }
            answer = `${radAnswer}\\text{ radians}`;
            hint = "To convert degrees to radians, multiply by \\(\\frac{\\pi}{180^\\circ}\\).";
            break;
        case 3:
            const side1 = getRandomInt(5, 10);
            const side2 = getRandomInt(5, 10);
            const includedAngle = angles[getRandomInt(0, angles.length - 1)];
            const areaTriSine = 0.5 * side1 * side2 * Math.sin(includedAngle * Math.PI / 180);
            problem = `Find the area of a triangle with two sides measuring \\(${side1}\\) cm and \\(${side2}\\) cm, and the included angle is \\(${includedAngle}^\\circ\\) (round to ${settings.decimalPlaces} decimal places).`;
            answer = `${formatAnswer(areaTriSine, settings.decimalPlaces)} \\(\\text{ cm}^2\\)`;
            hint = "Area of a triangle = \\(\\frac{1}{2}ab\\sin(C)\\), where \\(a\\) and \\(b\\) are two sides and \\(C\\) is the included angle.";
            break;
        case 4:
            const angleA_ls = getRandomInt(30, 70);
            const sideA_ls = getRandomInt(5, 15);
            const angleB_ls = getRandomInt(30, 70);
            if (angleA_ls + angleB_ls >= 180) return generateGeometryTrigonometryBasics(settings);
            const sideB_ls = (sideA_ls * Math.sin(angleB_ls * Math.PI / 180)) / Math.sin(angleA_ls * Math.PI / 180);
            problem = `In a triangle, angle \\(A = ${angleA_ls}^\\circ\\), side \\(a = ${sideA_ls}\\), and angle \\(B = ${angleB_ls}^\\circ\\). Find the length of side \\(b\\) (round to ${settings.decimalPlaces} decimal places).`;
            answer = `${formatAnswer(sideB_ls, settings.decimalPlaces)}`;
            hint = "Use the Law of Sines: \\(\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}\\).";
            break;
    }
    return { problem, answer: `\\(${answer}\\)`, hint, graphId, graphFunction };
}

function generatePrecalcFunctionsGraphing(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint, graphId, graphFunction;

    switch (type) {
        case 0:
            const degree = getRandomInt(2, 4);
            const leadingCoeff = getRandomInt(-5, 5);
            if (leadingCoeff === 0) return generatePrecalcFunctionsGraphing(settings);
            const terms = Array.from({ length: degree + 1 }, (_, i) => i === degree ? leadingCoeff : getRandomInt(-5, 5));
            const poly = formatPolynomial(terms);
            problem = `Consider the polynomial function \\(f(x) = ${poly}\\). What is its degree and leading coefficient?`;
            answer = `Degree: \\(${degree}\\), Leading Coefficient: \\(${leadingCoeff}\\)`;
            hint = "The degree is the highest exponent of \\(x\\), and the leading coefficient is the coefficient of the term with the highest exponent.";
            break;
        case 1:
            const funcType = getRandomInt(0, 1);
            if (funcType === 0) {
                const m = getRandomInt(-5, 5);
                if (m === 0) return generatePrecalcFunctionsGraphing(settings);
                const b = getRandomInt(0, 5);
                problem = `Find the inverse function \\(f^{-1}(x)\\) for \\(f(x) = ${m}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)}\\).`;
                const inverseM = formatFraction(1, m);
                const inverseB = formatFraction(-b, m);
                answer = `f^{-1}(x) = ${inverseM}x ${inverseB >= 0 ? '+' : '-'} ${Math.abs(inverseB)}`;
                hint = "Replace \\(f(x)\\) with \\(y\\), swap \\(x\\) and \\(y\\), then solve for \\(y\\).";
            } else {
                const c = getRandomInt(1, 10);
                problem = `Find the inverse function \\(f^{-1}(x)\\) for \\(f(x) = x^2 ${c >= 0 ? '+' : '-'} ${Math.abs(c)}\\), where \\(x \\ge 0\\).`;
                answer = `f^{-1}(x) = \\sqrt{x ${c <= 0 ? '+' : '-'} ${Math.abs(c)}}\\, \\text{for } x \\ge ${c}`;
                hint = "Replace \\(f(x)\\) with \\(y\\), swap \\(x\\) and \\(y\\), then solve for \\(y\\). Remember to consider the domain restriction for the inverse of \\(x^2\\).";
            }
            break;
        case 2:
            const graphFuncType = getRandomInt(0, 1);
            if (graphFuncType === 0) {
                const m = getRandomInt(-2, 2);
                const b = getRandomInt(-3, 3);
                problem = `Graph the function \\(y = ${m}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)}\\).`;
                answer = `A line with slope \\(${m}\\) and y-intercept \\((${0}, ${b})\\).`;
                graphId = `graph-linear-${Date.now()}`;
                graphFunction = {
                    functions: [{ type: 'expression', expression: `function(x){ return ${m}*x + ${b}; }` }],
                    boundingbox: [-5, 5, 5, -5]
                };
                hint = "Plot the y-intercept, then use the slope (rise over run) to find other points.";
            } else {
                const a = getRandomInt(-1, 1);
                if (a === 0) return generatePrecalcFunctionsGraphing(settings);
                const c = getRandomInt(-3, 3);
                problem = `Graph the function \\(y = ${a === 1 ? '' : a}x^2 ${c >= 0 ? '+' : '-'} ${Math.abs(c)}\\).`;
                answer = `A parabola opening ${a > 0 ? 'upwards' : 'downwards'} with vertex at \\((${0}, ${c})\\).`;
                graphId = `graph-quadratic-${Date.now()}`;
                graphFunction = {
                    functions: [{ type: 'expression', expression: `function(x){ return ${a}*x*x + ${c}; }` }],
                    boundingbox: [-5, 5, 5, -5]
                };
                hint = "Identify the vertex and axis of symmetry. Plot a few points around the vertex.";
            }
            break;
        case 3:
            const breakpoint = getRandomInt(-2, 2);
            const func1_m = getRandomInt(1, 3);
            const func1_b = getRandomInt(-5, 5);
            const func2_m = getRandomInt(1, 3);
            const func2_b = getRandomInt(-5, 5);
            const evalPoint = getRandomInt(breakpoint - 3, breakpoint + 3);
            let piecewiseAnswer;
            let condition1, condition2;

            if (getRandomInt(0, 1) === 0) {
                condition1 = `x \\le ${breakpoint}`;
                condition2 = `x > ${breakpoint}`;
                if (evalPoint <= breakpoint) {
                    piecewiseAnswer = func1_m * evalPoint + func1_b;
                } else {
                    piecewiseAnswer = func2_m * evalPoint + func2_b;
                }
            } else {
                condition1 = `x < ${breakpoint}`;
                condition2 = `x \\ge ${breakpoint}`;
                if (evalPoint < breakpoint) {
                    piecewiseAnswer = func1_m * evalPoint + func1_b;
                } else {
                    piecewiseAnswer = func2_m * evalPoint + func2_b;
                }
            }

            problem = `Evaluate \\(f(${evalPoint})\\) for the piecewise function:\n\\[f(x) = \\begin{cases} ${func1_m}x ${func1_b >= 0 ? '+' : '-'} ${Math.abs(func1_b)}, & \\text{if } ${condition1} \\\\ ${func2_m}x ${func2_b >= 0 ? '+' : '-'} ${Math.abs(func2_b)}, & \\text{if } ${condition2} \\end{cases}\\]`;
            answer = `${piecewiseAnswer}`;
            hint = "Determine which condition the input value satisfies, then use the corresponding function definition to evaluate.";
            break;
        case 4:
            const funcChoice = getRandomInt(0, 2);
            let funcExp, funcTypeAns, funcHint;

            if (funcChoice === 0) {
                const coeff = getRandomInt(1, 3);
                const constTerm = getRandomInt(1, 5);
                funcExp = `${coeff}x^2 + ${constTerm}`;
                funcTypeAns = "Even";
                funcHint = "An even function satisfies \\(f(-x) = f(x)\\).";
            } else if (funcChoice === 1) {
                const coeff = getRandomInt(1, 3);
                funcExp = `${coeff}x^3`;
                funcTypeAns = "Odd";
                funcHint = "An odd function satisfies \\(f(-x) = -f(x)\\).";
            } else {
                const coeff1 = getRandomInt(1, 3);
                const coeff2 = getRandomInt(1, 3);
                const constTerm = getRandomInt(1, 5);
                funcExp = `${coeff1}x^2 + ${coeff2}x + ${constTerm}`;
                funcTypeAns = "Neither";
                funcHint = "Check if \\(f(-x) = f(x)\\) (even) or \\(f(-x) = -f(x)\\) (odd). If neither, it's neither.";
            }
            problem = `Determine if the function \\(f(x) = ${funcExp}\\) is even, odd, or neither.`;
            answer = funcTypeAns;
            hint = funcHint;
            break;
    }
    return { problem, answer: `\\(${answer}\\)`, hint, graphId, graphFunction };
}

function generatePrecalcLogExp(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint;

    switch (type) {
        case 0:
            const base = getRandomInt(2, 5);
            const exponent = getRandomInt(2, 4);
            const result = Math.pow(base, exponent);
            problem = `Solve for \\(x\\): \\(${base}^x = ${result}\\).`;
            answer = `x = ${exponent}`;
            hint = "Rewrite the number on the right side as a power of the base on the left side.";
            break;
        case 1:
            const logBase = getRandomInt(2, 5);
            const logResult = getRandomInt(2, 4);
            const logArg = Math.pow(logBase, logResult);
            problem = `Solve for \\(x\\): \\(\\log_{${logBase}}(x) = ${logResult}\\).`;
            answer = `x = ${logArg}`;
            hint = "Convert the logarithmic equation to an exponential equation: if \\(\\log_b(x) = y\\), then \\(b^y = x\\).";
            break;
        case 2:
            const logOp = getRandomInt(0, 1);
            if (logOp === 0) {
                const var1 = ['x', 'a'][getRandomInt(0,1)];
                const var2 = ['y', 'b'][getRandomInt(0,1)];
                if (var1 === var2) return generatePrecalcLogExp(settings);
                const opSymbol = getRandomInt(0, 1);
                problem = `Expand the logarithmic expression: \\(\\log(${var1}${opSymbol === 0 ? '' : '\\frac{'}${var2}${opSymbol === 0 ? '' : '}'})$\\).`;
                answer = `\\(\\log(${var1}) ${opSymbol === 0 ? '+' : '-'} \\log(${var2})\\)`;
                hint = "Use the properties of logarithms: \\(\\log(AB) = \\log(A) + \\log(B)\\) and \\(\\log(\\frac{A}{B}) = \\log(A) - \\log(B)\\).";
            } else {
                const var1 = ['m', 'p'][getRandomInt(0,1)];
                const var2 = ['n', 'q'][getRandomInt(0,1)];
                 if (var1 === var2) return generatePrecalcLogExp(settings);
                const opSymbol = getRandomInt(0, 1);
                problem = `Condense the logarithmic expression: \\(\\log(${var1}) ${opSymbol === 0 ? '+' : '-'} \\log(${var2})\\).`;
                answer = `\\(\\log(${var1}${opSymbol === 0 ? '' : '\\frac{'}${var2}${opSymbol === 0 ? '' : '}'})$\\)`;
                hint = "Use the properties of logarithms: \\(\\log(A) + \\log(B) = \\log(AB)\\) and \\(\\log(A) - \\log(B) = \\log(\\frac{A}{B})\\).";
            }
            break;
        case 3:
            const originalBase = getRandomInt(2, 10);
            const arg = getRandomInt(10, 100);
            const newBase = getRandomInt(2, 10);
            if (originalBase === newBase) return generatePrecalcLogExp(settings);
            problem = `Rewrite \\(\\log_{${originalBase}}(${arg})\\) using the change of base formula with base \\(${newBase}\\).`;
            answer = `\\frac{\\log_{${newBase}}(${arg})}{\\log_{${newBase}}(${originalBase})}`;
            hint = "The change of base formula is \\(\\log_b(x) = \\frac{\\log_a(x)}{\\log_a(b)}\\).";
            break;
        case 4:
            const base1 = getRandomInt(2, 5);
            const base2 = getRandomInt(2, 5);
            if (base1 === base2) return generatePrecalcLogExp(settings);
            const expVal = getRandomInt(1, 3);
            const resultVal = Math.pow(base2, expVal);
            problem = `Solve for \\(x\\) (round to ${settings.decimalPlaces} decimal places): \\(${base1}^x = ${resultVal}\\).`;
            answer = formatAnswer(Math.log(resultVal) / Math.log(base1), settings.decimalPlaces);
            hint = "Take the logarithm of both sides (e.g., natural log or log base 10) and use logarithm properties to solve for \\(x\\).";
            break;
    }
    return { problem, answer: `\\(${answer}\\)`, hint };
}

function generatePrecalcTrigEquations(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint;

    const commonAnglesRad = ['0', '\\frac{\\pi}{6}', '\\frac{\\pi}{4}', '\\frac{\\pi}{3}', '\\frac{\\pi}{2}', '\\pi', '\\frac{3\\pi}{2}', '2\\pi'];
    const commonAnglesDeg = [0, 30, 45, 60, 90, 180, 270, 360];

    switch (type) {
        case 0:
            const trigFunc = ['\\sin', '\\cos', '\\tan'][getRandomInt(0, 2)];
            let val, solIndex;
            if (trigFunc === '\\sin') {
                const sinVals = [0, 0.5, Math.sqrt(2)/2, Math.sqrt(3)/2, 1, -0.5, -Math.sqrt(2)/2, -Math.sqrt(3)/2, -1];
                val = sinVals[getRandomInt(0, sinVals.length -1)];
                if (val === 0) solIndex = [0, 5];
                else if (val === 0.5) solIndex = [1, 2];
                else if (val === Math.sqrt(2)/2) solIndex = [2, 3];
                else if (val === Math.sqrt(3)/2) solIndex = [3, 4];
                else if (val === 1) solIndex = [4];
                else if (val === -0.5) solIndex = [7, 6];
                else if (val === -Math.sqrt(2)/2) solIndex = [6, 7];
                else if (val === -Math.sqrt(3)/2) solIndex = [7, 8];
                else if (val === -1) solIndex = [6];
                const solutions = solIndex.map(idx => commonAnglesRad[idx]).filter(Boolean);

                problem = `Solve for \\(x\\) in the interval \\([0, 2\\pi]\\): \\(${trigFunc}(x) = ${formatAnswer(val, settings.decimalPlaces)}\\).`;
                answer = `x = ${solutions.join(', x = ')}`;
                hint = "Identify the angles in the unit circle where the sine value is equal to the given value.";
            } else if (trigFunc === '\\cos') {
                const cosVals = [0, 0.5, Math.sqrt(2)/2, Math.sqrt(3)/2, 1, -0.5, -Math.sqrt(2)/2, -Math.sqrt(3)/2, -1];
                val = cosVals[getRandomInt(0, cosVals.length -1)];
                if (val === 0) solIndex = [4, 6];
                else if (val === 0.5) solIndex = [3, 9];
                else if (val === Math.sqrt(2)/2) solIndex = [2, 10];
                else if (val === Math.sqrt(3)/2) solIndex = [1, 11];
                else if (val === 1) solIndex = [0];
                else if (val === -0.5) solIndex = [4, 7];
                else if (val === -Math.sqrt(2)/2) solIndex = [5, 6];
                else if (val === -Math.sqrt(3)/2) solIndex = [6, 8];
                else if (val === -1) solIndex = [5];
                const solutions = solIndex.map(idx => {
                    if (idx < commonAnglesRad.length) return commonAnglesRad[idx];
                    return `\\text{arctan}(${formatAnswer(Math.tan(val), settings.decimalPlaces)})`
                }).filter(Boolean);

                problem = `Solve for \\(x\\) in the interval \\([0, 2\\pi]\\): \\(${trigFunc}(x) = ${formatAnswer(val, settings.decimalPlaces)}\\).`;
                answer = `x = ${solutions.join(', x = ')}`;
                hint = "Identify the angles in the unit circle where the cosine value is equal to the given value.";
            } else {
                const tanVals = [0, Math.sqrt(3)/3, 1, Math.sqrt(3), -Math.sqrt(3)/3, -1, -Math.sqrt(3)];
                val = tanVals[getRandomInt(0, tanVals.length -1)];
                let solutions;
                if (val === 0) solutions = [commonAnglesRad[0], commonAnglesRad[5]];
                else if (val === Math.sqrt(3)/3) solutions = [commonAnglesRad[1], commonAnglesRad[5] + commonAnglesRad[1]];
                else if (val === 1) solutions = [commonAnglesRad[2], commonAnglesRad[5] + commonAnglesRad[2]];
                else if (val === Math.sqrt(3)) solutions = [commonAnglesRad[3], commonAnglesRad[5] + commonAnglesRad[3]];
                else if (val === -Math.sqrt(3)/3) solutions = [`\\frac{5\\pi}{6}`, `\\frac{11\\pi}{6}`];
                else if (val === -1) solutions = [`\\frac{3\\pi}{4}`, `\\frac{7\\pi}{4}`];
                else if (val === -Math.sqrt(3)) solutions = [`\\frac{2\\pi}{3}`, `\\frac{5\\pi}{3}`];
                solutions = solutions.filter(Boolean);

                problem = `Solve for \\(x\\) in the interval \\([0, 2\\pi]\\): \\(${trigFunc}(x) = ${formatAnswer(val, settings.decimalPlaces)}\\).`;
                answer = `x = ${solutions.join(', x = ')}`;
                hint = "Identify the angles in the unit circle where the tangent value is equal to the given value. Remember tangent has a period of \\(\\pi\\).";
            }
            break;
        case 1:
            const trigFunc2 = ['\\sin', '\\cos'][getRandomInt(0, 1)];
            const angleVal = commonAnglesRad[getRandomInt(0, 4)];
            let eqProblem2, solAnswer2;

            if (trigFunc2 === '\\sin') {
                eqProblem2 = `Find all solutions for \\(x\\): \\(${trigFunc2}(x) = ${formatAnswer(Math.sin(eval(angleVal.replace('\\pi', 'Math.PI'))), settings.decimalPlaces)}\\)`;
                solAnswer2 = `x = ${angleVal} + 2n\\pi\\text{ and } x = (\\pi - ${angleVal}) + 2n\\pi\\text{, where } n \\text{ is an integer}`;
                if (angleVal === '0') solAnswer2 = `x = n\\pi\\text{, where } n \\text{ is an integer}`;
            } else {
                eqProblem2 = `Find all solutions for \\(x\\): \\(${trigFunc2}(x) = ${formatAnswer(Math.cos(eval(angleVal.replace('\\pi', 'Math.PI'))), settings.decimalPlaces)}\\)`;
                solAnswer2 = `x = \\pm ${angleVal} + 2n\\pi\\text{, where } n \\text{ is an integer}`;
                if (angleVal === '\\frac{\\pi}{2}') solAnswer2 = `x = \\frac{\\pi}{2} + n\\pi\\text{, where } n \\text{ is an integer}`;
            }
            problem = eqProblem2;
            answer = solAnswer2;
            hint = "Use the general solution formulas for sine and cosine, considering their periodicity.";
            break;
        case 2:
            const identityType = getRandomInt(0, 1);
            let problemId, answerId, hintId;

            if (identityType === 0) {
                problemId = `Verify the identity: \\(\\sin^2(x) + \\cos^2(x) = 1\\).`;
                answerId = "Start with the left side: \\(\\sin^2(x) + \\cos^2(x)\\). Using the Pythagorean identity, this simplifies to \\(1\\), which is the right side. Thus, the identity is verified.";
                hintId = "Recall the Pythagorean identity.";
            } else {
                problemId = `Verify the identity: \\(\\tan(x) = \\frac{\\sin(x)}{\\cos(x)}\\).`;
                answerId = "Start with the right side: \\(\\frac{\\sin(x)}{\\cos(x)}\\). By definition, \\(\\frac{\\text{opposite}}{\\text{hypotenuse}} \\div \\frac{\\text{adjacent}}{\\text{hypotenuse}} = \\frac{\\text{opposite}}{\\text{adjacent}}\\), which is \\(\\tan(x)\\). Thus, the identity is verified.";
                hintId = "Recall the definitions of sine, cosine, and tangent in terms of opposite, adjacent, and hypotenuse, or the quotient identity.";
            }
            problem = problemId;
            answer = answerId;
            hint = hintId;
            break;
        case 3:
            const multAngleFunc = ['\\sin', '\\cos'][getRandomInt(0, 1)];
            const multAngleCoeff = getRandomInt(2, 3);
            const multAngleVal = 0.5;
            let multAngleProblem, multAngleAnswer, multAngleHint;

            if (multAngleFunc === '\\sin') {
                multAngleProblem = `Solve for \\(x\\) in the interval \\([0, 2\\pi]\\): \\(${multAngleFunc}(${multAngleCoeff}x) = ${multAngleVal}\\).`;
                multAngleAnswer = `x = \\frac{\\pi}{${12/multAngleCoeff}} + \\frac{2n\\pi}{${multAngleCoeff}}, x = \\frac{5\\pi}{${12/multAngleCoeff}} + \\frac{2n\\pi}{${multAngleCoeff}}\\text{, where } n \\text{ is an integer}`;
                if (multAngleCoeff === 2) { // Simplify for 2x
                    multAngleAnswer = `x = \\frac{\\pi}{12} + n\\pi, x = \\frac{5\\pi}{12} + n\\pi\\text{, where } n \\text{ is an integer}`;
                } else if (multAngleCoeff === 3) { // Simplify for 3x
                    multAngleAnswer = `x = \\frac{\\pi}{18} + \\frac{2n\\pi}{3}, x = \\frac{5\\pi}{18} + \\frac{2n\\pi}{3}\\text{, where } n \\text{ is an integer}`;
                }
                multAngleHint = "Let \\(u = ${multAngleCoeff}x\\) and solve for \\(u\\) first, considering all possible rotations. Then substitute back to solve for \\(x\\).";
            } else {
                multAngleProblem = `Solve for \\(x\\) in the interval \\([0, 2\\pi]\\): \\(${multAngleFunc}(${multAngleCoeff}x) = ${multAngleVal}\\).`;
                multAngleAnswer = `x = \\frac{\\pi}{${6/multAngleCoeff}} + \\frac{2n\\pi}{${multAngleCoeff}}, x = \\frac{5\\pi}{${6/multAngleCoeff}} + \\frac{2n\\pi}{${multAngleCoeff}}\\text{, where } n \\text{ is an integer}`;
                if (multAngleCoeff === 2) { // Simplify for 2x
                    multAngleAnswer = `x = \\frac{\\pi}{6} + n\\pi, x = \\frac{5\\pi}{6} + n\\pi\\text{, where } n \\text{ is an integer}`;
                } else if (multAngleCoeff === 3) { // Simplify for 3x
                    multAngleAnswer = `x = \\frac{\\pi}{9} + \\frac{2n\\pi}{3}, x = \\frac{5\\pi}{9} + \\frac{2n\\pi}{3}\\text{, where } n \\text{ is an integer}`;
                }
                multAngleHint = "Let \\(u = ${multAngleCoeff}x\\) and solve for \\(u\\) first, considering all possible rotations. Then substitute back to solve for \\(x\\).";
            }
            problem = multAngleProblem;
            answer = `\\(${multAngleAnswer}\\)`;
            hint = multAngleHint;
            break;
        case 4:
            const invTrigFunc = ['\\arcsin', '\\arccos', '\\arctan'][getRandomInt(0, 2)];
            let invTrigVal, invTrigProblem, invTrigAnswer, invTrigHint;

            if (invTrigFunc === '\\arcsin') {
                invTrigVal = parseFloat(Math.sin(eval(commonAnglesRad[getRandomInt(1, 3)].replace('\\pi', 'Math.PI'))).toFixed(2));
                invTrigProblem = `Evaluate \\(${invTrigFunc}(${invTrigVal})\\) in radians.`;
                invTrigAnswer = commonAnglesRad[Math.round(Math.asin(invTrigVal) / Math.PI * 6)];
                invTrigHint = "Find the angle in the restricted domain of arcsin ([-pi/2, pi/2]) whose sine is the given value.";
            } else if (invTrigFunc === '\\arccos') {
                invTrigVal = parseFloat(Math.cos(eval(commonAnglesRad[getRandomInt(0, 3)].replace('\\pi', 'Math.PI'))).toFixed(2));
                invTrigProblem = `Evaluate \\(${invTrigFunc}(${invTrigVal})\\) in radians.`;
                invTrigAnswer = commonAnglesRad[Math.round(Math.acos(invTrigVal) / Math.PI * 6)];
                invTrigHint = "Find the angle in the restricted domain of arccos ([0, pi]) whose cosine is the given value.";
            } else {
                invTrigVal = parseFloat(Math.tan(eval(commonAnglesRad[getRandomInt(0, 3)].replace('\\pi', 'Math.PI'))).toFixed(2));
                invTrigProblem = `Evaluate \\(${invTrigFunc}(${invTrigVal})\\) in radians.`;
                invTrigAnswer = commonAnglesRad[Math.round(Math.atan(invTrigVal) / Math.PI * 6)];
                invTrigHint = "Find the angle in the restricted domain of arctan ((-pi/2, pi/2)) whose tangent is the given value.";
            }
            problem = invTrigProblem;
            answer = `\\(${invTrigAnswer}\\)`;
            hint = invTrigHint;
            break;
    }
    return { problem, answer: `\\(${answer}\\)`, hint };
}

function generatePrecalcSequencesSeries(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint;

    switch (type) {
        case 0:
            const a1 = getRandomInt(1, 10);
            const d = getRandomInt(2, 5);
            const n = getRandomInt(5, 10);
            const an = a1 + (n - 1) * d;
            problem = `Find the \\(${n}\\)th term of an arithmetic sequence where the first term is \\(${a1}\\) and the common difference is \\(${d}\\).`;
            answer = `a_${n} = ${an}`;
            hint = "The formula for the \\(n\\)th term of an arithmetic sequence is \\(a_n = a_1 + (n-1)d\\).";
            break;
        case 1:
            const g1 = getRandomInt(1, 5);
            const r = getRandomInt(2, 3);
            const nG = getRandomInt(4, 7);
            const gn = g1 * Math.pow(r, nG - 1);
            problem = `Find the \\(${nG}\\)th term of a geometric sequence where the first term is \\(${g1}\\) and the common ratio is \\(${r}\\).`;
            answer = `g_${nG} = ${gn}`;
            hint = "The formula for the \\(n\\)th term of a geometric sequence is \\(g_n = g_1 \\cdot r^{n-1}\\).";
            break;
        case 2:
            const s_a1 = getRandomInt(1, 10);
            const s_d = getRandomInt(2, 5);
            const s_n = getRandomInt(5, 10);
            const s_an = s_a1 + (s_n - 1) * s_d;
            const sumArithmetic = (s_n / 2) * (s_a1 + s_an);
            problem = `Find the sum of the first \\(${s_n}\\) terms of an arithmetic series where the first term is \\(${s_a1}\\) and the common difference is \\(${s_d}\\).`;
            answer = `${sumArithmetic}`;
            hint = "First find the \\(n\\)th term \\(a_n\\). Then use the sum formula \\(S_n = \\frac{n}{2}(a_1 + a_n)\\).";
            break;
        case 3:
            const s_g1 = getRandomInt(1, 5);
            const s_r = getRandomInt(2, 3);
            const s_nG = getRandomInt(4, 7);
            const sumGeometric = s_g1 * (1 - Math.pow(s_r, s_nG)) / (1 - s_r);
            problem = `Find the sum of the first \\(${s_nG}\\) terms of a geometric series where the first term is \\(${s_g1}\\) and the common ratio is \\(${s_r}\\).`;
            answer = `${sumGeometric}`;
            hint = "The formula for the sum of the first \\(n\\) terms of a geometric series is \\(S_n = a_1 \\frac{1-r^n}{1-r}\\).";
            break;
        case 4:
            const inf_g1 = getRandomInt(1, 10);
            const inf_r_num = getRandomInt(1, 4);
            const inf_r_den = getRandomInt(inf_r_num + 1, 5);
            const inf_r = inf_r_num / inf_r_den;
            const sumInfinite = inf_g1 / (1 - inf_r);
            problem = `Find the sum of the infinite geometric series with first term \\(${inf_g1}\\) and common ratio \\(\\frac{${inf_r_num}}{${inf_r_den}}\\) (round to ${settings.decimalPlaces} decimal places).`;
            answer = `${formatAnswer(sumInfinite, settings.decimalPlaces)}`;
            hint = "The sum of an infinite geometric series is \\(S = \\frac{a_1}{1-r}\\), where \\(|r| < 1\\).";
            break;
    }
    return { problem, answer: `\\(${answer}\\)`, hint };
}

function generateCalculusLimits(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint;

    switch (type) {
        case 0:
            const polyCoeffs = Array.from({ length: getRandomInt(1, 3) + 1 }, () => getRandomInt(-5, 5));
            const limitAt = getRandomInt(-3, 3);
            const polyFn = (x) => polyCoeffs.reduce((acc, coeff, idx) => acc + coeff * Math.pow(x, idx), 0);
            problem = `Evaluate the limit: \\(\\lim_{x \\to ${limitAt}} (${formatPolynomial(polyCoeffs)})\\).`;
            answer = `${polyFn(limitAt)}`;
            hint = "For polynomial functions, limits can often be found by direct substitution.";
            break;
        case 1:
            const a = getRandomInt(1, 5);
            const num = a * a;
            problem = `Evaluate the limit: \\(\\lim_{x \\to ${a}} \\frac{x^2 - ${num}}{x - ${a}}\\).`;
            answer = `${2 * a}`;
            hint = "Factor the numerator as a difference of squares: \\(x^2 - a^2 = (x-a)(x+a)\\). Then cancel out the common factor.";
            break;
        case 2:
            const deg1 = getRandomInt(2, 4);
            const leadCoeff1 = getRandomInt(-5, 5);
            if (leadCoeff1 === 0) return generateCalculusLimits(settings);
            const poly1 = Array.from({ length: deg1 + 1 }, (_, i) => i === deg1 ? leadCoeff1 : getRandomInt(-5, 5));

            const infinityType = getRandomInt(0, 1);
            let infinityAnswer;
            if (infinityType === 0) {
                if (leadCoeff1 > 0) infinityAnswer = '\\infty';
                else infinityAnswer = '-\\infty';
                problem = `Evaluate the limit: \\(\\lim_{x \\to \\infty} (${formatPolynomial(poly1)})\\).`;
            } else {
                if (deg1 % 2 === 0) {
                    if (leadCoeff1 > 0) infinityAnswer = '\\infty';
                    else infinityAnswer = '-\\infty';
                } else {
                    if (leadCoeff1 > 0) infinityAnswer = '-\\infty';
                    else infinityAnswer = '\\infty';
                }
                problem = `Evaluate the limit: \\(\\lim_{x \\to -\\infty} (${formatPolynomial(poly1)})\\).`;
            }
            answer = `${infinityAnswer}`;
            hint = "For polynomial limits at infinity, the limit is determined by the term with the highest degree.";
            break;
        case 3:
            const numDeg = getRandomInt(1, 3);
            const denDeg = getRandomInt(1, 3);
            const numLeadCoeff = getRandomInt(-5, 5);
            const denLeadCoeff = getRandomInt(-5, 5);
            if (numLeadCoeff === 0 || denLeadCoeff === 0) return generateCalculusLimits(settings);

            const numeratorPoly = Array.from({ length: numDeg + 1 }, (_, i) => i === numDeg ? numLeadCoeff : getRandomInt(-5, 5));
            const denominatorPoly = Array.from({ length: denDeg + 1 }, (_, i) => i === denDeg ? denLeadCoeff : getRandomInt(-5, 5));

            let rationalLimitAnswer;
            if (numDeg > denDeg) {
                rationalLimitAnswer = (numLeadCoeff * denLeadCoeff > 0) ? '\\infty' : '-\\infty';
            } else if (numDeg < denDeg) {
                rationalLimitAnswer = '0';
            } else {
                rationalLimitAnswer = formatFraction(numLeadCoeff, denLeadCoeff);
            }
            problem = `Evaluate the limit: \\(\\lim_{x \\to \\infty} \\frac{${formatPolynomial(numeratorPoly)}}{${formatPolynomial(denominatorPoly)}}\\).`;
            answer = `${rationalLimitAnswer}`;
            hint = "Compare the degrees of the numerator and denominator. If degrees are equal, the limit is the ratio of leading coefficients. If numerator degree is higher, the limit is \\(\\pm\\infty\\). If denominator degree is higher, the limit is 0.";
            break;
        case 4:
            const lhopNumCoeff = getRandomInt(1, 3);
            const lhopDenCoeff = getRandomInt(1, 3);
            const lhopAt = 0;
            const lhopType = getRandomInt(0, 1);
            let lhopProblem, lhopAnswer, lhopHint;

            if (lhopType === 0) {
                lhopProblem = `Evaluate the limit: \\(\\lim_{x \\to ${lhopAt}} \\frac{\\sin(${lhopNumCoeff}x)}{${lhopDenCoeff}x}\\).`;
                lhopAnswer = formatFraction(lhopNumCoeff, lhopDenCoeff);
                lhopHint = "This is an indeterminate form (0/0). Apply L'Hopital's Rule by taking the derivative of the numerator and denominator separately.";
            } else {
                lhopProblem = `Evaluate the limit: \\(\\lim_{x \\to ${lhopAt}} \\frac{e^{${lhopNumCoeff}x} - 1}{${lhopDenCoeff}x}\\).`;
                lhopAnswer = formatFraction(lhopNumCoeff, lhopDenCoeff);
                lhopHint = "This is an indeterminate form (0/0). Apply L'Hopital's Rule by taking the derivative of the numerator and denominator separately.";
            }
            problem = lhopProblem;
            answer = `\\(${lhopAnswer}\\)`,
            hint = lhopHint;
            break;
    }
    return { problem, answer: `\\(${answer}\\)`, hint };
}
function generateCalculusIntegrals(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint;

    switch (type) {
        case 0: { // Added curly braces to create a new block scope
            const coeff = getRandomInt(2, 10);
            const power = getRandomInt(1, 4);
            const newPower = power + 1;
            const newCoeffNum = coeff;
            const newCoeffDen = newPower;
            problem = `Find the indefinite integral: \\(\\int ${coeff}x^{${power}} dx\\).`;
            answer = `\\frac{${newCoeffNum}}{${newCoeffDen}}x^{${newPower}} + C`;
            hint = "Use the power rule for integration: \\(\\int x^n dx = \\frac{x^{n+1}}{n+1} + C\\).";
            break;
        }
        case 1: { // Added curly braces
            const lower = getRandomInt(0, 2);
            const upper = getRandomInt(lower + 1, lower + 4);
            const intCoeff = getRandomInt(1, 3);
            const intPower = getRandomInt(0, 2);
            let integralFn;
            let antiderivativeFn;

            if (intPower === 0) {
                integralFn = `${intCoeff}`;
                antiderivativeFn = (x) => intCoeff * x;
            } else if (intPower === 1) {
                integralFn = `${intCoeff}x`;
                antiderivativeFn = (x) => (intCoeff / 2) * x * x;
            } else {
                integralFn = `${intCoeff}x^2`;
                antiderivativeFn = (x) => (intCoeff / 3) * x * x * x;
            }
            const result = antiderivativeFn(upper) - antiderivativeFn(lower);
            problem = `Evaluate the definite integral: \\(\\int_{${lower}}^{${upper}} (${integralFn}) dx\\).`;
            answer = formatAnswer(result, settings.decimalPlaces);
            hint = "First find the antiderivative of the function. Then evaluate it at the upper and lower limits and subtract (Fundamental Theorem of Calculus).";
            break;
        }
        case 2: { // Added curly braces
            const funcType = getRandomInt(0, 1);
            if (funcType === 0) {
                problem = `Find the indefinite integral: \\(\\int e^x dx\\).`;
                answer = `e^x + C`;
                hint = "The integral of \\(e^x\\) is \\(e^x\\).";
            } else {
                problem = `Find the indefinite integral: \\(\\int \\frac{1}{x} dx\\).`;
                answer = `\\ln|x| + C`;
                hint = "The integral of \\(\\frac{1}{x}\\) is the natural logarithm of the absolute value of \\(x\\).";
            }
            break;
        }
        case 3: { // Added curly braces to create a new block scope
            const a = getRandomInt(2, 4);
            const b = getRandomInt(1, 5);
            const n = getRandomInt(2, 4);
            const newPower = n + 1; // This declaration is now in its own block scope
            const newCoeffNum = 1;
            const newCoeffDen = a * newPower;
            problem = `Evaluate the indefinite integral: \\(\\int (${a}x + ${b})^{${n}} dx\\).`;
            answer = `\\frac{${newCoeffNum}}{${newCoeffDen}}(${a}x + ${b})^{${newPower}} + C`;
            hint = "Use u-substitution. Let \\(u = ${a}x + ${b}\\). Then find \\(du\\).";
            break;
        }
        case 4: { // Added curly braces
            const avgLower = getRandomInt(1, 3);
            const avgUpper = getRandomInt(avgLower + 1, avgLower + 3);
            const avgCoeff = getRandomInt(1, 3);
            const avgPower = getRandomInt(0, 1);
            let avgFunc, avgAntideriv;

            if (avgPower === 0) {
                avgFunc = `${avgCoeff}`;
                avgAntideriv = (x) => avgCoeff * x;
            } else {
                avgFunc = `${avgCoeff}x`;
                avgAntideriv = (x) => (avgCoeff / 2) * x * x;
            }
            const definiteIntegral = avgAntideriv(avgUpper) - avgAntideriv(avgLower);
            const avgValue = definiteIntegral / (avgUpper - avgLower);
            problem = `Find the average value of the function \\(f(x) = ${avgFunc}\\) on the interval \\([${avgLower}, ${avgUpper}]\\). (Round to ${settings.decimalPlaces} decimal places)`;
            answer = `${formatAnswer(avgValue, settings.decimalPlaces)}`;
            hint = "The average value of a function \\(f(x)\\) on \\([a, b]\\) is \\(\\frac{1}{b-a}\\int_a^b f(x) dx\\).";
            break;
        }
    }
    return { problem, answer: `\\(${answer}\\)`, hint };
}

function generateCalculusApplications(settings) {
    const type = getRandomInt(0, 4);
    let problem, answer, hint;

    switch (type) {
        case 0:
            const radius = getRandomInt(3, 8);
            const drdt = getRandomInt(1, 3);
            const dAdt = 2 * Math.PI * radius * drdt;
            problem = `The radius of a circle is increasing at a rate of \\(${drdt}\\) cm/s. At the moment when the radius is \\(${radius}\\) cm, what is the rate of change of the circle's area? (Round to ${settings.decimalPlaces} decimal places)`;
            answer = `${formatAnswer(dAdt, settings.decimalPlaces)} \\(\\text{ cm}^2/s\\)`;
            hint = "Differentiate the area formula \\(A = \\pi r^2\\) with respect to time \\(t\\) to find \\(\\frac{dA}{dt}\\).";
            break;
        case 1:
            const perimeter = getRandomInt(20, 40);
            const side = perimeter / 4;
            const maxArea = side * side;
            problem = `A rectangular garden is to be enclosed by \\(${perimeter}\\) feet of fencing. What is the maximum possible area of the garden?`;
            answer = `${maxArea} \\(\\text{ square feet}\\)`;
            hint = "A square will maximize the area for a given perimeter. Let \\(l\\) and \\(w\\) be the dimensions. Perimeter \\(2l + 2w = P\\). Area \\(A = lw\\). Substitute \\(l = \\frac{P}{2} - w\\) into the area formula and find the maximum using calculus (derivative = 0) or by recognizing it's a parabola.";
            break;
        case 2:
            const cylRadiusOpt = getRandomInt(2, 5);
            const cylHeightOpt = getRandomInt(5, 10);
            const fixedVolume = Math.PI * cylRadiusOpt * cylRadiusOpt * cylHeightOpt;
            const optimalRadius = Math.cbrt(fixedVolume / (2 * Math.PI));
            const optimalHeight = fixedVolume / (Math.PI * optimalRadius * optimalRadius);
            const minSurfaceArea = 2 * Math.PI * optimalRadius * (optimalRadius + optimalHeight);
            problem = `A cylindrical can needs to hold \\(${formatAnswer(fixedVolume, 0)}\\) cubic units of liquid. What is the minimum surface area required to make this can? (Round to ${settings.decimalPlaces} decimal places)`;
            answer = `${formatAnswer(minSurfaceArea, settings.decimalPlaces)} square units`;
            hint = "Express the surface area as a function of the radius (or height) using the volume constraint. Then find the derivative and set it to zero to find the optimal dimensions.";
            break;
        case 3:
            const curveCoeff = getRandomInt(1, 3);
            const curvePower = getRandomInt(1, 2);
            const curveLower = getRandomInt(0, 2);
            const curveUpper = getRandomInt(curveLower + 1, curveLower + 3);
            let curveFunc, curveAntideriv;

            if (curvePower === 1) {
                curveFunc = `${curveCoeff}x`;
                curveAntideriv = (x) => (curveCoeff / 2) * x * x;
            } else {
                curveFunc = `${curveCoeff}x^2`;
                curveAntideriv = (x) => (curveCoeff / 3) * x * x * x;
            }
            const areaUnder = curveAntideriv(curveUpper) - curveAntideriv(curveLower);
            problem = `Find the area under the curve \\(y = ${curveFunc}\\) from \\(x = ${curveLower}\\) to \\(x = ${curveUpper}\\). (Round to ${settings.decimalPlaces} decimal places)`;
            answer = `${formatAnswer(areaUnder, settings.decimalPlaces)}`;
            hint = "Evaluate the definite integral of the function over the given interval.";
            break;
        case 4:
            const revCoeff = getRandomInt(1, 2);
            const revPower = 1;
            const revLower = getRandomInt(0, 2);
            const revUpper = getRandomInt(revLower + 1, revLower + 3);
            const volRev = Math.PI * revCoeff * revCoeff * (Math.pow(revUpper, 3) / 3 - Math.pow(revLower, 3) / 3);
            problem = `Find the volume of the solid generated by revolving the region bounded by \\(y = ${revCoeff}x\\), the x-axis, \\(x = ${revLower}\\), and \\(x = ${revUpper}\\) about the x-axis. (Round to ${settings.decimalPlaces} decimal places)`;
            answer = `${formatAnswer(volRev, settings.decimalPlaces)} cubic units`;
            hint = "Use the disk method: \\(V = \\pi \\int_a^b [f(x)]^2 dx\\).";
            break;
    }
    return { problem, answer: `\\(${answer}\\)`, hint };
}