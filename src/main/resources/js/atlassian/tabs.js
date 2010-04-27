(function (){
    AJS.Tabs = AJS.Tabs || {};

    var $tabs,
        $tabMenu;

    AJS.Tabs = {
        setup: function () {
            $tabs = AJS.$("div.aui-tabs");
            for (var i=0, ii = $tabs.length; i < ii; i++) {
                $tabMenu = AJS.$("ul.tabs", $tabs[i]);

                // Set up click event for tabs
                AJS.$("a", $tabMenu).click(function (e) {
                    AJS.Tabs.change(AJS.$(this).attr("href"), e);
                });

            };
        },
        change: function (pane, e) {
            AJS.$(pane.match(/#.*/)[0]).addClass("active-pane")
                       .siblings()
                       .removeClass("active-pane");

            AJS.$("a[href=" + pane + "]").parent("li")
                                     .addClass("active-tab")
                                     .siblings()
                                     .removeClass("active-tab");
            e && e.preventDefault();
        }
    };
    AJS.$(AJS.Tabs.setup);
})();
