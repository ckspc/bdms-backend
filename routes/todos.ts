import { Router } from 'express';
import { getTodos, getTodo, createTodo, modifyTodo, removeTodo } from '../controllers/todos';

const router = Router();

router.get('/todos', getTodos);
router.get('/todos/:id', getTodo);
router.post('/todos', createTodo);
router.put('/todos/:id', modifyTodo);
router.delete('/todos/:id', removeTodo);

export default router;
