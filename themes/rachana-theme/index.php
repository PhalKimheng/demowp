<?php
get_header();
?>
<main class="cgds-container">
	<?php
	if (have_posts()) :
		while (have_posts()) :
			the_post();
			$post_type = get_post_type(); // Get the post type
			if ($post_type == 'page') :
				the_content();
			else :
				get_template_part('template-parts/content', 'page');
			endif;


		endwhile;
	else :
		get_template_part('template-parts/content', 'none');
	endif;
	?>
</main>

<?php
get_footer();
?>