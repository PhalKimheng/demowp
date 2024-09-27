<?php
wp_nav_menu(array(
    'menu' => 'footernav',
    'container' => '',
    'theme_location' => 'footernav',
    'items_wrap' => '<ul id="" class="footer-menu-wrapper flex-column flex-lg-row">%3$s</ul>',
    'walker' => new Footer_Nav_Walker()
));
