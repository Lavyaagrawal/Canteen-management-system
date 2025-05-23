// --- Data (Simulated for Demo) ---
let orders = [
  { id: 'B2', customer: 'Ahmad Faiz', items: 3, status: 'ready', eta: '10 minutes', payment: false },
  { id: 'B12', customer: 'Lim Jia Hao', items: 4, status: 'new', eta: '10 minutes', payment: false },
  { id: 'B4', customer: 'Arvind Kumar', items: 2, status: 'new', eta: '10 minutes', payment: false },
  { id: 'B12', customer: 'Kavitha Nair', items: 1, status: 'new', eta: '10 minutes', payment: false },
  { id: 'B7', customer: 'Salina', items: 4, status: 'inprogress', eta: '5 minutes', payment: false },
];
let payments = [
  { id: 'B12', customer: 'Siti Hajar', items: 1 },
  { id: 'B12', customer: 'Tan Wei Loon', items: 1 },
  { id: 'B4', customer: 'Li Mei Ling', items: 2 },
  { id: 'B12', customer: 'Mohd Hafiz', items: 3 },
  { id: 'B7', customer: 'Chong Wei Kit', items: 1 },
];
let popularDishes = [
  { name: 'Nasi Lemak', img: '../assets/img/nasi_lemak.jpg', orders: 52, price: 5.40 },
  { name: 'Nasi Ayam', img: '../assets/img/nasi_ayam.jpg', orders: 46, price: 7.50 },
  { name: 'Roti Canai', img: '../assets/img/roti_canai.jpg', orders: 26, price: 2.50 },
  { name: 'Char Kuey Teow', img: '../assets/img/char_kuey_teow.jpg', orders: 26, price: 6.50 },
  { name: 'Sup Tulang', img: '../assets/img/sup_tulang.jpg', orders: 13, price: 6.50 },
  { name: 'Chicken Chop', img: '../assets/img/chicken_chop.jpg', orders: 13, price: 12.50 },
];
let menu = [
  { id: 1, name: 'Nasi Lemak', details: 'Rice, sambal, egg, peanuts', price: 5.40, qty: 100, img: '../assets/img/nasi_lemak.jpg' },
  { id: 2, name: 'Nasi Ayam', details: 'Chicken rice, soup', price: 7.50, qty: 80, img: '../assets/img/nasi_ayam.jpg' },
];

// --- Utility ---
function $(sel) { return document.querySelector(sel); }
function $all(sel) { return document.querySelectorAll(sel); }
function showToast(msg) {
  const toast = $('#toast');
  toast.textContent = msg;
  toast.className = 'toast show';
  setTimeout(() => { toast.className = 'toast'; }, 2200);
}
function formatINR(val) { return '₹' + val.toFixed(2); }

// --- Sidebar Navigation ---
$all('.sidebar nav ul li').forEach(li => {
  li.onclick = function() {
    $all('.sidebar nav ul li').forEach(x => x.classList.remove('active'));
    this.classList.add('active');
    // Show/hide sections
    $('.dashboard-section').style.display = this.id === 'nav-home' || this.id === 'nav-dashboard' ? '' : 'none';
    // Add more section toggles as needed
  };
});

// --- Date ---
function updateDate() {
  const d = new Date();
  $('#current-date').textContent = d.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
updateDate();

// --- Dashboard Cards ---
function updateDashboardCards() {
  $('#new-orders-count').textContent = orders.filter(o => o.status === 'new').length;
  $('#total-orders-count').textContent = orders.length;
  $('#waiting-list-count').textContent = orders.filter(o => o.status === 'waiting').length;
}

// --- Merged Orders List ---
function renderMergedOrdersList() {
  const ul = document.getElementById('orders-merged-ul');
  ul.innerHTML = '';
  // Combine orders and payments if needed, for now just use orders, newest first
  const sortedOrders = [...orders].reverse();
  sortedOrders.forEach(order => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span><b>${order.id}</b> ${order.customer}<br><span style="font-size:0.95em;color:#888;">${order.items} item</span></span>
      <span class="order-chip ${order.status}">${order.status === 'ready' ? 'Ready' : order.status === 'inprogress' ? 'In Progress' : order.status === 'new' ? 'New Order' : 'Waiting'}</span>
    `;
    ul.appendChild(li);
  });
}
document.getElementById('orders-merged-search').addEventListener('input', function() {
  const val = this.value.toLowerCase();
  document.querySelectorAll('#orders-merged-ul li').forEach(li => {
    li.style.display = li.textContent.toLowerCase().includes(val) ? '' : 'none';
  });
});

// --- Food Modal (Add/Edit) ---
$('#nav-add-food').onclick = function() {
  $('#food-modal').style.display = 'flex';
  $('#food-modal-title').textContent = 'Add Food Item';
  $('#food-form').reset();
  $('#food-id').value = '';
};
$('#close-food-modal').onclick = function() {
  $('#food-modal').style.display = 'none';
};
$('#food-form').onsubmit = function(e) {
  e.preventDefault();
  const id = $('#food-id').value || Date.now();
  const name = $('#food-name').value;
  const details = $('#food-details').value;
  const price = parseFloat($('#food-price').value);
  const qty = parseInt($('#food-qty').value);
  let img = $('#food-img').files[0];
  let imgUrl = img ? URL.createObjectURL(img) : '../assets/img/default_food.jpg';
  if ($('#food-id').value) {
    // Edit
    const idx = menu.findIndex(m => m.id == id);
    if (idx > -1) menu[idx] = { id, name, details, price, qty, img: imgUrl };
    showToast('Menu item updated!');
  } else {
    // Add
    menu.push({ id, name, details, price, qty, img: imgUrl });
    showToast('Menu item added!');
  }
  $('#food-modal').style.display = 'none';
  renderMenuList();
};

// --- Menu Management (Manage Food) ---
$('#nav-manage-food').onclick = function() {
  $('#food-modal').style.display = 'flex';
  $('#food-modal-title').textContent = 'Manage Food Items';
  renderMenuList();
};
function renderMenuList() {
  // For demo, just show a toast
  showToast('Menu list updated!');
}

// --- Analytics Data (Simulated) ---
const analyticsData = {
  day:   { sales: 1200, orders: 34, avg: 35.29, times: [2, 4, 8, 12, 18, 20, 10, 5], items: [12, 8, 6, 4, 2, 1] },
  week:  { sales: 8200, orders: 210, avg: 39.05, times: [10, 20, 30, 40, 50, 60, 70, 80], items: [60, 40, 30, 20, 10, 5] },
  month: { sales: 32000, orders: 900, avg: 35.56, times: [50, 60, 70, 80, 90, 100, 110, 120], items: [200, 150, 100, 80, 60, 40] },
  quarter: { sales: 90000, orders: 2500, avg: 36.00, times: [200, 220, 240, 260, 280, 300, 320, 340], items: [600, 500, 400, 300, 200, 100] },
  year:  { sales: 380000, orders: 11000, avg: 34.55, times: [1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400], items: [3000, 2500, 2000, 1500, 1000, 500] }
};
const timeLabels = ['6am','9am','12pm','3pm','6pm','9pm','12am','3am'];
const itemLabels = ['Burger','Pizza','Stir Fry','Brownie','Soup','Other'];

let ordersTimeChart, topItemsChart;

function updateAnalytics(period = 'day') {
  const data = analyticsData[period];
  document.getElementById('analytics-total-sales').textContent = '₹' + data.sales.toLocaleString();
  document.getElementById('analytics-total-orders').textContent = data.orders;
  document.getElementById('analytics-avg-order').textContent = '₹' + data.avg.toFixed(2);

  // Update charts
  if (ordersTimeChart) ordersTimeChart.destroy();
  if (topItemsChart) topItemsChart.destroy();

  ordersTimeChart = new Chart(document.getElementById('orders-time-chart'), {
    type: 'bar',
    data: {
      labels: timeLabels,
      datasets: [{
        label: 'Orders',
        data: data.times,
        backgroundColor: 'rgba(255,107,44,0.7)'
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });

  topItemsChart = new Chart(document.getElementById('top-items-chart'), {
    type: 'pie',
    data: {
      labels: itemLabels,
      datasets: [{
        data: data.items,
        backgroundColor: [
          '#ff6b2c','#ffb300','#ffd54f','#81c784','#64b5f6','#bdbdbd'
        ]
      }]
    },
    options: {
      plugins: { legend: { position: 'bottom' } }
    }
  });
}

document.querySelectorAll('.analytics-period-btn').forEach(btn => {
  btn.onclick = function() {
    document.querySelectorAll('.analytics-period-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    updateAnalytics(this.dataset.period);
  };
});

// Initial analytics render
updateAnalytics('day');

// --- Initial Render ---
updateDashboardCards();
renderMergedOrdersList();
renderPopularDishes();

// --- Simulate Real-Time Order Add (for demo) ---
setInterval(() => {
  if (Math.random() > 0.7) {
    const id = 'B' + Math.floor(Math.random()*100+10);
    orders.push({ id, customer: 'New Customer', items: Math.floor(Math.random()*4+1), status: 'new', eta: '10 minutes', payment: false });
    updateDashboardCards();
    renderMergedOrdersList();
    showToast('New order received!');
  }
}, 8000);

// Sidebar navigation: Go to dashboard page when Dashboard is clicked
const dashboardNav = document.getElementById('nav-dashboard');
if (dashboardNav) {
  dashboardNav.addEventListener('click', function() {
    window.location.href = 'dashboard.html';
  });
}

// Show/hide analytics dashboard section on Dashboard button click
const analyticsSection = document.querySelector('.analytics-section');
const ordersListMerged = document.querySelector('.orders-list-merged');
const popularDishesSection = document.querySelector('.popular-dishes');

if (dashboardNav && analyticsSection) {
  dashboardNav.addEventListener('click', function() {
    // Show analytics, hide others
    analyticsSection.style.display = '';
    if (ordersListMerged) ordersListMerged.style.display = 'none';
    if (popularDishesSection) popularDishesSection.style.display = 'none';
    // Optionally, set active class
    $all('.sidebar nav ul li').forEach(x => x.classList.remove('active'));
    dashboardNav.classList.add('active');
    // Render analytics
    updateAnalytics('day');
  });
}
// By default, hide analytics section
if (analyticsSection) analyticsSection.style.display = 'none';

// Cart Management Functions
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
  const idx = cart.findIndex(i => i.name === item.name);
  
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add to cart functionality for featured menu items
  document.querySelectorAll('.featured-menu-grid .add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
      const card = this.closest('.menu-card');
      const item = {
        id: Date.now().toString(),
        name: card.querySelector('h3').textContent,
        price: parseFloat(card.querySelector('.menu-price').textContent.replace('₹', '')),
        image: card.querySelector('img').src,
        description: card.querySelector('p').textContent
      };

      if (addToCart(item)) {
        // Visual feedback
        this.textContent = 'Added!';
        this.style.backgroundColor = '#27ae60';
        setTimeout(() => {
          this.textContent = 'Add to Cart';
          this.style.backgroundColor = '';
        }, 1000);
      }
    });
  });

  // Initialize cart count
  updateCartIcon();

  // Add toast styles
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

  // Order Management Functionality
  const orderSearch = document.getElementById('orderSearch');
  const statusFilter = document.getElementById('statusFilter');
  const ordersTable = document.querySelector('.orders-table tbody');

  // Pagination Configuration
  const ITEMS_PER_PAGE = 10;
  let currentPage = 1;
  let totalOrders = 0;

  // Initialize pagination
  function initializePagination() {
    const rows = ordersTable.getElementsByTagName('tr');
    totalOrders = rows.length;
    
    // Add pagination controls if they don't exist
    if (!document.querySelector('.pagination-controls')) {
      const paginationControls = document.createElement('div');
      paginationControls.className = 'pagination-controls';
      paginationControls.innerHTML = `
        <button class="pagination-btn" id="prevPage" disabled>
          <i class="fa fa-chevron-left"></i> Previous
        </button>
        <span class="page-info">Page <span id="currentPageNum">1</span> of <span id="totalPages">1</span></span>
        <button class="pagination-btn" id="nextPage" disabled>
          Next <i class="fa fa-chevron-right"></i>
        </button>
      `;
      ordersTable.parentElement.insertAdjacentElement('afterend', paginationControls);
      
      // Add event listeners for pagination buttons
      document.getElementById('prevPage').addEventListener('click', () => changePage(currentPage - 1));
      document.getElementById('nextPage').addEventListener('click', () => changePage(currentPage + 1));
    }
    
    updatePagination();
  }

  function updatePagination() {
    const totalPages = Math.ceil(totalOrders / ITEMS_PER_PAGE);
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const currentPageNum = document.getElementById('currentPageNum');
    const totalPagesSpan = document.getElementById('totalPages');
    
    // Update page numbers
    currentPageNum.textContent = currentPage;
    totalPagesSpan.textContent = totalPages;
    
    // Update button states
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    
    // Show/hide rows based on current page
    const rows = ordersTable.getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      rows[i].style.display = (i >= startIndex && i < endIndex) ? '' : 'none';
    }
  }

  function changePage(newPage) {
    if (newPage < 1 || newPage > Math.ceil(totalOrders / ITEMS_PER_PAGE)) return;
    currentPage = newPage;
    updatePagination();
  }

  // Search functionality with debounce
  let searchTimeout;
  function debounceSearch(func, delay) {
    return function() {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => func.apply(this, arguments), delay);
    };
  }

  function filterOrders() {
    const searchTerm = orderSearch.value.toLowerCase().trim();
    const statusValue = statusFilter.value;
    const rows = ordersTable.getElementsByTagName('tr');
    let visibleCount = 0;

    for (let row of rows) {
      const orderId = row.cells[0].textContent.toLowerCase();
      const customer = row.cells[1].textContent.toLowerCase();
      const items = row.cells[2].textContent.toLowerCase();
      const status = row.cells[5].querySelector('.status').classList[1];

      const searchFields = [orderId, customer, items];
      const matchesSearch = searchTerm === '' || 
                          searchFields.some(field => field.includes(searchTerm));
      
      const matchesStatus = statusValue === 'all' || status === statusValue;

      // Show/hide row based on both search and status filters
      const shouldShow = matchesSearch && matchesStatus;
      row.style.display = shouldShow ? '' : 'none';
      if (shouldShow) visibleCount++;
    }

    // Update total orders count and reset to first page
    totalOrders = visibleCount;
    currentPage = 1;
    updatePagination();
  }

  // Event listeners with debounced search
  orderSearch.addEventListener('input', debounceSearch(() => {
    filterOrders();
  }, 300));
  statusFilter.addEventListener('change', filterOrders);

  // Initialize pagination
  initializePagination();

  // Order status update functionality
  ordersTable.addEventListener('click', function(e) {
    const button = e.target.closest('.status-btn');
    if (!button) return;

    const row = button.closest('tr');
    const statusCell = row.querySelector('.status');
    const newStatus = button.classList[1];
    const orderId = row.cells[0].textContent;

    // Update status cell
    statusCell.className = 'status ' + newStatus;
    statusCell.textContent = newStatus === 'ready' ? 'Ready for Pickup' : 
                           newStatus === 'completed' ? 'Completed' : 
                           newStatus.charAt(0).toUpperCase() + newStatus.slice(1);

    // Show toast notification
    showToast(`Order ${orderId} status updated to ${statusCell.textContent}`);

    // If order is completed, remove it from the table after a delay
    if (newStatus === 'completed') {
      setTimeout(() => {
        row.style.opacity = '0';
        setTimeout(() => row.remove(), 300);
      }, 1000);
    }
  });

  // Initialize with default filter
  statusFilter.value = 'ready';
  filterOrders();

  // Initialize popular items chart
  initializePopularItemsChart();
  
  // Update chart every 5 minutes
  setInterval(simulatePopularItemsUpdate, 300000);

  // Initialize sample values chart
  initializeSampleValuesChart();
  
  // Update sample values every 5 minutes
  setInterval(() => {
    const newData = Array.from({length: 10}, () => Math.floor(Math.random() * 150) + 50);
    sampleValuesChart.data.datasets[0].data = newData;
    sampleValuesChart.update();
    updateSampleValuesStats(newData);
  }, 300000); // 5 minutes

  // Initialize ratings and feedback
  initializeRatings();
  
  // Simulate new feedback every 5 minutes
  setInterval(() => {
    const newFeedback = {
      id: sampleFeedback.length + 1,
      user: `Customer ${sampleFeedback.length + 1}`,
      rating: Math.floor(Math.random() * 3) + 3, // Random rating between 3-5
      date: new Date().toISOString().split('T')[0],
      text: 'Great experience! The food was delicious and the service was excellent.'
    };
    
    sampleFeedback.unshift(newFeedback);
    if (sampleFeedback.length > 10) sampleFeedback.pop();
    
    initializeRatings();
  }, 300000); // 5 minutes

  var logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = 'login.html';
    });
  }
});

// Order Management Functions
function updateOrderStatus(orderId, newStatus) {
    const orderRow = document.querySelector(`tr[data-order-id="${orderId}"]`);
    if (!orderRow) return;

    const statusCell = orderRow.querySelector('.status');
    const actionsCell = orderRow.querySelector('.order-actions');
    
    // Update status cell
    statusCell.className = 'status ' + newStatus;
    statusCell.textContent = getStatusText(newStatus);

    // Update available actions based on new status
    updateActionButtons(orderId, newStatus, actionsCell);

    // Show success message
    showToast(`Order #${orderId} status updated to ${statusCell.textContent}`);

    // If order is completed, remove it after animation
    if (newStatus === 'completed') {
        orderRow.style.transition = 'opacity 0.5s ease';
        orderRow.style.opacity = '0';
        setTimeout(() => {
            orderRow.remove();
            showToast(`Order #${orderId} has been completed and removed from the list`);
        }, 500);
    }
}

function getStatusText(status) {
    const statusMap = {
        'preparing': 'Preparing',
        'ready': 'Ready for Pickup',
        'completed': 'Completed',
        'onhold': 'On Hold'
    };
    return statusMap[status] || status.charAt(0).toUpperCase() + status.slice(1);
}

function updateActionButtons(orderId, currentStatus, actionsCell) {
    let buttons = '';
    
    // Add buttons based on current status
    switch(currentStatus) {
        case 'preparing':
            buttons = `
                <button class="status-btn ready" onclick="updateOrderStatus('${orderId}', 'ready')" title="Mark as Ready for Pickup">
                    <i class="fa fa-check"></i> Ready
                </button>
                <button class="status-btn onhold" onclick="updateOrderStatus('${orderId}', 'onhold')" title="Put Order On Hold">
                    <i class="fa fa-pause"></i> Hold
                </button>
                <button class="status-btn completed" onclick="updateOrderStatus('${orderId}', 'completed')" title="Mark as Completed">
                    <i class="fa fa-check-double"></i> Complete
                </button>
            `;
            break;
        case 'ready':
            buttons = `
                <button class="status-btn preparing" onclick="updateOrderStatus('${orderId}', 'preparing')" title="Mark as Preparing">
                    <i class="fa fa-fire"></i> Preparing
                </button>
                <button class="status-btn onhold" onclick="updateOrderStatus('${orderId}', 'onhold')" title="Put Order On Hold">
                    <i class="fa fa-pause"></i> Hold
                </button>
                <button class="status-btn completed" onclick="updateOrderStatus('${orderId}', 'completed')" title="Mark as Completed">
                    <i class="fa fa-check-double"></i> Complete
                </button>
            `;
            break;
        case 'onhold':
            buttons = `
                <button class="status-btn preparing" onclick="updateOrderStatus('${orderId}', 'preparing')" title="Mark as Preparing">
                    <i class="fa fa-fire"></i> Preparing
                </button>
                <button class="status-btn ready" onclick="updateOrderStatus('${orderId}', 'ready')" title="Mark as Ready for Pickup">
                    <i class="fa fa-check"></i> Ready
                </button>
                <button class="status-btn completed" onclick="updateOrderStatus('${orderId}', 'completed')" title="Mark as Completed">
                    <i class="fa fa-check-double"></i> Complete
                </button>
            `;
            break;
    }

    // Add view button to all statuses
    buttons += `
        <button class="status-btn view" onclick="viewOrderDetails('${orderId}')" title="View Details">
            <i class="fa fa-eye"></i> View
        </button>
    `;

    actionsCell.innerHTML = buttons;
}

function viewOrderDetails(orderId) {
    const orderRow = document.querySelector(`tr[data-order-id="${orderId}"]`);
    if (!orderRow) return;

    const orderData = {
        id: orderRow.cells[0].textContent,
        customer: orderRow.cells[1].textContent,
        items: orderRow.cells[2].textContent,
        total: orderRow.cells[3].textContent,
        time: orderRow.cells[4].textContent,
        status: orderRow.cells[5].querySelector('.status').textContent
    };

    // Create and show modal with order details
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
            <h3>Order Details</h3>
            <div class="order-details">
                <p><strong>Order ID:</strong> ${orderData.id}</p>
                <p><strong>Customer:</strong> ${orderData.customer}</p>
                <p><strong>Items:</strong> ${orderData.items}</p>
                <p><strong>Total:</strong> ${orderData.total}</p>
                <p><strong>Time:</strong> ${orderData.time}</p>
                <p><strong>Status:</strong> <span class="status ${orderData.status.toLowerCase()}">${orderData.status}</span></p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Toast notification function
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show';
    
    setTimeout(() => {
        toast.className = 'toast';
    }, 3000);
}

// Popular Items Chart
let popularItemsChart;

function initializePopularItemsChart() {
    const ctx = document.getElementById('popularItemsChart').getContext('2d');
    
    // Sample data - replace with actual data from your backend
    const data = {
        labels: ['Burger', 'Pizza', 'Pasta', 'Salad', 'Steak', 'Sushi'],
        datasets: [{
            label: 'Orders Today',
            data: [25, 18, 15, 12, 10, 8],
            backgroundColor: [
                'rgba(255, 107, 44, 0.8)',
                'rgba(255, 171, 0, 0.8)',
                'rgba(76, 175, 80, 0.8)',
                'rgba(33, 150, 243, 0.8)',
                'rgba(156, 39, 176, 0.8)',
                'rgba(233, 30, 99, 0.8)'
            ],
            borderColor: [
                'rgba(255, 107, 44, 1)',
                'rgba(255, 171, 0, 1)',
                'rgba(76, 175, 80, 1)',
                'rgba(33, 150, 243, 1)',
                'rgba(156, 39, 176, 1)',
                'rgba(233, 30, 99, 1)'
            ],
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.raw} orders`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 5
                    }
                }
            }
        }
    };

    popularItemsChart = new Chart(ctx, config);
    updatePopularItemsStats(data);
}

function updatePopularItemsStats(data) {
    const totalOrders = data.datasets[0].data.reduce((a, b) => a + b, 0);
    const maxIndex = data.datasets[0].data.indexOf(Math.max(...data.datasets[0].data));
    const topItem = data.labels[maxIndex];

    document.getElementById('totalOrdersToday').textContent = totalOrders;
    document.getElementById('topItemToday').textContent = topItem;
}

// Update the chart with new data
function updatePopularItemsChart(newData) {
    if (!popularItemsChart) return;

    popularItemsChart.data.labels = newData.labels;
    popularItemsChart.data.datasets[0].data = newData.data;
    popularItemsChart.update();
    updatePopularItemsStats(popularItemsChart.data);
}

// Simulate real-time updates (replace with actual data from your backend)
function simulatePopularItemsUpdate() {
    const currentData = popularItemsChart.data;
    const newData = {
        labels: currentData.labels,
        data: currentData.datasets[0].data.map(value => 
            Math.max(0, value + Math.floor(Math.random() * 3) - 1)
        )
    };
    updatePopularItemsChart(newData);
}

// Sample Values Chart
let sampleValuesChart;

function initializeSampleValuesChart() {
  const ctx = document.getElementById('sampleValuesChart').getContext('2d');
  
  // Generate 10 random sample values between 50 and 200
  const sampleData = Array.from({length: 10}, () => Math.floor(Math.random() * 150) + 50);
  
  sampleValuesChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Sample 1', 'Sample 2', 'Sample 3', 'Sample 4', 'Sample 5', 
               'Sample 6', 'Sample 7', 'Sample 8', 'Sample 9', 'Sample 10'],
      datasets: [{
        label: 'Sample Values',
        data: sampleData,
        borderColor: '#ff6b6b',
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#ff6b6b',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleFont: {
            size: 14,
            weight: 'bold'
          },
          bodyFont: {
            size: 13
          },
          callbacks: {
            label: function(context) {
              return `Value: ${context.raw}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            font: {
              size: 12
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              size: 12
            }
          }
        }
      }
    }
  });
  
  updateSampleValuesStats(sampleData);
}

function updateSampleValuesStats(data) {
  const highest = Math.max(...data);
  const average = Math.round(data.reduce((a, b) => a + b, 0) / data.length);
  const total = data.reduce((a, b) => a + b, 0);
  
  document.getElementById('highestValue').textContent = highest;
  document.getElementById('averageValue').textContent = average;
  document.getElementById('totalValue').textContent = total;
}

// Sample feedback data
const sampleFeedback = [
  {
    id: 1,
    user: 'John Smith',
    rating: 5,
    date: '2024-03-15',
    text: 'Excellent service and food quality! The staff was very friendly and the food was delicious.'
  },
  {
    id: 2,
    user: 'Sarah Johnson',
    rating: 4,
    date: '2024-03-14',
    text: 'Great food and quick service. Would definitely recommend to others.'
  },
  {
    id: 3,
    user: 'Michael Brown',
    rating: 5,
    date: '2024-03-14',
    text: 'Best canteen food I\'ve had in a long time. The variety is amazing!'
  },
  {
    id: 4,
    user: 'Emily Davis',
    rating: 3,
    date: '2024-03-13',
    text: 'Food was good but service was a bit slow during peak hours.'
  },
  {
    id: 5,
    user: 'David Wilson',
    rating: 5,
    date: '2024-03-13',
    text: 'Amazing food quality and the prices are very reasonable. Will come back again!'
  }
];

function initializeRatings() {
  // Calculate rating statistics
  const totalRatings = sampleFeedback.length;
  const averageRating = (sampleFeedback.reduce((sum, item) => sum + item.rating, 0) / totalRatings).toFixed(1);
  const ratingDistribution = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0
  };

  sampleFeedback.forEach(feedback => {
    ratingDistribution[feedback.rating]++;
  });

  // Update overall rating display
  document.querySelector('.rating-value').textContent = averageRating;
  document.querySelector('.rating-count').textContent = `Based on ${totalRatings} reviews`;

  // Update rating distribution bars
  Object.entries(ratingDistribution).reverse().forEach(([rating, count]) => {
    const percentage = Math.round((count / totalRatings) * 100);
    const bar = document.querySelector(`.rating-bar:nth-child(${6 - rating}) .progress`);
    const percent = document.querySelector(`.rating-bar:nth-child(${6 - rating}) .rating-percent`);
    bar.style.width = `${percentage}%`;
    percent.textContent = `${percentage}%`;
  });

  // Render feedback list
  const feedbackList = document.getElementById('feedbackList');
  feedbackList.innerHTML = '';

  sampleFeedback.forEach(feedback => {
    const feedbackItem = document.createElement('div');
    feedbackItem.className = 'feedback-item';
    
    const stars = '★'.repeat(feedback.rating) + '☆'.repeat(5 - feedback.rating);
    const initials = feedback.user.split(' ').map(name => name[0]).join('');
    
    feedbackItem.innerHTML = `
      <div class="feedback-header">
        <div class="feedback-user">
          <div class="user-avatar">${initials}</div>
          <div class="user-name">${feedback.user}</div>
        </div>
        <div class="feedback-date">${formatDate(feedback.date)}</div>
      </div>
      <div class="feedback-rating">${stars}</div>
      <div class="feedback-text">${feedback.text}</div>
    `;
    
    feedbackList.appendChild(feedbackItem);
  });
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
} 