<div class="collapse navbar-collapse" id="navbarNav">
  <?php
  wp_nav_menu(
    array(
      'menu' => 'mainnav',
      'container' => '',
      'theme_location' => 'mainnav',
      'items_wrap' => '<ul id="" class="navbar-nav">%3$s</ul>',
      'walker' => new Main_Nav_Walker()
    )
  );
  ?>
  <div class="d-lg-none d-flex justify-space-between align-items-center">
    <?php
    include get_template_directory() . '/template-parts/header/search-bar.php';
    ?>
    <?php if (function_exists('pll_the_languages')): ?>
      <div class="d-lg-none d-flex dropdown dropdown-language color-gray-600 mx-2">
        <?php
        $args = [
          'hide_if_empty' => 0,
          'raw' => 1
        ];
        ?>
        <?php foreach (pll_the_languages($args) as $key => $value): ?>
          <?php if (pll_current_language() === $value['slug']): ?>
            <div class="dropdown-active d-flex border rounded" id="dropdownLanguage" data-bs-toggle="dropdown"
              aria-expanded="false">
              <figure class="mb-0 text-center me-1 d-flex align-items-center gap-2">
                <img class="mb-0"
                  src="<?php echo get_stylesheet_directory_uri() ?>/assets/images/icons/<?php echo $value['slug'] ?>.png"
                  width="auto" height="29px" alt="<?php echo $value['name'] ?>">
                <figcaption class="text-white"><?php echo $value['name'] ?></figcaption>
              </figure>
            </div>
          <?php endif ?>
        <?php endforeach ?>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownLanguage">
          <?php foreach (pll_the_languages($args) as $key => $value): ?>
            <?php if (pll_current_language() != $value['slug']): ?>
              <li>
                <a class="dropdown-item" href="<?php echo $value['url'] ?>">
                  <figure class="mb-0 d-flex align-items-center">
                    <img class="me-1 lh-1" height="29"
                      src="<?php echo get_stylesheet_directory_uri() ?>/assets/images/icons/<?php echo $value['slug'] ?>.png"
                      alt="<?php echo $value['name'] ?>">
                    <figcaption><?php echo $value['name'] ?></figcaption>
                  </figure>
                </a>
              </li>
            <?php endif ?>
          <?php endforeach ?>
        </ul>
      </div>
    <?php endif ?>
  </div>

</div>