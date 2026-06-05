# 🎓 Skylent Global — Full Stack Website

**Build Skills. Build Careers.**

A complete full-stack web application for Skylent Global's edtech platform, with React + Tailwind CSS frontend and Node.js + Express backend with JWT authentication.

---

## 📁 Project Structure

```
skylent/
├── backend/          # Node.js + Express API
│   ├── server.js     # Main server with all routes
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
    │   │   ├── Signup.jsx        # Signup with password strength
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
node server.js
# API running at http://localhost:5000
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
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login, returns JWT |
| GET | `/api/auth/me` | Get current user (requires token) |
| POST | `/api/auth/logout` | Logout (clears client token) |
| GET | `/api/courses` | Get all courses (public) |
| GET | `/api/health` | Health check |

### Sample Requests

**Signup:**
```json
POST /api/auth/signup
{
  "name": "Arjun Mehta",
  "email": "arjun@example.com",
  "password": "mypassword123",
  "phone": "+91 98765 43210"
}
```

**Login:**
```json
POST /api/auth/login
{
  "email": "arjun@example.com",
  "password": "mypassword123"
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
| Dashboard | `/dashboard` | ✅ Yes |

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

---

## 🔒 Production Recommendations

1. **Replace in-memory store** with MongoDB or PostgreSQL
2. **Change JWT_SECRET** to a strong random string in `.env`
3. **Add rate limiting** with `express-rate-limit`
4. **Add email verification** with Nodemailer
5. **Deploy backend** to Railway/Render/Vercel
6. **Deploy frontend** to Vercel/Netlify

### MongoDB Example (users collection):
```js
// Install: npm install mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  enrolledCourses: [String],
  role: { type: String, default: 'student' },
  createdAt: { type: Date, default: Date.now }
});
```

---

## 🎨 Design System

- **Primary Color:** Indigo `#4F46E5`
- **Accent Color:** Orange `#F97316`  
- **Display Font:** Sora
- **Body Font:** Plus Jakarta Sans
- **Border Radius:** `xl` (12px), `2xl` (16px), `3xl` (24px)
