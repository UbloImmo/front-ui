import { texts } from "@ubloimmo/front-tokens";
import { transformObject } from "@ubloimmo/front-util";
import { getDefaultClassNames } from "react-day-picker";
import { css } from "styled-components";

import { breakpointsPx } from "@/sizes";

const classNames = getDefaultClassNames();

const {
  today,
  day_button,
  day,
  selected,
  range_end,
  range_middle,
  range_start,
  week,
  weekday,
  outside,
  disabled,
  caption_label,
  nav,
  month_caption,
  months,
  hidden,
  root,
  footer,
} = transformObject(classNames, (className) => `.${className}`);

const calendarCssVars = css`
  --rdp-accent-color: var(
    --primary-base
  ); /* The accent color used for selected days and UI elements. */
  --rdp-accent-background-color: var(
    --primary-light
  ); /* The accent background color used for selected days and UI elements. */
  --rdp-font-family: ${texts.desktop.m.regular.css.style
    .fontFamily}; /* The font family used by the calendar. Note that inherit does not work here. */

  --rdp-day-font: inherit; /* The font used for the day cells. */
  --rdp-day-height: var(--s-8); /* The height of the day cells. */
  --rdp-day-width: var(--s-8); /* The width of the day cells. */

  --rdp-day_button-border-radius: var(
    --s-1
  ); /* The border radius of the day cells. */
  --rdp-day_button-border: 2px solid transparent; /* The border of the day cells. */
  --rdp-day_button-height: var(
    --rdp-day-width
  ); /* The height of the day cells. */
  --rdp-day_button-width: var(
    --rdp-day-height
  ); /* The width of the day cells. */

  --rdp-selected-border: 0.5px solid var(--primary-medium); /* The border of the selected days. */
  --rdp-selected-font: bold large var(--rdp-font-family); /* The font of the selected days. */
  --rdp-disabled-opacity: 0.5; /* The opacity of the disabled days. */
  --rdp-outside-opacity: 0.75; /* The opacity of the days outside the current month. */
  --rdp-today-color: var(
    --rdp-accent-color
  ); /* The color of the today's date. */

  --rdp-dropdown-gap: 0.5rem; /* The gap between the dropdowns used in the month captons. */

  --rdp-month_caption-font: bold larger var(--rdp-font-family); /* The font of the month caption. */
  --rdp-months-gap: 2rem; /* The gap between the months in the multi-month view. */

  --rdp-nav_button-disabled-opacity: 0.5; /* The opacity of the disabled navigation buttons. */
  --rdp-nav_button-height: 2.25rem; /* The height of the navigation buttons. */
  --rdp-nav_button-width: 2.25rem; /* The width of the navigation buttons. */
  --rdp-nav-height: 2.75rem; /* The height of the navigation bar. */

  --rdp-range_middle-background-color: var(
    --rdp-accent-background-color
  ); /* The color of the background for days in the middle of a range. */
  --rdp-range_middle-font: normal medium var(--rdp-font-family); /* The font for days in the middle of a range. */
  --rdp-range_middle-foreground-color: white; /* The font for days in the middle of a range. */
  --rdp-range_middle-color: inherit; /* The color of the range text. */

  --rdp-range_start-color: white; /* The color of the range text. */
  --rdp-range_start-background: linear-gradient(
    var(--rdp-gradient-direction),
    transparent 50%,
    var(--rdp-range_middle-background-color) 50%
  ); /* Used for the background of the start of the selected range. */
  --rdp-range_start-date-background-color: var(
    --rdp-accent-color
  ); /* The background color of the date when at the start of the selected range. */

  --rdp-range_end-background: linear-gradient(
    var(--rdp-gradient-direction),
    var(--rdp-range_middle-background-color) 50%,
    transparent 50%
  ); /* Used for the background of the end of the selected range. */
  --rdp-range_end-color: white; /* The color of the range text. */
  --rdp-range_end-date-background-color: var(
    --rdp-accent-color
  ); /* The background color of the date when at the end of the selected range. */

  --rdp-week_number-border-radius: 100%; /* The border radius of the week number. */
  --rdp-week_number-border: 2px solid transparent; /* The border of the week number. */
  --rdp-week_number-font: 400 small var(--rdp-font-family); /* The font of the week number cells. */
  --rdp-week_number-height: var(
    --rdp-day-height
  ); /* The height of the week number cells. */
  --rdp-week_number-opacity: 0.75; /* The opacity of the week number. */
  --rdp-week_number-width: var(
    --rdp-day-width
  ); /* The width of the week number cells. */
  --rdp-weeknumber-text-align: center; /* The text alignment of the weekday cells. */

  --rdp-weekday-font: 500 smaller var(--rdp-font-family); /* The font of the weekday. */
  --rdp-weekday-opacity: 0.75; /* The opacity of the weekday. */
  --rdp-weekday-padding: 0.5rem 0rem; /* The padding of the weekday. */
  --rdp-weekday-text-align: center; /* The text alignment of the weekday cells. */

  --rdp-gradient-direction: 90deg;
`;

const calendarRootStyles = css`
  ${root} {
    position: relative; /* Required to position the navigation toolbar. */
    box-sizing: border-box;
    width: min-content;
    display: flex;
    flex-direction: column;
  }

  ${months} {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    gap: var(--s-2);
    max-width: fit-content;

    @media only screen and (max-width: ${breakpointsPx.XS}) {
      flex-wrap: wrap;
      max-width: min-content;
    }
  }
`;

const calendarBaseStyles = css`
  /* 

  .rdp-caption_label {
    z-index: 1;

    position: relative;
    display: inline-flex;
    align-items: center;

    white-space: nowrap;
    border: 0;
    ${texts.desktop.h4.medium.css.rules}
    text-transform: capitalize;
    color: var(--gray-800);
  } */
  /* 
  .rdp-button_next:disabled,
  .rdp-button_previous:disabled {
    cursor: revert;

    opacity: var(--rdp-nav_button-disabled-opacity);
  }

  .rdp-chevron {
    display: inline-block;
    fill: var(--rdp-accent-color);
  } */

  /* .rdp-root[dir="rtl"] .rdp-nav .rdp-chevron {
    transform: rotate(180deg);
  }

  .rdp-root[dir="rtl"] .rdp-nav .rdp-chevron {
    transform: rotate(180deg);
    transform-origin: 50%;
  } */

  .rdp-dropdowns {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: var(--rdp-dropdown-gap);
  }
  .rdp-dropdown {
    z-index: 2;

    /* Reset */
    opacity: 0;
    appearance: none;
    position: absolute;
    inset-block-start: 0;
    inset-block-end: 0;
    inset-inline-start: 0;
    width: 100%;
    margin: 0;
    padding: 0;
    cursor: inherit;
    border: none;
    line-height: inherit;
  }

  .rdp-dropdown_root {
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  .rdp-dropdown_root[data-disabled="true"] .rdp-chevron {
    opacity: var(--rdp-disabled-opacity);
  }

  /* .rdp-months {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: var(--rdp-months-gap);
    max-width: fit-content;
  } */

  .rdp-month_grid {
    border-collapse: collapse;
  }
  /* 
  .rdp-nav {
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;

    display: flex;
    align-items: center;

    height: var(--rdp-nav-height);
  } */

  .rdp-weekday {
    opacity: 1;
    padding: var(--rdp-weekday-padding);
    ${texts.desktop.s.medium.css.style}
    color: var(--gray-600);
    text-align: var(--rdp-weekday-text-align);
    text-transform: var(--rdp-weekday-text-transform);
  }

  .rdp-week_number {
    opacity: var(--rdp-week_number-opacity);
    font: var(--rdp-week_number-font);
    height: var(--rdp-week_number-height);
    width: var(--rdp-week_number-width);
    border: var(--rdp-week_number-border);
    border-radius: var(--rdp-week_number-border-radius);
    text-align: var(--rdp-weeknumber-text-align);
  }

  /* DAY MODIFIERS */
  /* .rdp-today:not(.rdp-outside) {
    color: var(--rdp-today-color);
  } */

  /* .rdp-outside {
    opacity: var(--rdp-outside-opacity);
  } */

  /* .rdp-disabled {
    opacity: var(--rdp-disabled-opacity);
  } */

  /* .rdp-hidden { */
  /* visibility: hidden; */
  /* color: var(--rdp-range_start-color); */
  /* } */

  /* .rdp-range_start {
    background: var(--rdp-range_start-background);
  } */

  /* .rdp-range_start .rdp-day_button {
    background-color: var(--rdp-range_start-date-background-color);
    color: var(--rdp-range_start-color);
  } */

  /* .rdp-range_middle {
    background-color: var(--rdp-range_middle-background-color);
    font: var(--rdp-range_middle-font);
  } */

  /* .rdp-range_middle .rdp-day_button {
    border-color: transparent;
    border: unset;
    border-radius: unset;
    color: var(--rdp-range_middle-color);
  } */

  /* .rdp-range_end {
    background: var(--rdp-range_end-background);
    color: var(--rdp-range_end-color);
  } */
  /* 
  .rdp-range_end .rdp-day_button {
    color: var(--rdp-range_start-color);
    background-color: var(--rdp-range_end-date-background-color);
  } */

  /* .rdp-range_start.rdp-range_end {
    background: revert;
  } */
  /* 
  .rdp-focusable {
    cursor: pointer;
  } */
`;

const calendarHeaderStyles = css`
  --rdp-nav-height: var(--button-size, var(--s-8));
  --rdv-nav_button-height: var(--rdv-nav-height);
  --rdv-nav_button-width: var(--rdv-nav-height);

  ${month_caption} {
    margin-bottom: var(--s-2);
    padding-left: var(--s-1);
    display: flex;
    align-content: center;
    height: var(--rdp-nav-height);
  }
  ${caption_label} {
    ${texts.desktop.h4.medium.css.rules}
    text-transform: capitalize;
    color: var(--gray-900);
    display: flex;
    display: inline-flex;
    align-items: center;

    white-space: nowrap;
  }

  ${nav} {
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;

    display: flex;
    align-items: center;

    height: var(--rdp-nav-height);
  }

  ${weekday} {
    ${texts.desktop.s.regular.css.style}
    color: var(--gray-400);
    text-align: center;
    text-transform: capitalize;
    padding: var(--s-1);
    height: var(--s-4);
  }
`;

const calendarDayStyles = css`
  --rdp-day-width: var(--s-9);
  --rdp-day-height: var(--s-9);

  ${day} {
    padding: var(--s-05);
    width: var(--rdp-day-width);
    height: var(--rdp-day-height);
    background: var(--primary-light-00);
    transition:
      background 150ms ease-out 0s,
      border-radius 150ms ease-out 0s;
  }

  ${range_start}, ${range_middle}, ${range_end} {
    background: var(--primary-light);
  }

  ${range_start} {
    border-top-left-radius: var(--s-1);
    border-bottom-left-radius: var(--s-1);
  }

  ${range_end} {
    border-top-right-radius: var(--s-1);
    border-bottom-right-radius: var(--s-1);
  }

  ${hidden} {
    visibility: hidden;
    pointer-events: none;
    user-select: none;
  }

  ${outside}${range_start}, ${outside}${range_middle}, ${outside}${range_end} {
    background: var(--primary-light-50);
  }

  ${week}:has(${range_start}) ${range_middle}:last-child {
    border-top-right-radius: var(--s-1);
  }

  ${week}:has(${range_end}) ${range_middle}:first-child {
    border-bottom-left-radius: var(--s-1);
  }

  ${week}:has(${range_start}:not(:first-child)) + ${week}:has(${range_middle}) ${range_middle}:first-child {
    border-top-left-radius: var(--s-1);
  }

  ${week}:has(+ ${week} > ${range_end}:not(${range_start}):not(:last-child)) ${range_middle}:last-child {
    border-bottom-right-radius: var(--s-1);
  }

  ${week}:has(${range_middle}:last-child) + ${week} ${range_end}:last-child {
    border-top-right-radius: 0;
  }

  ${week}:has( + ${week} > ${range_middle}:first-child) ${range_start}:first-child {
    border-bottom-left-radius: 0;
  }

  ${week}:has( + ${week} > ${range_end}:first-child) ${range_start}:first-child {
    border-bottom-left-radius: 0;
  }

  ${week}:has(${range_middle}:first-child, ${range_start}:first-child) + ${week} ${range_end}:first-child {
    border-bottom-left-radius: var(--s-1);
    border-top-right-radius: 0;
  }

  ${week}:first-child ${range_middle}:first-child {
    border-top-left-radius: var(--s-1);
  }

  ${week}:last-child ${range_middle}:last-child {
    border-bottom-right-radius: var(--s-1);
  }
`;

const calendarDayButtonStyles = css`
  --rdp-day_button-width: var(--s-8);
  --rdp-day_button-height: var(--s-8);
  --rdp-day_button-border-radius: var(--s-1);

  ${day_button} {
    ${texts.desktop.m.medium.css.rules}
    text-align: center;
    vertical-align: center;
    border: 1px solid var(--primary-light-00);
    color: var(--gray-800);
    width: var(--rdp-day_button-width);
    height: var(--rdp-day_button-height);
    border-radius: var(--rdp-day_button-border-radius);
    background: var(--gray-50);
    transition: all 150ms ease-out 0s;
    cursor: pointer;

    &:hover {
      background: var(--primary-light);
    }
  }

  ${selected}:not(${range_middle})
    ${day_button} {
    background: var(--primary-base);
    color: var(--primary-light);

    &:hover {
      background: var(--primary-dark);
    }
  }

  ${range_middle} ${day_button},
  ${range_start} ${day_button},
  ${range_end} ${day_button} {
    --rdp-day_button-border-radius: var(--s-05);
  }

  ${range_middle} ${day_button} {
    background: var(--primary-light);
    color: var(--primary-dark);

    &:hover {
      background: var(--primary-medium);
    }
  }

  ${today} ${day_button} {
    border-color: var(--primary-light);
    color: var(--primary-dark);
  }

  ${range_middle}${today} ${day_button} {
    border-color: var(--primary-medium);
    color: var(--primary-base);
  }

  ${range_start}${today} ${day_button},
  ${range_end}${today} ${day_button},
  ${selected}${today} ${day_button} {
    border-color: var(--primary-medium);
  }

  ${outside} ${day_button} {
    background: var(--gray-50-00);
    color: var(--gray-400);
  }

  ${outside}${today} ${day_button} {
    border-color: var(--gray-100);
  }

  ${disabled} ${day_button} {
    background: var(--gray-100);
    color: var(--gray-600);
    cursor: not-allowed;
  }

  ${disabled}${outside} ${day_button} {
    background: var(--gray-100-50);
    color: var(--gray-300);
  }
`;

const calendarFooterStyles = css`
  ${footer} {
    margin-top: var(--s-2);
    max-width: 100%;
    flex: 1;
    span {
      color: var(--gray-600);
      text-align: center;
      max-width: 100%;
    }
  }
`;

export const calendarWrapperStyles = css`
  background: white;
  padding: var(--s-2) var(--s-1);
  box-shadow: var(--shadow-card-elevation-low);
  width: fit-content;
  border-radius: var(--s-2);

  ${calendarCssVars}
  ${calendarBaseStyles}
  ${calendarRootStyles}

  ${calendarHeaderStyles};

  ${calendarDayButtonStyles}
  ${calendarDayStyles};
  ${calendarFooterStyles}
`;
