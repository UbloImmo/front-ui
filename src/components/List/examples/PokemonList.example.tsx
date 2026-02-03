import { isNumber, isString, type Nullable } from "@ubloimmo/front-util";
import { CSSProperties, useEffect, useRef, useState } from "react";

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
  useDynamicDataProvider,
  usePaginatedDataProvider,
  useStaticDataProvider,
  type DataProviderFilterFnConfig,
  type DataProviderType,
  type FilterProperty,
  type ListConfigOptionLabeledValue,
  type PaginatedDataProviderFetchPageFn,
  type PaginatedDataProviderFetchPageFnParams,
  type UseDataProviderFn,
} from "../modules";
import { filterItems } from "../modules/DataProvider/StaticDataProvider/StaticDataProvider.utils";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Loading } from "@/components/Loading";
import { Text } from "@/components/Text";
import { FlexLayout } from "@/layouts/Flex";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@/layouts/Table";
import {
  arrayOf,
  capitalize,
  cssPx,
  cssVarUsage,
  delay,
  useStatic,
} from "@utils";

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
  sprites: {
    front_default: string;
  };
  cries: {
    latest: string;
    legacy: string;
  };
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
const LIMIT = 60;

const fetchPokemonDataSubset = async (baseUrl = DEFAULT_POKEAPI_URL) => {
  const response = await fetch(baseUrl);
  const data = (await response.json()) as PokemonListResponse;
  const results = await Promise.all(
    data.results.map(async ({ url }) => {
      const singleResponse = await fetch(url);
      return (await singleResponse.json()) as Pokemon;
    })
  );
  return { results, next: data.next };
};

const fetchPokemonData = async (): Promise<Pokemon[]> => {
  let data: Pokemon[] = [];
  let nextUrl: Nullable<string> = DEFAULT_POKEAPI_URL;

  while (isString(nextUrl) && data.length < LIMIT && nextUrl) {
    const { results, next } = await fetchPokemonDataSubset(nextUrl);
    data = [...data, ...results];
    nextUrl = next;
  }
  return data;
};

const useStaticPokemonData: UseDataProviderFn<Pokemon, "static"> = (
  setData
) => {
  return useStaticDataProvider(fetchPokemonData, setData);
};

const dynamicFetchPokemonData = async (
  config: DataProviderFilterFnConfig<Pokemon>
) => {
  const data = await fetchPokemonData();
  return filterItems(data, config);
};

const useDynamicPokemonData: UseDataProviderFn<Pokemon, "dynamic"> = (
  setData
) => {
  return useDynamicDataProvider(dynamicFetchPokemonData, setData);
};

const buildPokeApiUrl = (
  limit: Nullable<number>,
  offset: Nullable<number | string>
) => {
  const url = new URL(DEFAULT_POKEAPI_URL);
  if (isNumber(limit)) url.searchParams.set("limit", String(limit));
  if (isNumber(offset)) url.searchParams.set("offset", String(offset));
  return url.toString();
};

const fetchFilteredPokemonPage = async (
  ...[config, after, pageSize]: PaginatedDataProviderFetchPageFnParams<Pokemon>
) => {
  const url = buildPokeApiUrl(pageSize, after);
  const data = await fetchPokemonDataSubset(url);
  const filteredData = filterItems(data.results, config);
  return { url, data: data.results, filteredData, hasNext: !!data.next };
};

const paginatedFetchPokemonData: PaginatedDataProviderFetchPageFn<
  Pokemon
> = async (config, after, pageSize) => {
  const pageJump = pageSize * 2;
  let offset = (after ?? 0) as number;
  let hasNext = true;
  let pageData: Pokemon[] = [];

  while (pageData.length < pageSize && hasNext) {
    const currentFetch = await fetchFilteredPokemonPage(
      config,
      offset,
      pageJump
    );

    offset += pageJump;
    hasNext = currentFetch.hasNext;
    pageData = [...pageData, ...currentFetch.filteredData];
  }

  pageData = pageData.slice(0, pageSize);
  const finalAfter = !hasNext
    ? null
    : pageData.length
      ? (pageData.at(-1)?.id ?? null)
      : null;

  return {
    pageData,
    after: finalAfter,
    pageSize: pageData.length,
  };
};

const usePaginatedPokemonData: UseDataProviderFn<Pokemon, "paginated"> = (
  setData
) => {
  const paginated = usePaginatedDataProvider(
    paginatedFetchPokemonData,
    setData,
    25
  );
  return {
    ...paginated,
    fetchCount: () => 0,
  };
};

const pokemonDataProviders = {
  static: useStaticPokemonData,
  dynamic: useDynamicPokemonData,
  paginated: usePaginatedPokemonData,
};

const usePokemonListConfig = (
  dataProvider: Exclude<DataProviderType, "custom">
) => {
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
    search,
  } = useListConfig(pokemonDataProviders[dataProvider]);

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
      {
        label: "Psychic",
        value: "psychic",
        config: { color: "primary" },
      },
      {
        label: "Ice",
        value: "ice",
        config: { color: "gray", icon: "Snow" },
      },
      {
        label: "Poison",
        value: "poison",
        config: { color: "primary", icon: "Droplet" },
      },
      {
        label: "Dragon",
        value: "dragon",
        config: { color: "primary", icon: "DiamondsGrid" },
      },
      {
        label: "Normal",
        value: "normal",
        config: { color: "gray" },
      },
      {
        label: "Bug",
        value: "bug",
        config: { color: "warning-dark", icon: "Bug" },
      },
      {
        label: "Flying",
        value: "flying",
        config: { color: "primary", icon: "Airplane" },
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
      initial: true,
    });
    const medium = option(
      "Medium",
      [match("weight", ">=", 100), match("weight", "<", 200)],
      {
        operator: "AND",
        color: "gray-400",
        default: true,
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
    async.filter("Base Experience", baseExperiences, {
      emptyFallback: "all",
    });
    filter("Type", types.all, {
      operator: BooleanOperators.OR,
      // noResultsIfInactive: true,
    });
    filter("Weight", weights.all, {
      // emptyFallback: ["default", "initial"],
    });
  });

  // declare some filter presets once
  // order matters.
  useStatic(() => {
    filterPreset(
      "PyroElectric lightweights",
      [types.fire, types.electric, weights.light],
      {
        color: "error",
        operator: BooleanOperators.AND,
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

  useStatic(() => {
    search.properties(["name", "types.0.type.name", "types.1.type.name"]);
  });

  return config;
};

const spriteStyle: CSSProperties = {
  aspectRatio: "1/1",
  height: cssVarUsage("s-12"),
  cursor: "help",
};

const Renderer = () => {
  const { data } = useListContext<Pokemon>();

  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    if (audioUrl) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [audioUrl]);

  return (
    <>
      <audio ref={audioRef} src={audioUrl} />
      <Table layout="fixed">
        <TableHeader sticky top="s-2">
          <TableHeaderCell>
            <Text>Name</Text>
          </TableHeaderCell>
          <TableHeaderCell>
            <Text>Id</Text>
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
                <FlexLayout direction="row" fill align="center" justify="start">
                  {pokemon.sprites.front_default && (
                    <img
                      style={spriteStyle}
                      src={pokemon.sprites.front_default}
                      onClick={() => setAudioUrl(pokemon.cries.latest)}
                    />
                  )}
                  <Text weight="medium">{capitalize(pokemon.name)}</Text>
                </FlexLayout>
              </TableCell>
              <TableCell padded>
                <Text weight="medium">{pokemon.id}</Text>
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
    </>
  );
};

const loadingContainerStyle: CSSProperties = {
  width: "100%",
  position: "sticky",
  inset: 0,
  bottom: "unset",
};

const loadingFillStyle: CSSProperties = {
  width: "100%",
};

const LoadingBar = () => {
  const { dataProvider } = useListContext<Pokemon>();
  if (!dataProvider.loading) return null;
  return (
    <div style={loadingContainerStyle}>
      <Loading styleOverride={loadingFillStyle} animation="ProgressBar" />
    </div>
  );
};

const NextPageButton = () => {
  const { dataProvider, loading } = useListContext<Pokemon, "paginated">();

  if (!dataProvider.hasNextPage || dataProvider.type !== "paginated")
    return null;
  return (
    <Button
      onClick={dataProvider.nextPage}
      label="Fetch next page"
      loading={loading}
      fullWidth
      secondary
    />
  );
};

const SearchBox = () => {
  const { query, changeQuery } = useListContext<Pokemon>();
  return <Input type="text" value={query} onChange={changeQuery} />;
};

export type PokemonListExampleProps = {
  dataProvider?: Exclude<DataProviderType, "custom">;
};

const sideViewWidth = cssPx(340);
const sideViewStyles: CSSProperties = {
  width: sideViewWidth,
  maxWidth: sideViewWidth,
  minWidth: sideViewWidth,
  position: "sticky",
  top: cssVarUsage("s-2"),
  left: 0,
};

export const PokemonListExample = ({
  dataProvider = "static",
}: PokemonListExampleProps) => {
  const config = usePokemonListConfig(dataProvider);

  return (
    <ListContextProvider config={config}>
      <FlexLayout direction="row" fill gap="s-3">
        <List>
          <FlexLayout
            styleOverride={sideViewStyles}
            direction="column"
            fill
            gap="s-3"
          >
            <ListSideHeader title="Pokedex" />
            <SearchBox />
            <ListFilterCollection title="Attributes" />
          </FlexLayout>
          <FlexLayout fill direction="column" gap="s-2">
            <ListFilterPresetCollection />
            <LoadingBar />
            <Renderer />
            <NextPageButton />
          </FlexLayout>
        </List>
      </FlexLayout>
    </ListContextProvider>
  );
};
