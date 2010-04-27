// Tests for jquery.progressbar.js

testAjs.addTest("testProgressBarExists", function () {
    return (typeof jQuery.fn.progressBar != "undefined" && jQuery.fn.progressBar != null);
});