const Router = require('express');
const router = new Router();

const StaffController = require('../controller/staff.controller');
const PizzaController = require('../controller/pizza.controller');
const userController = require('../controller/user.controller');

// staff
router.get('/staff/', StaffController.getEmployees);
router.get('/staff/:id', StaffController.getEmployee);
router.post('/staff/', StaffController.createEmployee);
router.put('/staff/', StaffController.updateEmployee);
router.delete('/staff/:id', StaffController.deleteEmployee);

// pizza
router.get('/pizza/', PizzaController.getMenu);
router.get('/pizza/:id', PizzaController.getPizza);
router.post('/pizza/', PizzaController.createUser);
router.put('/pizza/', PizzaController.updatePizza);
router.delete('/pizza/:id', PizzaController.deletePizza);

// users
router.get('/user/', userController.getUsers);
router.get('/user/:id', userController.getUser);
router.post('/user/', userController.createUser);
router.put('/user/', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

module.exports = router;