/**
 * Computes the ratio between an element's length & its scrollable track's length
 *
 * From 0: The element's scrollable track's length is infinite
 *   To 1: The element's scrollable track's length is equal to the its length (no overflow)
 *
 * @param {number} scrollLength - Length in pixels of the scrolling content, either `scrollWidth` or `scrollHeight`
 * @param {number} length - Length in pixels of the scrollable container, either `width` or `height`
 * @returns {number} Scroll ratio between 0 and 1
 */
export function computeScrollRatio(
  scrollLength: number,
  length: number
): number {
  if (!scrollLength || !length || scrollLength <= length) return 1;
  return length / scrollLength;
}

/**
 * Computes the scroll progress ratio for a given scrollable element
 * From 0: not scrolled at all
 *   To 1: scrolled to the end
 *
 * @remarks Non-scrollable elements or cases without overflow return a ratio of 1
 *
 * @param {number} scrollLength - Length in pixels of the scrolling content, either `scrollWidth` or `scrollHeight`
 * @param {number} length - Length in pixels of the scrollable container, either `width` or `height`
 * @param {number} scrollOffset - Length in pixels the container has scrolled by, either `scrollLeft` or `scrollTop`
 * @returns {number} Scroll progress ratio between 0 and 1
 */
export function computeScrollProgress(
  scrollLength: number,
  length: number,
  scrollOffset: number
): number {
  if (!scrollLength || !length) return 1;
  // if scrollLength is smaller than or equal to length, no overflow is occuring
  // so we catch this case and return early, otherwise we would be dividing by 0 afterwards if both are equal
  if (scrollLength <= length) return 1;
  const computed = scrollOffset / (scrollLength - length);
  // Due to floating point precision errors, the most we get when the element is fully scrolled is often close to 1 but not quite 1,
  // So we consider any value above 0.99 to be one
  if (computed > 0.99) return 1;
  return computed;
}
