// Order Tab Switching
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const orderContainers = document.querySelectorAll('.orders-container');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            // Hide all containers
            orderContainers.forEach(container => container.classList.add('hidden'));
            // Show selected container
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-orders`).classList.remove('hidden');
        });
    });

    // Order Tracking Modal
    const trackButtons = document.querySelectorAll('.btn-primary');
    trackButtons.forEach(button => {
        if (button.textContent === 'Track Order') {
            button.addEventListener('click', () => {
                const orderCard = button.closest('.order-card');
                const orderId = orderCard.querySelector('h3').textContent;
                showTrackingModal(orderId);
            });
        }
    });
});

// Tracking Modal Function
function showTrackingModal(orderId) {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'tracking-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Track Order ${orderId}</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="tracking-timeline">
                <div class="timeline-step completed">
                    <div class="step-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="step-content">
                        <h4>Order Placed</h4>
                        <p>Your order has been received</p>
                        <span class="step-time">12:30 PM</span>
                    </div>
                </div>
                <div class="timeline-step completed">
                    <div class="step-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="step-content">
                        <h4>Order Confirmed</h4>
                        <p>Your order has been confirmed</p>
                        <span class="step-time">12:32 PM</span>
                    </div>
                </div>
                <div class="timeline-step active">
                    <div class="step-icon">
                        <i class="fas fa-utensils"></i>
                    </div>
                    <div class="step-content">
                        <h4>Preparing</h4>
                        <p>Your order is being prepared</p>
                        <span class="step-time">12:35 PM</span>
                    </div>
                </div>
                <div class="timeline-step">
                    <div class="step-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="step-content">
                        <h4>Ready for Pickup</h4>
                        <p>Your order will be ready soon</p>
                        <span class="step-time">Estimated: 12:45 PM</span>
                    </div>
                </div>
                <div class="timeline-step">
                    <div class="step-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="step-content">
                        <h4>Completed</h4>
                        <p>Order picked up</p>
                        <span class="step-time">-</span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary">Refresh Status</button>
                <button class="btn btn-outline close-modal">Close</button>
            </div>
        </div>
    `;

    // Add modal to body
    document.body.appendChild(modal);

    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .tracking-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .modal-content {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            width: 90%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
        }

        .close-modal {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-secondary);
        }

        .tracking-timeline {
            position: relative;
            padding: 1rem 0;
        }

        .timeline-step {
            display: flex;
            align-items: flex-start;
            margin-bottom: 2rem;
            position: relative;
        }

        .timeline-step:not(:last-child)::before {
            content: '';
            position: absolute;
            left: 1.25rem;
            top: 2.5rem;
            bottom: -2rem;
            width: 2px;
            background: var(--border-color);
        }

        .step-icon {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
            background: var(--bg-light);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 1rem;
            z-index: 1;
        }

        .timeline-step.completed .step-icon {
            background: var(--success);
            color: white;
        }

        .timeline-step.active .step-icon {
            background: var(--primary);
            color: white;
        }

        .step-content {
            flex: 1;
        }

        .step-content h4 {
            margin: 0;
            color: var(--text-primary);
        }

        .step-content p {
            margin: 0.25rem 0;
            color: var(--text-secondary);
        }

        .step-time {
            font-size: 0.875rem;
            color: var(--text-secondary);
        }

        .modal-footer {
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
            margin-top: 2rem;
        }
    `;
    document.head.appendChild(style);

    // Close modal functionality
    const closeButtons = modal.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.remove();
            style.remove();
        });
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            style.remove();
        }
    });
}

// Add styles for order cards
const orderStyles = document.createElement('style');
orderStyles.textContent = `
    .orders-section {
        padding: 4rem 0;
    }

    .orders-section h1 {
        margin-bottom: 2rem;
        text-align: center;
    }

    .order-tabs {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .tab-btn {
        padding: 0.75rem 1.5rem;
        border: none;
        background: var(--bg-light);
        color: var(--text-secondary);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .tab-btn.active {
        background: var(--primary);
        color: white;
    }

    .orders-container {
        display: grid;
        gap: 2rem;
    }

    .orders-container.hidden {
        display: none;
    }

    .order-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .order-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1.5rem;
    }

    .order-info h3 {
        margin: 0;
        color: var(--text-primary);
    }

    .order-date {
        color: var(--text-secondary);
        font-size: 0.875rem;
        margin: 0.25rem 0 0;
    }

    .order-status {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.875rem;
    }

    .order-status.preparing {
        background: var(--warning-light);
        color: var(--warning);
    }

    .order-status.completed {
        background: var(--success-light);
        color: var(--success);
    }

    .order-items {
        display: grid;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }

    .order-item {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        background: var(--bg-light);
        border-radius: 8px;
    }

    .order-item img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 8px;
    }

    .item-details {
        flex: 1;
    }

    .item-details h4 {
        margin: 0;
        color: var(--text-primary);
    }

    .item-details p {
        margin: 0.25rem 0;
        color: var(--text-secondary);
    }

    .item-price {
        font-weight: 600;
        color: var(--text-primary);
    }

    .order-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 1.5rem;
        border-top: 1px solid var(--border-color);
    }

    .order-total {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .total-amount {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-primary);
    }

    .order-actions {
        display: flex;
        gap: 1rem;
    }

    @media (max-width: 768px) {
        .order-header {
            flex-direction: column;
            gap: 1rem;
        }

        .order-footer {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
        }

        .order-actions {
            flex-direction: column;
        }
    }
`;
document.head.appendChild(orderStyles); 