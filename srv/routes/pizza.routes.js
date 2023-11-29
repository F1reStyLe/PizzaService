const Router = require('express');
const router = new Router();
const PizzaController = require('../controller/pizza.controller');

router.get('/', PizzaController.getMenu);
router.get('/:id', PizzaController.getPizza);
router.post('/', PizzaController.createUser);
router.put('/', PizzaController.updateUser);
router.delete('/:id', PizzaController.deleteUser);

module.exports = router;