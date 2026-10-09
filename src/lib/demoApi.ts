export function delay(milliseconds: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason);
      return;
    }
    const timer = window.setTimeout(() => {
      signal?.removeEventListener("abort", abort);
      resolve();
    }, milliseconds);
    function abort() {
      window.clearTimeout(timer);
      reject(signal?.reason);
    }
    signal?.addEventListener("abort", abort, { once: true });
  });
}
