AJS.toInit(function($) {
    if ($.browser.msie) {
        // Fix left,right borders on first, last toolbar items
        $(".aui-toolbar .toolbar-group").each(function (i, group) {
            $(group).children(":first").addClass("first");
            $(group).children(":last").addClass("last");
        });
    }    
});
