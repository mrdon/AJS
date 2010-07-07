AJS.toInit(function($) {
    if ($.browser.msie) {
        // Fix left,right borders on first, last toolbar items
        $(".aui-toolbar .toolbar-group").each(function (i, group) {
            $(group).children(":first").addClass("first");
            $(group).children(":last").addClass("last");
        });

        // Fix right split for IE7
        if (parseInt($.browser.version, 10) == 7) {
            $(".aui-toolbar .toolbar-split-right").each(function(i, right) {
                var splitRight = $(right),
                    splitLeft = splitRight.closest(".aui-toolbar").find(".toolbar-split-left");

                if (splitLeft.length) {
                    splitRight.css({
                        "margin-top": "-" + splitLeft.outerHeight()
                    });
                    splitLeft.css({
                        "padding-right": splitRight.outerWidth()
                    });
                }
            });
        }
    }    
});
