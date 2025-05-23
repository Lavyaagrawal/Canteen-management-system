document.addEventListener('DOMContentLoaded', function() {
  const editBtn = document.querySelector('.edit-profile');
  const saveBtn = document.querySelector('.save-profile');
  const form = document.querySelector('.profile-form');
  const inputs = form.querySelectorAll('input');
  const avatarBtn = document.querySelector('.edit-avatar');
  const avatarImg = document.querySelector('.profile-avatar');

  let editing = false;
  let originalValues = {};

  // Enable editing
  editBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (!editing) {
      editing = true;
      inputs.forEach(input => {
        originalValues[input.id] = input.value;
        input.removeAttribute('readonly');
        input.classList.add('editing');
      });
      saveBtn.classList.remove('hidden');
      editBtn.textContent = 'Cancel';
    } else {
      // Cancel editing
      editing = false;
      inputs.forEach(input => {
        input.value = originalValues[input.id];
        input.setAttribute('readonly', true);
        input.classList.remove('editing');
      });
      saveBtn.classList.add('hidden');
      editBtn.textContent = 'Edit Profile';
    }
  });

  // Save changes (mock)
  saveBtn.addEventListener('click', function(e) {
    e.preventDefault();
    editing = false;
    inputs.forEach(input => {
      input.setAttribute('readonly', true);
      input.classList.remove('editing');
    });
    saveBtn.classList.add('hidden');
    editBtn.textContent = 'Edit Profile';
    // Show a toast or alert (mock)
    showToast('Profile updated!');
  });

  // Avatar upload (mock)
  avatarBtn.addEventListener('click', function(e) {
    e.preventDefault();
    // Simulate file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = function(ev) {
      const file = ev.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          avatarImg.src = evt.target.result;
          showToast('Avatar updated!');
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  });

  // Toast function
  function showToast(msg) {
    let toast = document.createElement('div');
    toast.className = 'profile-toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => { toast.classList.add('show'); }, 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 2000);
  }

  // Toast styles
  const style = document.createElement('style');
  style.textContent = `
    .profile-toast {
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%) scale(0.95);
      background: var(--primary);
      color: #fff;
      padding: 0.9rem 2.2rem;
      border-radius: 2rem;
      font-size: 1.1rem;
      font-weight: 600;
      opacity: 0;
      pointer-events: none;
      z-index: 9999;
      transition: opacity 0.3s, transform 0.3s;
      box-shadow: 0 4px 24px rgba(0,0,0,0.13);
    }
    .profile-toast.show {
      opacity: 1;
      transform: translateX(-50%) scale(1);
    }
    .profile-form input.editing {
      border: 2px solid var(--primary);
      background: #fffbe7;
    }
  `;
  document.head.appendChild(style);
}); 