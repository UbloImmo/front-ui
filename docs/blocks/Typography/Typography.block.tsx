import { CodeOrSourceMdx } from "@storybook/addon-docs/blocks";
import { isString } from "@ubloimmo/front-util";
import {
  AnchorHTMLAttributes,
  BlockquoteHTMLAttributes,
  DetailedHTMLProps,
  Fragment,
  HTMLAttributes,
  LiHTMLAttributes,
  useMemo,
  type ReactNode,
} from "react";
import { components } from "storybook/internal/components";

import styles from "./Typography.module.scss";
import { Callout } from "../Callout";
import { flattenTypographyChildren, isChildrenArray } from "./Typography.utils";

import {
  Heading as HeadingComponent,
  Text as TextComponent,
} from "@/components";
import { isNonEmptyString, useCssClasses, useCssVariables } from "@/utils";
import {
  StyleProps,
  type HeadingProps,
  type PaletteColor,
  type TextProps,
} from "@types";

/**
 * Renders a heading component with the specified children and props.
 * Intended for use within Storybook MDX documentation files.
 *
 * @param {ReactNode} children - The content to be rendered inside the heading.
 * @param {Omit<HeadingProps, "$important">} props - The props to be passed to the heading component.
 * @return {ReactNode} The rendered heading component.
 */
export const Heading = ({
  children,
  className,
  ...props
}: Omit<HeadingProps, "important"> & { children: ReactNode }): ReactNode => {
  const id = useMemo(() => {
    if (isString(props.id)) return props.id;
    if (isString(children)) return children;
    return undefined;
  }, [props.id, children]);

  const klass = useCssClasses(
    styles.heading,
    styles[`size-${props.size ?? "h1"}`],
    className
  );

  return (
    <HeadingComponent className={klass} {...props} id={id} important>
      {children}
    </HeadingComponent>
  );
};

/**
 * Returns a Heading component with the specified size, weight and color.
 * Used to replace documentation MDX components.
 *
 * @param {Omit<HeadingProps, "size" | "important" | "weight" | "color">} props - The other props for the heading
 */
export const specificHeading =
  (
    size: HeadingProps["size"],
    weight: HeadingProps["weight"] = "medium",
    color: PaletteColor = "gray-900"
  ) =>
  ({
    children,
    ...props
  }: Omit<
    HeadingProps,
    "size" | "important" | "weight" | "color"
  >): ReactNode => (
    <Heading {...props} size={size} weight={weight} color={color}>
      {children}
    </Heading>
  );

/**
 * Renders a Text component with given children and props.
 * Intended for use within Storybook MDX documentation files.
 *
 * @param {Omit<TextProps, "$important"> & { children: ReactNode }} children - The children to be rendered within the Text component.
 * @return {ReactNode} The rendered Text component.
 */
export const Text = ({
  children,
  className,
  ...props
}: Omit<TextProps, "important"> & { children: ReactNode }): ReactNode => {
  const klass = useCssClasses(
    styles.text,
    styles[`size-${props.size ?? "m"}`],
    className
  );
  return (
    <TextComponent className={klass} {...props} important>
      {children}
    </TextComponent>
  );
};

/**
 * Returns a Text component with the specified size and props.
 * Used to replace documentation MDX components.
 *
 * @param {TextProps["size"]} size - The size of the text
 * @param {TextProps["weight"]} [weight = "regular"] - The weight of the text
 * @param {PaletteColor} [color = "gray-900"] - The color of the text
 * @param {Omit<TextProps, "size" | "important">} props - The other props for the heading
 */
export const textOfSize =
  (
    size: TextProps["size"],
    weight: TextProps["weight"] = "regular",
    color: PaletteColor = "gray-900"
  ) =>
  ({
    children,
    ...props
  }: Omit<TextProps, "size" | "important" | "weight" | "color">) => (
    <Text {...props} size={size} weight={weight} color={color}>
      {children}
    </Text>
  );

type PreProps = DetailedHTMLProps<
  HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
> &
  StyleProps<{
    background?: PaletteColor;
    foreground?: PaletteColor;
    padded?: boolean;
  }>;

export const Pre = ({
  $background,
  $foreground,
  $padded,
  className,
  style,
  ...props
}: PreProps) => {
  const klass = useCssClasses(styles.pre, [styles.padded, $padded], className);
  const vars = useCssVariables(
    {
      "pre-bg": $background,
      "pre-fg": $foreground,
    },
    style
  );

  return <pre className={klass} style={vars} {...props} />;
};

export const Em = ({
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
  const klass = useCssClasses(styles.em, className);
  return <em className={klass} {...props} />;
};

export const Strong = ({
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
  const klass = useCssClasses(styles.strong, className);
  return <strong className={klass} {...props} />;
};

export const Code = ({
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
  const klass = useCssClasses(styles.code, className);
  if (
    isNonEmptyString(className) &&
    className
      .split(" ")
      .some(
        (classPart) =>
          classPart.startsWith("lang-") || classPart.startsWith("language-")
      )
  )
    return <CodeOrSourceMdx className={className} {...props} />;
  return <code className={klass} {...props} />;
};

const Anchor = components.a;

export const A = ({
  className,
  href,
  children,
  ...props
}: DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) => {
  const klass = useCssClasses(styles.anchor, className);
  const content = useMemo(
    () => flattenTypographyChildren(children),
    [children]
  );
  return (
    <Anchor className={klass} href={href} title={props.title} {...props}>
      {content}
    </Anchor>
  );
};

export const BlockQuote = ({
  children,
}: DetailedHTMLProps<
  BlockquoteHTMLAttributes<HTMLQuoteElement>,
  HTMLQuoteElement
>) => {
  return <Callout icon={null}>{children ?? ""}</Callout>;
};

export const Ul = ({
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>) => {
  const klass = useCssClasses(styles.ul, className);
  return <ul className={klass} {...props} />;
};

export const Li = ({
  className,
  children,
  ...props
}: DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>) => {
  const klass = useCssClasses(styles.li, className);
  const textClass = useCssClasses(styles["li-text"]);
  return (
    <li className={klass} {...props}>
      {isString(children) ? (
        <TextComponent
          color="gray-700"
          size="m"
          weight="regular"
          className={textClass}
        >
          {children}
        </TextComponent>
      ) : isChildrenArray(children) ? (
        children.map((child, childIndex) =>
          isString(child) ? (
            <TextComponent
              color="gray-700"
              size="m"
              weight="regular"
              key={String(childIndex)}
              className={textClass}
            >
              {child}
            </TextComponent>
          ) : (
            <Fragment key={String(childIndex)}>{child}</Fragment>
          )
        )
      ) : (
        children
      )}
    </li>
  );
};

export const Hr = ({
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement>) => {
  const klass = useCssClasses(styles.hr, className);
  return <hr className={klass} {...props} />;
};
