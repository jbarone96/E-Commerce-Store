import { CheckOutlined, LoadingOutlined } from "@ant-design/icons";
import { useDidMount, useDocument, useScroll } from "../../../Hooks";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../../Redux/Actions/authActions";

const ForgotPassword = () => {
  const { authStatus, isAuthenticating } = useSelector((state) => ({
    authState: state.app.authStatus,
    isAuthenticating: state.app.isAuthenticating,
  }));
  const dispatch = useDispatch();
  const didMount = useDidMount();
  const [forgotPwStatus, setForgotPwStatus] = useState({});
  const [isSendingForgotPwRequest, setIsSendingForgotPwRequest] =
    useState(false);
  const [field, setField] = useState({});

  useScroll();
  useDocument("Forgot Password | Reactify");
  useEffect(() => {
    if (didMount) {
      setForgotPwStatus(authStatus);
      setIsSendingForgotPwRequest(isAuthenticating);
    }
  }, [authStatus, isAuthenticating]);

  const onEmailChange = (value, error) => {
    setField({ email: value, error });
  };

  const onSubmitEmail = () => {
    if (!!field.email && !field.error) {
      dispatch(resetPassword(field.email));
    }
  };

  return (
    <div className="forgot-password">
      {forgotPwStatus?.message && (
        <h5
          className={`text-center ${
            authStatus?.success ? "toast-success" : "toast-error"
          }`}
        >
          {authStatus.message}
        </h5>
      )}
      <h2>Forgot Password?</h2>
      <p>
        Enter your email address and we will send you an email to reset your
        password.
      </p>
      <br />
      <input
        type="email"
        field="email"
        required
        className="input-form"
        label="* Email"
        maxLength={40}
        onChange={onEmailChange}
        placeholder="Enter your email"
        readOnly={isSendingForgotPwRequest || authStatus?.success}
        style={{ width: "100%" }}
      />
      <br />
      <br />
      <button
        className="button w-100-mobile"
        disabled={isSendingForgotPwRequest || authStatus?.success}
        onClick={onSubmitEmail}
        type="button"
      >
        {isSendingForgotPwRequest ? <LoadingOutlined /> : <CheckOutlined />}
        &nbsp;
        {isSendingForgotPwRequest
          ? "Sending Password Reset Email"
          : "Send Password Reset Email"}
      </button>
    </div>
  );
};

export default ForgotPassword;
