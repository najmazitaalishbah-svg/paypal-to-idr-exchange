<?php
// MODE: sandbox | live
define('PAYPAL_MODE', 'sandbox');

// Sandbox credentials
define('PAYPAL_CLIENT_ID', 'ISI_CLIENT_ID_SANDBOX');
define('PAYPAL_SECRET', 'ISI_SECRET_SANDBOX');

// API Base URL
define('PAYPAL_API_BASE',
    PAYPAL_MODE === 'sandbox'
        ? 'https://api-m.sandbox.paypal.com'
        : 'https://api-m.paypal.com'
);
