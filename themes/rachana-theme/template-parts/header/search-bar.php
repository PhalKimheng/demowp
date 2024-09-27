<?php ?>
<div class="search-bar d-flex align-items-center mx-auto">
    <form class="h-100 w-100" action="/" method="GET">
        <div class="search-wrapper d-flex ">
            <input value="<?php echo get_search_query() ?>" name="s" type="search"
                aria-label="<?php echo __('SEARCH') ?>" aria-describedby="button-search">
            <button class="bg-transparent" type="submit" id="button-search"><i class="bi bi-search text-dark"
                    target="_blank"></i></button>
        </div>
    </form>
</div>