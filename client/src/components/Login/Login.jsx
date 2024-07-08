import React, { useState, useEffect, useContext } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import { storeContext } from "../../Context/storeContext";
import axios from "axios";
import toast from "react-hot-toast";
const Login = ({ setShowlogin }) => {
  const { url, token, setToken } = useContext(storeContext);
  const [currState, setCurrstate] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    // const name = e.target.name;
    // const value = e.target.value;
    // setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/signup";
    }
    const response = await axios.post(newUrl,data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Ensure credentials are included
    });

    if (response.data.success) {
      toast.success("Login successfull");
      setToken(response.data.token);
      localStorage.setItem("token:", response.data.token);
      setShowlogin(false);
    } else {
      alert(response.data.message);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="login-popup">
      <form action="" onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowlogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-input">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              placeholder="Your name"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          )}
          <input
            type="text"
            placeholder="Your email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrstate("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrstate("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
