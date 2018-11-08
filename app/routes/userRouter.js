const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

const passport = require('passport');
require('../services/passport');

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:userId', userController.getUser);
userRouter.post('/login', userController.userLogin);
userRouter.post('/', userController.createUser);
userRouter.put('/:userId', userController.updateUser);

module.exports = userRouter;