import { ADMIN_DASHBOARD, SIGNIN, SIGNUP } from "../Constants/routes";
import PropType from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PublicRoute = ({ isAuth, role, component: Component, path, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const { from } = props.location.state || { from: { pathname: "/" } };

      if (isAuth && role === "ADMIN") {
        return <Redirect to={ADMIN_DASHBOARD} />;
      }

      if (isAuth && role === "USER" && (path === SIGNIN || path === SIGNUP)) {
        return <Redirect to={from} />;
      }

      return (
        <main className="content">
          <Component {...props} />
        </main>
      );
    }}
  />
);

PublicRoute.defaultProps = {
  isAuth: false,
  role: "USER",
  path: "/",
};

PublicRoute.propTypes = {
  isAuth: PropType.bool,
  role: PropType.string,
  component: PropType.func.isRequired,
  path: PropType.string,
  rest: PropType.any,
};

const mapPropsToState = ({ auth }) => ({
  isAuth: !!auth,
  role: auth?.role || "",
});

export default connect(mapPropsToState)(PublicRoute);
