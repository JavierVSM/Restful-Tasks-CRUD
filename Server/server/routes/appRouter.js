const express = require ('express');
const AppRouter = express.Router();
const {AppController} = require('../controllers/appController');

AppRouter
    .get ('/tasks', AppController.getIndex);

AppRouter
    .get ('/tasks/:id', AppController.display);

AppRouter
    .post ('/tasks', AppController.add);

AppRouter
    .put ('/tasks/:id', AppController.edit);

AppRouter
    .delete ('/tasks/:id', AppController.delete);

module.exports={AppRouter};