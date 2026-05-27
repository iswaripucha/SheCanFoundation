// ========== She Can Foundation - Frontend JavaScript ========== 
// Handles form validation, submission, dark mode, and admin functions

// ========== CONFIGURATION ==========
const API_BASE_URL = 'http://localhost:5000/api';
let adminToken = null;

// ========== INITIALIZATION ==========

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ She Can Foundation website loaded');

  // Load dark mode preference
  loadDarkModePreference();

  // Add form submission listener
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }

  // Add admin login listener
  const adminLoginForm = document.getElementById('adminLoginForm');
  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', handleAdminLogin);
  }

  // Add dark mode toggle listener
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
  }
});

// ========== DARK MODE FUNCTIONALITY ==========

/**
 * Toggle dark mode on/off
 * Saves preference to localStorage
 */
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');

  // Save preference to localStorage
  const isDarkMode = body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', JSON.stringify(isDarkMode));

  // Update button text
  const toggle = document.getElementById('darkModeToggle');
  toggle.textContent = isDarkMode ? '☀️' : '🌙';

  console.log(`🌙 Dark mode: ${isDarkMode ? 'ON' : 'OFF'}`);
}

/**
 * Load dark mode preference from localStorage
 */
function loadDarkModePreference() {
  const darkModePreference = localStorage.getItem('darkMode');

  if (darkModePreference) {
    const isDarkMode = JSON.parse(darkModePreference);
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      const toggle = document.getElementById('darkModeToggle');
      if (toggle) toggle.textContent = '☀️';
    }
  }
}

// ========== FORM VALIDATION FUNCTIONS ==========

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Clear all validation error messages
 */
function clearErrors() {
  document.getElementById('nameError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('messageError').textContent = '';
  document.getElementById('formError').style.display = 'none';
}

/**
 * Validate contact form data
 * @returns {boolean} - True if form is valid
 */
function validateForm() {
  clearErrors();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  let isValid = true;

  // Validate name
  if (name === '') {
    document.getElementById('nameError').textContent = '❌ Please enter your name';
    isValid = false;
  } else if (name.length < 2) {
    document.getElementById('nameError').textContent = '❌ Name must be at least 2 characters';
    isValid = false;
  }

  // Validate email
  if (email === '') {
    document.getElementById('emailError').textContent = '❌ Please enter your email';
    isValid = false;
  } else if (!isValidEmail(email)) {
    document.getElementById('emailError').textContent = '❌ Please enter a valid email address';
    isValid = false;
  }

  // Validate message
  if (message === '') {
    document.getElementById('messageError').textContent = '❌ Please enter your message';
    isValid = false;
  } else if (message.length < 10) {
    document.getElementById('messageError').textContent = '❌ Message must be at least 10 characters';
    isValid = false;
  }

  return isValid;
}

// ========== FORM SUBMISSION FUNCTION ==========

/**
 * Handle contact form submission
 * Validates form, shows loading animation, sends data to server
 * @param {Event} e - Form submission event
 */
async function handleFormSubmit(e) {
  e.preventDefault();

  // Validate form before submission
  if (!validateForm()) {
    console.log('❌ Form validation failed');
    return;
  }

  // Get form data
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  console.log('📤 Submitting form...', { name, email });

  // Show loading state
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const loader = document.getElementById('loader');

  submitBtn.disabled = true;
  btnText.style.display = 'none';
  loader.style.display = 'inline-block';

  try {
    // Send form data to backend API
    const response = await fetch(`${API_BASE_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message })
    });

    const result = await response.json();

    if (response.ok && result.success) {
      // Success! Show success message
      console.log('✅ Form submitted successfully');
      displaySuccessMessage();
      resetForm();
    } else {
      // Error from server
      console.error('❌ Server error:', result.message);
      displayErrorMessage(result.message || 'Failed to submit form');
    }
  } catch (error) {
    // Network or other error
    console.error('❌ Error:', error);
    displayErrorMessage('Network error: Please check your connection');
  } finally {
    // Reset button state
    submitBtn.disabled = false;
    btnText.style.display = 'inline';
    loader.style.display = 'none';
  }
}

/**
 * Display success message after form submission
 */
function displaySuccessMessage() {
  const successMsg = document.getElementById('successMessage');
  successMsg.style.display = 'block';

  // Hide success message after 5 seconds
  setTimeout(() => {
    successMsg.style.display = 'none';
  }, 5000);
}

/**
 * Display error message
 * @param {string} message - Error message to display
 */
function displayErrorMessage(message) {
  const errorMsg = document.getElementById('formError');
  errorMsg.textContent = `❌ ${message}`;
  errorMsg.style.display = 'block';

  // Hide error after 5 seconds
  setTimeout(() => {
    errorMsg.style.display = 'none';
  }, 5000);
}

/**
 * Reset form to empty state
 */
function resetForm() {
  document.getElementById('contactForm').reset();
  clearErrors();
}

// ========== ADMIN FUNCTIONS ==========

/**
 * Show admin login page
 * @param {Event} e - Click event
 */
function showAdminLogin(e) {
  e.preventDefault();
  
  document.getElementById('landing-page').style.display = 'none';
  document.getElementById('admin-login-page').style.display = 'block';
  document.getElementById('admin-panel-page').style.display = 'none';

  console.log('📋 Admin login page shown');
}

/**
 * Go back to home page from admin login or admin panel
 */
function backToHome() {
  document.getElementById('landing-page').style.display = 'block';
  document.getElementById('admin-login-page').style.display = 'none';
  document.getElementById('admin-panel-page').style.display = 'none';

  console.log('🏠 Back to home');
}

/**
 * Handle admin login form submission
 * @param {Event} e - Form submission event
 */
async function handleAdminLogin(e) {
  e.preventDefault();

  const username = document.getElementById('adminUsername').value.trim();
  const password = document.getElementById('adminPassword').value.trim();

  // Clear previous errors
  document.getElementById('adminUsernameError').textContent = '';
  document.getElementById('adminPasswordError').textContent = '';
  document.getElementById('adminLoginError').style.display = 'none';

  // Validate inputs
  if (!username) {
    document.getElementById('adminUsernameError').textContent = 'Username is required';
    return;
  }
  if (!password) {
    document.getElementById('adminPasswordError').textContent = 'Password is required';
    return;
  }

  console.log('🔐 Authenticating admin...');

  try {
    // Send login request to backend
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    if (response.ok && result.success) {
      // Login successful
      adminToken = result.token;
      console.log('✅ Admin login successful');

      // Show admin panel and load messages
      document.getElementById('admin-login-page').style.display = 'none';
      document.getElementById('admin-panel-page').style.display = 'block';

      loadMessages();
    } else {
      // Login failed
      console.error('❌ Login failed:', result.message);
      const errorMsg = document.getElementById('adminLoginError');
      errorMsg.textContent = result.message || 'Invalid credentials';
      errorMsg.style.display = 'block';
    }
  } catch (error) {
    console.error('❌ Error:', error);
    const errorMsg = document.getElementById('adminLoginError');
    errorMsg.textContent = 'Network error: Please check your connection';
    errorMsg.style.display = 'block';
  }
}

/**
 * Load all submitted messages from database and display them
 */
async function loadMessages() {
  if (!adminToken) {
    console.error('❌ Admin token not available');
    return;
  }

  const messagesList = document.getElementById('messagesList');
  messagesList.innerHTML = '<p class="loading-text">Loading messages...</p>';

  console.log('📨 Fetching messages from database...');

  try {
    // Fetch messages from backend API
    const response = await fetch(
      `${API_BASE_URL}/messages?admin_token=${adminToken}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    const result = await response.json();

    if (response.ok && result.success) {
      console.log(`✅ Retrieved ${result.messages.length} messages`);
      displayMessages(result.messages);
    } else {
      console.error('❌ Failed to fetch messages:', result.message);
      messagesList.innerHTML = `<p class="no-messages">Error: ${result.message}</p>`;
    }
  } catch (error) {
    console.error('❌ Error fetching messages:', error);
    messagesList.innerHTML = '<p class="no-messages">Error loading messages</p>';
  }
}

/**
 * Display messages in the admin panel
 * @param {Array} messages - Array of message objects
 */
function displayMessages(messages) {
  const messagesList = document.getElementById('messagesList');

  if (messages.length === 0) {
    messagesList.innerHTML = '<p class="no-messages">No messages yet</p>';
    return;
  }

  // Create HTML for each message
  messagesList.innerHTML = messages.map((msg, index) => `
    <div class="message-card">
      <h4>#${msg.id} - ${msg.name}</h4>
      <p><strong>Email:</strong> ${escapeHtml(msg.email)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(msg.message)}</p>
      <div class="message-meta">
        <span>📅 ${new Date(msg.created_at).toLocaleString()}</span>
        <button class="delete-btn" onclick="deleteMessage(${msg.id})">
          🗑️ Delete
        </button>
      </div>
    </div>
  `).join('');

  console.log('✅ Messages displayed');
}

/**
 * Delete a message from the database
 * @param {number} messageId - ID of message to delete
 */
async function deleteMessage(messageId) {
  if (!confirm('Are you sure you want to delete this message?')) {
    return;
  }

  console.log(`🗑️ Deleting message ${messageId}...`);

  try {
    const response = await fetch(
      `${API_BASE_URL}/messages/${messageId}?admin_token=${adminToken}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    const result = await response.json();

    if (response.ok && result.success) {
      console.log('✅ Message deleted');
      loadMessages(); // Reload messages
    } else {
      console.error('❌ Failed to delete message:', result.message);
      alert('Failed to delete message');
    }
  } catch (error) {
    console.error('❌ Error:', error);
    alert('Error deleting message');
  }
}

/**
 * Admin logout
 */
function adminLogout() {
  if (!confirm('Are you sure you want to logout?')) {
    return;
  }

  adminToken = null;
  console.log('👋 Admin logged out');
  backToHome();
}

// ========== UTILITY FUNCTIONS ==========

/**
 * Escape HTML special characters to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ========== CONSOLE LOGGING ==========

console.log(`
╔════════════════════════════════════════╗
║   She Can Foundation - Frontend Ready   ║
╠════════════════════════════════════════╣
║   📱 Responsive Design Enabled         ║
║   🌙 Dark Mode Available               ║
║   📧 Form Validation Active            ║
║   🔐 Admin Panel Ready                 ║
║   🌐 API Connected                     ║
╚════════════════════════════════════════╝
`);
