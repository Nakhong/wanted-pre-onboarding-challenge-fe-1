import axios from "axios";

const baseAxios = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export { baseAxios };
