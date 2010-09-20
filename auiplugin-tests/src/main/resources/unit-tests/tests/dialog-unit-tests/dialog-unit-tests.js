module("Dialog Unit Tests", {
    setup: function(){
        testObj = {};
    },
    teardown: function(){
        //Remove all objects created in the testObj namespace
        AJS.$.each(testObj, function(index, value){
            value.remove();
        });
        //Set testObj to null to refresh it
        testObj=null;
    }
});

test("test for Popup API creation", function() {
    testObj.testPopup = AJS.popup({height:500, width: 500, id:"test-popup"});
    ok(typeof testObj.testPopup == "object", "testPopup was created successfully!");
    ok(typeof testObj.testPopup.changeSize == "function", "testPopup has the change size function!");
    ok(typeof testObj.testPopup.disable == "function", "testPopup has the diable function!");
    ok(typeof testObj.testPopup.enable == "function", "testPopup has the enable function!");
    ok(typeof testObj.testPopup.hide == "function", "testPopup has the hide function!");
    ok(typeof testObj.testPopup.remove == "function", "testPopup has the remove function!");
    ok(typeof testObj.testPopup.show == "function", "testPopup has the show function!");
});

test("test for Popup div creation", function() {
    testObj.testPopup = AJS.popup({height:500, width: 500, id:"test-popup"});
    ok(AJS.$("#test-popup").size()!=0, "test-popup div exists!");
});

test("test for Popup correct size creation", function() {
    testObj.testPopup = AJS.popup({height:500, width: 500, id:"test-popup"});
    testObj.testPopup2 = AJS.popup({height:123, width: 234, id:"test-popup2"});
    ok(AJS.$("#test-popup").height()==500, "test-popup is " + AJS.$("#test-popup").height() + "px in height, expected 500px");
    ok(AJS.$("#test-popup").width()==500, "test-popup is " + AJS.$("#test-popup").width() + "px in width, expected 500px");
    ok(AJS.$("#test-popup2").height()==123, "test-popup2 is " + AJS.$("#test-popup2").height() + "px in height, expected 123px");
    ok(AJS.$("#test-popup2").width()==234, "test-popup2 is " + AJS.$("#test-popup2").width() + "px in width, expected 234px");
});

test("test for Dialog API creation", function() {
    testObj.testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    ok(typeof testObj.testDialog == "object", "testPopup was created successfully!");
    ok(typeof testObj.testDialog.addHeader == "function", "testObj.testDialog has the addHeader function!");
    ok(typeof testObj.testDialog.addButton == "function", "testObj.testDialog has the addButton function!");
    ok(typeof testObj.testDialog.addSubmit == "function", "testObj.testDialog has the addLink function!");
    ok(typeof testObj.testDialog.addLink == "function", "testObj.testDialog has the addSubmit function!");
    ok(typeof testObj.testDialog.addButtonPanel == "function", "testObj.testDialog has the addButtonPanel function!");
    ok(typeof testObj.testDialog.addPanel == "function", "testObj.testDialog has the addPanel function!");
    ok(typeof testObj.testDialog.addPage == "function", "testObj.testDialog has the addPage function!");
    ok(typeof testObj.testDialog.nextPage == "function", "testObj.testDialog has the nextPage function!");
    ok(typeof testObj.testDialog.prevPage == "function", "testObj.testDialog has the prevPage function!");
    ok(typeof testObj.testDialog.gotoPage == "function", "testObj.testDialog has the gotoPage function!");
    ok(typeof testObj.testDialog.getPanel == "function", "testObj.testDialog has the getPanel function!");
    ok(typeof testObj.testDialog.getPage == "function", "testObj.testDialog has the getPage function!");
    ok(typeof testObj.testDialog.getCurrentPanel == "function", "testObj.testDialog has the getCurrentPanel function!");
    ok(typeof testObj.testDialog.gotoPanel == "function", "testObj.testDialog has the gotoPanel function!");
    ok(typeof testObj.testDialog.show == "function", "testObj.testDialog has the show function!");
    ok(typeof testObj.testDialog.hide == "function", "testObj.testDialog has the hide function!");
    ok(typeof testObj.testDialog.remove == "function", "testObj.testDialog has the remove function!");
    ok(typeof testObj.testDialog.disable == "function", "testObj.testDialog has the disable function!");
    ok(typeof testObj.testDialog.enable == "function", "testObj.testDialog has the enable function!");
    ok(typeof testObj.testDialog.get == "function", "testObj.testDialog has the get function!");
    ok(typeof testObj.testDialog.updateHeight == "function", "testObj.testDialog has the updateHeight function!");
});

test("test for Dialog.addHeader", function() {
    testObj.testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    ok(typeof testObj.testDialog.addHeader("HEADER", "header") == "object", "a dialog header was added successfully!");
    ok(AJS.$("#test-dialog .dialog-components .dialog-title").size()!=0, "dialog-title div exists as expected!");
    ok(AJS.$("#test-dialog .dialog-components .dialog-title").hasClass("header"), "dialog-title div has the 'header' class as expected!");
    ok(AJS.$("#test-dialog .dialog-components .dialog-title").text()=="HEADER", "dialog-title has the text 'HEADER' as expected!");
});

test("test for Dialog.addButton", function() {
    testObj.testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    ok(typeof testObj.testDialog.addButton("BUTTON", function(){}, "button") == "object", "a dialog button was added successfully!");
    ok(AJS.$("#test-dialog .dialog-components .dialog-button-panel button.button-panel-button").size()!=0, "test-dialog has a button-panel-button button element as expected"); 
        ok(AJS.$("#test-dialog .dialog-components .dialog-button-panel button.button-panel-button").text()=="BUTTON", "test-dialog's button-panel-button button element has text 'BUTTON' as expected");
});

test("test for Dialog.addLink", function() {
    testObj.testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    ok(typeof testObj.testDialog.addLink("LINK", function(){}, "link") == "object", "a dialog link was added successfully!");
    ok(AJS.$("#test-dialog .dialog-components .dialog-button-panel a.button-panel-link").size()!=0, "test-dialog has a button-panel-link a element as expected"); 
    ok(AJS.$("#test-dialog .dialog-components .dialog-button-panel a.button-panel-link").text()=="LINK", "test-dialog's button-panel-link a element has text 'LINK' as expected");
});

test("test for Dialog.addSubmit", function() {
    testObj.testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    ok(typeof testObj.testDialog.addSubmit("SUBMIT", function(){}) == "object", "a dialog submit button was added successfully!");
    ok(AJS.$("#test-dialog .dialog-components .dialog-button-panel button.button-panel-submit-button").size()!=0, "test-dialog has a button-panel-submit-button button element as expected"); 
    ok(AJS.$("#test-dialog .dialog-components .dialog-button-panel button.button-panel-submit-button").text()=="SUBMIT", "test-dialog's button-panel-button button element has text 'SUBMIT' as expected");
});

test("test for Dialog.addCancel", function() {
    testObj.testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    ok(typeof testObj.testDialog.addCancel("CANCEL", function(){}) == "object", "a dialog cancel link was added successfully!");
    ok(AJS.$("#test-dialog .dialog-components .dialog-button-panel a.button-panel-cancel-link").size()!=0, "test-dialog has a button-panel-cancel-link a element as expected"); 
    ok(AJS.$("#test-dialog .dialog-components .dialog-button-panel a.button-panel-cancel-link").text()=="CANCEL", "test-dialog's button-panel-cancel-link a element has text 'CANCEL' as expected");
});

test("test for Dialog.addButtonPanel", function() {
    testObj.testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    ok(typeof testObj.testDialog.addButtonPanel() == "object", "a dialog button panel was added successfully!");
    ok(AJS.$("#test-dialog .dialog-components .dialog-button-panel").size()!=0, "test-dialog has a button-panel element as expected");
});

test("test for Dialog.addPanel", function() {
    testObj.testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    ok(typeof testObj.testDialog.addPanel("panel", "some text", "panel-body") == "object", "a dialog panel was added successfully!");
    ok(AJS.$("#test-dialog .dialog-components div.dialog-page-body div.dialog-panel-body").size()!=0, "test-dialog has a dialog-panel-body element as expected");
    ok(AJS.$("#test-dialog .dialog-components ul.dialog-page-menu li.page-menu-item button.item-button").text()=="panel", "test-dialog has a page-menu-item li with text 'panel' as expected");
    
});

test("test for Dialog.addPanel x 2", function() {
    testObj.testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    ok(typeof testObj.testDialog.addPanel("panel", "some text", "panel-body") == "object", "a dialog panel was added successfully!");
    ok(AJS.$("#test-dialog .dialog-components div.dialog-page-body div.dialog-panel-body:nth-child(1)").size()!=0, "test-dialog has a dialog-panel-body element as expected");
    ok(typeof testObj.testDialog.addPanel("panel", "some text", "panel-body") == "object", "a second dialog panel was added successfully!");
    ok(AJS.$("#test-dialog .dialog-components div.dialog-page-body div.dialog-panel-body:nth-child(2)").size()!=0, "test-dialog has a dialog-panel-body element as expected");  
});

test("test for Dialog.addPanel with id", function() {
    testObj.testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    ok(typeof testObj.testDialog.addPanel("panel", "some text", "panel-body", "panel-1") == "object", "a dialog panel was added successfully!");
    ok(AJS.$("#test-dialog .dialog-components div.dialog-page-body div.dialog-panel-body:nth-child(1)").size()!=0, "test-dialog has a dialog-panel-body element as expected");
    ok(AJS.$("#test-dialog .dialog-components ul.dialog-page-menu li.page-menu-item button.item-button").attr("id")=="panel-1", "test-dialog has a page-menu-item li with an id of 'panel-1' as expected");
});

test("test for Dialog.addPage", function() {
    testObj.testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    newPage = testObj.testDialog.addPage("page") 
    ok(typeof newPage == "object", "a dialog page was added successfully!");
    ok(!AJS.$(newPage.page[1].body).is(":visible"), "the new page that was added is hidden.");
    ok(testObj.testDialog.curpage == 1, "The current page has been changed to the last one added");
});

test("test for Dialog.nextPage", function() {
    testObj.testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    testObj.testDialog.addPage();
    testObj.testDialog.addPage();
    testObj.testDialog.addPage();
    ok(typeof testObj.testDialog.nextPage() == "object", "returned the next page successfully!");
    ok(testObj.testDialog.curpage == 0, "The current page has been changed to the first one");
    testObj.testDialog.nextPage();
    ok(testObj.testDialog.curpage == 1, "The current page has been changed to the next one");
    testObj.testDialog.nextPage();
    ok(testObj.testDialog.curpage == 2, "The current page has been changed to the next one");
});

test("test for Dialog.prevPage", function() {
    testObj.testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    ok(typeof testObj.testDialog.prevPage() == "object", "returned the previous page successfully!");
    testObj.testDialog.addPage();
    testObj.testDialog.addPage();
    testObj.testDialog.addPage();
    ok(typeof testObj.testDialog.nextPage() == "object", "returned the next page successfully!");
    ok(testObj.testDialog.curpage == 0, "The current page has been changed to the first one");
    testObj.testDialog.nextPage();
    ok(testObj.testDialog.curpage == 1, "The current page has been changed to the next one");
    testObj.testDialog.nextPage();
    ok(testObj.testDialog.curpage == 2, "The current page has been changed to the next one");
});

test("test for Dialog.gotoPage", function() {
    testObj.testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    ok(typeof testObj.testDialog.gotoPage(0) == "object", "went to the specified page successfully!");
});

test("test for Dialog.getPanel", function() {
    testObj.testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    testObj.testDialog.addPanel("panel", "some text", "panel-body"); 
    ok(typeof testObj.testDialog.getPanel(0, 0) == "object", "getPanel() returned the panel successfully!");
});

test("test for Dialog.getPage", function() {
    testObj.testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    ok(typeof testObj.testDialog.getPage(0) == "object", "went to the specified page successfully!");
});

test("test for Dialog.getCurrentPanel", function() {
    testObj.testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    testObj.testDialog.addPanel("panel", "some text", "panel-body");
    ok(typeof testObj.testDialog.getCurrentPanel() == "object", "returned the current panel successfully!");
});

test("", function() {
    testObj.testDialog = new AJS.Dialog({height:500, width: 500, id:"test-dialog"});
    testObj.testDialog.addPanel("panel", "some text", "panel-body");
    ok(typeof testObj.testDialog.getCurrentPanel() == "object", "returned the current panel successfully!");
});