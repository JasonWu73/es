import React, { useRef, useState } from 'react';
import styles from './NewTodo.module.scss';
import { Todo } from '../model/todo';
import ErrorModal from '../modal/ErrorModal';

interface NewTodoProps {
  onAdd(todo: Todo): void;
}

interface InputError {
  title: string,
  message: string
}

type InputErrorOrNull = InputError | null;

function NewTodo(props: NewTodoProps) {
  const todoTextRef = useRef<HTMLInputElement>(null);
  const [ error, setError ] = useState<InputErrorOrNull>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const todoText = (todoTextRef.current! as HTMLInputElement).value.trim();
    if (!todoText) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a non-empty text.'
      });
      return;
    }

    props.onAdd({ id: Math.random().toString(), text: todoText });
    setError(null);
    (todoTextRef.current! as HTMLInputElement).value = '';
  };

  return (
    <>
      {error && <ErrorModal
        title={error.title}
        message={error.message}
        onConfirm={() => setError(null)}
      />}
      <form onSubmit={submitHandler} className={styles.form}>
        <label htmlFor="todo">Todo Text</label>
        <input type="text" id="todo" ref={todoTextRef}/>
        <button type="submit">ADD TODO</button>
      </form>
    </>
  );
}

export default NewTodo;
