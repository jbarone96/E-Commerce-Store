import { ArrowLeftOutlined, CheckOutlined } from "@ant-design/icons";
import { CHECKOUT_2 } from "@/constants/routes";
import { useFormikContext } from "formik";
import { displayMoney } from "@/helpers/utility";
import PropType from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setPaymentDetails } from "@/redux/actions/checkoutActions";

const Total = ({ isInternational, subtotal }) => {
  const { values, submitForm } = useFormikContext();
  const history = useHistory();
  const dispatch = useDispatch();

  const onBackClick = () => {
    const { cardnumber, ccv, ...rest } = values;

    dispatch(setPaymentDetails({ ...rest }));
    history.push(CHECKOUT_2);
  };

  return (
    <>
      <div className="cart-total text-right">
        <p className="cart-total-title">Total:</p>
        <h2 className="cart-total-amount">
          {displayMoney(subtotal + (isInternational ? 50 : 0))}
        </h2>
      </div>
      <br />
      <div className="checkout-shipping-action">
        <button
          className="button button-muted"
          onClick={() => onBackClick(values)}
          type="button"
        >
          <ArrowLeftOutlined />
          &nbsp; Go Back
        </button>
        <button
          className="button"
          disabled={false}
          onClick={submitForm}
          type="button"
        >
          <CheckOutlined />
          &nbsp; Confirm
        </button>
      </div>
    </>
  );
};

Total.propTypes = {
  isInternational: PropType.bool.isRequired,
  subtotal: PropType.number.isRequired,
};

export default Total;
