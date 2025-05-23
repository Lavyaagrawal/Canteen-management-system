// Dummy categories and menu items
const categories = [
  { id: 'CAT001', name: 'Beverages' },
  { id: 'CAT002', name: 'Snacks' },
  { id: 'CAT003', name: 'Main Course' }
];

// Initialize menu items in localStorage if not present
if (!localStorage.getItem('menuItems')) {
  const initialMenuItems = [
  {
    id: 'F001',
    name: 'Cappuccino',
    category: 'Beverages',
    price: 3.5,
    qty: 30,
    description: 'Hot Italian coffee',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'F002',
    name: 'Veg Sandwich',
    category: 'Snacks',
    price: 2.0,
    qty: 20,
    description: 'Fresh vegetable sandwich',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80'
  }
];
  localStorage.setItem('menuItems', JSON.stringify(initialMenuItems));
}

// Tab switching
const addMenuTab = document.getElementById('add-menu-tab');
const manageMenuTab = document.getElementById('manage-menu-tab');
const addMenuContent = document.getElementById('add-menu-content');
const manageMenuContent = document.getElementById('manage-menu-content');

addMenuTab.addEventListener('click', () => {
  addMenuTab.classList.add('active');
  manageMenuTab.classList.remove('active');
  addMenuContent.style.display = '';
  manageMenuContent.style.display = 'none';
});
manageMenuTab.addEventListener('click', () => {
  manageMenuTab.classList.add('active');
  addMenuTab.classList.remove('active');
  manageMenuContent.style.display = '';
  addMenuContent.style.display = 'none';
});

// Populate category dropdowns
function populateCategories() {
  const addCat = document.getElementById('food-category');
  const editCat = document.getElementById('edit-food-category');
  addCat.innerHTML = '<option value="">Select Category</option>';
  // Read categories from localStorage
  const categories = JSON.parse(localStorage.getItem('categories')) || [];
  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.name;
    opt.textContent = cat.name;
    addCat.appendChild(opt);
  });
  if (editCat) {
    editCat.innerHTML = '<option value="">Select Category</option>';
    categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.name;
      opt.textContent = cat.name;
      editCat.appendChild(opt);
    });
  }
}

// Render menu items
function renderMenu() {
  const menuItems = getMenuItems();
  const tbody = document.getElementById('menu-table-body');
  tbody.innerHTML = '';
  menuItems.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.image ? `<img src="${item.image}" class="menu-img">` : '<span class="menu-img" style="background:#eee;display:inline-block;width:48px;height:48px;border-radius:8px;"></span>'}</td>
      <td>${item.name}</td>
      <td>${item.category}</td>
      <td>₹${parseFloat(item.price).toFixed(2)}</td>
      <td>${item.qty}</td>
      <td>${item.description}</td>
      <td>
        <button class="action-btn edit-btn" onclick="editMenuItem('${item.id}')"><i class="fa fa-edit"></i></button>
        <button class="action-btn delete-btn" onclick="deleteMenuItem('${item.id}')"><i class="fa fa-trash"></i></button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Helper: Get menu items from localStorage
function getMenuItems() {
  return JSON.parse(localStorage.getItem('menuItems') || '[]');
}

// Helper: Save menu items to localStorage
function saveMenuItems(items) {
  localStorage.setItem('menuItems', JSON.stringify(items));
}

// Add Food Item
const addMenuForm = document.getElementById('add-menu-form');
if (addMenuForm) {
  addMenuForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('food-name').value.trim();
    const category = document.getElementById('food-category').value;
    const price = document.getElementById('food-price').value;
    const qty = document.getElementById('food-qty').value;
    const desc = document.getElementById('food-desc').value.trim();
    const imgInput = document.getElementById('food-img');
    let image = '';
    if (imgInput && imgInput.files && imgInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
        image = e.target.result;
        addMenuItem({ name, category, price, qty, description: desc, image });
      };
      reader.readAsDataURL(imgInput.files[0]);
    } else {
      addMenuItem({ name, category, price, qty, description: desc, image: '' });
    }
    addMenuForm.reset();
  });
}

function addMenuItem(item) {
  const menuItems = getMenuItems();
  item.id = Date.now();
  menuItems.push(item);
  saveMenuItems(menuItems);
  renderMenu();
}

// Render Manage Menu Table
function renderManageMenu() {
  const tbody = document.getElementById('menu-table-body');
  if (!tbody) return;
  const menuItems = getMenuItems();
  tbody.innerHTML = '';
  menuItems.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><img src="${item.image || 'https://via.placeholder.com/60'}" alt="${item.name}" style="width:48px;height:48px;border-radius:6px;"></td>
      <td>${item.name}</td>
      <td>${item.category}</td>
      <td>₹${parseFloat(item.price).toFixed(2)}</td>
      <td>${item.qty}</td>
      <td>${item.description}</td>
      <td>
        <button class="edit-btn" data-id="${item.id}"><i class="fa fa-edit"></i></button>
        <button class="delete-btn" data-id="${item.id}"><i class="fa fa-trash"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
  // Attach event listeners for edit/delete
  tbody.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      deleteMenuItem(Number(this.dataset.id));
    });
  });
  tbody.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      openEditModal(Number(this.dataset.id));
    });
  });
}

function deleteMenuItem(id) {
  let menuItems = getMenuItems();
  menuItems = menuItems.filter(item => item.id !== id);
  saveMenuItems(menuItems);
  renderManageMenu();
}

// Edit Modal Logic
const editModal = document.getElementById('edit-food-modal');
const editForm = document.getElementById('edit-food-form');
if (editModal && editForm) {
  editModal.querySelector('.close').onclick = () => editModal.style.display = 'none';
  window.onclick = function(event) {
    if (event.target === editModal) editModal.style.display = 'none';
  };
  editForm.onsubmit = function(e) {
    e.preventDefault();
    const id = Number(document.getElementById('edit-food-id').value);
    const name = document.getElementById('edit-food-name').value.trim();
    const category = document.getElementById('edit-food-category').value;
    const price = document.getElementById('edit-food-price').value;
    const qty = document.getElementById('edit-food-qty').value;
    const desc = document.getElementById('edit-food-desc').value.trim();
    const imgInput = document.getElementById('edit-food-img');
    let image = '';
    if (imgInput && imgInput.files && imgInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
        image = e.target.result;
        updateMenuItem(id, { name, category, price, qty, description: desc, image });
      };
      reader.readAsDataURL(imgInput.files[0]);
    } else {
      updateMenuItem(id, { name, category, price, qty, description: desc });
    }
    editModal.style.display = 'none';
  };
}

function openEditModal(id) {
  const menuItems = getMenuItems();
  const item = menuItems.find(i => i.id === id);
  if (!item) return;
  document.getElementById('edit-food-id').value = item.id;
  document.getElementById('edit-food-name').value = item.name;
  document.getElementById('edit-food-category').value = item.category;
  document.getElementById('edit-food-price').value = item.price;
  document.getElementById('edit-food-qty').value = item.qty;
  document.getElementById('edit-food-desc').value = item.description;
  // Don't set image for edit (optional)
  editModal.style.display = 'flex';
}

function updateMenuItem(id, newData) {
  let menuItems = getMenuItems();
  menuItems = menuItems.map(item => item.id === id ? { ...item, ...newData } : item);
  saveMenuItems(menuItems);
  renderManageMenu();
}

// Search menu
const menuSearch = document.getElementById('menu-search');
if (menuSearch) {
menuSearch.addEventListener('input', function(e) {
  const term = e.target.value.toLowerCase();
    const menuItems = getMenuItems();
  const filtered = menuItems.filter(item =>
    item.name.toLowerCase().includes(term) ||
    item.category.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term)
  );
    
    const tbody = document.getElementById('menu-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    filtered.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><img src="${item.image || 'https://via.placeholder.com/60'}" alt="${item.name}" style="width:48px;height:48px;border-radius:6px;"></td>
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td>₹${parseFloat(item.price).toFixed(2)}</td>
        <td>${item.qty}</td>
        <td>${item.description}</td>
        <td>
          <button class="edit-btn" data-id="${item.id}"><i class="fa fa-edit"></i></button>
          <button class="delete-btn" data-id="${item.id}"><i class="fa fa-trash"></i></button>
        </td>
      `;
      tbody.appendChild(tr);
});

    // Reattach event listeners for edit/delete buttons
    tbody.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        deleteMenuItem(Number(this.dataset.id));
      });
    });
    tbody.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        openEditModal(Number(this.dataset.id));
      });
    });
  });
}

// Initial setup
populateCategories();
renderMenu();
renderManageMenu();

// Example function to show the professional invoice
function showProfessionalInvoice(invoiceData) {
  // Fill in the header/meta
  document.getElementById('inv-number').textContent = invoiceData.invoiceNumber;
  document.getElementById('inv-date').textContent = invoiceData.date;
  document.getElementById('inv-order-id').textContent = invoiceData.orderId;
  document.getElementById('inv-customer-name').textContent = invoiceData.customerName;
  document.getElementById('inv-customer-email').textContent = invoiceData.customerEmail;
  document.getElementById('inv-customer-phone').textContent = invoiceData.customerPhone;

  // Fill in the items table
  const itemsBody = document.getElementById('inv-items-body');
  itemsBody.innerHTML = '';
  invoiceData.items.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.description}</td>
      <td>${item.qty}</td>
      <td>₹${item.rate.toFixed(2)}</td>
      <td>₹${(item.qty * item.rate).toFixed(2)}</td>
    `;
    itemsBody.appendChild(row);
  });

  // Fill in totals
  document.getElementById('inv-subtotal').textContent = `₹${invoiceData.subtotal.toFixed(2)}`;
  document.getElementById('inv-tax').textContent = `₹${invoiceData.tax.toFixed(2)}`;
  document.getElementById('inv-total').innerHTML = `<strong>₹${invoiceData.total.toFixed(2)}</strong>`;
  document.getElementById('inv-payment-method').textContent = invoiceData.paymentMethod;

  // Show the invoice section
  document.getElementById('professional-invoice').style.display = 'block';
}

// Example usage:
const sampleInvoice = {
  invoiceNumber: 'INV-2024-0001',
  date: '2024-05-25',
  orderId: 'ORD-000479',
  customerName: 'Jane Doe',
  customerEmail: 'jane@example.com',
  customerPhone: '+91-9876543210',
  items: [
    { description: 'Maggi', qty: 1, rate: 40.00 },
    // Add more items as needed
  ],
  subtotal: 40.00,
  tax: 2.00,
  total: 42.00,
  paymentMethod: 'Cash'
};

// To show the invoice, call:
showProfessionalInvoice(sampleInvoice); 