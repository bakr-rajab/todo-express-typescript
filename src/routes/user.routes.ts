import { Router } from 'express';
import { signIn } from '../controllers/user.controller';
import {
    validEmail,
} from '../middlewares/user.middleware';

const userRouter = Router();
userRouter.post('/sign-in', validEmail, signIn);

export default userRouter;
