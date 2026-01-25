import { config, Dimension, dimensions, prefixes, Quantity, Unit, units } from 'dimensional';
import { NamedUnit, Pair, ProgramSettings } from './types';

/**
 * Available units to select from
 */
const allUnits: Array<NamedUnit> = [];
/**
 * The current program settings
 */
export const settings: ProgramSettings = {
    showInstructions: true,
    currentEdit: 'Input',
}
/**
 * Active unit
 */
export const currentUnits: Pair<Unit> = {
    input: units.Unitless,
    output: units.Unitless,
};
/**
 * Active quantities
 */
export const quantities: Pair<Quantity> = {
    input: new Quantity(0, units.Unitless),
    output: new Quantity(0, units.Unitless),
};
/**
 * Get all available unit names to select from
 */
export function getUnitNames(): Array<string> {
    return allUnits.map(nu => nu[0]).sort();
}
/**
 * Find the unit matching the selected name
 */
export function getUnitByName(name: string): Unit {
    return allUnits.find(nu => nu[0] === name)![1];
}
/**
 * Swap the input and output of a pair
 */
export function swapPair<T>(pair: Pair<T>): void {
    const temp: T = pair.input;
    pair.input = pair.output;
    pair.output = temp;
}
/**
 * Get the name of a dimension
 */
export function getDimensionName(dimension: Dimension): string {
    const dim2: { [name: string]: Dimension } = { ...dimensions };
    for (const name in dim2) {
        if (dim2[name].is(dimension)) {
            return name;
        }
    }
    return 'unknown';
}

// Configure the dimensional package
config.scalarSymbol = '\\pi';

// Add custom units and convert to NamedUnit
allUnits.push(...Object.entries(units));
allUnits.push(['ton', new Unit('ton', units.poundMass, 2000)]);
allUnits.push(['micron', units.meter.prefix(prefixes.micro)]);
allUnits.push(['nanometer', units.meter.prefix(prefixes.nano)]);
allUnits.push(['milligram', units.gram.prefix(prefixes.milli)]);
allUnits.push(['kiloNewton', units.Newton.prefix(prefixes.kilo)]);
allUnits.push(['kilowatt', units.watt.prefix(prefixes.kilo)]);
allUnits.sort((a, b) => a[0].localeCompare(b[0]));
