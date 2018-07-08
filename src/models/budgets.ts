import * as mongoose from 'mongoose'

const BudgetSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  firstMonth: { type: String },
  lastMonth: { type: String }
})

export const Budgets = mongoose.model('Budgets', BudgetSchema)
