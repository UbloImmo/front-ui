import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `hexagon-dashed`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const HexagonDashed = (props: CommonIconProps): JSX.Element => {
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
        d="M7.24296 0.36338C7.71062 0.0899739 8.28938 0.0899733 8.75704 0.36338L9.44454 0.765303L8.93985 1.6286L8.25235 1.22668C8.09646 1.13554 7.90354 1.13554 7.74765 1.22668L7.06015 1.6286L6.55546 0.765303L7.24296 0.36338Z"
        fill={color}
      />
      <path
        d="M10.8195 1.56915L12.1945 2.373L11.6898 3.23629L10.3148 2.43245L10.8195 1.56915Z"
        fill={color}
      />
      <path
        d="M3.80545 2.373L5.18046 1.56915L5.68515 2.43245L4.31015 3.23629L3.80545 2.373Z"
        fill={color}
      />
      <path
        d="M1.74295 3.57876L2.43045 3.17684L2.93515 4.04014L2.24765 4.44206C2.09428 4.53173 2 4.69605 2 4.87371V5.65528H1V4.87371C1 4.34072 1.28283 3.84776 1.74295 3.57876Z"
        fill={color}
      />
      <path
        d="M13.5695 3.17684L14.257 3.57876C14.7172 3.84776 15 4.34072 15 4.87371V5.65528H14V4.87371C14 4.69605 13.9057 4.53173 13.7523 4.44206L13.0648 4.04014L13.5695 3.17684Z"
        fill={color}
      />
      <path d="M1 8.78154V7.21841H2V8.78154H1Z" fill={color} />
      <path d="M15 7.21841V8.78154H14V7.21841H15Z" fill={color} />
      <path
        d="M1 11.1262V10.3447H2V11.1262C2 11.3039 2.09428 11.4682 2.24765 11.5579L2.93515 11.9598L2.43046 12.8231L1.74296 12.4212C1.28283 12.1522 1 11.6592 1 11.1262Z"
        fill={color}
      />
      <path
        d="M15 10.3447V11.1262C15 11.6592 14.7172 12.1522 14.257 12.4212L13.5695 12.8231L13.0648 11.9598L13.7523 11.5579C13.9057 11.4682 14 11.3039 14 11.1262V10.3447H15Z"
        fill={color}
      />
      <path
        d="M12.1945 13.627L10.8195 14.4308L10.3148 13.5675L11.6898 12.7637L12.1945 13.627Z"
        fill={color}
      />
      <path
        d="M5.18046 14.4308L3.80546 13.627L4.31015 12.7637L5.68515 13.5675L5.18046 14.4308Z"
        fill={color}
      />
      <path
        d="M7.24296 15.6366L6.55546 15.2346L7.06015 14.3714L7.74765 14.7733C7.90354 14.8644 8.09646 14.8644 8.25235 14.7733L8.93985 14.3714L9.44454 15.2346L8.75704 15.6366C8.28938 15.91 7.71062 15.91 7.24296 15.6366Z"
        fill={color}
      />
    </svg>
  );
};

export default HexagonDashed;
