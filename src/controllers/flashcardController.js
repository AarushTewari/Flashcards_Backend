import { getFlashcards, addFlashcard, getFlashcard, changeFlashcard } from "../db/flashcards.js";

export const flashcard = async (req, res) => {
    const user = req.user;
    const id = req.params.id;
    try {
        const result = await getFlashcard(id);
        if (!result) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }
        if (result.user_id === user.id) {
            res.status(200).json({ data: result });
        } else {
            res.status(403).json({ error: "You are not allowed here" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const flashcardList = async (req, res) => {
    const user = req.user;
    const category = req.query.category || null; 
    try {
        const result = await getFlashcards(user.id, category);
        res.status(200).json({ data: result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const createFlashcard = async (req, res) => {
    const user = req.user;
    const { question, answer, difficulty, category } = req.body;
    if (!question || !answer || !difficulty || !category) {
        return res.status(400).json({ error: "Insufficient data" });
    }
    try {
        await addFlashcard(question, answer, difficulty, category, user.id);
        res.status(201).json({ message: "Created flashcard" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const updateFlashcard = async (req, res) => {
    const user = req.user;
    const { question, answer } = req.body;
    const id = req.params.id;
    if (!question || !answer) {
        return res.status(400).json({ error: "Insufficient data" });
    }
    try {
        const result = await getFlashcard(id);
        if (!result) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }
        if (result.user_id !== user.id) {
            return res.status(403).json({ error: "You are not allowed here" });
        }
        await changeFlashcard(question, answer, id);
        res.status(200).json({ message: "Changed flashcard" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
