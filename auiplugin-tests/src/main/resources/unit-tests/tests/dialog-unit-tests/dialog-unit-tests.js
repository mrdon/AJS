module("Dialog Unit Tests");

test("test for Popup creation", function() {
    var testPopup = AJS.popup({height:500, width: 500, id:"test-popup"});
    ok(typeof testPopup == "object", "testPopup was created successfully!");
    ok(typeof testPopup.changeSize == "function", "testPopup has the change size function!");
    ok(typeof testPopup.disable == "function", "testPopup has the diable function!");
    ok(typeof testPopup.enable == "function", "testPopup has the enable function!");
    ok(typeof testPopup.hide == "function", "testPopup has the hide function!");
    ok(typeof testPopup.remove == "function", "testPopup has the remove function!");
    ok(typeof testPopup.show == "function", "testPopup has the show function!");
});

test("test for Dialog creation", function() {
    var testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    ok(typeof testDialog == "object", "testPopup was created successfully!");
    ok(typeof testDialog.addHeader == "function", "testDialog has the addHeader function!");
    ok(typeof testDialog.addButton == "function", "testDialog has the addButton function!");
    ok(typeof testDialog.addSubmit == "function", "testDialog has the addLink function!");
    ok(typeof testDialog.addLink == "function", "testDialog has the addSubmit function!");
    ok(typeof testDialog.addButtonPanel == "function", "testDialog has the addButtonPanel function!");
    ok(typeof testDialog.addPanel == "function", "testDialog has the addPanel function!");
    ok(typeof testDialog.addPage == "function", "testDialog has the addPage function!");
    ok(typeof testDialog.nextPage == "function", "testDialog has the nextPage function!");
    ok(typeof testDialog.prevPage == "function", "testDialog has the prevPage function!");
    ok(typeof testDialog.gotoPage == "function", "testDialog has the gotoPage function!");
    ok(typeof testDialog.getPanel == "function", "testDialog has the getPanel function!");
    ok(typeof testDialog.getPage == "function", "testDialog has the getPage function!");
    ok(typeof testDialog.getCurrentPanel == "function", "testDialog has the getCurrentPanel function!");
    ok(typeof testDialog.gotoPanel == "function", "testDialog has the gotoPanel function!");
    ok(typeof testDialog.show == "function", "testDialog has the show function!");
    ok(typeof testDialog.hide == "function", "testDialog has the hide function!");
    ok(typeof testDialog.remove == "function", "testDialog has the remove function!");
    ok(typeof testDialog.disable == "function", "testDialog has the disable function!");
    ok(typeof testDialog.enable == "function", "testDialog has the enable function!");
    ok(typeof testDialog.get == "function", "testDialog has the get function!");
    ok(typeof testDialog.updateHeight == "function", "testDialog has the updateHeight function!");
});

test("test for Dialog.addHeader", function() {
    var testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    ok(typeof testDialog.addHeader("HEADER", "header") == "object", "a dialog header was added successfully!");
});

test("test for Dialog.addButton", function() {
    var testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    ok(typeof testDialog.addButton("BUTTON", function(){}, "button") == "object", "a dialog button was added successfully!");
});

test("test for Dialog.addLink", function() {
    var testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    ok(typeof testDialog.addLink("LINK", function(){}, "link") == "object", "a dialog link was added successfully!");
});

test("test for Dialog.addSubmit", function() {
    var testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    ok(typeof testDialog.addSubmit("SUBMIT", function(){}) == "object", "a dialog submit button was added successfully!");
});

test("test for Dialog.addCancel", function() {
    var testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    ok(typeof testDialog.addSubmit("CANCEL", function(){}) == "object", "a dialog cancel link was added successfully!");
});

test("test for Dialog.addButtonPanel", function() {
    var testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    ok(typeof testDialog.addButtonPanel() == "object", "a dialog button panel was added successfully!");
});

test("test for Dialog.addPanel", function() {
    var testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    ok(typeof testDialog.addPanel("panel", "some text", "panel-body") == "object", "a dialog panel was added successfully!");
});

test("test for Dialog.addPage", function() {
    var testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    ok(typeof testDialog.addPage("page") == "object", "a dialog page was added successfully!");
});

test("test for Dialog.nextPage", function() {
    var testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    ok(typeof testDialog.nextPage() == "object", "returned the next page successfully!");
});

test("test for Dialog.prevPage", function() {
    var testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    ok(typeof testDialog.prevPage() == "object", "returned the previous page successfully!");
});

test("test for Dialog.gotoPage", function() {
    var testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    ok(typeof testDialog.gotoPage(0) == "object", "went to the specified page successfully!");
});

test("test for Dialog.getPanel", function() {
    var testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    testDialog.addPanel("panel", "some text", "panel-body");
    ok(typeof testDialog.getPanel(0, 0) == "object", "getPanel() returned the panel successfully!");
});

test("test for Dialog.getPage", function() {
    var testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    ok(typeof testDialog.getPage(0) == "object", "went to the specified page successfully!");
});

test("test for Dialog.getCurrentPanel", function() {
    var testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    testDialog.addPanel("panel", "some text", "panel-body");
    ok(typeof testDialog.getCurrentPanel() == "object", "returned the current panel successfully!");
});
