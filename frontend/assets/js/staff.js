// Staff Management System
const staffSystem = {
    staff: [],
    currentPage: 1,
    itemsPerPage: 10,
    stats: {
        total: 0,
        present: 0,
        absent: 0,
        late: 0
    },

    init() {
        this.loadStaff();
        this.setupEventListeners();
        this.updateStats();
    },

    loadStaff() {
        // Sample staff data
        this.staff = [
            {
                id: 'STF001',
                name: 'John Doe',
                role: 'Chef',
                shift: 'Morning',
                status: 'present',
                checkIn: '08:00 AM',
                checkOut: '04:00 PM'
            },
            {
                id: 'STF002',
                name: 'Jane Smith',
                role: 'Cashier',
                shift: 'Evening',
                status: 'late',
                checkIn: '03:15 PM',
                checkOut: '11:00 PM'
            },
            {
                id: 'STF003',
                name: 'Mike Johnson',
                role: 'Waiter',
                shift: 'Morning',
                status: 'absent',
                checkIn: null,
                checkOut: null
            }
        ];
        this.updateStaffTable();
    },

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('staffSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchStaff(e.target.value);
            });
        }

        // Status filter
        const statusFilter = document.getElementById('staffStatusFilter');
        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => {
                this.filterByStatus(e.target.value);
            });
        }

        // Add staff button
        const addStaffBtn = document.getElementById('addStaffBtn');
        if (addStaffBtn) {
addStaffBtn.addEventListener('click', () => {
                this.openAddStaffModal();
            });
        }

        // Modal close buttons
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModal(btn.closest('.modal'));
            });
        });

        // Add staff form submission
        const addStaffForm = document.getElementById('addStaffForm');
        if (addStaffForm) {
            addStaffForm.addEventListener('submit', (e) => {
  e.preventDefault();
                this.submitNewStaff();
            });
        }
    },

    updateStats() {
        this.stats = {
            total: this.staff.length,
            present: this.staff.filter(s => s.status === 'present').length,
            absent: this.staff.filter(s => s.status === 'absent').length,
            late: this.staff.filter(s => s.status === 'late').length
        };

        // Update stats display
        document.getElementById('totalStaff').textContent = this.stats.total;
        document.getElementById('presentStaff').textContent = this.stats.present;
        document.getElementById('absentStaff').textContent = this.stats.absent;
        document.getElementById('lateStaff').textContent = this.stats.late;
    },

    updateStaffTable(filteredStaff = this.staff) {
        const tbody = document.querySelector('.staff-table tbody');
        if (!tbody) return;

        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const paginatedStaff = filteredStaff.slice(start, end);

        tbody.innerHTML = paginatedStaff.map(staff => `
            <tr>
                <td>${staff.id}</td>
                <td>${staff.name}</td>
                <td>${staff.role}</td>
                <td>${staff.shift}</td>
                <td><span class="status ${staff.status}">${staff.status}</span></td>
                <td>${staff.checkIn || '-'}</td>
                <td>${staff.checkOut || '-'}</td>
                <td>
                    <div class="staff-actions">
                        <button class="action-btn view" onclick="staffSystem.viewStaffDetails('${staff.id}')">
                            <i class="fas fa-eye"></i> View
                        </button>
                        <button class="action-btn edit" onclick="staffSystem.editStaff('${staff.id}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="action-btn delete" onclick="staffSystem.deleteStaff('${staff.id}')">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        this.updatePagination(filteredStaff.length);
    },

    updatePagination(totalItems) {
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);
        const pagination = document.querySelector('.pagination');
        if (!pagination) return;

        pagination.innerHTML = `
            <button onclick="staffSystem.changePage(1)" ${this.currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-angle-double-left"></i>
            </button>
            <button onclick="staffSystem.changePage(${this.currentPage - 1})" ${this.currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-angle-left"></i>
            </button>
            <span>Page ${this.currentPage} of ${totalPages}</span>
            <button onclick="staffSystem.changePage(${this.currentPage + 1})" ${this.currentPage === totalPages ? 'disabled' : ''}>
                <i class="fas fa-angle-right"></i>
            </button>
            <button onclick="staffSystem.changePage(${totalPages})" ${this.currentPage === totalPages ? 'disabled' : ''}>
                <i class="fas fa-angle-double-right"></i>
            </button>
        `;
    },

    changePage(page) {
        this.currentPage = page;
        this.updateStaffTable();
    },

    searchStaff(query) {
        const filteredStaff = this.staff.filter(staff => 
            staff.name.toLowerCase().includes(query.toLowerCase()) ||
            staff.id.toLowerCase().includes(query.toLowerCase())
        );
        this.currentPage = 1;
        this.updateStaffTable(filteredStaff);
    },

    filterByStatus(status) {
        const filteredStaff = status === 'all' 
            ? this.staff 
            : this.staff.filter(staff => staff.status === status);
        this.currentPage = 1;
        this.updateStaffTable(filteredStaff);
    },

    openAddStaffModal() {
        const modal = document.getElementById('addStaffModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    },

    closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
        }
    },

    submitNewStaff() {
        const form = document.getElementById('addStaffForm');
        if (!form) return;

        const formData = new FormData(form);
        const newStaff = {
            id: `STF${String(this.staff.length + 1).padStart(3, '0')}`,
            name: formData.get('name'),
            role: formData.get('role'),
            shift: formData.get('shift'),
            status: 'absent',
            checkIn: null,
            checkOut: null
        };

        this.staff.push(newStaff);
        this.updateStaffTable();
        this.updateStats();
        this.closeModal(document.getElementById('addStaffModal'));
        form.reset();
        this.showToast('Staff added successfully!');
    },

    viewStaffDetails(staffId) {
        const staff = this.staff.find(s => s.id === staffId);
        if (!staff) return;

        const modal = document.getElementById('staffDetailsModal');
        if (!modal) return;

        const detailsContent = modal.querySelector('.staff-details');
        if (detailsContent) {
            detailsContent.innerHTML = `
                <div class="detail-group">
                    <label>Staff ID:</label>
                    <p>${staff.id}</p>
                </div>
                <div class="detail-group">
                    <label>Name:</label>
                    <p>${staff.name}</p>
                </div>
                <div class="detail-group">
                    <label>Role:</label>
                    <p>${staff.role}</p>
                </div>
                <div class="detail-group">
                    <label>Shift:</label>
                    <p>${staff.shift}</p>
                </div>
                <div class="detail-group">
                    <label>Status:</label>
                    <p><span class="status ${staff.status}">${staff.status}</span></p>
                </div>
                <div class="detail-group">
                    <label>Check-in Time:</label>
                    <p>${staff.checkIn || '-'}</p>
                </div>
                <div class="detail-group">
                    <label>Check-out Time:</label>
                    <p>${staff.checkOut || '-'}</p>
                </div>
            `;
        }

        modal.style.display = 'flex';
    },

    editStaff(staffId) {
        const staff = this.staff.find(s => s.id === staffId);
        if (!staff) return;

        // Implement edit functionality
        this.showToast('Edit functionality coming soon!');
    },

    deleteStaff(staffId) {
  if (confirm('Are you sure you want to delete this staff member?')) {
            this.staff = this.staff.filter(s => s.id !== staffId);
            this.updateStaffTable();
            this.updateStats();
            this.showToast('Staff deleted successfully!');
        }
    },

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
};

// Initialize the staff system when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    staffSystem.init();
}); 