import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Todo from './components/Todo'
import { v4 as uuidv4 } from 'uuid'
import './App.css';


function App() {
  const [todo, setTodo] = useState({ id: "", text: "", isCompleted: false });
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    const todosString = localStorage.getItem("todos");
    if (todosString) {
      setTodos(JSON.parse(todosString));
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleShowFinished = (params) => {
    setshowFinished(!showFinished)

  }
  

  const handleSave = () => {
    const newTodo = { ...todo, id: uuidv4() };
    setTodos([...todos, newTodo]);
    setTodo({ id: "", text: "", isCompleted: false });
  };

  const handleTodoInputChange = (e) => {
    setTodo({ ...todo, text: e.target.value, });
  };

  const handleToggleCompleted = (id, isChecked) => {
    setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: isChecked } : todo
      ));
  };

  const handleDeleteTodo = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this todo?");
    if (confirmDelete) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  const handleEditTodo = (id) => {
    let editTodo = todos.filter(todo => todo.id === id);
    setTodo(editTodo[0]);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <>
      <Navbar />

      <div className="main-div md:w-1/2 md:mx-auto mx-3 my-5 p-5 rounded-xl bg-violet-200 h-[80vh] overflow-y-auto">
        <h1 className='font-bold text-2xl text-center m-2'>iTask - Manage your tasks at one place</h1>
        <div className="AddTodo">
          <h2 className='font-bold text-lg my-2'>Add a Todo</h2>
          <div className='flex justify-between'>
            <input onChange={handleTodoInputChange} value={todo.text} className='md:min-w-[85%] min-w-[75%] rounded-md px-2 py-1' placeholder='Write your todo here' type="text" />
            <button onClick={handleSave} disabled={todo.text.length<=3} className='bg-violet-700 hover:bg-violet-950 text-white px-2 py-1 mx-6 text-sm font-bold rounded-md disabled:bg-violet-500'>Save</button>
          </div>
        </div>
        <input className='my-5' onChange={handleShowFinished} type="checkbox" checked={showFinished} id="showFinished" /> 
        <label htmlFor="showFinished"> Show Finished</label>
        <div className='h-[1px] bg-black opacity-25 mx-auto w-2/3 my-2'></div>
        <h2 className='font-bold text-lg my-2'>Your Todos</h2>
        {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
        <div className="todos m-2">
          {todos.map(todo => {
            return  (showFinished || !todo.isCompleted) && <Todo key={todo.id} todo={todo} handleToggleCompleted={handleToggleCompleted} handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo} />
          })}
        </div>
      </div>

    </>
  )
}

export default App
