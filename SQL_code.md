# Admin Dashboard Database Schema

## Database: webpot_db

Run the following SQL code in your Hostinger MySQL database to create the necessary tables.

```
sql
-- =====================================================
-- CUSTOMERS TABLE
-- Stores customer information from contact form submissions
-- =====================================================

CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(254) NOT NULL,
    phone VARCHAR(40) DEFAULT NULL,
    business VARCHAR(120) DEFAULT NULL,
    message TEXT DEFAULT NULL,
    
    -- Order Status Management
    order_status ENUM('Ordered', 'Processing', 'Completed') DEFAULT 'Ordered',
    
    -- Payment Information (Managed automatically based on order_status)
    -- Display Logic:
    -- Ordered    -> Unpaid
    -- Processing -> Half Paid
    -- Completed  -> Paid
    
    -- Additional Admin-editable Fields
    plan_type VARCHAR(50) DEFAULT NULL,
    price_agreed DECIMAL(10, 2) DEFAULT NULL,
    delivery_date DATE DEFAULT NULL,
    notes TEXT DEFAULT NULL,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_order_status (order_status),
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- ADMIN SESSION TABLE
-- Stores admin login sessions
-- =====================================================

CREATE TABLE IF NOT EXISTS admin_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_token VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45) DEFAULT NULL,
    user_agent TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP DEFAULT NULL,
    
    INDEX idx_session_token (session_token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- EMAIL LOG TABLE
-- Tracks email notifications sent to customers
-- =====================================================

CREATE TABLE IF NOT EXISTS email_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    email_type ENUM('status_change', 'payment_reminder', 'custom') DEFAULT 'custom',
    subject VARCHAR(255) NOT NULL,
    sent_to VARCHAR(254) NOT NULL,
    status ENUM('sent', 'failed', 'pending') DEFAULT 'sent',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_customer_id (customer_id),
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## Table Relationships

```
customers (1) ----< (N) email_logs
```

## Status Flow

| Order Status | Payment Display | Database Value |
|--------------|-----------------|----------------|
| Ordered      | Unpaid          | Ordered        |
| Processing   | Half Paid       | Processing     |
| Completed    | Paid            | Completed      |

## Sample Data (For Testing)

```
sql
-- Insert a sample customer for testing
INSERT INTO customers (name, email, phone, business, message, order_status, plan_type, price_agreed)
VALUES ('Test Customer', 'test@example.com', '+91 9876543210', 'Test Business', 'Interested in premium website', 'Ordered', 'Premium', 15000.00);
```

## Notes

1. **Payment Status**: The payment status is computed automatically based on `order_status`:
   - If `order_status = 'Ordered'` → Display as "Unpaid"
   - If `order_status = 'Processing'` → Display as "Half Paid"
   - If `order_status = 'Completed'` → Display as "Paid"

2. **Admin Credentials**: Will be hardcoded in PHP (not stored in database)

3. **Session Management**: Uses PHP sessions with token-based validation

4. **Session Cleanup Cron Job**: To clean up expired admin sessions, set up a cron job:
   - **Command line (recommended)**: `0 3 * * * php /path/to/backend/cleanup_sessions.php`
   - **Via HTTP (not recommended)**: `0 3 * * * curl -s https://yourdomain.com/backend/cleanup_sessions.php?key=YOUR_SECRET_KEY`
   - Add `cron_secret` to your config.php for HTTP access: `'cron_secret' => 'your-secret-key'`
   - This runs daily at 3 AM to delete expired sessions
