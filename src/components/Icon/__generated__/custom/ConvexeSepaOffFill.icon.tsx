import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `convexe-sepa-off-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const ConvexeSepaOffFill = (props: CommonIconProps): JSX.Element => {
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
        d="M6.61057 4.48925L2.73735 0.61603C7.14786 -0.287173 9.77971 -0.189926 14.3959 0.859926C14.7657 0.944026 15.0557 1.23427 15.1393 1.60417C16.2063 6.32584 16.2727 8.96538 15.386 13.2647L9.78087 7.65955H10.7153L11.2909 6.41463H8.53595L7.5082 5.38688C7.98433 5.06847 8.55254 4.8843 9.16321 4.88343L9.16352 4.88665C10.1064 4.88665 10.95 5.32451 11.5028 6.01021L11.5071 6.0157L12 4.94453C11.2244 4.20472 10.1761 3.75 9.02274 3.75C8.13023 3.75 7.30059 4.0223 6.61057 4.48925Z"
        fill={color}
      />
      <path
        d="M10.0163 12.1376L13.2627 15.384C8.85214 16.2872 6.2203 16.1899 1.6041 15.1401C1.23431 15.056 0.944331 14.7657 0.860737 14.3958C-0.206308 9.67416 -0.272704 7.03462 0.613971 2.73529L4.2933 6.41462H4.07559L3.5 7.65952H4.74019V8.00372C4.74074 8.1454 4.74816 8.28467 4.76214 8.42192H4.12649L3.55726 9.65718H5.06457C5.74872 11.1971 7.25166 12.25 8.99772 12.25L9.02166 12.25L9.03603 12.25C9.37314 12.25 9.70127 12.2111 10.0163 12.1376Z"
        fill={color}
      />
      <path
        d="M6.17115 8.42837C6.16365 8.37925 6.15733 8.32738 6.15231 8.27363L6.30704 8.42837H6.17115Z"
        fill={color}
      />
      <path
        d="M14.1464 14.8536C14.3417 15.0488 14.6583 15.0488 14.8536 14.8536C15.0488 14.6583 15.0488 14.3417 14.8536 14.1464L1.85355 1.14645C1.65829 0.951184 1.34171 0.951184 1.14645 1.14645C0.951184 1.34171 0.951184 1.65829 1.14645 1.85355L14.1464 14.8536Z"
        fill={color}
      />
      <path
        d="M6.63864 9.66362H7.5423L8.91804 11.0394C7.96779 10.9614 7.14211 10.4376 6.64567 9.67509L6.63864 9.66362Z"
        fill={color}
      />
    </svg>
  );
};

export default ConvexeSepaOffFill;
