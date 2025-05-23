// Stock Management System
class StockManager {
  constructor() {
    this.stockTableBody = document.getElementById('stock-table-body');
    this.stockSearch = document.getElementById('stock-search');
    this.stockFilter = document.getElementById('stock-filter');
    this.stockModal = document.getElementById('stock-modal');
    this.closeModal = document.querySelector('#stock-modal .close');
    this.stockForm = document.getElementById('stock-form');
    this.modalTitle = document.getElementById('modal-title');
    
    this.initializeEventListeners();
    this.loadStockData();
    this.renderStock();
  }

  initializeEventListeners() {
    // Search functionality
    this.stockSearch.addEventListener('input', (e) => this.handleSearch(e));
    
    // Filter functionality
    this.stockFilter.addEventListener('change', () => this.renderStock());
    
    // Modal close
    this.closeModal.addEventListener('click', () => this.closeStockModal());
    window.addEventListener('click', (e) => {
      if (e.target === this.stockModal) this.closeStockModal();
    });
    
    // Form submission
    this.stockForm.addEventListener('submit', (e) => this.handleStockUpdate(e));
  }

  loadStockData() {
    // Get menu items from localStorage
    const menuItems = JSON.parse(localStorage.getItem('menuItems') || '[]');
    
    // Get stock data from localStorage or initialize with menu items
    let stockData = JSON.parse(localStorage.getItem('stockData') || '{}');
    
    // Initialize stock for new menu items
    menuItems.forEach(item => {
      if (!stockData[item.id]) {
        stockData[item.id] = {
          id: item.id,
          name: item.name,
          category: item.category,
          currentStock: 0,
          lowStockAlert: 5,
          lastUpdated: new Date().toISOString(),
          updateHistory: []
        };
      }
    });
    
    // Save updated stock data
    localStorage.setItem('stockData', JSON.stringify(stockData));
    this.stockData = stockData;
  }

  handleSearch(e) {
    const term = e.target.value.toLowerCase();
    this.renderStock(term);
  }

  renderStock(searchTerm = '') {
    this.stockTableBody.innerHTML = '';
    const filterValue = this.stockFilter.value;
    
    Object.values(this.stockData).forEach(item => {
      // Apply search filter
      if (searchTerm && !(
        item.name.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
      )) {
        return;
      }
      
      // Apply status filter
      if (filterValue === 'low' && item.currentStock > item.lowStockAlert) return;
      if (filterValue === 'out' && item.currentStock > 0) return;
      
      const status = this.getStockStatus(item);
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td class="${status.class}">${item.currentStock}</td>
        <td>${item.lowStockAlert}</td>
        <td><span class="status-badge ${status.class}">${status.text}</span></td>
        <td>${new Date(item.lastUpdated).toLocaleString()}</td>
        <td>
          <button class="action-btn update-btn" onclick="stockManager.openUpdateModal('${item.id}')">
            <i class="fa fa-edit"></i>
          </button>
        </td>
      `;
      this.stockTableBody.appendChild(row);
    });
  }

  getStockStatus(item) {
    if (item.currentStock === 0) {
      return { text: 'Out of Stock', class: 'out-of-stock' };
    } else if (item.currentStock <= item.lowStockAlert) {
      return { text: 'Low Stock', class: 'low-stock' };
    } else {
      return { text: 'In Stock', class: 'in-stock' };
    }
  }

  openUpdateModal(itemId) {
    const item = this.stockData[itemId];
    if (!item) return;
    
    this.modalTitle.textContent = 'Update Stock';
    document.getElementById('stock-id').value = item.id;
    document.getElementById('stock-name').value = item.name;
    document.getElementById('stock-category').value = item.category;
    document.getElementById('stock-qty').value = item.currentStock;
    document.getElementById('stock-low').value = item.lowStockAlert;
    document.getElementById('stock-note').value = '';
    
    this.stockModal.style.display = 'block';
  }

  closeStockModal() {
    this.stockModal.style.display = 'none';
  }

  handleStockUpdate(e) {
    e.preventDefault();
    const id = document.getElementById('stock-id').value;
    const currentStock = parseInt(document.getElementById('stock-qty').value);
    const lowStockAlert = parseInt(document.getElementById('stock-low').value);
    const note = document.getElementById('stock-note').value.trim();
    
    if (!this.stockData[id]) return;
    
    // Update stock data
    this.stockData[id] = {
      ...this.stockData[id],
      currentStock,
      lowStockAlert,
      lastUpdated: new Date().toISOString(),
      updateHistory: [
        ...(this.stockData[id].updateHistory || []),
        {
          date: new Date().toISOString(),
          previousStock: this.stockData[id].currentStock,
          newStock: currentStock,
          note
        }
      ]
    };
    
    // Save to localStorage
    localStorage.setItem('stockData', JSON.stringify(this.stockData));
    
    // Update menu items' stock status
    this.updateMenuItemsStock();
    
    // Close modal and refresh display
    this.closeStockModal();
    this.renderStock();
  }

  updateMenuItemsStock() {
    const menuItems = JSON.parse(localStorage.getItem('menuItems') || '[]');
    const updatedMenuItems = menuItems.map(item => ({
      ...item,
      qty: this.stockData[item.id]?.currentStock || 0
    }));
    localStorage.setItem('menuItems', JSON.stringify(updatedMenuItems));
  }
}

// Initialize stock manager
const stockManager = new StockManager(); 