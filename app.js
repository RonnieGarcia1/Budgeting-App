const express = require("express");
// var cors = require('cors');
const app = express();
const seedData = require("./models/logs")

app.use(express.json());

app.use((req, res, next) => {
    next()
});

// const validateURL = (req, res, next) => {
//     next();
// };

// app.use(cors());

app.get("/", (req, res) => {
    res.send(" Hello, we've recieved your request. ")
});

app.get("/budgets", (req, res) => {
    res.json(seedData);
});

app.post("/budgets", (req, res) => {
    seedData.push(req.body);
    res.json(seedData[seedData.length - 1]);
});



module.exports = app;