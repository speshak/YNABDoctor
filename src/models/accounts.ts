import * as mongoose from 'mongoose'

const AccountSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  type: { type: Number },
  onBudget: { type: Boolean },
  closed: { type: Boolean },
  balance: { type: Number },
  clearedBalance: { type: Number },
  unclearedBalance: { type: Number },
  deleted: { type: Boolean }
})

export const Accounts = mongoose.model('Accounts', AccountSchema)
