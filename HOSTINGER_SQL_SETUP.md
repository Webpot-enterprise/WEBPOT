# Setting Up SQL Database on Hostinger

This guide will help you set up a MySQL database on Hostinger for your Webpot website.

## Prerequisites
- A Hostinger hosting account
- Access to hPanel

## Step 1: Login to Hostinger hPanel

1. Go to [Hostinger](https://www.hostinger.com) and log in to your account
2. Navigate to **hPanel** -> **Hosting** -> **Manage**
3. Look for the **Databases** section

## Step 2: Create a MySQL Database

1. In the Databases section, click on **MySQL Databases**
2. Under **Create New Database**, fill in:
   - **Database Name**: `webpot_db` (or your preferred name)
   - **Database User**: Create a new user or select an existing one
   - **Password**: Create a strong password

3. Click **Create** button
4. Note down the following credentials:
   - Database Name
   - Database Username
   - Database Password
   - Hostname (usually `localhost`)

## Step 3: Import Database Schema

Once your database is created, you need to create the required tables. Go to **phpMyAdmin** (available in Hostinger hPanel under Databases section).

### Create Tables

Run the following SQL commands in phpMyAdmin:

```
sql
-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    business VARCHAR(255),
    message TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create order_submissions table
CREATE TABLE IF NOT EXISTS order_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    company VARCHAR(255),
    plan VARCHAR(100),
    message TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create users table (for user authentication)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    referral_code VARCHAR(50) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create orders table (for user orders)
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    order_id VARCHAR(50) UNIQUE NOT NULL,
    service VARCHAR(100) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'processing', 'delivered', 'cancelled') DEFAULT 'pending',
    delivery_days INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## Step 4: Configure Your Website

Edit the `config.php` file in your website with your database credentials:

```
php
<?php
// config.php

// ===== Database credentials (edit these) =====
const DB_HOST = 'localhost';
const DB_NAME = 'your_database_name';
const DB_USER = 'your_database_user';
const DB_PASS = 'your_database_password';
```

Replace:
- `your_database_name` with the database name you created
- `your_database_user` with your database username
- `your_database_password` with your database password

## Step 5: Test the Connection

Create a simple test file to verify your database connection:

```
php
<?php
// test_db.php
require_once 'config.php';

try {
    $pdo = get_pdo();
    echo "Database connected successfully!";
} catch (Exception $e) {
    echo "Connection failed: " . $e->getMessage();
}
```

## Additional Tips

### Database Management via phpMyAdmin
- Access phpMyAdmin from Hostinger hPanel -> Databases -> phpMyAdmin
- You can browse, edit, and delete records
- Export your database for backups

### Security Best Practices
1. Use strong, unique passwords for database users
2. Limit database user privileges to only what's needed
3. Regularly backup your database
4. Use SSL/TLS for database connections if available

### Common Issues
- **"Access denied" error**: Check username and password
- **"Unknown database" error**: Verify database name exists
- **"Can't connect to local MySQL server"**: Host should be `localhost`

## Support
If you need help, contact Hostinger support or refer to their documentation.
