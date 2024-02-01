import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login as loginRequest } from "../../api/api.js";
import toast from "react-hot-toast";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    const response = await loginRequest({ email, password });
    setIsLoading(false);

    if (response.error) {
      return toast.error(
        response.exception?.response?.data ||
          "Error occured while login in. Please try again."
      );
    }

    const { userDetails } = response.data;

    localStorage.setItem("user", JSON.stringify(userDetails));

    navigate("/channels");
  };

  return { login, isLoading };
};
