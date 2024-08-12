import { getFlashcards, addFlashcard } from "../db/flashcards.js";

export const flashcardList = async (req, res) => {
    const user = req.user;
    const category = req.query.category || null; 
    try {
        const result = await getFlashcards(user.id, category);
        res.status(200).json({
            data: result
        })
    } catch(err) {
        res.status(500).json({
            error: err
        })
    }
}

export const createFlashcard = async (req, res) => {
    const user = req.user;
    const { question, answer, difficulty, category } = req.body;
    if(!question || !answer || !difficulty || !category) {
        res.status(400).json({
            error: "Insufficient data"
        })
        return;
    }
    try {
        await addFlashcard(question, answer, difficulty, category, user.id);
        res.status(201).json({
            message: "Created flashcard"
        });
    } catch(err) {
        res.status(500).json({
            error: err
        });
    }
}