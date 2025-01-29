import { ADMIN_PRODUCTS } from "../../Constants/routes";
import React from "react";
import { NavLink } from "react-router-dom";

const SideNavigation = () => (
  <aside className="sidenavigation">
    <div className="sidenavigation-wrapper">
      <div className="sidenavigation-item">
        <NavLink
          activeClassname="sidenavigation-menu-active"
          className="sidenavgation-menu"
          to={ADMIN_PRODUCTS}
        >
          Products
        </NavLink>
      </div>
      <div className="sidenavigation-item">
        <h4 className="sidenavigation-menu my-0">users</h4>
      </div>
    </div>
  </aside>
);

export default SideNavigation;
