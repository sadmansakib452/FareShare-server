const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const healthRoutes = require('./routes')
const { notFoundHandler, errorHandler } = require("./error");
const routes = require('../routes/index')

const middleware = [
    morgan('dev'),
    cors(),
    express.json(),
    healthRoutes,
    routes,
    notFoundHandler,
    errorHandler,
]

module.exports = middleware