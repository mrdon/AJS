/*->
#name>Tables
#javascript>IE8 and below (loads conditionally)
#css>Yes
#description> Standards Patterns and Styling for HTML Tables
<-*/
(function() {
    AJS.tables = AJS.tables || {};
    AJS.tables.rowStriping = function () {
        // has to be done this way to restart the count per tbody (matches CSS)
        var tbodys = AJS.$("table.aui-zebra > tbody");
        for (var i=0, ii = tbodys.length; i < ii; i++) {
            AJS.$(tbodys[i]).find('> tr').filter(':odd').addClass("aui-zebra");
        };
    };
    AJS.$(AJS.tables.rowStriping);
})();
