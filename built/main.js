require('dotenv').config();
const importTransactions = require('./handler/importTransactions');
const DB = require('./db');
const db = new DB;
db.connect();
process.on('exit', db.close);
importTransactions(process.env.budgetName, db).then(() => {
    process.exit();
});
