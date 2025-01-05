import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Modal } from "@/components/common";
import { useFormikContext } from "formik";
import PropType from "prop-types";
import React, { useState } from "react";

const ConfirmModal = ({ onConfirmUpdate, modal }) => {
  const [password, setPassword] = useState("");
  const { values } = useFormikContext();

  return (
    <Modal isOpen={modal.isOpenModal} onRequestClose={modal.onCloseModal}>
      <div className="text-center padding-1">
        <h4>Confirm Update</h4>
        <p>
          To continue updaing profile, including your &nbsp;{" "}
          <strong>email</strong>, <br /> please confirm by entering your
          password.
        </p>
        <input
          type="password"
          className="input-form d-block"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password."
          required
          value={password}
        />
      </div>
      <br />
      <div className="d-flex-center">
        <button
          className="button"
          onClick={() => {
            onConfirmUpdate(values, password);
            modal.onCloseModal();
          }}
          type="button"
        >
          <CheckOutlined />
        </button>
      </div>
    </Modal>
  );
};

ConfirmModal.propTypes = {
  onConfirmUpdate: PropType.func.isRequired,
  modal: PropType.shape({
    onCloseModal: PropType.func,
    isOpenModal: PropType.bool,
  }).isRequired,
};

export default ConfirmModal;
