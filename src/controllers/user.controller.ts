import { Request, Response } from 'express';
var bcrypt = require('bcryptjs');
import {
    USER,
    getUserByEmail,
} from '../models/user.model';
import { signToken } from '../utils/jwt';

const signIn = async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body;

        const user: USER | null = await getUserByEmail(email);
        console.log({ user });

        if (user === null) {
            return res
                .status(401)
                .send({ msg: 'Username of password might not be correct' });
        }
        const equal = await bcrypt.compare(
            password,
            user.password as string
        );
        if (equal === false) {
            return res
                .status(401)
                .send({ msg: 'Username of password might not be correct' });
        }
        const token = await signToken({ email: user.email, _id: user._id });
        return res.send({ token: token });
    } catch (error) {
        return res.status(500).send(error);
    }
};
export { signIn };
