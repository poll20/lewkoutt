// === Pure data helpers — no React, no side effects ===
// Kept 100% behavior-identical to the original Card.jsx logic,
// just extracted so it can be unit-tested and reused anywhere.

/**
 * Normalizes whatever shape the API returns into a flat array of product objects.
 */
export const normalizeProductDetails = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;

  if (Array.isArray(data.products)) {
    const byDetails = data.products.flatMap((p) =>
      Array.isArray(p.productdetails) ? p.productdetails : Array.isArray(p) ? p : []
    );
    if (byDetails.length) return byDetails;
    return data.products;
  }

  if (Array.isArray(data.products?.productdetails)) return data.products.productdetails;
  if (Array.isArray(data.productdetails)) return data.productdetails;

  return [];
};

/**
 * Applies price / size / color / category filters plus sort options
 * to a raw product array. Pure function: same input -> same output.
 */
export const applyFiltersAndSort = ({
  items = [],
  filters = {},
  selectedSizes = {},
  sortOption = "",
  externalSortOption = "",
  newarrival = [],
  bestsellingIds = [],
}) => {
  if (!Array.isArray(items)) return [];
  let filtered = items; // no need to clone here — we only ever .filter/.sort into new arrays below

  const {
    pricerangemin = 0,
    pricerangemax = Infinity,
    sizes = [],
    color = [],
    categories = [],
    sortBy,
  } = filters || {};

  if (filters.pricerangemin || filters.pricerangemax) {
    filtered = filtered.filter(
      (p) =>
        typeof p.discountprice === "number" &&
        p.discountprice >= pricerangemin &&
        p.discountprice <= pricerangemax
    );
  }

  if (Array.isArray(sizes) && sizes.length > 0) {
    filtered = filtered.filter((product) =>
      product.colors?.some((c) => c.sizes?.some((s) => sizes.includes(s.size)))
    );
  }

  if (Array.isArray(color) && color.length > 0) {
    filtered = filtered.filter((p) => color.includes((p.defaultColor || "").toLowerCase()));
  }

  if (Array.isArray(categories) && categories.length > 0) {
    filtered = filtered.filter((p) => categories.includes(p.category));
  }

  const flatSelectedSizes = Object.values(selectedSizes).flat();
  if (flatSelectedSizes.length > 0) {
    filtered = filtered.filter((product) =>
      product.colors?.some((c) => c.sizes?.some((s) => flatSelectedSizes.includes(s.size)))
    );
  }

  const effectiveSort = externalSortOption || sortBy || sortOption;
  switch (effectiveSort) {
    case "Price: Low to High":
      filtered = [...filtered].sort((a, b) => (a.discountprice || 0) - (b.discountprice || 0));
      break;
    case "Price: High to Low":
      filtered = [...filtered].sort((a, b) => (b.discountprice || 0) - (a.discountprice || 0));
      break;
    case "New Arrival":
      if (Array.isArray(newarrival) && newarrival.length > 0) {
        const ids = new Set(newarrival.map((n) => n?.ProductId?.toString()));
        filtered = filtered.filter((p) => ids.has(p._id?.toString()));
      }
      break;
    case "Best Seller":
      if (Array.isArray(bestsellingIds) && bestsellingIds.length > 0) {
        const ids = new Set(bestsellingIds);
        filtered = filtered.filter((p) => ids.has(p._id?.toString()));
      }
      break;
    default:
      break;
  }

  return filtered;
};