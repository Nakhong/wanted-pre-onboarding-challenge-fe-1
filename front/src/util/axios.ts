import axios from "axios";

const baseAxios = axios.create({
  baseURL:
    "https://port-0-wanted-pre-onboarding-challenge-be-1-luj2cldwuihed.sel3.cloudtype.app",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export { baseAxios };
