const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    tech:        [{ type: String, trim: true }],
    liveUrl:     { type: String, trim: true, default: '' },
    githubUrl:   { type: String, trim: true, default: '' },
    image:       { type: String, default: '' },
    visible:     { type: Boolean, default: true },
    featured:    { type: Boolean, default: false },
    order:       { type: Number, default: 0 },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Project', projectSchema)
