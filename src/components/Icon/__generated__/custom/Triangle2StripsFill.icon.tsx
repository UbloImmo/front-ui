import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `triangle2-strips-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const Triangle2StripsFill = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1422_48)" >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.16088 0C9.36429 5.47037e-06 9.54813 0.123102 9.62474 0.311523L15.7185 15.3115C15.7686 15.4348 15.7661 15.5625 15.7244 15.6738C15.6826 15.7852 15.6016 15.8801 15.4958 15.9385C15.4252 15.9774 15.3435 16 15.2546 16H0.740954L0.675524 15.9961C0.63727 15.9912 0.60076 15.9816 0.566149 15.9688C0.564107 15.968 0.562318 15.9666 0.56029 15.9658C0.53215 15.955 0.506397 15.9403 0.481188 15.9248C0.463901 15.9142 0.448103 15.9022 0.43236 15.8896C0.417965 15.8782 0.403367 15.8674 0.390368 15.8545C0.376015 15.8402 0.363823 15.8244 0.351305 15.8086C0.339851 15.7941 0.327915 15.7803 0.318102 15.7646C0.307924 15.7484 0.300027 15.7312 0.291735 15.7139C0.283382 15.6965 0.274623 15.6794 0.268297 15.6611C0.262263 15.6436 0.258702 15.6256 0.254625 15.6074C0.241803 15.5505 0.235304 15.4911 0.243883 15.4307C0.244446 15.4267 0.246151 15.4229 0.246813 15.4189C0.252791 15.3831 0.262627 15.3471 0.277086 15.3115L6.37084 0.311523C6.37937 0.290532 6.38906 0.270259 6.40013 0.250977C6.40591 0.240912 6.41227 0.231248 6.41869 0.22168C6.42597 0.210821 6.43406 0.200616 6.44213 0.19043C6.44903 0.181704 6.45617 0.17325 6.46361 0.165039C6.46842 0.159739 6.47324 0.154492 6.47826 0.149414L6.49779 0.129883C6.50311 0.125065 6.50888 0.120791 6.51439 0.116211C6.52277 0.109256 6.53098 0.102092 6.53978 0.0957031C6.54869 0.0892301 6.55781 0.0830216 6.56713 0.0771484C6.60234 0.0549768 6.64046 0.037312 6.68041 0.0244141C6.68305 0.0235603 6.68556 0.022295 6.68822 0.0214844C6.71136 0.0144355 6.73528 0.00952189 6.75951 0.00585938L6.8347 0H9.16088ZM3.51439 10L3.10814 11H12.8874L12.4812 10H3.51439ZM5.54564 5L5.13939 6H10.8562L10.4499 5H5.54564Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1422_48" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Triangle2StripsFill;
