import React, { useState } from "react";

const ToDoForm = ({ setShowAlert, getAllUser }) => {
  const [formData, setFormData] = useState({
    todoname: "",
    tododesc: "",
    status: "todo",
    useremail: localStorage.getItem("user"),
  });
  // const [errors, setErrors] = useState({});
  const [edit, setEdit] = useState({ yes: false, id: null });

  const validateForm = () => {
    const errors = {};
    if (!formData.todoname.trim()) {
      errors.todoname = "To Do name is required";
    }
    if (!formData.tododesc.trim()) {
      errors.tododesc = "To Do Description is required";
    }
    // setErrors(errors);
    return errors
  };

  const showAlertForInvalidEntry = () => {
    const errors = validateForm()
    const isValid = Object.keys(errors).length===0;
    if (!isValid) {
      if (Object.keys(errors).length > 1) {
        setShowAlert(()=>{
          return {
            isShow: true,
            errorText: "More than one fields are empty",
          }
        });
      } else if (Object.keys(errors).length == 1) {
        const errorKey = Object.keys(errors)[0];
        setShowAlert(()=>{
          return { isShow: true, errorText: errors[`${errorKey}`] }
        });
      }

      setTimeout(() => {
        setShowAlert(()=>{
          return { isShow: false, errorText: "" }
        });
      }, 1500);

      return true;
    }
  };

  const addToDoApiCall = () => {
    let url = "http://localhost:4000/add-todo";
    let method = "post";

    console.log(JSON.stringify(formData), " payload react");
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.ok) {
        getAllUser();
        setFormData({
          todoname: "",
          tododesc: "",
          status: "todo",
          useremail: localStorage.getItem("user"),
        });
        setEdit({ yes: false, id: null });
        console.log("todo added succesfully");
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!showAlertForInvalidEntry()){
      addToDoApiCall();
    }

    // showAlertForInvalidEntry();
   
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const renderFormHeading = () => {
    return <h1>Add a To Do</h1>;
  };

  const renderTodoNameInput = () => {
    return (
      <div class="form-group">
        <label htmlFor="todoname">Todo Name:</label>
        <input
          class="form-control"
          type="text"
          id="todoname"
          name="todoname"
          value={formData.todoname}
          onChange={handleInputChange}
        />
      </div>
    );
  };

  const renderTodoDescriptionInput = () => {
    return (
      <div class="form-group">
        <label htmlFor="todoname">To do desc:</label>
        <input
          class="form-control"
          type="text"
          id="tododesc"
          name="tododesc"
          value={formData.tododesc}
          onChange={handleInputChange}
        />
      </div>
    );
  };

  const renderAddButton = () => {
    return (
      <button
        style={{ width: "200px" }}
        class="btn btn-primary mt-3"
        type="submit"
      >
        Add
      </button>
    );
  };

  const renderTodoForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        {renderTodoNameInput()}
        {renderTodoDescriptionInput()}
        {renderAddButton()}
      </form>
    );
  };

  return (
    <>
      {renderFormHeading()}
      {renderTodoForm()}
    </>
  );
};

export default ToDoForm;
