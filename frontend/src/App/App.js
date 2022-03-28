import React from "react";
import Axios from "axios";
import "./App.css";
import { ToDoHeader } from "../ToDoHeader/ToDoHeader.js";
import { ToDoList } from "../ToDoList/ToDoList.js";
import { ToDoItem } from "../ToDoItem/ToDoItem.js";
import { CreateToDoButton } from "../CreateToDoButton/CreateToDoButton.js";
import { CreateToDoModal } from "../CreateToDoModal/CreateToDoModal.js";
import { CreateToDoForm } from "../CreateToDoForm/CreateToDoForm.js";
function App() {
  //States using hooks
  const [toDoList, setToDoList] = React.useState([]);
  const [openCreateToDoModal, setOpenCreateToDoModal] = React.useState(false);
  const [buttonOrderByExpirationDate, setButtonOrderByExpirationDate] =
    React.useState(false);
  const [buttonOrderByState, setButtonOrderByState] = React.useState(false);
  const [updateToDos, setUpdateToDos] = React.useState(false);
  //Date now
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  const dateNowFormat = `${year}-${month}-${day}`;
  //First Render and render after update todos
  React.useEffect(() => {
    Axios({
      url: "http://localhost:3333/toDo",
    })
      .then((response) => {
        //Order the To Dos by created date
        let toDos = response.data.sort((a, b) => {
          const aDate = new Date(`${a.createdDate} ${a.createdTime}`);
          const bDate = new Date(`${b.createdDate} ${b.createdTime}`);
          if (aDate < bDate) {
            return 1;
          }
          return -1;
        });
        //Set the state todolist state
        setToDoList(toDos);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [updateToDos]);
  return (
    //Used fragment to avoid create innecessary div html element
    <React.Fragment>
      <ToDoHeader
        setToDoList={setToDoList}
        toDoList={toDoList}
        setButtonOrderByExpirationDate={setButtonOrderByExpirationDate}
        setButtonOrderByState={setButtonOrderByState}
        setUpdateToDos={setUpdateToDos}
      />
      {/* render all to dos */}
      <ToDoList>
        {toDoList.map((todo) => {
          return (
            <ToDoItem
              key={todo.id}
              id={todo.id}
              text={todo.text}
              expirationDate={todo.expirationDate}
              setToDoList={setToDoList}
              toDoList={toDoList}
              dateNow={dateNowFormat}
              completed={todo.completed}
              buttonOrderByExpirationDate={buttonOrderByExpirationDate}
              buttonOrderByState={buttonOrderByState}
            ></ToDoItem>
          );
        })}
      </ToDoList>
      {/* render the modal only if the state is true */}
      {openCreateToDoModal && (
        <CreateToDoModal>
          <CreateToDoForm
            openCreateToDoModal={openCreateToDoModal}
            setOpenCreateToDoModal={setOpenCreateToDoModal}
            setToDoList={setToDoList}
            dateNow={dateNowFormat}
            toDoList={toDoList}
          />
        </CreateToDoModal>
      )}
      <CreateToDoButton
        openCreateToDoModal={openCreateToDoModal}
        setOpenCreateToDoModal={setOpenCreateToDoModal}
      />
    </React.Fragment>
  );
}

export default App;
