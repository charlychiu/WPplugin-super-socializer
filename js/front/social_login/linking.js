function theChampUnlink(e, t) {
    jQuery(e).after('<img id="the_champ_loading_image" src="' + theChampLoadingImgPath + '" />');
    jQuery(e).remove();
    jQuery.ajax({
        type: "POST",
        dataType: "json",
        url: theChampAjaxUrl,
        data: {action: "the_champ_unlink", provider: t},
        success: function (e, t, n) {
            if (e.status == 1) {
                location.href = theChampLinkingRedirection
            }
        }
    })
}