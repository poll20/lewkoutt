// import { useEffect, useRef, useState } from "react";

// /**
//  * Generic "load N more on scroll" hook.
//  * Works on any array — pass the full (already filtered/sorted) list length,
//  * get back how many items to actually render + a ref to drop on your sentinel div.
//  *
//  * @param {number} totalCount   total number of items available after filtering
//  * @param {object} options
//  * @param {number} options.initialBatch  how many items to show first (default 4)
//  * @param {number} options.step          how many more to reveal each time (default 4)
//  * @param {Array}  options.resetKey       pass the filtered array itself (or any value) —
//  *                                         whenever it changes, visibleCount resets to initialBatch
//  */
// export const useInfiniteScroll = (totalCount, { initialBatch = 4, step = 4, resetKey } = {}) => {
//   const [visibleCount, setVisibleCount] = useState(initialBatch);
//   const loaderRef = useRef(null);

//   // Reset back to the first batch whenever the underlying list identity changes
//   // (new filter, new search, new category, etc.)
//   useEffect(() => {
//     setVisibleCount(initialBatch);
//   }, [resetKey, initialBatch]);

//   useEffect(() => {
//     const el = loaderRef.current;
//     if (!el) return undefined;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) {
//           setVisibleCount((prev) => (prev >= totalCount ? prev : prev + step));
//         }
//       },
//       { rootMargin: "200px", threshold: 0 } // 200px early-trigger so it feels seamless
//     );

//     observer.observe(el);
//     return () => observer.disconnect();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [totalCount, step]);

//   const hasMore = visibleCount < totalCount;

//   return { visibleCount, loaderRef, hasMore };
// };


import { useEffect, useRef, useState } from "react";

/**
 * Generic "load N more on scroll" hook.
 * Works on any array — pass the full (already filtered/sorted) list length,
 * get back how many items to actually render + a ref to drop on your sentinel div.
 *
 * @param {number} totalCount   total number of items available after filtering
 * @param {object} options
 * @param {number} options.initialBatch  how many items to show first (default 4)
 * @param {number} options.step          how many more to reveal each time (default 4)
 * @param {Array}  options.resetKey       pass the filtered array itself (or any value) —
 *                                         whenever it changes, visibleCount resets to initialBatch
 */
export const useInfiniteScroll = (totalCount, { initialBatch = 4, step = 4, resetKey } = {}) => {
  const [visibleCount, setVisibleCount] = useState(initialBatch);
  const loaderRef = useRef(null);

  // Reset back to the first batch whenever the underlying list identity changes
  // (new filter, new search, new category, etc.)
  useEffect(() => {
    setVisibleCount(initialBatch);
  }, [resetKey, initialBatch]);

  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        setVisibleCount((prev) => {
          // Hard stop once everything is shown — prevents any re-render from
          // re-triggering another increment past the actual list length.
          if (prev >= totalCount) return prev;
          return Math.min(prev + step, totalCount);
        });
      },
      { rootMargin: "100px", threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCount, step]);

  const hasMore = visibleCount < totalCount;

  return { visibleCount, loaderRef, hasMore };
};