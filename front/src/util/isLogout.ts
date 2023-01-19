import { useNavigate } from "react-router-dom";

export const HandleLogout = () => {
  const nav = useNavigate();
  localStorage.clear();
  nav("/auth/login");
};
