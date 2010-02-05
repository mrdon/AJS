// Tests for forms.js

testAjs.addTest("testAJSinlineHelp", function () {
    return (typeof AJS.inlineHelp != "undefined" && AJS.inlineHelp != null);
});