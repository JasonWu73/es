import { useState } from 'react';
import './TodoApp.scss';
import TodoList from './todo-list/TodoList';
import NewTodo from './new-todo/NewTodo';
import { Todo } from './model/todo';

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const addTodoHandler = (todo: Todo) => {
    setTodos(prevTodos => {
      return [todo, ...prevTodos];
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
