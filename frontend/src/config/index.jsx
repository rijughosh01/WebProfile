const { default: axios } = require("axios");

export const BASE_URL = "https://webprofile-backend-j7h6.onrender.com";

export const clientServer = axios.create({
  baseURL: BASE_URL,
});
