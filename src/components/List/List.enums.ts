import type {
  FilterBooleanOperator,
  FilterComparisonOperatorName,
  FilterComparisonOperator,
  FilterSearchOperator,
} from "./modules/shared.types";
import type { ValueMap } from "@ubloimmo/front-util";

export const BooleanOperators: ValueMap<
  FilterBooleanOperator,
  FilterBooleanOperator
> = {
  AND: "AND",
  OR: "OR",
};

export const SearchOperators: ValueMap<
  FilterSearchOperator,
  FilterSearchOperator
> = {
  contains: "contains",
  startsWith: "startsWith",
  endsWith: "endsWith",
};

export const ComparisonOperators: ValueMap<
  FilterComparisonOperatorName,
  FilterComparisonOperator
> = {
  ...SearchOperators,
  eq: "=",
  neq: "!=",
  lt: "<",
  lte: "<=",
  gt: ">",
  gte: ">=",
};
