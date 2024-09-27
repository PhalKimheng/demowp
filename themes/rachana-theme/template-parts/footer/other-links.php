<?php
$links_data = get_theme_mod('links', '');
$links = json_decode($links_data, true);
?>
<div class="col-lg-3 col-md-6 col-sm-6">
    <div class="title h3"><?php echo get_theme_mod('links_title', 'បញ្ជាប់រហ័ស'); ?></div>
    <ul class="links">
        <?php foreach ($links as $link) : ?>
            <li><a href="<?php echo esc_url($link['url']); ?>" target="_blank" rel="noopener noreferrer"><?php echo esc_html($link['label']); ?></a></li>
        <?php endforeach; ?>
    </ul>
</div>
