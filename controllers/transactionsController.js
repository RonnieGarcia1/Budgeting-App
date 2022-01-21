const express = require("express");
const transactions = express.Router();
const transactionsArr = require("../models/transactions.js");

transactions.get("/", (req, res) => {
    res.json(transactionsArr);
});

transactions.get("/:index", (req, res) => {
    const { index } = req.params;
    if(transactionsArr[index]){
        res.json(transactionsArr[index]);
    } else {
        res.status(404).json({ message: "Budgets not found"});
    }
});

const ValidateURL = (req, res, next) => {
    next();
};

transactions.post("/", ValidateURL, (req, res) => {
    transactionsArr.unshift(req.body);
    res.json(transactionsArr[0]);
});

transactions.delete("/:index", (req, res) => {
    const { index } = req.params;
    if(transactionsArr[index]){
        let removed = transactionsArr.splice(index, 1);
        res.json(removed[0])
    } else {
        res.status(404).json({ error: " Not found "});
    }
});

transactions.put("/:index", (res, req) => {
    let { index } = req.params;
    let { item_name, amount, date, from, category } = req.body;
    if(item_name && amount && date && from && category ){
        transactionsArr[index] = {
            item_name, amount, date, from, category
        };
        res.json(transactionsArr[index]);
    } else {
        res.status(422).json({
            error: "Please provide all inputs"
        })
    }
});

module.exports = transactions;