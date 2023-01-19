import { useNavigate } from "react-router-dom";
import { formData } from "../../types/type";
import { useCallback } from "react";
import { baseAxios } from "../../api";

const useRegister = () => {
  const navigate = useNavigate();

  const registerRequest = useCallback((Data: formData) => {
    baseAxios
      .post(`/users/create`, Data)
      .then((res) => {
        alert(res.data.message);
        navigate("/auth/login");
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.details);
      });
  }, []);
  return { registerRequest };
};

export default useRegister;
