const dotenv = require('dotenv');
dotenv.config();
const db = require('../db')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const secret = process.env.SECRETKEY;

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const {username, password} = req.body;
            const candidate = await db.query(`select 1 from userlist where username = $1;`,[username]);
            if (candidate.rows.length) {
                return res.status(400).json({message: "Пользователь с таким именем уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = await db.query(`insert into userlist (username, password, role)
                                        values ($1, $2, $3)
                                    returning username;`, [username, hashPassword, 3]);
            return res.json({message: `Пользователь ${username} зарегистрирован`})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const userInfo = await db.query(`select id, username, password from userlist where username = $1`,[username]);
            if (!userInfo.rows.length) {
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            const user = userInfo.rows[0];
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }
            const token = generateAccessToken(user.id, user.role)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }
}

module.exports = new authController()