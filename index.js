import express from 'express'
import userRouter from './routes/usersRoute.js';

const port = process.env.PORT || 3000;
const app = express()

app.use(express.static('public'))
app.use(express.json())

app.use('/', userRouter)

app.listen(port, () => {
    console.log('http:localhost:'+port);
})