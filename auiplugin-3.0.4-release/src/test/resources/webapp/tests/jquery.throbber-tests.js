// Tests for jquery.throbber.js

testAjs.addTest("testThrobberExists", function () {
    return (typeof jQuery.fn.throbber != "undefined" && jQuery.fn.throbber != null);
});