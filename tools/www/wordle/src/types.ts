/**
 * Represents the types of allowable characters in an alphabet.
 */
export enum ALPH_TYPES {
    WORD_DICT = 0,
    MATH_SOLV = 1,
    ALPH_ONLY = 2,
    CUST_ONLY = 3,
};
/**
 * Represents the statuses for character input.
 */
export enum CHAR_INPUT_STATUS {
    CORRECT = 1,
    INCORRECT_PLACEMENT = 2,
    INCORRECT = 0,
};