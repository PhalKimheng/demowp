<?php
function site_identity($wp_customize): void
{
    $wp_customize->add_setting('show_title', array(
        'default' => true,
        'transport' => 'refresh',
    ));

    $wp_customize->add_control('show_title_control', array(
        'label' => __('Show Title', 'rachana-theme'),
        'section' => 'title_tagline',
        'type' => 'checkbox',
        'settings' => 'show_title',
        'priority' => 1,
    ));
    $wp_customize->add_setting('site_title_eng', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('site_title_eng', array(
        'label' => __('Show Title English', 'rachana-theme'),
        'section' => 'title_tagline',
        'type' => 'text',
    ));
}
add_action('customize_register', 'site_identity');

function theme_support(): void
{
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
}

add_action('after_setup_theme', 'theme_support');
