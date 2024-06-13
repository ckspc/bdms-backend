import { Request, Response } from 'express';
import { getAllTodos, getTodoById, addTodo, updateTodo, deleteTodo } from '../services/todos';
import { Todo } from '../models/todos';
import { sendResponse } from '../helpers/response';

export const getTodos = (req: Request, res: Response) => {
  const todos = getAllTodos();
  sendResponse(res, 200, true, todos, 'Todos retrieved successfully');
};

export const getTodo = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const todo = getTodoById(id);
  if (todo) {
    sendResponse(res, 200, true, todo, 'Todo retrieved successfully');
  } else {
    sendResponse(res, 404, false, null, 'Todo not found');
  }
};

export const createTodo = (req: Request, res: Response) => {
  const newTodo: Todo = req.body;
  const success = addTodo(newTodo);
  if (success) {
    sendResponse(res, 201, true, newTodo, 'Todo created successfully');
  } else {
    sendResponse(res, 400, false, null, 'Todo ID already exists');
  }
};

export const modifyTodo = (req: Request, res: Response) => {
  const updatedTodo: Todo = req.body;
  const success = updateTodo(updatedTodo);
  if (success) {
    sendResponse(res, 200, true, updatedTodo, 'Todo updated successfully');
  } else {
    sendResponse(res, 404, false, null, 'Todo not found');
  }
};

export const removeTodo = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const success = deleteTodo(id);
  if (success) {
    sendResponse(res, 204, true, null, 'Todo deleted successfully');
  } else {
    sendResponse(res, 404, false, null, 'Todo not found');
  }
};
