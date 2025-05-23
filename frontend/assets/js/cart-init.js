// Cart initialization for all pages
document.addEventListener('DOMContentLoaded', function() {
  // Initialize cart count
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
  }

  // Update cart count on page load
  updateCartCount();

  // Add cart icon styles if not already present
  if (!document.querySelector('#cart-icon-styles')) {
    const style = document.createElement('style');
    style.id = 'cart-icon-styles';
    style.textContent = `
      .cart-icon {
        position: relative;
        color: #181818;
        font-size: 1.3rem;
        text-decoration: none;
        transition: color 0.2s;
      }
      .cart-icon:hover {
        color: #ff6600;
      }
      .cart-count {
        position: absolute;
        top: -8px;
        right: -8px;
        background: #ff6600;
        color: #fff;
        font-size: 0.8rem;
        font-weight: 700;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `;
    document.head.appendChild(style);
  }
}); 