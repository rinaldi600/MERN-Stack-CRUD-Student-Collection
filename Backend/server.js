const express = require("express");
const dBConnect = require("./db/db");
const mhsRoutes = require("./routes/mhsRoute");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

dBConnect();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});

app.use('/mhs', mhsRoutes);


