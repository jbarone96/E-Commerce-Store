import PropType from "prop-types";
import React from "react";

const railOuterStyle = {
  position: "absolute",
  transform: "translate(0%, -50%)",
  width: "100%",
  height: 42,
  borderRadius: 7,
  cursor: "pointer",
};

const railInnerStyle = {
  position: "absolute",
  transform: "translate(0%, -50%)",
  width: "100%",
  height: 14,
  borderRadius: 7,
  pointerEvents: "none",
  backgroundColor: "#d0d0d0",
};

const Slider = ({ getRailProps }) => (
  <div>
    <div style={railOuterStyle} {...getRailProps()} />
    <div style={railInnerStyle} />
  </div>
);

Slider.propTypes = {
  getRailProps: PropType.func.isRequired,
};

export default Slider;
