import {signOut} from "firebase/auth";
import { auth } from "../components/firebase";

export const fetchWithAuth = async (url, options = {}) => {
  try {
    const res = await fetch(url, {
      ...options,
      credentials: "include",
    });

    if (res.status === 401) {
      console.warn("🚨 Session expired → force logout");

      // Firebase logout
      await signOut(auth);

      // clear local data
      localStorage.clear();

      // redirect
      // window.location.href = "/login";

      return null;
    }

    return res;
  } catch (err) {
    console.error("Fetch error:", err);
    throw err;
  }
};