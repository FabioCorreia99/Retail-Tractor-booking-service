const express = require('express');
const app = express();

app.use(express.json());

const logger = require('./utils/logger');

const { errorHandler } = require("./middlewares/error-handler");

app.use("/bookings", require("./routes/bookings.routes.js"));

app.use((req, res, next) => {
    logger.warn(`404 Not Found: ${req.originalUrl}`);
    const err = new Error("Endpoint not found....");
    err.statusCode = 404;
    next(err);
});

app.use(errorHandler);

module.exports = app;   