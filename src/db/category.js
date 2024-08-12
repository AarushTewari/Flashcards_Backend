import {pool} from './database.js'

export const createCategory = async (name) => {
    const [result] = await pool.query(`
    INSERT INTO Category (name)
    VALUES (?)
    `, [name])
    return result.insertId
}