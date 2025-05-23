// --- Simulated Analytics Data ---
const analyticsData = {
  day: {
    sales: 1200, orders: 34, avg: 35.29, bestDay: 'Today',
    times: [2, 4, 8, 12, 18, 20, 10, 5],
    items: [12, 8, 6, 4, 2, 1],
    salesTrend: [200, 180, 220, 250, 150, 100, 100],
    orderStatus: [20, 10, 2, 2]
  },
  week: {
    sales: 8200, orders: 210, avg: 39.05, bestDay: 'Friday',
    times: [10, 20, 30, 40, 50, 60, 70, 80],
    items: [60, 40, 30, 20, 10, 5],
    salesTrend: [1200, 1400, 1100, 1300, 900, 1100, 1200],
    orderStatus: [120, 70, 10, 10]
  },
  month: {
    sales: 32000, orders: 900, avg: 35.56, bestDay: '2nd Sat',
    times: [50, 60, 70, 80, 90, 100, 110, 120],
    items: [200, 150, 100, 80, 60, 40],
    salesTrend: [4000, 4200, 3900, 4100, 3800, 4200, 3800],
    orderStatus: [600, 250, 30, 20]
  },
  quarter: {
    sales: 90000, orders: 2500, avg: 36.00, bestDay: 'March 15',
    times: [200, 220, 240, 260, 280, 300, 320, 340],
    items: [600, 500, 400, 300, 200, 100],
    salesTrend: [12000, 13000, 11000, 12500, 11500, 13000, 12000],
    orderStatus: [1800, 600, 60, 40]
  },
  year: {
    sales: 380000, orders: 11000, avg: 34.55, bestDay: 'July 4',
    times: [1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400],
    items: [3000, 2500, 2000, 1500, 1000, 500],
    salesTrend: [32000, 34000, 31000, 33000, 30000, 34000, 31000, 32000, 33000, 34000, 32000, 33000],
    orderStatus: [8000, 2500, 300, 200]
  }
};
const timeLabels = ['6am','9am','12pm','3pm','6pm','9pm','12am','3am'];
const itemLabels = ['Burger','Pizza','Stir Fry','Brownie','Soup','Other'];
const salesTrendLabels = {
  day: ['6am','9am','12pm','3pm','6pm','9pm','12am'],
  week: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
  month: ['W1','W2','W3','W4','W5','W6','W7'],
  quarter: ['Jan','Feb','Mar','Apr','May','Jun','Jul'],
  year: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
};
const orderStatusLabels = ['Completed','Pending','Cancelled','Refunded'];

let ordersTimeChart, topItemsChart, salesTrendChart, orderStatusChart;

function updateAnalytics(period = 'day') {
  const data = analyticsData[period];
  document.getElementById('analytics-total-sales').textContent = '₹' + data.sales.toLocaleString();
  document.getElementById('analytics-total-orders').textContent = data.orders;
  document.getElementById('analytics-avg-order').textContent = '₹' + data.avg.toFixed(2);
  document.getElementById('analytics-best-day').textContent = data.bestDay;

  // Destroy old charts if they exist
  if (ordersTimeChart) ordersTimeChart.destroy();
  if (topItemsChart) topItemsChart.destroy();
  if (salesTrendChart) salesTrendChart.destroy();
  if (orderStatusChart) orderStatusChart.destroy();

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

  salesTrendChart = new Chart(document.getElementById('sales-trend-chart'), {
    type: 'line',
    data: {
      labels: salesTrendLabels[period],
      datasets: [{
        label: 'Sales',
        data: data.salesTrend,
        borderColor: '#ff6b2c',
        backgroundColor: 'rgba(255,107,44,0.15)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });

  orderStatusChart = new Chart(document.getElementById('order-status-chart'), {
    type: 'doughnut',
    data: {
      labels: orderStatusLabels,
      datasets: [{
        data: data.orderStatus,
        backgroundColor: [
          '#81c784','#ffd54f','#ff6b2c','#bdbdbd'
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

// Dummy analytics data
const analytics = {
    totalSales: 12450,
    totalOrders: 320,
    peakTime: '13:00',
    topItem: 'Chicken Burger',
    salesData: [1200, 1500, 1800, 1700, 2100, 1600, 1550],
    ordersData: [40, 55, 60, 58, 70, 50, 47],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
};

document.addEventListener('DOMContentLoaded', () => {
    // Update analytics cards
    document.getElementById('total-sales').textContent = `₹${analytics.totalSales.toLocaleString()}`;
    document.getElementById('total-orders').textContent = analytics.totalOrders;
    document.getElementById('peak-time').textContent = analytics.peakTime;
    document.getElementById('analytics-total-sales').textContent = `₹${analytics.totalSales.toLocaleString()}`;
    document.getElementById('analytics-total-orders').textContent = analytics.totalOrders;
    document.getElementById('analytics-avg-order').textContent = `₹${(analytics.totalSales / analytics.totalOrders).toFixed(2)}`;
    document.getElementById('analytics-best-day').textContent = 'Friday';

    // Sales Trend Chart
    const salesCtx = document.getElementById('sales-trend-chart').getContext('2d');
    new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: analytics.labels,
            datasets: [{
                label: 'Sales (₹)',
                data: analytics.salesData,
                borderColor: '#ff6b2c',
                backgroundColor: 'rgba(255,107,44,0.08)',
                tension: 0.4,
                pointBackgroundColor: '#ff6b2c',
                pointRadius: 4,
                fill: true
            }]
        },
        options: {
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: '#aaa' }
                },
                y: {
                    grid: { color: '#333' },
                    ticks: { color: '#aaa' }
                }
            }
        }
    });

    // Orders Time Chart
    const ordersCtx = document.getElementById('orders-time-chart').getContext('2d');
    new Chart(ordersCtx, {
        type: 'bar',
        data: {
            labels: ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'],
            datasets: [{
                label: 'Orders',
                data: [15, 25, 35, 45, 55, 40, 30, 20, 10],
                backgroundColor: '#ff6b2c',
                borderRadius: 8,
                barPercentage: 0.6
            }]
        },
        options: {
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: '#aaa' }
                },
                y: {
                    grid: { color: '#333' },
                    ticks: { color: '#aaa' }
                }
            }
        }
    });

    // Top Items Chart
    const itemsCtx = document.getElementById('top-items-chart').getContext('2d');
    new Chart(itemsCtx, {
        type: 'doughnut',
        data: {
            labels: ['Chicken Burger', 'Pizza', 'Pasta', 'Salad', 'Drinks'],
            datasets: [{
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                    '#ff6b2c',
                    '#ff8c5a',
                    '#ffa87d',
                    '#ffc4a0',
                    '#ffe0c3'
                ],
                borderWidth: 0
            }]
        },
        options: {
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#aaa',
                        padding: 20
                    }
                }
            }
        }
    });

    // Order Status Chart
    const statusCtx = document.getElementById('order-status-chart').getContext('2d');
    new Chart(statusCtx, {
        type: 'pie',
        data: {
            labels: ['Completed', 'Pending', 'Cancelled'],
            datasets: [{
                data: [70, 20, 10],
                backgroundColor: [
                    '#4CAF50',
                    '#FFC107',
                    '#F44336'
                ],
                borderWidth: 0
            }]
        },
        options: {
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#aaa',
                        padding: 20
                    }
                }
            }
        }
    });

    // Analytics period buttons
    const periodButtons = document.querySelectorAll('.analytics-period-btn');
    periodButtons.forEach(button => {
        button.addEventListener('click', () => {
            periodButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // Here you would typically update the data based on the selected period
        });
    });
});

// Chart.js configuration
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.color = '#666';
Chart.defaults.borderColor = '#eee';

// Sample data for raw materials
const rawMaterials = {
    'Rice': { unit: 'kg', dailyUsage: 25, stockLevel: 100, reorderPoint: 30 },
    'Vegetables': { unit: 'kg', dailyUsage: 15, stockLevel: 50, reorderPoint: 20 },
    'Chicken': { unit: 'kg', dailyUsage: 20, stockLevel: 40, reorderPoint: 15 },
    'Oil': { unit: 'L', dailyUsage: 5, stockLevel: 25, reorderPoint: 10 },
    'Spices': { unit: 'kg', dailyUsage: 2, stockLevel: 10, reorderPoint: 3 }
};

// Initialize all charts
function initializeCharts() {
    initializeSalesChart();
    initializeCustomerTrendsChart();
    initializeMaterialsChart();
    initializeInventoryChart();
    initializeStaffPerformanceChart();
    initializePeakHoursChart();
    updateMaterialsList();
}

// Sales Analytics Chart
function initializeSalesChart() {
    const ctx = document.getElementById('sales-analytics-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM'],
            datasets: [{
                label: 'Sales',
                data: [1200, 1900, 3000, 2500, 1800, 2200, 1500],
                borderColor: '#ff6b00',
                backgroundColor: 'rgba(255, 107, 0, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => '₹' + value
                    }
                }
            }
        }
    });
}

// Customer Trends Chart
function initializeCustomerTrendsChart() {
    const ctx = document.getElementById('customer-trends-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'New Customers',
                data: [15, 12, 18, 14, 20, 25, 22],
                backgroundColor: '#ff6b00'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Materials Usage Chart
function initializeMaterialsChart() {
    const ctx = document.getElementById('materials-usage-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(rawMaterials),
            datasets: [{
                label: 'Daily Usage',
                data: Object.values(rawMaterials).map(m => m.dailyUsage),
                backgroundColor: '#ff6b00'
            }, {
                label: 'Stock Level',
                data: Object.values(rawMaterials).map(m => m.stockLevel),
                backgroundColor: '#4CAF50'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Inventory Distribution Chart
function initializeInventoryChart() {
    const ctx = document.getElementById('inventory-distribution-chart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['In Stock', 'Low Stock', 'Out of Stock'],
            datasets: [{
                data: [65, 25, 10],
                backgroundColor: ['#4CAF50', '#FFC107', '#F44336']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Staff Performance Chart
function initializeStaffPerformanceChart() {
    const ctx = document.getElementById('staff-performance-chart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Orders Handled', 'Customer Rating', 'Attendance', 'Efficiency', 'Teamwork'],
            datasets: [{
                label: 'Top Performer',
                data: [90, 95, 98, 92, 88],
                backgroundColor: 'rgba(255, 107, 0, 0.2)',
                borderColor: '#ff6b00',
                pointBackgroundColor: '#ff6b00'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Peak Hours Chart
function initializePeakHoursChart() {
    const ctx = document.getElementById('peak-hours-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM'],
            datasets: [{
                label: 'Orders',
                data: [5, 8, 12, 15, 25, 20, 15, 10, 12, 15, 18, 15, 10],
                borderColor: '#ff6b00',
                backgroundColor: 'rgba(255, 107, 0, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Update Materials List
function updateMaterialsList() {
    const materialsList = document.getElementById('materialsList');
    materialsList.innerHTML = '';

    Object.entries(rawMaterials).forEach(([material, data]) => {
        const materialItem = document.createElement('div');
        materialItem.className = 'material-item';
        
        const needsReorder = data.stockLevel <= data.reorderPoint;
        const stockStatus = needsReorder ? 'low-stock' : '';
        
        materialItem.innerHTML = `
            <div class="material-name">${material}</div>
            <div class="material-quantity ${stockStatus}">
                Required: ${data.dailyUsage} ${data.unit}
                ${needsReorder ? ' (Reorder needed)' : ''}
            </div>
        `;
        
        materialsList.appendChild(materialItem);
    });
}

// Update dashboard statistics
function updateDashboardStats() {
    // Sales stats
    document.getElementById('dashboard-total-sales').textContent = '₹15,500';
    document.getElementById('dashboard-total-orders').textContent = '128';
    document.getElementById('dashboard-avg-order').textContent = '₹121.09';

    // Customer stats
    document.getElementById('dashboard-new-customers').textContent = '45';
    document.getElementById('dashboard-returning-customers').textContent = '83';
    document.getElementById('dashboard-customer-growth').textContent = '+12%';

    // Inventory stats
    document.getElementById('dashboard-total-items').textContent = '156';
    document.getElementById('dashboard-low-stock').textContent = '12';
    document.getElementById('dashboard-out-stock').textContent = '3';

    // Staff stats
    document.getElementById('dashboard-top-staff').textContent = 'John Doe';
    document.getElementById('dashboard-attendance').textContent = '95%';
    document.getElementById('dashboard-recent-activity').textContent = 'Processing Orders';

    // Peak hours stats
    document.getElementById('dashboard-busiest-hour').textContent = '12:00 PM';
    document.getElementById('dashboard-avg-orders-hour').textContent = '18';
    document.getElementById('dashboard-peak-revenue').textContent = '₹3,500';
}

// Order data storage
const completedOrders = {
    orders: [],
    addOrder: function(order) {
        this.orders.push({
            ...order,
            timestamp: new Date(),
            status: 'completed'
        });
        this.updateAnalytics();
    },
    getOrdersByDate: function(date) {
        return this.orders.filter(order => 
            order.timestamp.toDateString() === date.toDateString()
        );
    },
    getOrdersByPeriod: function(period) {
        const now = new Date();
        const startDate = new Date();
        
        switch(period) {
            case 'day':
                startDate.setDate(now.getDate() - 1);
                break;
            case 'week':
                startDate.setDate(now.getDate() - 7);
                break;
            case 'month':
                startDate.setMonth(now.getMonth() - 1);
                break;
            case 'quarter':
                startDate.setMonth(now.getMonth() - 3);
                break;
            case 'year':
                startDate.setFullYear(now.getFullYear() - 1);
                break;
        }
        
        return this.orders.filter(order => 
            order.timestamp >= startDate && order.timestamp <= now
        );
    },
    calculateStats: function(orders) {
        return {
            totalSales: orders.reduce((sum, order) => sum + order.total, 0),
            totalOrders: orders.length,
            avgOrderValue: orders.length ? 
                orders.reduce((sum, order) => sum + order.total, 0) / orders.length : 0,
            itemsSold: orders.reduce((items, order) => {
                order.items.forEach(item => {
                    items[item.name] = (items[item.name] || 0) + item.quantity;
                });
                return items;
            }, {}),
            hourlyDistribution: orders.reduce((hours, order) => {
                const hour = order.timestamp.getHours();
                hours[hour] = (hours[hour] || 0) + 1;
                return hours;
            }, {})
        };
    },
    updateAnalytics: function() {
        const period = document.querySelector('.analytics-period-btn.active').dataset.period;
        const periodOrders = this.getOrdersByPeriod(period);
        const stats = this.calculateStats(periodOrders);
        
        // Update dashboard statistics
        document.getElementById('dashboard-total-sales').textContent = 
            '₹' + stats.totalSales.toLocaleString();
        document.getElementById('dashboard-total-orders').textContent = 
            stats.totalOrders;
        document.getElementById('dashboard-avg-order').textContent = 
            '₹' + stats.avgOrderValue.toFixed(2);
        
        // Update sales chart
        updateSalesChart(periodOrders);
        
        // Update items chart
        updateItemsChart(stats.itemsSold);
        
        // Update peak hours chart
        updatePeakHoursChart(stats.hourlyDistribution);
    }
};

// Function to process new completed order
function processCompletedOrder(orderData) {
    completedOrders.addOrder({
        id: orderData.id,
        customerName: orderData.customerName,
        items: orderData.items,
        total: orderData.total,
        paymentMethod: orderData.paymentMethod,
        timestamp: new Date()
    });
}

// Update Sales Chart with real data
function updateSalesChart(orders) {
    const salesData = orders.reduce((data, order) => {
        const date = order.timestamp.toLocaleDateString();
        data[date] = (data[date] || 0) + order.total;
        return data;
    }, {});

    salesTrendChart.data.labels = Object.keys(salesData);
    salesTrendChart.data.datasets[0].data = Object.values(salesData);
    salesTrendChart.update();
}

// Update Items Chart with real data
function updateItemsChart(itemsSold) {
    const labels = Object.keys(itemsSold);
    const data = Object.values(itemsSold);
    
    topItemsChart.data.labels = labels;
    topItemsChart.data.datasets[0].data = data;
    topItemsChart.update();
}

// Update Peak Hours Chart with real data
function updatePeakHoursChart(hourlyDistribution) {
    const hours = Array.from({length: 24}, (_, i) => i);
    const data = hours.map(hour => hourlyDistribution[hour] || 0);
    
    ordersTimeChart.data.labels = hours.map(h => `${h}:00`);
    ordersTimeChart.data.datasets[0].data = data;
    ordersTimeChart.update();
}

// Sample completed order data (for testing)
const sampleOrder = {
    id: 'ORD001',
    customerName: 'John Doe',
    items: [
        { name: 'Chicken Burger', quantity: 2, price: 150 },
        { name: 'French Fries', quantity: 1, price: 80 },
        { name: 'Coke', quantity: 2, price: 40 }
    ],
    total: 460,
    paymentMethod: 'Card'
};

// Initialize with sample data
document.addEventListener('DOMContentLoaded', function() {
    // Add sample order
    processCompletedOrder(sampleOrder);
    
    // Initialize charts and stats
    initializeCharts();
    updateDashboardStats();
    
    // Add event listeners for period buttons
    document.querySelectorAll('.analytics-period-btn').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.analytics-period-btn').forEach(btn => 
                btn.classList.remove('active')
            );
            this.classList.add('active');
            completedOrders.updateAnalytics();
        });
    });
}); 