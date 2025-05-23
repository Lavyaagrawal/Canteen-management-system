// Admin Profile Page Logic

document.addEventListener('DOMContentLoaded', function() {
    // Placeholder: Load admin info from localStorage or API
    const admin = JSON.parse(localStorage.getItem('currentAdmin')) || {
        username: 'admin',
        email: 'admin@example.com',
        phone: '1234567890',
        address: 'MIT ADT University',
        profile_picture: '../assets/images/default-avatar.png',
        role: 'Admin'
    };

    // Elements
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');
    const roleInput = document.getElementById('role');
    const profilePicture = document.getElementById('profile-picture');
    const profilePictureInput = document.getElementById('profile-picture-input');
    const changePictureBtn = document.getElementById('change-picture-btn');
    const editBtn = document.getElementById('edit-btn');
    const saveBtn = document.getElementById('save-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const form = document.getElementById('profile-form');

    // Load admin info
    function loadProfile() {
        usernameInput.value = admin.username;
        emailInput.value = admin.email;
        phoneInput.value = admin.phone;
        addressInput.value = admin.address;
        roleInput.value = admin.role;
        profilePicture.src = admin.profile_picture || '../assets/images/default-avatar.png';
    }

    // Enable editing
    function enableEdit() {
        usernameInput.disabled = false;
        emailInput.disabled = false;
        phoneInput.disabled = false;
        addressInput.disabled = false;
        changePictureBtn.style.display = '';
        saveBtn.style.display = '';
        cancelBtn.style.display = '';
        editBtn.style.display = 'none';
    }

    // Disable editing
    function disableEdit() {
        usernameInput.disabled = true;
        emailInput.disabled = true;
        phoneInput.disabled = true;
        addressInput.disabled = true;
        changePictureBtn.style.display = 'none';
        saveBtn.style.display = 'none';
        cancelBtn.style.display = 'none';
        editBtn.style.display = '';
    }

    // Save changes
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        admin.username = usernameInput.value;
        admin.email = emailInput.value;
        admin.phone = phoneInput.value;
        admin.address = addressInput.value;
        // Save to localStorage (replace with API call in production)
        localStorage.setItem('currentAdmin', JSON.stringify(admin));
        disableEdit();
        loadProfile();
        alert('Profile updated!');
    });

    // Edit button
    editBtn.addEventListener('click', function() {
        enableEdit();
    });

    // Cancel button
    cancelBtn.addEventListener('click', function() {
        disableEdit();
        loadProfile();
    });

    // Change picture
    changePictureBtn.addEventListener('click', function() {
        profilePictureInput.click();
    });
    profilePictureInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(evt) {
                admin.profile_picture = evt.target.result;
                profilePicture.src = evt.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Logout
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('currentAdmin');
        window.location.href = '../index.html';
    });

    // Initial state
    disableEdit();
    loadProfile();
}); 