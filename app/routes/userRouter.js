const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:userId', userController.getUser);
userRouter.post('/create', userController.createUser);

module.exports = userRouter;