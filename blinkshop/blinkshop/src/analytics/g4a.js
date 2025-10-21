
// import ReactGA from "react-ga4";

// export const GA_MEASUREMENT_ID = "G-TKJCXLWJ3W"; // 👈 your GA ID

// export const initGA = () => {
//   ReactGA.initialize(GA_MEASUREMENT_ID);
//   console.log("✅ Google Analytics 4 initialized");
// };

// // Track Page Views
// export const trackPageView = (path) => {
//   ReactGA.send({ hitType: "pageview", page: path });
// };

// // Generic Event Tracker
// export const trackEvent = ({ category, action, label, value }) => {
//   ReactGA.event({ category, action, label, value });
// };

// // Ecommerce Events
// export const trackAddToCart = (product) => {
//   ReactGA.event("add_to_cart", {
//     currency: "INR",
//     value: product.price,
//     items: [
//       {
//         item_id: product.id,
//         item_name: product.name,
//         price: product.price,
//         quantity: 1,
//         category: product.category || "unknown",
//       },
//     ],
//   });
// };

// export const trackViewItem = (product) => {
//   ReactGA.event("view_item", {
//     currency: "INR",
//     value: product.price,
//     items: [
//       {
//         item_id: product.id,
//         item_name: product.name,
//         price: product.price,
//         category: product.category || "unknown",
//       },
//     ],
//   });
// };

// export const trackAddToWishlist = (product) => {
//   ReactGA.event("add_to_wishlist", {
//     currency: "INR",
//     value: product.price,
//     items: [
//       {
//         item_id: product.id,
//         item_name: product.name,
//         price: product.price,
//         category: product.category || "unknown",
//       },
//     ],
//   });
// };

// export const trackBeginCheckout = (cartItems, total) => {
//   ReactGA.event("begin_checkout", {
//     currency: "INR",
//     value: total,
//     items: cartItems.map((p) => ({
//       item_id: p.id,
//       item_name: p.name,
//       price: p.price,
//       quantity: p.quantity,
//     })),
//   });
// };

// export const trackPurchase = (orderId, cartItems, total) => {
//   ReactGA.event("purchase", {
//     transaction_id: orderId,
//     currency: "INR",
//     value: total,
//     items: cartItems.map((p) => ({
//       item_id: p.id,
//       item_name: p.name,
//       price: p.price,
//       quantity: p.quantity,
//     })),
//   });
// };
// src/analytics/g4a.js
import ReactGA from "react-ga4";

export const GA_MEASUREMENT_ID = "G-TKJCXLWJ3W"; // ✅ your GA4 ID

export const initGA = () => {
  if (!GA_MEASUREMENT_ID) {
    console.error("❌ Missing GA_MEASUREMENT_ID");
    return;
  }
  ReactGA.initialize(GA_MEASUREMENT_ID);
  console.log("✅ Google Analytics 4 initialized");
};

// Track Page Views
export const trackPageView = (path) => {
  if (!path) return;
  ReactGA.send({ hitType: "pageview", page: path });
};

// Generic Event Tracker
export const trackEvent = ({ category, action, label, value }) => {
  ReactGA.event({ category, action, label, value });
};

// Product Viewed
export const trackViewItem = (product = {}) => {
  if (!product.id) return;
  ReactGA.event("view_item", {
    currency: "INR",
    value: product.price || 0,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        item_category: product.category || "unknown",
      },
    ],
  });
};

// Added to Cart
export const trackAddToCart = (product = {}) => {
  if (!product.id) return;
  ReactGA.event("add_to_cart", {
    currency: "INR",
    value: product.price || 0,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        quantity: product.quantity || 1,
        item_category: product.category || "unknown",
      },
    ],
  });
};

// Added to Wishlist
export const trackAddToWishlist = (product = {}) => {
  if (!product.id) return;
  ReactGA.event("add_to_wishlist", {
    currency: "INR",
    value: product.price || 0,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        item_category: product.category || "unknown",
      },
    ],
  });
};

// Begin Checkout
export const trackBeginCheckout = (cartItems = [], total = 0) => {
  if (!cartItems.length) return;
  ReactGA.event("begin_checkout", {
    currency: "INR",
    value: total,
    items: cartItems.map((p) => ({
      item_id: p.id,
      item_name: p.name,
      price: p.price,
      quantity: p.quantity,
      item_category: p.category || "unknown",
    })),
  });
};

// Successful Purchase
export const trackPurchase = (orderId, cartItems = [], total = 0) => {
  if (!cartItems.length || !orderId) return;
  ReactGA.event("purchase", {
    transaction_id: orderId,
    currency: "INR",
    value: total,
    items: cartItems.map((p) => ({
      item_id: p.id,
      item_name: p.name,
      price: p.price,
      quantity: p.quantity,
      item_category: p.category || "unknown",
    })),
  });
};
