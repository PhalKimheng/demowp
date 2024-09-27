<?php
/**
 *
 * @param WP_Customize_Manager $wp_customize
 * @param string $section_id
 */

$icons = array(
    'cart' => 'bi bi-cart',
    'github' => 'bi bi-github',
    'notification' => 'bi bi-bell-fill',
    'person' => 'bi bi-person-circle',
);

function register_nav_icons($wp_customize, $section_id): void
{
    global $icons;
    $icons = array(
        'cart' => 'bi bi-cart',
        'github' => 'bi bi-github',
        'notification' => 'bi bi-bell-fill',
    );

    $wp_customize->add_setting('nav_icons_label', array(
        'default'           => 'Navigation Icons',
        'transport'         => 'refresh',
    ));

    $wp_customize->add_control('nav_icons_label', array(
        'label'       => __('', 'rachana-theme'),
        'section'     => $section_id,
        'type'        => 'text',
        'settings'    => 'nav_icons_label',
        'priority'    => 4,
        'input_attrs' => array(
            'style' => 'font-size: 2em; margin-bottom: 10px; margin-top: 20px;',
        ),
    ));

    $priority = 5;
    $order = 1;
    foreach ($icons as $icon => $bs_class) {
        $wp_customize->add_setting("nav_icon_{$icon}", array(
            'default'           => '',
            'transport'         => 'refresh',
        ));

        $wp_customize->add_control("nav_icon_{$icon}", array(
            'label'       => __('Link for ' . ucfirst($icon) . ' icon', 'custom-nav-icons'),
            'section'     => $section_id,
            'type'        => 'url',
            'settings'    => "nav_icon_{$icon}",
            'priority'    => $priority + 1,
            'input_attrs' => array(
                'class' => "link_{$icon}",
            ),
        ));

        $wp_customize->add_setting("show_nav_icon_{$icon}", array(
            'default'           => ( $icon == 'notification'),
            'transport'         => 'refresh',
        ));

        $wp_customize->add_control("show_nav_icon_{$icon}", array(
            'label'       => __('Display ' . $icon . ' Icon', 'custom-nav-icons'),
            'section'     => $section_id,
            'type'        => 'checkbox',
            'settings'    => "show_nav_icon_{$icon}",
            'priority'    => $priority,
            'input_attrs' => array(
                'class' => 'show_nav_icon',
            ),
        ));

        $wp_customize->add_setting("icon_order_{$icon}", array(
            'default'           => $order,
            'transport'         => 'refresh',
            'sanitize_callback' => 'absint',
        ));

        $wp_customize->add_control("icon_order_{$icon}", array(
            'label'       => __('Order ' . $icon . ' Icon', 'custom-nav-icons'),
            'section'     => $section_id,
            'type'        => 'number',
            'settings'    => "icon_order_{$icon}",
            'priority'    => $priority + 2,
            'input_attrs' => array(
                'min'  => 1,
                'max'  => count($icons),
                'id'   => "icon_order_{$icon}",
                'class' => "order_{$icon}",
            ),
        ));

        $priority += 3;
        $order++;
    }
}