import { useField } from "formik";
import PropType from "prop-types";
import React from "react";
import PhoneInput from "react-phone-input-2";

const CustomMobileInput = (props) => {
  const [field, meta, helpers] = useField(props);
  const { label, placeholder, defaultValue } = props;
  const { touched, error } = meta;
  const { setValue } = helpers;

  const handleChange = (value, data) => {
    const mobile = {
      dialCode: data.dialCode,
      countryCode: data.countryCode,
      country: data.name,
      value,
    };

    setValue(mobile);
  };

  return (
    <div className="input-group">
      {touched && error ? (
        <span className="label-input label-error">
          {error?.value || error?.dialCode}
        </span>
      ) : (
        <label className="label-input" htmlFor={field.name}>
          {label}
        </label>
      )}
      <PhoneInput
        name={field.name}
        country="ph"
        inputClass="input-form d-block"
        style={{
          border: touched && error ? "1px solid red" : "1px solid #CACACA",
        }}
        inputExtraProps={{ required: true }}
        onChange={handleChange}
        placeholder={placeholder}
        value={defaultValue.value}
      />
    </div>
  );
};

CustomMobileInput.defaultProps = {
  label: "Mobile Number",
  placeholder: "(123) 555-7890",
};

CustomMobileInput.propTypes = {
  label: PropType.string,
  placeholder: PropType.string,
  defaultValue: PropType.object.isRequired,
};

export default CustomMobileInput;
