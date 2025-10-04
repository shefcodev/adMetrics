import { useEffect, useRef } from "react";

export default function usePolling(cb, intervalMs, deps = []) {
  const saved = useRef(cb);
  useEffect(() => {
    saved.current = cb;
  }, [cb]);

  useEffect(() => {
    saved.current?.();
    const id = setInterval(() => saved.current?.(), intervalMs);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
