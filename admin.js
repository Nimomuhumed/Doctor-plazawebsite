// Admin Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.admin-mobile-menu-btn');
    const sidebar = document.querySelector('.admin-sidebar');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Update current time
    function updateCurrentTime() {
        const now = new Date();
        const options = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        document.getElementById('currentTime').textContent = now.toLocaleDateString('en-KE', options);
    }
    
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    
    // Sidebar menu active state
    const menuItems = document.querySelectorAll('.sidebar-menu a');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (!this.getAttribute('href').startsWith('#')) return;
            
            e.preventDefault();
            
            // Remove active class from all items
            menuItems.forEach(i => i.closest('li').classList.remove('active'));
            
            // Add active class to clicked item
            this.closest('li').classList.add('active');
            
            // Show notification for demo purposes
            const pageName = this.querySelector('span').textContent;
            showNotification(`Navigating to ${pageName} page`, 'info');
        });
    });
    
    // Table row actions
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.classList[1];
            const row = this.closest('tr');
            const patientName = row.querySelector('strong').textContent;
            const appointmentId = row.querySelector('td:first-child').textContent;
            
            let message = '';
            let type = 'info';
            
            switch(action) {
                case 'view':
                    message = `Viewing details for ${patientName} (${appointmentId})`;
                    type = 'info';
                    break;
                case 'edit':
                    message = `Editing appointment ${appointmentId}`;
                    type = 'warning';
                    break;
                case 'delete':
                    if (confirm(`Are you sure you want to cancel appointment ${appointmentId}?`)) {
                        const statusBadge = row.querySelector('.status-badge');
                        statusBadge.textContent = 'Cancelled';
                        statusBadge.className = 'status-badge cancelled';
                        message = `Appointment ${appointmentId} cancelled`;
                        type = 'danger';
                    }
                    break;
                case 'confirm':
                    if (confirm(`Confirm appointment ${appointmentId}?`)) {
                        const statusBadge = row.querySelector('.status-badge');
                        statusBadge.textContent = 'Confirmed';
                        statusBadge.className = 'status-badge confirmed';
                        message = `Appointment ${appointmentId} confirmed`;
                        type = 'success';
                    }
                    break;
                case 'restore':
                    if (confirm(`Restore appointment ${appointmentId}?`)) {
                        const statusBadge = row.querySelector('.status-badge');
                        statusBadge.textContent = 'Pending';
                        statusBadge.className = 'status-badge pending';
                        message = `Appointment ${appointmentId} restored`;
                        type = 'info';
                    }
                    break;
            }
            
            if (message) {
                showNotification(message, type);
            }
        });
    });
    
    // Button actions
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            showNotification(`${buttonText} action triggered`, 'info');
        });
    });
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                showNotification('Logging out...', 'warning');
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 1500);
            }
        });
    }
    
    // Back to site button
    document.querySelector('.back-to-site').addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Returning to main website...', 'info');
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 500);
    });
    
    // Mark notifications as read
    const notifications = document.querySelectorAll('.notification-item.unread');
    notifications.forEach(notification => {
        notification.addEventListener('click', function() {
            this.classList.remove('unread');
            updateNotificationBadge();
        });
    });
    
    // Chart hover effect
    const chartSlices = document.querySelectorAll('.slice');
    chartSlices.forEach(slice => {
        slice.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        slice.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Update notification badge
    function updateNotificationBadge() {
        const unreadCount = document.querySelectorAll('.notification-item.unread').length;
        const badge = document.querySelector('.badge');
        if (badge && badge.closest('.card-header').querySelector('h3').textContent.includes('Notifications')) {
            if (unreadCount > 0) {
                badge.textContent = `${unreadCount} new`;
                badge.style.display = 'inline-block';
            } else {
                badge.style.display = 'none';
            }
        }
    }
    
    // Initialize notification badge
    updateNotificationBadge();
    
    // System status simulation
    function simulateSystemStatus() {
        const statusIndicator = document.querySelector('.status-indicator');
        const statusText = document.querySelector('.admin-footer .status-indicator');
        
        // Randomly change status (for demo)
        if (Math.random() < 0.1) { // 10% chance to go offline
            statusIndicator.classList.remove('online');
            statusIndicator.classList.add('offline');
            statusIndicator.innerHTML = '<i class="fas fa-circle"></i> Offline';
            
            statusText.classList.remove('online');
            statusText.classList.add('offline');
            statusText.innerHTML = '<i class="fas fa-circle"></i> System Offline';
            
            showNotification('System connection lost. Attempting to reconnect...', 'danger');
            
            // Auto-reconnect after 5 seconds
            setTimeout(() => {
                statusIndicator.classList.remove('offline');
                statusIndicator.classList.add('online');
                statusIndicator.innerHTML = '<i class="fas fa-circle"></i> Online';
                
                statusText.classList.remove('offline');
                statusText.classList.add('online');
                statusText.innerHTML = '<i class="fas fa-circle"></i> System Online';
                
                showNotification('System reconnected successfully', 'success');
            }, 5000);
        }
    }
    
    // Run system status simulation every 30 seconds
    setInterval(simulateSystemStatus, 30000);
    
    // Helper function to show notifications
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `admin-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="fas fa-${getIconForType(type)}"></i>
            </div>
            <div class="notification-message">${message}</div>
            <button class="notification-close">&times;</button>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Add styles if not already added
        if (!document.querySelector('#admin-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'admin-notification-styles';
            style.textContent = `
                .admin-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    padding: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    z-index: 10000;
                    max-width: 400px;
                    animation: slideIn 0.3s ease;
                    border-left: 4px solid #2196f3;
                }
                
                .admin-notification.success {
                    border-left-color: #4caf50;
                }
                
                .admin-notification.warning {
                    border-left-color: #ff9800;
                }
                
                .admin-notification.danger {
                    border-left-color: #f44336;
                }
                
                .admin-notification.info {
                    border-left-color: #2196f3;
                }
                
                .notification-icon {
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                }
                
                .notification-icon i {
                    color: inherit;
                }
                
                .notification-message {
                    flex: 1;
                    font-size: 0.95rem;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #666;
                    padding: 0;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
    
    function getIconForType(type) {
        switch(type) {
            case 'success': return 'check-circle';
            case 'warning': return 'exclamation-triangle';
            case 'danger': return 'times-circle';
            default: return 'info-circle';
        }
    }
    
    // Initialize with a welcome notification
    setTimeout(() => {
        showNotification('Welcome to the admin dashboard!', 'info');
    }, 1000);
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl + / to toggle sidebar
        if (e.ctrlKey && e.key === '/') {
            e.preventDefault();
            if (sidebar) {
                sidebar.classList.toggle('active');
            }
        }
        
        // Escape to close sidebar on mobile
        if (e.key === 'Escape' && window.innerWidth <= 992) {
            if (sidebar && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        }
    });
    
    // Demo: Auto-add new appointment every 2 minutes
    setInterval(() => {
        if (Math.random() < 0.7) { // 70% chance
            const names = ['John Doe', 'Jane Smith', 'Robert Johnson', 'Sarah Williams'];
            const services = ['General Consultation', 'Lab Test', 'Follow-up', 'Emergency'];
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomService = services[Math.floor(Math.random() * services.length)];
            
            showNotification(`New appointment booked: ${randomName} for ${randomService}`, 'success');
        }
    }, 120000); // Every 2 minutes
});