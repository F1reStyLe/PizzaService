const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();
const host = 'localhost';
const cors = require('cors');
const port = 7000;
const userRouter = require('./routes/user.routes');
const pizzaRouter = require('./routes/pizza.routes');
const staffRouter = require('./routes/staff.routes');
const Routes = require('./routes/index.routes');
const schema = require('./graphql/schemas')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/user', userRouter);
app.use('/pizza', pizzaRouter);
app.use('/staff', staffRouter);
app.use('/', Routes);

app.use('/graphql', graphqlHTTP({
    schema: schema
}))

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