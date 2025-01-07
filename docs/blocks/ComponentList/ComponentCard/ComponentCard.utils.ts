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

// export const loadComponentDefaultStory = async <
//   TIndex extends AnyIndex,
//   TName extends ComponentName<TIndex>
// >({
//   name,
//   parent,
// }: ComponentCardProps<TIndex, TName>): Promise<{
//   default: StoryObj | StoryFn;
// }> => {
//   const componentPath = `src/${
//     parent && parent.toLowerCase().includes("layouts")
//       ? "layouts"
//       : "components"
//   }/${name}/${name}.stories.tsx`;

//   try {
//     const stories = await import(componentPath);

//     if (!isObject(stories) || !("Default" in stories))
//       throw new Error(`No default story found for ${name}`);

//     return { default: stories.Default as StoryObj | StoryFn };
//   } catch (error) {
//     console.error(error);
//     console.error(`Failed to load story for: ${name}`);
//     return { default: {} };
//   }
// };
