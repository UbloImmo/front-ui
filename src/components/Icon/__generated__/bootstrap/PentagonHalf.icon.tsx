import { useMemo } from "react";
import { CommonIconProps, commonIconDefaulProps } from "../common.types";
import {
  cssLengthUsage,
  cssVarUsage,
  mergeDefaultProps,
} from "../../../../utils";
/**
 * React component generated from bootstrap icon: `pentagon-half`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const PentagonHalf = (props: CommonIconProps): JSX.Element => {
  const { color, size } = useMemo(() => {
    const mergedProps = mergeDefaultProps(commonIconDefaulProps, props);
    return {
      color: cssVarUsage(mergedProps.color),
      size: cssLengthUsage(mergedProps.size),
    };
  }, [props]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 16 16"
      data-testid="icon"
    >
      <path d="m8 1.288 6.578 5.345a.5.5 0 0 1 .161.539l-2.362 7.479a.5.5 0 0 1-.476.349H8zm7.898 5.536a.5.5 0 0 0-.162-.538L8.316.256a.5.5 0 0 0-.631 0L.264 6.286a.5.5 0 0 0-.162.538l2.788 8.827a.5.5 0 0 0 .476.349h9.268a.5.5 0 0 0 .476-.35z" />
    </svg>
  );
};
