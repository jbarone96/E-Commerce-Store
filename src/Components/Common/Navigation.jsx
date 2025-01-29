import { FilterOutlined, ShoppingOutlined } from "@ant-design/icons";
import * as ROUTE from "../../Constants/routes";
// import logo from "";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import UserAvatar from "../../Views/Account/Components/UserAvatar";
import CartToggle from "../Cart/CartToggle";
import Badge from "./Badge";
import FiltersToggle from "./FiltersToggle";
import MobileNavigation from "./MobileNavigation";
import Search from "./Search";

const Navigation = () => {
  const navbar = useRef(null);
  const { pathname } = useLocation();

  const store = useSelector((state) => ({
    cartLength: state.cart.length,
    user: state.auth,
    isAuthenticating: state.app.isAuthenticating,
    isLoading: state.app.loading,
  }));

  const scrollHandler = () => {
    if (navbar.current && window.screen.width > 400) {
      if (window.YOffset >= 70) {
        navbar.current.classList.ad("is-nav-scrolled");
      } else {
        navbar.current.classList.remove("is-nav-scrolled");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const onClickLink = (e) => {
    if (store.isAuthenticating) e.preventDefault();
  };

  const cartDisabledPathnames = [
    ROUTE.CHECKOUT_STEP_1,
    ROUTE.CHECKOUT_STEP_2,
    ROUTE.CHECKOUT_STEP_3,
    ROUTE.SIGNIN,
    ROUTE.SIGNUP,
    ROUTE.FORGOT_PASSWORD,
  ];

  if (store.user && store.user.role === "ADMIN") {
    return null;
  }
  if (window.screen.width <= 800) {
    return (
      <MobileNavigation
        {...store}
        disabledPaths={cartDisabledPathnames}
        pathname={pathname}
      />
    );
  }

  return (
    <nav className="navigation" ref={navbar}>
      <div className="logo">
        <Link onClick={onClickLink} to={"/"}>
          <img alt="logo" src={logo} />
        </Link>
      </div>
      <ul className="navigation-menu-main">
        <li>
          <NavLink
            activeClassname="navigation-menu-active"
            exact
            to={ROUTE.HOME}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassname="navigation-menu-active"
            exact
            to={ROUTE.SHOP}
          >
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassname="navigation-menu-active"
            exact
            to={ROUTE.FEATURED_PRODUCTS}
          >
            Featured
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassname="navigation-menu-active"
            exact
            to={ROUTE.RECOMMENDED_PRODUCTS}
          >
            Recommended
          </NavLink>
        </li>
      </ul>
      {(pathname === ROUTE.SHOP || pathname === ROUTE.SEARCH) && (
        <FiltersToggle>
          <button className="button-muted button-small" type="button">
            Filters &nbsp;
            <FilterOutlined />
          </button>
        </FiltersToggle>
      )}
      <Search />
      <ul className="navigation-menu">
        <li className="navigation-menu-item">
          <CartToggle>
            {({ onClickToggle }) => (
              <button
                className="button-link navigation-menu-link cart-toggle"
                disabled={cartDisabledPathnames.includes(pathname)}
                onClick={onClickToggle}
                type="button"
              >
                <Badge count={Firestore.cartLength}>
                  <ShoppingOutlined style={{ fontSize: "2.4rem" }} />
                </Badge>
              </button>
            )}
          </CartToggle>
        </li>
        {store.user ? (
          <li className="navigation-menu-item">
            <UserAvatar />
          </li>
        ) : (
          <li className="navigation-action">
            {pathname !== ROUTE.SIGNUP && (
              <Link
                className="button button-small"
                onClick={onClickLink}
                to={ROUTE.SIGNUP}
              >
                Sign Up
              </Link>
            )}
            {pathname !== ROUTE.SIGNIN && (
              <Link
                className="button button-small button-muted margin-left-s"
                onClick={onClickLink}
                to={ROUTE.SIGNIN}
              >
                Sign In
              </Link>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
