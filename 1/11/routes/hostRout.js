const express = require("express");
const hostRouter = express.Router();

const path=require("path");

hostRouter.get("/", (req, res) => {
  // res.send(`
  //   <h1>Home page</h1>
  //   <a href="/user">Add Home</a>
  //   `);
  res.sendFile(path.join(__dirname,"..","views","home.html"));
});

hostRouter.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname,"..","views","err404.html"));
}); 

exports = module.exports = hostRouter;
