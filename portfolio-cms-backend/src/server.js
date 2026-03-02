require('dotenv').config()
const express     = require('express')
const cors        = require('cors')
const helmet      = require('helmet')
const morgan      = require('morgan')
const rateLimit   = require('express-rate-limit')

const connectDB   = require('./config/database')
const { errorHandler, notFound } = require('./middleware/errorHandler')

const Project       = require('./models/Project')
const Certification = require('./models/Certification')
const Skill         = require('./models/Skill')
const Experience    = require('./models/Experience')

const { createCrudController } = require('./controllers/crudController')
const { createCrudRouter }     = require('./routes/crudRouter')
const { protect }              = require('./middleware/auth')


connectDB()

const app = express()

app.use(helmet())
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}

app.use('/api/auth', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 20,
  message: { message: 'Too many requests, please try again later' },
}))

app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
}))

app.use('/api/auth',           require('./routes/auth'))
app.use('/api/profile',        require('./routes/profile'))

const resources = {
  projects:       Project,
  certifications: Certification,
  skills:         Skill,
  experience:     Experience,
}

Object.entries(resources).forEach(([path, Model]) => {
  const ctrl   = createCrudController(Model)
  const router = createCrudRouter(ctrl, protect)
  app.use(`/api/${path}`, router)
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.get('/api/public/portfolio', async (req, res, next) => {
  try {
    const [profile, projects, certifications, skills, experience] = await Promise.all([
      require('./models/Profile').findOne(),
      Project.find({ visible: true }).sort({ order: 1, createdAt: -1 }),
      Certification.find({ visible: true }).sort({ order: 1, createdAt: -1 }),
      Skill.find({ visible: true }).sort({ order: 1 }),
      Experience.find({ visible: true }).sort({ order: 1, createdAt: -1 }),
    ])
    res.json({ profile, projects, certifications, skills, experience })
  } catch (err) { next(err) }
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📋 Environment: ${process.env.NODE_ENV || 'development'}`)
})

module.exports = app
