const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller');
const PizzaController = require('../controller/pizza.controller');

router.get('/user', userController.getUsers);
router.get('/user/:id', userController.getUser);
router.post('/user', userController.createUser);
router.put('/user', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

router.get('/pizza', PizzaController.getMenu);
router.get('/pizza/:id', PizzaController.getPizza);
router.post('/pizza', PizzaController.createUser);
router.put('/pizza', PizzaController.updateUser);
router.delete('/pizza/:id', PizzaController.deleteUser);

module.exports = router;