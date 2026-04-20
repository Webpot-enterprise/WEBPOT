<?php
declare(strict_types=1);

function escape_html(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function render_admin_email(array $data, string $siteName): string
{
    $safeSiteName = escape_html($siteName);
    $submittedAt = escape_html((new DateTime('now'))->format('d M Y, h:i A'));

    return <<<HTML
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Request</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;color:#0f172a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
          <tr>
            <td style="background:#0f172a;color:#ffffff;padding:20px 24px;">
              <h1 style="margin:0;font-size:22px;font-weight:700;">{$safeSiteName} Contact Form</h1>
              <p style="margin:6px 0 0;font-size:14px;opacity:0.9;">A new message was submitted from your website.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-weight:600;width:180px;">Name</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;">{$data['name']}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-weight:600;">Email</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;">{$data['email']}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-weight:600;">Phone</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;">{$data['phone']}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-weight:600;">Business / Brand</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;">{$data['business']}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-weight:600;">Submitted At</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;">{$submittedAt}</td>
                </tr>
              </table>
              <div style="margin-top:18px;">
                <p style="margin:0 0 8px;font-weight:600;">Message</p>
                <div style="padding:14px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;white-space:pre-wrap;line-height:1.5;">{$data['message']}</div>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;
}

function render_user_confirmation_email(string $name, string $siteName): string
{
    $safeName = escape_html($name);
    $safeSiteName = escape_html($siteName);

    return <<<HTML
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Message Received</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;color:#0f172a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
          <tr>
            <td style="background:#0f766e;color:#ffffff;padding:20px 24px;">
              <h1 style="margin:0;font-size:22px;font-weight:700;">Thank you for contacting {$safeSiteName}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;line-height:1.65;">
              <p style="margin:0 0 10px;">Hi {$safeName},</p>
              <p style="margin:0 0 10px;">Message successfully received by Webpot. We'll contact you soon!</p>
              <p style="margin:0 0 10px;">If you need urgent assistance, email us at <a href="mailto:info@webpot.co.in" style="color:#0f766e;text-decoration:none;font-weight:600;">info@webpot.co.in</a>.</p>
              <p style="margin:14px 0 0;">Regards,<br>{$safeSiteName} Team</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;
}

/**
 * Render status change email to customer
 */
function render_status_change_email(string $name, string $email, string $oldStatus, string $newStatus, string $siteName): string
{
    $safeName = escape_html($name);
    $safeSiteName = escape_html($siteName);
    $safeEmail = escape_html($email);
    
    // Determine status color and message
    $statusColors = [
        'Ordered' => '#f59e0b',
        'Processing' => '#3b82f6',
        'Completed' => '#10b981'
    ];
    
    $statusColor = $statusColors[$newStatus] ?? '#6b7280';
    
    $statusMessages = [
        'Ordered' => 'We have received your order and it is now in our queue.',
        'Processing' => 'We are currently working on your website.',
        'Completed' => 'Your website is ready! We will share the details soon.'
    ];
    
    $statusMessage = $statusMessages[$newStatus] ?? 'Your order status has been updated.';
    
    return <<<HTML
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Status Update - {$safeSiteName}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;color:#0f172a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
          <tr>
            <td style="background:{$statusColor};color:#ffffff;padding:20px 24px;">
              <h1 style="margin:0;font-size:22px;font-weight:700;">Order Status Updated</h1>
              <p style="margin:6px 0 0;font-size:14px;opacity:0.9;">Your order status has been changed</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;line-height:1.65;">
              <p style="margin:0 0 10px;">Hi {$safeName},</p>
              <p style="margin:0 0 10px;">{$statusMessage}</p>
              
              <div style="margin:20px 0;padding:16px;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;">
                <p style="margin:0 0 8px;font-size:14px;color:#64748b;">Order Status</p>
                <p style="margin:0;font-size:24px;font-weight:700;color:{$statusColor};">{$newStatus}</p>
              </div>
              
              <p style="margin:0 0 10px;">If you have any questions, feel free to contact us.</p>
              <p style="margin:14px 0 0;">Regards,<br>{$safeSiteName} Team</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;
}

/**
 * Render admin notification email for status change
 */
function render_admin_status_notification(string $customerName, string $customerEmail, string $oldStatus, string $newStatus, string $siteName): string
{
    $safeSiteName = escape_html($siteName);
    $safeCustomerName = escape_html($customerName);
    $safeCustomerEmail = escape_html($customerEmail);
    
    return <<<HTML
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Status Changed - {$safeSiteName}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;color:#0f172a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
          <tr>
            <td style="background:#0f172a;color:#ffffff;padding:20px 24px;">
              <h1 style="margin:0;font-size:22px;font-weight:700;">Order Status Changed</h1>
              <p style="margin:6px 0 0;font-size:14px;opacity:0.9;">A customer order status has been updated</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-weight:600;width:140px;">Customer</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;">{$safeCustomerName}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-weight:600;">Email</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;">{$safeCustomerEmail}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-weight:600;">Old Status</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;">{$oldStatus}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-weight:600;">New Status</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-weight:700;">{$newStatus}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-weight:600;">Changed At</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;">{$safeSiteName}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;
}
