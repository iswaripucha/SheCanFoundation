// She Can Foundation - Backend Server
// Express.js server with REST APIs and SQLite database

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = 5000;

// ========== MIDDLEWARE SETUP ==========

// Enable CORS (allows requests from frontend)
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from client folder
app.use(express.static(path.join(__dirname, '../client')));

// ========== ROUTES ==========

// Root route - serves index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// ========== API ENDPOINTS ==========

// POST API - Save contact form data
// Endpoint: POST /api/messages
// Request body: { name, email, message }
// Response: { success: true/false, message: string, data: object }
app.post('/api/messages', (req, res) => {
  const { name, email, message } = req.body;

  // Validation - check if all fields are provided
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  // Validation - check email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format'
    });
  }

  // Save to database
  db.saveMessage(name, email, message, (err, data) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error saving message to database'
      });
    }

    res.json({
      success: true,
      message: 'Form submitted successfully',
      data: data
    });
  });
});

// GET API - Fetch all submitted messages
// Endpoint: GET /api/messages
// Query parameters: ?admin_token=secretToken (for admin verification)
// Response: { success: true/false, messages: array }
app.get('/api/messages', (req, res) => {
  const adminToken = req.query.admin_token;

  // Check if admin token is provided (simple verification)
  if (adminToken !== 'admin_authenticated') {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized access'
    });
  }

  // Fetch all messages from database
  db.getAllMessages((err, messages) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching messages from database'
      });
    }

    res.json({
      success: true,
      message: `Retrieved ${messages.length} messages`,
      messages: messages
    });
  });
});

// POST API - Admin login authentication
// Endpoint: POST /api/admin/login
// Request body: { username, password }
// Response: { success: true/false, token: string, message: string }
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required'
    });
  }

  // Verify admin credentials from database
  db.verifyAdmin(username, password, (err, isValid) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error verifying credentials'
      });
    }

    if (isValid) {
      res.json({
        success: true,
        message: 'Login successful',
        token: 'admin_authenticated'
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }
  });
});

// DELETE API - Delete a message by ID
// Endpoint: DELETE /api/messages/:id
// Query parameters: ?admin_token=secretToken
// Response: { success: true/false, message: string }
app.delete('/api/messages/:id', (req, res) => {
  const messageId = req.params.id;
  const adminToken = req.query.admin_token;

  if (adminToken !== 'admin_authenticated') {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized access'
    });
  }

  db.deleteMessage(messageId, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error deleting message'
      });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  });
});

// ========== ERROR HANDLING ==========

// 404 - Route not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// ========== START SERVER ==========

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   She Can Foundation - Server Running   ║
╠════════════════════════════════════════╣
║   🌐 Server: http://localhost:${PORT}      ║
║   📧 API: http://localhost:${PORT}/api    ║
║   👩 Admin: http://localhost:${PORT}/admin  ║
╚════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down server...');
  db.db.close((err) => {
    if (err) console.error('Database close error:', err.message);
    process.exit(0);
  });
});
