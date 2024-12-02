import type {
  FilterBooleanOperator,
  FilterComparisonOperatorName,
  FilterComparisonOperator,
} from "./modules/shared.types";
import type { ValueMap } from "@ubloimmo/front-util";

export const BooleanOperators: ValueMap<
  FilterBooleanOperator,
  FilterBooleanOperator
> = {
  AND: "AND",
  OR: "OR",
};

export const ComparisonOperators: ValueMap<
  FilterComparisonOperatorName,
  FilterComparisonOperator
> = {
  eq: "=",
  neq: "!=",
  lt: "<",
  lte: "<=",
  gt: ">",
  gte: ">=",
};
