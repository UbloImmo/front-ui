import styles from "./FontPreview.module.scss";

import { useStatic, cssClasses } from "@utils";

export function useFontPreviewClassNames() {
  return useStatic(() => ({
    box: cssClasses(styles["font-preview"]),
    heading: cssClasses(styles["font-preview-heading"]),
  }));
}
