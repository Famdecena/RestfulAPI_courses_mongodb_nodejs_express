// models/Course.js

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  code: String,
  description: String,
  units: Number,
  tags: [String],
  // No explicit 'year' or 'specialization' fields; these are assumed to be part of 'tags'
});

module.exports = mongoose.model('Course', courseSchema);
