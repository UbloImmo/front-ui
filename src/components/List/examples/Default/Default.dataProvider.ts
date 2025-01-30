import {
  useStaticDataProvider,
  type UseDataProviderFn,
} from "@/components/List/modules";

import type { DefaultListItem } from "./Default.types";

const defaultData: DefaultListItem[] = [
  {
    value: "1",
    label: "One",
    active: Math.random() < 0.5,
  },
  {
    value: "2",
    label: "Two",
    active: Math.random() < 0.5,
  },
  {
    value: "3",
    label: "Three",
    active: Math.random() < 0.5,
  },
  {
    value: "4",
    label: "Four",
    active: Math.random() < 0.5,
  },
  {
    value: "5",
    label: "Five",
    active: Math.random() < 0.5,
  },
  {
    value: "6",
    label: "Six",
    active: Math.random() < 0.5,
  },
  {
    value: "7",
    label: "Seven",
    active: Math.random() < 0.5,
  },
  {
    value: "8",
    label: "Eight",
    active: Math.random() < 0.5,
  },
  {
    value: "9",
    label: "Nine",
    active: Math.random() < 0.5,
  },
  {
    value: "10",
    label: "Ten",
    active: Math.random() < 0.5,
  },
  {
    value: "11",
    label: "Eleven",
    active: Math.random() < 0.5,
  },
  {
    value: "12",
    label: "Twelve",
    active: Math.random() < 0.5,
  },
  {
    value: "13",
    label: "Thirteen",
    active: Math.random() < 0.5,
  },
  {
    value: "14",
    label: "Fourteen",
    active: Math.random() < 0.5,
  },
  {
    value: "15",
    label: "Fifteen",
    active: Math.random() < 0.5,
  },
];

export const useDefaultDataProvider: UseDataProviderFn<DefaultListItem> = (
  setData
) => {
  return useStaticDataProvider(defaultData, setData);
};
