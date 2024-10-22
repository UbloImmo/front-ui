import { format } from "date-fns";
import { fr } from "date-fns/locale";

import type { CalendarAssistiveTextTemplate } from "./Calendar.types";

export const defaultCalendarAssistiveTextTemplate: CalendarAssistiveTextTemplate =
  {
    empty: (mode) =>
      mode === "range"
        ? "Veuillez sélectionner une période"
        : "Veuillez sélectionner une date",
    single: (date) =>
      `Vous avez sélectionné le ${format(date, "PPP", { locale: fr })}`,
    range: ({ from, to }) => {
      if (from && !to) {
        return `Vous avez sélectionne le ${format(from, "PPP", {
          locale: fr,
        })}. Veuillez choisir une date de fin.`;
      }

      if (!from && to) {
        return `Vous avez sélectionné le ${format(to, "PPP", {
          locale: fr,
        })}. Veuillez choisir une date de début.`;
      }
      if (from && to) {
        return `Vous avez choisi une période du ${format(from, "PPP", {
          locale: fr,
        })} au ${format(to, "PPP", { locale: fr })}`;
      }
      return "Veuillez choisir une période";
    },
  };
