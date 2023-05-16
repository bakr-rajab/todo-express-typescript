import { Router } from 'express';
import { validToken } from '../middlewares/user.middleware';
import { create, deleteOne, getAll, getInfo } from '../controllers/todo.controller';

const todoRouter = Router();
todoRouter.post('/create', validToken, create);
todoRouter.get('/:todo', validToken, getInfo);
todoRouter.delete('/:todo', validToken, deleteOne);
todoRouter.get('/', validToken, getAll);

export default todoRouter;
