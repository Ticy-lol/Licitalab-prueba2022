import React from "react";
import ReactDOM from "react-dom";
import "./CreateToDoModal.css";

function CreateToDoModal({ children }) {
  //teleport the modal to another node
  return ReactDOM.createPortal(
    <div className="ModalBackground">{children}</div>,
    document.getElementById("modal")
  );
}
export { CreateToDoModal };
