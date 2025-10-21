// // src/analytics/ga4.js
// import ReactGA from "react-ga4";

// export const GA_MEASUREMENT_ID = "G-TKJCXLWJ3W"; // aapka GA4 ID

// // Initialize GA4
// export const initGA = () => {
//   ReactGA.initialize(GA_MEASUREMENT_ID);
//   console.log("GA4 Initialized");
// };

// // Track Pageview
// export const trackPageView = (path) => {
//   ReactGA.send({ hitType: "pageview", page: path });
// };

// // Track Event
// export const trackEvent = ({ category, action, label, value }) => {
//   ReactGA.event({ category, action, label, value });
// };

// // Set User Properties
// export const setUserProperties = ({ user_id, user_type, device_type }) => {
//   ReactGA.set({ user_id, user_type, device_type });
// };
// src/analytics/ga4.js
import ReactGA from "react-ga4";

export const GA_MEASUREMENT_ID = "G-TKJCXLWJ3W"; // 👈 your GA ID

export const initGA = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID);
  console.log("✅ Google Analytics 4 initialized");
};

// Track Page Views
export const trackPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

// Generic Event Tracker
export const trackEvent = ({ category, action, label, value }) => {
  ReactGA.event({ category, action, label, value });
};

// Ecommerce Events
export const trackAddToCart = (product) => {
  ReactGA.event("add_to_cart", {
    currency: "INR",
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        quantity: 1,
        category: product.category || "unknown",
      },
    ],
  });
};

export const trackViewItem = (product) => {
  ReactGA.event("view_item", {
    currency: "INR",
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        category: product.category || "unknown",
      },
    ],
  });
};

export const trackAddToWishlist = (product) => {
  ReactGA.event("add_to_wishlist", {
    currency: "INR",
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        category: product.category || "unknown",
      },
    ],
  });
};

export const trackBeginCheckout = (cartItems, total) => {
  ReactGA.event("begin_checkout", {
    currency: "INR",
    value: total,
    items: cartItems.map((p) => ({
      item_id: p.id,
      item_name: p.name,
      price: p.price,
      quantity: p.quantity,
    })),
  });
};

export const trackPurchase = (orderId, cartItems, total) => {
  ReactGA.event("purchase", {
    transaction_id: orderId,
    currency: "INR",
    value: total,
    items: cartItems.map((p) => ({
      item_id: p.id,
      item_name: p.name,
      price: p.price,
      quantity: p.quantity,
    })),
  });
};
