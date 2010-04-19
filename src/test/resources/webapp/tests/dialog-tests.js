// Test for dialog.js

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

    var res = !(AJS.$(".panel1")[0].offsetHeight + AJS.$(".button1")[0].offsetHeight);
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

    res = !!(AJS.$(".panel1")[0].offsetHeight + AJS.$(".button1")[0].offsetHeight);
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
    res = (AJS.$("li.selected", popup.page[0].element).text() == "First" && AJS.$("h2", popup.page[0].element).text() == "Insert Macro");

    popup.remove();
    return res;
});
testAjs.addTest("testDialogRemovePanel", function () {
    var popup = new AJS.Dialog(860, 530);
    popup.addHeader("Insert Macro")
    .addPanel("First", "<p></p>")
    .addPanel("Second", "<p></p>")
    .getPanel(0).remove();
    res = (AJS.$("ul.page-menu li").length == 1);
    popup.remove();
    return res;
});
testAjs.addTest("testDialogRemovePage", function () {
    var popup = new AJS.Dialog(860, 530);
    popup.addPage();
    popup.addPage();
    popup.getPage(0).remove();
    res = (AJS.$(".dialog-components").length == 2);
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

    res = !!(AJS.$(".panel1")[0].offsetHeight + AJS.$(".button1")[0].offsetHeight);
    dlg.remove();
    return res;
});
testAjs.addTest("testDialogMenuHidden", function() {
    // tests that the dialog menu is hidden when there is only one panel
    var popup = new AJS.Dialog(860, 530, "test-dialog");
    popup.addPanel("First", "<p></p>", "panel1").show();

    var res = AJS.$("#test-dialog .page-menu").css("display") == "none";
    popup.remove();
    return res;
});