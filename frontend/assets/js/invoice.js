// Dummy invoice data
let invoices = [
  {
    id: 'INV001',
    orderId: 'ORD001',
    customer: 'John Doe',
    date: '2024-06-01',
    total: 18.50,
    status: 'paid'
  },
  {
    id: 'INV002',
    orderId: 'ORD002',
    customer: 'Jane Smith',
    date: '2024-06-02',
    total: 7.00,
    status: 'unpaid'
  },
  {
    id: 'INV003',
    orderId: 'ORD003',
    customer: 'Alice Brown',
    date: '2024-06-02',
    total: 3.50,
    status: 'cancelled'
  }
];

const invoiceTableBody = document.getElementById('invoice-table-body');
const invoiceSearch = document.getElementById('invoice-search');
const addInvoiceBtn = document.querySelector('.add-invoice-btn');
const invoiceModal = document.getElementById('invoice-modal');
const closeInvoiceModal = document.querySelector('#invoice-modal .close');
const invoiceForm = document.getElementById('invoice-form');
const modalTitle = document.getElementById('modal-title');
const viewInvoiceModal = document.getElementById('view-invoice-modal');
const closeViewInvoiceModal = document.querySelector('#view-invoice-modal .close');
const invoiceDetailsContent = document.getElementById('invoice-details-content');

// Render invoices
function renderInvoices(filtered = invoices) {
  invoiceTableBody.innerHTML = '';
  filtered.forEach(inv => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${inv.id}</td>
      <td>${inv.orderId}</td>
      <td>${inv.customer}</td>
      <td>${inv.date}</td>
      <td>₹${inv.total.toFixed(2)}</td>
      <td><span class="status-badge status-${inv.status}">${inv.status}</span></td>
      <td>
        <button class="action-btn view-btn" onclick="viewInvoice('${inv.id}')"><i class="fa fa-eye"></i></button>
      </td>
    `;
    invoiceTableBody.appendChild(row);
  });
}

// Search functionality
invoiceSearch.addEventListener('input', function(e) {
  const term = e.target.value.toLowerCase();
  const filtered = invoices.filter(inv =>
    inv.id.toLowerCase().includes(term) ||
    inv.orderId.toLowerCase().includes(term) ||
    inv.customer.toLowerCase().includes(term) ||
    inv.date.includes(term) ||
    inv.status.toLowerCase().includes(term)
  );
  renderInvoices(filtered);
});

// Open modal for add
addInvoiceBtn.addEventListener('click', () => {
  modalTitle.textContent = 'Generate Invoice';
  invoiceForm.reset();
  invoiceModal.style.display = 'block';
});

// Close modals
closeInvoiceModal.addEventListener('click', () => {
  invoiceModal.style.display = 'none';
});
closeViewInvoiceModal.addEventListener('click', () => {
  viewInvoiceModal.style.display = 'none';
});
window.addEventListener('click', (e) => {
  if (e.target === invoiceModal) {
    invoiceModal.style.display = 'none';
  }
  if (e.target === viewInvoiceModal) {
    viewInvoiceModal.style.display = 'none';
  }
});

// Add invoice
invoiceForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const orderId = document.getElementById('invoice-order-id').value;
  const customer = document.getElementById('invoice-customer').value;
  const date = document.getElementById('invoice-date').value;
  const total = parseFloat(document.getElementById('invoice-total').value);
  const status = document.getElementById('invoice-status').value;
  const newId = 'INV' + String(invoices.length + 1).padStart(3, '0');
  invoices.push({ id: newId, orderId, customer, date, total, status });
  renderInvoices();
  invoiceModal.style.display = 'none';
});

// View invoice
window.viewInvoice = function(id) {
  const inv = invoices.find(i => i.id === id);
  if (inv) {
    invoiceDetailsContent.innerHTML = `
      <strong>Invoice ID:</strong> ${inv.id}<br>
      <strong>Order ID:</strong> ${inv.orderId}<br>
      <strong>Customer:</strong> ${inv.customer}<br>
      <strong>Date:</strong> ${inv.date}<br>
      <strong>Status:</strong> <span class="status-badge status-${inv.status}">${inv.status}</span><br>
      <strong>Total:</strong> ₹${inv.total.toFixed(2)}<br>
    `;
    viewInvoiceModal.style.display = 'block';
  }
};

// Initial render
renderInvoices(); 