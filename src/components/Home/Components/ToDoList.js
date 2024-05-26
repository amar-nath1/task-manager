import React, { useState } from "react";

const ToDoList = ({
  unDoneToDosArray,
  setUnDoneToDosArray,
  getAllTodos,
  todosArr,
}) => {
  const [enteredSearchText, setEnteredSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  const deleteUser = (e) => {
    const id = e.target.id;
    fetch(`http://localhost:4000/delete-todo/${id}`, {
      method: "DELETE",
    }).then((res) => {
      getAllTodos();
    });
  };

  const handleFilterChange = (event) => {
    console.log(event.target.value, " vaalu");
    let undoneTempArray = [...todosArr];
    let filteredTodos = undoneTempArray.filter((todo) => {
      if (event.target.value === "all") {
        return todo.done === false;
      } else if (event.target.value === "done") {
        return todo.status === event.target.value;
      } else {
        return todo.status === event.target.value;
      }
    });

    console.log(filteredTodos, "this is filtered todos");

    setSelectedFilter(event.target.value);
    setUnDoneToDosArray(filteredTodos);
  };

  const handleStatusChange = (event) => {
    console.log(event.target.value, "this is status");
    let updatedStatusArr = unDoneToDosArray.map((todoWithOldStatus) => {
      if (event.target.id === todoWithOldStatus.id.toString()) {
        todoWithOldStatus.status = event.target.value;
      }
      console.log(todoWithOldStatus.id.toString(), " andddd ", event.target.id);

      return todoWithOldStatus;
    });
    // console.log(updatedstatusarr,'updatedstatusarr')
    setUnDoneToDosArray(updatedStatusArr);
  };

  const markAsDoneHandler = (todo) => {
    // const id=e.target.id
    console.log(todo, "totodo");
    fetch(`http://localhost:4000/done-todo/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }).then((res) => {
      getAllTodos();
    });
  };

  const onSearchTextChange = (e) => {
    setEnteredSearchText(e.target.value);

    let searchFilter = todosArr.filter((res) => {
      return JSON.stringify(res).includes(e.target.value);
    });

    setUnDoneToDosArray(searchFilter);
  };

  const renderToDoListHeading = () => {
    return <div style={{fontWeight:'bolder',fontSize:'larger'}}>
      To Do List
    </div>;
  };

  const renderSearchBar = () => {
    return (
      <div>
        <input
          value={enteredSearchText}
          onChange={onSearchTextChange}
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          // aria-label="Search"
        />
      </div>
    );
  };

  const renderFilterButton = () => {
    return (
      <div>
        <select
          value={selectedFilter}
          onChange={handleFilterChange}
          class="form-select"
          aria-label="Default select example"
        >
          <option value="all">All</option>
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    );
  };

  const renderTableHeader = () => {
    return (
      <thead class="thead-dark">
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Edit/ Status</th>
          <th>Delete</th>
        </tr>
      </thead>
    );
  };

  const renderTableBody = () => {
    return <tbody>{renderTodoDoContent()}</tbody>;
  };

  const renderTodoDoContent = () => {
    let todos = renderNoTodosAvailable();
    if (unDoneToDosArray.length) {
      todos = renderToDoList();
    }
    return todos;
  };

  const renderToDoList = () => {
    console.log(unDoneToDosArray, 'hereisundone')
    return unDoneToDosArray.map((todo, index) => (
      <tr key={todo.id}>
        <td>{index + 1}</td>
        <td>{todo.todoname}</td>
        <td>{todo.tododesc}</td>

        <td style={{ display: "flex" }}>
          {renderSelectStatusButton(todo)}
          {renderDoneButton(todo)}
        </td>
        <td>{renderDeleteButton(todo)}</td>
      </tr>
    ));
  };

  const renderSelectStatusButton = (todo) => {
    return (
      <select
        value={todo.status}
        id={todo.id}
        onChange={handleStatusChange}
        class="form-select"
        aria-label="Default select example"
      >
        {/* <option selected>Open this select menu</option> */}
        <option value="todo">To do</option>
        <option value="inprogress">In progress</option>
        <option value="done">Done</option>
      </select>
    );
  };

  const renderDeleteButton = (todo) => {
    return (
      <>
        {" "}
        <button class="btn btn-danger" id={todo.id} onClick={deleteUser}>
          X
        </button>
      </>
    );
  };

  const renderDoneButton = (todo) => {
    return (
      <button
        class="btn btn-success"
        id={todo.id}
        onClick={() => {
          markAsDoneHandler(todo);
        }}
      >
        &#x2714;
      </button>
    );
  };

  const renderNoTodosAvailable = () => {
    return (
      <tr>
        <td>
          <b>No Task To DO-</b>
        </td>
        <td>
          <b>-Add a task to see here</b>
        </td>
      </tr>
    );
  };

  return (
    <div >
      <div class='mt-3 pt-3'
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop:'2px solid'
        }}
      >
        {renderToDoListHeading()}
        {renderSearchBar()}
        {renderFilterButton()}
      </div>

      <table class="table">
        {renderTableHeader()}
        {renderTableBody()}
      </table>
    </div>
  );
};

export default ToDoList;
