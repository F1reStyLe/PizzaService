const express = require('express');
const app = express();
const host = 'localhost';
const port = 7000;
const userRouter = require('./routes/user.routes');
const pizzaRouter = require('./routes/pizza.routes');
const staffRouter = require('./routes/staff.routes');

app.use(express.json());
app.use('/user', userRouter);
app.use('/pizza', pizzaRouter);
app.use('/staff', staffRouter);

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`);
});