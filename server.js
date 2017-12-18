const express = require('express');
const data = require('./data/data');
const app = express();
const path = require('path');
const cors = require('cors');

app.use(cors);

app.get('/', (req, res) => res.json(data));

app.listen(process.env.PORT || 3000, () => console.log('yay, running on port 3000!'))
