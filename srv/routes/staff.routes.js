const Router = require('express');
const router = new Router();
const StaffController = require('../controller/staff.controller');

router.get('/', StaffController.getEmployees);
router.get('/:id', StaffController.getEmployee);
router.post('/', StaffController.createEmployee);
router.put('/', StaffController.updateEmployee);
router.delete('/:id', StaffController.deleteEmployee);

module.exports = router;