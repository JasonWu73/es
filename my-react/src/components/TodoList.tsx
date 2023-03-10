import React from 'react';
import styles from './TodoList.module.scss';

interface TodoListProps {
  items: { id: string, text: string } [];
}

function TodoList(props: TodoListProps) {
  return (
    <ul className={styles.list}>
      {props.items.map(todo => <li key={todo.id}>{todo.text}</li>)}
    </ul>
  );
}

export default TodoList;
