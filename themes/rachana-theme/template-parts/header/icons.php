<?php
function render_nav_icons() {
    global $icons;
    uasort($icons, function($a, $b) {
        global $icons;
        $order_a = get_theme_mod("icon_order_" . array_search($a, $icons), 0);
        $order_b = get_theme_mod("icon_order_" . array_search($b, $icons), 0);
        return $order_a - $order_b;
    });
    ?>
    <ul id="menu-social-menu" class="d-flex">
        <?php
        foreach ($icons as $icon => $bs_class) {
            $link = esc_url(get_theme_mod("nav_icon_{$icon}"));
            $show_icon = get_theme_mod("show_nav_icon_{$icon}", true);
            if ($show_icon) {
                ?>
                <li class="nav-icon-social">
                    <?php if ($link) { ?>
                        <a class="nav-link" aria-current="page" href="<?php echo $link; ?>" target="_blank" >
                            <i class="<?php echo $bs_class; ?> h3 mb-0 mx-2" ></i>
                        </a>
                    <?php } else { ?>
                        <i class="<?php echo $bs_class; ?> h3 mb-0 mx-2"></i>
                    <?php } ?>
                    <?php
                    $header_layout = get_theme_mod( 'header_layout' );
                    if ( $header_layout === 'layout-1' ) : ?>
                        <a class="nav-link" aria-current="page" href="<?php echo $link; ?>" target="_blank" >
                            <i class="bi bi-person-circle h3 mb-0 mx-2" ></i>
                        </a>
                    <?php endif; ?>
                </li>
                <?php
            }
        }
        ?>
    </ul>
    <?php
}