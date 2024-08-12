import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

export const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise()


export const createCategory = async (name) => {
    const [result] = await pool.query(`
    INSERT INTO Category (name)
    VALUES (?)
    `, [name])
    return result.insertId
}

// const result = await createCategory("DSA")
// console.log(result)