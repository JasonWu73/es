import React, { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import { Todo } from './todo.model';

function App() {
  const [ todos, setTodos ] = useState<Todo[]>([]);
  const addTodoHandler = (todo: Todo) => {
    setTodos(prevTodo => {
      return [ todo, ...prevTodo ];
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
