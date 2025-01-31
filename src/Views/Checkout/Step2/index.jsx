import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Boundary } from "../../../Components/Common";
import { CHECKOUT_1, CHECKOUT_3 } from "../../../Constants/routes";
import { Form, Formik } from "formik";
import { useDocument, useScroll } from "../../../Hooks";
import PropType from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setShippingDetails } from "../../../Redux/Actions/checkoutActions";
import * as Yup from "yup";
import { StepTracker } from "../Components";
import withCheckout from "../Utility/withCheckout";
import ShippingForm from "./ShippingForm";
import ShippingTotal from "./ShippingTotal";

const FormSchema = Yup.object().shape({
  fullname: Yup.string()
    .required("Full name is required.")
    .min(2, "Full name must be at least 2 characters long.")
    .max(50, "Full name must be between 2 and 50 characters."),
  email: Yup.string()
    .email("Email is not valid.")
    .required("Email address is required."),
  address: Yup.string().required("Shipping address is required."),
  mobile: Yup.object()
    .shape({
      country: Yup.string(),
      countryCode: Yup.string(),
      dialCode: Yup.string().required("Mobile number is required."),
      value: Yup.string().required("Mobile number is required."),
    })
    .required("Mobile number is required."),
  isInternational: Yup.boolean(),
  isDone: Yup.boolean(),
});

const ShippingDetails = ({ profile, shipping, subtotal }) => {
  useDocument("Checkout Step 2 | Reactify");
  useScroll();
  const dispatch = useDispatch();
  const history = useHistory();

  const initFormikValues = {
    fullname: shipping.fullname || profile.fullname || "",
    email: shipping.email || profile.email || "",
    address: shipping.address || profile.address || "",
    mobile: shipping.mobile || profile.mobile || "",
    isInternational: shipping.isInternational || false,
    isDone: shipping.isDone || false,
  };

  const onSubmitForm = (form) => {
    dispatch(
      setShippingDetails({
        fullname: form.fullname,
        email: form.email,
        address: form.address,
        mobile: form.mobile,
        isInternational: form.isInternational,
        isDone: true,
      })
    );
    history.push(CHECKOUT_3);
  };

  return (
    <Boundary>
      <div className="checkout">
        <StepTracker current={2} />
        <div className="checkout-step-2">
          <h3 className="text-center">Shipping Details</h3>
          <Formik
            initialValues={initFormikValues}
            validateOnChange
            validationSchema={FormSchema}
            onSubmit={onSubmitForm}
          >
            {() => (
              <Form>
                <ShippingForm />
                <br />
                <ShippingTotal subtotal={subtotal} />
                <br />
                <div className="checkout-shipping-action">
                  <button
                    className="button button-muted"
                    onClick={() => history.push(CHECKOUT_1)}
                    type="button"
                  >
                    <ArrowLeftOutlined />
                    &nbsp; Go Back
                  </button>
                  <button className="button button-icon" type="submit">
                    Next Step &nbsp;
                    <ArrowRightOutlined />
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Boundary>
  );
};

ShippingDetails.propTypes = {
  subtotal: PropType.number.isRequired,
  profile: PropType.shape({
    fullname: PropType.string,
    email: PropType.string,
    address: PropType.string,
    mobile: PropType.object,
  }).isRequired,
  shipping: PropType.shape({
    fullname: PropType.string,
    email: PropType.string,
    address: PropType.string,
    mobile: PropType.object,
    isInternational: PropType.bool,
    isDone: PropType.bool,
  }).isRequired,
};

export default withRouter(ShippingDetails);
