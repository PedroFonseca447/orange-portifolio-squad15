import axios from "axios";

const api = axios.create({
  baseURL: "https://orange-back-squad15.onrender.com/",
  headers: {
    "Content-type": "application/json",
  },
});

export { api };