import { isNull } from "@ubloimmo/front-util";
import { MouseEventHandler, useCallback, useMemo } from "react";
import styled from "styled-components";

import {
  buildChipContainerStyles,
  buildChipButtonStyles,
  buildChipWrapperStyles,
} from "./Chip.styles";
import { Icon } from "../Icon";
import { Text } from "../Text";

import { FlexRowLayout } from "@layouts";
import {
  isEmptyString,
  useLogger,
  useMergedProps,
  useStyleProps,
  useTestId,
  useUikitTranslation,
} from "@utils";

import type { ChipProps, DefaultChipProps } from "./Chip.types";
import type { PaletteColor, StyleProps, TestIdProps } from "@types";

const defaultChipProps: DefaultChipProps = {
  label: "[Chip]",
  icon: null,
  color: "primary",
  iconPlacement: "left",
  onDelete: null,
  deleteButtonTitle: null,
  disabled: false,
};

/**
 * An interactive `Badge` with a remove button, can be used as a filter tag.
 *
 * @version 0.0.7
 * @param {ChipProps} props - the props for the Chip component
 * @returns {JSX.Element} - the Chip component
 */
const Chip = (props: ChipProps & TestIdProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultChipProps, props);
  const styledProps = useStyleProps(mergedProps);
  const testId = useTestId("chip", props);

  const { label, icon, color, deleteButtonTitle, disabled } = mergedProps;
  const { warn } = useLogger("Chip");

  const tl = useUikitTranslation();
  const deleteLabel = useMemo(
    () => deleteButtonTitle ?? tl.action.delete(label),
    [deleteButtonTitle, label, tl]
  );

  const onDelete = useCallback<MouseEventHandler<HTMLElement>>(
    (event) => {
      if (isNull(mergedProps.onDelete)) return;
      event.stopPropagation();
      mergedProps.onDelete();
    },
    [mergedProps]
  );

  const { iconColorStyle, textColorStyle } = useMemo(() => {
    const iconColorStyle = `${color}-base` as PaletteColor;
    const textColorStyle = `${color}-dark` as PaletteColor;
    return { iconColorStyle, textColorStyle };
  }, [color]);

  if (!props.label || isEmptyString(props.label)) {
    warn(`Missing required label, defaulting to ${defaultChipProps.label}`);
  }

  return (
    <ChipWrapper align="center" testId={testId} overrideTestId role="status">
      <ChipContainer {...styledProps}>
        {icon && <Icon name={icon} size="s-3" color={iconColorStyle} />}
        <Text size="s" weight="medium" color={textColorStyle} ellipsis>
          {label}
        </Text>
      </ChipContainer>

      {!disabled && (
        <ChipButton
          {...styledProps}
          onClick={onDelete}
          onMouseDown={onDelete}
          data-testid="chip-button"
          title={deleteLabel}
          aria-label={deleteLabel}
        >
          <Icon name="X" size="s-4" color={iconColorStyle} />
        </ChipButton>
      )}
    </ChipWrapper>
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

const ChipWrapper = styled(FlexRowLayout)`
  ${buildChipWrapperStyles}
`;
