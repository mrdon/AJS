// Toolbar JS only loads for IE8 and below
var isIE = ( jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 9 ),
    bigPileOfToolbar,
    yepnope;

module("Toolbar Unit Tests", {
    setup: function(){
        if(isIE) {
            var bigPileOfToolbar = '<div class="aui-toolbar" id="disabled-buttons-toolbar"><div class="toolbar-split toolbar-split-left"><ul class="toolbar-group"><li class="toolbar-item disabled"><a href="#" class="toolbar-trigger">Off (items)</a></li><li class="toolbar-item disabled"><a href="#" class="toolbar-trigger">Off</a></li><li class="toolbar-item disabled"><a href="#" class="toolbar-trigger">Off</a></li><li class="toolbar-item disabled"><a href="#" class="toolbar-trigger">Off</a></li></ul><ul class="toolbar-group"><li class="toolbar-item"><a href="#" class="toolbar-trigger disabled">Off (triggers)</a></li><li class="toolbar-item"><a href="#" class="toolbar-trigger disabled">Off</a></li><li class="toolbar-item"><a href="#" class="toolbar-trigger disabled">Off</a></li><li class="toolbar-item"><a href="#" class="toolbar-trigger disabled">Off</a></li></ul><ul class="toolbar-group disabled"><li class="toolbar-item"><a href="#" class="toolbar-trigger">Off (whole group)</a></li><li class="toolbar-item"><a href="#" class="toolbar-trigger">Off</a></li><li class="toolbar-item"><a href="#" class="toolbar-trigger">Off</a></li><li class="toolbar-item"><a href="#" class="toolbar-trigger">Off</a></li></ul><ul class="toolbar-group disabled"><li class="toolbar-item disabled"><a href="#" class="toolbar-trigger disabled">Off (group, item and trigger)</a></li><li class="toolbar-item disabled"><a href="#" class="toolbar-trigger disabled">Off</a></li><li class="toolbar-item disabled"><a href="#" class="toolbar-trigger disabled">Off</a></li><li class="toolbar-item disabled"><a href="#" class="toolbar-trigger disabled">Off</a></li></ul><ul class="toolbar-group"><li class="toolbar-item disabled"><a href="#" class="toolbar-trigger">Off</a></li><li class="toolbar-item"><a href="#" class="toolbar-trigger">On</a></li><li class="toolbar-item disabled"><a href="#" class="toolbar-trigger">Of</a></li></ul><ul class="toolbar-group"><li class="toolbar-item"><a href="#" class="toolbar-trigger">On</a></li><li class="toolbar-item disabled"><a href="#" class="toolbar-trigger">Off</a></li><li class="toolbar-item"><a href="#" class="toolbar-trigger">On</a></li></ul><ul class="toolbar-group"><li class="toolbar-item"><a href="#" class="toolbar-trigger">On</a></li><li class="toolbar-item disabled"><a href="#" class="toolbar-trigger">Off</a></li></ul><ul class="toolbar-group"><li class="toolbar-item disabled"><a href="#" class="toolbar-trigger">Off</a></li><li class="toolbar-item"><a href="#" class="toolbar-trigger">On</a></li></ul><ul class="toolbar-group"><li class="toolbar-item disabled"><a href="#" class="toolbar-trigger">Off</a></li><li class="toolbar-item disabled"><a href="#" class="toolbar-trigger">Off</a></li><li class="toolbar-item"><a href="#" class="toolbar-trigger">On</a></li><li class="toolbar-item"><a href="#" class="toolbar-trigger">On</a></li></ul><ul class="toolbar-group"><li class="toolbar-item disabled"><a href="#" class="toolbar-trigger">Off</a></li><li class="toolbar-item"><a href="#" class="toolbar-trigger">On</a></li><li class="toolbar-item disabled"><a href="#" class="toolbar-trigger">Off</a></li><li class="toolbar-item"><a href="#" class="toolbar-trigger">On</a></li></ul><ul class="toolbar-group"><li class="toolbar-item"><a href="#" class="toolbar-trigger">On</a></li><li class="toolbar-item disabled"><a href="#" class="toolbar-trigger">Off</a></li><li class="toolbar-item"><a href="#" class="toolbar-trigger">On</a></li><li class="toolbar-item disabled"><a href="#" class="toolbar-trigger">Off</a></li></ul></div></div>';
            document.getElementById("qunit-fixture").innerHTML = bigPileOfToolbar;
            AJS.setUpToolbars();
        }
    }
});

if (isIE) {
    
    test("Toolbar IE first classes", function() {
        yepnope = jQuery(".aui-toolbar .toolbar-group .toolbar-item:first-child").hasClass("first");
        equal( yepnope, true, "First children should have class 'first'" );
    });       
    
    test("Toolbar IE last classes", function() {
        yepnope = jQuery(".aui-toolbar .toolbar-group .toolbar-item:last-child").hasClass("last");
        equal( yepnope, true, "Last children should have class 'last'" );
    });       

} else {
    
    test("Toolbar", function() {
        ok(true, "Toolbar has no testable javascript for this browser version");
    });       

}
