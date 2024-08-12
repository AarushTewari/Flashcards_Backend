import { pool } from './database.js'

export const createUser = async (name, email, password) => {
    try{
        const [result] = await pool.query(
            `INSERT INTO Users (name, email, password) 
            VALUES (?, ?, ?)
            `, [name, email, password]
        );
        return result.insertId;
    } catch(err) {
        throw err;
    }
}

export const getUserById = async (id) => {
    try{ 
        const [result] = await pool.query(
            `SELECT * FROM Users WHERE id = ?`, [id]
        );
        return result[0];
    } catch(err) {
        throw err;
    }
}

export const getUser = async (email) => {
    try{ 
        const [result] = await pool.query(
            `SELECT * FROM Users WHERE email = ?`, [email]
        );
        return result[0];
    } catch(err) {
        throw err;
    }
}

const res = await getUser('tewariaarush@gmail.com')
console.log(res.email);



