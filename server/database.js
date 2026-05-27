// Database module for SQLite3
// Handles all database operations for She Can Foundation

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create/open database file in server folder
const dbPath = path.join(__dirname, 'shecan.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Database connection error:', err.message);
  } else {
    console.log('✅ Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  // Create messages table for contact form submissions
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('❌ Error creating messages table:', err.message);
    } else {
      console.log('✅ Messages table ready');
    }
  });

  // Create admin users table
  db.run(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('❌ Error creating admin_users table:', err.message);
    } else {
      console.log('✅ Admin users table ready');
      // Insert default admin user
      insertDefaultAdmin();
    }
  });
}

// Insert default admin credentials (username: admin, password: admin123)
function insertDefaultAdmin() {
  db.run(
    `INSERT OR IGNORE INTO admin_users (username, password) VALUES (?, ?)`,
    ['admin', 'admin123'],
    (err) => {
      if (err) {
        console.error('❌ Error inserting default admin:', err.message);
      } else {
        console.log('✅ Default admin user ready (username: admin, password: admin123)');
      }
    }
  );
}

// Save a new message to database
function saveMessage(name, email, message, callback) {
  db.run(
    `INSERT INTO messages (name, email, message) VALUES (?, ?, ?)`,
    [name, email, message],
    function(err) {
      if (err) {
        console.error('❌ Error saving message:', err.message);
        callback(err, null);
      } else {
        console.log('✅ Message saved with ID:', this.lastID);
        callback(null, { id: this.lastID, name, email, message });
      }
    }
  );
}

// Get all messages from database
function getAllMessages(callback) {
  db.all(
    `SELECT id, name, email, message, created_at FROM messages ORDER BY created_at DESC`,
    (err, rows) => {
      if (err) {
        console.error('❌ Error fetching messages:', err.message);
        callback(err, null);
      } else {
        console.log(`✅ Fetched ${rows.length} messages`);
        callback(null, rows);
      }
    }
  );
}

// Verify admin credentials
function verifyAdmin(username, password, callback) {
  db.get(
    `SELECT id, username FROM admin_users WHERE username = ? AND password = ?`,
    [username, password],
    (err, row) => {
      if (err) {
        console.error('❌ Error verifying admin:', err.message);
        callback(err, false);
      } else {
        const isValid = row !== undefined;
        callback(null, isValid);
      }
    }
  );
}

// Delete a message by ID (optional)
function deleteMessage(id, callback) {
  db.run(
    `DELETE FROM messages WHERE id = ?`,
    [id],
    function(err) {
      if (err) {
        console.error('❌ Error deleting message:', err.message);
        callback(err, null);
      } else {
        console.log('✅ Message deleted');
        callback(null, { changes: this.changes });
      }
    }
  );
}

// Export database functions
module.exports = {
  saveMessage,
  getAllMessages,
  verifyAdmin,
  deleteMessage,
  db
};
