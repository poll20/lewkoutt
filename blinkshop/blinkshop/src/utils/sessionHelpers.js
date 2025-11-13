// src/utils/sessionHelpers.js
import { getAuth } from "firebase/auth";

export const refreshSession = async () => {
  try {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.warn("⚠️ No user logged in for refresh");
      return false;
    }

    // Force refresh Firebase ID Token
    const idToken = await currentUser.getIdToken(true);

    // Send to backend to generate new session cookie
    const response = await fetch("https://your-backend-url.com/user/refresh-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) throw new Error("Session refresh failed");

    console.log("✅ Session refreshed successfully");
    return true;
  } catch (err) {
    console.error("❌ Session refresh error:", err);
    return false;
  }
};

export const fetchWithRefresh = async (url, options = {}) => {
  try {
    const res = await fetch(url, { ...options, credentials: "include" });

    // If unauthorized → refresh session and retry once
    if (res.status === 401) {
      console.warn("⚠️ Session expired, trying to refresh...");
      const refreshed = await refreshSession();
      if (refreshed) {
        const retryRes = await fetch(url, { ...options, credentials: "include" });
        return retryRes;
      }
    }

    return res;
  } catch (err) {
    console.error("❌ fetchWithRefresh error:", err);
    throw err;
  }
};
