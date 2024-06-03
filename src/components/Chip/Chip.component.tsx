import { isNull } from "@ubloimmo/front-util";
import { useCallback } from "react";
import styled from "styled-components";

import { buildChipContainerStyles, buildChipButtonStyles } from "./Chip.styles";
import { Icon } from "../Icon";
import { Text } from "../Text";

import {
  isEmptyString,
  useLogger,
  useMergedProps,
  useStyleProps,
  useTestId,
} from "@utils";

import type { ChipProps, DefaultChipProps } from "./Chip.types";
import type { PaletteColor, StyleProps } from "@types";

const defaultChipProps: DefaultChipProps = {
  label: "[Chip]",
  icon: "Square",
  color: "primary",
  iconPlacement: "left",
  onDelete: null,
};

/**
 * An interactive `Badge` with a remove button, can be used as a filter tag.
 *
 * @version 0.0.1
 * @param {ChipProps} props - the props for the Chip component
 * @returns {JSX.Element} - the Chip component
 */
const Chip = (props: ChipProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultChipProps, props);
  const styledProps = useStyleProps(mergedProps);
  const testId = useTestId("chip", props);

  const { label, icon, color } = mergedProps;
  const { warn } = useLogger("Chip");

  const onDelete = useCallback(() => {
    if (isNull(mergedProps.onDelete)) return;
    mergedProps.onDelete();
  }, [mergedProps]);

  const iconColorStyle = `${color}-base` as PaletteColor;
  const textColorStyle = `${color}-dark` as PaletteColor;

  if (!label || isEmptyString(label)) {
    warn(`Missing required label, defaulting to ${defaultChipProps.label}`);
  }

  if (!icon) {
    warn(`Missing required icon, defaulting to ${defaultChipProps.icon}`);
  }

  return (
    <ChipWrapper data-testid={testId}>
      <ChipContainer {...styledProps}>
        <Icon name={icon} size="s-3" color={iconColorStyle} />
        <Text size="s" weight="medium" color={textColorStyle} ellipsis>
          {label}
        </Text>
      </ChipContainer>

      <ChipButton {...styledProps} onClick={onDelete} data-testid="chip-button">
        <Icon name="X" size="s-4" color={iconColorStyle} />
      </ChipButton>
    </ChipWrapper>
  );
};

Chip.defaultProps = defaultChipProps;
export { Chip };

const ChipWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
`;

const ChipContainer = styled.div<StyleProps<DefaultChipProps>>`
  ${buildChipContainerStyles}
`;

const ChipButton = styled.button<StyleProps<DefaultChipProps>>`
  ${buildChipButtonStyles}
`;
