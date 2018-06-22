"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ynab = require("ynab");
const ynabAPI = new ynab.API(process.env.accessToken);
const getId = (budgets, budgetName) => {
    for (let budget of budgets) {
        if (budget.name === budgetName) {
            return budget.id;
        }
    }
};
module.exports = function getBudgetId(budgetName) {
    return ynabAPI.budgets.getBudgets()
        .then((result) => {
        const budgets = result.data.budgets;
        return getId(budgets, budgetName);
    });
};
