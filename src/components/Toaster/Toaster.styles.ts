import { createGlobalStyle } from "styled-components";

import { buildTypographyStyle, defaultTypographyProps } from "@/typography";
import { toStyleProps } from "@utils";

import type { ToasterIconMap } from "./Toaster.types";
import type { TextProps } from "@/types/typography";

export const toasterIcons: ToasterIconMap = {
  success: "CheckCircleFill",
  info: "InfoSquareFill",
  warning: "QuestionSquareFill",
  error: "ExclamationSquareFill",
  close: "XCircleFill",
};

const toasterText: Required<TextProps> = {
  ...defaultTypographyProps,
  size: "m",
  weight: "medium",
  important: true,
  color: "inherit",
};
const toasterTextStyle = toStyleProps(toasterText);

export const ToasterStyles = createGlobalStyle`
  // make icon color reactive to the statis
  [data-sonner-toast] {
    [data-testid="icon"], [data-icon] svg {
      fill: currentColor;
    }


    [data-title] {
      ${buildTypographyStyle(toasterText)(toasterTextStyle)}
    }
  }
  [data-sonner-toaster][data-sonner-theme="light"] {
    --normal-bg: var(--white);
    --normal-border: var(--gray-100);
    --normal-text: var(--gray-900);
    --success-bg: var(--success-light);
    --success-border: var(--success-medium);
    --success-text: var(--success-dark);
    --info-bg: var(--primary-light);
    --info-border: var(--primary-medium);
    --info-text: var(--primary-dark);
    --warning-bg: var(--warning-light);
    --warning-border: var(--warning-medium);
    --warning-text: var(--warning-dark);
    --error-bg: var(--error-light);
    --error-border: var(--error-medium);
    --error-text: var(--error-dark);
  }
  [data-sonner-toaster][data-sonner-theme="dark"] {
    --normal-bg: var(--gray-900);
    --normal-border: var(--gray-700);
    --normal-text: var(--gray-50);
    --success-bg: var(--success-dark);
    --success-border: var(--success-medium);
    --success-text: var(--success-light);
    --info-bg: var(--primary-dark);
    --info-border: var(--primary-medium);
    --info-text: var(--primary-light);
    --warning-bg: var(--warning-dark);
    --warning-border: var(--warning-medium);
    --warning-text: var(--warning-light);
    --error-bg: var(--error-dark);
    --error-border: var(--error-medium);
    --error-text: var(--error-light);
  }
`;
