const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:userId', userController.getUser);
userRouter.post('/create', userController.createUser);
userRouter.put('/:userId/update', userController.updateUser);

module.exports = userRouter;