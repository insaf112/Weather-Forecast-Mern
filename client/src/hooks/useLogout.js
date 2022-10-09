import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FavouriteContext } from "../context/FavouriteContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useLogout = () => {
  const { dispatch } = useContext(AuthContext);
  const { dispatch: favouriteDispatch } = useContext(FavouriteContext);
  const navigate = useNavigate();

  const Logout = async () => {
    let response = await fetch("/api/user/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.status === 200) {
      toast.info("Logged out");
      localStorage.removeItem("User");
      // Update Global USER state
      dispatch({ type: "USER_LOGOUT" });
      favouriteDispatch({ type: "GET_FAVOURITE", payload: null });
      navigate("/");
      localStorage.removeItem("Cities");
    } else {
      toast.error("Error. Try Again");
    }
  };

  return { Logout };
};

export default useLogout;
