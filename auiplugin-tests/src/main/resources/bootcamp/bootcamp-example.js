AJS.$(document).ready(function() {

    // tabs
    AJS.tabs.setup();

    // dropdown
    AJS.$(".aui-dd-parent").dropDown("Standard", { alignment: "left"});
                    
    // dialogs
    // create a dialog 860px wide x 530px high
    var dialog = new AJS.Dialog({width:860, height:530, id:"dialog1"}),
        dialog2 = new AJS.Dialog({width:1000, height:300, id:"dialog2"}),
        dialog3 = new AJS.Dialog({width:100, height:600, id:"dialog3"});
    
    // PAGE 0 (first page)
    // adds header for first page
    dialog.addHeader("Dialog - Page 0");
    
    // add panel 1
    dialog.addPanel("Panel 1", "<p>Some content for panel 1. This has no padding.</p>", "panel-body");
    dialog.get("panel:0").setPadding(0);
    
    // add panel 2 (this will create a menu on the left side for selecting panels within page 0)
    dialog.addPanel("Panel 2", "<p>Some content for panel 2</p><p>Some content for panel 2</p><p>Some content for panel 2</p><p>Some content for panel 2</p><p>Some content for panel 2</p><p>Some content for panel 2</p><p>Some content for panel 2</p><p>Some content for panel 2</p><p>Some content for panel 2</p><p>Some content for panel 2</p><p>Some content for panel 2</p><p>Some content for panel 2</p><p>Some content for panel 2</p><p>Some content for panel 2</p><p>Some content for panel 2</p><p>Some content for panel 2</p><p>Some content for panel 2</p><p>Some content for panel 2</p><p>Some content for panel 2</p><p>Some content for panel 2</p><p>Some content for panel 2</p><p>Some content for panel 2</p><p>Some content for panel 2</p><p>Some content for panel 2</p><p>Some content for panel 2</p><p>Some content for panel 2</p><p>Some content for panel 2</p><p>Some content for panel 2</p>", "panel-body");
    
    dialog.addButton("Next", function (dialog) {
        dialog.nextPage();
    });
    dialog.addButton("Cancel", function (dialog) {
        dialog.hide();
    });
    dialog.addButton("testStackingDialogs", function (dialog) {
        dialog2.show();
    });
    
    // PAGE 1 (second page)
    // adds a new page to dialog
    dialog.addPage();
    
    // adds header for second page
    dialog.addHeader("Dialog - Page 1");
    
    // adds a single panel on second page (as there is only one panel, no menu will appear on the left side)
    dialog.addPanel("SinglePanel", "<p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p><p>Some content for the only panel on Page 1</p>", "singlePanel");
    
    // add "Previous" button to page 1
    dialog.addButton("Previous", function(dialog) {
       dialog.prevPage();
    });
    // adds "Cancel" button to page 1
    dialog.addButton("Cancel", function (dialog) {
        dialog.hide();
    });
    
    //Create first stackable Dialog
    dialog2.addHeader("First Stacking Dialog")
    .addPanel("PanelStack1", "PanelStack1")
    .addButton("close", function(dialog){
        dialog.hide();
    })
    .addButton("testStackingDialogs2", function (dialog) {
        dialog3.show();
    });
    //Create second stackable dialog
    dialog3.addHeader("Second Stacking Dialog")
    .addPanel("PanelStack1", "PanelStack1")
    .addButton("close", function(dialog){
        dialog.hide();
    });
    
    AJS.$("#dialog-button").click(function() {
        // PREPARE FOR DISPLAY
        // start first page, first panel
        dialog.gotoPage(0);
        dialog.gotoPanel(0);
        dialog.show();
    });
    
    AJS.$("#dialog-link").click(function(){
        dialog.gotoPage(0);
        dialog.gotoPanel(0);
        dialog.show(); 
    });
        
});