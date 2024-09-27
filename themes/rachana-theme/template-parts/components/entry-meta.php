<?php
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

    if (!$full) $string = array_slice($string, 0, 1);
    return $string ? implode(', ', $string) . 'មុន' : 'just now';
}
// Get the post date
$post_date = get_the_date();

// Get the post author
$post_author = get_the_author();
?>

<ul class="meta list-unstyled p-0 mb-1 mb-sm-2 mb-md-3 mb-lg-4">
    <?php
    if ($post_date) :
    ?>
        <li class="list-inline-item post-date">
            <time class="text-muted" title="<?php the_date() ?>" datetime="<?php echo esc_attr(get_the_date(DATE_W3C)) ?>">
                <i class="bi bi-clock"></i>
                <small>
                    <?php
                    try {
                        echo time_elapsed_string(get_the_date('c')) . " ";
                    } catch (Exception $e) {
                        echo 'Recently';
                    }
                    ?>
                </small>

            </time>
        </li>
    <?php
    endif;
    ?>
    <li class="list-inline-item post-view text-muted">
        <i class="bi bi-eye"></i>
        <small> <?php echo get_post_views(get_the_ID()) . " "; ?> </small>
    </li>

    <?php
    if ($post_author) :
    ?>
        <li class="list-inline-item text-muted post-author ">
            <i class="bi bi-person"></i>
            <small> <?php echo $post_author ?></small>
        </li>
    <?php
    endif;
    ?>
</ul>