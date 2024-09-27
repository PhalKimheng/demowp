<?php
/**
 *
 * @param string $location
 */
function display_logo($location) {
    if (function_exists('the_custom_logo')) {
        $custom_logo_id = get_theme_mod($location . '_logo');
        $logo = wp_get_attachment_image_src($custom_logo_id);

        $logo_width = get_theme_mod($location . '_logo_width', 110);

        if (is_array($logo) && !empty($logo)) {
            echo '<a class="navbar-brand d-flex" href="' . esc_url(home_url('/')) . '">';
            echo '<img class="img-fluid" src="' . esc_url($logo[0]) . '" style="width: ' . $logo_width . 'px">';
            echo '</a>';
        } else {
            echo '<div class="navbar-brand logo">';
            echo '<img src="'. esc_url($logo[0]) .'" style="width: ' . $logo_width . 'px" alt="logo">';
            echo '</div>';
        }
    }
}