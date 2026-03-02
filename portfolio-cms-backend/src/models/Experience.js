const mongoose = require('mongoose')

const experienceSchema = new mongoose.Schema(
  {
    role:        { type: String, required: true, trim: true },
    company:     { type: String, required: true, trim: true },
    location:    { type: String, trim: true, default: '' },
    start:       { type: String, default: '' },
    end:         { type: String, default: '' },
    current:     { type: Boolean, default: false },
    description: { type: String, trim: true, default: '' },
    highlights:  [{ type: String }],
    visible:     { type: Boolean, default: true },
    order:       { type: Number, default: 0 },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Experience', experienceSchema)
