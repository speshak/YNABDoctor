import * as mongoose from 'mongoose'

const BudgetMonthSchema = new mongoose.Schema({
  month: { type: String },
  toBeBudgeted: { type: Number },
  ageOfMoney: { type: Number },
  categories: { type: Array }
})

export const BudgetMonths = mongoose.model('BudgetMonths', BudgetMonthSchema)
