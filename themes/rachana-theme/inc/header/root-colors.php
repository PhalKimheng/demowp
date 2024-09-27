<?php
$default_colors = [
    'primary' => '#1C4076',
    'body-color' => '#1D2939',
    'body-bg' => '#ffffff',
    'text-color-content' => '#344054',
    'text-color-theme' => '#ffffff',
    'hover-color' => '#f07d03',
];

function register_color_setting($wp_customize, $setting_name, $label, $default_color, $section = 'colors'): void
{
    $wp_customize->add_setting($setting_name, [
        'default' => $default_color,
        'transport' => 'refresh',
    ]);

    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, $setting_name, [
        'label' => __($label, 'rachana-theme'),
        'section' => $section,
        'settings' => $setting_name,
    ]));
}

function hex_to_rgba($hex): array
{
    $hex = ltrim($hex, '#');
    return [
        hexdec(substr($hex, 0, 2)),
        hexdec(substr($hex, 2, 2)),
        hexdec(substr($hex, 4, 2)),
        255
    ];
}

function rgba_to_hex($r, $g, $b): string
{
    return sprintf("#%02x%02x%02x", $r, $g, $b);
}

function transform_color($r, $g, $b, $diff_r, $diff_g, $diff_b): array
{
    return [
        max(0, min($r + $diff_r, 255)),
        max(0, min($g + $diff_g, 255)),
        max(0, min($b + $diff_b, 255))
    ];
}

function generate_custom_css(): string
{
    global $default_colors;

    $colors = [];
    foreach ($default_colors as $setting_name => $default_color) {
        $colors[$setting_name] = get_theme_mod($setting_name, $default_color);
    }

    $primary_color = $colors['primary'];
    list($r, $g, $b) = hex_to_rgba($primary_color);

    $transformations = [
        '100' => transform_color($r, $g, $b, 33, 99, 89),
        '900' => transform_color($r, $g, $b, -28, -30, -16),
        'primary-gray' => transform_color($r, $g, $b, 207, 177, 137)
    ];

    $transformed_colors = [
        '100' => rgba_to_hex(...$transformations['100']),
        '900' => rgba_to_hex(...$transformations['900']),
        'primary-gray' => rgba_to_hex(...$transformations['primary-gray'])
    ];

    $custom_css = '';
    foreach ($colors as $key => $value) {
        $custom_css .= "--cgds-$key: $value !important;\n";
        if ($key === 'primary') {
            $custom_css .= "--cgds-100: {$transformed_colors['100']} !important;\n";
            $custom_css .= "--cgds-900: {$transformed_colors['900']} !important;\n";
            $custom_css .= "--cgds-primary-gray: {$transformed_colors['primary-gray']} !important;\n";
        }
    }

    return $custom_css;
}

add_action('customize_register', function ($wp_customize) use ($default_colors) {
    $color_section_priority = 27;

    $wp_customize->add_section('colors', [
        'title' => __('Colors', 'rachana-theme'),
        'priority' => $color_section_priority,
    ]);

    foreach ($default_colors as $setting_name => $default_color) {
        $label = ucwords(str_replace(['_', '-'], ' ', $setting_name));
        register_color_setting($wp_customize, $setting_name, $label, $default_color);
    }
});
?>
