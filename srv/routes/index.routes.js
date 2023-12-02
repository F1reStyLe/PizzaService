const Router = require('express');
const router = new Router();

const authRouter = require('../routes/auth.routes');
const adminRouter = require('./admin.routes')

router.use('/admin', adminRouter);
router.use('/auth', authRouter);

module.exports = router;