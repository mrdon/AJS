// Tests for cookie.js

testAjs.addTest("testIsDirtyExists", function () {
    return (typeof jQuery.fn.isDirty != "undefined" && jQuery.fn.isDirty != null);
});