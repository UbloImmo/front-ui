import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `map-off`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const MapOff = (props: CommonIconProps): JSX.Element => {
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
        d="M15.817 0.113333C15.9328 0.208303 16 0.350208 16 0.500004V14.5L16 14.502C16.0005 14.1175 15.8541 13.7327 15.5607 13.4393L15 12.8787V1.10991L11 1.90991V8.87868L10 7.87868V1.90991L6 1.10991V3.87868L5 2.87868V1.10991L3.52602 1.4047L2.67619 0.554865L5.40194 0.00971396C5.46667 -0.00323223 5.53333 -0.00323223 5.59806 0.00971396L10.5 0.990102L15.4019 0.00971396C15.5488 -0.0196636 15.7012 0.0183639 15.817 0.113333Z"
        fill={color}
      />
      <path
        d="M12.474 14.5953L13.3238 15.4451L10.5981 15.9903C10.5333 16.0032 10.4667 16.0032 10.4019 15.9903L5.5 15.0099L0.598058 15.9903C0.451171 16.0197 0.29885 15.9816 0.183006 15.8867C0.0671617 15.7917 1.60322e-07 15.6498 1.60322e-07 15.5V1.50069C0.000176985 1.88435 0.146623 2.26794 0.43934 2.56066L1 3.12132V14.8901L5 14.0901V7.12132L6 8.12132V14.0901L10 14.8901V12.1213L11 13.1213V14.8901L12.474 14.5953Z"
        fill={color}
      />
      <path
        d="M1.14645 1.85355C0.951185 1.65829 0.951185 1.34171 1.14645 1.14645C1.34171 0.951184 1.65829 0.951184 1.85355 1.14645L14.8536 14.1464C15.0488 14.3417 15.0488 14.6583 14.8536 14.8536C14.6583 15.0488 14.3417 15.0488 14.1464 14.8536L1.14645 1.85355Z"
        fill={color}
      />
    </svg>
  );
};

export default MapOff;
