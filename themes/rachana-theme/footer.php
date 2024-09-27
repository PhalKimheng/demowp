<?php wp_footer(); ?>
<footer class="cgds footer">
    <section class="footer-contact-info">
        <?php include 'template-parts/footer/contacts.php' ?>
    </section>
    <section class="footer-container">
        <div class="footer-top">
            <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-6 logo-container">
                    <div class="widget flex-column">
                        <?php
                        require_once ('template-parts/logo.php');
                        display_logo('footer');
                        ?>
                        <div class="site-title-wrap text-center">
                            <?php
                            $site_title = html_entity_decode(get_bloginfo('name'), ENT_QUOTES, 'UTF-8');
                            if ($site_title) {
                                echo '<h3 class="site-title">' . $site_title . '</h3>';
                                if (get_theme_mod('site_title_eng')) {
                                    echo '<h3 class="site-title">' . esc_html(get_theme_mod('site_title_eng')) . '</h3>';
                                }
                            }
                            ?>
                        </div>
                        <div class="social-icon">
                            <ul>
                                <?php
                                require_once ('template-parts/footer/social-media.php');
                                render_social_media_links();
                                ?>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col footer-menu-hidden">
                    <?php
                    include 'template-parts/navigation/footer-menu.php';
                    ?>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="row footer-copyrights">
                <div class="d-flex justify-content-lg-start text-start">
                    <?php
                    $site_title = html_entity_decode(get_bloginfo('name'), ENT_QUOTES, 'UTF-8');
                    if ($site_title) {
                        echo 'រក្សាសិទ្ធិគ្រប់យ៉ាងដោយ៖ ' . $site_title;
                    }

                    if (get_theme_mod('site_title_eng')) {
                        if ($site_title) {
                            echo ' ~ ';
                        }
                        echo '© 2024 Copyright by: ' . esc_html(get_theme_mod('site_title_eng'));
                    }
                    ?>

                </div>
            </div>
        </div>
    </section>
</footer>