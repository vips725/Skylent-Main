const express = require('express');
const cors = require('cors');
const { CORS_ORIGINS } = require('./config/constants');

const app = express();

app.use(cors({ origin: CORS_ORIGINS, credentials: true }));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/enroll', require('./routes/enroll'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/health', require('./routes/health'));

module.exports = app;