import styled from "styled-components";

import { Heading } from "../Typography";

import { FlexColumnLayout } from "@layouts";
import { capitalize } from "@utils";

import type { HeadingSize, PaletteColor } from "@types";

const FONT_FAMILY = "Gilroy";
const FONT_WEIGHTS = ["regular", "medium", "bold"] as const;

const SIZE: HeadingSize = "h2";
const COLOR: PaletteColor = "gray-900";

const CHARACTERS = [
  "AaBbCcDdEeFfGgHhIiLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz",
  "0123456789",
  "!@#$%^&*()",
];

export const FontPreview = () => {
  return (
    <FontPreviewBox>
      <FlexColumnLayout gap="s-8" align="start" justify="start">
        {FONT_WEIGHTS.map((weight) => (
          <FlexColumnLayout key={weight} gap={0} align="start" justify="start">
            <Heading size={SIZE} weight={weight} color={COLOR}>
              {FONT_FAMILY} {capitalize(weight)}
            </Heading>
            {CHARACTERS.map((char) => (
              <Heading key={char} size={SIZE} weight={weight} color={COLOR}>
                {char}
              </Heading>
            ))}
          </FlexColumnLayout>
        ))}
      </FlexColumnLayout>
    </FontPreviewBox>
  );
};

const FontPreviewBox = styled.div`
  background: var(--gray-50);
  padding: var(--s-8) var(--s-4);
  border-radius: var(--s-2);
  margin-top: var(--s-6) !important;

  ${SIZE} {
    margin: 0 !important;
  }
`;
