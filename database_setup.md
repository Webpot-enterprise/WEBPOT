# Database Setup Guide for Hostinger MySQL

This guide will help you set up the MySQL database for your Webpot website on Hostinger.

## Step 1: Access Hostinger Control Panel

1. Log in to your Hostinger account at [https://www.hostinger.com](https://www.hostinger.com)
2. Navigate to your hosting control panel (usually hPanel or cPanel)

## Step 2: Create a MySQL Database

1. In your control panel, look for "Databases" or "MySQL Databases" section
2. Click on "MySQL Databases" or similar option
3. Create a new database:
   - **Database Name**: Choose a name (e.g., `webpot_db`)
   - Click "Create" or "Add Database"

## Step 3: Create Database User

1. In the same MySQL Databases section, find "MySQL Users"
2. Create a new user:
   - **Username**: Choose a username (e.g., `webpot_user`)
   - **Password**: Create a strong password (save this for later)
   - Click "Create User" or "Add User"

## Step 4: Grant User Permissions

1. Find the "Add User to Database" section
2. Select your database from the dropdown
3. Select your user from the dropdown
4. Click "Add"
5. Grant "All Privileges" to the user
6. Click "Make Changes"

## Step 5: Create Required Tables

After creating the database, you need to create the necessary tables. You can do this in two ways:

### Option A: Using phpMyAdmin (Recommended)

1. In your control panel, find and click "phpMyAdmin"
2. Select your database from the left sidebar
3. Click on the "SQL" tab at the top
4. Copy and paste the following SQL code:

```sql
-- Create contact_submissions table
CREATE TABLE contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    business VARCHAR(255),
    message TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create order_submissions table
CREATE TABLE order_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    company VARCHAR(255),
    plan VARCHAR(100),
    message TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

5. Click "Go" to execute the SQL

### Option B: Using Command Line (Advanced)

If you have SSH access, you can run:

```bash
mysql -u your_username -p your_database_name < database_tables.sql
```

## Step 6: Update config.php

1. Open the `config.php` file in your project
2. Replace the placeholder values with your actual database credentials:

```php
$servername = "localhost"; // Usually localhost for Hostinger
$username = "your_db_username"; // The username you created
$password = "your_db_password"; // The password you created
$dbname = "your_database_name"; // The database name you created
```

## Step 7: Upload Files to Hostinger

1. Upload all your website files to the `public_html` directory (or your domain's root directory)
2. Make sure the PHP files have proper permissions (usually 644 for files, 755 for directories)

## Step 8: Test the Setup

1. Visit your website
2. Try submitting both the contact form and order form
3. Check if data is being saved to your database via phpMyAdmin

## Troubleshooting

### Common Issues:

1. **Connection Failed**: Double-check your database credentials in `config.php`
2. **Access Denied**: Make sure the database user has proper permissions
3. **Table Doesn't Exist**: Ensure you ran the SQL code to create tables
4. **Email Not Sending**: Check your hosting provider's email settings

### Error Logs:

- Check your hosting control panel for PHP error logs
- You can also add temporary debugging to your PHP files:

```php
// Add this temporarily to debug
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

## Security Notes

1. **Never commit database credentials to version control**
2. **Use strong passwords for database users**
3. **Regularly backup your database**
4. **Keep your PHP and MySQL versions updated**

## Support

If you encounter any issues:
- Check Hostinger's documentation: [https://support.hostinger.com](https://support.hostinger.com)
- Contact Hostinger support
- Review PHP error logs in your hosting control panel

## Database Structure

### contact_submissions table:
- `id` (Primary Key, Auto Increment)
- `name` (VARCHAR 255)
- `email` (VARCHAR 255)
- `phone` (VARCHAR 20)
- `business` (VARCHAR 255, Optional)
- `message` (TEXT)
- `submitted_at` (TIMESTAMP)

### order_submissions table:
- `id` (Primary Key, Auto Increment)
- `name` (VARCHAR 255)
- `email` (VARCHAR 255)
- `phone` (VARCHAR 20)
- `company` (VARCHAR 255, Optional)
- `plan` (VARCHAR 100)
- `message` (TEXT)
- `submitted_at` (TIMESTAMP)
