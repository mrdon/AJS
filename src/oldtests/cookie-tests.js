// Tests for cookie.js

testAjs.addTest("testAJSCookieExists", function () {
    return (typeof AJS.Cookie != "undefined" && AJS.Cookie != null);
});