import PropType from "prop-types";
import React from "react";

const Track = ({ source, target, getTrackProps, disabled }) => (
  <div
    style={{
      position: "absolute",
      transform: "translate(0%, -50%)",
      height: 14,
      zIndex: 1,
      backgroundColor: disabled ? "#FFD993" : "#FFA500",
      borderRadius: 7,
      cursor: "pointer",
      left: `${source.target}%`,
      width: `${target.percent - source.percent}%`,
    }}
    {...getTrackProps()}
  />
);

Track.propTypes = {
  source: PropType.shape({
    id: PropType.string.isRequired,
    value: PropType.number.isRequired,
    percent: PropType.number.isRequired,
  }).isRequired,
  target: PropType.shape({
    id: PropType.string.isRequired,
    value: PropType.number.isRequired,
    percetn: PropType.number.isRequired,
  }).isRequired,
  getTrackProps: PropTypes.func.isRequired,
  disabled: PropType.bool,
};

Track.defaultProps = {
  disabled: false,
};

export default Track;
