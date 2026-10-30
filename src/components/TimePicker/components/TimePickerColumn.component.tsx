import { isNumber } from "@ubloimmo/front-util";
import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { useTimePickerColumnClassNames } from "../TimePicker.styles";
import { TimePickerColumnProps } from "../TimePicker.types";

import { arrayOf, cssPx, cssVarName, useResizeObserver } from "@utils";

const SCROLL_DURATION = 300;
const MIN_COPIES = 2;

export function TimePickerColumn({ children, selection }: TimePickerColumnProps) {
  const scrollingRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation>(undefined);

  const scrollY = useRef(0);
  const scrollingDimensions = useResizeObserver(scrollingRef);
  const [copies, setCopies] = useState(MIN_COPIES);

  const scrollByDelta = useCallback(
    (deltaY: number, animate?: boolean) => {
      console.log("try scroll", scrollingRef.current);
      const height =
        scrollingDimensions?.height ?? scrollingRef.current?.getBoundingClientRect().height;
      if (!scrollingRef.current) return;
      console.log("pass check");
      // wrap into [0, limit) since the children are rendered twice
      const limit = height / copies;
      const from = scrollY.current;
      const rawY = from + deltaY;
      const newY = ((rawY % limit) + limit) % limit;
      scrollY.current = newY;

      // always commit the wrapped value, it is visually identical to the unwrapped one
      animation.current?.cancel();
      animation.current = undefined;
      scrollingRef.current.style.translate = `0 ${cssPx(-newY)}`;

      if (!animate) return;
      const bezier = getComputedStyle(document.documentElement).getPropertyValue(
        cssVarName("bezier"),
      );
      // animate towards the unwrapped target so we never sweep back across the whole column
      const current = scrollingRef.current.animate(
        { translate: [`0 ${cssPx(-from)}`, `0 ${cssPx(-rawY)}`] },
        {
          duration: SCROLL_DURATION,
          fill: "forwards",
          easing: bezier || "ease-out",
        },
      );
      current.onfinish = () => {
        // reveal the committed wrapped value
        current.cancel();
        if (animation.current === current) animation.current = undefined;
      };
      animation.current = current;
    },
    [scrollingDimensions, copies],
  );

  // measure scrolling content & update copies to at lease fill the whole scroller
  useEffect(() => {
    if (!scrollerRef.current || !scrollingDimensions) return;

    const scrollerHeight = scrollerRef.current.getBoundingClientRect().height;
    const childrenHeight = scrollingDimensions.height / copies;

    // TODO: remove excessive copies

    // current copies are enough, no need for more
    if (childrenHeight >= scrollerHeight) return;

    // create as many copies as necessary.
    let additionalCopies = 0;
    let acc = childrenHeight;
    while (acc < scrollerHeight) {
      additionalCopies++;
      acc += childrenHeight;
    }
    setCopies(MIN_COPIES + additionalCopies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  useLayoutEffect(() => {
    const selectedValue = isNumber(selection) ? selection : 0;
    if (!scrollingRef.current || !scrollerRef.current) return;
    const candidates = scrollingRef.current.querySelectorAll(`[data-value="${selectedValue}"]`);
    if (!candidates.length) return;

    const { top: offset } = scrollingRef.current.getBoundingClientRect();
    const { height: scrollerHeight } = scrollerRef.current.getBoundingClientRect();

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
    console.log("scroll to selection", selection);
    scrollByDelta(selectedDiff + selectedHeight / 2, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection, copies]);

  const classNames = useTimePickerColumnClassNames();

  return (
    <div className={classNames.scroller} ref={scrollerRef}>
      <div className={classNames.column} ref={scrollingRef}>
        {arrayOf(copies, (index) => (
          <Fragment key={index}>{children}</Fragment>
        ))}
      </div>
    </div>
  );
}
