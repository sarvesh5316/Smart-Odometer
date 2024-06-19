const userRoutes = require('express').Router();
const UserController = require('../controllers/userController')

userRoutes.post('/createAccount', UserController.createAccount);
userRoutes.post('/signin', UserController.signIn);
userRoutes.get('/profile', UserController.getProfile);
userRoutes.post('/updateProfile', UserController.updateProfile);
module.exports = userRoutes;