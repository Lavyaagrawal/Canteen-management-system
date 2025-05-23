// Professional Cart Management Module
const CartManager = {
  getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  },
  setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  },
  updateCartIcon() {
    const cart = this.getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
  },
  renderCart() {
    const cart = this.getCart();
    const cartItems = document.querySelector('.cart-items');
    const summary = document.querySelector('.order-summary');
    if (!cartItems) return;
    cartItems.innerHTML = '';
    if (cart.length === 0) {
      cartItems.innerHTML = `
        <div class="empty-cart-msg" style="
          text-align: center;
          color: #757575;
          font-size: 1.2rem;
          padding: 2.5rem 0;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
        ">
          Your cart is empty.<br>
          <a href="menu.html" style="color: #ff6600; font-weight: 700; text-decoration: none; display: inline-block; margin-top: 1rem;">
            Browse the menu
          </a>
        </div>
      `;
      if (summary) summary.style.display = 'none';
      this.updateCartIcon();
      return;
    } else if (summary) {
      summary.style.display = '';
    }
    let subtotal = 0;
    cart.forEach((item, idx) => {
      subtotal += item.price * item.quantity;
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <h3>${item.name} <span style='color:#757575; font-size:1rem; font-weight:600;'>(x${item.quantity})</span></h3>
          <p>${item.desc || ''}</p>
          <div class="cart-item-price">₹${(item.price * item.quantity).toFixed(2)}</div>
        </div>
        <div class="cart-item-quantity">
          <button class="quantity-btn minus" data-idx="${idx}">-</button>
          <input type="number" value="${item.quantity}" min="1" max="10" readonly>
          <button class="quantity-btn plus" data-idx="${idx}">+</button>
        </div>
        <button class="remove-item" data-idx="${idx}"><i class="fas fa-trash"></i></button>
      `;
      div.dataset.id = item.id;
      cartItems.appendChild(div);
    });
    // Update summary
    const gst = subtotal * 0.05;
    const total = subtotal + gst;
    const summaryItems = document.querySelectorAll('.summary-item span:last-child');
    if (summaryItems.length >= 3) {
      summaryItems[0].textContent = `₹${subtotal.toFixed(2)}`;
      summaryItems[1].textContent = `₹${gst.toFixed(2)}`;
      summaryItems[2].textContent = `₹${total.toFixed(2)}`;
    }
    this.updateCartIcon();
    // Update total quantity
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    const qtySpan = document.getElementById('cart-total-qty');
    if (qtySpan) qtySpan.textContent = totalQty;
  },
  changeQuantity(id, delta) {
    let cart = this.getCart();
    const idx = cart.findIndex(i => i.id === id);
    if (idx > -1) {
      cart[idx].quantity += delta;
      if (cart[idx].quantity < 1) cart[idx].quantity = 1;
      if (cart[idx].quantity > 10) cart[idx].quantity = 10;
      this.setCart(cart);
      this.renderCart();
    }
  },
  removeItem(id) {
    let cart = this.getCart();
    cart = cart.filter(i => i.id !== id);
    this.setCart(cart);
    this.renderCart();
  }
};

document.addEventListener('DOMContentLoaded', function() {
  function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
  function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
  }
  function renderCart() {
    const cart = getCart();
    const cartItems = document.querySelector('.cart-items');
    const summary = document.querySelector('.order-summary');
    if (!cartItems) return;
    cartItems.innerHTML = '';
    if (cart.length === 0) {
      cartItems.innerHTML = `
        <div class="empty-cart-msg" style="
          text-align: center;
          color: #757575;
          font-size: 1.2rem;
          padding: 2.5rem 0;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
        ">
          Your cart is empty.<br>
          <a href="menu.html" style="color: #ff6600; font-weight: 700; text-decoration: none; display: inline-block; margin-top: 1rem;">
            Browse the menu
          </a>
        </div>
      `;
      if (summary) summary.style.display = 'none';
      updateCartCount();
      return;
    } else if (summary) {
      summary.style.display = '';
    }
    let subtotal = 0;
    cart.forEach((item, idx) => {
      subtotal += item.price * item.quantity;
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <h3>${item.name} <span style='color:#757575; font-size:1rem; font-weight:600;'>(x${item.quantity})</span></h3>
          <p>${item.desc || ''}</p>
          <div class="cart-item-price">₹${(item.price * item.quantity).toFixed(2)}</div>
        </div>
        <div class="cart-item-quantity">
          <button class="quantity-btn minus" data-idx="${idx}">-</button>
          <input type="number" value="${item.quantity}" min="1" max="10" readonly>
          <button class="quantity-btn plus" data-idx="${idx}">+</button>
        </div>
        <button class="remove-item" data-idx="${idx}"><i class="fas fa-trash"></i></button>
      `;
      div.dataset.id = item.id;
      cartItems.appendChild(div);
    });
    // Update summary
    const gst = subtotal * 0.05;
    const total = subtotal + gst;
    const summaryItems = document.querySelectorAll('.summary-item span:last-child');
    if (summaryItems.length >= 3) {
      summaryItems[0].textContent = `₹${subtotal.toFixed(2)}`;
      summaryItems[1].textContent = `₹${gst.toFixed(2)}`;
      summaryItems[2].textContent = `₹${total.toFixed(2)}`;
    }
    updateCartCount();
    // Update total quantity
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    const qtySpan = document.getElementById('cart-total-qty');
    if (qtySpan) qtySpan.textContent = totalQty;
  }
  // Event delegation for cart actions
  document.querySelector('.cart-items')?.addEventListener('click', function(e) {
    const btn = e.target.closest('button');
    if (!btn) return;
    const idx = btn.dataset.idx ? parseInt(btn.dataset.idx) : null;
    if (idx === null || isNaN(idx)) return;
    let cart = getCart();
    if (btn.classList.contains('plus')) {
      cart[idx].quantity = Math.min(10, cart[idx].quantity + 1);
      setCart(cart);
      renderCart();
    } else if (btn.classList.contains('minus')) {
      cart[idx].quantity = Math.max(1, cart[idx].quantity - 1);
      setCart(cart);
      renderCart();
    } else if (btn.classList.contains('remove-item')) {
      cart.splice(idx, 1);
      setCart(cart);
      renderCart();
    }
  });
  renderCart();
  updateCartCount();

  // Checkout functionality
  document.querySelector('.checkout-btn')?.addEventListener('click', function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    if (!isLoggedIn) {
      alert('Please sign in to checkout!');
      window.location.href = 'login.html';
      return;
    }

    if (getCart().length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // Create order
    const order = {
      id: 'ORD' + Date.now(),
      items: getCart(),
      date: new Date().toLocaleString(),
      status: 'preparing',
      pickupTime: document.querySelector('.pickup-select').value
    };

    // Save order to history
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.unshift(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    setCart([]);
    
    // Show success message and redirect
    alert('Order placed successfully! Your order ID is: ' + order.id);
    window.location.href = 'orders.html';
  });

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