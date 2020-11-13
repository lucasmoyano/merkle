import { useLayoutEffect, useRef, useState } from 'react';

/**
 * Force component re-render
 * @returns {Function}
 */
export default function useForceUpdate() {
  const [flag, setFlag] = useState(true);
  const isUpdating = useRef(false);
  const callbacks = useRef<any>([]);

  useLayoutEffect(() => {
    if (isUpdating.current) {
      isUpdating.current = true;
      for (const callback of callbacks.current) {
        callback();
      }
      callbacks.current.length = 0;
    }
  }, [flag]);

  return function (callback: any = null) {
    isUpdating.current = true;
    if (callback != null) {
      callbacks.current.push(callback);
    }
    setFlag(flag => !flag);
  };
}