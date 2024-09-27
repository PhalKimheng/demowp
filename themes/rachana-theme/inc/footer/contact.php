<?php

/**
 *
 * @param WP_Customize_Manager $wp_customize
 * @param string $section_id
 */
function register_contact_info_settings($wp_customize, $section_id)
{
    $wp_customize->add_setting('contact_info_label', array(
        'default' => 'Contact Info',
        'transport' => 'refresh',
    ));

    $wp_customize->add_control('contact_info_label;', array(
        'label' => __('', 'rachana-theme'),
        'section' => $section_id,
        'type' => 'text',
        'settings' => 'contact_info_label',
        'priority' => 5,
        'input_attrs' => array(
            'style' => 'font-size: 2em; margin-bottom: 10px; margin-top: 40px;',
        ),
    ));
    // $wp_customize->add_setting('contact_info_title', array(
    //     'default' => 'ទំនាក់ទំនង',
    //     'transport' => 'refresh',
    // ));
    // $wp_customize->add_control('contact_info_title', array(
    //     'label' => __('Contact Info Section Title', 'rachana-theme'),
    //     'section' => $section_id,
    //     'type' => 'text',
    //     'priority' => 6,
    // ));

    $wp_customize->add_section('contact_info_section', array(
        'title' => __('Contact Information', 'rachana-theme'),
        'description' => __('Provide your contact details for the website footer.', 'rachana-theme'),
        'panel' => $section_id,
        'priority' => 7,
    ));

    $wp_customize->add_setting('web_link', array(
        'default' => '',
        'sanitize_callback' => 'esc_url_raw',
    ));

    $wp_customize->add_control('web_link', array(
        'label' => __('Web Link', 'rachana-theme'),
        'section' => $section_id,
        'type' => 'text',
    ));

    $wp_customize->add_setting('first_phone_label', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('first_phone_label', array(
        'label' => __('First Phone Number', 'rachana-theme'),
        'section' => $section_id,
        'type' => 'text',
    ));

    $wp_customize->add_setting('second_phone_label', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('second_phone_label', array(
        'label' => __('Second Phone Number', 'rachana-theme'),
        'section' => $section_id,
        'type' => 'text',
    ));

    $wp_customize->add_setting('address_label', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('address_label', array(
        'label' => __('Address', 'rachana-theme'),
        'section' => $section_id,
        'type' => 'text',
    ));

    $wp_customize->add_setting('address_link', array(
        'default' => '',
        'sanitize_callback' => 'esc_url_raw',
    ));

    $wp_customize->add_control('address_link', array(
        'label' => __('Adresss Link', 'rachana-theme'),
        'section' => $section_id,
        'type' => 'text',
    ));
}
