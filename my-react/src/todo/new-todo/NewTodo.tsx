import React, { useState } from 'react';
import styles from './NewTodo.module.scss';
import { Todo } from '../model/todo';
import ErrorModal from '../modal/ErrorModal';

interface NewTodoProps {
  onAdd(todo: Todo): void;
}

function NewTodo(props: NewTodoProps) {
  const [ todoText, setTodoText ] = useState('');
  const [ errTitle, setErrTitle ] = useState('');
  const [ errMsg, setErrMsg ] = useState('');

  const resetErr = () => {
    setErrTitle('');
    setErrMsg('');
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (!todoText) {
      setErrTitle('Invalid input');
      setErrMsg('Please enter a non-empty text.');
      return;
    }

    props.onAdd({ id: Math.random().toString(), text: todoText });
    resetErr();
    setTodoText('');
  };

  const todoChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const todoText = event.target.value.trim();
    setTodoText(todoText);
  };

  const errorCloseHandler = () => {
    resetErr();
  };

  return (
    <>
      {errTitle && <ErrorModal
        title={errTitle}
        message={errMsg}
        onClose={errorCloseHandler}
      />}
      <form onSubmit={submitHandler} className={styles.form}>
        <label htmlFor="todo">Todo Text</label>
        <input
          type="text"
          id="todo"
          value={todoText}
          onChange={todoChangeHandler}
        />
        <button type="submit">ADD TODO</button>
      </form>
    </>
  );
}

export default NewTodo;
