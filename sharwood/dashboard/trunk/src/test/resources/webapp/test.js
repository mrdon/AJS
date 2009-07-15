/*
 * Add test functions here. Functions should return true for a passed test; any other value will be converted to a
 * string for the failure log.
 *
 * This means you can write a test line like:
 *
 *     return str == "happyFactor" || str;
 *
 * and if the str isn't the expected "happyFactor" you can see what it is in the log instead of just "false".
 *
 * CAVEAT-EMPTOR : if your alternate return value's toString is *also* equivalent to "true" you'll get false
 * negatives.
 */

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
testAjs.addTest("testAjsClone", function() {
    var clonedDiv = AJS.clone("#test-container");
    $("body").append(clonedDiv);
    var res = $("#test-container").length == 1 && $("div.test").length == 2;
    clonedDiv.remove();
    return res;
});

(function () {
    // AJS.filterBySearch tests.
    var entries = [
        { id: 1, keywords: "foo bar, foo-bar" },
        { id: 2, keywords: "faux bar, faux-bar" },
        { id: 3, keywords: "Foo BAR, fb" },
        { id: 4, keywords: "Foo bar" },
        { id: 5, keywords: "JIRA Issues" },
        { id: 6, keywords: "Just Inother Ranic Aonday" }
    ];
    testAjs.addTest("testFilterBySearch", function() {
        var results = AJS.filterBySearch(entries, "bar");
        return results.length == 4;
    });
    testAjs.addTest("testFilterBySearchCamelCase", function() {
        var results = AJS.filterBySearch(entries, "FoB");
        return results.length == 1 && results[0].id == 3;
    });
    testAjs.addTest("testFilterBySearchCamelCaseIgnoreCase", function() {
        var results = AJS.filterBySearch(entries, "FoB", { ignoreForCamelCase: true });
        return results.length == 3 || results;
    });
    testAjs.addTest("testFilterBySearchNoMatchBoundary", function() {
        var results = AJS.filterBySearch(entries, "ux");
        return results.length == 1 && results[0].id == 2;
    });
    testAjs.addTest("testFilterBySearchMatchBoundary", function() {
        var results = AJS.filterBySearch(entries, "ux", { matchBoundary: true });
        return results.length == 0;
    });
    testAjs.addTest("testFilterBySearchSplitRegex", function() {
        var results = AJS.filterBySearch(entries, "fa-b", { splitRegex: /[\s\-]+/ });
        return results.length == 1 && results[0].id == 2 || results;
    });
    testAjs.addTest("testFilterBySearchAllUppercase", function() {
        var results = AJS.filterBySearch(entries, "JIRA");
        return results.length == 2 && results[0].id == 5 && results[1].id == 6 || results;
    });
})();

// dialog.js tests
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
testAjs.addTest("testDialogGotoPanel", function () {
    var popup = new AJS.Dialog(860, 530);
    popup.addHeader("Insert Macro");
    popup.addPanel("First", "<p></p>");
    popup.addPanel("Second", "<p></p>");
    popup.addPage();
    popup.addPanel("Test1", "<p>Test1 text</p>");
    popup.addPanel("Test2", "<p>Test2 text</p>");
    popup.gotoPanel(0, 0);
    popup.show();
    res = ($("li.selected", popup.page[0].element).text() == "First" && $("h2", popup.page[0].element).text() == "Insert Macro");

    popup.remove();
    return res;
});
testAjs.addTest("testDialogRemovePanel", function () {
    var popup = new AJS.Dialog(860, 530);
    popup.addHeader("Insert Macro")
    .addPanel("First", "<p></p>")
    .addPanel("Second", "<p></p>")
    .getPanel(0).remove();
    res = ($("ul.page-menu li").length == 1);
    popup.remove();
    return res;    
});
testAjs.addTest("testDialogRemovePage", function () {
    var popup = new AJS.Dialog(860, 530);
    popup.addPage();
    popup.addPage();
    popup.getPage(0).remove();
    res = ($(".dialog-components").length == 2);
    popup.remove();
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
testAjs.addTest("testDialogMenuHidden", function() {
    // tests that the dialog menu is hidden when there is only one panel
    var popup = new AJS.Dialog(860, 530, "test-dialog");
    popup.addPanel("First", "<p></p>", "panel1").show();
    
    var res = $("#test-dialog .page-menu").css("display") == "none";
    popup.remove();
    return res;
});
testAjs.addTest("testDialogPosition", function() {
    document.documentElement.scrollTop = 10000;
    // tests that the dialog menu is hidden when there is only one panel
    var popup = new AJS.Dialog(860, 530, "test-dialog");
    popup.addPanel("First", "<p></p>", "panel1").show();
    
    var res = $("#test-dialog").offset().top > document.documentElement.scrollTop;
    popup.remove();
    return res;
});

// todo - add more tests here

