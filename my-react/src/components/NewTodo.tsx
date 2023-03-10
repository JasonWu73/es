import React, { useState } from 'react';

function NewTodo() {
  const [ todo, setTodo ] = useState('');

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('submit: ', todo);
    setTodo('');
  };

  const todoChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="todo">Todo Text</label>
        <input type="text" id="todo" value={todo} onChange={todoChangeHandler}/>
      </div>
      <div>
        <button type="submit">ADD TODO</button>
      </div>
    </form>
  );
}

export default NewTodo;
