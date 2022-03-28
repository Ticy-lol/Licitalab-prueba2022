import React from "react";
import "./CreateToDoButton.css";
function CreateToDoButton({ openCreateToDoModal, setOpenCreateToDoModal }) {
  //function to set the modal state(open/close)
  const onClickButton = () => {
    setOpenCreateToDoModal(!openCreateToDoModal);
  };
  return (
    <div className="CreateToDoButton">
      <img
        className={`CreateToDoButtonIcon`}
        onClick={() => onClickButton()}
      ></img>
    </div>
  );
}

export { CreateToDoButton };
