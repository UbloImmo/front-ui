import { css, type RuleSet } from "styled-components";

export const dateInputStyles = (): RuleSet => css`
  vertical-align: center;

  &::-webkit-inner-spin-button {
    display: none;
  }

  &::-webkit-calendar-picker-indicator {
    display: none;
  }

  cursor: text;

  &::-webkit-datetime-edit-text {
    color: var(--gray-400);
  }

  &::-webkit-datetime-edit-day-field,
  &::-webkit-datetime-edit-month-field,
  &::-webkit-datetime-edit-year-field {
    padding: var(--s-05) 0 !important;
    width: auto !important;
    cursor: text !important;
    color: inherit;
    border-radius: var(--s-05) !important;

    &:focus {
      color: var(--primary-dark);
      background-color: var(--primary-light);
      outline: none;
    }
  }
`;
