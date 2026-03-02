# Portfolio CMS — Backend (Express + MongoDB)

REST API powering the Portfolio CMS admin dashboard.

---

## 🚀 Quick Start

```bash
npm install
cp .env.example .env      # fill in your MONGODB_URI and JWT_SECRET
npm run seed              # seed database with sample data
npm run dev               # start dev server on :5000
```

---

## 📁 Project Structure

```
src/
├── server.js                  # App entry, middleware, route mounting
├── config/
│   └── database.js            # Mongoose connection
├── models/
│   ├── User.js                # Admin user (bcrypt password)
│   ├── Profile.js             # Singleton profile
│   ├── Project.js
│   ├── Certification.js
│   ├── Skill.js
│   └── Experience.js
├── controllers/
│   ├── authController.js      # Login, /me, change-password
│   ├── crudController.js      # Generic CRUD factory (keeps code DRY)
│   └── profileController.js   # Singleton GET/PUT
├── routes/
│   ├── auth.js
│   ├── profile.js
│   └── crudRouter.js          # Generic router factory
└── middleware/
    ├── auth.js                # JWT protect middleware
    ├── errorHandler.js        # Global error handler
    └── validate.js            # express-validator helper
scripts/
└── seed.js                    # Seed DB with demo data
```

---

## 🔌 API Reference

### Auth
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/auth/login | — | Login → returns JWT |
| GET  | /api/auth/me | ✅ | Get current user |
| PUT  | /api/auth/change-password | ✅ | Change password |

### CRUD Resources
Each resource (projects, certifications, skills, experience) shares the same shape:

| Method | Route | Description |
|--------|-------|-------------|
| GET    | /api/{resource} | List all |
| GET    | /api/{resource}/:id | Get one |
| POST   | /api/{resource} | Create |
| PUT    | /api/{resource}/:id | Update |
| DELETE | /api/{resource}/:id | Delete |
| PATCH  | /api/{resource}/:id/visibility | Toggle visible flag |

### Profile (singleton)
| Method | Route | Description |
|--------|-------|-------------|
| GET  | /api/profile | Get profile |
| PUT  | /api/profile | Update profile |

### Public (no auth)
| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/public/portfolio | All visible items (for Next.js portfolio) |

---

## 🌐 Deploy to Render (free)

1. Push to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Set environment variables from `.env.example`
4. Use `npm start` as the start command
