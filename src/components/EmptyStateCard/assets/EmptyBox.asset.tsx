import { useId, useMemo } from "react";
import styled from "styled-components";

import { emptyStateCardAssetDefaultProps } from "./assets.defaults";

import { Icon } from "@/components/Icon";
import { cssDimensions } from "@/utils/styles.utils";
import {
  cssColorMix,
  cssPx,
  cssVarUsage,
  normalizeToPaletteColor,
  useMergedProps,
} from "@utils";

import type { EmptyStateCardAssetProps } from "./assets.types";
import type { ColorKey, PaletteColor, CssDeg, CssPx, StyleProps } from "@types";

const ASSET_HEIGHT = 121;
const ASSET_WIDTH = 132;

const SVG_LAYER_PROPS = {
  width: ASSET_WIDTH,
  height: ASSET_HEIGHT,
  viewBox: `0 0 ${ASSET_WIDTH} ${ASSET_HEIGHT}`,
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
};

/**
 * Hook that generates color values for the EmptyBox asset based on a theme color
 *
 * @param {ColorKey} color - The base color key to generate colors from
 * @returns {object} Object containing calculated color values:
 *   - dotColor: Blended color for dots
 *   - darkerLight: Darker variant of light color
 *   - darkMedium: Dark variant of medium color
 *   - darkerMedium: Darker variant of medium color
 *   - darkestMedium: Darkest variant of medium color
 *   - lightestBase: Lightest variant of base color
 *   - darkerBase: Darker variant of base color
 *   - darkestBase: Darkest variant of base color
 *   - backdrop: CSS variable reference for backdrop color
 */
const useEmptyBoxAssetColors = (color: ColorKey) => {
  const colorKeyNoGray = useMemo<Exclude<ColorKey, "gray">>(
    () => (color === "gray" ? "primary" : color),
    [color]
  );

  const colors = useMemo(
    () => ({
      dotColor: cssColorMix(
        [cssColorMix(["gray-50", "30%"], `${colorKeyNoGray}-light`), "60%"],
        "gray-50"
      ),
      darkerLight: cssColorMix(["gray-400", "30%"], `${colorKeyNoGray}-medium`),
      darkMedium: cssColorMix(["gray-600", "70%"], `${colorKeyNoGray}-medium`),
      darkerMedium: cssColorMix(
        ["gray-700", "50%"],
        `${colorKeyNoGray}-medium`
      ),
      darkestMedium: cssColorMix(
        ["gray-800", "60%"],
        `${colorKeyNoGray}-medium`
      ),
      lightestBase: cssColorMix(["gray-200", "90%"], `${colorKeyNoGray}-base`),
      darkerBase: cssColorMix(["gray-700", "55%"], `${colorKeyNoGray}-base`),
      darkestBase: cssColorMix(["gray-800", "35%"], `${colorKeyNoGray}-base`),
    }),
    [colorKeyNoGray]
  );

  const backdrop = useMemo(
    () =>
      cssVarUsage(
        color === "gray" ? "gray-50" : normalizeToPaletteColor(color, "light")
      ),
    [color]
  );

  return {
    ...colors,
    backdrop,
  };
};

type AssetColors = ReturnType<typeof useEmptyBoxAssetColors>;

const useEmptyBoxAssetGradientIds = () => {
  const gradient1 = useId();
  const gradient2 = useId();
  const gradient3 = useId();
  const gradient4 = useId();
  const gradient5 = useId();
  const gradient6 = useId();
  const gradient7 = useId();

  return {
    gradient1,
    gradient2,
    gradient3,
    gradient4,
    gradient5,
    gradient6,
    gradient7,
  };
};

type AssetGradientIds = ReturnType<typeof useEmptyBoxAssetGradientIds>;

/**
 * Renders the SVG gradient definitions for the EmptyBox asset
 *
 * @param {object} props - Component props
 * @param {AssetColors} props.colors - Color values for the gradients
 * @returns {JSX.Element} SVG defs element containing gradient definitions
 */
const Defs = ({
  colors: {
    darkerMedium,
    darkestMedium,
    darkerBase,
    darkestBase,
    lightestBase,
    darkerLight,
  },
  gradientIds,
}: {
  colors: AssetColors;
  gradientIds: AssetGradientIds;
}): JSX.Element => {
  return (
    <defs>
      <linearGradient
        id={gradientIds.gradient1}
        x1="50.3915"
        y1="73.5207"
        x2="46.8525"
        y2="88.3369"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.00289017" stopColor="var(--gray-600)" stopOpacity="0" />
        <stop offset="1" stopColor="var(--gray-800)" />
      </linearGradient>
      <linearGradient
        id={gradientIds.gradient2}
        x1="50.3918"
        y1="73.5207"
        x2="46.8528"
        y2="88.3369"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.00289017" stopColor="var(--gray-600)" stopOpacity="0" />
        <stop offset="1" stopColor="var(--gray-800)" />
      </linearGradient>
      <linearGradient
        id={gradientIds.gradient3}
        x1="38.3256"
        y1="102.256"
        x2="44.5632"
        y2="84.5398"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.00289017" stopColor={darkestMedium} stopOpacity="0" />
        <stop offset="1" stopColor={darkerMedium} />
      </linearGradient>
      <linearGradient
        id={gradientIds.gradient4}
        x1="72.8214"
        y1="107.086"
        x2="73.3112"
        y2="84.6355"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.00289017" stopColor={darkerBase} stopOpacity="0" />
        <stop offset="1" stopColor={darkestBase} />
      </linearGradient>
      <linearGradient
        id={gradientIds.gradient5}
        x1="22.0041"
        y1="57.4136"
        x2="22.0041"
        y2="60.0353"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor={lightestBase} />
        <stop offset="1" stopColor={darkerLight} />
      </linearGradient>
      <linearGradient
        id={gradientIds.gradient6}
        x1="25.5766"
        y1="97.995"
        x2="25.5766"
        y2="100.609"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor={lightestBase} />
        <stop offset="1" stopColor={darkerLight} />
      </linearGradient>
      <linearGradient
        id={gradientIds.gradient7}
        x1="97.061"
        y1="96.3334"
        x2="95.4482"
        y2="99.5459"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor={lightestBase} />
        <stop offset="1" stopColor={darkerLight} />
      </linearGradient>
    </defs>
  );
};

/**
 * An empty box illustration asset for the EmptyStateCard component
 *
 * @param {EmptyStateCardAssetProps} props - The component props
 * @param {string} props.icon - The icon to display inside the box
 * @param {PaletteColor} props.color - The color theme for the illustration
 * @returns {JSX.Element} The rendered empty box illustration
 */
export const EmptyBox = (props: EmptyStateCardAssetProps) => {
  const { icon, color } = useMergedProps(
    emptyStateCardAssetDefaultProps,
    props
  );

  const iconColor = useMemo<PaletteColor>(() => {
    return normalizeToPaletteColor(color, "base");
  }, [color]);

  const colors = useEmptyBoxAssetColors(color);
  const { backdrop, dotColor, lightestBase, darkMedium } = colors;

  const gradientIds = useEmptyBoxAssetGradientIds();

  return (
    <AssetContainer
      data-testid="empty-state-card-asset"
      data-asset-name="EmptyBox"
    >
      <SvgLayer {...SVG_LAYER_PROPS}>
        <Defs colors={colors} gradientIds={gradientIds} />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M66.354 1.47703C76.7787 2.11852 86.1634 5.66399 95.7881 9.71984C108.618 15.1265 128.782 15.3885 131.682 29.006C134.691 43.1385 115.579 51.7141 107.245 63.518C101.981 70.9742 97.7868 78.4095 91.8852 85.3722C83.7729 94.943 78.4343 108.373 66.354 111.761C53.3575 115.406 39.2976 110.356 27.755 103.358C15.5062 95.9326 2.57082 85.8404 0.275189 71.7019C-1.97085 57.8689 10.0801 46.4911 16.4989 34.0333C21.6942 23.95 24.6673 12.1298 34.1647 5.92784C43.4616 -0.143155 55.2714 0.795062 66.354 1.47703Z"
          fill={backdrop}
        />
        <path
          d="M89.3167 64.0383C90.8852 64.0383 92.1574 62.7754 92.1574 61.2097C92.1574 59.6515 90.8852 58.3885 89.3167 58.3885C87.7483 58.3885 86.4768 59.6515 86.4768 61.2097C86.4768 62.7754 87.7483 64.0383 89.3167 64.0383Z"
          fill={dotColor}
        />
        <path
          d="M13.8692 79.3256C14.9008 79.3256 15.7377 78.4984 15.7377 77.4645C15.7377 76.438 14.9008 75.6108 13.8692 75.6108C12.8369 75.6108 12 76.438 12 77.4645C12 78.4984 12.8369 79.3256 13.8692 79.3256Z"
          fill={dotColor}
        />
        <path
          d="M22.4583 112.765C23.4906 112.765 24.3269 111.931 24.3269 110.904C24.3269 109.878 23.4906 109.043 22.4583 109.043C21.426 109.043 20.5898 109.878 20.5898 110.904C20.5898 111.931 21.426 112.765 22.4583 112.765Z"
          fill={dotColor}
        />
        <path
          d="M32.4469 112.765L58.6691 104.597V71.0909L32.4469 79.2V112.765Z"
          fill={lightestBase}
        />
        <path
          opacity="0.4"
          d="M84.8917 112.765L58.6695 104.597V71.0909L84.8917 79.2V112.765Z"
          fill={darkMedium}
        />
        <g opacity="0.13">
          <path
            opacity="0.13"
            d="M32.4469 112.765L58.6691 104.597V71.0909L32.4469 79.2V112.765Z"
            fill={`url(#${gradientIds.gradient1})`}
          />
          <path
            opacity="0.13"
            d="M84.8917 112.765L58.6694 104.597V71.0909L84.8917 79.2V112.765Z"
            fill={`url(#${gradientIds.gradient2})`}
          />
        </g>
        <path
          d="M58.6695 71.0911L46.3408 61.9188L19.6804 70.8401L32.4473 79.2001L58.6695 71.0911Z"
          fill="var(--gray-50)"
        />
        <path
          d="M58.6695 71.0911L70.9982 61.9188L97.6586 70.8401L84.8917 79.2001L58.6695 71.0911Z"
          fill="var(--gray-50)"
        />
      </SvgLayer>

      <DivLayer>
        <IconModifier $x="45.5px" $y="60.5px" $angle="14.28deg" $opacity={1}>
          <Icon name={icon} size="s-8" color={iconColor} />
        </IconModifier>
      </DivLayer>

      <SvgLayer {...SVG_LAYER_PROPS}>
        <Defs colors={colors} gradientIds={gradientIds} />
        <path
          d="M58.669 121L32.4468 112.825V79.3257L58.669 87.5011V121Z"
          fill="var(--gray-50)"
        />
        <path
          d="M58.6694 121L84.8917 112.825V79.3257L58.6694 87.5011V121Z"
          fill="var(--gray-50)"
        />
        <path
          opacity="0.09"
          d="M52.7278 115.092L32.4468 112.825V79.3257L58.669 87.5011L52.7278 115.092Z"
          fill={`url(#${gradientIds.gradient3})`}
        />
        <path
          opacity="0.2"
          d="M64.6106 109.184L84.8917 112.825V79.3257L58.6694 87.5011L64.6106 109.184Z"
          fill={`url(#${gradientIds.gradient4})`}
        />
        <path
          d="M32.4473 79.3257L58.6695 87.5011L45.5892 95.7946L19.6804 87.2499L32.4473 79.3257Z"
          fill="var(--gray-50)"
        />
        <path
          d="M84.8917 79.3257L58.6695 87.5011L71.749 95.7946L97.6586 87.2499L84.8917 79.3257Z"
          fill="var(--gray-50)"
        />
        <path
          d="M24.3272 58.8686H22.7007V57.2511H21.3068V58.8686H19.6804V60.3013H21.3068V61.9186H22.7007V60.3013H24.3272V58.8686Z"
          fill={`url(#${gradientIds.gradient5})`}
        />
        <path
          d="M27.8996 99.4499H26.2732V97.8326H24.8793V99.4499H23.2521V100.883H24.8793V102.5H26.2732V100.883H27.8996V99.4499Z"
          fill={`url(#${gradientIds.gradient6})`}
        />
        <path
          d="M99.0001 99.5385L97.0098 98.5416L98.0146 96.5625L96.3087 95.7057L95.3039 97.6849L93.3144 96.6806L92.4239 98.4382L94.4142 99.4352L93.4094 101.414L95.1153 102.271L96.1201 100.292L98.1096 101.289L99.0001 99.5385Z"
          fill={`url(#${gradientIds.gradient7})`}
        />
      </SvgLayer>

      <DivLayer>
        <IconModifier $x="75.5px" $y="34px" $angle="1.58deg" $opacity={0.5}>
          <Icon name={icon} size="s-6" color={iconColor} />
        </IconModifier>
        <IconModifier $x="27.5px" $y="30px" $angle="-24.15deg" $opacity={0.5}>
          <Icon name={icon} size="s-4" color={iconColor} />
        </IconModifier>
        <IconModifier $x="59.3px" $y="10px" $angle="29.85deg" $opacity={0.5}>
          <Icon name={icon} size="s-4" color={iconColor} />
        </IconModifier>
      </DivLayer>
    </AssetContainer>
  );
};

const AssetContainer = styled.div`
  position: relative;
  ${cssDimensions(cssPx(ASSET_WIDTH), cssPx(ASSET_HEIGHT), true)}
`;

const SvgLayer = styled.svg`
  position: absolute;
  inset: 0;
`;

const DivLayer = styled.div`
  position: absolute;
  inset: 0;
`;

const IconModifier = styled.div<
  StyleProps<{ x: CssPx; y: CssPx; angle?: CssDeg; opacity?: number }>
>`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(${({ $x }) => $x}, ${({ $y }) => $y})
    rotate(${({ $angle }) => $angle ?? "0deg"});
  transform-origin: center center;
  opacity: ${({ $opacity }) => $opacity ?? 1};
`;
