const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({

    program: String,
    year: String,
    code: String,
    description: String,
    units: Number,
    tags: [String]
}, { timestamps: false });

module.exports = mongoose.model('Course', courseSchema);
