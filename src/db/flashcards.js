import {pool} from './database.js'

export const getFlashcard = async (id) => {
    try {
       const [rows] = await pool.query(
            `SELECT * FROM Flashcards WHERE id = ?`, 
            [id]
        )
        return rows[0]; 
    } catch(err) {
        throw err;
    }
}

export const getFlashcards = async (user_id, category) => {
    try {
        if(category) {
            const [rows] = await pool.query(
                `SELECT * FROM Flashcards WHERE category_id = (select id from Category where name = ?) and user_id = ?`, 
                [category, user_id]
            )
            return rows;
        } else {
            const [rows] = await pool.query(
                `SELECT * FROM Flashcards WHERE user_id = ?`, 
                [user_id]
            )
            return rows;
        }
    } catch(err) {
        throw err;
    }
}

export const addFlashcard = async (question, answer, difficulty, cat_name, user_id) => {
    try{
        const [res] = await pool.query(
            `INSERT INTO Flashcards (question, answer, difficulty, category_id, user_id)
            VALUES (?, ?, ?, (select id from Category where name = ?), ?)`,
            [question, answer, difficulty, cat_name, user_id]
        )
        return res.insertId;
    } catch(err) {
        throw err;
    }
}

export const changeFlashcard = async (question, answer, id) => {
    try {
        const [res] = await pool.query(
            `UPDATE Flashcards SET question = ?, answer = ? WHERE id = ?`,
            [question, answer, id]
        )
        return res;
    } catch(err) {
        throw err;
    }
}

// const res = await updateFlashcard("Hi", "Hello", 1);


