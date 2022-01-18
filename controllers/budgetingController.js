const express = require("express");
const budgets = express.Router();
const budgetsArr = require("../models/budgets.js");

budgets.get("/", (req, res) => {
    res.json(budgetsArr);
});

budgets.get("/:index", (req, res) => {
    const { index } = req.params;
    if(budgetsArr[index]){
        res.json(budgetsArr[index]);
    } else {
        res.status(404).json({ message: "Budgets not found"});
    }
});

const ValidateURL = (req, res, next) => {
    next();
};

budgets.post("/", ValidateURL, (req, res) => {
    budgetsArr.push(req.body);
    res.json(budgetsArr[budgetsArr.length - 1]);
});

budgets.delete("/:index", (req, res) => {
    const { index } = req.params;
    if(budgetsArr[index]){
        let removed = budgetsArr.splice(index, 1);
        res.json(removed[0])
    } else {
        res.status(404).json({ error: " Not found "});
    }
});

budgets.put("/:index", (res, req) => {
    let { index } = req.params;
    let { date, from, amount } = req.body;
    if(date && from && amount){
        budgetsArr[index] = {
            date, from , amount
        };
        res.json(budgetsArr[index]);
    } else {
        res.status(422).json({
            error: "Please provide all inputs"
        })
    }
});

module.exports = budgets;