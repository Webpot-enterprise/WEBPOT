<?php
declare(strict_types=1);

/**
 * Get Single Customer API
 * Returns details of a specific customer
 */

require_once __DIR__ . '/../auth.php';
require_once __DIR__ . '/../database.php';

header('Content-Type: application/json');

// Check admin authentication
if (!is_admin_logged_in()) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

try {
    $database = Database::getInstance();
    $conn = $database->getConnection();
    
    // Get customer ID
    $customer_id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
    
    if ($customer_id <= 0) {
        echo json_encode(['success' => false, 'message' => 'Invalid customer ID']);
        exit;
    }
    
    $customer_id_escaped = (int)$customer_id;
    $sql = "SELECT id, name, email, phone, business, message, order_status, plan_type, price_agreed, delivery_date, notes, created_at, updated_at FROM customers WHERE id = $customer_id_escaped";
    $result = $conn->query($sql);
    
    if ($row = $result->fetch_assoc()) {
        // Add computed payment status
        $row['payment_status'] = match($row['order_status']) {
            'Ordered' => 'Unpaid',
            'Processing' => 'Half Paid',
            'Completed' => 'Paid',
            default => 'Unknown'
        };
        
        echo json_encode([
            'success' => true,
            'customer' => $row
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Customer not found'
        ]);
    }
    
} catch (Exception $e) {
    error_log("Error fetching customer: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Failed to fetch customer'
    ]);
}
