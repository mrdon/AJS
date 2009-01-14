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
testAjs.addTest("testDialogPages", function () {
    var dlg = new AJS.Dialog(640, 480);
    dlg.addPanel("Test1", "<p>test #1</p>", "panel1");
    dlg.addButton("btnTest1", function () {alert("test1");}, "button1");
    dlg.show();

    dlg.addPage();

    dlg.addPanel("Test2", "<p>test #2</p>", "panel2");
    dlg.addButton("btnTest2", function () {alert("test2");}, "button2");

    var res = !($(".panel1")[0].offsetHeight + $(".button1")[0].offsetHeight);
    dlg.remove();
    return res;
});
testAjs.addTest("testDialogGotoPage", function () {
    var dlg = new AJS.Dialog(640, 480);
    dlg.addPanel("Test1", "<p>test #1</p>", "panel1");
    dlg.addButton("btnTest1", function () {alert("test1");}, "button1");
    dlg.show();
    
    dlg.addPage();
    
    dlg.addPanel("Test2", "<p>test #2</p>", "panel2");
    dlg.addButton("btnTest2", function () {alert("test2");}, "button2");
    
    dlg.gotoPage(0);

    res = !!($(".panel1")[0].offsetHeight + $(".button1")[0].offsetHeight);
    dlg.remove();
    return res;
    
});
testAjs.addTest("testDialogPrevPage", function () {
    var dlg = new AJS.Dialog(640, 480);
    dlg.addPanel("Test1", "<p>test #1</p>", "panel1");
    dlg.addButton("btnTest1", function () {alert("test1");}, "button1");
    dlg.show();
    
    dlg.addPage();
    
    dlg.addPanel("Test2", "<p>test #2</p>", "panel2");
    dlg.addButton("btnTest2", function () {alert("test2");}, "button2");
    
    dlg.prevPage();

    res = !!($(".panel1")[0].offsetHeight + $(".button1")[0].offsetHeight);
    dlg.remove();
    return res;
    
});
// todo - add more tests here

