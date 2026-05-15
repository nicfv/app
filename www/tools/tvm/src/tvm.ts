export const F_P = (i = 0, n = 0) => (1 + i) ** n;
export const P_F = (i = 0, n = 0) => (1 + i) ** -n;
export const A_F = (i = 0, n = 0) => i / ((1 + i) ** n - 1);
export const F_A = (i = 0, n = 0) => ((1 + i) ** n - 1) / i;
export const A_P = (i = 0, n = 0) => i * (1 + i) ** n / ((1 + i) ** n - 1);
export const P_A = (i = 0, n = 0) => ((1 + i) ** n - 1) / i / (1 + i) ** n;
