import * as mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema({
  id: { type: String },
  date: { type: String },
  amount: { type: Number },
  memo: { type: String },
  flagColor: { type: String },
  accountId: { type: String },
  accountName: { type: String },
  payeeId: { type: String },
  payeeName: { type: String },
  categoryId: { type: String },
  categoryName: { type: String },
  transferAccountId: { type: String },
  deleted: { type: Boolean },
  subtransactions: { type: Array }
})

export const Transactions = mongoose.model('Transactions', TransactionSchema)
