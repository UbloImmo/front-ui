import type { GenericFn } from "@ubloimmo/front-util";

export type StoryToSort = {
  type: "story";
  id: string;
  name: string;
  title: string;
  importPath: string;
  tags: string[];
};

export type StorySortFn = GenericFn<[StoryToSort, StoryToSort], number>;
