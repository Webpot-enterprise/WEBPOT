/**
 * Webpot Admin Dashboard JavaScript
 * Handles all frontend functionality for the admin dashboard
 */

// =====================================================
// Utility Functions
// =====================================================

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

/**
 * Format date
 */
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Get URL parameters
 */
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        id: params.get('id'),
        filter: params.get('filter') || 'all'
    };
}

// =====================================================
// Authentication
// =====================================================

/**
 * Check if admin is logged in
 */
async function checkAuth() {
    try {
        const response = await fetch('../backend/auth.php?action=check');
        const data = await response.json();
        
        if (!data.logged_in) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    } catch (error) {
        console.error('Auth check failed:', error);
        window.location.href = 'login.html';
        return false;
    }
}

/**
 * Handle logout
 */
async function handleLogout() {
    try {
        await fetch('../backend/auth.php?action=logout');
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Logout failed:', error);
    }
}

// =====================================================
// Dashboard (index.html)
// =====================================================

/**
 * Initialize dashboard
 */
async function initDashboard() {
    // Check auth first
    if (!(await checkAuth())) return;
    
    // Setup logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Load customers
    await loadCustomers();
}

/**
 * Load customers from API
 */
async function loadCustomers() {
    const container = document.getElementById('customerListContainer');
    if (!container) return;
    
    // Show loading
    container.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
    
    try {
        const url = '../backend/api/customers.php';
        const response = await fetch(url);
        const data = await response.json();
        
        if (!data.success) {
            container.innerHTML = `<div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error</h3>
                <p>${data.message || 'Failed to load customers'}</p>
            </div>`;
            return;
        }
        
        // Render customer list
        if (data.customers.length === 0) {
            container.innerHTML = `<div class="empty-state">
                <i class="fas fa-users"></i>
                <h3>No Customers Found</h3>
                <p>Customer entries will appear here when someone submits the contact form.</p>
            </div>`;
            return;
        }
        
        container.innerHTML = data.customers.map(customer => `
            <div class="customer-item">
                <div class="customer-info">
                    <h3>${escapeHtml(customer.name)}</h3>
                    <p>${escapeHtml(customer.email)}</p>
                </div>
                <div>
                    <span class="status-badge ${customer.order_status.toLowerCase()}">${customer.order_status}</span>
                </div>
                <div>
                    <span class="payment-status ${customer.payment_status.toLowerCase().replace(' ', '-')}">${customer.payment_status}</span>
                </div>
                <div class="customer-actions">
                    <button class="btn-action manage" onclick="viewCustomer(${customer.id})">
                        <i class="fas fa-edit"></i> Manage
                    </button>
                    <button class="btn-action delete" onclick="confirmDelete(${customer.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Load customers failed:', error);
        container.innerHTML = `<div class="empty-state">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Error</h3>
            <p>An error occurred while loading customers.</p>
        </div>`;
    }
}

/**
 * View customer details
 */
function viewCustomer(id) {
    window.location.href = `manage.html?id=${id}`;
}

/**
 * Confirm delete customer
 */
let deleteCustomerId = null;

function confirmDelete(id) {
    deleteCustomerId = id;
    const modal = document.getElementById('deleteModal');
    if (modal) {
        modal.classList.add('active');
    }
}

// =====================================================
// Manage Customer (manage.html)
// =====================================================

/**
 * Initialize manage page
 */
async function initManagePage() {
    // Check auth first
    if (!(await checkAuth())) return;
    
    const params = getUrlParams();
    const customerId = params.id;
    
    if (!customerId) {
        showToast('Invalid customer ID', 'error');
        window.location.href = 'index.html';
        return;
    }
    
    // Setup logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Load customer data
    await loadCustomerDetails(customerId);
    
    // Setup event listeners
    setupManageEvents(customerId);
}

/**
 * Load customer details
 */
async function loadCustomerDetails(customerId) {
    const loadingState = document.getElementById('loadingState');
    const customerDetails = document.getElementById('customerDetails');
    
    try {
        const response = await fetch(`../backend/api/customer.php?id=${customerId}`);
        const data = await response.json();
        
        if (!data.success) {
            showToast(data.message || 'Failed to load customer', 'error');
            window.location.href = 'index.html';
            return;
        }
        
        const customer = data.customer;
        
        // Update contact info
        document.getElementById('detailName').textContent = customer.name;
        document.getElementById('detailEmail').textContent = customer.email;
        document.getElementById('detailEmail').href = `mailto:${customer.email}`;
        document.getElementById('detailPhone').textContent = customer.phone || '-';
        document.getElementById('detailBusiness').textContent = customer.business || '-';
        document.getElementById('detailMessage').textContent = customer.message || '-';
        
        // Update status
        const statusBadge = document.getElementById('detailStatus');
        statusBadge.textContent = customer.order_status;
        statusBadge.className = `status-badge ${customer.order_status.toLowerCase()}`;
        
        // Update payment status
        const paymentStatus = document.getElementById('detailPayment');
        paymentStatus.textContent = customer.payment_status;
        paymentStatus.className = `payment-status ${customer.payment_status.toLowerCase().replace(' ', '-')}`;
        
        // Update select dropdown
        document.getElementById('statusSelect').value = customer.order_status;
        
        // Update additional info
        document.getElementById('planType').value = customer.plan_type || '';
        document.getElementById('priceAgreed').value = customer.price_agreed || '';
        document.getElementById('deliveryDate').value = customer.delivery_date || '';
        
        // Update timestamps
        document.getElementById('detailCreated').textContent = formatDate(customer.created_at);
        document.getElementById('detailUpdated').textContent = formatDate(customer.updated_at);
        
        // Show details
        loadingState.style.display = 'none';
        customerDetails.style.display = 'block';
        
    } catch (error) {
        console.error('Load customer failed:', error);
        showToast('Failed to load customer details', 'error');
        window.location.href = 'index.html';
    }
}

/**
 * Setup manage page event listeners
 */
function setupManageEvents(customerId) {
    // Status update
    const updateStatusBtn = document.getElementById('updateStatusBtn');
    if (updateStatusBtn) {
        updateStatusBtn.addEventListener('click', () => updateStatus(customerId));
    }
    
    // Save customer form
    const customerForm = document.getElementById('customerForm');
    if (customerForm) {
        customerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveCustomerData(customerId);
        });
    }
    
    // Delete customer
    const deleteBtn = document.getElementById('deleteCustomerBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => confirmDelete(customerId));
    }
    
    // Modal buttons
    const cancelDelete = document.getElementById('cancelDelete');
    const confirmDeleteBtn = document.getElementById('confirmDelete');
    const deleteModal = document.getElementById('deleteModal');
    
    if (cancelDelete) {
        cancelDelete.addEventListener('click', () => {
            deleteModal.classList.remove('active');
            deleteCustomerId = null;
        });
    }
    
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', () => deleteCustomer(customerId));
    }
    
    // Close modal on overlay click
    if (deleteModal) {
        deleteModal.addEventListener('click', (e) => {
            if (e.target === deleteModal) {
                deleteModal.classList.remove('active');
                deleteCustomerId = null;
            }
        });
    }
}

/**
 * Update customer status
 */
async function updateStatus(customerId) {
    const statusSelect = document.getElementById('statusSelect');
    const newStatus = statusSelect.value;
    const updateBtn = document.getElementById('updateStatusBtn');
    
    updateBtn.disabled = true;
    updateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';
    
    try {
        const response = await fetch('../backend/api/update_status.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: customerId,
                status: newStatus
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showToast('Status updated successfully!', 'success');
            
            // Update display
            const statusBadge = document.getElementById('detailStatus');
            statusBadge.textContent = newStatus;
            statusBadge.className = `status-badge ${newStatus.toLowerCase()}`;
            
            // Update payment status based on new status
            const paymentMap = {
                'Ordered': 'Unpaid',
                'Processing': 'Half Paid',
                'Completed': 'Paid'
            };
            
            const paymentStatus = document.getElementById('detailPayment');
            paymentStatus.textContent = paymentMap[newStatus];
            paymentStatus.className = `payment-status ${paymentMap[newStatus].toLowerCase().replace(' ', '-')}`;
            
            if (data.email_sent) {
                showToast('Email notification sent to customer', 'info');
            }
        } else {
            showToast(data.message || 'Failed to update status', 'error');
        }
    } catch (error) {
        console.error('Update status failed:', error);
        showToast('Failed to update status', 'error');
    } finally {
        updateBtn.disabled = false;
        updateBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Update Status';
    }
}

/**
 * Save customer data
 */
async function saveCustomerData(customerId) {
    const saveBtn = document.querySelector('#customerForm .btn-save');
    
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    
    const data = {
        id: customerId,
        plan_type: document.getElementById('planType').value || null,
        price_agreed: document.getElementById('priceAgreed').value || null,
        delivery_date: document.getElementById('deliveryDate').value || null
    };
    
    try {
        const response = await fetch('../backend/api/save_customer.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showToast('Customer data saved successfully!', 'success');
        } else {
            showToast(result.message || 'Failed to save data', 'error');
        }
    } catch (error) {
        console.error('Save customer failed:', error);
        showToast('Failed to save customer data', 'error');
    } finally {
        saveBtn.disabled = false;
        saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Changes';
    }
}

/**
 * Delete customer
 */
async function deleteCustomer(customerId) {
    const modal = document.getElementById('deleteModal');
    const confirmBtn = document.getElementById('confirmDelete');
    
    confirmBtn.disabled = true;
    confirmBtn.textContent = 'Deleting...';
    
    try {
        const response = await fetch('../backend/api/delete_customer.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: customerId })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showToast('Customer deleted successfully!', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            showToast(data.message || 'Failed to delete customer', 'error');
            modal.classList.remove('active');
        }
    } catch (error) {
        console.error('Delete customer failed:', error);
        showToast('Failed to delete customer', 'error');
    } finally {
        confirmBtn.disabled = false;
        confirmBtn.textContent = 'Delete';
    }
}

// =====================================================
// Utility
// =====================================================

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// =====================================================
// Initialize on Page Load
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    
    if (path.includes('index.html') || path.endsWith('/dashbaord_admin/')) {
        initDashboard();
    } else if (path.includes('manage.html')) {
        initManagePage();
    }
    // Login page has its own inline script
});
