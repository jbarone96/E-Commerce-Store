import { CHECKOUT_1 } from "../../../Constants/routes";
import { Form, Formik, isInteger } from "formik";
import { displayActionMessage } from "../../../Helpers/utility";
import { useDocumentTitle, useScrollTop } from "../../../Hooks";
import PropType from "prop-types";
import React from "react";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import { StepTracker } from "../Components";
import withCheckout from "../Utility/withCheckout";
import CardPayment from "./CardPayment";
import PayPalPayment from "./PayPalPayment";
import Total from "./Total";
import { Card } from "antd";

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Name should be at least 4 characters.")
    .required("Name is required."),
  cardnumber: Yup.string()
    .min(13, "Card number should be at least 13 digits.")
    .max(18, "Card number should not be longer than 18 digits.")
    .required("Card number is required."),
  expiration: Yup.date().required("Card expiration date is required."),
  ccv: Yup.string()
    .min(3, "Card CCV should be at least 3 digits.")
    .max(4, "Card CCV should not be longer than 4 digits.")
    .required("Card CCV is required."),
  type: Yup.string().required("Please select a payment method."),
});

const Payment = ({ shipping, payment, subtotal }) => {
  useDocumentTitle("Checkout Step 3 | Reactify");
  useScrollTop();

  const initFormikValues = {
    name: payment.name || "",
    cardnumber: payment.cardnumber || "",
    expiration: payment.expiration || "",
    ccv: payment.ccv || "",
    type: payment.type || "paypal",
  };

  const onConfirm = () => {
    displayActionMessage("Feature not ready yet ☺", "info");
  };

  if (!shipping || !shipping.isDone) {
    return <Redirect to={CHECKOUT_1} />;
  }

  return (
    <div className="checkout">
      <StepTracker current={3} />
      <Formik
        initialValues={initFormikValues}
        validateOnChange
        validationSchema={FormSchema}
        validate={(form) => {
          if (form.type === "paypal") {
            displayActionMessage("Feature not ready yet ☺", "info");
          }
        }}
        onSubmit={onConfirm}
      >
        {() => (
          <Form className="checkout-step-3">
            <CardPayment />
            <PayPalPayment />
            <Total
              isInternational={shipping.isInternational}
              subtotal={subtotal}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

Payment.propTypes = {
  shipping: PropType.shape({
    isDone: PropType.bool,
    isInternational: PropType.bool,
  }).isRequired,
  payment: PropType.shape({
    name: PropType.string,
    cardnumber: PropType.string,
    expiration: PropType.string,
    ccv: PropType.string,
    type: PropType.string,
  }).isRequired,
  subtotal: PropType.number.isRequired,
};

export default withCheckout(Payment);
