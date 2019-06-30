const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      required: true,
      default: 'user'
    }
  },
  {
    timestamps: true
  }
);

userSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('User', userSchema);