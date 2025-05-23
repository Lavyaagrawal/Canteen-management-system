// Default avatar URLs
const DEFAULT_AVATARS = [
    'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Aarav',
    'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Priya',
    'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Rohan',
    'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Ananya',
    'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Kabir',
    'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Isha',
    'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Dev',
    'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Sneha',
    'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Arjun',
    'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Meera'
];

// Get user's avatar or generate a default one
function getUserAvatar(userData) {
    if (userData.avatar) {
        return userData.avatar;
    }
    // No default image, return empty string for blank/initials state
    return '';
}

// Show avatar selection modal
function showAvatarSelection() {
    const modal = document.createElement('div');
    modal.className = 'avatar-modal';
    modal.innerHTML = `
        <div class="avatar-modal-content">
            <h3>Choose Your Avatar</h3>
            <div class="avatar-grid">
                ${DEFAULT_AVATARS.map((avatar, index) => `
                    <div class="avatar-option" onclick="selectAvatar('${avatar}')">
                        <img src="${avatar}" alt="Avatar ${index + 1}">
                    </div>
                `).join('')}
            </div>
            <div style="text-align:center; margin: 1.2rem 0 0.5rem 0;">
                <label class="btn btn-primary" style="cursor:pointer;">
                    <i class="fas fa-upload"></i> Upload Photo
                    <input type="file" id="avatarUploadInput" accept="image/*" style="display:none;">
                </label>
            </div>
            <button class="btn btn-primary" onclick="closeAvatarModal()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
    // Add upload handler
    document.getElementById('avatarUploadInput').addEventListener('change', handleAvatarUpload);
}

// Handle avatar upload
function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        const dataUrl = evt.target.result;
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        userData.avatar = dataUrl;
        localStorage.setItem('user', JSON.stringify(userData));
        // Update avatar in profile
        const profileAvatar = document.getElementById('profileAvatar');
        if (profileAvatar) profileAvatar.src = dataUrl;
        // Update avatar in navigation
        const navAvatar = document.querySelector('.profile-pic');
        if (navAvatar) navAvatar.src = dataUrl;
        closeAvatarModal();
    };
    reader.readAsDataURL(file);
}

// Select avatar
function selectAvatar(avatarUrl) {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    userData.avatar = avatarUrl;
    localStorage.setItem('user', JSON.stringify(userData));
    updateNavigation();
    closeAvatarModal();
}

// Close avatar modal
function closeAvatarModal() {
    const modal = document.querySelector('.avatar-modal');
    if (modal) {
        modal.remove();
    }
}

// Add avatar selection to profile dropdown
function addAvatarSelectionToDropdown() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        const avatarOption = document.createElement('a');
        avatarOption.className = 'dropdown-item';
        avatarOption.innerHTML = '<i class="fas fa-user-circle"></i> Change Avatar';
        avatarOption.onclick = showAvatarSelection;
        
        // Insert before the divider
        const divider = dropdown.querySelector('.dropdown-divider');
        if (divider) {
            dropdown.insertBefore(avatarOption, divider);
        } else {
            dropdown.appendChild(avatarOption);
        }
    }
} 