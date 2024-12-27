import express from 'express'
import { fetchUsers, fetchUser, addUser, updateUser, deleteUser, loginUser } from '../controller/reg_usersFunc.js'
import { checkUser } from '../middleware/authenticate.js'

const userRouter = express.Router()

userRouter.get('/users', fetchUsers)
        .get('/user/:id', fetchUser)
        .post('/register', addUser)
        .post('/login', checkUser, loginUser)
        .patch('/user/:id', updateUser)
        .delete('/user/:id', deleteUser)

export default userRouter