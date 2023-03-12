import React from 'react';
import styles from './TodoList.module.scss';
import { Todo } from '../model/todo';

interface TodoListProps {
  items: Todo[];

  onDelete(id: string): void;
}

function TodoList(props: TodoListProps) {
  const deleteClickHandler = (id: string) => {
    props.onDelete(id);
  };
  return (
    <ul className={styles.list}>
      {props.items.map(todo => <li key={todo.id}>
        <span>{todo.text}</span>
        <button onClick={deleteClickHandler.bind(null, todo.id)}>DELETE</button>
      </li>)}
    </ul>
  );
}

export default TodoList;
