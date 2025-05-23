// assets/js/featured-menu.js

document.addEventListener('DOMContentLoaded', function () {
  // Fetch menu items from localStorage
  let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];

  // Determine featured items: top 4 by orderCount, or 4 random if not available
  let featured = [];
  if (menuItems.some(item => typeof item.orderCount === 'number')) {
    featured = [...menuItems]
      .sort((a, b) => (b.orderCount || 0) - (a.orderCount || 0))
      .slice(0, 4);
  } else {
    // Pick 4 random items
    const shuffled = [...menuItems].sort(() => 0.5 - Math.random());
    featured = shuffled.slice(0, 4);
  }

  // Render featured items
  const grid = document.querySelector('.featured-menu-grid');
  if (!grid) return;

  grid.innerHTML = '';
  featured.forEach(item => {
    const card = document.createElement('div');
    card.className = 'menu-card';
    card.innerHTML = `
      <div class="menu-img-wrap">
        <img src="${item.image || 'https://via.placeholder.com/120'}" alt="${item.name}">
        ${item.vegetarian ? '<span class="badge badge-veg">Vegetarian</span>' : ''}
        <span class="badge badge-featured">Popular</span>
      </div>
      <h3>${item.name}</h3>
      <p>${item.description || ''}</p>
      <div class="menu-card-bottom">
        <span class="menu-price">₹${parseFloat(item.price).toFixed(2)}</span>
        <button class="btn btn-primary add-to-cart">Add to Cart</button>
      </div>
    `;
    grid.appendChild(card);

    // Add to cart handler
    card.querySelector('.add-to-cart').addEventListener('click', function () {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const idx = cart.findIndex(i => i.id === item.id);
      if (idx > -1) {
        if (cart[idx].quantity >= 10) {
          showToast('Max 10 per item!');
          return;
        }
        cart[idx].quantity += 1;
        showToast('Added to cart!');
      } else {
        cart.push({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          description: item.description,
          quantity: 1
        });
        showToast('Added to cart!');
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      // Visual feedback
      this.textContent = 'Added!';
      this.style.backgroundColor = '#27ae60';
      setTimeout(() => {
        this.textContent = 'Add to Cart';
        this.style.backgroundColor = '';
      }, 1000);
    });
  });

  // Update cart icon count
  function updateCartCount() {
    let cart = [];
    try {
      cart = JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
      cart = [];
    }
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
  }

  // Toast feedback (copied from menu.js)
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

  updateCartCount();
}); 