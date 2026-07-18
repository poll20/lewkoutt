// import { upload } from "@imagekit/javascript";

// const apiUrl = import.meta.env.VITE_API_URL;
// const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;

// export const uploadToImageKit = async (file) => {
//   // Backend se auth parameters lo
//   console.log("Uploading:", file.name);
//   const authRes = await fetch(`${apiUrl}/imagekit/auth`);

//   if (!authRes.ok) {
//     throw new Error("Failed to fetch ImageKit auth");
//   }

//   const auth = await authRes.json();
//   console.log("Token:", auth.token);

//   // Upload
//   const result = await upload({
//     file,
//     fileName: file.name,
//     publicKey,
//     token: auth.token,
//     signature: auth.signature,
//     expire: auth.expire,
//   });

//   return result.url;
// };

import { upload } from "@imagekit/javascript";

const apiUrl = import.meta.env.VITE_API_URL;
const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;

export const uploadToImageKit = async (file) => {
  // 🔑 FIX: cache: "no-store" + no-cache header stop the browser from
  // returning a cached (already-used) auth token when this function
  // is called back-to-back for multiple files.
  const authRes = await fetch(`${apiUrl}/imagekit/auth`, {
    cache: "no-store",
    headers: { "Cache-Control": "no-cache" },
  });

  if (!authRes.ok) {
    throw new Error("Failed to fetch ImageKit auth");
  }

  const auth = await authRes.json();

  const result = await upload({
    file,
    fileName: file.name,
    publicKey,
    token: auth.token,
    signature: auth.signature,
    expire: auth.expire,
  });

  return result.url;
};