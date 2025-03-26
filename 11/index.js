const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const userRouter = require("./routes/userRout");
const hostRouter = require("./routes/hostRout");
app.use("/user",userRouter);
app.use(hostRouter);

// If request not recieved by any of the above routes:
app.use((req, res) => {
  res.send(`
      <h1>404 Not Found</h1>
      `);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
