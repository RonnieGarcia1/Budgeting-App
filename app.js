const express = require("express");
const app = express();
const budgetingController = require("./controllers/budgetingController.js")
var cors = require('cors');

app.use(express.json());

app.use(cors())

app.use((req, res, next) => {
    next()
});

app.use((req, res, next) => {
    next();
})

app.get("/", (req, res) => {
    res.send(" Welcome to the Budgeting App ")
});

app.use("/budgets", budgetingController)

app.get("*", (req, res) => {
    res.status(404).json({ error: "Page not found"})
});

module.exports = app;