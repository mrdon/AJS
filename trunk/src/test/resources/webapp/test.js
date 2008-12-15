var testAjs = new AJSTest();

testAjs.addTest("testAjsExists", function () {
    return (typeof AJS != "undefined" && AJS != null);
});
testAjs.addTest("testConsoleExists", function () {
    return (typeof console != "undefined" && console != null);
});

//alert(testAjs[testAjs.getTestNames()[0]]());