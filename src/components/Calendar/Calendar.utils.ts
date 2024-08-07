import { format } from "date-fns";

import type { CalendarAssistiveTextTemplate } from "./Calendar.types";

export const defaultCalendarAssistiveTextTemplate: CalendarAssistiveTextTemplate =
  {
    empty: (mode) =>
      mode === "range" ? "Please pick a date period" : "Please pick a date",
    single: (date) => `You picked ${format(date, "PPP")}`,
    range: ({ from, to }) => {
      if (from && !to) {
        return `You picked a period starting from ${format(
          from,
          "PPP"
        )}. Please pick an end date.`;
      }

      if (!from && to) {
        return `You picked a period ending with ${format(
          to,
          "PPP"
        )}. Please pick a start date.`;
      }
      if (from && to) {
        return `You picked a period starting from ${format(
          from,
          "PPP"
        )} to ${format(to, "PPP")}`;
      }
      return "Please pick a date period";
    },
  };
