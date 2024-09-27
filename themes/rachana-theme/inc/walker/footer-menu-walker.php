<?php
class Footer_Nav_Walker extends Walker_Nav_Menu
{
    // protected $tree_type = ARRAY_A;
    // protected $db_fields = array('parent' => 'menu_id', 'id' => 'menu_item_id');

    public function start_lvl(&$output, $depth = 0, $args = null)
    {
        $indent = str_repeat("\t", $depth);
        $output .= "\n$indent<ul class=\"submenu-container\">\n";
    }

    public function end_lvl(&$output, $depth = 0, $args = null)
    {
        $indent = str_repeat("\t", $depth);
        $output .= "$indent</ul>\n";
    }
    public function start_el(&$output, $item, $depth = 0, $args = null, $id = 0)
    {
        $indent = ($depth) ? str_repeat("\t", $depth) : '';

        $classes = empty($item->classes) ? array() : (array) $item->classes;
        // $classes[] = 'menu-item-' . $item->ID;

        if ($depth == 0) {
            $classes[] = 'menu-title';
        } else {
            $classes[] = 'submenu-item';
        }

        // $args = apply_filters('nav_menu_item_args', $args, $item, $depth);

        $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args, $depth));
        $class_names = $class_names ? ' class="' . esc_attr($class_names) . '"' : '';

        // $id = apply_filters('nav_menu_item_id', 'menu-item-' . $item->ID, $item, $args, $depth);
        // $id = $id ? ' id="' . esc_attr($id) . '"' : '';

        $output .= $indent . '<li' . $class_names . '>';

        $atts = array();

        if (!$args->walker->has_children) {
            $atts['title'] = !empty($item->attr_title) ? $item->attr_title : '';
            $atts['target'] = !empty($item->target) ? $item->target : '';
            if ('_blank' === $item->target && empty($item->xfn)) {
                $atts['rel'] = 'noopener noreferrer';
            } else {
                $atts['rel'] = $item->xfn;
            }
            $atts['href'] = !empty($item->url) ? $item->url : '';
        }


        $atts = apply_filters('nav_menu_link_attributes', $atts, $item, $args, $depth);

        $attributes = '';
        foreach ($atts as $attr => $value) {
            if (is_scalar($value) && '' !== $value && false !== $value) {
                $value       = ('href' === $attr) ? esc_url($value) : esc_attr($value);
                $attributes .= ' ' . $attr . '="' . $value . '"';
            }
        }

        $item_output = $args->before;
        $item_output .= '<a' . $attributes . '>';
        $item_output .= $args->link_before . apply_filters('the_title', $item->title, $item->ID) . $args->link_after;
        $item_output .= '</a>';
        $item_output .= $args->after;

        $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
    }

    /**
     * Ends the element output.
     */
    public function end_el(&$output, $item, $depth = 0, $args = null)
    {
        $output .= "</li>\n";
    }

    /**
     * Renders the HTML for a single menu item.
     */
    public function render_menu_item($item, $depth = 0, $args = null)
    {
        $output = '';
        $this->start_el($output, $item, $depth, $args);
        $this->end_el($output, $item, $depth, $args);
        return $output;
    }

    function render_footer_menu($menu_name)
    {
        $menu_items = wp_get_nav_menu_items($menu_name);
        $output = '';

        if (!empty($menu_items)) {
            $nav_menu_args = array(
                'menu'        => null,
                'container'   => '',
                'items_wrap'  => '%3$s',
                'item_spacing' => 'discard',
                'walker'      => new Footer_Nav_Walker(),
            );
            $title = get_option('footer_menu_title');

            $output .= '<ul class="links">';

            foreach ($menu_items as $item) {
                $output .= $this->render_menu_item($item, 0, $nav_menu_args);
            }
        }

        return $output;
    }
}
function register_footer_menu()
{
    $menu_title = get_option('footer_menu_title');

    register_nav_menu('footer-menu', __($menu_title, 'rachana-theme'));
}
add_action('after_setup_theme', 'register_footer_menu');
