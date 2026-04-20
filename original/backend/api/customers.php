<?php
declare(strict_types=1);

/**
 * Get All Customers API
 * Returns list of customers with optional filtering by status
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
    
    // Get filter parameter
    $status_filter = $_GET['status'] ?? 'all';
    
    // Build WHERE clause for filtering
    $whereClause = "";
    
    if ($status_filter !== 'all' && in_array($status_filter, ['Ordered', 'Processing', 'Completed'])) {
        $status_escaped = $conn->real_escape_string($status_filter);
        $whereClause = " WHERE order_status = '$status_escaped'";
    }
    
    // Build main query
    $sql = "SELECT id, name, email, phone, business, message, order_status, plan_type, price_agreed, delivery_date, notes, created_at, updated_at FROM customers" . $whereClause . " ORDER BY created_at DESC";
    
    $result = $conn->query($sql);

    
    $customers = [];
    while ($row = $result->fetch_assoc()) {
        // Add computed payment status
        $row['payment_status'] = match($row['order_status']) {
            'Ordered' => 'Unpaid',
            'Processing' => 'Half Paid',
            'Completed' => 'Paid',
            default => 'Unknown'
        };
        $customers[] = $row;
    }
    
    echo json_encode([
        'success' => true,
        'customers' => $customers
    ]);

    
} catch (Exception $e) {
    error_log("Error fetching customers: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Failed to fetch customers'
    ]);
}
