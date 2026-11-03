import { isNumber } from "@ubloimmo/front-util";
import {
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useTimePickerColumnClassNames } from "../TimePicker.styles";
import { TimePickerColumnProps } from "../TimePicker.types";

import { arrayOf, clamp, cssPx, cssVarName, useResizeObserver } from "@utils";

const SCROLL_DURATION = 300;
const NO_COPIES = 1;
const WITH_COPIES = 2;

/**
 * Renders its children in a scrollable column that seemlessly wraps back to the top when the user scrolls to the bottom
 * @param {TimePickerColumnProps} props - Component props
 * @returns {ReactNode} - Wrapped children
 */
export function TimePickerColumn({
  children,
  selection,
  defaultSelection,
  type,
}: TimePickerColumnProps): ReactNode {
  const scrollingRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation>(undefined);

  const scrollY = useRef(0);
  const scrollingDimensions = useResizeObserver(scrollingRef);
  const [copies, setCopies] = useState(NO_COPIES);

  const scrollByDelta = useCallback(
    (deltaY: number, animate?: boolean) => {
      if (!scrollingRef.current || !scrollerRef.current) return;
      const height =
        scrollingDimensions?.height ??
        scrollingRef.current.getBoundingClientRect().height;
      const scrollerHeight = scrollerRef.current.getBoundingClientRect().height;

      // wrap into [0, limit) since the children are rendered twice
      const isBound = height < scrollerHeight;
      const limit = height / copies;
      const from = scrollY.current;
      const rawY = from + deltaY;

      const repeatingY = ((rawY % limit) + limit) % limit;

      const boundDown = scrollerHeight / -2;
      const boundUp = height + boundDown;
      const boundY = clamp(rawY, boundDown, boundUp);

      const newY = isBound ? boundY : repeatingY;

      scrollY.current = newY;

      // always commit the wrapped value, it is visually identical to the unwrapped one
      animation.current?.cancel();
      animation.current = undefined;
      scrollingRef.current.style.translate = `0 ${cssPx(-newY)}`;

      if (!animate) return;
      const bezier = getComputedStyle(
        document.documentElement
      ).getPropertyValue(cssVarName("bezier"));
      // animate towards the unwrapped target so we never sweep back across the whole column
      const current = scrollingRef.current.animate(
        { translate: [`0 ${cssPx(-from)}`, `0 ${cssPx(-rawY)}`] },
        {
          duration: SCROLL_DURATION,
          fill: "forwards",
          easing: bezier || "ease-out",
        }
      );
      current.onfinish = () => {
        // reveal the committed wrapped value
        current.cancel();
        if (animation.current === current) animation.current = undefined;
      };
      animation.current = current;
    },
    [scrollingDimensions, copies]
  );

  // measure scrolling content & trigger copies render if needed
  useEffect(() => {
    if (!scrollerRef.current || !scrollingDimensions) return;
    const scrollerHeight = scrollerRef.current.getBoundingClientRect().height;

    // if content is smaller than scroller, infinite wrap scrolling is disabled
    // the effect is otherwise enabled, and needs a copy of the children to work seamlessly
    const needsCopy = scrollingDimensions.height > scrollerHeight;
    setCopies(needsCopy ? WITH_COPIES : NO_COPIES);

    return;
  }, [scrollingDimensions]);

  // React registers wheel listeners as passive, which silently ignores preventDefault().
  // A native non-passive listener is required to stop the parent from scrolling.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const onWheel = (event: WheelEvent) => {
      // prevent parent from scrolling
      event.preventDefault();
      event.stopPropagation();
      scrollByDelta(event.deltaY);
    };
    scroller.addEventListener("wheel", onWheel, { passive: false });
    return () => scroller.removeEventListener("wheel", onWheel);
  }, [scrollByDelta]);

  /**
   * Scrolls to selected item whenever selection changes
   */
  useEffect(() => {
    const selector = `[data-type=${type}][data-value="${isNumber(selection) ? selection : defaultSelection}"]`;
    if (!scrollingRef.current || !scrollerRef.current) return;
    const candidates = scrollingRef.current.querySelectorAll(selector);
    if (!candidates.length) return;

    const { top: offset } = scrollingRef.current.getBoundingClientRect();
    const { height: scrollerHeight } =
      scrollerRef.current.getBoundingClientRect();

    let selectedDiff = Infinity;
    let selectedHeight = 0;

    const scrollerCenter = scrollerHeight / 2;

    const baseLine = scrollY.current + offset + scrollerCenter;

    for (const candidate of candidates) {
      const { top, height } = candidate.getBoundingClientRect();

      const diff = top - baseLine;
      if (Math.abs(diff) < Math.abs(selectedDiff)) {
        selectedDiff = diff;
        selectedHeight = height;
      }
    }
    scrollByDelta(selectedDiff + selectedHeight / 2, isNumber(selection));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection, defaultSelection]);

  const classNames = useTimePickerColumnClassNames();

  return (
    <div className={classNames.scroller} ref={scrollerRef}>
      <div className={classNames.column} ref={scrollingRef} role="listbox">
        {arrayOf(copies, (index) => (
          <Fragment key={index}>{children}</Fragment>
        ))}
      </div>
    </div>
  );
}
