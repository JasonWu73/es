import React, { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import { Todo } from './todo.model';

function App() {
  const [ todos, setTodos ] = useState<Todo[]>([]);
  const addTodoHandler = (todo: Todo) => {
    setTodos(prevTodos => {
      return [ todo, ...prevTodos ];
    });
  };
  const todoDeleteHandler = (id: string) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id !== id);
    });
  };
  return (
    <div className="app">
      <NewTodo onAdd={addTodoHandler}/>
      <TodoList items={todos} onDelete={todoDeleteHandler}/>
    </div>
  );
}

export default App;
