const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema(
  {
    name:     { type: String, trim: true, default: '' },
    title:    { type: String, trim: true, default: '' },
    bio:      { type: String, trim: true, default: '' },
    email:    { type: String, trim: true, default: '' },
    location: { type: String, trim: true, default: '' },
    linkedin: { type: String, trim: true, default: '' },
    github:   { type: String, trim: true, default: '' },
    website:  { type: String, trim: true, default: '' },
    avatar:   { type: String, default: '' },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Profile', profileSchema)
