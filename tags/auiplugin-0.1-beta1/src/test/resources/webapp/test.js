var testAjs = new AJSTest();

// atlassian.js tests
testAjs.addTest("testAjsExists", function () {
    return (typeof AJS != "undefined" && AJS != null);
});
testAjs.addTest("testConsoleExists", function () {
    return (typeof console != "undefined" && console != null);
});
testAjs.addTest("testAjsIndexOf", function () {
    return AJS.indexOf([0,1,2,3,4], 2) == 2;
});
testAjs.addTest("testAjsIndexOfFromIndex", function () {
    return AJS.indexOf([0,1,2,3,4,2], 2, 3) == 5;
});
testAjs.addTest("testAjsContains", function () {
    return AJS.contains(["foo", "bar", "hello", "world"], "hello");
});
testAjs.addTest("testAjsParams", function () {
    return AJS.params.company == "atlassian";
});
testAjs.addTest("testAjsParamsList", function () {
    var products = AJS.params.products;
    return AJS.contains(products, "confluence");
});

// atlassian-dialog.js tests
testAjs.addTest("testDialog", function () {
    return (typeof AJS.Dialog == "function");
});

// todo - add more tests here

