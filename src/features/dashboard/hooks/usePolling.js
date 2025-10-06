import { useEffect, useRef } from "react";

export default function usePolling(callback, intervalMs, deps = []) {
  const saved = useRef(callback);
  useEffect(() => {
    saved.current = callback;
  }, [callback]);

  useEffect(() => {
    saved.current?.();
    const id = setInterval(() => saved.current?.(), intervalMs);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
