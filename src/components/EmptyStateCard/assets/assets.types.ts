import type { IconName } from "@/components/Icon";
import type { ColorKey } from "@types";

export type EmptyStateCardAssetProps = {
  /**
   * The icon to display in the asset.
   *
   * @remarks
   * Some assets may or may not make use of this property
   *
   * @type {IconName}
   * @default "Square"
   */
  icon?: IconName;
  /**
   * The color of the asset.
   *
   * @type {ColorKey}
   * @default "primary"
   */
  color?: ColorKey;
};

export type EmptyStateCardAssetDefaultProps =
  Required<EmptyStateCardAssetProps>;
