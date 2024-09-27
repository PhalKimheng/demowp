<?php
function enqueue_rachana_scripts(): void
{
	wp_enqueue_script('validator', get_stylesheet_directory_uri() . '/assets/js/validators.js', array(), null, true);
    wp_enqueue_script('icons-editors', get_stylesheet_directory_uri() . '/assets/js/icons-editor.js', array(), null, true);
    wp_enqueue_script('header-dropdown', get_stylesheet_directory_uri() . '/assets/js/header-dropdown.js', array(), null, true);
    wp_enqueue_script('jquery-slim', 'https://code.jquery.com/jquery-3.4.1.slim.min.js', array(), null, true);
    wp_enqueue_script('popper', 'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js', array('jquery-slim'), null, true);
    wp_enqueue_script('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@4.1.1/dist/js/bootstrap.min.js', array('jquery-slim', 'popper'), null, true);
}
add_action('wp_enqueue_scripts', 'enqueue_rachana_scripts');
