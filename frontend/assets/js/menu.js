// Menu Add to Cart Logic (Improved)
function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}
function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
function updateCartIcon() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
}
function showToast(msg) {
  let toast = document.createElement('div');
  toast.className = 'cart-toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => { toast.classList.add('show'); }, 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 1500);
}
function addToCart(item) {
  let cart = getCart();
  const idx = cart.findIndex(i => i.id === item.id);
  if (idx > -1) {
    if (cart[idx].quantity >= 10) {
      showToast('Max 10 per item!');
      return false;
    }
    cart[idx].quantity += 1;
    showToast('Added to cart!');
  } else {
    cart.push({ ...item, quantity: 1 });
    showToast('Added to cart!');
  }
  setCart(cart);
  updateCartIcon();
  return true;
}
document.addEventListener('DOMContentLoaded', function() {
  // Initialize cart from localStorage or empty array
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Update cart count in header
  function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
  }

  // Add to cart functionality
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
      const card = this.closest('.menu-card');
      const item = {
        id: Date.now().toString(), // Unique ID for each item
        name: card.querySelector('h3').textContent,
        price: parseFloat(card.querySelector('.menu-price').textContent.replace('₹', '').replace('$', '')),
        image: card.querySelector('img').src,
        desc: card.querySelector('p').textContent,
        quantity: 1
      };

      // Check if item already exists in cart
      const existingItem = cart.find(i => i.name === item.name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push(item);
      }

      // Save to localStorage and update UI
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();

      // Show added to cart animation
      this.textContent = 'Added!';
      this.style.backgroundColor = '#27ae60';
      setTimeout(() => {
        this.textContent = 'Add to Cart';
        this.style.backgroundColor = '';
      }, 1000);
    });
  });

  // Search functionality
  const searchInput = document.querySelector('.search-bar input');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      // Remove old placeholders
      document.querySelectorAll('.menu-card.placeholder').forEach(el => el.remove());
      let visibleCount = 0;
      document.querySelectorAll('.menu-card').forEach(card => {
        // Skip placeholders
        if (card.classList.contains('placeholder')) return;
        const name = card.querySelector('h3').textContent.toLowerCase();
        const desc = card.querySelector('p').textContent.toLowerCase();
        if (name.includes(searchTerm) || desc.includes(searchTerm)) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });
      // Add placeholders for grid alignment
      const remainder = visibleCount % 3;
      if (remainder !== 0 && visibleCount !== 0) {
        const menuGrid = document.querySelector('.menu-grid');
        for (let i = 0; i < 3 - remainder; i++) {
          const placeholder = document.createElement('div');
          placeholder.className = 'menu-card placeholder';
          placeholder.style.visibility = 'hidden';
          placeholder.style.pointerEvents = 'none';
          menuGrid.appendChild(placeholder);
        }
      }
    });
  }

  // Dynamically render filter buttons from localStorage categories
  function renderCategoryFilters() {
    const filterContainer = document.getElementById('filter-btns');
    if (!filterContainer) return;
    filterContainer.innerHTML = '';
    // Always add the 'All' button
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.dataset.filter = 'all';
    allBtn.innerHTML = '<i class="fa fa-utensils"></i> All';
    filterContainer.appendChild(allBtn);
    // Get categories from localStorage
    const categories = JSON.parse(localStorage.getItem('categories')) || [];
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn';
      btn.dataset.filter = cat.name;
      btn.innerHTML = `<i class="fa fa-tag"></i> ${cat.name}`;
      filterContainer.appendChild(btn);
    });
  }
  renderCategoryFilters();

  // Filter functionality (re-attach after rendering)
  function attachFilterEvents() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        const filter = this.dataset.filter;
        document.querySelectorAll('.menu-card').forEach(card => {
          if (filter === 'all') {
            card.style.display = '';
          } else {
            // Filter by category name
            const cat = card.getAttribute('data-category') || '';
            card.style.display = (cat === filter) ? '' : 'none';
          }
        });
      });
    });
  }
  // Call after rendering filters
  attachFilterEvents();

  // Listen for localStorage changes (optional, for live update)
  window.addEventListener('storage', function(e) {
    if (e.key === 'categories') {
      renderCategoryFilters();
      attachFilterEvents();
    }
  });

  // Initialize cart count on page load
  updateCartCount();

  // Toast styles
  const style = document.createElement('style');
  style.textContent = `
    .cart-toast {
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%) scale(0.95);
      background: #ff6600;
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
    .cart-toast.show {
      opacity: 1;
      transform: translateX(-50%) scale(1);
    }
  `;
  document.head.appendChild(style);
}); 