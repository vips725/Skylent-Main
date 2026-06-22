const bcrypt = require("bcryptjs");

const env = require("../config/constants");
const { pool } = require("../db/pool");

const users = [
  {
    id: "user_1",
    name: "Skylent Admin",
    username: env.DEMO_ADMIN_USERNAME,
    email: "admin@skylentglobal.com",
    role: "admin",
    enrolledCourses: [],
    createdAt: "2026-01-01",
    completion: 100,
    streak: 30,
    status: "active"
  },
  {
    id: "student_1",
    name: "Rahul Sharma",
    username: "rahul",
    email: "rahul@example.com",
    role: "student",
    enrolledCourses: ["101", "104"],
    createdAt: "2026-02-10",
    completion: 68,
    streak: 12,
    status: "active"
  },
  {
    id: "student_2",
    name: "Priya Patel",
    username: "priya",
    email: "priya@example.com",
    role: "student",
    enrolledCourses: ["102", "201"],
    createdAt: "2026-03-18",
    completion: 82,
    streak: 21,
    status: "active"
  },
  {
    id: "student_3",
    name: "Amit Kumar",
    username: "amit",
    email: "amit@example.com",
    role: "student",
    enrolledCourses: ["103"],
    createdAt: "2026-04-04",
    completion: 44,
    streak: 5,
    status: "inactive"
  }
];

const courses = [
  {
    id: "101",
    title: "Full-Stack Web Development Bootcamp",
    subtitle: "Build production-ready web apps with modern JavaScript",
    category: "Technology",
    level: "Beginner",
    rating: 4.8,
    students: 12450,
    instructor: "Priya Sharma",
    duration: "42 hours",
    price: 4999,
    originalPrice: 12999,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    description: "Master frontend, backend, APIs, authentication, and deployment through guided projects.",
    programType: "Certificate",
    visibility: "public",
    tags: "javascript,react,node,full-stack",
    curriculum: []
  },
  {
    id: "102",
    title: "Digital Marketing Masterclass 2026",
    subtitle: "SEO, ads, analytics, content, and conversion strategy",
    category: "Marketing",
    level: "Intermediate",
    rating: 4.7,
    students: 8920,
    instructor: "Rahul Verma",
    duration: "28 hours",
    price: 3999,
    originalPrice: 9999,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    description: "Learn how growth teams plan, launch, measure, and optimize campaigns.",
    programType: "Certificate",
    visibility: "public",
    tags: "seo,ads,analytics,content",
    curriculum: []
  },
  {
    id: "103",
    title: "UI/UX Design Fundamentals with Figma",
    subtitle: "Research, wireframes, prototypes, and usable interfaces",
    category: "Design",
    level: "Beginner",
    rating: 4.9,
    students: 6340,
    instructor: "Ananya Patel",
    duration: "35 hours",
    price: 4499,
    originalPrice: 11999,
    badge: "New",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    description: "Practice user-centered design workflows and portfolio-ready case studies.",
    programType: "Certificate",
    visibility: "public",
    tags: "figma,ui,ux,design",
    curriculum: []
  },
  {
    id: "104",
    title: "Data Science & Machine Learning with Python",
    subtitle: "Python, statistics, ML models, and real-world data projects",
    category: "Technology",
    level: "Advanced",
    rating: 4.6,
    students: 7100,
    instructor: "Vikram Singh",
    duration: "60 hours",
    price: 7999,
    originalPrice: 19999,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    description: "Move from data cleaning to supervised learning and model evaluation.",
    programType: "Certificate",
    visibility: "public",
    tags: "python,data-science,machine-learning",
    curriculum: []
  },
  {
    id: "201",
    title: "MBA Digital Business Management",
    subtitle: "A career-oriented digital business leadership program",
    category: "Marketing",
    level: "Degree",
    rating: 4.7,
    students: 2100,
    instructor: "Prof. Vikram Singh",
    duration: "24 months",
    price: 149999,
    originalPrice: 299999,
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
    description: "Study digital operations, strategy, analytics, marketing, and leadership.",
    programType: "Master Degree",
    semesterPlan: [
      { sem: 1, subjects: ["Management Foundations", "Digital Strategy"] },
      { sem: 2, subjects: ["Growth Marketing", "Business Analytics"] },
      { sem: 3, subjects: ["Industry Project", "Leadership"] },
      { sem: 4, subjects: ["Capstone", "Dissertation"] }
    ],
    visibility: "public",
    tags: "mba,business,marketing",
    curriculum: []
  },
  {
    id: "202",
    title: "Cloud Computing with AWS & Azure",
    subtitle: "Cloud architecture, DevOps, security, and deployments",
    category: "Technology",
    level: "Degree",
    rating: 4.6,
    students: 5200,
    instructor: "Rohan Desai",
    duration: "18 months",
    price: 129999,
    originalPrice: 249999,
    badge: "Degree Program",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop",
    description: "Learn cloud infrastructure, container workflows, and production deployment patterns.",
    programType: "Master Degree",
    semesterPlan: [
      { sem: 1, subjects: ["Cloud Foundations", "Linux & Networking"] },
      { sem: 2, subjects: ["AWS", "Azure"] },
      { sem: 3, subjects: ["DevOps", "Security"] },
      { sem: 4, subjects: ["Capstone", "Portfolio"] }
    ],
    visibility: "public",
    tags: "cloud,aws,azure,devops",
    curriculum: []
  }
];

async function initializeUsers() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT NOT NULL,
      email TEXT,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      CONSTRAINT users_username_not_blank CHECK (length(trim(username)) > 0),
      CONSTRAINT users_password_hash_not_blank CHECK (length(trim(password_hash)) > 0),
      CONSTRAINT users_role_valid CHECK (role IN ('admin', 'student', 'organization'))
    );
  `);

  await pool.query(`
    CREATE UNIQUE INDEX IF NOT EXISTS users_username_lower_idx
      ON users (lower(username));
  `);

  await pool.query(`
    CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_idx
      ON users (lower(email))
      WHERE email IS NOT NULL;
  `);

  const passwordHash = await bcrypt.hash(env.DEMO_ADMIN_PASSWORD, 10);

  await pool.query(
    `
      INSERT INTO users (id, username, password_hash, role)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id) DO UPDATE SET
        username = EXCLUDED.username,
        password_hash = EXCLUDED.password_hash,
        role = EXCLUDED.role,
        updated_at = NOW();
    `,
    ["user_1", env.DEMO_ADMIN_USERNAME, passwordHash, "admin"]
  );

  return true;
}

async function findUserByUsername(username) {
  const { rows } = await pool.query(
    `
      SELECT id, username, password_hash, role
      FROM users
      WHERE lower(username) = lower($1)
        OR lower(email) = lower($1)
      LIMIT 1;
    `,
    [username]
  );

  const user = rows[0];

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    username: user.username,
    passwordHash: user.password_hash,
    role: user.role
  };
}

async function findUserById(id) {
  const { rows } = await pool.query(
    `
      SELECT id, username, password_hash, role
      FROM users
      WHERE id = $1
      LIMIT 1;
    `,
    [id]
  );

  const user = rows[0];

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    username: user.username,
    passwordHash: user.password_hash,
    role: user.role
  };
}

async function updateUserPassword(userId, passwordHash) {
  await pool.query(
    `UPDATE users
     SET password_hash = $2, updated_at = NOW()
     WHERE id = $1`,
    [userId, passwordHash]
  );
}

module.exports = {
  users,
  courses,
  initializeUsers,
  findUserByUsername,
  findUserById,
  updateUserPassword
};
