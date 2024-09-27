jQuery(document).ready(function($) {
    function toggleInputVisibility(checkbox, relatedInputs) {
        if (checkbox.is(':checked')) {
            relatedInputs.show();
        } else {
            relatedInputs.hide();
        }
    }

    $('.customize-control-checkbox input[type="checkbox"]').each(function() {
        var checkbox = $(this);
        var relatedInputs = checkbox.closest('.customize-control').nextUntil('.customize-control-checkbox');
        toggleInputVisibility(checkbox, relatedInputs);
    });

    $('.customize-control-checkbox input[type="checkbox"]').on('change', function() {
        var checkbox = $(this);
        var relatedInputs = checkbox.closest('.customize-control').nextUntil('.customize-control-checkbox');
        toggleInputVisibility(checkbox, relatedInputs);
    });
});
