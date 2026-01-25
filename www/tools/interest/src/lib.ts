/**
 * Library of calculation functions.
 */
export namespace lib {
    /**
     * Calculate the final value.
     */
    export function F(P: number, i: number, n: number, f: number): number {
        return P * (1 + i / 100 / f) ** (n * f);
    }
    /**
     * Calculate the initial value.
     */
    export function P(F: number, i: number, n: number, f: number): number {
        return F * (1 + i / 100 / f) ** (-n * f);
    }
    /**
     * Calculate the annual interest rate.
     */
    export function i(F: number, P: number, n: number, f: number): number {
        return 100 * f * ((F / P) ** (1 / (n * f)) - 1);
    }
    /**
     * Calculate the duration.
     */
    export function n(F: number, P: number, i: number, f: number): number {
        return Math.log(F / P) / f / Math.log(1 + i / 100 / f);
    }
}