const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    title: {
      type: String
    },
    body: {
      type: String
    },
    author: {
      type: String,
      required: true
    },
    categories: {
      type: [String]
    },
    state: {
      type: String,
      enum: ['public', 'private'],
      default: 'private'
    },
    isFavourite: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

noteSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Note', noteSchema);