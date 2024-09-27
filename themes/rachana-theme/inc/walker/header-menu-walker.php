<?php
function menus(): void
{
    $locations = array(
        'mainnav' => 'Main navigation',
        'footernav' => 'Footer menu navigation'
    );
    register_nav_menus($locations);
}

add_action('init', 'menus');
class Main_Nav_Walker  extends Walker_Nav_Menu
{
    public function start_lvl(&$output, $depth = 0, $args = null): void
    {
        $indent = str_repeat("\t", $depth);
        if ($depth === 0) {
            $output .= "\n$indent<ul class=\"dropdown-menu\" aria-labelledby=\"navbarDropdown\">\n";
        } else {
            $output .= "\n$indent<ul class=\"dropdown-menu sub\" aria-labelledby=\"navbarSubDropdown\">\n";
        }
    }
    public function end_lvl(&$output, $depth = 0, $args = null): void
    {
        $indent = str_repeat("\t", $depth);
        $output .= "$indent</ul>\n";
    }

    public function start_el(&$output, $item, $depth = 0, $args = null, $id = 0): void
    {
        $indent = ($depth) ? str_repeat("\t", $depth) : '';

        $classes = empty($item->classes) ? array() : (array)$item->classes;
        $classes[] = 'nav-item';

        if ($args->walker->has_children) {
            $classes[] = 'cgds dropdown';
        }

        $args = apply_filters('nav_menu_item_args', $args, $item, $depth);

        $class_names = join(' nav-item ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args, $depth));
        $class_names = $class_names ? ' class="' . esc_attr($class_names) . '"' : '';

        $active = '';
        if (strpos($class_names, "current-menu-") !== false) {
            $active = 'active';
        }

        $id = apply_filters('nav_menu_item_id', 'menu-item-' . $item->ID, $item, $args, $depth);
        $id = $id ? ' id="' . esc_attr($id) . '"' : '';

        $output .= $indent . '<li' . $id . $class_names . '>';

        $atts = array();
        $atts['title'] = !empty($item->attr_title) ? $item->attr_title : '';
        $atts['target'] = !empty($item->target) ? $item->target : '';
        if ('_blank' === $item->target && empty($item->xfn)) {
            $atts['rel'] = 'noopener noreferrer';
        } else {
            $atts['rel'] = $item->xfn;
        }
        $atts['href'] = !empty($item->url) ? $item->url : '';
        $atts['aria-current'] = $item->current ? 'page' : '';

        $atts = apply_filters('nav_menu_link_attributes', $atts, $item, $args, $depth);

        $attributes = '';
        foreach ($atts as $attr => $value) {
            if (is_scalar($value) && '' !== $value && false !== $value) {
                $value = ('href' === $attr) ? esc_url($value) : esc_attr($value);
                $attributes .= ' ' . $attr . '="' . $value . '"';
            }
        }

        $item_output = $args->before;


        if ($args->walker->has_children) {
            if ($depth === 0) {
                $item_output .= '<a class="nav-link text-nowrap ' . $active . ' cgds dropdown-toggle"' . $attributes . ' id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">';
            } else {
                $item_output .= '<a class="dropdown-item ' . $active . ' dropdown-toggle"' . $attributes . ' id="navbarSubDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">';
            }

            $item_output .= $args->link_before . apply_filters('the_title', $item->title, $item->ID) . $args->link_after;
            $item_output .= ' <i class="bi bi-chevron-down"></i>';
            $item_output .= '</a>';
        } else {
            if ($depth === 0) {
                $item_output .= '<a class="nav-link text-nowrap ' . $active . '"' . $attributes . '>';
            } else {
                $item_output .= '<a class="dropdown-item ' . $active . '"' . $attributes . '>';
            }
            $item_output .= $args->link_before . apply_filters('the_title', $item->title, $item->ID) . $args->link_after;
            $item_output .= '</a>';
        }

        $item_output .= $args->after;

        $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
    }

    public function end_el(&$output, $item, $depth = 0, $args = null): void
    {
        $output .= `</li>\n`;
    }
}

function disable_menu_cache()
{
    add_filter('pre_set_transient_expiration', function ($expiration, $transient) {
        if (strpos($transient, 'nav_menu_item') !== false) {
            $expiration = 0;
        }
        return $expiration;
    }, 10, 2);
}
add_action('init', 'disable_menu_cache');
