import express from 'express';
import { auth } from "../middleware/authMiddleware.js"
import { createFlashcard, flashcardList } from '../controllers/flashcardController.js';

export const flashcardRouter = express.Router();

flashcardRouter.get("/list", auth, flashcardList);
flashcardRouter.post("/create", auth, createFlashcard);