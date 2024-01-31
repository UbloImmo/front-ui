import { SpacingLabel } from "..";

export type CssPx = `${number}px`;

export type CssRem = `${number}rem`;

export type CssVarName = `--${string}`;

export type CssVar<TValue extends string> = `${CssVarName}: ${TValue};`;

export type CssVarUsage = `var(${CssVarName})`;

export type CssFr = `${number}fr`;

export type CssLength = SpacingLabel | CssRem | CssPx | CssFr | number;

export type CssLengthUsage = CssPx | CssRem | CssVarUsage | CssFr;
