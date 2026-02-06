import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `figma-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const FigmaFill = (props: CommonIconProps): JSX.Element => {
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
        d="M8 8C8 7.29276 8.28973 6.61448 8.80546 6.11438C9.32118 5.61428 10.0207 5.33333 10.75 5.33333C11.4793 5.33333 12.1788 5.61428 12.6945 6.11438C13.2103 6.61448 13.5 7.29276 13.5 8C13.5 8.70724 13.2103 9.38552 12.6945 9.88562C12.1788 10.3857 11.4793 10.6667 10.75 10.6667C10.0207 10.6667 9.32118 10.3857 8.80546 9.88562C8.28973 9.38552 8 8.70724 8 8ZM2.5 13.3333C2.5 12.6261 2.78973 11.9478 3.30546 11.4477C3.82118 10.9476 4.52065 10.6667 5.25 10.6667H8V13.3333C8 14.0406 7.71027 14.7189 7.19454 15.219C6.67882 15.719 5.97935 16 5.25 16C4.52065 16 3.82118 15.719 3.30546 15.219C2.78973 14.7189 2.5 14.0406 2.5 13.3333ZM8 0V5.33333H10.75C11.4793 5.33333 12.1788 5.05238 12.6945 4.55229C13.2103 4.05219 13.5 3.37391 13.5 2.66667C13.5 1.95942 13.2103 1.28115 12.6945 0.781049C12.1788 0.280952 11.4793 0 10.75 0H8ZM2.5 2.66667C2.5 3.37391 2.78973 4.05219 3.30546 4.55229C3.82118 5.05238 4.52065 5.33333 5.25 5.33333H8V0H5.25C4.52065 0 3.82118 0.280952 3.30546 0.781049C2.78973 1.28115 2.5 1.95942 2.5 2.66667ZM2.5 8C2.5 8.70724 2.78973 9.38552 3.30546 9.88562C3.82118 10.3857 4.52065 10.6667 5.25 10.6667H8V5.33333H5.25C4.52065 5.33333 3.82118 5.61428 3.30546 6.11438C2.78973 6.61448 2.5 7.29276 2.5 8Z"
        fill={color}
      />
    </svg>
  );
};

export default FigmaFill;
