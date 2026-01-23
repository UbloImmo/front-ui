import {
  BalanceJournalExample,
  DefaultExample,
  PokemonListExample,
} from "./examples";
import { List } from "./List.component";

import { componentSourceFactory } from "@docs/docs.utils";

import type { ListProps } from "./List.types";
import type { DataProviderType } from "./modules/DataProvider/DataProvider.types";
import type { Meta, StoryFn } from "@storybook/react-vite";

const componentSource = componentSourceFactory<ListProps<object>>(
  "List",
  {},
  List.defaultProps
);

const meta = {
  component: List,
  title: "Components/List/Stories",
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof List>;

export default meta;

export const Default = () => <DefaultExample />;

export const PokeApiList: StoryFn<Meta<typeof PokemonListExample>> = ({
  dataProvider = "static",
}: {
  dataProvider?: Exclude<DataProviderType, "custom">;
}) => <PokemonListExample dataProvider={dataProvider} />;
PokeApiList.argTypes = {
  // @ts-expect-error since it does not match the component's props
  dataProvider: {
    control: {
      type: "radio",
    },
    options: ["static", "dynamic", "paginated"],
  },
};
PokeApiList.args = {
  // @ts-expect-error since it does not match the component's props
  dataProvider: "paginated",
};

export const BalanceJournal = () => <BalanceJournalExample />;
