import { ArrowRightOutlined, LoadingOutlined } from "@ant-design/icons";
import { SocialLogin } from "../../../Components/Common";
import { CustomInput } from "../../../Components/Custom";
import { SIGNIN } from "../../../Constants/routes";
import { Field, Form, Formik } from "formik";
import { useDocument, useScroll } from "../../../Hooks";
import PropType from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../../Redux/Actions/authActions";
import {
  setAuthenticating,
  setAuthStatus,
} from "../../../Redux/Actions/miscActions";
import * as Yup from "yup";

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email is not valid.")
    .required("Email is required."),
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password length should be at least 8 characters.")
    .matches(
      /[A-Z\W]/g,
      "Password should contain at least one uppercase letter."
    ),
  fullname: Yup.string()
    .required("Full name is required.")
    .min(4, "Name should be at least 4 characters."),
});

const SignUp = ({ history }) => {
  const { authStatus, isAuthenticating } = useSelector((state) => ({
    authStatus: state.app.authStatus,
    isAuthenticating: state.app.isAuthenticating,
  }));

  const dispatch = useDispatch();

  useScroll();
  useDocument("Sign Up | Reactify");

  useEffect(() => {
    dispatch(setAuthStatus(null));
    dispatch(setAuthenticating(false));
  }, []);

  const onClickSignIn = () => history.push(SIGNIN);

  const onFormSubmit = (form) => {
    dispatch(
      signUp({
        fullname: form.fullname.trim(),
        email: form.email.trim().toLowercase(),
        password: form.password.trim,
      })
    );
  };

  return (
    <div className="auth-content">
      {authStatus?.success && (
        <div className="loader">
          <h3 className="toast-success auth-success">
            {authStatus?.message}
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
              <h3>Sign Up to Reactify</h3>
              <Formik
                initialValues={{ fullname: "", email: "", password: "" }}
                validateOnChange
                validationSchema={SignInSchema}
                onSubmit={onFormSubmit}
              >
                {() => (
                  <Form>
                    <div className="auth-field">
                      <Field
                        disabled
                        name="fullname"
                        type="text"
                        label="* Full Name"
                        placeholder="Enter Full Name"
                        style={{ textTransform: "capitalize" }}
                        component={CustomInput}
                      />
                    </div>
                    <div className="auth-field">
                      <Field
                        disabled
                        name="email"
                        type="email"
                        label="* Email"
                        placeholder="Enter Email Address"
                        style={{ textTransform: "capitalize" }}
                        component={CustomInput}
                      />
                    </div>
                    <div className="auth-field">
                      <Field
                        disabled
                        name="password"
                        type="password"
                        label="* Password"
                        placeholder="Enter Password"
                        style={{ textTransform: "capitalize" }}
                        component={CustomInput}
                      />
                    </div>
                    <br />
                    <div className="auth-field auth-action auth-action-signup">
                      <button
                        className="button auth-button"
                        disabled={isAuthenticating}
                        type="submit"
                      >
                        {isAuthenticating ? "Signing Up" : "Sign up"}
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
            <div className="auth-divider">
              <h6>Or</h6>
            </div>
            <SocialLogin isLoading={isAuthenticating} />
          </div>
          <div className="auth-message">
            <span className="auth-info">
              <strong>Already have an account?</strong>
            </span>
            <button
              className="button button-small button-border button-border-gray"
              disabled={isAuthenticating}
              onClick={onClickSignIn}
              type="button"
            >
              Sign In
            </button>
          </div>
        </>
      )}
    </div>
  );
};

SignUp.propTypes = {
  history: PropType.shape({
    push: PropType.func,
  }).isRequired,
};

export default SignUp;
