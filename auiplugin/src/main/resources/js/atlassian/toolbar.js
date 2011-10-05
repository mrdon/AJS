AJS.setUpToolbars = function () {
    if (jQuery.browser.msie) {
        
        var toolbarGroups = jQuery(".aui-toolbar .toolbar-group");
       
        // Fix left,right borders on first, last toolbar items
        toolbarGroups.each(function (i, group) {
            jQuery(group).children(":first").addClass("first");
            jQuery(group).children(":last").addClass("last");
        });

        // IE7 spoon feeding zone.
        if (parseInt(jQuery.browser.version, 10) == 7) {

            // Add a class so we can style button containers
            function markItemsWithButtons () {
                jQuery(".aui-toolbar button").closest(".toolbar-item").addClass("contains-button");
            };
  
            // force right toolbar to new row when it will fit without wrapping
            function forceRightSplitToRow() {
                jQuery(".aui-toolbar .toolbar-split-right").each(function(i, right) {
    
                    var splitRight = jQuery(right),
                        splitToolbar = splitRight.closest(".aui-toolbar"),
                        splitLeft = splitToolbar.find(".toolbar-split-left"),
                        leftWidth = splitToolbar.data("leftWidth"),
                        rightWidth = splitToolbar.data("rightWidth");
   
                    if(!leftWidth) {
                        leftWidth = splitLeft.outerWidth();
                        splitToolbar.data("leftWidth", leftWidth);
                    }
                    if (!rightWidth) {
                        rightWidth = 0;
                        jQuery(".toolbar-item", right).each(function (i, item) {
                            rightWidth += jQuery(item).outerWidth();
                        });
                        splitToolbar.data("rightWidth", rightWidth);
                    }
                    var toolbarWidth = splitToolbar.width(),
                        spaceAvailable = toolbarWidth - leftWidth;
    
                    if ( toolbarWidth > rightWidth && rightWidth > spaceAvailable ) {
                        splitLeft.addClass("force-split");
                    } else {
                        splitLeft.removeClass("force-split");
                    }
                });
            };

            // simulate white-space:nowrap because IE7 is refusing to do it right
            function simulateNowrapOnGroups () {
                toolbarGroups.each(function (i, group) {
                    var groupWidth = 0;
                    jQuery(group).children(".toolbar-item").each(function (i, items) {
                        groupWidth += jQuery(this).outerWidth();
                    });
                    jQuery(this).width(groupWidth);
                });
            };

            // IE7 inits
            simulateNowrapOnGroups();
            markItemsWithButtons();
            
            // fire forceRightSplitToRow after reload
            var TO = false;
            jQuery(window).resize(function(){
                if(TO !== false)
                    clearTimeout(TO);
                    TO = setTimeout(forceRightSplitToRow, 200);
            });
        }
    }
};

AJS.toInit(function() {
    AJS.setUpToolbars();    
});