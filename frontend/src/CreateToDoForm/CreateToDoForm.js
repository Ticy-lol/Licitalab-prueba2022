import React from "react";
import "./CreateToDoForm.css";
import axios from "axios";
function CreateToDoForm({
  toDoList,
  setToDoList,
  openCreateToDoModal,
  setOpenCreateToDoModal,
  dateNow,
}) {
  //states in the form
  const [newToDoValue, setNewToDoValue] = React.useState("");
  const [newToDoExpirationDate, setNewToDoExpirationDate] = React.useState();
  //function to submit information/ create new to do
  const onSubmit = (event) => {
    event.preventDefault();
    //get the time from local storage
    const timeNow = new Date().toLocaleTimeString("es-CL", {
      hour12: false,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    //create the obj/to do
    const newToDo = {
      id: Math.floor(Math.random() * 1000000),
      createdDate: dateNow,
      createdTime: timeNow,
      expirationDate: newToDoExpirationDate,
      expirationTime: timeNow,
      text: newToDoValue,
      completed: false,
    };
    //using axios library to send the data and set the new to do list
    axios
      .post("http://localhost:3333/toDo", newToDo)
      .then((resp) => {
        let newToDoList = [...toDoList];
        newToDoList.unshift(resp.data);
        setOpenCreateToDoModal(!openCreateToDoModal);
        setToDoList(newToDoList);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //function get the input value
  const onChangeToDoName = (event) => {
    setNewToDoValue(event.target.value);
  };
  //function to get the expiration date
  const onChangeExpirationDate = (event) => {
    setNewToDoExpirationDate(event.target.value);
  };
  //function to close the modal
  const onCancel = () => {
    setOpenCreateToDoModal(!openCreateToDoModal);
  };
  return (
    <form onSubmit={onSubmit}>
      <label>Nombre de la tarea</label>
      <input
        className="toDoName"
        value={newToDoValue}
        onChange={onChangeToDoName}
        placeholder="Nombre de la tarea"
        required
      />
      <label>Fecha de vencimiento</label>
      <input
        id="inputDate"
        className="inputDate"
        type="date"
        min={dateNow}
        required
        onChange={onChangeExpirationDate}
      ></input>
      <div className="TodoForm-buttonContainer">
        <button
          type="button"
          className="TodoForm-button TodoForm-button-cancel btn btn-light"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button
          className="TodoForm-button TodoForm-button-add btn btn-primary"
          type="submit"
        >
          Crear
        </button>
      </div>
    </form>
  );
}

export { CreateToDoForm };
