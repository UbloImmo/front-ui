import { useMemo, type ReactNode } from "react";
import styled from "styled-components";

import * as assetsIndex from "./assets";
import { emptyStateCardAssetDefaultProps } from "./assets/assets.defaults";
import { emptyStateCardStyles } from "./EmptyStateCard.styles";
import { useFormContext } from "../Form";
import { Heading } from "../Heading";
import { Text } from "../Text";

import { FlexColumnLayout } from "@layouts";
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
};

/**
 * Notifies the user that there are no results in a list / page.
 *
 * @version 0.0.1
 *
 * @param {EmptyStateCardProps & TestIdProps} props - EmptyStateCard component props
 * @returns {JSX.Element}
 */
const EmptyStateCard = (
  props: EmptyStateCardProps & TestIdProps
): JSX.Element => {
  const { asset, title, description, editingDescription, ...assetProps } =
    useMergedProps(defaultEmptyStateCardProps, props);
  const { isEditing } = useFormContext();
  const testId = useTestId("empty-state-card", props);

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
    () => normalizeToPaletteColor(assetProps.color, "dark"),
    [assetProps.color]
  );

  const displayDescription = useMemo<ReactNode>(() => {
    const desc =
      isEditing && editingDescription ? editingDescription : description;
    if (!desc) return null;
    return desc;
  }, [description, editingDescription, isEditing]);

  return (
    <Card
      testId={testId}
      overrideTestId
      fill="row"
      align="center"
      justify="center"
      gap="s-1"
    >
      {Asset && <Asset {...assetProps} />}
      <Heading
        size="h4"
        weight="medium"
        color={headingColor}
        fill
        align="center"
        testId={`${testId}-heading`}
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
          testId={`${testId}-heading`}
          overrideTestId
        >
          {displayDescription}
        </Text>
      )}
    </Card>
  );
};
EmptyStateCard.defaultProps = defaultEmptyStateCardProps;

export { EmptyStateCard };

const Card = styled(FlexColumnLayout)`
  ${emptyStateCardStyles}
`;
