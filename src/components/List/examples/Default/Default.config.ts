import { useDefaultDataProvider } from "./Default.dataProvider";
import { useListConfig } from "../../context";

import { useStatic } from "@utils";

export const useDefaultListConfig = () => {
  const { match, options, option, filter, divider, config } = useListConfig(
    useDefaultDataProvider,
  );

  useStatic(() => {
    filter("Value greater than", [
      ...options(
        "value",
        ">",
        [1, 3, 5, 7, 9].map((value) => ({
          label: String(value),
          value,
        })),
      ),
      divider("10 or more"),
      option("at least 10", match("value", ">=", 10)),
    ]);

    filter("Active", [
      option("Yes", match("active", "=", true)),
      option("No", match("active", "=", false)),
    ]);
  });

  return config;
};
