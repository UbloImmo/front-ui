import type { DialogProps } from "../Dialog";
import type { StyleProps } from "@types";
import type { Nullable } from "@ubloimmo/front-util";

export type ModalSize = "s" | "m" | "l";

export type ModalProps = Omit<DialogProps, "reference"> & {
  /**
   * Modal's dialog reference, used to control modal open / close state using `useDialogManager`
   */
  reference?: Nullable<string>;
  /**
   * Modal title
   *
   * @remarks renders as bold h2 heading
   *
   * @default null
   */
  title?: Nullable<string>;
  /**
   * Modal minimum size
   * @type {ModalSize}
   * @default "m"
   */
  size?: ModalSize;
};

export type ModalDefaultProps = Required<ModalProps>;

export type ModalStyleProps = StyleProps<{ size: ModalSize }>;
