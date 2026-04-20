<?php
declare(strict_types=1);

/**
 * Delete Customer API
 * Deletes a customer from the database
 */

require_once __DIR__ . '/../auth.php';
require_once __DIR__ . '/../database.php';

header('Content-Type: application/json');

// Check admin authentication
if (!is_admin_logged_in()) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

try {
    $database = Database::getInstance();
    $conn = $database->getConnection();
    
    // Get input data
    $input = json_decode(file_get_contents('php://input'), true);
    $customer_id = isset($input['id']) ? (int)$input['id'] : 0;
    
    if ($customer_id <= 0) {
        echo json_encode(['success' => false, 'message' => 'Invalid customer ID']);
        exit;
    }
    
    // Check if customer exists
    $customer_id_escaped = (int)$customer_id;
    $checkSql = "SELECT id FROM customers WHERE id = $customer_id_escaped";
    $result = $conn->query($checkSql);
    
    if (!$result->fetch_assoc()) {
        echo json_encode(['success' => false, 'message' => 'Customer not found']);
        exit;
    }
    
    // Delete customer
    $deleteSql = "DELETE FROM customers WHERE id = $customer_id_escaped";
    $conn->query($deleteSql);
    
    echo json_encode([
        'success' => true,
        'message' => 'Customer deleted successfully'
    ]);
    
} catch (Exception $e) {
    error_log("Error deleting customer: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Failed to delete customer'
    ]);
}
