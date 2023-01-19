import { useNavigate } from "react-router-dom";
import { formData } from "../../types/type";
import { useCallback } from "react";
import { baseAxios } from "../../util/axios";

function useLogin() {
  const navigate = useNavigate();
  const loginRequest = useCallback((Data: formData) => {
    baseAxios
      .post(`/users/login`, Data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((err) => {
        alert(err.response.data.details);
      });
  }, []);
  return { loginRequest };
}

export default useLogin;
