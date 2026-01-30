import { useMemo, type ReactNode } from "react";

import * as assetsIndex from "./assets";
import { emptyStateCardAssetDefaultProps } from "./assets/assets.defaults";
import { useEmptyStateCardStyles } from "./EmptyStateCard.styles";
import { useFormContext } from "../Form";
import { Heading } from "../Heading";
import { Text } from "../Text";

import { FlexColumnLayout } from "@/layouts/Flex";
import {
  useTestId,
  useMergedProps,
  useUikitTranslation,
  normalizeToPaletteColor,
} from "@utils";

import type {
  EmptyStateCardProps,
  EmptyStateCardDefaultProps,
} from "./EmptyStateCard.types";
import type { TestIdProps } from "@types";

const defaultEmptyStateCardProps: EmptyStateCardDefaultProps = {
  ...emptyStateCardAssetDefaultProps,
  asset: null,
  title: null,
  description: null,
  editingDescription: null,
  transparent: false,
  className: null,
  styleOverride: null,
};

/**
 * Notifies the user that there are no results in a list / page.
 *
 * @version 0.1.0
 *
 * @param {EmptyStateCardProps & TestIdProps} props - EmptyStateCard component props
 * @returns {JSX.Element}
 */
const EmptyStateCard = (
  props: EmptyStateCardProps & TestIdProps
): JSX.Element => {
  const { isEditing } = useFormContext();
  const testId = useTestId("empty-state-card", props);

  const mergedProps = useMergedProps(defaultEmptyStateCardProps, props);
  const { className, style } = useEmptyStateCardStyles(mergedProps);

  const { asset, title, description, editingDescription, icon, color } =
    mergedProps;

  const tl = useUikitTranslation();

  const Asset = useMemo(() => {
    if (!asset) return null;
    return assetsIndex[asset];
  }, [asset]);

  const heading = useMemo(() => {
    if (!title) return tl.status.empty();
    return title;
  }, [title, tl]);

  const headingColor = useMemo(
    () => normalizeToPaletteColor(color, "dark"),
    [color]
  );

  const displayDescription = useMemo<ReactNode>(() => {
    const desc =
      isEditing && editingDescription ? editingDescription : description;
    if (!desc) return null;
    return desc;
  }, [description, editingDescription, isEditing]);

  return (
    <FlexColumnLayout
      className={className}
      styleOverride={style}
      testId={testId}
      overrideTestId
      fill="row"
      align="center"
      justify="center"
      gap="s-1"
    >
      {Asset && <Asset icon={icon} color={color} />}
      <Heading
        size="h4"
        weight="medium"
        color={headingColor}
        fill
        align="center"
        testId={`${testId}-title`}
        overrideTestId
      >
        {heading}
      </Heading>
      {displayDescription && (
        <Text
          size="m"
          color="gray-600"
          weight="medium"
          fill
          align="center"
          testId={`${testId}-description`}
          overrideTestId
        >
          {displayDescription}
        </Text>
      )}
    </FlexColumnLayout>
  );
};
EmptyStateCard.defaultProps = defaultEmptyStateCardProps;

export { EmptyStateCard };
