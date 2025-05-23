document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginContent = document.getElementById('login-content');
    const registerContent = document.getElementById('register-content');

    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginContent.style.display = '';
        registerContent.style.display = 'none';
    });

    registerTab.addEventListener('click', () => {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerContent.style.display = '';
        loginContent.style.display = 'none';
    });

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

            // Get sellers from localStorage
            const sellers = JSON.parse(localStorage.getItem('sellers') || '[]');
            const seller = sellers.find(s => s.email === email && s.password === password);

            if (seller) {
                // Store seller info in localStorage
                localStorage.setItem('currentSeller', JSON.stringify({
                    id: seller.id,
                    canteenName: seller.canteenName,
                    ownerName: seller.ownerName,
                    email: seller.email,
                    isLoggedIn: true
                }));

                // Redirect to seller dashboard
                window.location.href = 'home.html';
            } else {
                showToast('Invalid email or password');
            }
        });
    }

    // Handle register form submission
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const canteenName = document.getElementById('canteen-name').value;
            const ownerName = document.getElementById('owner-name').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Basic validation
            if (password !== confirmPassword) {
                showToast('Passwords do not match!');
                return;
            }

            // Get existing sellers
            const sellers = JSON.parse(localStorage.getItem('sellers') || '[]');

            // Check if email already exists
            if (sellers.some(s => s.email === email)) {
                showToast('Email already registered!');
                return;
            }

            // Create new seller
            const newSeller = {
                id: Date.now(),
                canteenName,
                ownerName,
                email,
                password,
                createdAt: new Date().toISOString()
            };

            // Save seller
            sellers.push(newSeller);
            localStorage.setItem('sellers', JSON.stringify(sellers));

            // Store current seller info
            localStorage.setItem('currentSeller', JSON.stringify({
                id: newSeller.id,
                canteenName: newSeller.canteenName,
                ownerName: newSeller.ownerName,
                email: newSeller.email,
                isLoggedIn: true
            }));

            // Redirect to seller dashboard
            window.location.href = 'home.html';
        });
    }
});

// Toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
} 