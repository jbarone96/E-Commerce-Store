import * as Route from "@/constants/routes";
import logo from "../../assets/logo.png";
import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  const visibleOnlyPath = [Route.HOME, Route.SHOP];

  return !visibleOnlyPath.includes(pathname) ? null : (
    <footer className="footer">
      <div className="footer-col-1">
        <strong>
          <span>
            Developed by{" "}
            <a href="https://www.github.com/jbarone96">Jordan Barone</a>
          </span>
        </strong>
      </div>
      <div className="footer-col-2">
        <img src={logo} alt="Footer Logo" className="footer-logo" />
        <h5>
          &copy;&nbsp;
          {new Date().getFullYear()}
        </h5>
      </div>
    </footer>
  );
};

export default Footer;
