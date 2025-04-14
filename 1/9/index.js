const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send(`<form action="/" method="post">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" placeholder="Enter your name">
        <button type="submit">Submit</button>`)
});
app.post('/', (req, res) => {
    res.send(`Hello! you details are submitted successfully.`);
});
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});