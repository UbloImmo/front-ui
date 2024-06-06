import type { Currency } from "./CurrencyInput.types";
import type { IconName } from "@/components/Icon";
import type { NumberSign } from "@types";
import type { ValueMap } from "@ubloimmo/front-util";

export const currencySymbolIconMap: ValueMap<Currency, IconName> = {
  euro: "CurrencyEuro",
  dollar: "CurrencyDollar",
  pound: "CurrencyPound",
  yen: "CurrencyYen",
};

export const invertSignMap: ValueMap<NumberSign, NumberSign> = {
  "-": "+",
  "+": "-",
};

export const signIconMap: ValueMap<NumberSign, IconName> = {
  "-": "Dash",
  "+": "Plus",
};
