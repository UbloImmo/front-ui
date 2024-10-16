import styled from "styled-components";

import { SmallLoader } from "@/components/SmallLoader";
import { breakpointsPx } from "@/sizes";
import { FlexRowLayout } from "@layouts";

export const FieldSkeleton = () => {
  return (
    <FlexRowLayout fill align="center">
      <FieldSkeletonLoader color="gray-100" />
    </FlexRowLayout>
  );
};

const FieldSkeletonLoader = styled(SmallLoader)`
  height: var(--s-4);

  @media (min-width: ${breakpointsPx.XS}) {
    height: var(--s-6);
  }
`;
