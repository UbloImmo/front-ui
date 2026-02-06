import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `convexe-sepa-off`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const ConvexeSepaOff = (props: CommonIconProps): JSX.Element => {
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
        d="M14.3959 0.859926C9.77971 -0.189926 7.14786 -0.287173 2.73735 0.61603L3.58877 1.46745C5.27188 1.14949 6.66959 0.99831 8.04522 1.00001C9.87141 1.00228 11.7059 1.274 14.1658 1.83313C14.735 4.35355 15.0023 6.21885 15 8.04522C14.9983 9.41084 14.8459 10.7811 14.5354 12.414L15.386 13.2647C16.2727 8.96538 16.2063 6.32584 15.1393 1.60417C15.0557 1.23427 14.7657 0.944026 14.3959 0.859926Z"
        fill={color}
      />
      <path
        d="M0.860737 14.3958C-0.206308 9.67416 -0.272704 7.03462 0.613971 2.73529L1.46464 3.58596C1.15408 5.21892 1.00171 6.58916 1.00001 7.95478C0.997751 9.78116 1.26498 11.6464 1.83422 14.1669C4.29414 14.726 6.12859 14.9977 7.95478 15C9.33041 15.0017 10.7281 14.8505 12.4112 14.5325L13.2627 15.384C8.85214 16.2872 6.2203 16.1899 1.6041 15.1401C1.23431 15.056 0.944331 14.7657 0.860737 14.3958Z"
        fill={color}
      />
      <path
        d="M4.07559 6.41462H4.2933L6.15231 8.27363C6.15733 8.32738 6.16365 8.37925 6.17115 8.42837H6.30704L7.5423 9.66362H6.63864L6.64567 9.67509C7.14211 10.4376 7.96779 10.9614 8.91805 11.0394L10.0163 12.1376C9.70127 12.2111 9.37314 12.25 9.03603 12.25L9.02167 12.25L8.99772 12.25C7.25166 12.25 5.74872 11.1971 5.06457 9.65718H3.55726L4.12649 8.42192H4.76214C4.74816 8.28467 4.74074 8.1454 4.74019 8.00372V7.65952H3.5L4.07559 6.41462Z"
        fill={color}
      />
      <path
        d="M14.1464 14.8536C14.3417 15.0488 14.6583 15.0488 14.8536 14.8536C15.0488 14.6583 15.0488 14.3417 14.8536 14.1464L1.85355 1.14645C1.65829 0.951184 1.34171 0.951184 1.14645 1.14645C0.951184 1.34171 0.951184 1.65829 1.14645 1.85355L14.1464 14.8536Z"
        fill={color}
      />
      <path
        d="M10.7153 7.65955H9.78087L8.53595 6.41463H11.2909L10.7153 7.65955Z"
        fill={color}
      />
      <path
        d="M9.16321 4.88343C8.55254 4.8843 7.98433 5.06847 7.5082 5.38688L6.61057 4.48925C7.30059 4.0223 8.13023 3.75 9.02274 3.75C10.1761 3.75 11.2244 4.20472 12 4.94453L11.5071 6.0157L11.5028 6.01021C10.95 5.32451 10.1064 4.88665 9.16352 4.88665L9.16321 4.88343Z"
        fill={color}
      />
    </svg>
  );
};

export default ConvexeSepaOff;
