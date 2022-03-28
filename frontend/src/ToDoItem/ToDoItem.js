import React from "react";
import Axios from "axios";
import "./ToDoItem.css";
function ToDoItem({
  text,
  expirationDate,
  id,
  setToDoList,
  toDoList,
  dateNow,
  completed,
  buttonOrderByExpirationDate,
  buttonOrderByState,
}) {
  //state
  const [check, setCheck] = React.useState("no");
  //function to change the expiration date
  const onChange = (event) => {
    Axios.patch(`http://localhost:3333/toDo/${id}`, {
      expirationDate: event.target.value,
    })
      .then((response) => {
        let changedToDoList = [...toDoList];
        const toDoIndex = changedToDoList.findIndex((toDo) => {
          return toDo.id === id;
        });
        changedToDoList[toDoIndex] = response.data;
        //if order by expiration date is active
        if (buttonOrderByExpirationDate) {
          //order by expiration date
          changedToDoList.sort((a, b) => {
            const aDate = new Date(`${a.expirationDate} ${a.expirationTime}`);
            const bDate = new Date(`${b.expirationDate} ${b.expirationTime}`);
            if (aDate > bDate) {
              return 1;
            }
            return -1;
          });
        }
        //if order by status
        if (buttonOrderByState) {
          // order by status
          changedToDoList.sort((a, b) => {
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
        }
        //set the to do list to re render
        setToDoList(changedToDoList);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //use to know if the to do is delayed, that can a use a react state but its not necessary
  const delayed = new Date(expirationDate) < new Date(dateNow);

  return (
    <li
      className={`ToDoItem-container ${delayed && "ToDoDelayed"} ${
        completed && "ToDoCompleted"
      }`}
    >
      <p className="ToDoItemName">{text}</p>
      <div className="ToDoItem">
        {!completed && (
          <div className="form-check">
            <input
              className="form-check-input checkbox"
              type="checkbox"
              id={id}
              check={check}
              onChange={() => {
                if (check === "no") {
                  setCheck("si");
                } else {
                  setCheck("no");
                }
              }}
            />
          </div>
        )}
        <div className="ToDoItemData">
          <input
            id={id}
            type="date"
            value={expirationDate}
            onChange={onChange}
            disabled={completed}
            className="ToDoExpirationDate"
          ></input>
          <img className="ToDoItem-calendarIcon" alt="calendar icon"></img>
        </div>
        <img
          className={`ToDoItem-Icon ${delayed && "ToDoItem-Icon--delayed"}`}
          alt="Icono segun estado de la tarea"
        ></img>
      </div>
    </li>
  );
}

export { ToDoItem };
