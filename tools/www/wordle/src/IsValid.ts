/**
 * Check if a math equation string is numerically valid.
 */
export function isValid(eq: string) {
    if (eq.includes('//') || eq.includes('**') || eq.includes('-+') || (eq.match(/=/g) ?? []).length !== 1) {
        return false;
    }
    const parts = eq.replace('^', '**').split('=');
    const evals: Array<number> = [];
    for (const iStr in parts) {
        const i: number = +iStr;
        try {
            evals[i] = eval(parts[i]);
        } catch (e) {
            return false;
        }
        if (i > 0 && evals[i] !== evals[i - 1]) {
            return false;
        }
    }
    return true;
}