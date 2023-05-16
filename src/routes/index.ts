import { Router } from 'express';
import userRouter from './user.routes';
import { validToken } from '../middlewares/user.middleware';
import todoRouter from './todo.routes';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/todo', validToken, todoRouter);

export default routes;
