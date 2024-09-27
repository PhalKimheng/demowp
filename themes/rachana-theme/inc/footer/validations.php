<?php
add_action('customize_save_validation_before', 'validate_customizer_inputs');
function validate_customizer_inputs($manager) {
    $email_setting_id = 'email_link';
    add_filter("customize_validate_{$email_setting_id}", 'validate_email_input', 10, 2);
    $url_setting_ids = ['facebook_link', 'linkedIn_link', 'telegram_link', 'tiktok_link', 'youtube_link', 'location_link']; // Replace with your actual setting IDs
    foreach ($url_setting_ids as $setting_id) {
        add_filter("customize_validate_{$setting_id}", 'validate_url_input', 10, 2);
    }
    $phone_setting_id = 'phone_label';
    add_filter("customize_validate_{$phone_setting_id}", 'validate_phone_input', 10, 2);
}

function validate_email_input($validity, $value) {
    if (!empty($value) && !filter_var($value, FILTER_VALIDATE_EMAIL)) {
        $validity->add('invalid_email', 'Please enter a valid email address.');
    }
    return $validity;
}

function validate_url_input($validity, $value) {
    if (!empty($value) && !filter_var($value, FILTER_VALIDATE_URL)) {
        $validity->add('invalid_url', 'Please enter a valid URL.');
    }
    return $validity;
}

function validate_phone_input($validity, $value) {
    $phone_regex = "/^(?!.*[a-zA-Z])(\+\d+)?\s*(\(\d+\))?[- \d]*$|^$/";
    if (!empty($value) && !preg_match($phone_regex, $value)) {
        $validity->add('invalid_phone', 'Please enter a valid phone number or leave it blank.');
    }
    return $validity;
}

