const express = require("express");
const app = express();

// For parsing JSON data
app.set("view engine", "ejs");
app.set("views", "views");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const path=require('path');
const rootDir = require('./utils/pathUtil');
app.use(express.static(path.join(rootDir, 'public')));

const {userRouter} = require("./routes/userRout");
const hostRouter = require("./routes/hostRout");
app.use("/user",userRouter);
app.use(hostRouter);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
