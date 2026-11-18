import { errorQuery, lesson, products } from './request-races.data.ts';

export function simulateSearch(
  query: string,
  delay: number,
  signal: AbortSignal,
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    signal.throwIfAborted();

    const timer = setTimeout(() => {
      signal.removeEventListener('abort', abort);
      const term = query.trim().toLowerCase();
      if (term === errorQuery) {
        reject(new Error(lesson.playground.error));
        return;
      }
      resolve(
        products.filter((product) => product.toLowerCase().includes(term)),
      );
    }, delay);

    function abort() {
      clearTimeout(timer);
      reject(signal.reason);
    }

    signal.addEventListener('abort', abort, { once: true });
  });
}
