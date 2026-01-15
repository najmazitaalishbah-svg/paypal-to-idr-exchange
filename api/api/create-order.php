<?php
require 'config.php';

header('Content-Type: application/json');

// Ambil data JSON
$data = json_decode(file_get_contents('php://input'), true);

// Validasi amount
if (
    !isset($data['amount']) ||
    !is_numeric($data['amount']) ||
    $data['amount'] <= 0
) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid amount']);
    exit;
}

$baseAmount = (float)$data['amount'];
$fee = ($baseAmount * EXCHANGE_FEE_PERCENT) / 100;
$totalAmount = $baseAmount + $fee;

// Format PayPal
$totalAmount = number_format($totalAmount, 2, '.', '');

$payload = [
    'intent' => 'CAPTURE',
    'purchase_units' => [[
        'amount' => [
            'currency_code' => 'USD',
            'value' => $totalAmount
        ]
    ]]
];

$ch = curl_init(PAYPAL_API_BASE . '/v2/checkout/orders');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_USERPWD => PAYPAL_CLIENT_ID . ':' . PAYPAL_SECRET,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_POSTFIELDS => json_encode($payload)
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($httpCode);
echo $response;
