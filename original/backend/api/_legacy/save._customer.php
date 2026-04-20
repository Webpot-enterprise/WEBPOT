<?php
declare(strict_types=1);

/**
 * Save Customer Data API
 * Saves additional customer data (plan_type, price_agreed, delivery_date, notes)
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
    
    // Get fields to update
    $plan_type = isset($input['plan_type']) ? trim($input['plan_type']) : null;
    $price_agreed = isset($input['price_agreed']) ? floatval($input['price_agreed']) : null;
    $delivery_date = isset($input['delivery_date']) ? trim($input['delivery_date']) : null;
    $notes = isset($input['notes']) ? trim($input['notes']) : null;
    
    // Build update query
    $updates = [];
    $params = [];
    $types = "";
    
    if ($plan_type !== null) {
        $updates[] = "plan_type = ?";
        $params[] = $plan_type;
        $types .= "s";
    }
    
    if ($price_agreed !== null) {
        $updates[] = "price_agreed = ?";
        $params[] = $price_agreed;
        $types .= "d";
    }
    
    if ($delivery_date !== null) {
        $updates[] = "delivery_date = ?";
        $params[] = $delivery_date;
        $types .= "s";
    }
    
    if ($notes !== null) {
        $updates[] = "notes = ?";
        $params[] = $notes;
        $types .= "s";
    }
    
    if (empty($updates)) {
        echo json_encode(['success' => false, 'message' => 'No fields to update']);
        exit;
    }
    
    // Add customer_id to params
    $params[] = $customer_id;
    $types .= "i";
    
    // Build and execute query
    $sql = "UPDATE customers SET " . implode(", ", $updates) . " WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param($types, ...$params);
    $stmt->execute();
    $stmt->close();
    
    echo json_encode([
        'success' => true,
        'message' => 'Customer data saved successfully'
    ]);
    
} catch (Exception $e) {
    error_log("Error saving customer: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Failed to save customer data'
    ]);
}
