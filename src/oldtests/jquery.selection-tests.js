// Tests for jquery.selection.js

testAjs.addTest("testSelectionExists", function () {
    return (typeof jQuery.fn.selection != "undefined" && jQuery.fn.selection != null);
});