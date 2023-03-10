import React, { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

function App() {
  const [ todos, setTodos ] = useState([ {
    id: 't1',
    text: 'Finish the course'
  } ]);
  const addTodoHandler = (todo: { id: string, text: string }) => {
    setTodos(prevTodo => {
      prevTodo.push(todo);
      return prevTodo;
    });
  };
  return (
    <div className="app">
      <NewTodo onAdd={addTodoHandler}/>
      <TodoList items={todos}/>
    </div>
  );
}

export default App;
