import type { GridAlignment } from "@layouts";
import type { PopoverContentProps as PopoverPrimitiveContentProps } from "@radix-ui/react-popover";
import type { Direction, FixedCssLength, StyleProps } from "@types";
import type {
  GenericFn,
  NonNullish,
  Nullable,
  VoidFn,
} from "@ubloimmo/front-util";
import type { ReactNode } from "react";

export type PopoverAlignment = Exclude<GridAlignment, "baseline">;

export type PopoverCollisionCompoundPadding = Partial<
  Record<Direction, FixedCssLength>
>;

export type PopoverCollisionPadding =
  | FixedCssLength
  | PopoverCollisionCompoundPadding;

export type PopoverPrimitiveCollisionPadding =
  PopoverPrimitiveContentProps["collisionPadding"];

type PopoverBoundary = Nullable<Element>;

type PopoverCollisionBoundary = PopoverBoundary | PopoverBoundary[];

type PopoverSticky = PopoverPrimitiveContentProps["sticky"];

type PopoverContentProps = {
  /**
   * The preferred side of the anchor to render against when open.
   * Will be reversed when collisions occur and avoidCollisions is enabled.
   *
   * @type {Direction}
   * @default "bottom"
   */
  side?: Direction;
  /**
   * Distance from the trigger.
   *
   * Will be normalized to pixels.
   *
   * @type {FixedCssLength}
   * @default "s-1"
   */
  sideOffset?: FixedCssLength;
  /**
   * The preferred alignment against the trigger.
   * May change when collisions occur.
   *
   * @type {PopoverAlignment}
   * @default "center"
   */
  align?: PopoverAlignment;
  /**
   * Offset from the alignment
   *
   * @remarks Only takes effect when `align` is set to `start` or `end`.
   *
   * @type {FixedCssLength}
   * @default 0
   */
  alignOffset?: FixedCssLength;
  /**
   * The element used as the collision boundary.
   *
   * Viewport by default, though you can provide additional element(s) to be included in this check.
   *
   * @type {PopoverCollisionBoundary}
   * @default []
   *
   */
  collisionBoundary?: PopoverCollisionBoundary;
  /**
   * The distance from the boundary edges where collision detection should occur.
   *
   * @type {PopoverCollisionPadding}
   * @default 0
   */
  collisionPadding?: PopoverCollisionPadding;
  /**
   * The sticky behavior on the align axis.
   *
   * `partial` will keep the content in the boundary
   * as long as the trigger is at least partially in the boundary
   * whilst `always` will keep the content in the boundary regardless.
   *
   * @type {"partial" | "always"}
   * @default "partial"
   */
  sticky?: PopoverSticky;
  /**
   * Whether to wrap the content in a simple card.
   *
   * @default false
   */
  wrapContent?: boolean;
};

export type PopoverOnOpenChangeFn = VoidFn<[boolean]>;

export type PopoverContentFn = GenericFn<[], ReactNode>;

export type PopoverContent = NonNullish<ReactNode | PopoverContentFn>;

type UncontrolledPopoverProps = PopoverContentProps & {
  // TODO
  /**
   * The trigger for the popover.
   */
  children: ReactNode;
  /**
   * The popover's content.
   */
  content: PopoverContent;
  /**
   * Whether to fit the width of the content to the width of the trigger
   *
   * @default false
   */
  fitTriggerWidth?: boolean;
  /**
   * Whether the popover is open by default
   *
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Whether the popover trigger should take all available width
   *
   * @default false
   */
  fill?: boolean;
};

export type ControlledPopoverPropsExtension = {
  /**
   * Whether the popover is open
   *
   * @remarks Requires `onOpenChange` to be provided
   *
   * @required
   */
  open: boolean;
  /**
   * Callback fired when the popover's open state changes
   *
   * @remarks Used in conjunction with `open`
   *
   * @required
   */
  onOpenChange: PopoverOnOpenChangeFn;
};

type ControlledPopoverProps = UncontrolledPopoverProps &
  ControlledPopoverPropsExtension;

export type PopoverProps = UncontrolledPopoverProps | ControlledPopoverProps;

export type ControlledPopoverDefaultProps = Required<ControlledPopoverProps>;

export type UncontrolledPopoverDefaultProps =
  Required<UncontrolledPopoverProps>;

export type PopoverDefaultProps =
  | UncontrolledPopoverDefaultProps
  | ControlledPopoverDefaultProps;

export type PopoverContentStyleProps = StyleProps<
  Pick<UncontrolledPopoverProps, "fitTriggerWidth">
>;

export type PopoverTriggerStyleProps = StyleProps<
  Pick<UncontrolledPopoverProps, "fill">
>;
