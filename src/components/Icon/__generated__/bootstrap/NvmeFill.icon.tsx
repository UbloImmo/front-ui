import { useMemo } from "react";

import {
  cssLengthUsage,
  cssVarUsage,
  mergeDefaultProps,
} from "../../../../utils";
import { CommonIconProps, commonIconDefaulProps } from "../common.types";
/**
 * React component generated from bootstrap icon: `nvme-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const NvmeFill = (props: CommonIconProps): JSX.Element => {
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
      <path d="M6 7H5v2h1zm6 0H9v2h3z" />
      <path d="M2 4a.5.5 0 0 0-.5.5h-1A.5.5 0 0 0 0 5v1a.5.5 0 0 0 .5.5h1a.25.25 0 0 1 0 .5h-1a.5.5 0 0 0-.5.5V11a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5.5h13.5a.5.5 0 0 0 .5-.5V9a.5.5 0 0 0-.5-.5.5.5 0 0 1 0-1A.5.5 0 0 0 16 7V4.5a.5.5 0 0 0-.5-.5zm2 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5z" />
    </svg>
  );
};
