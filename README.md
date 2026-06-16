# 🎓 Skylent Global — Full Stack Website

**Build Skills. Build Careers.**

A complete full-stack web application for Skylent Global's edtech platform, with React + Tailwind CSS frontend and Node.js + Express backend with JWT authentication.

---

## 📁 Project Structure

```
skylent/
├── backend/          # Node.js + Express API
│   ├── src/server.js # Main server with all routes
│   ├── .env          # Environment variables
│   └── package.json
│
└── frontend/         # React + Tailwind CSS
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx        # Responsive navbar with auth state
    │   │   ├── Footer.jsx        # Full footer with links
    │   │   ├── CourseCard.jsx    # Reusable course card
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx   # JWT auth state management
    │   ├── pages/
    │   │   ├── Home.jsx          # Full landing page
    │   │   ├── Login.jsx         # Login with validation
    │   │   ├── Signup.jsx        # Account access request page
    │   │   ├── Courses.jsx       # Course listing with filters
    │   │   ├── Dashboard.jsx     # Protected student dashboard
    │   │   └── OtherPages.jsx    # MBA, Certs, Placements, About, Contact
    │   ├── App.jsx               # Router + Layout
    │   ├── main.jsx
    │   └── index.css             # Tailwind + custom styles
    └── package.json
```

---

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
npm run dev
# API running at http://localhost:5001
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
# App running at http://localhost:3000
```

---

## 🔑 Auth API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login, returns JWT |
| GET | `/api/auth/me` | Get current user (requires token) |
| POST | `/api/auth/logout` | Logout (clears client token) |
| GET | `/api/courses` | Get all courses (public) |
| GET | `/api/health` | Health check |

### Sample Requests

Self-service signup is currently unavailable. New accounts are created by the
Skylent Global team.

**Login:**
```json
POST /api/auth/login
{
  "username": "satvik",
  "password": "password123"
}
```

**Protected request (include token):**
```
Authorization: Bearer <your_jwt_token>
```

---

## 📄 Pages

| Page | Path | Auth Required |
|------|------|---------------|
| Landing Page | `/` | No |
| Courses | `/courses` | No |
| MBA Programs | `/mba` | No |
| Certifications | `/certifications` | No |
| Placements | `/placements` | No |
| About | `/about` | No |
| Contact | `/contact` | No |
| Login | `/login` | No |
| Signup | `/signup` | No |
| Admin Dashboard | `/admin/dashboard` | ✅ Yes |
| Student Dashboard | `/student/dashboard` | ✅ Yes |

---

## 🛠 Tech Stack

**Frontend:**
- React 18
- React Router v6
- Tailwind CSS v3
- Axios
- Lucide React icons
- Vite

**Backend:**
- Node.js + Express
- bcryptjs (password hashing)
- jsonwebtoken (JWT auth)
- cors
- pg + Neon Postgres
- zod validation

---

## Environment

Create `backend/.env` from `backend/.env.example`:

```text
PORT=5001
HOST=127.0.0.1
DATABASE_URL=your-neon-postgres-connection-string
JWT_SECRET=use-a-long-random-production-secret
JWT_EXPIRES_IN=1h
DEMO_ADMIN_USERNAME=satvik
DEMO_ADMIN_PASSWORD=password123
CORS_ORIGINS=http://localhost:3000
```

For Vercel, add the same variables in Project Settings > Environment Variables,
except `PORT`. Vercel manages ports automatically.

---

## 🔒 Production Recommendations

1. **Change JWT_SECRET** to a strong random string in `.env`
2. **Add rate limiting** with `express-rate-limit`
3. **Add email verification** before enabling signup
4. **Move mock course/admin data** to Postgres when those workflows need persistence

---

## 🎨 Design System

- **Primary Color:** Indigo `#4F46E5`
- **Accent Color:** Orange `#F97316`  
- **Display Font:** Sora
- **Body Font:** Plus Jakarta Sans
- **Border Radius:** `xl` (12px), `2xl` (16px), `3xl` (24px)
