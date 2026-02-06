import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `hexagon-question`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const HexagonQuestion = (props: CommonIconProps): JSX.Element => {
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
      data-testid="icon"
    >
      <path
        d="M14 4.57734V11.4226L8.00001 15L2.00003 11.4226V4.57734L8.00001 1L14 4.57734ZM8.50001 0.133975C8.19061 -0.0446582 7.80941 -0.0446582 7.50001 0.133975L1.50003 3.71132C1.19063 3.88995 1.00003 4.22008 1.00003 4.57734V11.4226C1.00003 11.7799 1.19063 12.11 1.50003 12.2887L7.50001 15.866C7.80941 16.0447 8.19061 16.0447 8.50001 15.866L14.5 12.2887C14.8094 12.11 15 11.7799 15 11.4226V4.57734C15 4.22008 14.8094 3.88995 14.5 3.71132L8.50001 0.133975Z"
        fill={color}
      />
      <path
        d="M5.25037 5.88614C5.24278 6.02236 5.35517 6.13271 5.4916 6.13271H6.31608C6.45416 6.13271 6.56394 6.02012 6.58249 5.8833C6.67145 5.22717 7.12177 4.74892 7.92448 4.74892C8.61003 4.74892 9.23845 5.09169 9.23845 5.91689C9.23845 6.55165 8.86394 6.84365 8.2736 7.28798C7.60075 7.77675 7.06755 8.34804 7.10564 9.2748L7.1086 9.4916C7.11048 9.62832 7.22185 9.73818 7.35858 9.73818H8.1696C8.30767 9.73818 8.4196 9.62625 8.4196 9.48818V9.38271C8.4196 8.66542 8.69255 8.45595 9.42888 7.89736C10.0383 7.43398 10.673 6.91982 10.673 5.84072C10.673 4.32997 9.39714 3.59999 8.00065 3.59999C6.73358 3.59999 5.3449 4.1906 5.25037 5.88614ZM6.8073 11.6488C6.8073 12.182 7.23259 12.5756 7.81657 12.5756C8.42595 12.5756 8.84489 12.182 8.84489 11.6488C8.84489 11.0966 8.42595 10.7094 7.81657 10.7094C7.23259 10.7094 6.8073 11.0966 6.8073 11.6488Z"
        fill={color}
      />
    </svg>
  );
};

export default HexagonQuestion;
