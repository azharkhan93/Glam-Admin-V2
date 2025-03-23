import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://glam-admin-v2.vercel.app"
    : "http://localhost:3001"; // Change to your local API URL

export default axios.create({
  baseURL,
  // withCredentials: true,
});
