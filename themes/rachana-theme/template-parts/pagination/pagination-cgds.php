<?php
global $query, $paged;

$pagination_args = array(
	'prev_text' => '<i class="bi bi-chevron-left"></i>',
	'next_text' => '<i class="bi bi-chevron-right"></i>',
	'mid_size' => 2,
	'end_size' => 1,
	'total' => $query->max_num_pages,
	'current' => $paged,
	'type' => 'array',
);

$pagination = paginate_links($pagination_args);

if ($pagination) : ?>
    <nav class="d-flex justify-content-center">
        <ul class="pagination">
			<?php foreach ($pagination as $page) : ?>
                <li class="page-item<?php echo strpos($page, 'current') !== false ? ' active' : ''; ?>">
					<?php echo str_replace('page-numbers', 'page-link', $page); ?>
                </li>
			<?php endforeach; ?>
        </ul>
    </nav>
<?php endif; ?>