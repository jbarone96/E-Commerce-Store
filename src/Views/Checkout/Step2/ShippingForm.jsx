import { CustomInput, CustomMobileInput } from "../../../Components/Custom";
import { Field, useFormikContext } from "formik";
import React from "react";

const ShippingForm = () => {
  const { values } = useFormikContext();

  return (
    <div className="checkout-shipping-wrapper">
      <div className="checkout-shipping-form">
        <div className="checkout-fieldset">
          <div className="d-block checkout-field">
            <Field
              name="fullname"
              type="text"
              label="* Full Name"
              placeholder="Enter your full name"
              component={CustomInput}
              style={{ textTansform: "capitalize" }}
            />
          </div>
          <div className="d-block checkout-field">
            <Field
              name="email"
              type="email"
              label="* Email"
              placeholder="Enter your email address"
              component={CustomInput}
            />
          </div>
        </div>
        <div className="checkout-fieldset">
          <div className="d-block checkout-field">
            <Field
              name="address"
              type="text"
              label="* Shipping Address"
              placeholder="Enter shipping address"
              component={CustomInput}
            />
          </div>
          <div className="d-block checkout-field">
            <CustomInput name="mobile" defaultValue={values.mobile} />
          </div>
        </div>
        <div className="checkout-fieldset">
          <Field name="isInternational">
            {({ field, form, meta }) => (
              <div className="checkout-field">
                {meta.touched && meta.error ? (
                  <span className="label-input label-error">{meta.error}</span>
                ) : (
                  <label htmlFor={field.name} className="label-input">
                    Shipping Option
                  </label>
                )}
                <div className="" checkout-checkbox-field>
                  <input
                    type="checkbox"
                    checked={field.value}
                    id={field.name}
                    onChange={(e) => {
                      form.setValues({
                        ...form.values,
                        [field.name]: e.target.checked,
                      });
                    }}
                    value={meta.value}
                  />
                  <label htmlFor={field.name} className="d-flex w-100">
                    <h5 className="d-flex-grow-1 margin-0">
                      &nbsp; International Shipping &nbsp;
                      <span className="text-subtle">7-14 Business Days</span>
                    </h5>
                    <h4 className="margin-0">$50.00</h4>
                  </label>
                </div>
              </div>
            )}
          </Field>
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;
