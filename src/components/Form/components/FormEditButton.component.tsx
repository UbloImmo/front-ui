import { useMemo } from "react";

import { useFormContext } from "../Form.context";
import styles from "../Form.module.scss";

import { Button } from "@/components/Button";
import { cssClasses, useStatic, useUikitTranslation } from "@utils";

/**
 * Renders a form's edit button and hides it based on edit state.
 *
 * @version 0.1.0
 * @private
 *
 * @return {JSX.Element} The rendered form edit button component.
 */
export const FormEditButton = (): JSX.Element => {
  const {
    isEditing,
    startEditing,
    readonly,
    cancelEdition,
    asModal,
    isLoading,
  } = useFormContext();
  const tl = useUikitTranslation();

  const label = useStatic(tl.action.edit);
  const closeLabel = useStatic(tl.action.close);

  const classNames = useMemo(
    () => ({
      edit: cssClasses(styles["form-edit-button"], [
        styles.hidden,
        isEditing || readonly,
      ]),
      closeContainer: cssClasses(styles["form-close-button-container"]),
      closeGhost: cssClasses(styles["form-close-button-ghost"], styles.hidden),
      close: cssClasses(styles["form-close-button"]),
    }),
    [isEditing, readonly]
  );

  return (
    <>
      <Button
        className={classNames.edit}
        onClick={startEditing}
        disabled={isLoading}
        icon="Pen"
        title={label}
        testId="form-edit"
        label={label}
        secondary
        expandOnHover
      />
      {asModal && !(!isEditing && !readonly) && (
        <div className={classNames.closeContainer}>
          <Button
            className={classNames.closeGhost}
            icon="XLg"
            testId="form-modal-close-ghost"
            color="black"
          />
          <Button
            className={classNames.close}
            onClick={cancelEdition}
            icon="XLg"
            title={closeLabel}
            label={closeLabel}
            testId="form-modal-close"
            color="black"
            expandOnHover
          />
        </div>
      )}
    </>
  );
};
