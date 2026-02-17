<?php
declare(strict_types=1);

/**
 * Admin Authentication Handler
 * Handles admin login, logout, and session validation
 */

require __DIR__ . '/config.php';
require __DIR__ . '/database.php';

session_start();

/**
 * Admin login function
 */
function admin_login(string $username, string $password): array {
    $config = require __DIR__ . '/config.php';
    
    $result = [
        'success' => false,
        'message' => ''
    ];
    
    // Check hardcoded credentials
    if ($username === $config['admin']['username'] && $password === $config['admin']['password']) {
        // Store session data
        $_SESSION['admin_id'] = 1;
        $_SESSION['admin_username'] = $username;
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['login_time'] = time();
        
        $result['success'] = true;
        $result['message'] = 'Login successful';

    } else {
        $result['message'] = 'Invalid username or password';
    }
    
    return $result;
}

/**
 * Check if admin is logged in
 */
function is_admin_logged_in(): bool {
    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        return false;
    }
    
    // Check session timeout (24 hours)
    if (isset($_SESSION['login_time']) && (time() - $_SESSION['login_time']) > 86400) {
        admin_logout();
        return false;
    }
    
    return true;
}

/**
 * Require admin login - redirect if not logged in
 */
function require_admin_login(): void {
    if (!is_admin_logged_in()) {
        header('Location: ../dashbaord_admin/login.html');
        exit;
    }
}

/**
 * Admin logout function
 */
function admin_logout(): void {
    // Clear session data
    $_SESSION = [];
    
    // Destroy session
    if (session_status() === PHP_SESSION_ACTIVE) {
        session_destroy();
    }
}

/**
 * Get current admin info
 */
function get_current_admin(): ?array {
    if (!is_admin_logged_in()) {
        return null;
    }
    
    return [
        'id' => $_SESSION['admin_id'] ?? 0,
        'username' => $_SESSION['admin_username'] ?? '',
        'login_time' => $_SESSION['login_time'] ?? 0
    ];
}

// Handle API requests
if (isset($_GET['action'])) {
    header('Content-Type: application/json');
    
    $action = $_GET['action'];
    
    switch ($action) {
        case 'login':
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $input = json_decode(file_get_contents('php://input'), true);
                $username = $input['username'] ?? '';
                $password = $input['password'] ?? '';
                
                $result = admin_login($username, $password);
                echo json_encode($result);
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid request method']);
            }
            break;
            
        case 'logout':
            admin_logout();
            echo json_encode(['success' => true, 'message' => 'Logged out successfully']);
            break;
            
        case 'check':
            echo json_encode([
                'logged_in' => is_admin_logged_in(),
                'admin' => get_current_admin()
            ]);
            break;
            
        default:
            echo json_encode(['success' => false, 'message' => 'Unknown action']);
    }
    
    exit;
}
