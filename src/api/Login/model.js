import mongoose, { Schema } from 'mongoose'

const loginSchema = new Schema({
  Nome: {
    type: String
  },
  Email: {
    type: String
  },
  Password: {
    type: String
  }
}, {
  timestamps: true
})

loginSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      Nome: this.Nome,
      Email: this.Email,
      Password: this.Password,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

module.exports = mongoose.model('Login', loginSchema)
export default module.exports
