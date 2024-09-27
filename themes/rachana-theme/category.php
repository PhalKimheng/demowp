<?php
$category = get_queried_object();
$template = get_term_meta($category->term_id, 'category_template', true);

if ($template) {
	$template_file = get_template_directory() . '/templates/category-templates/' . $template . '.php';
	if (file_exists($template_file)) {
		include $template_file;
		exit;
	}
}

get_header();
?>

<?php
if (have_posts()):
	while (have_posts()):
		the_post();
		the_content();
	endwhile;
endif;
?>

<?php get_footer(); ?>