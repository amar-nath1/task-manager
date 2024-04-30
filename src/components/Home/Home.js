import { useState, useEffect } from "react";
import ToDoForm from "./Components/ToDoForm";
import ToDoList from "./Components/ToDoList";
import Profile from "./Components/Profile";
// import './App.css';

function Home() {
  const [userArr, setUserArr] = useState([]);
  const [unDoneToDosArray, setUnDoneToDosArray] = useState([]);
  const [showAlert, setShowAlert] = useState({ isShow: false, errorText: "" });
  

  const getAllUser = () => {
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
            setUserArr((prevList) => a.list);
          });
        }
      })
      .catch(() => {
        setUserArr([]);
        alert("Server Error");
      });
  };

  useEffect(() => {
    getAllUser();
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
    return <ToDoForm setShowAlert={setShowAlert} getAllUser={getAllUser} />;
  };

  const renderToDoList = () => {
    return (
      <ToDoList
        unDoneToDosArray={unDoneToDosArray}
        setUnDoneToDosArray={setUnDoneToDosArray}
        getAllUser={getAllUser}
        userArr={userArr}
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
