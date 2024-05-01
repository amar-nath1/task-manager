import { useState, useEffect } from "react";
import ToDoForm from "./Components/ToDoForm";
import ToDoList from "./Components/ToDoList";
import Profile from "./Components/Profile";
// import './App.css';

function Home() {
  const [todosArr, setTodosArr] = useState([]);
  const [unDoneToDosArray, setUnDoneToDosArray] = useState([]);
  const [showAlert, setShowAlert] = useState({ isShow: false, errorText: "" });
  

  const getAllTodos = () => {
    console.log("called");
    fetch(
      `http://localhost:4000/todos?useremail=${localStorage.getItem("user")}`
    )
      .then((res) => {
        if (res.ok) {
          let data = res.json();
          data.then((a) => {
            console.log(a, " all todos");
            setUnDoneToDosArray((prevList) => a.list);
            setTodosArr((prevList) => a.list);
          });
        }
      })
      .catch(() => {
        setTodosArr([]);
        alert("Server Error");
      });
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  const renderAlert = () => {
    let alert = null;
    if (showAlert.isShow) {
      alert = (
        <div class="alert alert-danger" role="alert">
          {showAlert.errorText}
        </div>
      );
    }
    return alert;
  };

  const renderTodoForm = () => {
    return <ToDoForm setShowAlert={setShowAlert} getAllTodos={getAllTodos} />;
  };

  const renderToDoList = () => {
    return (
      <ToDoList
        unDoneToDosArray={unDoneToDosArray}
        setUnDoneToDosArray={setUnDoneToDosArray}
        getAllTodos={getAllTodos}
        todosArr={todosArr}
      />
    );
  };

  const renderProfileSection = () => {
    return (
      <Profile></Profile>
    )
  }

  return (
    <div class="container">
      {renderAlert()}
      {renderProfileSection()}
      {renderTodoForm()}
      {renderToDoList()}
    </div>
  );
}

export default Home;

// Reading your code should be like reading a book.
// One Function should do One job only.
//Avoid using short forms like 'ind' for index.
//Do not write inline css.
