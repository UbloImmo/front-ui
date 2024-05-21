import type { ComponentCardCellSize } from "./ComponentCard.types";

const LARGE_CELL_FACTOR = 0.85;

export const randomCellSize = (): ComponentCardCellSize => {
  const rand = Math.random();
  if (rand > LARGE_CELL_FACTOR) return "large";

  return "small";
};
