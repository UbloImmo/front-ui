import { isNullish, isString } from "@ubloimmo/front-util";
import { useMemo } from "react";
import styled from "styled-components";

import {
  copyClipboardInfoCardContainerStyles,
  copyClipboardInfoCardIconContainerStyles,
} from "./CopyClipboardInfoCard.styles";

import { FlexRowLayout } from "@layouts";
import { PaletteColor, TextProps, type TestIdProps } from "@types";
import { useLogger, useTestId, useMergedProps, isEmptyString } from "@utils";

import { Icon, InfoBox, Text, type IconProps } from "@components";

import type {
  CopyClipboardInfoCardProps,
  CopyClipboardInfoCardDefaultProps,
  CopyClipboardInfoCardStyleProps,
} from "./CopyClipboardInfoCard.types";

const defaultCopyClipboardInfoCardProps: CopyClipboardInfoCardDefaultProps = {
  // TODO
  ...InfoBox.defaultProps,
  copyData: null,
  href: null,
};

/**
 * CopyClipboardInfoCard component
 *
 * TODO description
 *
 * @version 0.0.1
 *
 * @param {CopyClipboardInfoCardProps & TestIdProps} props - CopyClipboardInfoCard component props
 * @returns {JSX.Element}
 */
const CopyClipboardInfoCard = (
  props: CopyClipboardInfoCardProps & TestIdProps
): JSX.Element => {
  const { log } = useLogger("CopyClipboardInfoCard");
  const mergedProps = useMergedProps(defaultCopyClipboardInfoCardProps, props);
  const testId = useTestId("copy-clipboard-info-card", props);

  log(mergedProps);

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
        {...textProps}
      >
        {info}
      </CopyClipboardInfoCardLabel>
      {!isEmpty && (
        <CopyClipboardInfoCardIconContainer data-testid="copy-clipboard-info-card-icon-container">
          <Icon name="Files" color="primary-base" size="s-4" />
        </CopyClipboardInfoCardIconContainer>
      )}
    </CopyClipboardInfoCardContainer>
  );
};
CopyClipboardInfoCard.defaultProps = defaultCopyClipboardInfoCardProps;

export { CopyClipboardInfoCard };

const CopyClipboardInfoCardLabel = styled(Text)`
  text-align: center;
  flex: 1;
`;

const CopyClipboardInfoCardIconContainer = styled.div`
  ${copyClipboardInfoCardIconContainerStyles}
`;

const CopyClipboardInfoCardContainer = styled(
  FlexRowLayout
)<CopyClipboardInfoCardStyleProps>`
  ${copyClipboardInfoCardContainerStyles}
`;
