module("Tables Unit Tests");

if (jQuery.browser.msie && jQuery.browser.version < "9") {
       test("Tables IE8 and below Test", function() {
              ok(typeof AJS.tables=="object", "Tables object should exist");
              ok(typeof AJS.tables.rowStriping=="function", "Tables.rowStriping function should exist");
       });
} else {
       test("Tables !IE8 and below Test", function() {
              //ok(typeof AJS.tables=="undefined", "Tables JS should not have loaded");
       });
}
