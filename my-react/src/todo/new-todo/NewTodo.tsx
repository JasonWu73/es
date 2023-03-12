import React, { useState } from 'react';
import styles from './NewTodo.module.scss';
import { Todo } from '../model/todo';

interface NewTodoProps {
  onAdd(todo: Todo): void;
}

function NewTodo(props: NewTodoProps) {
  const [ todoText, setTodoText ] = useState('');

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    props.onAdd({ id: Math.random().toString(), text: todoText });
    setTodoText('');
  };

  const todoChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div>
        <label htmlFor="todo">Todo Text</label>
        <input
          type="text"
          id="todo"
          value={todoText}
          onChange={todoChangeHandler}
        />
      </div>
      <div>
        <button type="submit">ADD TODO</button>
      </div>
    </form>
  );
}

export default NewTodo;
