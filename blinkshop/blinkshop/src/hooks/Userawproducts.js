import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useBio } from "../components/BioContext";
import { useLoading } from "../components/LoadingContext";
import { normalizeProductDetails } from "../utils/productFilterSort";

/**
 * Decides WHERE the products for this view should come from (search / category /
 * section / newarrivals / store / rent / wish / default listing) and fetches or
 * derives them. Returns only the RAW list — no filtering/sorting here, that's a
 * separate concern (see useFilteredProducts).
 */
export const useRawProducts = (props) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { section, category, store, rent, wish } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const { setIsLoading } = useLoading();
  const {
    productdataonlydetail,
    productdata,
    newarrival,
    wishlistdata,
    guestWishlist,
    isLoggedIn,
    productfetch,
  } = useBio();

  const [rawProducts, setRawProducts] = useState([]);
  const latestFetchId = useRef(0);

  useEffect(() => {
    const fetchId = ++latestFetchId.current;
    const controller = new AbortController();

    const commit = (items) => {
      if (fetchId !== latestFetchId.current) return; // stale response — ignore
      setRawProducts(items);
    };

    const fetchFromApi = async (url) => {
      try {
        setIsLoading(true);
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        commit(normalizeProductDetails(data));
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("useRawProducts fetch error:", err);
        commit([]);
      } finally {
        if (fetchId === latestFetchId.current) setIsLoading(false);
      }
    };

    (async () => {
      setRawProducts([]); // clear while loading new source

      if (query) {
        await fetchFromApi(`${apiUrl}/search?q=${encodeURIComponent(query)}`);
        return;
      }

      if (props.category) {
        await fetchFromApi(
          `${apiUrl}/productmodel?operation=filtered&section=${encodeURIComponent(props.category)}`
        );
        return;
      }

      if (section && section !== "newarrivals") {
        await fetchFromApi(
          `${apiUrl}/productmodel?operation=filtered&section=${encodeURIComponent(section)}`
        );
        return;
      }

      if (section === "newarrivals") {
        const targetIds = new Set((newarrival || []).map((e) => e.ProductId?.toString()).filter(Boolean));
        const flattened = (productdata || []).flatMap((p) =>
          Array.isArray(p.productdetails) ? p.productdetails : []
        );
        commit(flattened.filter((prod) => targetIds.has(prod._id?.toString())));
        return;
      }

      if (store) {
        if (rawProducts.length === 0) productfetch("all");
        if (productdataonlydetail?.length > 0) commit(productdataonlydetail);
        return;
      }

      if (rent && Array.isArray(productdata) && productdata.length > 0) {
        commit(productdata);
        return;
      }

      if (wish) {
        commit(isLoggedIn ? wishlistdata : guestWishlist);
        return;
      }

      await fetchFromApi(`${apiUrl}/productmodel?operation=list`);
    })();

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    apiUrl,
    section,
    category,
    props.category,
    query,
    store,
    rent,
    wish,
    productdataonlydetail,
    productdata,
    newarrival,
    guestWishlist,
    wishlistdata,
  ]);

  return rawProducts;
};