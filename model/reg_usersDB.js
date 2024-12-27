import { pool } from '../config/config.js'

const getUsersDB = async () => {
    try {
        const [data] = await pool.query(`
            SELECT * FROM reg_users
        `);
        return data
    } catch (error) {
        console.error('Error retrieving users:', error);
        throw new Error(`Failed to retrieve users: ${error.message}`)
    }
}

const getUserDB = async (id) => {
    if (!id) {
        throw new Error('User ID is required')
    }
    try {
        const [[data]] = await pool.query(`
            SELECT * FROM reg_users
            WHERE user_id = ?
        `, [id]);
        if (!data) {
            throw new Error(`User with ID ${id} not found`)
        }
        return data
    } catch (error) {
        console.error('Error retrieving user:', error);
        throw new Error(`Failed to retrieve user with ID ${id}: ${error.message}`)
    }
}

const addUserDB = async (firstName, lastName, gender, country, city, region, email, password) => {
    if (!firstName || !lastName || !email || !password) {
        throw new Error('All fields are required')
        }
        try {
            await pool.query(`
                INSERT INTO reg_users (user_name, user_surname, user_gender, user_country, user_city, user_region, user_email, user_pwd)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                `, [firstName, lastName, gender, country, city, region, email, password]);
        } catch (error) {
            console.error('Error adding user:', error);
            throw new Error(`Failed to add user: ${error.message}`)
        }
}

const updateUserDB = async (firstName, lastName, gender, country, city, region, email, password, id) => {
    if (!id) {
        throw new Error('User ID is required')
    }
    if (!firstName || !lastName || !email || !password) {
        throw new Error('All fields are required')
    }
    try {
        await pool.query(`
            UPDATE reg_users
            SET user_name = ?, 
            user_surname = ?, 
            user_gender = ?, 
            user_country = ?, 
            user_city = ?, 
            user_region = ?, 
            user_email = ?, 
            user_pwd = ?
            WHERE user_id = ?
            `, [firstName, lastName, gender, country, city, region, email, password, id]
        );
        return true
    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error(`Failed to update user with ID ${id}: ${error.message}`)
    }
}

const deleteUserDB = async (id) => {
    if (!id) {
        throw new Error('User ID is required')
    }
    try {
        await pool.query(`
            DELETE FROM reg_users
            WHERE user_id = ?
            `, [id]);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error(`Failed to delete user with ID ${id}: ${error.message}`)
    }
}

const loginUserDB = async (email) => {
    if (!email) {
        throw new Error('Email is required')
    }
    try {
        const [[data]] = await pool.query(`
            SELECT * FROM reg_users
            WHERE user_email = ?
        `, [email]);
        if (!data) {
            throw new Error(`User with email ${email} not found`)
        }
        return data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw new Error(`Failed to log in user with email ${email}: ${error.message}`)
    }
}

export { getUsersDB, getUserDB, addUserDB, updateUserDB, deleteUserDB, loginUserDB }