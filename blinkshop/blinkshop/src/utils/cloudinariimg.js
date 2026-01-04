// src/utils/cloudinary.js
export const cloudinaryImg = (url, width = 600) =>
  url?.replace(
    "/image/upload/",
    `/image/upload/f_auto,q_auto,w_${width}/`
  );
