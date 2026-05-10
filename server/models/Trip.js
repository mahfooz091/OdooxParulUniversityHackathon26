const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  title: String,
  destination: String,
  budget: Number,
  spent: {
    type: Number,
    default: 0
  },
  startDate: Date,
  endDate: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Trip', tripSchema);