# Revert Changes TODO

## Security Changes to Revert

### 🔒 Prepared Statements
- [x] backend/auth.php - Replace prepared statements with direct SQL
- [x] backend/contact.php - Replace prepared statement with direct SQL
- [x] backend/api/customers.php - Replace prepared statements with direct SQL
- [x] backend/api/customer.php - Replace prepared statement with direct SQL
- [x] backend/api/update_status.php - Replace prepared statements with direct SQL
- [x] backend/api/save_customer.php - Replace prepared statement with direct SQL
- [x] backend/api/delete_customer.php - Replace prepared statements with direct SQL


### 🔒 Session ID Regeneration
- [x] backend/auth.php - Remove session_regenerate_id(true)

### 🔒 Cleanup Cron Job
- [x] Delete backend/cleanup_sessions.php


## Performance Changes to Revert

### ⚡ Pagination
- [x] backend/api/customers.php - Remove pagination (page, limit, offset)
- [x] dashboard_admin/script.js - Remove pagination handling



## Convenience Changes to Revert

### 🧩 Admin Notes Editor
- [x] dashboard_admin/manage.html - Remove notes textarea

### 🧩 Dashboard Stats
- [x] dashboard_admin/index.html - Remove stats cards section
- [x] dashboard_admin/script.js - Remove updateStats() function

### 🧩 Filter Tabs
- [x] dashboard_admin/index.html - Remove filter tabs
- [x] dashboard_admin/script.js - Remove filter tabs functionality

