import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utility/jwt";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error("Null token")
        }

        (req as CustomRequest).token = verifyToken(token);

        next();
    } catch (error) {
        res.status(401).json({ error: 'Auth failed' });
    }
}

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}