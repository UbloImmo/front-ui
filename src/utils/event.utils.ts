import { useId, useLayoutEffect, useMemo, useRef, type RefObject } from "react";

import type { Nullable, VoidFn } from "@ubloimmo/front-util";

/**
 * Hook that handles escape key press and clicks outside a specified element
 *
 * @template TElement - The HTML element type to watch for outside clicks, defaults to HTMLDivElement
 * @param {VoidFn} callback - Function to call when escape is pressed or clicked outside
 * @param {RefObject<Nullable<TElement>>} [wrapperRef] - Optional ref to the wrapper element
 * @param {string} [wrapperId] - Optional ID of the wrapper element
 * @returns {{ ref: RefObject<TElement>, id: string }} Object containing ref and id
 */
export const useEscapeOrOutsideClickEvent = <
  TElement extends HTMLElement = HTMLDivElement
>(
  callback: VoidFn,
  wrapperRef?: RefObject<Nullable<TElement>>,
  wrapperId?: string
) => {
  const defaultId = useId();
  const defaultRef = useRef<TElement>(null);

  const ref = useMemo<RefObject<TElement>>(
    () => (wrapperRef as RefObject<TElement>) ?? defaultRef,
    [wrapperRef]
  );
  const id = useMemo(() => wrapperId ?? defaultId, [defaultId, wrapperId]);

  useLayoutEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (!e.target) return;
      if ("id" in e.target && e.target.id === id) return;
      if (!ref.current) return;
      if (ref.current.contains(e.target as HTMLElement)) return;

      callback();
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        callback();
      }
    };
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("keyup", onKeyUp, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [callback, id, ref]);

  return { ref, id };
};
