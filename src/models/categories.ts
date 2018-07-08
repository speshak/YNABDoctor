import * as mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  hidden: { type: Boolean },
  deleted: { type: Boolean },
  categories: { type: Array }
})

export const Categories = mongoose.model('Categories', CategorySchema)
