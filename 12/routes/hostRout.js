const express = require("express");
const { register } = require("module");
const hostRouter = express.Router();
const path=require("path");

const {userRouter,data} = require("./userRout");

hostRouter.get("/", (req, res) => {
  // res.send(`
  //   <h1>Home page</h1>
  //   <a href="/user">Add Home</a>
  //   `);
  console.log("Home page accessed",data);
  // res.sendFile(path.join(__dirname,"..","views","home.ejs"));
  // res.render("home", { homes: data });
  res.render("home", { homes: data ,title:"Dynamic name"});

});

hostRouter.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname,"..","views","err404.html"));
}); 

exports = module.exports = hostRouter;
