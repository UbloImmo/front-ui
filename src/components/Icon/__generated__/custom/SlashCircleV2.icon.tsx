import { useMemo } from "react";
import { CommonIconDefaultProps, commonIconDefaulProps } from "../common.types";
import {
  cssLengthUsage,
  cssVarUsage,
  mergeDefaultProps,
} from "../../../../utils";
/**
 * React component generated from custom icon: `slash-circle-v2`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconDefaultProps} props - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const SlashCircleV2 = (props: CommonIconDefaultProps) => {
  const { color, size } = useMemo(() => {
    const mergedProps = mergeDefaultProps(commonIconDefaulProps, props);
    return {
      color: cssVarUsage(mergedProps.color),
      size: cssLengthUsage(mergedProps.size),
    };
  }, [props]);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 8C15 11.866 11.866 15 8 15C6.24696 15 4.64443 14.3556 3.41637 13.2907L13.2907 3.41637C14.3556 4.64443 15 6.24696 15 8ZM2.70926 12.5836L12.5836 2.70926C11.3556 1.64441 9.75304 1 8 1C4.13401 1 1 4.13401 1 8C1 9.75304 1.64441 11.3556 2.70926 12.5836ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8Z"
        fill={color}
      />
    </svg>
  );
};
