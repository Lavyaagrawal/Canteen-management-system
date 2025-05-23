// Initialize categories from localStorage if available
let categories = JSON.parse(localStorage.getItem('categories')) || [
  { id: 'CAT001', name: 'Beverages', desc: 'Drinks and refreshments' },
  { id: 'CAT002', name: 'Snacks', desc: 'Quick bites and snacks' },
  { id: 'CAT003', name: 'Main Course', desc: 'Hearty meals' }
];

const categoryTableBody = document.getElementById('category-table-body');
const categorySearch = document.getElementById('category-search');
const addCategoryBtn = document.querySelector('.add-category-btn');
const categoryModal = document.getElementById('category-modal');
const closeModal = document.querySelector('#category-modal .close');
const categoryForm = document.getElementById('category-form');
const modalTitle = document.getElementById('modal-title');

// Render categories
function renderCategories(filtered = categories) {
  categoryTableBody.innerHTML = '';
  filtered.forEach(cat => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${cat.id}</td>
      <td>${cat.name}</td>
      <td>${cat.desc}</td>
      <td>
        <button class="action-btn edit-btn" onclick="editCategory('${cat.id}')"><i class="fa fa-edit"></i></button>
        <button class="action-btn delete-btn" onclick="deleteCategory('${cat.id}')"><i class="fa fa-trash"></i></button>
      </td>
    `;
    categoryTableBody.appendChild(row);
  });
}

// Open modal for add
addCategoryBtn.addEventListener('click', () => {
  modalTitle.textContent = 'Add Category';
  categoryForm.reset();
  document.getElementById('category-id').value = '';
  categoryModal.style.display = 'block';
});

// Close modal
closeModal.addEventListener('click', () => {
  categoryModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === categoryModal) {
    categoryModal.style.display = 'none';
  }
});

// Search functionality
categorySearch.addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = categories.filter(cat =>
    cat.name.toLowerCase().includes(term) ||
    cat.desc.toLowerCase().includes(term)
  );
  renderCategories(filtered);
});

// Form submit (add/edit)
categoryForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = document.getElementById('category-id').value;
  const name = document.getElementById('category-name').value;
  const desc = document.getElementById('category-desc').value;

  if (id) {
    // Edit
    const idx = categories.findIndex(c => c.id === id);
    if (idx !== -1) {
      categories[idx].name = name;
      categories[idx].desc = desc;
    }
  } else {
    // Add
    const newId = 'CAT' + String(categories.length + 1).padStart(3, '0');
    categories.push({ id: newId, name, desc });
  }
  renderCategories();
  saveCategories();
  categoryModal.style.display = 'none';
});

// Edit category
window.editCategory = function(id) {
  const cat = categories.find(c => c.id === id);
  if (cat) {
    modalTitle.textContent = 'Edit Category';
    document.getElementById('category-id').value = cat.id;
    document.getElementById('category-name').value = cat.name;
    document.getElementById('category-desc').value = cat.desc;
    categoryModal.style.display = 'block';
  }
};

// Delete category
window.deleteCategory = function(id) {
  if (confirm('Are you sure you want to delete this category?')) {
    categories = categories.filter(c => c.id !== id);
    renderCategories();
    saveCategories();
  }
};

// After any change to categories (add, edit, delete), update localStorage
function saveCategories() {
  localStorage.setItem('categories', JSON.stringify(categories));
}

// Initial render
renderCategories();