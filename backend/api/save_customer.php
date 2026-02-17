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
    
    if ($plan_type !== null) {
        $plan_type_escaped = $conn->real_escape_string($plan_type);
        $updates[] = "plan_type = '$plan_type_escaped'";
    }
    
    if ($price_agreed !== null) {
        $price_agreed_escaped = floatval($price_agreed);
        $updates[] = "price_agreed = $price_agreed_escaped";
    }
    
    if ($delivery_date !== null) {
        $delivery_date_escaped = $conn->real_escape_string($delivery_date);
        $updates[] = "delivery_date = '$delivery_date_escaped'";
    }
    
    if ($notes !== null) {
        $notes_escaped = $conn->real_escape_string($notes);
        $updates[] = "notes = '$notes_escaped'";
    }
    
    if (empty($updates)) {
        echo json_encode(['success' => false, 'message' => 'No fields to update']);
        exit;
    }
    
    // Build and execute query
    $customer_id_escaped = (int)$customer_id;
    $sql = "UPDATE customers SET " . implode(", ", $updates) . " WHERE id = $customer_id_escaped";
    $conn->query($sql);
    
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
