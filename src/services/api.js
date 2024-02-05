import axios from "axios";

const api = axios.create({
  baseURL: "https://orangeportifolio-back-squad15.vercel.app/",
  headers: {
    "Content-type": "application/json",
  },
});

export { api };