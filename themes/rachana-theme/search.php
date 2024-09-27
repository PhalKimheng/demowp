<?php
get_header();
?>

<main class="container">
	<header class="mb-1 mb-sm-2 mb-md-3 mb-lg-4 mt-3">
		<div class="block-title mb-1 mb-sm-2">
			<h2><?php printf(esc_html__('Search Results for: %s'), '<span>' . get_search_query() . '</span>'); ?></h2>
		</div>
	</header>
	<?php if (have_posts()) : ?>

	<?php
		/* Start the Loop */
		while (have_posts()) :
			the_post();

			get_template_part('template-parts/content', 'search');

		endwhile;

	else :

		get_template_part('template-parts/content', 'none');

	endif;
	?>

</main><!-- #main -->

<?php
get_footer();
