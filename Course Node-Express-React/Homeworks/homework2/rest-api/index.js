const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/BlogsRoutes.js');
const port = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());
app.use(morgan('short'));
app.use(router);
app.use(bodyParser.urlencoded({extended:false}));
app.use(router);
// app.use(express.static('./BlogItem.js'))

// LISTEN
app.listen(port, () => console.log(`Listening on port ${port}...`));