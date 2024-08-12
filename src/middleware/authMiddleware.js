import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { getUserById } from '../db/users.js'

dotenv.config()

export const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await getUserById(decoded.userId)

        if(!user) {
            throw new Error()
        }
        req.user = user;
        next();
    } catch(err) {
        res.status(400).json({
            err: "Please authenticate"
        })
    }
}