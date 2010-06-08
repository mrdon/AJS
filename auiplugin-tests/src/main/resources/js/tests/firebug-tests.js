// Tests for firebug.js

testAjs.addTest("testAJSwarnAboutFirebugExists", function () {
    return (typeof AJS.warnAboutFirebug != "undefined" && AJS.warnAboutFirebug != null);
});