<?php
// $pid = get_the_ID();
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('container'); ?>>
    <header class="mb-1 mb-sm-2 mb-md-3 mb-lg-4 mt-3">
        <div class="block-title mb-1 mb-sm-2 ms-0">
            <h2><?php the_title() ?></h2>
        </div>
        <?php get_template_part('template-parts/components/entry-meta'); ?>
    </header>

    <div class="entry-content mb-1 mb-sm-2 mb-md-3 mb-lg-4">
        <?php the_content(); ?>
    </div><!-- .entry-content -->

</article><!-- #post-<?php the_ID(); ?> -->