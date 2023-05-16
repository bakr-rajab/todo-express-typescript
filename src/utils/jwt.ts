// import jwt, { JwtPayload } from 'jsonwebtoken';

const jwt = require('jsonwebtoken');

import config from '../config';

const signToken = async (payload: Record<string, unknown>): Promise<string> => {
    return jwt.sign(payload, config.app.jwtSecret, { expiresIn: '24h' });
};

const verifyToken = async (
    token: string
): Promise<any> => {
    try {
        const decodedToken = await jwt.verify(token, config.app.jwtSecret);
        // console.log({decodedToken});
        return decodedToken;
    } catch {
        // throw Error("Invalid Token")
        return false
    }
};

export { signToken, verifyToken };
