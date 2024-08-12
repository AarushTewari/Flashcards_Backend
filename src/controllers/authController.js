import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { createUser, getUser } from '../db/users.js'
import validator from 'validator';
import dotenv from 'dotenv'

dotenv.config();

const generateAccessToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, { expiresIn: "7d"});
};

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if(!email || !password || !name) {
        res
            .status(400)
            .json({
                error: "Insufficient data"
            });
        return;
    }
    if(!validator.isEmail(email)) {
        res
            .status(400)
            .json({
                error: "Invalid email"
            });
        return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
        await createUser(name, email, hashedPassword);
        res.status(201).json({ 
            message: "User created successfully!" 
        });
    } catch (err) {
        res.status(400).json({
            error: err
        });
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        res
            .status(400)
            .json({
                error: "Insufficient data"
            });
        return;
    }
    if(!validator.isEmail(email)) {
        res
            .status(400)
            .json({
                error: "Invalid email"
            });
        return;
    }

    try {
        const user = await getUser(email);
        if(!user) {
            res.status(400).json({
                error: "No use with this email"
            })
            return;
        }
        const comparePassword = await bcrypt.compare(
            password, 
            user.password
        );

        if(comparePassword) {
            res.status(200).json({
                id: user.id,
                email: user.email,
                access_token: generateAccessToken(user.id)
            })
        } else {
            res.status(400).json({
                error: "Invalid creds"
            })
        }
    } catch(err) {
        res.status(400).json({ error: "Hi" });
    }


}