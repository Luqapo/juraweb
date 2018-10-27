const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public/'));

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log(`Server listen at port ${PORT}`);
})