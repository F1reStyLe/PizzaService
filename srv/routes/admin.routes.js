const Router = require('express');
const adminRouter = new Router();
const pizzaRouter = require('./pizza.routes');
const staffRouter = require('./staff.routes');
const userRouter = require('./user.routes');

adminRouter.use('/pizza', pizzaRouter);
adminRouter.use('/staff', staffRouter);
adminRouter.use('/user', userRouter);

module.exports = adminRouter;