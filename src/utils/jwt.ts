import jwt, { SignOptions } from "jsonwebtoken";

import type { StringValue } from "ms";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
}

export const signToken = (
    payload: string | object | Buffer,
    expiresIn: number | StringValue
) => {
    const options: SignOptions = { expiresIn };
    return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
};
