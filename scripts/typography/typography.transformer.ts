import { texts, colors } from "@ubloimmo/front-tokens/lib/tokens.values";
import { objectEntries } from "@ubloimmo/front-util";

import { breakpointsPx } from "@/sizes";
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
  size: TypographySize;
  weight: TypographyWeight;
};

type TypographyRuleMap = Map<string, TypographyRule>;
type TypographyRuleMaps = {
  desktop: TypographyRuleMap;
  mobile: TypographyRuleMap;
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

export function parseRules(): TypographyRuleMaps {
  const desktop: TypographyRuleMap = new Map();
  const mobile: TypographyRuleMap = new Map();

  // aggregate rules
  for (const [breakpoint, sizes] of objectEntries(texts)) {
    for (const [size, weights] of objectEntries(sizes)) {
      for (const [weight, { css }] of objectEntries(weights)) {
        const className = `text-${size}-${weight}`;
        const ruleStr = [
          ...parseCssRules(css.rules),
          `font-size: ${cssVarUsage(`text-${size}`)};`,
          `font-weight: ${cssVarUsage(`text-weight-${weight}`)};`,
        ].join("\n");
        const rule = `.${className} {\n${indentLines([ruleStr, importantRuleset(ruleStr)].join("\n"))}\n}`;
        const rules = breakpoint === "desktop" ? desktop : mobile;
        rules.set(className, { rule, size, weight, className });
      }
    }
  }

  return { desktop, mobile };
}
function mediaQuery(content: string, breakpointLabel: BreakpointLabel = "XS") {
  const indentedContent = content
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n");
  return `@media only screen and (max-width: ${breakpointsPx[breakpointLabel]}) {\n${indentedContent}\n}`;
}

export function formatRules({ mobile, desktop }: TypographyRuleMaps) {
  let ruleStr = "";
  // append desktop rules
  desktop.forEach(({ rule }) => {
    ruleStr += `\n${rule}`;
  });

  // append mobile media queries
  let mobileRuleStr = "";
  mobile.forEach(({ rule }) => {
    mobileRuleStr += `\n${rule}`;
  });

  mobileRuleStr.trim();
  ruleStr += `\n${mediaQuery(mobileRuleStr.trim())}`;

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
