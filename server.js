const express = require('express');
const app = express();
const data = require('./data/data')
const path = require('path');
const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => res.json(data));

app.listen(3000, () => console.log('yay, running on port 3000!'))
