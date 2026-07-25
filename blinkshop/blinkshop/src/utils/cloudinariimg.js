// src/utils/cloudinary.js
// export const cloudinaryImg = (url, width = 600) =>
//   url?.replace(
//     "/image/upload/",
//     `/image/upload/f_auto,q_auto,c_fill,w_${width}/`
//   );
// utils/imagekitImg.js

// src/utils/imagekitImg.js

// const IMAGEKIT_ENDPOINT = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

// export const cloudinaryImg = (
//   url,
//   width = 600,
//   quality = 90
// ) => {
//   if (!url) return "";

//   if (!url.startsWith(IMAGEKIT_ENDPOINT)) {
//     return url;
//   }

//   const path = url.replace(IMAGEKIT_ENDPOINT, "");

//   return `${IMAGEKIT_ENDPOINT}/tr:w-${width},q-${quality},f-auto${path}`;
// };

const R2 = "https://pub-61c1bf72aa674febb880a563288fc1ba.r2.dev";
const CDN = "https://cdn.lewkout.com";

export const cloudinaryImg = (
  url,
  width = 600,
  quality = 85
) => {
  if (!url) return "";

  // R2 -> Custom domain
  url = url.replace(R2, CDN);

  if (!url.startsWith(CDN)) {
    return url;
  }

  return `${CDN}/cdn-cgi/image/width=${width},quality=${quality},format=auto${url.replace(
    CDN,
    ""
  )}`;
};