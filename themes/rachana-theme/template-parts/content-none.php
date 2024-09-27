<?php


?>

<section class="no-results not-found">

	<header class="mb-1 mb-sm-2 mb-md-3 mb-lg-4 mt-3">
		<div class="block-title mb-1 mb-sm-2">
			<h2><?php esc_html_e('Nothing Found'); ?></h2>
		</div>
	</header>

	<div class="page-content mb-1 mb-sm-2 mb-md-3 mb-lg-4">
		<?php
		if (is_search()) :
		?>

			<p><?php esc_html_e('Sorry, but nothing matched your search terms. Please try again with some different keywords.'); ?></p>
		<?php

		else :
		?>

			<p><?php esc_html_e('It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.'); ?></p>
		<?php

		endif;
		?>
	</div><!-- .page-content -->
</section><!-- .no-results -->