import { db } from "../config"


// used raw query for fast development, ORM can be used for database communication purpose
const createUser = async () => {
    try {
        const query = `INSERT INTO users (id) VALUES (DEFAULT) RETURNING *`
        const result = await db.query(query)
        return result.rows[0]
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getUserById = async (id: string) => {
    try {
        const query = `SELECT * FROM users WHERE id = $1`
        const values = [id]
        const result = await db.query(query, values)
        return result.rows[0]
    } catch (error) {
        throw error;
    }
}

const updateScore = async (id: string, score: number) => {
    try {
        const query = `UPDATE users SET score = score + $1 WHERE id = $2`
        const values = [score, id]
        await db.query(query, values)
    } catch (error) {
        throw error;
    }
}

export default { createUser, getUserById, updateScore }