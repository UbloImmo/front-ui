import { useMemo, useState } from "react";

import { SearchTextInput } from "./SearchTextInput.component";

import { Divider } from "@/components/Divider";
import { StateIndicator } from "@/components/StateIndicator";
import { Text } from "@/components/Text";
import { FlexColumnLayout, GridLayout } from "@layouts";

import type { Meta, StoryObj } from "@storybook/react";
import type { Nullable } from "@ubloimmo/front-util";

const meta = {
  component: SearchTextInput,
  title: "Components/Input/SearchTextInput/Stories",
  args: {
    uncontrolled: true,
  },
} satisfies Meta<typeof SearchTextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Type to search...",
  },
};

const queries = ["Paris", "London", "New York", "Tokyo"];

export const Query = () => {
  const [typeQuery, setTypeQuery] = useState("");

  const filteredQueries = useMemo(() => {
    return queries.filter((query) =>
      query.toLowerCase().includes(typeQuery.toLowerCase())
    );
  }, [typeQuery]);

  const handleChange = (value: Nullable<string>) => {
    setTypeQuery(value ?? "");
  };

  return (
    <FlexColumnLayout gap="s-3">
      <SearchTextInput
        value={typeQuery}
        onChange={handleChange}
        placeholder="Search..."
      />

      <Divider label="Results" />
      <GridLayout columns={2} fill>
        {filteredQueries.length ? (
          <>
            {filteredQueries.map((query) => (
              <StateIndicator key={query} label={query} icon="Building" />
            ))}
          </>
        ) : (
          <Text>No results matching your query</Text>
        )}
      </GridLayout>
    </FlexColumnLayout>
  );
};
