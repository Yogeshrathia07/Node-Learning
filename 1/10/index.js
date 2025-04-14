const express = require('express');
const app = express();

const path = require('path');
const rootDir = require('./utils/pathUtil');

const userRouter = require('./routes/userRouter');
const hostRouter = require('./routes/hostRouter');

app.use(express.static(path.join(rootDir, 'public')));

app.use(express.urlencoded({extended: true}));
app.use("/host",userRouter);
app.use(hostRouter);
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '/views/err404.html'));
});

// Start the server
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});