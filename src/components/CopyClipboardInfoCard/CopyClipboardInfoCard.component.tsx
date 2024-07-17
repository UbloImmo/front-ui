import { isNullish, isString } from "@ubloimmo/front-util";
import { useCallback, useMemo } from "react";
import styled from "styled-components";

import {
  copyClipboardInfoCardContainerStyles,
  copyClipboardInfoCardIconContainerStyles,
  copyClipboardInfoCardLinkStyles,
} from "./CopyClipboardInfoCard.styles";
import { copyToClipboard } from "./CopyClipboardInfoCard.utils";

import { FlexRowLayout } from "@layouts";
import { useLogger, useTestId, useMergedProps, isEmptyString } from "@utils";

import { Icon, InfoBox, Text, Tooltip, type IconProps } from "@components";

import type {
  CopyClipboardInfoCardProps,
  CopyClipboardInfoCardDefaultProps,
  CopyClipboardInfoCardStyleProps,
} from "./CopyClipboardInfoCard.types";
import type { PaletteColor, TextProps, TestIdProps } from "@types";

const defaultCopyClipboardInfoCardProps: CopyClipboardInfoCardDefaultProps = {
  ...InfoBox.defaultProps,
  copyData: null,
  href: null,
  copyTooltipLabel: "Copy to clipboard",
};

/**
 * A single, clickable card that displays information and allows the user to copy it to the clipboard.
 *
 * @version 0.0.1
 *
 * @param {CopyClipboardInfoCardProps & TestIdProps} props - CopyClipboardInfoCard component props
 * @returns {JSX.Element}
 */
const CopyClipboardInfoCard = (
  props: CopyClipboardInfoCardProps & TestIdProps
): JSX.Element => {
  const logger = useLogger("CopyClipboardInfoCard");
  const mergedProps = useMergedProps(defaultCopyClipboardInfoCardProps, props);
  const testId = useTestId("copy-clipboard-info-card", props);

  const isEmpty = useMemo(
    () => isNullish(mergedProps.info) || isEmptyString(mergedProps.info),
    [mergedProps.info]
  );

  const contentColor = useMemo<PaletteColor>(
    () => (isEmpty ? "gray-500" : "gray-800"),
    [isEmpty]
  );

  const info = useMemo(
    () =>
      mergedProps.info && !isEmpty
        ? mergedProps.info
        : "Information non renseignée",
    [isEmpty, mergedProps.info]
  );

  const textProps = useMemo<TextProps>(
    () => ({
      color: contentColor,
      weight: isEmpty ? "regular" : "medium",
      underline: !isEmpty && isString(mergedProps.href),
    }),
    [contentColor, isEmpty, mergedProps.href]
  );

  const iconProps = useMemo<IconProps>(
    () => ({
      name: mergedProps.icon,
      size: "s-4",
      color: contentColor,
    }),
    [mergedProps.icon, contentColor]
  );

  const copyInfo = useCallback(() => {
    const copyData = mergedProps.copyData ?? mergedProps.info;
    if (isEmpty || !copyData) {
      return;
    }
    copyToClipboard(copyData, logger);
  }, [mergedProps.copyData, mergedProps.info, isEmpty, logger]);

  return (
    <CopyClipboardInfoCardContainer
      testId={testId}
      overrideTestId
      gap="s-2"
      align="center"
      justify="start"
      fill
      $isEmpty={isEmpty}
    >
      <Icon {...iconProps} />
      <CopyClipboardInfoCardLabel
        testId={`${testId}-info`}
        overrideTestId
        size="m"
        align="center"
        ellipsis
        {...textProps}
      >
        {mergedProps.href && !isEmpty ? (
          <CopyClipboardInfoCardLink
            href={mergedProps.href}
            target="_blank"
            data-testid={`${testId}-link`}
          >
            {info}
          </CopyClipboardInfoCardLink>
        ) : (
          info
        )}
      </CopyClipboardInfoCardLabel>

      {!isEmpty && (
        <CopyClipboardInfoCardIconContainer
          data-testid="copy-clipboard-info-card-icon-container"
          onClick={copyInfo}
        >
          <Tooltip
            content={mergedProps.copyTooltipLabel}
            cursor="pointer"
            direction="left"
          >
            <Icon name="Files" color="primary-base" size="s-4" />
          </Tooltip>
        </CopyClipboardInfoCardIconContainer>
      )}
    </CopyClipboardInfoCardContainer>
  );
};
CopyClipboardInfoCard.defaultProps = defaultCopyClipboardInfoCardProps;

export { CopyClipboardInfoCard };

const CopyClipboardInfoCardLabel = styled(Text)`
  flex: 1;
`;

const CopyClipboardInfoCardLink = styled.a`
  ${copyClipboardInfoCardLinkStyles}
`;

const CopyClipboardInfoCardContainer = styled(
  FlexRowLayout
)<CopyClipboardInfoCardStyleProps>`
  ${copyClipboardInfoCardContainerStyles}
`;

const CopyClipboardInfoCardIconContainer = styled.div`
  ${copyClipboardInfoCardIconContainerStyles}
`;
