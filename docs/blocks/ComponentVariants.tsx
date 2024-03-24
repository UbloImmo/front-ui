import type { FlexAlignment, FlexGap } from "../../src/layouts";
import type { FC } from "react";
import { FlexRowLayout } from "../../src/layouts";
import { Text } from "../../src/components";
import { useMemo } from "react";
import styled from "styled-components";

type ComponentVariantsConfig<
  TComponentProps extends Record<string, unknown>,
  TPropKey extends keyof TComponentProps
> = {
  for: TPropKey;
  of: FC<TComponentProps>;
  defaults: TComponentProps;
  variants: TComponentProps[TPropKey][];
  gap?: FlexGap;
  align?: FlexAlignment;
  showLabels?: boolean;
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
    return props.variants.map(
      (variant): PropVariant<TComponentProps> => ({
        ...props.defaults,
        [props.for]: variant,
        __propVariantLabel: JSON.stringify(variant).replace(/"/g, ""),
      })
    );
  }, [props]);

  console.log("runs");

  const Component = useMemo(() => {
    return props.of;
  }, [props.of]);
  return (
    <FlexRowLayout gap={props.gap ?? "s-8"} align={props.align ?? "start"} wrap>
      {propVariants.map((variantProps, index) => (
        <ComponentWrapper key={`${variantProps.__propVariantLabel}-${index}`}>
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
    </FlexRowLayout>
  );
};

const ComponentWrapper = styled.article`
  position: relative;
  transform-origin: center;

  .component-container {
    max-height: max-content;
    min-height: max-content;
    transition: transform 150ms ease-out 0s;
  }

  &:hover {
    .component-container {
      transform: scale(1.5);
      z-index: 3;
    }

    .prop-variant-label {
      pointer-events: all;
      opacity: 1;
      filter: blur(0);
    }
  }
`;

const ComponentLabelContainer = styled.div`
  position: absolute;
  top: calc(100% + var(--s-1));
  justify-content: center;
  display: flex;
  opacity: 0;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  border-radius: var(--s-4);
  filter: blur(var(--s-2));
  background: var(--gray-50-80);
  padding: var(--s-05) var(--s-2);
  z-index: 2;
  transition: opacity 150ms ease-out 0s, filter 150ms ease-out 0s;

  code {
    white-space: nowrap;
    font-size: var(--text-xs);
  }
`;
