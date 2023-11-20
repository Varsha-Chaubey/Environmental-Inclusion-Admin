import React from "react";
import { Modal } from "react-bootstrap";

const DeleteModal = (props) => {
  return (
    <Modal
      className=" fade custom-modal-popup "
      show={props.show}
      onHide={() => props.onHide()}
      enforceFocus={true}
      dialogClassName="modal-400w"
      backdropClassName={"delete-backdrop"}
      //   backdrop={uploadImageModal ? false : true}
      centered
    >
      <Modal.Body>
        <div class="modal-alert-box">
          <h4>Alert! </h4>
          <p>Are you sure you want to delete ?</p>
        </div>
        <div class="modal-action-btn">
          <a
            href="#!"
            class={`btn btn-delete btn-md delete-btn-bg  ${props.loadingDelete && "disabled"}`}
            onClick={() => !props.loadingDelete && props.deleteHandler()}
          >
            Delete
          </a>
          <a
            href="#!"
            style={{ background: "#fff" }}
            class="btn btn-cancel global-cancel-button"
            onClick={() => props.onHide()}
          >
            Cancel
          </a>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
