# Portfolio CMS — Admin Dashboard

A professional React admin panel to manage your portfolio content.
Built with **React 18 + Vite + React Router + CSS Modules**.

---

## 🚀 Getting Started

```bash
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:3000

**Demo credentials:**
- Email: `admin@portfolio.com`
- Password: `admin123`

---

## 📁 Project Structure

```
src/
├── App.jsx                    # Root app + routing
├── main.jsx                   # Entry point
├── styles/
│   └── global.css             # CSS variables, resets, animations
│
├── context/
│   ├── ThemeContext.jsx        # Dark/light mode
│   ├── AuthContext.jsx         # Auth state + login/logout
│   └── ToastContext.jsx        # Toast notifications
│
├── hooks/
│   ├── useCrud.js              # Generic CRUD hook (used by all content pages)
│   └── useProfile.js           # Profile-specific hook
│
├── services/
│   ├── authService.js          # Login API calls
│   └── portfolioService.js     # Projects, Certs, Skills, Experience CRUD
│
├── data/
│   └── mockData.js             # Mock data (swap out when backend is ready)
│
├── utils/
│   └── apiClient.js            # Axios instance with auth interceptors
│
└── components/
    ├── ui/                     # Reusable atomic components
    │   ├── Icon.jsx / Badge.jsx / Button.jsx / Card.jsx
    │   ├── Input.jsx / Modal.jsx / ConfirmDialog.jsx
    │   ├── PageHeader.jsx / EmptyState.jsx
    │   └── *.module.css        # Scoped CSS per component
    │
    ├── layout/                 # App shell
    │   ├── AppLayout.jsx       # Root layout (sidebar + header + outlet)
    │   ├── Sidebar.jsx         # Navigation sidebar
    │   └── Header.jsx          # Top bar (theme toggle, avatar)
    │
    └── pages/                  # Route-level page components
        ├── LoginPage.jsx
        ├── DashboardPage.jsx
        ├── ProjectsPage.jsx
        ├── CertificationsPage.jsx
        ├── SkillsPage.jsx
        ├── ExperiencePage.jsx
        └── ProfilePage.jsx
```

---

## 🔌 Connecting Your Express Backend

1. Open `src/services/portfolioService.js` and `src/services/authService.js`
2. Set `const USE_MOCK = false`
3. Make sure your Express API matches these routes:

```
POST   /api/auth/login
GET    /api/projects          POST /api/projects
PUT    /api/projects/:id      DELETE /api/projects/:id
GET    /api/certifications    POST /api/certifications
PUT    /api/certifications/:id  DELETE /api/certifications/:id
GET    /api/skills            POST /api/skills
PUT    /api/skills/:id        DELETE /api/skills/:id
GET    /api/experience        POST /api/experience
PUT    /api/experience/:id    DELETE /api/experience/:id
GET    /api/profile           PUT /api/profile
```

4. Set `VITE_API_URL` in your `.env` to your backend URL.

---

## 🎨 Theming

All colors are CSS custom properties defined in `src/styles/global.css`.
Both `:root` (light) and `[data-theme="dark"]` are defined.
Theme preference is persisted to `localStorage`.

---

## 📦 Build for Production

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to **Vercel**, **Netlify**, or any static host.
