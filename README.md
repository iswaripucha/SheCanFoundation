# 🌸 She Can Foundation - Women Empowerment NGO Website

A modern, professional, full-stack website for **She Can Foundation** - an NGO registered under the Indian Society Act, 1860, dedicated to empowering women globally. Built with **HTML, CSS, JavaScript, Node.js, Express.js, and SQLite3**.

## About She Can Foundation

**She Can Foundation** is a non-governmental organization dedicated to empowering women and creating a more equitable society. We provide support, resources, and training to women in communities across the globe, working closely with local organizations, governments, and communities to ensure that our programs are effective and sustainable.

**Organization Details:**
- 📋 NGO Registered Under the Indian Society Act, 1860
- 🌍 Founder & President: **Reeta Mishra**
- 📞 Phone: **+91 - 8283841830**
- 📧 Email: **president@shecanfoundation.org**
- 📱 Social Media: Instagram (@_shecanfoundation_), LinkedIn (She Can Foundation)
- 🎯 Motto: **"Together We Can Change"**
- 🌐 Vision: **"Global Vision, Local Action"**

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation Guide](#installation-guide)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Admin Credentials](#admin-credentials)
- [What We Do](#what-we-do)
- [File Descriptions](#file-descriptions)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation Guide](#installation-guide)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Admin Credentials](#admin-credentials)
- [Features Breakdown](#features-breakdown)
- [File Descriptions](#file-descriptions)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

### Frontend Features
✅ **Responsive Landing Page** - Mobile-friendly design for all devices  
✅ **Hero Section** - Eye-catching welcome section with modern gradient background  
✅ **About Section** - Information about the NGO and impact statistics  
✅ **Gallery Section** - Showcase of programs and initiatives  
✅ **Contact Form** - Professional form with validation and loading animation  
✅ **Dark Mode Toggle** - Easy switch between light and dark themes  
✅ **Smooth Scrolling** - Navigation with smooth page scrolling  
✅ **Hover Effects** - Interactive elements with smooth animations  
✅ **Glassmorphism Design** - Modern UI with backdrop blur effects  
✅ **Form Validation** - Real-time validation for email and required fields  

### Backend Features
✅ **Express.js Server** - RESTful API endpoints  
✅ **SQLite3 Database** - Persistent data storage  
✅ **Admin Authentication** - Simple login system  
✅ **CORS Support** - Cross-origin requests enabled  
✅ **Error Handling** - Comprehensive error management  
✅ **Message Management** - Save, retrieve, and delete messages  

### Admin Panel Features
✅ **Admin Dashboard** - View all submitted messages  
✅ **Message Display** - See name, email, message, and timestamp  
✅ **Delete Messages** - Remove unwanted messages  
✅ **Secure Login** - Protected admin area with authentication  

---

## 🎯 What We Do

### Our Core Focus Areas:

1. **📚 Education & Training**
   - Providing quality education and skill development programs
   - Training women with knowledge and capabilities for better futures

2. **🏥 Health & Support**
   - Raising awareness about women's health issues
   - Providing support across communities

3. **🤝 Community Partnership**
   - Working with local organizations and governments
   - Building sustainable solutions with communities

4. **📢 Advocacy & Change**
   - Running advocacy campaigns for women's rights
   - Raising awareness of women's issues globally

---

## 🌟 Our Philosophy

At She Can Foundation, we believe:
- **"Together, we can break down barriers and empower women"**
- By working together, we can revolutionize society
- Every woman has the opportunity to thrive and succeed
- Supporting individuals, corporations, and organizations creates lasting impact

---

**Frontend:**
- HTML5
- CSS3 (with Flexbox & Grid)
- Vanilla JavaScript (ES6+)

**Backend:**
- Node.js
- Express.js v4.18.2
- Body-parser v1.20.2
- CORS v2.8.5

**Database:**
- SQLite3 v5.1.6

**No frameworks required** - Pure vanilla code for easy learning and modification!

---

## 📁 Project Structure

```
SheCanFoundation/
├── client/
│   ├── index.html          # Main HTML file (landing page + admin pages)
│   ├── style.css           # Comprehensive styling with dark mode
│   └── script.js           # Frontend JavaScript logic
├── server/
│   ├── server.js           # Express server and routes
│   └── database.js         # SQLite database setup and queries
├── package.json            # Node.js dependencies
└── README.md               # This file
```

---

## 🚀 Installation Guide

### Prerequisites
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org)
- **npm** (comes with Node.js)
- A code editor (VS Code recommended)
- Command line/Terminal knowledge

### Step 1: Install Node.js & npm

**Windows:**
1. Download from https://nodejs.org
2. Run the installer and follow instructions
3. Verify installation:
```bash
node --version
npm --version
```

**Mac:**
```bash
brew install node
```

**Linux:**
```bash
sudo apt-get install nodejs npm
```

### Step 2: Clone or Download Project

Navigate to the project folder:
```bash
cd d:\Projects\SheCanFoundation
```

### Step 3: Install Dependencies

Install all required npm packages:
```bash
npm install
```

This will install:
- express
- cors
- sqlite3
- body-parser

The installation may take 2-3 minutes. Wait for completion.

### Step 4: Verify Installation

Check if all packages are installed:
```bash
npm list
```

You should see all dependencies listed without errors.

---

## ▶️ Running the Project

### Start the Server

Open terminal in the project folder and run:

```bash
npm start
```

Or explicitly:
```bash
node server/server.js
```

**Expected Output:**
```
╔════════════════════════════════════════╗
║   She Can Foundation - Server Running   ║
╠════════════════════════════════════════╣
║   🌐 Server: http://localhost:5000      ║
║   📧 API: http://localhost:5000/api    ║
║   👩 Admin: http://localhost:5000/admin  ║
╚════════════════════════════════════════╝
```

### Access the Website

1. **Open your browser** (Chrome, Firefox, Safari, Edge)
2. **Go to:** `http://localhost:5000`
3. You should see the landing page with:
   - Navigation bar
   - Hero section
   - About section
   - Gallery
   - Contact form

### Stop the Server

Press `Ctrl + C` in the terminal to stop the server.

---

## 📡 API Documentation

### 1. Submit Contact Form

**Endpoint:** `POST /api/messages`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I am interested in joining your programs"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Form submitted successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I am interested in joining your programs"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "All fields are required"
}
```

---

### 2. Admin Login

**Endpoint:** `POST /api/admin/login`

**Request:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "admin_authenticated"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Invalid username or password"
}
```

---

### 3. Fetch All Messages (Admin Only)

**Endpoint:** `GET /api/messages?admin_token=admin_authenticated`

**Response:**
```json
{
  "success": true,
  "message": "Retrieved 5 messages",
  "messages": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "message": "Interested in programs",
      "created_at": "2024-05-27 10:30:45"
    }
  ]
}
```

---

### 4. Delete Message (Admin Only)

**Endpoint:** `DELETE /api/messages/:id?admin_token=admin_authenticated`

**Response:**
```json
{
  "success": true,
  "message": "Message deleted successfully"
}
```

---

## 🔐 Admin Credentials

**Default Admin Account:**

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `admin123` |

⚠️ **Note:** For production, change these credentials in the `database.js` file.

### How to Change Admin Credentials

Edit `server/database.js`, find the `insertDefaultAdmin()` function:

```javascript
db.run(
  `INSERT OR IGNORE INTO admin_users (username, password) VALUES (?, ?)`,
  ['admin', 'admin123'],  // Change these values
  ...
);
```

---

## 🎯 Features Breakdown

### 1. Responsive Landing Page
- Fully responsive on mobile, tablet, and desktop
- Mobile-first design approach
- Touch-friendly navigation

### 2. Hero Section
- Large attractive background
- Animated gradient
- Call-to-action button

### 3. About Section
- Mission and vision statements
- Impact statistics
- Professional layout

### 4. Gallery Section
- Four main program areas
- Icon-based design
- Hover animations

### 5. Contact Form
- Real-time validation
- Loading animation during submission
- Success/error messages
- Fields: Name, Email, Message

### 6. Dark Mode
- Toggle button in navigation
- Smooth transition between modes
- Preference saved in browser localStorage
- Works across all sections

### 7. Admin Panel
- Secure login page
- Dashboard showing all messages
- Display: Name, Email, Message, Timestamp
- Delete functionality
- Logout option

### 8. Modern UI
- Gradient backgrounds (Pink/Purple theme)
- Glassmorphism effects
- Smooth animations and transitions
- Professional color scheme

---

## 📄 File Descriptions

### Frontend Files

#### `client/index.html`
- **Purpose:** Main HTML structure
- **Sections:** 
  - Landing page with navigation, hero, about, gallery, contact
  - Admin login page
  - Admin dashboard page
- **Size:** ~500 lines
- **Beginner-friendly:** Yes, well-commented

#### `client/style.css`
- **Purpose:** Complete styling with dark mode support
- **Features:**
  - CSS variables for theming
  - Responsive grid/flexbox layouts
  - Animations and transitions
  - Dark mode variables
  - Mobile media queries
- **Size:** ~800+ lines
- **Beginner-friendly:** Yes, well-organized sections

#### `client/script.js`
- **Purpose:** Frontend logic and interactivity
- **Functions:**
  - Form validation
  - Form submission handling
  - Dark mode toggle
  - Admin login
  - Message display
  - API communication
- **Size:** ~400+ lines
- **Beginner-friendly:** Yes, detailed comments on each function

### Backend Files

#### `server/server.js`
- **Purpose:** Express.js server setup
- **Endpoints:**
  - POST /api/messages - Save messages
  - GET /api/messages - Fetch messages (admin)
  - POST /api/admin/login - Admin authentication
  - DELETE /api/messages/:id - Delete message
- **Size:** ~180 lines
- **Features:** CORS, error handling, validation

#### `server/database.js`
- **Purpose:** SQLite database management
- **Functions:**
  - `saveMessage()` - Save form data
  - `getAllMessages()` - Fetch all messages
  - `verifyAdmin()` - Check admin credentials
  - `deleteMessage()` - Remove a message
- **Size:** ~150 lines
- **Features:** Connection pooling, error handling

#### `package.json`
- **Purpose:** Node.js project configuration
- **Contains:** Dependencies, scripts, metadata
- **Key scripts:** `npm start`, `npm run dev`

### Documentation

#### `README.md`
- Complete project documentation
- Installation instructions
- API references
- Usage guide
- Troubleshooting tips

---

## 🐛 Troubleshooting

### Problem: "npm command not found"
**Solution:** Node.js is not installed. Install from https://nodejs.org

### Problem: "Cannot find module 'express'"
**Solution:** Run `npm install` in project directory

### Problem: "Port 5000 is already in use"
**Solution:** Either:
- Kill the process using port 5000
- Edit `server/server.js` and change `PORT = 5000` to another port
- Close other applications using port 5000

### Problem: "Cannot POST /api/messages"
**Solution:** 
- Ensure server is running
- Check URL is correct: `http://localhost:5000/api/messages`
- Verify backend server started successfully

### Problem: "Database locked"
**Solution:**
- Stop the server
- Delete `server/shecan.db` file
- Restart server (database will be recreated)

### Problem: "Admin login fails"
**Solution:**
- Verify credentials are: `admin` / `admin123`
- Check database exists: `server/shecan.db`
- Try resetting database (delete shecan.db and restart)

### Problem: "Form not submitting"
**Solution:**
- Check browser console (F12) for errors
- Verify backend server is running
- Check form validation passes
- Try filling all fields correctly

### Problem: "CORS error in browser"
**Solution:**
- Ensure CORS is enabled in `server/server.js` ✓ (already done)
- Check both frontend and backend are running
- Try from same origin

### Problem: "Dark mode not working"
**Solution:**
- Check localStorage is not disabled
- Open browser developer tools (F12)
- Look for errors in Console tab
- Try clearing browser cache

---

## 📝 Code Comments Guide

All code files include detailed comments:
- **Function comments** - Explain what each function does
- **Parameter comments** - Show what inputs are expected
- **Logic comments** - Explain complex operations
- **Section headers** - Divide code into logical parts

### Example:
```javascript
/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

---

## 🎓 Learning Resources

### Concepts Covered:
- **Frontend:** HTML5, CSS3 (Grid, Flexbox), Vanilla JavaScript
- **Backend:** Express.js routing, middleware, REST APIs
- **Database:** SQL basics, SQLite3, CRUD operations
- **Design:** Responsive design, dark mode, modern UI trends
- **Security:** Form validation, input sanitization, basic auth

### Next Steps to Learn:
1. Modify colors and styling in `style.css`
2. Add more fields to the contact form
3. Create different admin users in `database.js`
4. Add email notifications for form submissions
5. Deploy the project to the internet
6. Add more database tables for different features

---

## 🚀 Deployment (Optional)

To deploy this project online:

1. **Use services like:**
   - Heroku (free tier)
   - Vercel (frontend only)
   - Render (free tier)
   - AWS (free tier eligible)

2. **Key steps:**
   - Push code to GitHub
   - Connect repository to hosting service
   - Set up environment variables
   - Deploy!

---

## 📞 Support & Contact

**For More Information:**
- 🌐 Website: https://shecanfoundation.org
- 📧 Email: president@shecanfoundation.org
- 📞 Phone: +91 - 8283841830
- 📱 Instagram: [@_shecanfoundation_](https://www.instagram.com/_shecanfoundation_)
- 💼 LinkedIn: [She Can Foundation](https://www.linkedin.com/company/shecanfoundation)

For issues or questions about the website:
- Check the Troubleshooting section
- Review browser console errors (F12)
- Check server logs
- Verify file paths and naming

---

## 📄 License

This project is provided as-is for educational purposes.

---

## 🌟 Features Summary

| Feature | Status | Details |
|---------|--------|---------|
| Responsive Design | ✅ | Mobile, Tablet, Desktop |
| Dark Mode | ✅ | Toggle + localStorage |
| Form Validation | ✅ | Email, Empty field checks |
| Contact Form | ✅ | Name, Email, Message |
| Admin Panel | ✅ | View, Delete messages |
| Admin Auth | ✅ | Login with credentials |
| SQLite Database | ✅ | Message storage |
| REST APIs | ✅ | POST, GET, DELETE |
| Loading Animation | ✅ | Form submission feedback |
| Smooth Scrolling | ✅ | Navigation links |
| Modern UI | ✅ | Gradients, glassmorphism |
| Error Handling | ✅ | Comprehensive validation |

---

## 🎉 Congratulations!

You now have a professional, working full-stack NGO website!

**Remember:** This is just the beginning. Customize it, add more features, and make it your own! 🌸

---

**Last Updated:** May 27, 2024  
**Version:** 1.0.0  
**Status:** Production Ready ✅