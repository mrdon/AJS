// Tests for inline-dialog.js

testAjs.addTest("testAJSInlineDialogExists", function () {
    return (typeof AJS.InlineDialog != "undefined" && AJS.InlineDialog != null);
});

testAjs.addTest("testInlineDialog", function() {
    var testContainer = AJS.$("#test-container");
    var link = AJS.$("<a>").text("Test Link").appendTo(testContainer);
    var dlg = new AJS.InlineDialog(link, 1, "content.html");
    res = (AJS.$("#inline-dialog-1").length == 1);
    testContainer.empty();
    return res;
});

