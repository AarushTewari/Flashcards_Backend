import express from 'express';
import { auth } from "../middleware/authMiddleware.js"
import { createFlashcard, flashcard, flashcardList, updateFlashcard } from '../controllers/flashcardController.js';

export const flashcardRouter = express.Router();

flashcardRouter.get("/list", auth, flashcardList);
flashcardRouter.get("/:id", auth, flashcard);
flashcardRouter.post("/create", auth, createFlashcard);
flashcardRouter.post("/update/:id", auth, updateFlashcard);
