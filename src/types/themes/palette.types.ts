import { Enum } from "@/types/global/global.types";

const paletteColors = [
  "primary",
  "warning",
  "pending",
  "success",
  "info",
  "white",
  "black",
  "gray",
] as const;

export type PaletteColor = Enum<typeof paletteColors>;
