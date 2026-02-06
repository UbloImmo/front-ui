import { texts, colors } from "@ubloimmo/front-tokens/lib/tokens.values";
import { objectEntries, objectKeys } from "@ubloimmo/front-util";

import { breakpointsPx } from "@/sizes";
import { fontFamilySets } from "@/typography";
import { BreakpointLabel } from "@types";
import { cssVarUsage } from "@utils";

type TypographyTokens = typeof texts;

type TypographyCategory = keyof TypographyTokens & string;

type TypographyBreakpoint = Exclude<TypographyCategory, "@figma">;

type TypographySize = string & keyof TypographyTokens[TypographyBreakpoint];

type TypographyWeight =
  keyof TypographyTokens[TypographyBreakpoint][TypographySize];

type TypographyRule = {
  rule: string;
  className: string;
};

type TypographyRuleMap = Map<string, TypographyRule>;
type TypographyRuleMaps = {
  rules: TypographyRuleMap;
  mixins: TypographyRuleMap;
};

const EXCLUDED_RULES = [
  "font-family",
  "font-style",
  "text-indent",
  "text-transform",
  "text-overflow",
  "text-align",
  "vertical-align",
  "text-decoration",
  "font-size",
  "font-weight",
];

const FONT_FAMILIES = fontFamilySets;

function parseCssRules(ruleStr: string) {
  return ruleStr
    .split("\n")
    .filter((line) => !EXCLUDED_RULES.some((rule) => line.includes(rule)));
}

function indentLines(ruleStr: string) {
  return ruleStr
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n");
}

function appendImportant(ruleStr: string) {
  return ruleStr
    .split("\n")
    .map((line) => line.replace(";", " !important;"))
    .join("\n");
}

function importantRuleset(ruleStr: string) {
  return `&.important {\n${indentLines(appendImportant(ruleStr))}\n}`;
}
function getTypoRule(
  breakpoint: TypographyBreakpoint,
  size: TypographySize,
  weight: TypographyWeight
) {
  const { css } = texts[breakpoint][size][weight];
  const name = `text-${size}-${weight}`;
  const ruleStr = [
    ...parseCssRules(css.rules),
    `font-size: ${cssVarUsage(`text-${size}`)};`,
    `font-weight: ${cssVarUsage(`text-weight-${weight}`)};`,
  ].join("\n");

  return { name, ruleStr };
}

export function parseRules(): TypographyRuleMaps {
  const rules: TypographyRuleMap = new Map();
  const mixins: TypographyRuleMap = new Map();

  // aggregate rules
  for (const [size, weights] of objectEntries(texts.desktop)) {
    for (const weight of objectKeys(weights)) {
      const desktop = getTypoRule("desktop", size, weight);
      const mobile = getTypoRule("mobile", size, weight);

      const className = desktop.name;
      const mixinName = `m-${desktop.name}`;
      const mixin = `@mixin ${mixinName}($important: false) {\n${indentLines(
        [
          desktop.ruleStr,
          `@if $important {\n${indentLines(appendImportant(desktop.ruleStr))}\n}`,
          mediaQuery(
            [
              mobile.ruleStr,
              `@if $important {\n${indentLines(appendImportant(mobile.ruleStr))}\n}`,
            ].join("\n")
          ),
        ].join("\n")
      )}\n}`.trim();
      mixins.set(className, { rule: mixin.trim(), className });

      const rule = `.${className} {\n${indentLines(
        [
          `@include ${mixinName};`,
          `&.important {\n${indentLines(`@include ${mixinName}(true);`)}\n}`,
        ].join("\n")
      )}\n}`.trim();
      rules.set(className, { rule, className });
    }
  }

  // create font rules
  for (const [name, fonts] of objectEntries(FONT_FAMILIES)) {
    const ruleStr = `font-family: ${fonts};`;
    const mixinName = `font-${name}`;
    const mixin = `@mixin ${mixinName}($important: false) {\n${indentLines(
      [
        ruleStr,
        `@if $important {\n${indentLines(appendImportant(ruleStr))}\n}`,
      ].join("\n")
    )}\n}`;
    mixins.set(mixinName, { rule: mixin.trim(), className: mixinName });
  }

  return { rules, mixins };
}
function mediaQuery(content: string, breakpointLabel: BreakpointLabel = "XS") {
  const indentedContent = content
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n");
  return `@media only screen and (max-width: ${breakpointsPx[breakpointLabel]}) {\n${indentedContent}\n}`;
}

export function formatRules({ rules, mixins }: TypographyRuleMaps) {
  let ruleStr = "";

  mixins.forEach(({ rule, className }) => {
    ruleStr += `\n${rule}`;
    const mixinRule = rules.get(className);
    if (!mixinRule) return;
    ruleStr += `\n${mixinRule.rule}`;
    ruleStr += "\n";
  });

  return ruleStr.trim();
}

export function formatColorRules() {
  const { gray, primary, pending, warning, success, error } = colors;
  const colorVars = { gray, primary, pending, warning, success, error };

  const rules: string[] = [".text-color {\n  color: inherit;\n}"];

  for (const [colorVar, shades] of objectEntries(colorVars)) {
    for (const shade in shades) {
      const color = `${colorVar}-${shade}`;
      const ruleTarget = `.text-color[data-color="${color}"]`;
      const ruleBody = `color: ${cssVarUsage(color)};`;
      const rule = `${ruleTarget} {\n${indentLines([ruleBody, importantRuleset(ruleBody)].join("\n"))}\n}`;
      rules.push(rule);
    }
  }

  return rules.join("\n");
}
