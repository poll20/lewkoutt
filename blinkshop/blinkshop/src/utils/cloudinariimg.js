// src/utils/cloudinary.js
// export const cloudinaryImg = (url, width = 600) =>
//   url?.replace(
//     "/image/upload/",
//     `/image/upload/f_auto,q_auto,c_fill,w_${width}/`
//   );
// utils/imagekitImg.js

// src/utils/imagekitImg.js

const IMAGEKIT_ENDPOINT = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

export const cloudinaryImg = (
  url,
  width = 600,
  quality = 90
) => {
  if (!url) return "";

  if (!url.startsWith(IMAGEKIT_ENDPOINT)) {
    return url;
  }

  const path = url.replace(IMAGEKIT_ENDPOINT, "");

  return `${IMAGEKIT_ENDPOINT}/tr:w-${width},q-${quality},f-auto${path}`;
};