<div>
    <ul class="list-unstyled mb-0 d-flex gap-5 justify-content-center flex-column flex-lg-row">


        <?php if (get_theme_mod('web_link')) : ?>
            <li class="d-flex align-items-center">
                <a class="d-flex flex-nowrap align-items-center" target="_blank" href="<?php echo esc_url(get_theme_mod('web_link')); ?>" rel="noopener noreferrer">
                    <i class="bi bi-link d-flex me-2"></i>
                    <div class="text-link lh-1">
                        <span class="js-strip-protocol"><?php echo esc_html(get_theme_mod('web_link')); ?></span>
                    </div>
                </a>
            </li>

        <?php endif; ?>

        <?php if (get_theme_mod('first_phone_label') || get_theme_mod('second_phone_label')) : ?>
            <li class="d-flex align-items-center">
                <div class="d-flex flex-nowrap align-items-center">
                    <i class="bi bi-telephone d-flex me-2"></i>
                    <div class="d-flex gap-2 text-link lh-1">
                        <?php if (get_theme_mod('first_phone_label')) : ?>
                            <span>
                                <?php echo esc_html(get_theme_mod('first_phone_label')); ?>
                            </span>
                        <?php endif; ?>
                        <?php if (get_theme_mod('first_phone_label') && get_theme_mod('second_phone_label')) : ?>
                            <span class="phone-number-divider"></span>
                        <?php endif; ?>
                        <?php if (get_theme_mod('second_phone_label')) : ?>
                            <span>
                                <?php echo esc_html(get_theme_mod('second_phone_label')); ?>
                            </span>
                        <?php endif; ?>
                    </div>
                </div>
            </li>
        <?php endif; ?>
        <?php if (get_theme_mod('address_label') && get_theme_mod('address_link')) : ?>
            <li class="d-flex align-items-center">
                <a class="d-flex flex-nowrap align-items-center" target="_blank" href="<?php echo esc_url(get_theme_mod('address_link')); ?>">
                    <i class="bi bi-geo-alt d-flex me-2"></i>
                    <div class="text-link lh-sm">
                        <?php echo esc_html(get_theme_mod('address_label')); ?>
                    </div>
                </a>
            </li>
        <?php endif; ?>
    </ul>
</div>