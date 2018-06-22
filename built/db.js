var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const MongoClient = require('mongodb').MongoClient;
class Db {
    constructor() {
        this.client = null;
        this.db = null;
    }
    connect() {
        return new Promise((resolve, reject) => {
            if (this.db) {
                resolve();
            }
            else {
                MongoClient
                    .connect(process.env.mongoUrl)
                    .then((client) => {
                    this.client = client;
                    this.db = client.db(process.env.mongoDBName);
                    console.log(`Connected to ${process.env.mongoDBName}`);
                    resolve();
                }, (err) => {
                    console.log('Error connecting: ', err.message);
                    reject(err.message);
                });
            }
        });
    }
    close() {
        if (this.client) {
            this.client.close()
                .then(() => {
                console.log('Connection closed');
            }, (err) => {
                console.log('Failed to close DB ', err.message);
            });
        }
    }
    insertMany(collectionName, documents) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.db.collection(collectionName);
            yield collection.insertMany(documents);
        });
    }
}
module.exports = Db;
