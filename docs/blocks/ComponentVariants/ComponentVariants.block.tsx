import { isNumber, isObject, isString, type KeyOf } from "@ubloimmo/front-util";
import { useMemo } from "react";

import styles from "./ComponentVariants.module.scss";
import {
  ComponentVariantsConfig,
  ComponentVariantsDetailedConfig,
  PropVariant,
} from "./ComponentVariants.types";

import { FlexLayout, GridLayout } from "@/layouts";
import { cssClasses, cssVariables, useCssClasses } from "@utils";

import { Text } from "@components";

import type {
  FlexLayoutProps,
  GridAlignment,
  GridLayoutProps,
} from "@/layouts";

const isDetailedConfig = <
  TComponentProps extends Record<string, unknown>,
  TPropKey extends keyof TComponentProps & string,
>(
  props:
    | ComponentVariantsConfig<TComponentProps, TPropKey>
    | ComponentVariantsDetailedConfig<TComponentProps>
): props is ComponentVariantsDetailedConfig<TComponentProps> => {
  return !("for" in props);
};

/**
 * Renders the same component many times with different values for a single prop
 *
 * @template {Record<string, unknown>} TComponentProps - The component's props
 * @template {KeyOf<TComponentProps, string>} TPropKey - The key of the prop to vary upon
 * @param {ComponentVariantsConfig<TComponentProps, TPropKey>} props - The config of what component to render and how to vary the prop
 * @returns {JSX.Element} The rendered grid
 */
export const ComponentVariants = <
  TComponentProps extends Record<string, unknown>,
  TPropKey extends KeyOf<TComponentProps, string> = KeyOf<
    TComponentProps,
    string
  >,
>(
  props:
    | ComponentVariantsConfig<TComponentProps, TPropKey>
    | ComponentVariantsDetailedConfig<TComponentProps>
): JSX.Element => {
  const propVariants = useMemo<PropVariant<TComponentProps>[]>(() => {
    if (isDetailedConfig(props)) {
      return props.variants.map(
        (variant): PropVariant<TComponentProps> => ({
          ...props.defaults,
          ...variant,
          __propVariantLabel: isString(variant?.__propVariantLabel)
            ? variant.__propVariantLabel
            : JSON.stringify(variant).replace(/"/g, ""),
        })
      );
    }

    return props.variants.map((variant): PropVariant<TComponentProps> => {
      const isCompound =
        isObject(variant) &&
        "value" in variant &&
        "label" in variant &&
        isString(variant.label) &&
        (typeof variant.value === typeof props.defaults[props.for] ||
          props.forceCompound);
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
        fill={props.fill ?? false}
        wrap
      >
        {children}
      </FlexLayout>
    );
  }, [props]);

  const isGrid = useMemo(() => !!props.columns, [props.columns]);

  const container = useCssClasses(styles["component-variants-container"], [
    styles.grid,
    isGrid,
  ]);

  const wrapper = useMemo(
    () => ({
      className: cssClasses(
        styles["component-wrapper"],
        [styles["fill-column"], props.fill === "column"],
        [styles["fill-row"], props.fill === "row"]
      ),
      style: cssVariables({ scaling: props.scaling ?? 1 }),
    }),
    [props.fill, props.scaling]
  );

  const labelContainer = useCssClasses(styles["component-label-container"]);
  const componentContainer = useCssClasses(styles["component-container"]);

  return (
    <div className={container}>
      <Wrapper>
        {propVariants.map((variantProps, index) => (
          <article
            key={`${variantProps.__propVariantLabel}-${index}`}
            className={wrapper.className}
            style={wrapper.style}
          >
            <div className={componentContainer}>
              <Component {...variantProps} />
            </div>
            <div className={labelContainer}>
              <Text size="xs" color="gray-600" weight="medium">
                <code>{variantProps.__propVariantLabel}</code>
              </Text>
            </div>
          </article>
        ))}
      </Wrapper>
    </div>
  );
};
