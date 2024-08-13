import {pool} from './database.js'

export const createCategory = async (name) => {
    const [result] = await pool.query(`
    INSERT INTO Category (name)
    VALUES (?)
    `, [name])
    return result.insertId
}

export const getCategories = async () => {
    try{
        const [result] = await pool.query(
            `
                SELECT * FROM Category
            `
        )
        return result;
    } catch(err) {
        throw err;
    }
}