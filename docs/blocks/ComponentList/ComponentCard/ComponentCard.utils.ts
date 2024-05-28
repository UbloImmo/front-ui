import type { ComponentCardCellSize } from "./ComponentCard.types";

const LARGE_CELL_FACTOR = 0.85;

/**
 * Returns a random cell size as influenced by the {@link LARGE_CELL_FACTOR} style constant
 *
 * @returns {ComponentCardCellSize} - A random cell size
 */
export const randomCellSize = (): ComponentCardCellSize => {
  const rand = Math.random();
  if (rand > LARGE_CELL_FACTOR) return "large";

  return "small";
};
