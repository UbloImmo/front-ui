import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `calendar-graph`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const CalendarGraph = (props: CommonIconProps): JSX.Element => {
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
        d="M12.3746 7.3312C12.5575 7.12433 12.5381 6.80834 12.3312 6.62543C12.1243 6.44251 11.8083 6.46193 11.6254 6.6688L9.02839 9.60592L7.29907 7.8946C7.20212 7.79867 7.0702 7.7465 6.93386 7.75018C6.79753 7.75387 6.66861 7.81308 6.57699 7.91411L3.62962 11.1641C3.44412 11.3687 3.45956 11.6849 3.66411 11.8704C3.86867 12.0559 4.18487 12.0404 4.37038 11.8359L6.9669 8.97276L8.70093 10.6887C8.79865 10.7854 8.93188 10.8376 9.06928 10.8331C9.20668 10.8285 9.33614 10.7675 9.42721 10.6645L12.3746 7.3312Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 0.5C4 0.223858 3.77614 0 3.5 0C3.22386 0 3 0.223858 3 0.5V1H2C0.895431 1 0 1.89543 0 3V14C0 15.1046 0.895431 16 2 16H14C15.1046 16 16 15.1046 16 14V3C16 1.89543 15.1046 1 14 1H13V0.5C13 0.223858 12.7761 0 12.5 0C12.2239 0 12 0.223858 12 0.5V1H4V0.5ZM1 14V4H15V14C15 14.5523 14.5523 15 14 15H2C1.44772 15 1 14.5523 1 14Z"
        fill={color}
      />
    </svg>
  );
};

export default CalendarGraph;
