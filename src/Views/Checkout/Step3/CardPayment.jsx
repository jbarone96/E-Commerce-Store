import { CustomInput } from "../../../Components/Custom";
import { Field, useFormikContext } from "formik";
import React, { useEffect, useRef } from "react";

const CardPayment = () => {
  const { values, setValues } = useFormikContext();
  const collapseContainerRef = useRef(null);
  const cardInputRef = useRef(null);
  const containerRef = useRef(null);
  const checkboxContainerRef = useRef(null);

  const toggleCollapse = () => {
    const cont = containerRef.current;
    const check = checkboxContainerRef.current;
    const coll = collapseContainerRef.current;

    if (check && cont && coll) {
      if (values.type === "credit") {
        cardInputRef.current.focus();
        cont.style.height = `${check.offsetHeight + coll.offsetHeight}px`;
      } else {
        cardInputRef.current.blur();
        cont.style.height = `${check.offsetHeight}px`;
      }
    }
  };

  useEffect(() => {
    toggleCollapse();
  }, [values.type]);

  const onCreditModeChange = (event) => {
    if (event.target.checked) {
      setValues({ ...values, type: "credit" });
      toggleCollapse();
    }
  };

  const handleNumberInput = (event) => {
    const { key } = event.nativeEvent;
    if (/\D/.test(key) && key !== "Backspace") {
      event.preventDefault();
    }
  };

  return (
    <>
      <h3 className="text-center">Payment</h3>
      <br />
      <span>Payment Option</span>
      <div
        ref={containerRef}
        className={`checkout-fieldset-collapse ${
          values.type === "credit" ? "is-selected-payment" : ""
        }`}
      >
        <div className="checkout-field margin-0">
          <div className="checkout-checkbox-field" ref={checkboxContainerRef}>
            <input
              type="radio"
              name="type"
              id="modeCredit"
              checked={values.type === "credit"}
              onChange={onCreditModeChange}
            />
            <label htmlFor="modeCredit" className="d-flex w-100">
              <div className="d-flex-grow-1 margin-left-s">
                <h4 className="margin-0">Credit Card</h4>
                <span className="text-subtle d-block margin-top-s">
                  Pay with Visa, MasterCard, or other credit/debit card.
                </span>
              </div>
              <div className="d-flex">
                <div className="payment-img payment-img-visa" />
                &nbsp;
                <div className="payment-img payment-img-mastercard" />
              </div>
            </label>
          </div>
        </div>
        <div className="checkout-collapse-sub" ref={collapseContainerRef}>
          <span className="d-block padding-s text-center">Accepted Cards</span>
          <div className="checkout-cards-accepted d-flex-container">
            <div className="payment-img payment-img-visa" title="Visa" />
            <div
              className="payment-img payment-img-express"
              title="American Express"
            />
            <div
              className="payment-img payment-img-mastercard"
              title="MasterCard"
            />
            <div
              className="payment-img payment-img-discover"
              title="Discover"
            />
          </div>
          <br />
          <div className="checkout-field margin-0">
            <div className="checkout-fieldset">
              <div className="checkout-field">
                <Field
                  name="name"
                  type="text"
                  label="* Name on Card"
                  placeholder="Enter Your Name"
                  component={CustomInput}
                  style={{ textTransform: "capitalize" }}
                  inputRef={cardInputRef}
                />
              </div>
              <div className="checkout-field">
                <Field
                  name="cardnumber"
                  type="text"
                  maxLength={19}
                  onKeyDown={handleNumberInput}
                  label="* Card Number"
                  placeholder="Enter Card Number"
                  component={CustomInput}
                />
              </div>
            </div>
            <div className="checkout-fieldset">
              <div className="checkout-field">
                <Field
                  name="expiry"
                  type="date"
                  label="* Expiration Date"
                  placeholder="Enter Expiration Date"
                  component={CustomInput}
                />
              </div>
              <div className="checkout-field">
                <Field
                  name="ccv"
                  type="text"
                  maxLength={4}
                  onKeyDown={handleNumberInput}
                  label="* CCV"
                  placeholder="***"
                  component={CustomInput}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardPayment;
