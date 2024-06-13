import { Todo } from '../models/todos';
import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(__dirname, '../data/todos.json');

const readTodosFromFile = (): Todo[] => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const writeTodosToFile = (todos: Todo[]): void => {
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
};

export const getAllTodos = (): Todo[] => readTodosFromFile();

export const getTodoById = (id: number): Todo | undefined => {
  const todos = readTodosFromFile();
  return todos.find(todo => todo.id === id);
};

export const addTodo = (todo: Todo): boolean => {
  const todos = readTodosFromFile();
  if (todos.some(existingTodo => existingTodo.id === todo.id)) {
    return false;
  }
  todos.push(todo);
  writeTodosToFile(todos);
  return true;
};

export const updateTodo = (updatedTodo: Todo): boolean => {
  const todos = readTodosFromFile();
  const index = todos.findIndex(todo => todo.id === updatedTodo.id);
  if (index !== -1) {
    todos[index] = updatedTodo;
    writeTodosToFile(todos);
    return true;
  }
  return false;
};

export const deleteTodo = (id: number): boolean => {
  let todos = readTodosFromFile();
  const initialLength = todos.length;
  todos = todos.filter(todo => todo.id !== id);
  if (todos.length !== initialLength) {
    writeTodosToFile(todos);
    return true;
  }
  return false;
};
