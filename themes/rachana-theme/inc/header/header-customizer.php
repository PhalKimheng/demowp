<?php
/**
 * @param WP_Customize_Manager $wp_customize
 */
function register_header_settings($wp_customize) {
    $wp_customize->add_section('header_section', array(
        'title' => __('Header', 'rachana-theme'),
        'priority' => 30,
    ));

    register_nav_icons($wp_customize, 'header_section');
    register_header_layout($wp_customize, 'header_section');
    register_logo_settings($wp_customize, 'header_section', 'header_logo', 'Header Logo');
}
add_action('customize_register', 'register_header_settings');
