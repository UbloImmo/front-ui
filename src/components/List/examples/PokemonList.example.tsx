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
const LIMIT = 250;

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

  // make the list's options read the search params
  useStatic(() => configureSearchParams({ sync: "read" }));

  // declare name options once
  const names = useStatic(() => {
    const clefairy = option("Clefairy", match("name", "=", "clefairy"), {
      color: "primary",
    });
    const pikachuOrRaichu = option(
      "Pikachu or Raichu",
      matches("name", "=", ["pikachu", "raichu"]),
      { color: "pending-dark", operator: "OR" }
    );
    const legendaries = options(
      "name",
      "=",
      [
        { label: "Entei", value: "entei" },
        { label: "Cresselia", value: "cresselia" },
        { label: "Suicune", value: "suicune" },
      ],
      { icon: "Stars", color: "primary" }
    );

    const all = [clefairy, pikachuOrRaichu, ...legendaries];

    return {
      clefairy,
      pikachuOrRaichu,
      legendaries,
      all,
    };
  });

  // declare base experience options once
  const baseExperiences = useStatic(() =>
    async.options("base_experience", "<=", async () => {
      await delay(250);
      return arrayOf(10, (index): ListConfigOptionLabeledValue => {
        const exp = index * 50;
        const label = `${exp} XP`;
        return { label, value: exp, config: {} };
      });
    })
  );

  // declare type options once
  // pokemon can have up to 2 types, so we need to declare options that match both types
  const types = useStatic(() => {
    const typesLabeledValues: ListConfigOptionLabeledValue[] = [
      {
        label: "Fire",
        value: "fire",
        config: { color: "error", icon: "Fire" },
      },
      {
        label: "Grass",
        value: "grass",
        config: { color: "success", icon: "Flower1" },
      },
      {
        label: "Water",
        value: "water",
        config: { color: "primary", icon: "Water" },
      },
      {
        label: "Electric",
        value: "electric",
        config: { color: "pending", icon: "Lightning" },
      },
    ];
    const typeProperties: FilterProperty<Pokemon>[] = [
      `types.0.type.name`,
      `types.1.type.name`,
    ];

    const all = typesLabeledValues.map(({ label, value, config }) =>
      option(
        label,
        typeProperties.map((property) => match(property, "=", value)),
        { ...(config ?? {}), operator: "OR" }
      )
    );
    const [fire, grass, water, electric] = all;
    return {
      all,
      fire,
      grass,
      water,
      electric,
    };
  });

  // declare weight options once
  const weights = useStatic(() => {
    const heavy = option("Heavy", match("weight", ">=", 200), {
      color: "gray-600",
      icon: "BoxArrowDown",
    });
    const light = option("Light", match("weight", "<", 100), {
      color: "gray-200",
      icon: "Feather",
    });
    const medium = option(
      "Medium",
      [match("weight", ">=", 100), match("weight", "<", 200)],
      {
        operator: "AND",
        color: "gray-400",
      }
    );
    const all = [light, medium, heavy];
    return {
      heavy,
      light,
      medium,
      all,
    };
  });

  // declare filters once
  // order matters.
  useStatic(() => {
    filter("Name", names.all, { multi: true });
    async.filter("Base Experience", baseExperiences);
    filter("Type", types.all, { operator: BooleanOperators.OR });
    filter("Weight", weights.all);
  });

  // declare some filter presets once
  // order matters.
  useStatic(() => {
    filterPreset(
      "PyroElectric lightweights",
      [types.fire, types.electric, weights.light],
      {
        color: "error",
      }
    );
    filterPreset(
      "Electric Pikachu or Raichu",
      [types.electric, names.pikachuOrRaichu],
      {
        color: "pending",
        exclusive: true,
      }
    );
    filterPreset("Obese mice", [names.pikachuOrRaichu, weights.heavy]);
  });

  return config;
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
  const config = usePokemonListConfig();

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
