<?php
/**
 *
 * @param WP_Customize_Manager $wp_customize
 * @param string $section_id
 */
function register_header_layout($wp_customize,$section_id)
{
    $wp_customize->add_setting('header_label', array(
        'default' => 'Header Layout',
        'transport' => 'refresh',
    ));
    $wp_customize->add_control('header_label', array(
        'label' => __('', 'rachana-theme'),
        'section' => $section_id,
        'type' => 'text',
        'settings' => 'header_label',
        'priority' => 2,
        'input_attrs' => array(
            'style' => 'font-size: 2em; margin-bottom: 10px; margin-top: 20px;',
        ),
    ));

    $wp_customize->add_setting('header_layout', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('header_layout_control', array(
        'type' => 'select',
        'label' => __('Header Layout', 'rachana-theme'),
        'section' => $section_id,
        'settings' => 'header_layout',
        'choices' => array(
            'layout-1' => __('Header Layout 1', 'rachana-theme'),
            'layout-2' => __('Header Layout 2', 'rachana-theme'),
        ),
        'priority' => 3,
    ));
}
