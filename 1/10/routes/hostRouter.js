const express = require('express');
const hostRouter = express.Router();
const path = require('path');

hostRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home.html'));
});

module.exports = hostRouter;