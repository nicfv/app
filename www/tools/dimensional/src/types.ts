import { Unit } from 'dimensional';

/**
 * Represents a unit with a name
 */
export type NamedUnit = [string, Unit];

/**
 * Represents an input/output pair of objects
 */
export interface Pair<T> {
    /**
     * The input object
     */
    input: T;
    /**
     * The output object
     */
    output: T;
}

/**
 * The current program settings
 */
export interface ProgramSettings {
    /**
     * Whether or not to show instructions
     */
    showInstructions: boolean;
    /**
     * Which quantity is currently being edited
     */
    currentEdit: 'Input' | 'Output';
}