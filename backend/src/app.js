const express = require('express');
const cors = require('cors');
const { CORS_ORIGINS } = require('./config/constants');

const app = express();

const allowedOrigins = CORS_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean);
const localDevHosts = new Set(['localhost', '127.0.0.1']);

function isAllowedLocalDevOrigin(origin) {
  try {
    const url = new URL(origin);
    const port = Number(url.port);

    return (
      process.env.NODE_ENV !== 'production' &&
      url.protocol === 'http:' &&
      localDevHosts.has(url.hostname) &&
      port >= 3000 &&
      port <= 3010
    );
  } catch {
    return false;
  }
}

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || isAllowedLocalDevOrigin(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS origin not allowed: ${origin}`));
  },
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/enroll', require('./routes/enroll'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/health', require('./routes/health'));

app.use('/api', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

module.exports = app;
