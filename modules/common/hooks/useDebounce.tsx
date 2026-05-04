import { useEffect, useRef } from "react";

export function useDebounce(
  effect: () => void | (() => void),
  deps: any[],
  delay: number,
) {
  const cleanupRef = useRef<ReturnType<typeof effect>>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      cleanupRef.current = effect();
    }, delay);

    return () => {
      clearTimeout(handler);

      // run cleanup from previous effect if exists
      if (typeof cleanupRef.current === "function") {
        cleanupRef.current();
      }
    };
  }, [...deps, delay]);
}
