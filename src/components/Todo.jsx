import React from 'react';


const Todo = ({ todo, handleToggleCompleted, handleDeleteTodo, handleEditTodo }) => {

  const handleFinishCheckbox = (e) => {
    let id = e.target.name;
    let isChecked = e.target.checked;
    handleToggleCompleted(id, isChecked);
  };

  const handleEdit = (e) => {
    let id = e.target.name;
    handleEditTodo(id)
  };
  
  const handleDelete = (e) => {
    let id = e.target.name;
    handleDeleteTodo(id)
  };

  return (
    <div className="todo flex gap-2 my-2 justify-between items-center">
      <div className="flex items-center gap-2 w-[45%]">
        <input onChange={handleFinishCheckbox} type="checkbox" name={todo.id} checked={todo.isCompleted}/>
        <div className={`${todo.isCompleted ? 'line-through' : ''} w-full break-words `}>
          {todo.text}
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={handleEdit} name={todo.id} className="bg-violet-700 hover:bg-violet-950 text-white px-2 py-1 text-sm font-bold rounded-md">Edit</button>
        <button onClick={handleDelete} name={todo.id} className="bg-violet-700 hover:bg-violet-950 text-white px-2 py-1 text-sm font-bold rounded-md">Delete</button>
      </div>
    </div>
  );
};

export default Todo;
