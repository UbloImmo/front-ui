import { Heading } from "../Typography";
import { useFontPreviewClassNames } from "./FontPreview.styles";

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
  const classNames = useFontPreviewClassNames();
  return (
    <div className={classNames.box}>
      <FlexColumnLayout gap="s-8" align="start" justify="start">
        {FONT_WEIGHTS.map((weight) => (
          <FlexColumnLayout
            key={weight}
            gap="s-2"
            align="start"
            justify="start"
          >
            <Heading
              size={SIZE}
              weight={weight}
              color={COLOR}
              font={font}
              className={classNames.heading}
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
                className={classNames.heading}
              >
                {char}
              </Heading>
            ))}
          </FlexColumnLayout>
        ))}
      </FlexColumnLayout>
    </div>
  );
};
