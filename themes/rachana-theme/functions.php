<?php
/**
 * Callback function to set the default value of the "show_nav_icon_person" setting
 * based on the selected header layout.
 *
 * @param WP_Customize_Setting $setting The setting object.
 * @return bool The default value for the setting.
 */

//footer functions
include_once get_template_directory() . "/inc/footer/footer-customizer.php";
include_once get_template_directory() . "/inc/footer/other-links.php";
include_once get_template_directory() . "/inc/footer/contact.php";
include_once get_template_directory() . "/inc/footer/social-media.php";
include_once get_template_directory() . "/inc/footer/validations.php";

//header functions
include_once get_template_directory() . "/inc/header/header-customizer.php";
include_once get_template_directory() . "/inc/header/root-colors.php";
include_once get_template_directory() . "/inc/header/header-icons.php";
include_once get_template_directory() . "/inc/header/header-layouts.php";

//enqueue functions
include_once get_template_directory() . '/assets/css/enqueue-styles.php';
require_once get_template_directory() . '/assets/js/enqueue-scripts.php';
require_once get_template_directory() . '/inc/dequeue.php';


//theme support functions
include_once get_template_directory() . '/inc/theme-supports/site-identity.php';

//walker functions
include_once get_template_directory() . '/inc/walker/footer-menu-walker.php';
include_once get_template_directory() . '/inc/walker/header-menu-walker.php';

//logo
include_once get_template_directory() . "/inc/parts/logo.php";
include_once get_template_directory() . "/inc/category-templates/register-category.php";

//utils
include_once get_template_directory() . "/inc/utils/view-counts.php";

add_filter( 'show_admin_bar', '__return_true');