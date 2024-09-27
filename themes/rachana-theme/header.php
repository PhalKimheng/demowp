<?php

/**
 * Contains the header
 */
require_once('inc/header/root-colors.php');
$custom_css = generate_custom_css();
$header_layout = get_theme_mod('header_layout');
?>
<!DOCTYPE html>
<html lang="en">
<?php wp_head(); ?>

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <meta name="description" content="" />
  <meta name="author" content="" />
  <title>
    <?php bloginfo('name'); ?> | <?php is_front_page() ? bloginfo('description') : wp_title(''); ?>
  </title>

  <style>
    <?php
    $stylesheet = file_get_contents(get_stylesheet_directory() . '/style.css');
    echo $stylesheet;
    echo ":root {\n";
    echo $custom_css;
    echo "}\n";
    ?>
  </style>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"></script>
</head>

<body id="page-top">
  <?php if (has_nav_menu('mainnav')) { ?>
    <div class="cgds navbar navbar-expand-lg sticky-top-header">
      <header class="container header-padding" style="margin-bottom: -1px; border-bottom: 2px solid var(--cgds-900) !important;">
        <div class="w-100 d-flex header-width">
          <div class="w-100 d-flex">
            <div class="logo-title">
              <!--LOGO-->
              <?php
              require_once('template-parts/logo.php');
              display_logo('header');
              ?>
              <!--TITLE-->
              <div class="site-title-wrap">
                <?php
                $show_title = get_theme_mod('show_title', true);
                if ($show_title) {
                  $site_title = html_entity_decode(get_bloginfo('name'), ENT_QUOTES, 'UTF-8');
                  echo '<h2 class="site-title">' . $site_title . '</h2>';

                  if (get_theme_mod('site_title_eng')) {
                    echo '<h3 class="site-title">' . esc_html(get_theme_mod('site_title_eng')) . '</h3>';
                  }
                }
                ?>
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <div class="d-none d-lg-block">
              <?php
              include get_template_directory() . '/template-parts/header/search-bar.php';
              ?>
            </div>
            <?php if (function_exists('pll_the_languages')): ?>
              <span class="d-none d-lg-block border-right divider" style="height: 24px;"></span>
              <div class="d-none d-lg-block dropdown dropdown-language color-gray-600">
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
            <div class="mobile-toggle d-flex align-items-center mt-2 d-lg-none">
              <button class="navbar-toggler px-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <i class="bi bi-list h1"></i>
              </button>
            </div>
          </div>
        </div>
      </header>
      <div class="w-100 px-4 d-lg-none">
        <?php include('template-parts/navigation/header-menu.php'); ?>
      </div>
    </div>
    <!--NAVIGATION BAR-->
    <div class="sticky-top-nav d-none d-lg-block">
      <nav class="cgds navbar navbar-expand-lg" style="min-height: 50px;">
        <div class="w-100 header-width">
          <?php include('template-parts/navigation/header-menu.php'); ?>
        </div>
      </nav>
    </div>
  <?php } ?>

  <?php wp_head(); ?>