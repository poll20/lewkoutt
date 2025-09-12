// utils/slugify.js
export const slugify = (text = "") => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")        // space -> -
    .replace(/[^\w\-]+/g, "")    // special characters remove
    .replace(/\-\-+/g, "-");     // multiple dash -> single dash
};
