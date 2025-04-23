import styled from "styled-components";

import { Heading } from "../Typography";

import { FlexColumnLayout } from "@layouts";
import { capitalize } from "@utils";

import type { HeadingSize, PaletteColor, TypographyFont } from "@types";

const FONT_WEIGHTS = ["regular", "medium", "bold"] as const;

const SIZE: HeadingSize = "h2";
const COLOR: PaletteColor = "gray-900";

const CHARACTERS = [
  "AaBbCcDdEeFfGgHhIiLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz",
  "0123456789",
  "!@#$%^&*()",
];

type FontPreviewProps = {
  font?: TypographyFont;
  fontName?: string;
};

/**
 * Renders a preview of the font with different weights and characters.
 *
 * @return {JSX.Element} The JSX element representing the font preview.
 */
export const FontPreview = ({
  font = "sans",
  fontName = "Gilroy",
}: FontPreviewProps): JSX.Element => {
  return (
    <FontPreviewBox>
      <FlexColumnLayout gap="s-8" align="start" justify="start">
        {FONT_WEIGHTS.map((weight) => (
          <FlexColumnLayout key={weight} gap={0} align="start" justify="start">
            <Heading
              size={SIZE}
              weight={weight}
              color={COLOR}
              font={font}
              className="font-preview-heading"
            >
              {fontName} {capitalize(weight)}
            </Heading>
            {CHARACTERS.map((char) => (
              <Heading
                key={char}
                size={SIZE}
                weight={weight}
                color={COLOR}
                font={font}
                className="font-preview-heading"
              >
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

  & > div > div > span:has(${SIZE}) > ${SIZE}.font-preview-heading {
    margin: 0 !important;
  }
`;
