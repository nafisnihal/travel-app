import { useCallback, useRef, useState } from "react";

export function useMeasure() {
  const [dimensions, setDimensions] = useState({ width: null, height: null });
  const previousObserver = useRef(null);

  const customRef = useCallback((node) => {
    if (previousObserver.current) {
      previousObserver.current.disconnect();
      previousObserver.current = null;
    }

    if (node) {
      const observer = new ResizeObserver(([entry]) => {
        if (entry?.borderBoxSize && entry.borderBoxSize.length > 0) {
          const { inlineSize: width, blockSize: height } =
            entry.borderBoxSize[0];
          setDimensions({ width, height });
        } else if (entry.contentRect) {
          const { width, height } = entry.contentRect;
          setDimensions({ width, height });
        }
      });

      observer.observe(node);
      previousObserver.current = observer;
    }
  }, []);

  return [customRef, dimensions];
}
