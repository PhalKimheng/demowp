<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<figure class="row g-2 g-sm-3">
		<div class="col-4 col-sm-4 thumbnail">
			<a href="<?php the_permalink() ?>">
				<div class="ratio ratio-4x3 ratio-sm-4x3 ratio-md-16x9 ratio-lg-16x9 bg-gray-100">
					<div style="background-image: url('<?php the_post_thumbnail_url() ?>');"></div>
				</div>
			</a>
		</div>
		<figcaption class="col figcaption">
			<?php get_template_part('template-parts/components/post-tag'); ?>
			<h5 class="title mb-0 mb-1 mb-sm-1 mb-lg-2 text-break"><a href="<?php the_permalink() ?>"><?php the_title() ?></a></h5>
			<p class="excerpt mb-0 mb-sm-1 mb-lg-2 text-break d-none d-md-block">
				<?php echo mb_strimwidth(get_the_excerpt(), 0, 250, '...') ?>
			</p>
			<?php get_template_part('template-parts/components/entry-meta'); ?>
		</figcaption>
	</figure>
</article><!-- #post-<?php the_ID(); ?> -->