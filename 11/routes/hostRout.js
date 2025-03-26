const express = require("express");
const hostRouter = express.Router();

hostRouter.get("/", (req, res) => {
  res.send(`
    <h1>Home page</h1>
    <a href="/user">Add Home</a>
    `);
});


exports = module.exports = hostRouter;
