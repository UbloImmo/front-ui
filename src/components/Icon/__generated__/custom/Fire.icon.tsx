import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `fire`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const Fire = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1279_1848)" >
        <path
          d="M2.04725 8.3961C2.44371 5.05198 4.99715 1.61768 8.25864 0.0407104C8.4009 -0.0281294 8.57464 -0.0114002 8.69516 0.104166C10.1878 1.535 11.3191 3.2958 11.9997 5.23658C12.1933 4.85123 12.3489 4.4478 12.4646 4.03034C12.5442 3.74345 12.9181 3.65519 13.1157 3.8769C14.3308 5.24042 15 7.0018 15 8.83663C15 12.1513 12.7919 15.0907 9.63031 15.9848C9.29125 16.0808 9.01188 15.6645 9.22279 15.3826C9.7352 14.6972 10.0062 13.88 10.0062 13.0189C10.0062 11.6608 9.31072 10.4032 8.17722 9.68675C7.06126 10.3919 6.40144 11.6085 6.40144 12.983C6.40144 14.0015 6.77673 14.9986 7.12456 15.3381C7.41614 15.6229 7.09617 16.1256 6.71668 15.9712C3.58943 14.6986 1.66928 11.5837 2.04725 8.3961ZM5.59843 14.2557C5.50212 13.8442 5.44777 13.4079 5.44777 12.983C5.44777 11.1793 6.36461 9.59156 7.9003 8.73587C8.06372 8.64492 8.28094 8.63953 8.4539 8.73587C9.99932 9.59772 10.9595 11.2391 10.9595 13.0191C10.9595 13.527 10.8838 14.0225 10.736 14.4944C12.7385 13.3749 14.0463 11.217 14.0463 8.83682C14.0463 7.57906 13.6851 6.36109 13.0152 5.32061C12.835 5.73019 12.6185 6.1238 12.3676 6.49781C12.0995 6.89739 11.4713 6.79317 11.3428 6.32994C10.7957 4.35589 9.75543 2.55067 8.32406 1.08465C5.50803 2.59451 3.33939 5.59385 2.99384 8.51032C2.73106 10.7278 3.76449 12.9089 5.59843 14.2557Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1279_1848" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Fire;
