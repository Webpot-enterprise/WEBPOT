<?php
declare(strict_types=1);

/**
 * Update Order Status API
 * Updates customer order status and sends email notification
 */

require_once __DIR__ . '/../auth.php';
require_once __DIR__ . '/../database.php';
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../mail_templates.php';

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
    $config = require __DIR__ . '/../config.php';
    
    // Get input data
    $input = json_decode(file_get_contents('php://input'), true);
    $customer_id = isset($input['id']) ? (int)$input['id'] : 0;
    $new_status = isset($input['status']) ? $input['status'] : '';
    
    // Validate input
    $allowed_statuses = ['Ordered', 'Processing', 'Completed'];
    
    if ($customer_id <= 0) {
        echo json_encode(['success' => false, 'message' => 'Invalid customer ID']);
        exit;
    }
    
    if (!in_array($new_status, $allowed_statuses)) {
        echo json_encode(['success' => false, 'message' => 'Invalid status']);
        exit;
    }
    
    // Get current customer data
    $customer_id_escaped = (int)$customer_id;
    $sql = "SELECT name, email, order_status FROM customers WHERE id = $customer_id_escaped";
    $result = $conn->query($sql);
    
    if (!$row = $result->fetch_assoc()) {
        echo json_encode(['success' => false, 'message' => 'Customer not found']);
        exit;
    }
    
    $old_status = $row['order_status'];
    $customer_name = $row['name'];
    $customer_email = $row['email'];
    
    // Don't update if status is the same
    if ($old_status === $new_status) {
        echo json_encode(['success' => true, 'message' => 'Status unchanged']);
        exit;
    }
    
    // Update status in database
    $new_status_escaped = $conn->real_escape_string($new_status);
    $updateSql = "UPDATE customers SET order_status = '$new_status_escaped' WHERE id = $customer_id_escaped";
    $conn->query($updateSql);
    
    // Send email notification to customer
    $emailSubject = 'Order Status Update | ' . $config['site_name'];
    $emailBody = render_status_change_email($customer_name, $customer_email, $old_status, $new_status, $config['site_name']);
    
    $emailHeaders = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . $config['from_name'] . ' <' . $config['from_email'] . '>',
        'Reply-To: ' . $config['recipient_email'],
        'X-Mailer: PHP/' . phpversion(),
    ];
    
    $emailSent = mail(
        $customer_email,
        $emailSubject,
        $emailBody,
        implode("\r\n", $emailHeaders)
    );
    
    // Log email status
    $emailStatus = $emailSent ? 'sent' : 'failed';
    $emailSubject_escaped = $conn->real_escape_string($emailSubject);
    $customer_email_escaped = $conn->real_escape_string($customer_email);
    $logSql = "INSERT INTO email_logs (customer_id, email_type, subject, sent_to, status) VALUES ($customer_id_escaped, 'status_change', '$emailSubject_escaped', '$customer_email_escaped', '$emailStatus')";
    $conn->query($logSql);
    
    echo json_encode([
        'success' => true,
        'message' => 'Status updated successfully',
        'email_sent' => $emailSent,
        'old_status' => $old_status,
        'new_status' => $new_status
    ]);
    
} catch (Exception $e) {
    error_log("Error updating status: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Failed to update status'
    ]);
}
