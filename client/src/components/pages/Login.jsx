import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import BackgroundImage from "../DryComponents/BackGroundImage";
import "react-toastify/dist/ReactToastify.css";

import "../MainContent/MergeStyles.css";
import "./Login.css";

const Login = () => {
  const [user, setLogin] = useState({
    email: "",
    password: "",
  });

  const { error, emptyFields, loading, Login } = useLogin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...user,
      [name]: value,
    });
  };

  const postLoginData = async () => {
    await Login(user);
  };

  return (
    <>
      <div
        style={{
          backgroundImage: BackgroundImage().image,
          backgroundPosition: BackgroundImage().position,
          backgroundSize: BackgroundImage().size,
        }}
        className="login sidebar-open default-styles"
      >
        <div className="dark-transparent">
          <div className="login-container">
            <h1>Log In</h1>
            <form
              method="POST"
              onSubmit={(e) => e.preventDefault()}
              className="login-form"
            >
              <input
                onChange={handleChange}
                value={user.email}
                type="text"
                name="email"
                placeholder="Email"
                className={emptyFields.includes("email") ? "empty-field" : ""}
              />
              <input
                onChange={handleChange}
                value={user.password}
                type="text"
                name="password"
                placeholder="Password"
                className={
                  emptyFields.includes("password") ? "empty-field" : ""
                }
              />

              <button onClick={postLoginData} type="submit">
                {loading ? "Logging In..." : "Log In"}
              </button>
            </form>
            {error && <div className="error">{error}</div>}
            <p>
              Not registered? <Link to="/register"> Create Account</Link>
            </p>
          </div>
        </div>
      </div>
      {/* <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} /> */}
    </>
  );
};

export default Login;
