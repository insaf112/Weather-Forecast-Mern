import React, { useState } from "react";
import "../MainContent/MergeStyles.css";
import "./Register.css";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
import BackgroundImage from "../DryComponents/BackGroundImage";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const { signup, error, emptyFields, loading } = useSignup();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const registerUser = async () => {
    await signup(user);
  };

  return (
    <>
      <div
        style={{
          backgroundImage: BackgroundImage().image,
          backgroundPosition: BackgroundImage().position,
          backgroundSize: BackgroundImage().size,
        }}
        className="register sidebar-open default-styles"
      >
        <div className="dark-transparent">
          <div className="register-container">
            <h1>Register</h1>
            <form
              method="POST"
              onSubmit={(e) => e.preventDefault()}
              className="register-form"
            >
              <input
                type="text"
                onChange={handleChange}
                value={user.name}
                name="name"
                placeholder="Name"
                className={emptyFields.includes("name") ? "empty-input" : ""}
              />
              <input
                type="text"
                onChange={handleChange}
                value={user.email}
                name="email"
                placeholder="Email"
                className={emptyFields.includes("email") ? "empty-input" : ""}
              />
              <input
                type="text"
                onChange={handleChange}
                value={user.password}
                name="password"
                placeholder="Password"
                className={
                  emptyFields.includes("password") ? "empty-input" : ""
                }
              />
              <input
                onChange={handleChange}
                value={user.cPassword}
                type="text"
                name="cPassword"
                placeholder="Confirm Password"
                className={
                  emptyFields.includes("password") ? "empty-input" : ""
                }
              />
              <button type="submit" onClick={registerUser}>
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
            {error && <div className="error">{error}</div>}
            <p>
              Already registered?
              <Link to="/login"> Login Here</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
