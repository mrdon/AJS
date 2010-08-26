// Tests for dropdown.js

testAjs.addTest("testAJSdropdownExists", function () {
    return (typeof AJS.dropDown != "undefined" && AJS.dropDown != null);
});