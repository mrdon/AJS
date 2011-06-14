module("AJS Infrastructure Tests");

test("Check jQuery has loaded", function() {
    var jQueryIsDefined = (typeof jQuery == 'undefined') ? false : true;
    ok(jQueryIsDefined, " AUI is toast without jQuery. ");        
});

test("Check Raphael has loaded", function() {
    var RaphaelIsDefined = (typeof Raphael == 'undefined') ? false : true;
    ok(RaphaelIsDefined, " Raphael should load by default. ");        
});

test("Check AJS.$.os has loaded", function() {
    var jQueryOsIsDefined = (typeof AJS.$.os == 'undefined') ? false : true;
    ok(jQueryOsIsDefined, " jquery.os.js should load by default. ");        
});

/**
 * Note: underscore shouldn't be loaded by default.
 * underscore will be required by certain paths: see FuncTestServlet.java
 * Remember failure is success for this test...
 */
test("Check Underscore resource has not loaded", function() {
    var underscoreIsUndefined = (typeof _ == 'undefined') ? true : false;
    ok(underscoreIsUndefined, " Underscore should NOT be loaded by default. ");        
});