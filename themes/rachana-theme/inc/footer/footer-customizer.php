<?php
/**
 * @param WP_Customize_Manager $wp_customize The Customizer object.
 */
function register_footer_settings($wp_customize)
{
    $wp_customize->add_section('footer_section', array(
        'title' => __('Footer', 'rachana-theme'),
        'priority' => 32,
    ));
    $wp_customize->add_setting('menu_label', array(
        'default' => 'First Column',
        'transport' => 'refresh',
    ));
    $wp_customize->add_control('menu_title;', array(
        'label' => __('', 'rachana-theme'),
        'section' => 'footer_section',
        'type' => 'text',
        'settings' => 'menu_label',
        'priority' => 2.5,
        'input_attrs' => array(
            'style' => 'font-size: 2em; margin-bottom: 10px; margin-top: 40px;',
        ),
    ));
    $wp_customize->add_setting('footer_menu_title', array(
        'default' => 'បញ្ជាប់រហ័ស',
        'transport' => 'refresh',
    ));
    $wp_customize->add_control('footer_menu_title', array(
        'label' => __('Menu Title', 'rachana-theme'),
        'section' => 'footer_section',
        'type' => 'text',
        'priority' => 2.6,
    ));
    register_social_media_settings($wp_customize, 'footer_section');
    register_contact_info_settings($wp_customize, 'footer_section');
    register_links_settings($wp_customize, 'footer_section');
    register_logo_settings($wp_customize, 'footer_section', 'footer_logo', 'Footer Logo');
}

add_action('customize_register', 'register_footer_settings');