const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.post('/create', userController.createUser);
userRouter.get('/', userController.getAllUsers);
userRouter.get('/:userId', userController.getUser);

module.exports = userRouter;