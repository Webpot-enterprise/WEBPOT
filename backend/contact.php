<?php
declare(strict_types=1);

$config = require __DIR__ . '/config.php';
require __DIR__ . '/mail_templates.php';

function redirect_with_status(string $status): void
{
    $allowedStatuses = ['success', 'partial', 'invalid', 'error'];
    $safeStatus = in_array($status, $allowedStatuses, true) ? $status : 'error';

    header('Location: ../index.html?contact_status=' . $safeStatus . '#contact');
    exit;
}

function clean_text(string $value): string
{
    return trim($value);
}

function clean_single_line(string $value): string
{
    $cleaned = str_replace(["\r", "\n"], ' ', $value);
    return trim($cleaned);
}

function text_length(string $value): int
{
    if (function_exists('mb_strlen')) {
        return mb_strlen($value);
    }

    return strlen($value);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    redirect_with_status('invalid');
}

$honeypot = isset($_POST['website']) ? clean_text((string) $_POST['website']) : '';
if ($honeypot !== '') {
    redirect_with_status('success');
}

$name = isset($_POST['name']) ? clean_single_line((string) $_POST['name']) : '';
$email = isset($_POST['email']) ? clean_single_line((string) $_POST['email']) : '';
$phone = isset($_POST['phone']) ? clean_single_line((string) $_POST['phone']) : '';
$business = isset($_POST['business']) ? clean_single_line((string) $_POST['business']) : '';
$message = isset($_POST['message']) ? clean_text((string) $_POST['message']) : '';

if ($name === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    redirect_with_status('invalid');
}

if (text_length($name) > 120 || text_length($email) > 254 || text_length($phone) > 40 || text_length($business) > 120 || text_length($message) > 4000) {
    redirect_with_status('invalid');
}

$emailData = [
    'name' => escape_html($name),
    'email' => escape_html($email),
    'phone' => escape_html($phone !== '' ? $phone : 'Not provided'),
    'business' => escape_html($business !== '' ? $business : 'Not provided'),
    'message' => escape_html($message !== '' ? $message : 'No project details provided.'),
];

$adminSubject = 'New Contact Form Submission | ' . $config['site_name'];
$adminBody = render_admin_email($emailData, $config['site_name']);

$adminHeaders = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: ' . $config['from_name'] . ' <' . $config['from_email'] . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'X-Mailer: PHP/' . phpversion(),
];

$adminSent = mail(
    $config['recipient_email'],
    $adminSubject,
    $adminBody,
    implode("\r\n", $adminHeaders)
);

if (!$adminSent) {
    redirect_with_status('error');
}

$userSubject = 'We have received your message | ' . $config['site_name'];
$userBody = render_user_confirmation_email($name, $config['site_name']);

$userHeaders = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: ' . $config['from_name'] . ' <' . $config['from_email'] . '>',
    'Reply-To: ' . $config['recipient_email'],
    'X-Mailer: PHP/' . phpversion(),
];

$userSent = mail(
    $email,
    $userSubject,
    $userBody,
    implode("\r\n", $userHeaders)
);

if ($userSent) {
    redirect_with_status('success');
}

redirect_with_status('partial');
