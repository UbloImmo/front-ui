import { isNumber, isObject, isString } from "@ubloimmo/front-util";
import { useMemo } from "react";
import styled, { css } from "styled-components";

import { FlexLayout, GridLayout } from "@/layouts";

import { Text } from "@components";

import type {
  FlexAlignment,
  FlexDirection,
  FlexGap,
  FlexLayoutProps,
  GridAlignment,
  GridLayoutProps,
} from "@/layouts";
import type { FC } from "react";

type ComponentVariantsConfig<
  TComponentProps extends Record<string, unknown>,
  TPropKey extends keyof TComponentProps
> = {
  /**
   * The key of the prop to vary upon.
   * @required
   */
  for: TPropKey;
  /**
   * The component to render the variants for.
   * @required
   */
  of: FC<TComponentProps>;
  /**
   * The default values for the component's props.
   * @required
   */
  defaults: TComponentProps;
  /**
   * List of possible values for the component's prop.
   * @required
   */
  variants:
    | TComponentProps[TPropKey][]
    | { value: TComponentProps[TPropKey]; label: string }[];
  /**
   * Dictates the gap between the variants.
   * @default "2rem".
   */
  gap?: FlexGap;
  /**
   * Setting this property wraps all variants in a {@link GridLayout}.
   * Provided a number for a fixed number of columns, `auto` creates 1 column per variant.
   *
   * @type {number | "auto"}
   * @default undefined
   */
  columns?: number | "auto";
  /**
   * Dictates the vertical alignment of the variants.
   * @default "start".
   */
  align?: FlexAlignment;
  /**
   * Dictates the horizontal alignment of the variants.
   * @default "start".
   */
  justify?: FlexAlignment;
  /**
   * Dictates the flex direction of the variants
   * @default "row"
   */
  direction?: FlexDirection;
  /**
   * By how much to scale a selected variant on hover.
   * @default 1.5
   */
  scaling?: number;
  /**
   * Whether to include the prop's name in the labels while hovering.
   * @remarks This will be ignored if the `variants` contain their own labels
   * @default false
   */
  propLabels?: boolean;
};

type PropVariant<TComponentProps extends Record<string, unknown>> =
  TComponentProps & {
    __propVariantLabel: string;
  };

/**
 * Renders the same component many times with different values for a single prop
 *
 * @template {Record<string, unknown>} TComponentProps - The component's props
 * @template {keyof TComponentProps & string} TPropKey - The key of the prop to vary upon
 * @param {ComponentVariantsConfig<TComponentProps, TPropKey>} config - The config of what component to render and how to vary the prop
 * @returns {JSX.Element} The rendered grid
 */
export const ComponentVariants = <
  TComponentProps extends Record<string, unknown>,
  TPropKey extends keyof TComponentProps & string
>(
  props: ComponentVariantsConfig<TComponentProps, TPropKey>
): JSX.Element => {
  const propVariants = useMemo<PropVariant<TComponentProps>[]>(() => {
    return props.variants.map((variant): PropVariant<TComponentProps> => {
      const isCompound =
        isObject(variant) &&
        "value" in variant &&
        "label" in variant &&
        isString(variant.label) &&
        typeof variant.value === typeof props.defaults[props.for];
      if (isCompound)
        return {
          ...props.defaults,
          [props.for]: variant.value,
          __propVariantLabel: variant.label,
        };
      let label = JSON.stringify(variant).replace(/"/g, "");
      if (props.propLabels) {
        label = `${props.for}:${label}`;
      }
      return {
        ...props.defaults,
        [props.for]: variant,
        __propVariantLabel: label,
      };
    });
  }, [props]);

  const Component = useMemo(() => {
    return props.of;
  }, [props.of]);

  const Wrapper = useMemo(() => {
    if (props.columns) {
      const columns = Array(
        isNumber(props.columns) ? props.columns : props.variants.length
      ).fill("1fr");
      const align =
        props.align &&
        ["start", "center", "end"].includes(props.align as GridAlignment)
          ? (props.align as GridAlignment)
          : "start";
      return ({ children }: GridLayoutProps) => (
        <GridLayout align={align} gap={props.gap} columns={columns}>
          {children}
        </GridLayout>
      );
    }
    return ({ children }: FlexLayoutProps) => (
      <FlexLayout
        direction={props.direction ?? "row"}
        gap={props.gap ?? "s-8"}
        align={props.align}
        justify={props.justify}
        wrap
      >
        {children}
      </FlexLayout>
    );
  }, [props]);

  const isGrid = useMemo(() => !!props.columns, [props.columns]);
  return (
    <Container $grid={isGrid}>
      <Wrapper>
        {propVariants.map((variantProps, index) => (
          <ComponentWrapper
            key={`${variantProps.__propVariantLabel}-${index}`}
            $scaling={props.scaling}
            $grid={isGrid}
          >
            <div className="component-container">
              <Component {...variantProps} />
            </div>
            <ComponentLabelContainer className="prop-variant-label">
              <Text size="xs" color="gray-600" weight="semiBold">
                <code>{variantProps.__propVariantLabel}</code>
              </Text>
            </ComponentLabelContainer>
          </ComponentWrapper>
        ))}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div<{ $grid?: boolean }>`
  ${({ $grid }) =>
    $grid &&
    css`
      width: 100%;
    `}

  *[data-testid="grid"] > &,
  *[data-testid="grid"] > & > div > article {
    width: 100%;
  }

  & > div {
    width: 100%;
  }
`;

const ComponentWrapper = styled.article<{ $scaling?: number; $grid?: boolean }>`
  position: relative;
  transform-origin: center;
  background: var(--primary-light-0);
  transition: background 150ms ease-out 0s;
  padding: var(--s-2);
  border-radius: var(--s-2);

  *[data-testid="grid"] > & {
    width: 100%;
  }

  .component-container {
    max-height: max-content;
    min-height: max-content;
    transform-origin: center;
    transition: transform 150ms ease-out 0s;
  }

  &:hover {
    .component-container {
      transform: scale(${({ $scaling }) => $scaling ?? 1.2});
      z-index: 3;
    }

    .prop-variant-label {
      pointer-events: all;
      opacity: 1;
      filter: blur(0);
    }
    background: var(--primary-light-30);
  }
`;

const ComponentLabelContainer = styled.div`
  position: absolute;
  top: calc(100% + var(--s-1));
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  border-radius: var(--s-4);
  filter: blur(var(--s-2));
  background: var(--primary-light-30);
  padding: var(--s-05) var(--s-2);
  z-index: 2;
  transition: opacity 150ms ease-out 0s, filter 150ms ease-out 0s;

  code {
    white-space: nowrap;
    font-size: var(--text-xs);
  }
`;
