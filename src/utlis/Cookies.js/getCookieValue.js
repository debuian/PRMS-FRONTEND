// src/utils/Cookies.js
const getCookieValue = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};

export default getCookieValue;