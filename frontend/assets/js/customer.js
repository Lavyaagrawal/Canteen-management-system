// Dummy data for demonstration
let customers = [
    {
        id: 'C001',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        address: '123 Main St, City',
        totalOrders: 15,
        totalSpent: 250.00,
        status: 'active'
    },
    {
        id: 'C002',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '0987654321',
        address: '456 Oak Ave, Town',
        totalOrders: 8,
        totalSpent: 150.00,
        status: 'vip'
    },
    // Add more dummy customers as needed
];

// DOM Elements
const customerTableBody = document.getElementById('customer-table-body');
const customerSearch = document.getElementById('customer-search');
const customerFilter = document.getElementById('customer-filter');
const sortBy = document.getElementById('sort-by');
const addCustomerBtn = document.querySelector('.add-customer-btn');
const customerModal = document.getElementById('customer-modal');
const closeModal = document.querySelector('.close');
const customerForm = document.getElementById('customer-form');
const modalTitle = document.getElementById('modal-title');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderCustomers();
    setupEventListeners();
});

// Render customers in the table
function renderCustomers(filteredCustomers = customers) {
    customerTableBody.innerHTML = '';
    
    filteredCustomers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.totalOrders}</td>
            <td>₹${customer.totalSpent.toFixed(2)}</td>
            <td><span class="status-badge status-${customer.status}">${customer.status}</span></td>
            <td class="action-buttons">
                <button class="action-btn view-btn" onclick="viewCustomer('${customer.id}')">
                    <i class="fa fa-eye"></i>
                </button>
                <button class="action-btn edit-btn" onclick="editCustomer('${customer.id}')">
                    <i class="fa fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" onclick="deleteCustomer('${customer.id}')">
                    <i class="fa fa-trash"></i>
                </button>
            </td>
        `;
        customerTableBody.appendChild(row);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    customerSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredCustomers = customers.filter(customer => 
            customer.name.toLowerCase().includes(searchTerm) ||
            customer.email.toLowerCase().includes(searchTerm) ||
            customer.phone.includes(searchTerm)
        );
        renderCustomers(filteredCustomers);
    });

    // Filter functionality
    customerFilter.addEventListener('change', (e) => {
        const filter = e.target.value;
        let filteredCustomers = customers;
        
        if (filter !== 'all') {
            filteredCustomers = customers.filter(customer => customer.status === filter);
        }
        
        renderCustomers(filteredCustomers);
    });

    // Sort functionality
    sortBy.addEventListener('change', (e) => {
        const sortField = e.target.value;
        let sortedCustomers = [...customers];
        
        switch(sortField) {
            case 'name':
                sortedCustomers.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'orders':
                sortedCustomers.sort((a, b) => b.totalOrders - a.totalOrders);
                break;
            case 'spent':
                sortedCustomers.sort((a, b) => b.totalSpent - a.totalSpent);
                break;
        }
        
        renderCustomers(sortedCustomers);
    });

    // Add customer button
    addCustomerBtn.addEventListener('click', () => {
        modalTitle.textContent = 'Add New Customer';
        customerForm.reset();
        document.getElementById('customer-id').value = '';
        customerModal.style.display = 'block';
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        customerModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === customerModal) {
            customerModal.style.display = 'none';
        }
    });

    // Form submission
    customerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const customerId = document.getElementById('customer-id').value;
        const formData = {
            name: document.getElementById('customer-name').value,
            email: document.getElementById('customer-email').value,
            phone: document.getElementById('customer-phone').value,
            address: document.getElementById('customer-address').value,
            status: document.getElementById('customer-status').value,
            totalOrders: 0,
            totalSpent: 0
        };

        if (customerId) {
            // Edit existing customer
            const index = customers.findIndex(c => c.id === customerId);
            if (index !== -1) {
                customers[index] = { ...customers[index], ...formData };
            }
        } else {
            // Add new customer
            const newId = 'C' + String(customers.length + 1).padStart(3, '0');
            customers.push({ id: newId, ...formData });
        }

        renderCustomers();
        customerModal.style.display = 'none';
        showToast('Customer saved successfully!');
    });
}

// View customer details
function viewCustomer(id) {
    const customer = customers.find(c => c.id === id);
    if (customer) {
        alert(`Customer Details:\n
            ID: ${customer.id}
            Name: ${customer.name}
            Email: ${customer.email}
            Phone: ${customer.phone}
            Address: ${customer.address}
            Total Orders: ${customer.totalOrders}
            Total Spent: ₹${customer.totalSpent.toFixed(2)}
            Status: ${customer.status}`);
    }
}

// Edit customer
function editCustomer(id) {
    const customer = customers.find(c => c.id === id);
    if (customer) {
        modalTitle.textContent = 'Edit Customer';
        document.getElementById('customer-id').value = customer.id;
        document.getElementById('customer-name').value = customer.name;
        document.getElementById('customer-email').value = customer.email;
        document.getElementById('customer-phone').value = customer.phone;
        document.getElementById('customer-address').value = customer.address;
        document.getElementById('customer-status').value = customer.status;
        customerModal.style.display = 'block';
    }
}

// Delete customer
function deleteCustomer(id) {
    if (confirm('Are you sure you want to delete this customer?')) {
        customers = customers.filter(c => c.id !== id);
        renderCustomers();
        showToast('Customer deleted successfully!');
    }
}

// Show toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Customer data management
const customerData = {
    customers: [],
    currentPage: 1,
    itemsPerPage: 10,
    
    // Initialize customer data from completed orders
    initializeFromOrders: function(completedOrders) {
        const customerMap = new Map();
        
        completedOrders.forEach(order => {
            if (!customerMap.has(order.customerName)) {
                customerMap.set(order.customerName, {
                    id: `CUST${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
                    name: order.customerName,
                    orders: [],
                    totalSpent: 0,
                    lastOrder: null
                });
            }
            
            const customer = customerMap.get(order.customerName);
            customer.orders.push(order);
            customer.totalSpent += order.total;
            customer.lastOrder = order.timestamp;
        });
        
        this.customers = Array.from(customerMap.values());
        this.updateCustomerTable();
    },
    
    // Update customer table with pagination
    updateCustomerTable: function() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const customersToShow = this.customers.slice(startIndex, endIndex);
        
        const tbody = document.getElementById('customerTableBody');
        tbody.innerHTML = '';
        
        customersToShow.forEach(customer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.orders.length}</td>
                <td>₹${customer.totalSpent.toLocaleString()}</td>
                <td>${new Date(customer.lastOrder).toLocaleDateString()}</td>
                <td><span class="status ${this.getCustomerStatus(customer)}">${this.getCustomerStatus(customer)}</span></td>
                <td>
                    <div class="order-actions">
                        <button class="status-btn view" onclick="customerData.viewCustomerDetails('${customer.id}')" title="View Details">
                            <i class="fa fa-eye"></i> View
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
        
        this.updatePagination();
    },
    
    // Update pagination controls
    updatePagination: function() {
        const totalPages = Math.ceil(this.customers.length / this.itemsPerPage);
        document.getElementById('currentPage').textContent = this.currentPage;
        document.getElementById('totalPages').textContent = totalPages;
        document.getElementById('prevPage').disabled = this.currentPage === 1;
        document.getElementById('nextPage').disabled = this.currentPage === totalPages;
    },
    
    // Get customer status based on order history
    getCustomerStatus: function(customer) {
        const now = new Date();
        const lastOrderDate = new Date(customer.lastOrder);
        const daysSinceLastOrder = Math.floor((now - lastOrderDate) / (1000 * 60 * 60 * 24));
        
        if (customer.orders.length === 1) return 'new';
        if (daysSinceLastOrder > 30) return 'inactive';
        return 'regular';
    },
    
    // View customer details
    viewCustomerDetails: function(customerId) {
        const customer = this.customers.find(c => c.id === customerId);
        if (!customer) return;
        
        // Update modal content
        document.getElementById('modalCustomerId').textContent = customer.id;
        document.getElementById('modalCustomerName').textContent = customer.name;
        document.getElementById('modalTotalOrders').textContent = customer.orders.length;
        document.getElementById('modalTotalSpent').textContent = `₹${customer.totalSpent.toLocaleString()}`;
        
        // Update order history
        const orderList = document.getElementById('modalOrderList');
        orderList.innerHTML = '';
        
        customer.orders.sort((a, b) => b.timestamp - a.timestamp).forEach(order => {
            const orderElement = document.createElement('div');
            orderElement.className = 'order-item';
            orderElement.innerHTML = `
                <div class="order-header">
                    <span class="order-id">${order.id}</span>
                    <span class="order-date">${new Date(order.timestamp).toLocaleString()}</span>
                </div>
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item-detail">
                            <span class="item-name">${item.name}</span>
                            <span class="item-quantity">x${item.quantity}</span>
                            <span class="item-price">₹${item.price}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="order-total">
                    Total: ₹${order.total}
                </div>
            `;
            orderList.appendChild(orderElement);
        });
        
        // Show modal
        document.getElementById('customerModal').style.display = 'flex';
    },
    
    // Search customers
    searchCustomers: function(query) {
        query = query.toLowerCase();
        const filteredCustomers = this.customers.filter(customer => 
            customer.name.toLowerCase().includes(query) ||
            customer.id.toLowerCase().includes(query)
        );
        this.customers = filteredCustomers;
        this.currentPage = 1;
        this.updateCustomerTable();
    },
    
    // Filter customers by status
    filterCustomers: function(status) {
        if (status === 'all') {
            this.customers = this.allCustomers;
        } else {
            this.customers = this.allCustomers.filter(customer => 
                this.getCustomerStatus(customer) === status
            );
        }
        this.currentPage = 1;
        this.updateCustomerTable();
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize with sample data (replace with actual completed orders)
    const sampleOrders = [
        {
            id: 'ORD001',
            customerName: 'John Doe',
            items: [
                { name: 'Chicken Burger', quantity: 2, price: 150 },
                { name: 'French Fries', quantity: 1, price: 80 }
            ],
            total: 380,
            timestamp: new Date('2024-03-15T12:30:00')
        },
        {
            id: 'ORD002',
            customerName: 'Jane Smith',
            items: [
                { name: 'Pizza', quantity: 1, price: 250 },
                { name: 'Coke', quantity: 2, price: 40 }
            ],
            total: 330,
            timestamp: new Date('2024-03-15T13:45:00')
        }
    ];
    
    customerData.initializeFromOrders(sampleOrders);
    
    // Event listeners
    document.getElementById('customerSearch').addEventListener('input', function(e) {
        customerData.searchCustomers(e.target.value);
    });
    
    document.getElementById('customerFilter').addEventListener('change', function(e) {
        customerData.filterCustomers(e.target.value);
    });
    
    document.getElementById('prevPage').addEventListener('click', function() {
        if (customerData.currentPage > 1) {
            customerData.currentPage--;
            customerData.updateCustomerTable();
        }
    });
    
    document.getElementById('nextPage').addEventListener('click', function() {
        const totalPages = Math.ceil(customerData.customers.length / customerData.itemsPerPage);
        if (customerData.currentPage < totalPages) {
            customerData.currentPage++;
            customerData.updateCustomerTable();
        }
    });
    
    document.getElementById('closeCustomerModal').addEventListener('click', function() {
        document.getElementById('customerModal').style.display = 'none';
    });
}); 