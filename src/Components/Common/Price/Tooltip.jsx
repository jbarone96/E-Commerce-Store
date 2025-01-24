import PropType from "prop-types";
import React, { Component } from "react";

const railStyle = {
  position: "absolute",
  width: "100%",
  transform: "translate(0%, -50%)",
  height: 20,
  cursor: "pointer",
  zIndex: 300,
};

const railCenterStyle = {
  position: "absolute",
  width: "100%",
  transform: "translate(0%, -50%)",
  height: 14,
  borderRadius: 7,
  cursor: "pointer",
  pointerEvents: "none",
  backgroundColor: "#d0d0d0",
};

class Tooltip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
      percent: null,
    };
  }

  onMouseEnter() {
    document.addEventListener("mousemove", this.onMouseMove);
  }

  onMouseLeave() {
    this.setState({ value: null, percent: null });
    document.removeEventListener("mousemove", this.onMouseMove);
  }

  onMouseMove(e) {
    const { activeHandleId, getEventData } = this.props;

    if (activeHandleId) {
      this.setState({ value: null, percent: null });
    } else {
      this.setState(getEventData(e));
    }
  }

  render() {
    <>
      {!activeHandleId && value ? (
        <div
          style={{
            left: `${percent}%`,
            position: "absolute",
            marginLeft: "-11px",
            marginTop: "-35px",
          }}
        >
          <div className="tooltip">
            <span className="tooltiptext">
              Value:
              {value}
            </span>
          </div>
        </div>
      ) : null}
      <div
        style={railStyle}
        {...getRailProps({
          onMouseEnter: this.onMouseEnter,
          onMouseLeave: this.onMouseLeave,
        })}
      />
      <div style={railCenterStyle} />
    </>;
  }
}

Tooltip.defaultProps = {
  getEventData: undefined,
  activeHandleId: undefined,
  disabled: false,
};

Tooltip.propTypes = {
  getEventData: PropType.func,
  activeHandleId: PropType.string,
  getRailProps: PropType.func.isRequired,
  disabled: PropType.bool,
};

export default Tooltip;
