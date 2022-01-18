const express = require("express");
const app = express();
const transactionsController = require("./controllers/transactionsController.js")
var cors = require('cors');

app.use(express.json());

app.use(cors())

app.use((req, res, next) => {
    next()
});

app.get("/", (req, res) => {
    res.send(`<h1>Budgeting App</h1>`)
});

app.use("/transactions", transactionsController);

app.get("*", (req, res) => {
    res.status(404).json({ error: "Page not found"})
});

module.exports = app;