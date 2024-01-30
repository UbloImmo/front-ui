export type CssPx = `${number}px`;

export type CssRem = `${number}rem`;

export type CssVarName = `--${string}`;

export type CssVar<TValue extends string> = `${CssVarName}: ${TValue};`;

export type CssVarUsage = `var(${CssVarName})`;
