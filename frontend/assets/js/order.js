// Dummy orders data
let orders = [
  {
    id: 'ORD001',
    customer: 'John Doe',
    date: '2024-06-01',
    total: 18.50,
    status: 'new',
    items: [
      { name: 'Cappuccino', qty: 2, price: 3.5 },
      { name: 'Veg Sandwich', qty: 2, price: 2.0 },
      { name: 'Brownie', qty: 1, price: 7.5 }
    ]
  },
  {
    id: 'ORD002',
    customer: 'Jane Smith',
    date: '2024-06-02',
    total: 7.00,
    status: 'inprogress',
    items: [
      { name: 'Veg Sandwich', qty: 2, price: 2.0 },
      { name: 'Lemonade', qty: 1, price: 3.0 }
    ]
  },
  {
    id: 'ORD003',
    customer: 'Alice Brown',
    date: '2024-06-02',
    total: 3.50,
    status: 'ready',
    items: [
      { name: 'Cappuccino', qty: 1, price: 3.5 }
    ]
  }
];

// Order Management System
const orderSystem = {
    orders: [],
    currentPage: 1,
    itemsPerPage: 20,
    filters: {
        status: 'all',
        search: ''
    },

    // Item prices for calculation
    itemPrices: {
        'Chicken Biryani': 12.99,
        'Veg Biryani': 10.99,
        'Butter Chicken': 14.99,
        'Naan': 2.99,
        'Coke': 1.99,
        'Sprite': 1.99
    },

    // Initialize the order system
    init() {
        this.loadOrders();
        this.setupEventListeners();
        this.updateOrderTable();
        
        // Add event listener for Add Order button
        const addOrderBtn = document.getElementById('addOrderBtn');
        if (addOrderBtn) {
            addOrderBtn.addEventListener('click', () => this.openAddOrderModal());
        }
    },

    // Load orders from storage or API
    loadOrders() {
        // For demo purposes, we'll use sample data
        this.orders = [
            {
                id: 'ORD001',
                customer: 'John Doe',
                items: [
                    { name: 'Chicken Biryani', quantity: 2, price: 12.99 },
                    { name: 'Coke', quantity: 2, price: 1.99 }
                ],
                total: 29.96,
                status: 'preparing',
                time: '12:30 PM',
                date: '2024-03-15'
            },
            // Add more sample orders here...
        ];
    },

    // Set up event listeners
    setupEventListeners() {
        // Search input
        const searchInput = document.getElementById('orderSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filters.search = e.target.value;
                this.currentPage = 1;
                this.updateOrderTable();
            });
        }

        // Status filter
        const statusFilter = document.getElementById('orderStatusFilter');
        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => {
                this.filters.status = e.target.value;
                this.currentPage = 1;
                this.updateOrderTable();
            });
        }

        // Pagination buttons
        const prevBtn = document.getElementById('prevPage');
        const nextBtn = document.getElementById('nextPage');
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.updateOrderTable();
                }
            });

            nextBtn.addEventListener('click', () => {
                const maxPage = Math.ceil(this.getFilteredOrders().length / this.itemsPerPage);
                if (this.currentPage < maxPage) {
                    this.currentPage++;
                    this.updateOrderTable();
                }
            });
        }
    },

    // Get filtered orders based on current filters
    getFilteredOrders() {
        return this.orders.filter(order => {
            const matchesSearch = order.id.toLowerCase().includes(this.filters.search.toLowerCase()) ||
                                order.customer.toLowerCase().includes(this.filters.search.toLowerCase());
            const matchesStatus = this.filters.status === 'all' || order.status === this.filters.status;
            return matchesSearch && matchesStatus;
        });
    },

    // Update the order table with current page data
    updateOrderTable() {
        const filteredOrders = this.getFilteredOrders();
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const currentOrders = filteredOrders.slice(startIndex, endIndex);

        const tableBody = document.querySelector('.order-table tbody');
        if (!tableBody) return;

        tableBody.innerHTML = '';
        currentOrders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>${this.formatOrderItems(order.items)}</td>
                <td>$${order.total.toFixed(2)}</td>
                <td>${order.time}</td>
                <td><span class="status ${order.status}">${order.status}</span></td>
                <td class="order-actions">
                    <button class="status-btn view" onclick="orderSystem.viewOrderDetails('${order.id}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="status-btn ${order.status}" onclick="orderSystem.updateOrderStatus('${order.id}')">
                        <i class="fas fa-sync"></i> Update
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        this.updatePagination(filteredOrders.length);
    },

    // Format order items for display
    formatOrderItems(items) {
        return items.map(item => `${item.quantity}x ${item.name}`).join(', ');
    },

    // Update pagination controls
    updatePagination(totalItems) {
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);
        const paginationInfo = document.getElementById('paginationInfo');
        const prevBtn = document.getElementById('prevPage');
        const nextBtn = document.getElementById('nextPage');

        if (paginationInfo) {
            paginationInfo.textContent = `Page ${this.currentPage} of ${totalPages}`;
        }

        if (prevBtn) {
            prevBtn.disabled = this.currentPage === 1;
        }

        if (nextBtn) {
            nextBtn.disabled = this.currentPage === totalPages;
        }
    },

    // View order details
    viewOrderDetails(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) return;

        const modal = document.getElementById('orderDetailsModal');
        const modalContent = modal.querySelector('.modal-content');
        
        modalContent.innerHTML = `
            <div class="modal-header">
                <h2 class="modal-title">Order Details - ${order.id}</h2>
                <button class="close-modal" onclick="orderSystem.closeModal('orderDetailsModal')">&times;</button>
            </div>
            <div class="order-details">
                <p><strong>Customer:</strong> ${order.customer}</p>
                <p><strong>Date:</strong> ${order.date}</p>
                <p><strong>Time:</strong> ${order.time}</p>
                <p><strong>Status:</strong> <span class="status ${order.status}">${order.status}</span></p>
                <h3>Items:</h3>
                <table class="items-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.items.map(item => `
                            <tr>
                                <td>${item.name}</td>
                                <td>${item.quantity}</td>
                                <td>$${item.price.toFixed(2)}</td>
                                <td>$${(item.quantity * item.price).toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3"><strong>Total:</strong></td>
                            <td><strong>$${order.total.toFixed(2)}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        `;

        modal.style.display = 'flex';
    },

    // Update order status
    updateOrderStatus(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) return;

        const statuses = ['preparing', 'ready', 'completed', 'onhold'];
        const currentIndex = statuses.indexOf(order.status);
        const nextIndex = (currentIndex + 1) % statuses.length;
        order.status = statuses[nextIndex];

        this.updateOrderTable();
        this.showToast(`Order ${orderId} status updated to ${order.status}`);
    },

    // Close modal
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    },

    // Show toast notification
    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    },

    // Open Add Order Modal
    openAddOrderModal() {
        const modal = document.getElementById('addOrderModal');
        if (modal) {
            modal.style.display = 'flex';
            // Reset form
            document.getElementById('customerName').value = '';
            document.getElementById('orderItems').innerHTML = this.createOrderItemHTML();
            this.updateOrderTotal();
        }
    },

    // Create HTML for a new order item row
    createOrderItemHTML() {
        return `
            <div class="order-item">
                <select class="item-select" onchange="orderSystem.updateOrderTotal()">
                    <option value="">Select Item</option>
                    ${Object.keys(this.itemPrices).map(item => 
                        `<option value="${item}">${item}</option>`
                    ).join('')}
                </select>
                <input type="number" class="item-quantity" min="1" value="1" 
                    onchange="orderSystem.updateOrderTotal()" placeholder="Qty">
                <button class="remove-item-btn" onclick="orderSystem.removeOrderItem(this)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    },

    // Add new order item row
    addOrderItem() {
        const orderItems = document.getElementById('orderItems');
        if (orderItems) {
            orderItems.insertAdjacentHTML('beforeend', this.createOrderItemHTML());
        }
    },

    // Remove order item row
    removeOrderItem(button) {
        const orderItems = document.getElementById('orderItems');
        if (orderItems && orderItems.children.length > 1) {
            button.closest('.order-item').remove();
            this.updateOrderTotal();
        }
    },

    // Update order total
    updateOrderTotal() {
        let total = 0;
        const items = document.querySelectorAll('.order-item');
        
        items.forEach(item => {
            const select = item.querySelector('.item-select');
            const quantity = item.querySelector('.item-quantity');
            
            if (select.value && quantity.value) {
                const price = this.itemPrices[select.value] || 0;
                total += price * parseInt(quantity.value);
            }
        });

        const totalElement = document.getElementById('orderTotal');
        if (totalElement) {
            totalElement.textContent = total.toFixed(2);
        }
    },

    // Submit new order
    submitNewOrder() {
        const customerName = document.getElementById('customerName').value;
        if (!customerName) {
            this.showToast('Please enter customer name');
            return;
        }

        const items = [];
        let total = 0;
        const orderItems = document.querySelectorAll('.order-item');
        
        orderItems.forEach(item => {
            const select = item.querySelector('.item-select');
            const quantity = item.querySelector('.item-quantity');
            
            if (select.value && quantity.value) {
                const price = this.itemPrices[select.value] || 0;
                const itemTotal = price * parseInt(quantity.value);
                total += itemTotal;
                
                items.push({
                    name: select.value,
                    quantity: parseInt(quantity.value),
                    price: price
                });
            }
        });

        if (items.length === 0) {
            this.showToast('Please add at least one item');
            return;
        }

        // Create new order
        const newOrder = {
            id: 'ORD' + Date.now().toString().slice(-6),
            customer: customerName,
            items: items,
            total: total,
            status: 'preparing',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            date: new Date().toLocaleDateString()
        };

        // Add to orders array
        this.orders.unshift(newOrder);
        this.updateOrderTable();
        this.closeModal('addOrderModal');
        this.showToast('New order created successfully');
    }
};

// Initialize the order system when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    orderSystem.init();
});

// Listen for new orders from localStorage
setInterval(() => {
  const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
  if (storedOrders.length > orderSystem.orders.length) {
    const newOrders = storedOrders.filter(order => 
      !orderSystem.orders.some(existing => existing.id === order.id)
    );
    newOrders.forEach(order => orderSystem.orders.push(order));
    orderSystem.updateOrderTable();
  }
}, 1000);

// TEST FUNCTION: Add a sample order with ID 17APR2001
function addTestOrder() {
  const testOrder = {
    id: '17APR2001',
    customer: 'Rahul Sharma',
    date: '2024-04-17',
    total: 120.00,
    status: 'new',
    items: [
      { name: 'Paneer Wrap', qty: 2, price: 40 },
      { name: 'Cold Coffee', qty: 1, price: 40 }
    ]
  };
  // Prevent duplicate test order
  if (!orderSystem.orders.some(o => o.id === testOrder.id)) {
    orderSystem.orders.push(testOrder);
    orderSystem.updateOrderTable();
  }
}

// Add the test order automatically on page load:
addTestOrder();

// Close invoice modal function (global for onclick)
function closeInvoiceModal() {
  document.getElementById('invoice-modal').style.display = 'none';
} 