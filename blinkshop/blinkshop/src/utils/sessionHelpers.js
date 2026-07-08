import { signOut } from "firebase/auth";
import { auth } from "../components/firebase";

/**
 * fetchWithAuth — wraps fetch() with two layers of auth:
 *  1. Firebase Bearer token  → works in Safari / in-app browsers (no cookie ITP issues)
 *  2. credentials: "include" → session cookie for normal browsers as a backup
 *
 * Safari's ITP blocks cross-origin cookies, causing 401s that log users out.
 * Sending the Firebase ID token as a Bearer header bypasses ITP entirely.
 */
export const fetchWithAuth = async (url, options = {}) => {
  try {
    // Build auth headers: add Firebase token if a user is signed in
    let authHeaders = {};
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        const token = await currentUser.getIdToken(false); // false = use cached token
        authHeaders["Authorization"] = `Bearer ${token}`;
      } catch (tokenErr) {
        console.warn("⚠️ Could not get Firebase token:", tokenErr.message);
      }
    }

    const res = await fetch(url, {
      ...options,
      credentials: "include", // keep cookie for non-ITP browsers
      headers: {
        ...(options.headers || {}),
        ...authHeaders, // Bearer token wins on Safari
      },
    });

    if (res.status === 401) {
      console.warn("🚨 Session expired → force logout");

      // Firebase logout
      await signOut(auth);

      // clear local data
      localStorage.clear();

      return null;
    }

    return res;
  } catch (err) {
    console.error("Fetch error:", err);
    throw err;
  }
};