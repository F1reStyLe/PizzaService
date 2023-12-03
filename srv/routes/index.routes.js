const Router = require('express');
const router = new Router();

const authRouter = require('../routes/auth.routes');
const adminRouter = require('./admin.routes');
const basketRouter = require('./basker.routes');

router.use('/admin', adminRouter);
router.use('/auth', authRouter);
router.use('/basket', basketRouter);

module.exports = router;