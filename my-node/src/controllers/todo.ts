import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Todo } from '../models/todo';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);
  res.status(201).send({ message: 'Created the todo.', createTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.send(TODOS);
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const id = req.params.id;
  const todo = TODOS.find((todo: Todo) => {
    return todo.id === id;
  });
  if (!todo) {
    throw Error('Could not found todo!');
    // res.status(404).send({ message: 'Could not found todo!' });
    // return;
  }

  todo.text = (req.body as { text: string }).text;
  res.status(200).send({ message: 'Updated!', updateTodo: todo });
};

export function deleteTodo(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  const id = req.params.id;
  const todoIndex = TODOS.findIndex((todo: Todo) => todo.id === id);
  if (todoIndex === -1) {
    throw Error('Could not found todo!');
  }

  TODOS.splice(todoIndex, 1);
  res.status(200).send({ message: 'Deleted!' });
}
