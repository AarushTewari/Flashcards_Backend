import express from 'express';
import { register, login } from "../controllers/authController.js";
import { auth } from "../middleware/authMiddleware.js"

export const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
// authRouter.get('/me', auth, async (req, res) => {
//     res.send(req.user)
// })

