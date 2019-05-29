const express = require('express');
const app = express();

app.get('/', (req,res) => {
    return res.json({message: "Hello World 2"});
});

app.listen(5000);