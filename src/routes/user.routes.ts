import { Router } from 'express';
import { register, signIn } from '../controllers/user.controller';
import {
    validEmail,
} from '../middlewares/user.middleware';

const userRouter = Router();
userRouter.post('/sign-in', validEmail, signIn);
userRouter.post('/sign-up', validEmail, register);

export default userRouter;
