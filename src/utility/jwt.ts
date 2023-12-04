import { config } from "../config/config";
import { ICompanyOutput } from "../models/interfaces/company";
import jwt from 'jsonwebtoken'

const secretKey = config.jwt.secretKey
const generateToken = (com: ICompanyOutput) => {
    const token = jwt.sign(com, secretKey, {
        expiresIn: '30m',
    });
    return token
}

const verifyToken = (token: string) => {
    return jwt.verify(token, secretKey);
}

export { generateToken, verifyToken }