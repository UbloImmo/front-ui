import { isFunction, type Nullable } from "@ubloimmo/front-util";
import {
  type MutableRefObject,
  type RefCallback,
  type RefObject,
  useCallback,
  useRef,
} from "react";

type RefWriter<T> = RefCallback<T> | MutableRefObject<T | null> | RefObject<T>;

/**
 * Assigns a single value to multiple refs
 *
 * @param refWriters - List of refs to write to
 * @returns A ref callback function to pass to the element
 */
export function useReplicateRef<T>(
  ...refWriters: RefWriter<T>[]
): RefCallback<T> {
  return useCallback<RefCallback<T>>(
    (instance) => {
      for (const writer of refWriters) {
        if (isFunction<RefCallback<T>>(writer)) {
          writer(instance);
        } else {
          (writer as MutableRefObject<Nullable<T>>).current = instance;
        }
      }
    },
    [refWriters]
  );
}

/**
 * Intercepts & stores a single ref
 *
 * @param refWriters - List of refs to write to
 * @returns A ref callback function to pass to the element
 */
export function useInterceptRef<T>(...refWriters: RefWriter<T>[]): {
  ref: RefObject<T>;
  interceptRef: RefCallback<T>;
} {
  const ref = useRef<T>(null);
  const interceptRef = useReplicateRef(ref, ...refWriters);

  return {
    ref,
    interceptRef,
  };
}
