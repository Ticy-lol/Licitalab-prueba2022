import React from "react";
import Axios from "axios";
import { DropdownButton, Dropdown, Button } from "react-bootstrap";

import "./ToDoHeader.css";
function ToDoHeader({
  toDoList,
  setToDoList,
  setButtonOrderByExpirationDate,
  setButtonOrderByState,
  setUpdateToDos,
}) {
  //date now from local storage
  const dateNow = new Date().toLocaleDateString();
  //function order the to dos by creation date
  function orderByCreationDate() {
    setButtonOrderByExpirationDate(false);
    setButtonOrderByState(false);
    let newToDoList = [...toDoList];
    newToDoList.sort((a, b) => {
      const aDate = new Date(`${a.createdDate} ${a.createdTime}`);
      const bDate = new Date(`${b.createdDate} ${b.createdTime}`);
      if (aDate < bDate) {
        return 1;
      }
      return -1;
    });
    setToDoList(newToDoList);
  }
  //function order the to dos by expiration date
  function orderByExpirationDate() {
    setButtonOrderByExpirationDate(true);
    setButtonOrderByState(false);
    let newToDoList = [...toDoList];
    newToDoList.sort((a, b) => {
      const aDate = new Date(`${a.expirationDate} ${a.expirationTime}`);
      const bDate = new Date(`${b.expirationDate} ${b.expirationTime}`);
      if (aDate > bDate) {
        return 1;
      }
      return -1;
    });
    setToDoList(newToDoList);
  }
  //function order the to dos by the status expired,not completed and completed
  function orderByDelay() {
    setButtonOrderByState(true);
    let newToDoList = [...toDoList];
    newToDoList.sort((a, b) => {
      let aWeight = a.completed ? 10 : 0;
      let bWeight = b.completed ? 10 : 0;
      if (a.completed || b.completed) {
        return aWeight - bWeight;
      } else {
        if (new Date(a.expirationDate) > new Date(b.expirationDate)) {
          aWeight += 1;
        } else {
          bWeight += 1;
        }
        return aWeight - bWeight;
      }
    });
    setToDoList(newToDoList);
  }
  //function to completed the todos checked
  function completeToDos() {
    //get the checkboxes
    let checkboxes = document.getElementsByClassName("checkbox");
    if (!checkboxes) {
    } else {
      //copy the to do list
      let updatedToDoList = [...toDoList];
      //complete all to dos
      for (let i = 0; i < checkboxes.length; i++) {
        //enter in this if only if the checkbox is checked
        if (checkboxes[i].getAttribute("check") === "si") {
          let id = checkboxes[i].getAttribute("id");
          //api connection to update the to do
          Axios.patch(`http://localhost:3333/toDo/${id}`, {
            completed: true,
          })
            .then((response) => {
              const toDoIndex = updatedToDoList.findIndex((toDo) => {
                return toDo.id === id;
              });
              console.log(id);
              updatedToDoList[toDoIndex] = response.data;
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
      setUpdateToDos(updatedToDoList);
    }
  }
  return (
    <header className="ToDoHeader-container">
      <div className="ToDoHeader-text">
        <h2>Cosas por Hacer</h2>
        <h4 className="ToDoHeader-date">Hoy: {dateNow}</h4>
      </div>
      <div className="ToDoHeader-buttons">
        <Button
          variant="primary"
          size="lg"
          active
          onClick={() => completeToDos()}
        >
          Liberar seleccionados
        </Button>
        <div className="dropdown ToDoHeader-buttons-order">
          <img className="filter-icon" alt="Icono de filtrado"></img>
          {/* Boostrap components */}
          <DropdownButton size="lg" id="dropdown-basic-button" title="Ordenar">
            <Dropdown.Item href="#" onClick={() => orderByCreationDate()}>
              Ordenar según fecha de creación
            </Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => orderByExpirationDate()}>
              Ordenar según fecha de vencimiento
            </Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => orderByDelay()}>
              Ordenar según estado de la tarjeta
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </header>
  );
}

export { ToDoHeader };
