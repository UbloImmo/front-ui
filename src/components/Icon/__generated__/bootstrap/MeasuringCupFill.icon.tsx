import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from bootstrap icon: `measuring-cup-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const MeasuringCupFill = (props: CommonIconProps): JSX.Element => {
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
      <path d="M14 0a2 2 0 0 1 2 2v5.959a1.041 1.041 0 0 1-2.049.264l-.02-.093-.849-5.096a.041.041 0 0 0-.082.007V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3.742a2.5 2.5 0 0 0-.732-1.767L.146.854A.5.5 0 0 1 .5 0zM4 13v1h1.5a.5.5 0 0 0 0-1zm0-2v1h3.5a.5.5 0 0 0 0-1zm0-2v1h1.5a.5.5 0 0 0 0-1zm0-2v1h3.5a.5.5 0 0 0 0-1zm0-2v1h1.5a.5.5 0 0 0 0-1zm0-2v1h3.5a.5.5 0 0 0 0-1z" />
    </svg>
  );
};

export default MeasuringCupFill;
