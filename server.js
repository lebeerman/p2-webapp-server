const express = require('express');
const cors = require('cors');
const app = express();
const data = require('./data/data');

app.use(cors());

app.get('/', (req, res) => res.json(data));

app.listen(process.env.PORT || 3000, () => console.log('Example app listening on port!'))
