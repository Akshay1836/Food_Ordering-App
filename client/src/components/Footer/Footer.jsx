import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo1} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
            doloribus ducimus omnis laudantium iusto aspernatur voluptas tempore
            inventore dolorem rerum in quaerat nam saepe expedita reprehenderit,
            nostrum repellendus dicta quibusdam.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>

        <div className="footer-content-right">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy-policy</li>
          </ul>
        </div>

        <div className="footer-content-center">
          <h2>Get in touch</h2>
          <ul>
            <li>+91 73783792</li>
            <li>hotemmain@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr />
      <p className="footer-copy-right">
        copyright {new Date().getFullYear()} Hotel.com.All rights reserved
      </p>
    </div>
  );
};

export default Footer;
