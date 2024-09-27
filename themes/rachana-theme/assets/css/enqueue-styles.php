<?php
function enqueue_rachana_styles(): void
{
    wp_enqueue_style('kantumry', 'https://fonts.googleapis.com/css2?family=Kantumruy Pro:wght@200;400;600;700&display=swap');
    wp_enqueue_style('bootstra-icons', 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css');
    wp_enqueue_style('cgds', 'https://cdn.jsdelivr.net/npm/@dgtdept/rachana/css/cgds.css');
    wp_enqueue_style('rachana', get_stylesheet_directory_uri() . '/assets/css/styles.css');
}

add_action('wp_enqueue_scripts', 'enqueue_rachana_styles');