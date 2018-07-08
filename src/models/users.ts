import * as mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const UserSchema = new mongoose.Schema({
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  ynabAccessKey: { type: String }
})

// Execute before each user.save() call
UserSchema.pre('save', (callback) => {
  // Break out if the password hasn't changed
  if (!this.isModified('password')) return callback()

  // Password changed so we need to hash it
  bcrypt.genSalt(5, (err, salt) => {
    if (err) return callback(err)

    bcrypt.hash(this.password, salt, null, (err, hash) => {
      if (err) return callback(err)
      this.password = hash
      callback()
    })
  })
})

UserSchema.methods.verifyPassword = (password) => {
  return bcrypt.compareSync(password, this.password)
}

export const Users = mongoose.model('Users', UserSchema)
