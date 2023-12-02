const Router = require('express');
const router = new Router();
const controller = require('../controller/auth.controller');
const {check} = require("express-validator");

router.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 8 и меньше 16 символов").isLength({min:8, max:16})
], controller.registration)
router.post('/login', controller.login)

module.exports = router