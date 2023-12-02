const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller');


router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.put('/', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.delete('/', userController.deleteUsers);

module.exports = router;