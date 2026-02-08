<?php
declare(strict_types=1);

require_once __DIR__ . '/../config.php';

// Only allow POST requests.
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    send_json(405, ['success' => false, 'error' => 'Method not allowed.']);
}

/**
 * Accept both form-encoded POSTs and JSON POSTs.
 */
$data = $_POST;
if (!is_array($data) || $data === []) {
    $contentType = (string)($_SERVER['CONTENT_TYPE'] ?? $_SERVER['HTTP_CONTENT_TYPE'] ?? '');
    if (stripos($contentType, 'application/json') !== false) {
        $raw = file_get_contents('php://input');
        $decoded = json_decode($raw ?? '', true);
        if (is_array($decoded)) {
            $data = $decoded;
        }
    }
}

$name = trim((string)($data['name'] ?? ''));
$email = trim((string)($data['email'] ?? ''));
$phone = trim((string)($data['phone'] ?? ''));
$business = trim((string)($data['business'] ?? ''));
$message = trim((string)($data['message'] ?? ''));

// Validate required fields.
if ($name === '' || $email === '' || $phone === '') {
    send_json(400, ['success' => false, 'error' => 'Missing required fields: name, email, phone.']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    send_json(400, ['success' => false, 'error' => 'Invalid email address.']);
}

// Optional fields: store NULL when empty.
$businessOrNull = ($business === '') ? null : $business;
$messageOrNull = ($message === '') ? null : $message;

try {
    $pdo = get_pdo();

    // Do NOT change schema; insert only into existing columns.
    $sql = 'INSERT INTO contact_submissions (name, email, phone, business, message)
            VALUES (:name, :email, :phone, :business, :message)';

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':phone' => $phone,
        ':business' => $businessOrNull,
        ':message' => $messageOrNull,
    ]);

    send_json(200, ['success' => true]);
} catch (Throwable $e) {
    // Log details, return a generic error to the client.
    error_log('[webpot] submit_contact failed: ' . $e->getMessage());
    send_json(500, ['success' => false, 'error' => 'Server error. Please try again later.']);
}

