import { isNull } from "@ubloimmo/front-util";
import { useCallback, useMemo } from "react";
import styled from "styled-components";

import { buildChipContainerStyles, buildChipButtonStyles } from "./Chip.styles";
import { Icon } from "../Icon";
import { Text } from "../Text";

import { FlexRowLayout } from "@layouts";
import {
  isEmptyString,
  useLogger,
  useMergedProps,
  useStyleProps,
  useTestId,
} from "@utils";

import type { ChipProps, DefaultChipProps } from "./Chip.types";
import type { PaletteColor, StyleProps, TestIdProps } from "@types";

const defaultChipProps: DefaultChipProps = {
  label: "[Chip]",
  icon: "Square",
  color: "primary",
  iconPlacement: "left",
  onDelete: null,
  deleteButtonTitle: null,
};

/**
 * An interactive `Badge` with a remove button, can be used as a filter tag.
 *
 * @version 0.0.1
 * @param {ChipProps} props - the props for the Chip component
 * @returns {JSX.Element} - the Chip component
 */
const Chip = (props: ChipProps & TestIdProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultChipProps, props);
  const styledProps = useStyleProps(mergedProps);
  const testId = useTestId("chip", props);

  const { label, icon, color, deleteButtonTitle } = mergedProps;
  const { warn } = useLogger("Chip");

  const onDelete = useCallback(() => {
    if (isNull(mergedProps.onDelete)) return;
    mergedProps.onDelete();
  }, [mergedProps]);

  const { iconColorStyle, textColorStyle } = useMemo(() => {
    const iconColorStyle = `${color}-base` as PaletteColor;
    const textColorStyle = `${color}-dark` as PaletteColor;
    return { iconColorStyle, textColorStyle };
  }, [color]);

  if (!props.label || isEmptyString(props.label)) {
    warn(`Missing required label, defaulting to ${defaultChipProps.label}`);
  }

  if (!props.icon) {
    warn(`Missing required icon, defaulting to ${defaultChipProps.icon}`);
  }

  if (!props.deleteButtonTitle) {
    warn(
      `Missing required title for delete button, defaulting to ${defaultChipProps.deleteButtonTitle}`
    );
  }

  return (
    <FlexRowLayout align="center" testId={testId} role="status">
      <ChipContainer {...styledProps}>
        <Icon name={icon} size="s-3" color={iconColorStyle} />
        <Text size="s" weight="medium" color={textColorStyle} ellipsis>
          {label}
        </Text>
      </ChipContainer>

      <ChipButton
        {...styledProps}
        onClick={onDelete}
        data-testid="chip-button"
        title={deleteButtonTitle ?? undefined}
        aria-label={deleteButtonTitle ?? undefined}
      >
        <Icon name="X" size="s-4" color={iconColorStyle} />
      </ChipButton>
    </FlexRowLayout>
  );
};

Chip.defaultProps = defaultChipProps;
export { Chip };

const ChipContainer = styled.div<StyleProps<DefaultChipProps>>`
  ${buildChipContainerStyles}
`;

const ChipButton = styled.button<StyleProps<DefaultChipProps>>`
  ${buildChipButtonStyles}
`;
