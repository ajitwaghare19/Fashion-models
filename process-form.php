<?php
// Form processing for Special Model Management
header('Content-Type: application/json');

// Enable CORS for cross-origin requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get form data
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    $input = $_POST;
}

// Validate required fields
$required_fields = ['name', 'email', 'message'];
$missing_fields = [];

foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        $missing_fields[] = $field;
    }
}

if (!empty($missing_fields)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields: ' . implode(', ', $missing_fields)]);
    exit;
}

// Validate email
if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

// Sanitize inputs
$name = htmlspecialchars(trim($input['name']));
$email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
$subject = isset($input['subject']) ? htmlspecialchars(trim($input['subject'])) : 'Contact Form Submission';
$message = htmlspecialchars(trim($input['message']));
$date = isset($input['date']) ? htmlspecialchars(trim($input['date'])) : '';
$time = isset($input['time']) ? htmlspecialchars(trim($input['time'])) : '';

// Prepare email content
$to = 'marcelina@specialmodelmgmt.com';
$email_subject = 'New ' . $subject . ' from ' . $name;

$email_body = "You have received a new message from the Special Model Management website.\n\n";
$email_body .= "Name: " . $name . "\n";
$email_body .= "Email: " . $email . "\n";
if ($date) $email_body .= "Date: " . $date . "\n";
if ($time) $email_body .= "Time: " . $time . "\n";
$email_body .= "Subject: " . $subject . "\n\n";
$email_body .= "Message:\n" . $message . "\n";

$headers = "From: " . $email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
$mail_sent = mail($to, $email_subject, $email_body, $headers);

if ($mail_sent) {
    // Log the submission
    $log_entry = date('Y-m-d H:i:s') . " - " . $name . " (" . $email . ") - " . $subject . "\n";
    file_put_contents('form-submissions.log', $log_entry, FILE_APPEND | LOCK_EX);
    
    echo json_encode(['success' => true, 'message' => 'Thank you for your message. We will get back to you soon.']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send message. Please try again later.']);
}
?>
