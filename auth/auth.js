import bcrypt from 'bcryptjs';
import 'dotenv/config.js';
import jwt from 'jsonwebtoken';
const encrypt = async (password) => {
    try {
        let salt = await bcrypt.genSalt(Number(process.env.SALT));
        let hashed = await bcrypt.hash(password, salt);
        return hashed;
    } catch (err) {
        throw err;
    }
}
const compare = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (err) {
        throw err;
    }
}

const createToken = (payload) => {
    try {
        return jwt.sign(
            payload,
            process.env.JWT,
            { expiresIn: '1m' }
        );
    } catch (error) {
        throw error;
    }
}

const decodeToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw error;
    }
}

export default {
    encrypt,compare,createToken,decodeToken
}
