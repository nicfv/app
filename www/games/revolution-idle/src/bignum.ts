export class BigNum {
    private static readonly MAX_LOG_BASE: number = Math.floor(Math.log10(Number.MAX_SAFE_INTEGER));
    private static readonly MIN_LOG_BASE: number = this.MAX_LOG_BASE - 1;
    constructor(private readonly base: number, private readonly exponent: number = 0, private readonly sign: -1 | 1 = 1) {
        this.sign = base < 0 ? -1 : 1;
        base = Math.abs(base);
        while (Math.log10(base) <= BigNum.MIN_LOG_BASE) {
            base *= 10;
            exponent--;
        }
        while (Math.log10(base) > BigNum.MAX_LOG_BASE) {
            base /= 10;
            exponent++;
        }
        this.base = Math.floor(base);
        this.exponent = exponent;
    }
    public equals(other: BigNum): boolean {
        return this.base === other.base && this.exponent === other.exponent;
    }
    public toString(): string {
        return `${this.base}, ${this.exponent + BigNum.MIN_LOG_BASE}, ${this.sign}`;
        if (this.exponent < 6) {
            return (this.base / (10 ** (BigNum.MAX_LOG_BASE - 6))).toFixed(2);
        }
        if (this.exponent < 9) {
            return (this.base / (10 ** (BigNum.MAX_LOG_BASE - 9))).toFixed(2) + 'M';
        }
        if (this.exponent < 12) {
            return (this.base / (10 ** (BigNum.MAX_LOG_BASE - 12))).toFixed(2) + 'G';
        }
        if (this.exponent < 15) {
            return (this.base / (10 ** (BigNum.MAX_LOG_BASE - 15))).toFixed(2) + 'T';
        }
        return (this.base / (10 ** BigNum.MIN_LOG_BASE)).toFixed(2)
    }
}