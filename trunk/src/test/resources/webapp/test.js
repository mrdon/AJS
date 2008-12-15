var testAjs = new AJSTest();

// atlassian.js tests
testAjs.addTest("testAjsExists", function () {
    return (typeof AJS != "undefined" && AJS != null);
});
testAjs.addTest("testConsoleExists", function () {
    return (typeof console != "undefined" && console != null);
});

// atlassian-dialog.js tests
testAjs.addTest("testDialog", function () {
    return (typeof AJS.Dialog == "function");
});

// todo - add more tests here

