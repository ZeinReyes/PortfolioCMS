const mongoose = require('mongoose')

const certificationSchema = new mongoose.Schema(
  {
    name:          { type: String, required: true, trim: true },
    issuer:        { type: String, required: true, trim: true },
    date:          { type: String, default: '' },
    expiryDate:    { type: String, default: '' },
    credentialId:  { type: String, trim: true, default: '' },
    credentialUrl: { type: String, trim: true, default: '' },
    image:         { type: String, default: '' },
    visible:       { type: Boolean, default: true },
    order:         { type: Number, default: 0 },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Certification', certificationSchema)
