import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN": {
      return { user: action.payload };
    }
    case "USER_LOGOUT": {
      return { user: null };
    }
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("User"));
    if (user) {
      dispatch({ type: "USER_LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
