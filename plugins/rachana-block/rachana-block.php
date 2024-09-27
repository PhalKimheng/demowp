<?php
/**
 * Plugin Name: Rachana Block
 * Description: a drag and drop adaptation of Rachana (Cambodia Government Design System)
 * Version: 1.0
 * Author: DiTr - Rachana Team
 * Text Domain: rachana-block
 */

if (!defined('ABSPATH')) {
    exit;
}
function register_layout_category($categories)
{
    $categories[] = array(
        'slug' => 'rachana-block-category',
        'title' => 'Rachana Blocks',
    );
    $categories[] = array(
        'slug' => 'rachana-dynamic',
        'title' => 'Rachana Dynamic Blocks',
    );
    $categories[] = array(
        'slug' => 'rachana-container',
        'title' => 'Rachana Container Blocks',
    );
    return $categories;
}
add_filter('block_categories_all', 'register_layout_category');

function wp_scripts_rachana_wordpress_block_init()
{
    $block_folders = array_filter(glob(__DIR__ . '/build' . '/*'), 'is_dir');
    foreach ($block_folders as $folder) {
        $block_name = basename($folder);
        register_block_type(__DIR__ . '/build/' . $block_name);
    }
}
add_action('init', 'wp_scripts_rachana_wordpress_block_init');

function enqueue_rachana_block_assets()
{
    wp_enqueue_style(
        'rachana-block-style',
        plugins_url('styles.css', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'styles.css')
    );
    wp_enqueue_style('cgds', 'https://cdn.jsdelivr.net/npm/@dgtdept/rachana/css/cgds.css');
    wp_enqueue_style('slick', 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css');
    wp_enqueue_style('slick-theme', 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css');
}
add_action('enqueue_block_assets', 'enqueue_rachana_block_assets');

function enqueue_rachana_block_script()
{
    // Enqueue jQuery
    wp_enqueue_script('jquery');

    // Enqueue Slick Carousel from CDN
    wp_enqueue_script(
        'slick-carousel',
        'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js',
        array('jquery'), // Ensure jQuery is loaded before this script
        null,
        true // Load in footer
    );
    wp_enqueue_script(
        'slick-carousel-script',
        plugins_url('slick-carousel-script.js', __FILE__),
        array('jquery', 'slick-carousel'), // Dependencies
        filemtime(plugin_dir_path(__FILE__) . '/slick-carousel-script.js'), // Correct function to get theme directory
        true // Load in footer
    );
}
add_action('wp_enqueue_scripts', 'enqueue_rachana_block_script');
