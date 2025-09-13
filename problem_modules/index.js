// 1. Import every 6th-grade problem module.
import { module as ratiosModule } from './g6_ratios_rates_percentages.js';
import { module as arithmeticModule } from './g6_arithmetic_operations.js';
import { module as fractionsDecimalsModule } from './g6_fractions_decimals.js';
import { module as numberSystemModule } from './g6_number_system.js';
import { module as algebraicExpressionsModule } from './g6_algebraic_expressions.js';
import { module as equationsInequalitiesModule } from './g6_equations_inequalities.js';
import { module as geometryModule } from './g6_geometry_area_volume.js';
import { module as coordinatePlaneModule } from './g6_coordinate_plane.js';
import { module as statsIntroModule } from './g6_data_statistics_intro.js';
import { module as centralTendencyModule } from './g6_measures_central_tendency.js';
import { module as dataDisplaysModule } from './g6_data_displays.js';
import { module as probabilityModule } from './g6_probability_basics.js';

// 2. Add them all to a single array and export it.
// This is the only list the main application needs to know about.
export const allProblemModules = [
    ratiosModule,
    arithmeticModule,
    fractionsDecimalsModule,
    numberSystemModule,
    algebraicExpressionsModule,
    equationsInequalitiesModule,
    geometryModule,
    coordinatePlaneModule,
    statsIntroModule,
    centralTendencyModule,
    dataDisplaysModule,
    probabilityModule,
];