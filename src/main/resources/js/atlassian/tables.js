
(function() {
    AJS.Tables = function () {
        var tables = AJS.$("table.aui");
        for (var i=0, ii = tables.length; i < ii; i++) {
            AJS.$("tbody tr:odd", tables[i]).addClass("odd");
        };
    };
    AJS.$(AJS.Tables);
})();
