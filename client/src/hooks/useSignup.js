import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { genConfig } from "react-nice-avatar";
const useSignup = () => {
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  const config = genConfig();

  const signup = async (user) => {
    const { password, cPassword } = user;

    if (password !== cPassword) {
      return setError("Password not matched!");
    }
    setLoading(true);
    let response = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, config }),
    });
    let data = await response.json();
    setLoading(false);
    if (response.ok) {
      toast.success("Registered Successfully");
      setError(null);
      setEmptyFields([]);
      navigate("/login");
    } else if (!response.ok) {
      toast.error(data.error);
      data.emptyFields && setEmptyFields(data.emptyFields);
      setError(data.error);
    }
  };

  return { signup, error, emptyFields, loading };
};

export default useSignup;
