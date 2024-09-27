<?php
function render_social_media_links() {
    global $social_media_platforms;

    foreach ($social_media_platforms as $platform_slug => $platform_name) {
        $link = esc_url(get_theme_mod($platform_slug . '_link'));
        if ($link) {
            ?>
            <li>
                <a href="<?php echo $link; ?>">
                    <svg style="width: 28px; height: 28px; fill: currentColor;">
                        <use xlink:href="<?php echo get_template_directory_uri() . "/assets/images/icons/{$platform_name}.svg#icon"; ?>" alt="<?php echo strtolower($platform_name) . '-icon'; ?>">
                    </svg>
                </a>
            </li>
            <?php
        }
    }
}