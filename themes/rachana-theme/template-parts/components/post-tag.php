<?php

/**
 * @package MPTC_THEME
 */

$term_list = get_the_term_list(get_the_ID(), 'post_tag', '<li class="list-inline-item">', '</li><li class="list-inline-item">', '</li>');
if (!empty($term_list)) :
?>
    <ul class="taxonomies-list list-inline p-0 mb-0 mb-sm-1 mb-lg-2">
        <?php
        echo $term_list;
        ?>
    </ul>
<?php
endif;
