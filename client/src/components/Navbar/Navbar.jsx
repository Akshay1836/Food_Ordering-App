import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { storeContext } from "../../Context/storeContext";
const Navbar = ({ setShowlogin }) => {
  const [menu, setMenu] = useState("Home");
  const { getTotalAmount, token, setToken } = useContext(storeContext);
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem("token:");
    setToken("");
    navigate("/")
  }
  return (
    <div className="navbar">
      <Link to="/">
        {" "}
        <img src={assets.logo1} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          className={menu === "Home" ? "active" : ""}
          onClick={() => setMenu("Home")}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          className={menu === "Menu" ? "active" : ""}
          onClick={() => setMenu("Menu")}
        >
          Menu
        </a>
        <a
          href="#app-download"
          className={menu === "Mobile-app" ? "active" : ""}
          onClick={() => setMenu("Mobile-app")}
        >
          Mobile-app
        </a>
        <a
          href="#footer"
          className={menu === "Contact-us" ? "active" : ""}
          onClick={() => setMenu("Contact-us")}
        >
          Contact us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            {" "}
            <img src={assets.basket_icon} alt="" />
          </Link>
          {getTotalAmount() > 0 && <div className="dot"></div>}
        </div>
        {!token ? (
          <button onClick={() => setShowlogin(true)}>Sign in </button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li><img src={assets.bag_icon} alt="" className="w-6 h-6"/> <p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" className="w-6 h-6" /> <p>Logout</p></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
