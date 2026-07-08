import { useEffect } from "react";
import { useBio } from "../components/BioContext";

/**
 * Debounced coupon prefetch — moved out of Card.jsx as-is.
 * Fires 200ms after productdataonlydetail settles, same as before.
 */
export const useCouponPrefetch = () => {
  const { productdataonlydetail, fetchCoupons } = useBio();

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCoupons("all", "all");
    }, 200);

    return () => clearTimeout(timer);
    // fetchCoupons intentionally excluded: it's a new function reference on every
    // BioContext render (not memoized with useCallback there), so including it
    // here would refire this effect every render -> infinite fetch loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productdataonlydetail]);
};