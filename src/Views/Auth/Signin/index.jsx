import { ArrowRightOutlined, LoadingOutlined } from "@ant-design/icons";
import { SocialLogin } from "../../../Components/Common";
import { CustomInput } from "../../../Components/Custom";
import { FORGOT_PASSWORD, SIGNUP } from "../../../Constants/routes";
import { Field, Form, Formik } from "formik";
import { useDocument, useScroll } from "../../../Hooks";
import PropType from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signIn } from "../../../Redux/Actions/authActions";
import {
  setAuthenticating,
  setAuthStatus,
} from "../../../Redux/Actions/miscActions";
import * as Yup from "yup";

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email is not valid.")
    .required("Email is required."),
  password: Yup.string().required("Password is required."),
});

const SignIn = ({ history }) => {
  const { authStatus, isAuthenticating } = useSelector((state) => ({
    authStatus: state.app.authStatus,
    isAuthenticating: state.app.isAuthenticating,
  }));

  const dispatch = useDispatch();

  useScroll();
  useDocument("Sign In | Reactify");

  useEffect(() => {
    dispatch(setAuthStatus(null));
    dispatch(setAuthenticating(false));
  }, []);

  const onSignUp = () => history.push(SIGNUP);

  const onSubmitForm = (form) => {
    dispatch(signIn(form.email, form.password));
  };

  const onClickLink = (event) => {
    if (isAuthenticating) event.preventDefault();
  };

  return (
    <div>
      {authStatus?.success && (
        <div className="loader">
          <h3 className="toast-success auth-success">
            {authStatus.message}
            <LoadingOutlined />
          </h3>
        </div>
      )}
      {!authStatus?.success && (
        <>
          {authStatus?.message && (
            <h5 className="text-center toast-error">{authStatus?.message}</h5>
          )}
          <div
            className={`auth ${
              authStatus?.message && !authStatus?.success && "input-error"
            }`}
          >
            <div className="auth-main">
              <h3>Sign In to Reactify</h3>
              <br />
              <div className="auth-wrapper">
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validateOnChange
                  validationSchema={SignInSchema}
                  onSubmit={onSubmitForm}
                >
                  {() => (
                    <Form>
                      <div className="auth-field">
                        <Field
                          disabled={isAuthenticating}
                          name="email"
                          type="email"
                          label="Email"
                          placeholder="Enter Email Address"
                          component={CustomInput}
                        />
                      </div>
                      <div>
                        <Field
                          disabled={isAuthenticating}
                          name="password"
                          type="password"
                          label="Password"
                          placeholder="Enter Password"
                          component={CustomInput}
                        />
                      </div>
                      <br />
                      <div className="auth-field auth-action">
                        <Link
                          onClick={onClickLink}
                          style={{ textDecoration: "underline" }}
                          to={FORGOT_PASSWORD}
                        >
                          <span>Forgot Password?</span>
                        </Link>
                        <button
                          className="button auth-button"
                          disabled={isAuthenticating}
                          type="submit"
                        >
                          {isAuthenticating ? "Signing In" : "Sign In"}
                          &nbsp;
                          {isAuthenticating ? (
                            <LoadingOutlined />
                          ) : (
                            <ArrowRightOutlined />
                          )}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="auth-divider">
              <h6>Or</h6>
            </div>
            <SocialLogin isLoading={isAuthenticating} />
          </div>
          <div className="auth-message">
            <span className="auth-info">
              <strong>Don't have an account?</strong>
            </span>
            <button
              className="button button-small button-border button-border-gray button-icon"
              disabled={isAuthenticating}
              onClick={onSignUp}
              type="button"
            >
              Sign Up
            </button>
          </div>
        </>
      )}
    </div>
  );
};

SignIn.propTypes = {
  history: PropType.shape({
    push: PropType.func,
  }).isRequired,
};

export default SignIn;
