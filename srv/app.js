const express = require('express');
const userRouter = require('./routes/user.routes');

const app = express();
const host = 'localhost';
const port = 7000;

app.use(express.json());
app.use('/api', userRouter);

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`);
});