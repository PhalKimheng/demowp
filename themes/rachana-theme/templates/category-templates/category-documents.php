<?php
/**
 * Template Name: Document Template
 */

get_header();

$category = get_queried_object();
$current_cat_id = get_query_var('cat');

function get_first_image_url($post_content): string
{
	preg_match('/<img.+src=[\'"](?P<src>.+?)[\'"].*>/i', $post_content, $image);
	return !empty($image['src']) ? $image['src'] : '';
}

function time_elapsed_string($datetime, $full = false): string
{
	$now = new DateTime;
	$ago = new DateTime($datetime);
	$diff = $now->diff($ago);

	$diff->w = floor($diff->d / 7);
	$diff->d -= $diff->w * 7;

	$string = array(
		'y' => 'ឆ្នាំ',
		'm' => 'ខែ',
		'w' => 'សប្តាហ៍',
		'd' => 'ថ្ងៃ',
		'h' => 'ម៉ោង',
		'i' => 'នាទី',
		's' => 'វិនាទី',
	);
	foreach ($string as $k => &$v) {
		if ($diff->$k) {
			$v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? '' : '');
		} else {
			unset($string[$k]);
		}
	}

	if (!$full)
		$string = array_slice($string, 0, 1);
	return $string ? implode(', ', $string) . 'មុន' : 'just now';
}

$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
$args = array(
	'posts_per_page' => 12,
	'paged' => $paged,
	'cat' => $current_cat_id,
	'orderby' => 'post_date',
	'order' => 'DESC',
	'post_status' => 'publish'
);
$query = new WP_Query($args);
?>
<div class="gray">
	<div class="d-flex justify-content-center news-title-container">
		<h1 class="news-title color-primary"><?php single_cat_title(); ?></h1>
	</div>
	<div class="container-xxl">
		<div class="grid-cols grid-xs-col-1 grid-sm-col-1 grid-md-col-2 grid-lg-col-4 grid-xl-col-4">
			<?php
			if ($query->have_posts()):
				while ($query->have_posts()):
					$query->the_post();
					$image_url = get_first_image_url(get_the_content());
					?>
					<div class="col">
						<div class="size-auto">
							<div class="cgds card base news-page">
								<div class="card-body">
									<div class="author-time">
										<span class="d-flex align-items-center gap-1">
											<i class="bi bi-clock"></i>
											<time class="text-muted">
												<?php
												try {
													echo time_elapsed_string(get_the_date('c')) . " ";
												} catch (Exception $e) {
													echo 'Recently';
												}
												?>
											</time>
										</span>
										<span class="d-flex align-items-center gap-1">
											<i class="bi bi-eye"></i>
											<small
												class="text-muted card-text-muted"><?php echo get_post_views(get_the_ID()) . " "; ?>
											</small>
										</span>
										<span class="d-flex align-items-center gap-1">
											<i class="bi bi-person"></i>
											<small class="text-muted card-text-muted"><?php the_author() . " "; ?></small>
										</span>
									</div>
									<div class="content">
										<p class="stretched-link card-title"><?php the_title(); ?></p>
									</div>
									<div class="route-icon">
										<a class="blog-btn color-100 card-link" href="<?php the_permalink(); ?>" target=""
											rel="noopener noreferrer">
											<i class="bi bi-arrow-right-circle-fill"></i><span>ចុចអានបន្ថែម</span>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<?php
				endwhile; ?>
				<?php
			else:
				echo '<p>No posts found in this category.</p>';
			endif;
			wp_reset_postdata();
			?>
		</div>
		<?php get_template_part('template-parts/pagination/pagination', 'cgds'); ?>
	</div>
</div>
<?php get_footer(); ?>