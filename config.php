<?php
declare(strict_types=1);

/**
 * Production-safe PDO configuration for Webpot (Hostinger shared hosting).
 *
 * - Set your DB credentials in the constants below.
 * - This file must not output anything (no HTML, no sensitive errors).
 */

// ===== Database credentials (edit these) =====
const DB_HOST = 'localhost';
const DB_NAME = 'u122854996_webpot_db';
const DB_USER = 'YOUR_DB_USERNAME';
const DB_PASS = 'YOUR_DB_PASSWORD';

/**
 * Get a shared PDO instance.
 *
 * - Uses utf8mb4
 * - Enables exceptions
 * - Disables emulated prepares (better type handling + security)
 */
function get_pdo(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];

    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (Throwable $e) {
        // Log details server-side; never echo sensitive errors to the client.
        error_log('[webpot] DB connect failed: ' . $e->getMessage());
        throw new RuntimeException('Database connection failed.');
    }
}

/**
 * Send a JSON response and exit.
 */
function send_json(int $statusCode, array $payload): void
{
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    header('Cache-Control: no-store');

    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}
