import styles from "./Toaster.module.scss";

import { cssClasses, useStatic } from "@utils";

import type { ToasterIconMap } from "./Toaster.types";
import type { ToastClassnames } from "sonner";

export const toasterIcons: ToasterIconMap = {
  success: "CheckCircleFill",
  info: "InfoSquareFill",
  warning: "QuestionSquareFill",
  error: "ExclamationSquareFill",
  close: "X",
};

export function useToasterClassNames(): ToastClassnames {
  return useStatic<ToastClassnames>(() => ({
    toast: cssClasses(styles.toast),
    title: cssClasses(styles["toast-title"]),
    description: cssClasses(styles["toast-description"]),
    loader: cssClasses(styles["toast-loader"]),
    closeButton: cssClasses(styles["toast-close-button"]),
    cancelButton: cssClasses(styles["toast-cancel-button"]),
    actionButton: cssClasses(styles["toast-action-button"]),
    success: cssClasses(styles["toast-success"]),
    error: cssClasses(styles["toast-error"]),
    info: cssClasses(styles["toast-info"]),
    warning: cssClasses(styles["toast-warning"]),
    loading: cssClasses(styles["toast-loading"]),
    content: cssClasses(styles["toast-content"]),
    icon: cssClasses(styles["toast-icon"]),
  }));
}
