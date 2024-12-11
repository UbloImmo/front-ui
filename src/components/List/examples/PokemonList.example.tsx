import { isString, type Nullable } from "@ubloimmo/front-util";
import styled from "styled-components";

import {
  ListFilterCollection,
  ListFilterOptionBadge,
  ListFilterPresetCollection,
  ListSideHeader,
} from "../components";
import { ListContextProvider, useListConfig, useListContext } from "../context";
import { List } from "../List.component";
import { BooleanOperators } from "../List.enums";
import {
  useStaticDataProvider,
  type FilterProperty,
  type ListConfigOptionLabeledValue,
  type UseDataProviderFn,
} from "../modules";

import { Loading } from "@/components/Loading";
import { Text } from "@/components/Text";
import {
  FlexLayout,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@layouts";
import { arrayOf, capitalize, delay, useStatic } from "@utils";

type Pokemon = {
  id: number;
  name: string;
  is_main_series: boolean;
  generation: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  types: {
    slot: number;
    type: {
      id: number;
      name: string;
    };
  }[];
};

type PokemonListResponse = {
  results: {
    name: string;
    url: string;
  }[];
  count: number;
  next: Nullable<string>;
  previous: Nullable<string>;
};

const DEFAULT_POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon";
const LIMIT = 100;

const fetchPokemonData = async (): Promise<Pokemon[]> => {
  const fetchDataSubset = async (baseUrl = DEFAULT_POKEAPI_URL) => {
    const response = await fetch(baseUrl);
    const data = (await response.json()) as PokemonListResponse;
    const results = await Promise.all(
      data.results.map(async ({ url }) => {
        const singleResponse = await fetch(url);
        const singleData = (await singleResponse.json()) as Pokemon;
        return singleData;
      })
    );
    return { results, next: data.next };
  };

  let data: Pokemon[] = [];
  let nextUrl: Nullable<string> = DEFAULT_POKEAPI_URL;

  while (isString(nextUrl) && data.length < LIMIT) {
    const { results, next } = await fetchDataSubset(nextUrl);
    data = [...data, ...results];
    nextUrl = next;
  }
  return data;
};

const usePokemonData: UseDataProviderFn<Pokemon> = (setData) => {
  return useStaticDataProvider(fetchPokemonData, setData);
};

const usePokemonListConfig = () => {
  const {
    config,
    option,
    match,
    matches,
    filter,
    options,
    filterPreset,
    async,
    configureSearchParams,
  } = useListConfig(usePokemonData);

  // build & register the name filter once
  const filters = useStatic(() => {
    configureSearchParams({ sync: "read" });
    // build & register a filter option for clefairy
    const clefairy = option("Clefairy", match("name", "=", "clefairy"), {
      color: "primary",
    });

    // build & register a filter option for pikachu or raichu
    const pikachuOrRaichu = option(
      "Pikachu or Raichu",
      matches("name", "=", ["pikachu", "raichu"]),
      { color: "pending-dark", operator: BooleanOperators.OR }
    );

    // build & register multiple filter options for entei, cresselia & suicune
    const others = options(
      "name",
      "=",
      [
        { label: "Entei", value: "entei" },
        { label: "Cresselia", value: "cresselia" },
        { label: "Suicune", value: "suicune" },
      ],
      {
        icon: "Stars",
        color: "primary",
      }
    );
    // build & register the name filter
    filter("Name", [clefairy, pikachuOrRaichu, ...others], {
      multi: true,
    });

    // declare the base experience filter options asynchronously
    async.filter(
      "Base Experience",
      async.options("base_experience", "<=", async () => {
        await delay(250);
        return arrayOf(10, (index): ListConfigOptionLabeledValue => {
          const exp = index * 50;
          const label = `${exp} XP`;
          return { label, value: exp, config: {} };
        });
      })
    );

    // build & register the type filter options
    const types: ListConfigOptionLabeledValue[] = [
      {
        label: "Dark",
        value: "dark",
        config: {
          color: "gray-800",
          icon: "Moon",
        },
      },
      {
        label: "Electric",
        value: "electric",
        config: {
          color: "pending",
          icon: "Lightning",
          disabled: true,
        },
      },
      {
        label: "Fire",
        value: "fire",
        config: {
          color: "error",
          icon: "Fire",
        },
      },
      {
        label: "Grass",
        value: "grass",
        config: {
          color: "success",
          icon: "Flower1",
        },
      },
      {
        label: "Water",
        value: "water",
        config: {
          color: "primary",
          icon: "Water",
        },
      },
      {
        label: "Bug",
        value: "bug",
        config: {
          color: "warning-dark",
          icon: "Bug",
        },
      },
      {
        label: "Dragon",
        value: "dragon",
        config: {
          color: "warning-dark",
        },
      },
      {
        label: "Fairy",
        value: "fairy",
        config: {
          color: "primary-medium",
          icon: "Stars",
        },
      },
      {
        label: "Ghost",
        value: "ghost",
        config: {
          color: "gray-900",
          icon: "Snapchat",
        },
      },
      {
        label: "Steel",
        value: "steel",
        config: {
          color: "gray-400",
          icon: "Shield",
        },
      },
      {
        label: "Fighting",
        value: "fighting",
        config: {
          color: "warning",
          icon: "Diamonds",
        },
      },
      {
        label: "Normal",
        value: "normal",
        config: {
          color: "gray",
          icon: "Circle",
        },
      },
      {
        label: "Psychic",
        value: "psychic",
        config: {
          color: "primary-dark",
          icon: "PhoneVibrate",
        },
      },
      {
        label: "Ice",
        value: "ice",
        config: {
          color: "primary",
          icon: "Snow",
        },
      },
      {
        label: "Poison",
        value: "poison",
        config: {
          color: "primary-dark",
          icon: "Cloud",
          default: true,
        },
      },
      {
        label: "Flying",
        value: "flying",
        config: {
          color: "gray-400",
          icon: "Feather",
        },
      },
    ];

    const typeOptions = types.map((type) => {
      const properties: FilterProperty<Pokemon>[] = [
        `types.0.type.name`,
        `types.1.type.name`,
      ];

      return option(
        type.label,
        properties.map((property) => match(property, "=", type.value)),
        { ...type.config, operator: "OR" }
      );
    });
    // build & register the type filter
    filter("Type", typeOptions, {
      operator: BooleanOperators.AND,
    });

    // build & register a filter option for heavy weight

    const heavyOption = option("Heavy", match("weight", ">=", 200), {
      color: "gray-600",
      icon: "BoxArrowDown",
    });

    filter("Weight", [
      // build & register a filter option for light weight
      option("Light", match("weight", "<", 100), {
        color: "gray-200",
        icon: "Feather",
      }),
      // build & register a filter option for medium weight
      option(
        "Medium",
        [match("weight", ">=", 100), match("weight", "<", 200)],
        { operator: BooleanOperators.AND, color: "gray-400" }
      ),
      heavyOption,
    ]);

    // declare some filter presets
    filterPreset(
      "Fire Birds",
      typeOptions.filter(
        (option) => option.label === "Fire" || option.label === "Flying"
      ),
      {
        color: "error",
      }
    );

    const electricType = typeOptions.find(
      (option) => option.label === "Electric"
    );

    filterPreset(
      "Electric Pikachu or Raichu",
      electricType ? [electricType, pikachuOrRaichu] : [pikachuOrRaichu],
      {
        color: "pending",
        exclusive: true,
      }
    );

    filterPreset("Obese mice", [pikachuOrRaichu, heavyOption]);
  });
  return { config, filters };
};

const LoadingFill = styled(Loading)`
  width: 100%;
`;

const Renderer = () => {
  const { data, loading } = useListContext<Pokemon>();

  if (loading) return <LoadingFill animation="ProgressBar" />;
  return (
    <Table layout="fixed">
      <TableHeader sticky top="s-2">
        <TableHeaderCell>
          <Text>Name</Text>
        </TableHeaderCell>

        <TableHeaderCell>
          <Text>Type</Text>
        </TableHeaderCell>
        <TableHeaderCell>
          <Text>Weight</Text>
        </TableHeaderCell>
      </TableHeader>
      <TableBody style="list">
        {data.map((pokemon) => (
          <TableRow style="list" key={String(pokemon.id)}>
            <TableCell padded>
              <Text weight="medium">{capitalize(pokemon.name)}</Text>
            </TableCell>
            <TableCell padded>
              <FlexLayout direction="row" gap="s-1">
                <ListFilterOptionBadge
                  item={pokemon}
                  property="types.0.type.name"
                />
                {pokemon.types[1] && (
                  <ListFilterOptionBadge
                    item={pokemon}
                    property="types.1.type.name"
                  />
                )}
              </FlexLayout>
            </TableCell>
            <TableCell padded>
              <ListFilterOptionBadge item={pokemon} property="weight" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export const PokemonListExample = () => {
  const { config } = usePokemonListConfig();

  return (
    <ListContextProvider config={config}>
      <FlexLayout direction="row" fill gap="s-3">
        <List>
          <SideView direction="column" fill gap="s-3">
            <ListSideHeader title="Pokedex" />
            <ListFilterCollection title="Attributes" />
          </SideView>
          <FlexLayout fill direction="column" gap="s-2">
            <ListFilterPresetCollection />
            <Renderer />
          </FlexLayout>
        </List>
      </FlexLayout>
    </ListContextProvider>
  );
};

const SideView = styled(FlexLayout)`
  width: 340px;
  min-width: 340px;
`;
