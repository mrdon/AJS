AJS.toInit(function($) {
    if ($.browser.msie) {
        // Fix left,right borders on first, last toolbar items
        $(".aui-toolbar .toolbar-group").each(function (i, group) {
            $(".toolbar-item:first-child", group).addClass("first");
            $(".toolbar-item:last-child", group).addClass("last");
        });

        // Fix right split for IE7
        if (parseInt($.browser.version) == 7) {
            var splitRight = $(".aui-toolbar .toolbar-split-right");
            if (splitRight.length) {

                var splitLeft = $(".aui-toolbar .toolbar-split-left");

                splitRight.css({
                    "margin-top": "-" + splitLeft.outerHeight()
                });
                splitLeft.css({
                    "padding-right": splitRight.outerWidth()
                });
            }
        }
    }    
});
