import { upload } from "@imagekit/javascript";

const apiUrl = import.meta.env.VITE_API_URL;
const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;

export const uploadToImageKit = async (file) => {
  // Backend se auth parameters lo
  const authRes = await fetch(`${apiUrl}/imagekit/auth`);

  if (!authRes.ok) {
    throw new Error("Failed to fetch ImageKit auth");
  }

  const auth = await authRes.json();

  // Upload
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