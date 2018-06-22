var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const getBudgetId = require('../lib/getBudgetId');
const getTransactions = require('../lib/getTransactions');
module.exports = (budgetName, db) => __awaiter(this, void 0, void 0, function* () {
    const id = yield getBudgetId(budgetName);
    const transactions = yield getTransactions(id);
    return db.insertMany('transactions', transactions);
});
