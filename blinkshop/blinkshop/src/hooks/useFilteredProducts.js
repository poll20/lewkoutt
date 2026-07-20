
import { useMemo, useState } from "react";
import { useBio } from "../components/BioContext";
import { applyFiltersAndSort } from "../utils/productFilterSort";

/**
 * Owns the sort/size-panel UI state AND derives the final filtered+sorted
 * product list from rawProducts. Using useMemo instead of a second
 * useEffect+setState avoids an extra render pass on every filter change.
 */
export const useFilteredProducts = (rawProducts) => {
  const { filters, newarrival, bestsellingdata, sortOption } = useBio();

  const [selectedSizes, setSelectedSizes] = useState({ "Top Wear": [], "Bottom Wear": [] });
  const [showSortPanel, setShowSortPanel] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState("");

  const bestsellingIds = useMemo(
    () => (bestsellingdata || []).map((b) => b.productId?.toString()),
    [bestsellingdata]
  );

  const products = useMemo(
    () =>
      applyFiltersAndSort({
        items: rawProducts,
        filters,
        selectedSizes,
        sortOption: selectedSortOption,
        externalSortOption: sortOption,
        newarrival,
        bestsellingIds,
      }),
    [rawProducts, filters, selectedSizes, selectedSortOption, sortOption, newarrival, bestsellingIds]
  );

  // STABLE primitive key — used to decide when infinite-scroll should reset to page 1.
  // Do NOT use the `products` array itself as a reset key: a new array reference gets
  // created on nearly every render (context objects like `filters`/`newarrival` are
  // rarely referentially stable), which would reset pagination back to 4 on every
  // render and cause an infinite reset<->load loop. A string built from primitives
  // only changes when something that actually matters changes.
  const listKey = useMemo(
    () =>
      `${rawProducts.length}|${JSON.stringify(selectedSizes)}|${selectedSortOption}|${sortOption}|${JSON.stringify(
        filters
      )}`,
    [rawProducts.length, selectedSizes, selectedSortOption, sortOption, filters]
  );

  const handleSizeSelection = (category, size) => {
    setSelectedSizes((prev) => {
      const updated = { ...prev };
      const current = Array.isArray(updated[category]) ? updated[category] : [];
      updated[category] = current.includes(size)
        ? current.filter((s) => s !== size)
        : [...current, size];
      return updated;
    });
  };

  const handleSortSelection = (option) => setSelectedSortOption(option);
  const removeSortFilter = () => setSelectedSortOption("");

  return {
    products,
    listKey,
    selectedSizes,
    handleSizeSelection,
    showSortPanel,
    setShowSortPanel,
    selectedSortOption,
    handleSortSelection,
    removeSortFilter,
  };
};