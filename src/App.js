
import { useState,useEffect } from 'react';
import './App.css';

function App() {
    
  const [formData, setFormData] = useState({
    todoname: '',
    tododesc: '',
    status: 'todo',
    
  });
  const [userArr,setUserArr]=useState([])
  const [unDoneToDosArray,setUnDoneToDosArray]=useState([])
  const [edit,setEdit]=useState({yes:false,id:null})
  const [doneToDoArr,setDoneTodoArr]=useState([])
  const [selectedFilter, setSelectedFilter] = useState('');


  const handleFilterChange = (event) => {
    console.log(event.target.value,' vaalu')
    let undoneTempArray = [...userArr]
    let filteredTodos = undoneTempArray.filter((todo)=>{
      
      if (event.target.value==='all'){
        return todo.done===false;
      }

      else if(event.target.value==='done') {
        return todo.done===true && todo.status === event.target.value;
      }

      else {
        return todo.done===false && todo.status === event.target.value;
      }
    })

console.log(filteredTodos,'this is filtered todos')

    setSelectedFilter(event.target.value);
    setUnDoneToDosArray(filteredTodos)
  };

  const handleStatusChange = (event) =>{
    console.log(event.target.value, 'this is status')
    let updatedStatusArr= unDoneToDosArray.map((todoWithOldStatus)=>{
      if (event.target.id === todoWithOldStatus.id.toString()) {
        todoWithOldStatus.status = event.target.value
      }
      console.log(todoWithOldStatus.id.toString(), ' andddd ', event.target.id)

      return todoWithOldStatus
    })
// console.log(updatedstatusarr,'updatedstatusarr')
    setUnDoneToDosArray(updatedStatusArr)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();
    let url='http://localhost:4000/add-todo'
    let method='post'
    
    
    console.log(JSON.stringify(formData),' payload react')
    fetch(url,{
        method:method,
        headers: {
            'Content-Type': 'application/json',
          },
        body:JSON.stringify(formData)
    }).then((response)=>{
        if (response.ok){
            getAllUser()
            setFormData({todoname: '',
            tododesc: '',})
            setEdit({yes:false,id:null})
            console.log('todo added succesfully')
        }
    })
    
  };

  const markAsDoneHandler=(todo)=>{
    // const id=e.target.id
    console.log(todo,'totodo')
    fetch(`http://localhost:4000/done-todo/${todo.id}`,{
        method:'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(todo)
    })
    .then((res)=>{
        getAllUser()
    })

    
  }

  const getAllUser=()=>{
    fetch(`http://localhost:4000/todos`).then((res)=>{
        if(res.ok){
            let data=res.json()
            data.then((a)=>{
                console.log(a,' all todos')
                setUserArr(a.list)
                // let undoneToDos = a.list.filter((todo)=>{
                //   return todo.done == false;
                // })

                // setUnDoneToDosArray(undoneToDos)

                setUnDoneToDosArray(a.list)
            
            })
            
        }
    }).catch(()=>{
      setUserArr([])
      alert('Server Error')
    })
  }

  const deleteUser=(e)=>{
    const id=e.target.id
    fetch(`http://localhost:4000/delete-todo/${id}`,{
        method:'DELETE'
    })
    .then((res)=>{
        getAllUser()
    })
  }

  

  useEffect(()=>{
    getAllUser()
    
  },[])

  return (
    <div class='container'>
      <h1>Add a To Do</h1>
    <form onSubmit={handleSubmit}>
      <div class='form-group'>
        <label htmlFor="todoname">Todo Name:</label>
        <input class="form-control"
          type="text"
          id="todoname"
          name="todoname"
          value={formData.todoname}
          onChange={handleInputChange}
        />
      </div>
      <div class='form-group'>
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
      
      <button style={{width:'200px'}} class="btn btn-primary mt-3" type="submit">Add</button>
    </form>

    <div style={{margin:'30px'}}>
      <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center'}}>
      <div>
      <h1>To Do List</h1>
        </div>
        <div>
        <select value={selectedFilter} onChange={handleFilterChange} class="form-select" aria-label="Default select example">
      
        <option value="all">All</option>
  <option value="todo">To Do</option>
  <option value="inProgress">In Progress</option>
  <option value="done">Done</option>
</select>
        </div>
      
      </div>
    
    <table class='table'>
    <thead class="thead-dark">
    <tr>
      <th >#</th>
      <th >Title</th>
      <th>Description</th>
      <th >Edit/ Status</th>
      <th >Delete</th>
    </tr>
  </thead>
  <tbody>
  {unDoneToDosArray.length>0 && (
    unDoneToDosArray.map((todo,ind)=>(
      
      <tr key={todo.id}>
        <td>{ind+1}</td>
      <td>{todo.todoname}</td>
      <td>{todo.tododesc}</td>
      
      <td style={{display:'flex'}}>
      <select value={todo.status} id={todo.id} onChange={handleStatusChange} class="form-select" aria-label="Default select example">
  {/* <option selected>Open this select menu</option> */}
  <option value="todo">To do</option>
  <option value="inProgress">In progress</option>
  <option value="done">Done</option>
</select>
        <button class='btn btn-success' id={todo.id} onClick={()=>{markAsDoneHandler(todo)}}>&#x2714;</button>
        
        </td>
     <td> <button class='btn btn-danger' id={todo.id} onClick={deleteUser}>X</button></td>
      </tr>
))
  )}
  {unDoneToDosArray.length==0 && (
    <tr><td><b>No Task To DO-</b></td>
    <td><b>-Add a task to see here</b></td>
    </tr>
  )}
  </tbody>
    </table>

    </div>



    {/* <div style={{margin:'30px'}}>
      <h1>Completed Todos</h1>
<table class='table table-dark'>
    <thead class="thead-dark">
    <tr>
      <th >#</th>
      <th >Name</th>
      <th>Description</th>
      
    </tr>
  </thead>
  <tbody>
    {userArr.filter((td)=>{
      return td.done==true
    }).map((todo,ind)=>(
      <tr key={todo.id}>
        <td>{ind+1}</td>
          <td>{todo.todoname}</td>
          <td>{todo.tododesc}</td>
          
          
      </tr>
  ))}
</tbody>
  </table>

</div> */}

    </div>
  );
}

export default App;
