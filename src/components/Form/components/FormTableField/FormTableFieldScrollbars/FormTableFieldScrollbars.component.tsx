import {
  useRef,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
  type PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";

import {
  computeScrollProgress,
  computeScrollRatio,
} from "./FormTableFieldScrollbars.utils";
import styles from "../FormTableField.module.scss";
import {
  FormTableFieldScrollbarsMeasurements,
  type FormTableFieldScrollbarsProps,
} from "./FormTableFieldScrollbars.types";

import {
  clamp,
  cssPx,
  useCssClasses,
  useCssVariables,
  useResizeObserver,
} from "@utils";

import type { Vec2, Axis } from "@types";

const SCROLL_READ_DEBOUNCE_MS = 100;

/**
 * Renders horizontal & vertical scroll bars for the form table field if any overflow is present
 *
 * @param {FormTableFieldScrollbarsProps} props - Component props
 * @returns {ReactNode} Scroll bars that render dynamically based on the table's content, only if it is scrollable
 */
export function FormTableFieldScrollbars({
  contentRefs,
  scrollerId,
}: FormTableFieldScrollbarsProps): ReactNode {
  const [measurements, setMeasurements] =
    useState<FormTableFieldScrollbarsMeasurements>({
      scrollWidth: 0,
      scrollHeight: 0,
      width: 0,
      height: 0,
      scrollLeft: 0,
      scrollTop: 0,
    });

  const [draggingX, setDraggingX] = useState(false);
  const [draggingY, setDraggingY] = useState(false);

  const dragStart = useRef<Vec2>();
  const dragAxis = useRef<Axis>();
  const trackHorizonalRef = useRef<HTMLDivElement>(null);
  const trackVerticalRef = useRef<HTMLDivElement>(null);

  const onPointerDown = useCallback(
    (axis: Axis) => (event: ReactPointerEvent) => {
      if (axis === "horizontal") {
        setDraggingX(true);
      } else {
        setDraggingY(true);
      }
      dragAxis.current = axis;
      dragStart.current = { x: event.clientX, y: event.clientY };
      document.documentElement.style.cursor = "grabbing";
      if (trackHorizonalRef.current) {
        trackHorizonalRef.current.style.cursor = "grabbing";
      }
    },
    []
  );

  const onPointerUp = useCallback(() => {
    dragStart.current = undefined;
    dragAxis.current = undefined;
    setDraggingX(false);
    setDraggingY(false);
    document.documentElement.style.cursor = "";
    if (trackHorizonalRef.current) {
      trackHorizonalRef.current.style.cursor = "";
    }
  }, []);

  const onPointerMove = useCallback(
    (event: PointerEvent) => {
      if (!dragStart.current) return; // not dragging
      if (!contentRefs.current?.gridRef) return; // no scroller
      const delta: Vec2 = {
        x:
          dragAxis.current === "horizontal"
            ? event.clientX - dragStart.current.x
            : 0,
        y:
          dragAxis.current === "vertical"
            ? event.clientY - dragStart.current.y
            : 0,
      };
      // update start for next event's delta
      dragStart.current = { x: event.clientX, y: event.clientY };
      // trigger scroll on scroller
      contentRefs.current.gridRef.scrollBy({
        left: delta.x,
        top: delta.y,
        behavior: "instant",
      });
    },
    [contentRefs]
  );

  /**
   * Reads the scroller ref's dimensions & scroll-related state
   */
  const measureScroller = useCallback(() => {
    if (!contentRefs.current?.gridRef) return;
    const {
      scrollWidth,
      scrollHeight,
      clientWidth: width,
      clientHeight: height,
      scrollTop,
      scrollLeft,
    } = contentRefs.current.gridRef;
    setMeasurements({
      scrollWidth,
      scrollHeight,
      width,
      height,
      scrollTop,
      scrollLeft,
    });
  }, [contentRefs]);

  // set up resize listeners on scroller & content
  useResizeObserver(
    { current: contentRefs.current?.gridRef ?? null },
    SCROLL_READ_DEBOUNCE_MS,
    measureScroller
  );
  useResizeObserver(
    { current: contentRefs.current?.tableRef ?? null },
    SCROLL_READ_DEBOUNCE_MS,
    measureScroller
  );
  // grab reactive header dimensions
  const headerDimensions = useResizeObserver(
    { current: contentRefs.current?.tableHeaderRef ?? null },
    SCROLL_READ_DEBOUNCE_MS
  );

  /**
   * Set up scroll listener on the scroller element
   */
  useLayoutEffect(() => {
    const scroller = contentRefs.current?.gridRef;
    if (!scroller) return;

    scroller.addEventListener("scroll", measureScroller, { passive: true });

    return () => scroller.removeEventListener("scroll", measureScroller);
  }, [contentRefs, measureScroller]);

  /**
   * Set up global pointer event listeners on document's html tag
   */
  useLayoutEffect(() => {
    const html = document.documentElement;
    if (!html) return;
    html.addEventListener("pointerup", onPointerUp, { passive: true });
    html.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      html.removeEventListener("pointerup", onPointerUp);
      html.removeEventListener("pointermove", onPointerMove);
    };
  }, [onPointerMove, onPointerUp]);

  /**
   * Ratio between scroller width & its scrollable content width in both overflow axis
   */
  const ratio = useMemo<Vec2>(
    () => ({
      x: computeScrollRatio(measurements.scrollWidth, measurements.width),
      y: computeScrollRatio(measurements.scrollHeight, measurements.height),
    }),
    [measurements]
  );

  /**
   * Scroll progress ration in both overflow axis
   */
  const progress = useMemo<Vec2>(
    () => ({
      x: computeScrollProgress(
        measurements.scrollWidth,
        measurements.width,
        measurements.scrollLeft
      ),
      y: computeScrollProgress(
        measurements.scrollHeight,
        measurements.height,
        measurements.scrollTop
      ),
    }),
    [measurements]
  );

  // scroll track & thumb CSS styling
  const trackHorizontalClassName = useCssClasses(
    styles.scrollbar,
    styles.horizontal,
    [styles.hidden, ratio.x === 1],
    [styles.dragging, draggingX]
  );
  const trackVerticalClassName = useCssClasses(
    styles.scrollbar,
    styles.vertical,
    [styles.hidden, ratio.y === 1],
    [styles.dragging, draggingY]
  );
  const thumbClassName = useCssClasses(styles.thumb);
  const thumbHorizontalStyle = useCssVariables({
    ratio: String(ratio.x),
    progress: String(progress.x),
  });
  const trackVerticalStyle = useCssVariables({
    ratio: String(ratio.y),
    progress: String(progress.y),
    "scroller-height": cssPx(measurements.height),
    "header-height": cssPx(headerDimensions?.height ?? 0),
    "top-offset": clamp((measurements.scrollTop || 0) / 8, 0, 1),
  });

  return (
    <>
      <div
        className={trackHorizontalClassName}
        onPointerDown={onPointerDown("horizontal")}
        role="scrollbar"
        data-testid="form-table-field-scrollbar-horizontal"
        aria-controls={scrollerId}
        aria-orientation="horizontal"
        aria-valuenow={Math.round(progress.x * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        ref={trackHorizonalRef}
      >
        <div
          className={thumbClassName}
          style={thumbHorizontalStyle}
          data-testid="scrollbar-thumb"
        />
      </div>
      <div
        className={trackVerticalClassName}
        style={trackVerticalStyle}
        onPointerDown={onPointerDown("vertical")}
        role="scrollbar"
        data-testid="form-table-field-scrollbar-vertical"
        aria-controls={scrollerId}
        aria-orientation="vertical"
        aria-valuenow={Math.round(progress.y * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        ref={trackVerticalRef}
      >
        <div className={thumbClassName} data-testid="scrollbar-thumb" />
      </div>
    </>
  );
}
