import { Request, Response, NextFunction } from 'express';
import { getUserByEmail, getUserById, USER } from '../models/user.model';
import { verifyToken } from '../utils/jwt';

const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const validEmail = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    if (email !== '' && email.match(emailFormat)) {
        next();
    } else {
        res.status(400).send({ msg: 'Invalid email' });
    }
};


const validToken = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({ msg: 'You should provide a token' });
    }
    token = token.split(' ')[1];
    const decodeToken = await verifyToken(token);
    if (decodeToken === false) {
        return res.status(401).send({ msg: 'Not a Valid token' });
    }

    const user: USER | null = await getUserById(decodeToken._id);
    // console.log({user});
    
    if (user === null) {
        return res.status(404).send({ msg: 'User not found' });
    }
    // user.password = undefined;
    res.locals.user = user;
    next();
};



export { validEmail, validToken, };
