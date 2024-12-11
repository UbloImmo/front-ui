import {
  BalanceJournalExample,
  DefaultExample,
  PokemonListExample,
} from "./examples";
import { List } from "./List.component";

import { componentSourceFactory } from "@docs/docs.utils";

import type { ListProps } from "./List.types";
import type { Meta } from "@storybook/react";

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

export const PokeApiList = () => <PokemonListExample />;

export const BalanceJournal = () => <BalanceJournalExample />;
