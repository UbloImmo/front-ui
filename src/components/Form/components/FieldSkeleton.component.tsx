import styles from "../Form.module.scss";

import { SmallLoader } from "@/components/SmallLoader";
import { FlexRowLayout } from "@/layouts/Flex";
import { useCssClasses } from "@utils";

export const FieldSkeleton = () => {
  const className = useCssClasses(styles["form-field-skeleton-loader"]);
  return (
    <FlexRowLayout fill align="center" testId="field-skeleton">
      <SmallLoader className={className} color="gray-100" />
    </FlexRowLayout>
  );
};
