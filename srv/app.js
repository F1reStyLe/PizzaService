const express = require('express');
const app = express();
const host = 'localhost';
const cors = require('cors');
const port = 7000;
const userRouter = require('./routes/user.routes');
const pizzaRouter = require('./routes/pizza.routes');
const staffRouter = require('./routes/staff.routes');
const authRouter = require('./routes/auth.routes');
const adminRouter = require('./routes/admin.routes');

app.use(express.json());
app.use(cors());
app.use('/user', userRouter);
app.use('/pizza', pizzaRouter);
app.use('/staff', staffRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);

const runServer = async () => {
    try{
        app.listen(port, host, function () {
            console.log(`Server listens http://${host}:${port}`);
        });
    } catch (err) {
        console.log(e);
    }
}

runServer();