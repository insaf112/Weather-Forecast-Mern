import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const useLogin = () => {
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [loading, setLoading] = useState(null);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const Login = async (user) => {
    setLoading(true);
    let response = await fetch(
      "/api/user/signin",
      {
        method: "POST",
        headers: {
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      },
      { withCredentials: true }
    );
    let data = await response.json();
    setLoading(false);

    if (response.ok) {
      toast.success("Login Successful");
      localStorage.setItem("User", JSON.stringify(data));
      // Update global USER state
      dispatch({ type: "USER_LOGIN", payload: data });
      setError(null);
      setEmptyFields([]);
      navigate("/favourites");
    }
    if (!response.ok) {
      toast.error(data.error);
      data.emptyFields && setEmptyFields(data.emptyFields);
      setError(data.error);
    }
  };

  return { Login, error, emptyFields, loading };
};

export default useLogin;
