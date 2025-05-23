document.addEventListener('DOMContentLoaded', function() {
  // Toggle password visibility
  const togglePasswordButtons = document.querySelectorAll('.toggle-password');
  togglePasswordButtons.forEach(button => {
    button.addEventListener('click', function() {
      const input = this.previousElementSibling;
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      this.querySelector('i').classList.toggle('fa-eye');
      this.querySelector('i').classList.toggle('fa-eye-slash');
    });
  });

  // Handle login form submission
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      // For demo purposes, we'll use a simple check
      if (email && password) {
        // Store user info in localStorage
        localStorage.setItem('user', JSON.stringify({
          email: email,
          isLoggedIn: true
        }));
        
        // Redirect to home page
        window.location.href = 'index.html';
      }
    });
  }

  // Handle signup form submission
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const fullname = document.getElementById('fullname').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      const studentId = document.getElementById('student-id').value;

      // Basic validation
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      if (fullname && email && password && studentId) {
        // Store user info in localStorage
        localStorage.setItem('user', JSON.stringify({
          fullname: fullname,
          email: email,
          studentId: studentId,
          isLoggedIn: true
        }));
        
        // Redirect to home page
        window.location.href = 'index.html';
      }
    });
  }

  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem('user'));
  const isAuthPage = window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html');
  if (user && user.isLoggedIn && !isAuthPage) {
    // Update UI for logged-in state
    const navActions = document.querySelector('.nav-actions');
    if (navActions) {
      navActions.innerHTML = `
        <a href="profile.html" class="nav-link">Profile</a>
        <button class="btn btn-primary nav-signin" onclick="logout()">Sign Out</button>
      `;
    }
  }
});

// Logout function
function logout() {
  localStorage.removeItem('user');
  window.location.href = 'login.html';
} 