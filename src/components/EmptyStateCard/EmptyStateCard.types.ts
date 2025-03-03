import type * as Assets from "./assets";
import type { EmptyStateCardAssetProps } from "./assets/assets.types";
import type { KeyOf, Nullable } from "@ubloimmo/front-util";
import type { ReactNode } from "react";

export type EmptyStateAssetName = KeyOf<typeof Assets, string>;

export type EmptyStateCardProps = EmptyStateCardAssetProps & {
  // TODO
  /**
   * The name of the asset to display or null.
   *
   * @remarks
   * If no asset is provided, none will be rendered.
   *
   * @type {Nullable<EmptyStateAssetName>}
   * @default null
   */
  asset?: Nullable<EmptyStateAssetName>;
  /**
   * The title to display in the card. Usually a string or some JSX markup.
   *
   * @remarks
   * If nullish or falsy, the title will default to the `empty` status translation
   *
   * @type {ReactNode}
   * @default null
   */
  title?: ReactNode;
  /**
   * A description to display in the card. Gets rendered in a `Text` component.
   *
   * @remarks
   * Will get replaced by `editingDescription` if provided and within a form in edit state
   *
   * @type {ReactNode}
   * @default null
   */
  description?: ReactNode;
  /**
   * A description to display in the card when it's within a form in edit state.
   *
   * @remarks
   * Only replaces the `description` if the composant is within a form in edit state.
   *
   * @type {ReactNode}
   * @default null
   */
  editingDescription?: ReactNode;
};

export type EmptyStateCardDefaultProps = Required<EmptyStateCardProps>;
