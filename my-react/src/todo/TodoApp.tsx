import React, { useState } from 'react';
import './TodoApp.css';
import TodoList from './todo-list/TodoList';
import NewTodo from './new-todo/NewTodo';
import { Todo } from './model/todo';

function TodoApp() {
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

export default TodoApp;
