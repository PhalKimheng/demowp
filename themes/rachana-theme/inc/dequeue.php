<?php
function dequeue_scripts(): void
{
    $scripts_to_dequeue = array(
    );

    foreach ($scripts_to_dequeue as $script) {
        wp_dequeue_script($script);
        wp_deregister_script($script);
    }
}
add_action('wp_enqueue_scripts', 'dequeue_scripts', 9999);
function dequeue_styles(): void
{
    $styles_to_dequeue = array(
        'common'
    );

    foreach ($styles_to_dequeue as $style) {
        wp_dequeue_style($style);
        wp_deregister_style($style);
    }
}
add_action('wp_enqueue_scripts', 'dequeue_styles', 9999);