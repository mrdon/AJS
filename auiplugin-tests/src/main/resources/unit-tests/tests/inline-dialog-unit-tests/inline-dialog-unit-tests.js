module("Inline Dialog Unit Tests");

test("Inline Dialog Creation", function() {
    var testInlineDialog = AJS.InlineDialog(AJS.$("body"), 1, function(){});
    ok(typeof testInlineDialog == "object", "Inline Dialog Successfully Created!");
    ok(typeof testInlineDialog.show == "function", "testInlineDialog has the show function.");
    ok(typeof testInlineDialog.hide == "function", "testInlineDialog has the hide function.");
    ok(typeof testInlineDialog.refresh == "function", "testInlineDialog has the refresh function.");
});
test("Inline Dialog getOptions function", function() {
    var testInlineDialog = AJS.InlineDialog(AJS.$("body"), 1, function(){}, {});
    ok(typeof testInlineDialog == "object", "Inline Dialog Successfully Created!");
    ok(typeof testInlineDialog.show == "function", "testInlineDialog has the show function.");
    ok(typeof testInlineDialog.hide == "function", "testInlineDialog has the hide function.");
    ok(typeof testInlineDialog.refresh == "function", "testInlineDialog has the refresh function.");
    ok(typeof testInlineDialog.getOptions == "function", "testInlineDialog has the getOptions function")
    ok(typeof testInlineDialog.getOptions() == "object", "getOptions function successfully returned an object");
});
test("Inline Dialog default options", function() {
    var testInlineDialog = AJS.InlineDialog(AJS.$("body"), 1, function(){});
    var expectedDefaults = {
        onTop: false,
        responseHandler: function(data, status, xhr) {
            //assume data is html
            return data;
        },
        closeOthers: true,
        isRelativeToMouse: false,
        addActiveClass: true,
        onHover: false,
        useLiveEvents: false,
        noBind: false,
        fadeTime: 100,
        hideDelay: 10000,
        showDelay: 0,
        width: 300,
        offsetX: 0,
        offsetY: 10,
        container: "body",
        cacheContent : true,
        displayShadow: true,
        hideCallback: function(){}, // if defined, this method will be exected after the popup has been faded out.
        initCallback: function(){}, // A function called after the popup contents are loaded. `this` will be the popup jQuery object, and the first argument is the popup identifier.
        upfrontCallback: function() {}, // A function called before the popup contents are loaded. `this` will be the popup jQuery object, and the first argument is the popup identifier.
        calculatePositions: function() {},
        getArrowPath: function() {},
        getArrowAttributes: function() {}
    };
    ok(typeof testInlineDialog == "object", "Inline Dialog Successfully Created!");
    var isDefault = true;
    // console.log(isDefault);
    AJS.$.each(testInlineDialog.getOptions(), function(index, value){
        if(expectedDefaults[index] != value && typeof value != "function" || typeof value != typeof expectedDefaults[index]){
            isDefault = false;
        }
    });
    // console.log(isDefault);
    ok(isDefault, "all default options are as expected");
    
});

test("Inline Dialog Creation with closeOthers option", function() {
    var testInlineDialog = AJS.InlineDialog(AJS.$("body"), 1, function(){}, {closeOthers: false});
    ok(typeof testInlineDialog == "object", "Inline Dialog Successfully Created!");
    ok(typeof testInlineDialog.show == "function", "test InlineDialog has the show function.");
    ok(typeof testInlineDialog.hide == "function", "test InlineDialog has the hide function.");
    ok(typeof testInlineDialog.refresh == "function", "test InlineDialog has the refresh function.");
    ok(testInlineDialog.getOptions().closeOthers == false, "closeOthers was set to false successfully");
});

test("Inline Dialog Creation with responseHandler option", function() {
    var testInlineDialog = AJS.InlineDialog(AJS.$("body"), 1, function(){}, {responseHandler: function(){}});
    ok(typeof testInlineDialog == "object", "Inline Dialog Successfully Created!");
    ok(typeof testInlineDialog.show == "function", "test InlineDialog has the show function.");
    ok(typeof testInlineDialog.hide == "function", "test InlineDialog has the hide function.");
    ok(typeof testInlineDialog.refresh == "function", "test InlineDialog has the refresh function.");
    ok(typeof testInlineDialog.getOptions().responseHandler == "function", "responseHandler was set to a function successfully");
});

test("Inline Dialog Creation with isRelativeToMouse option", function() {
    var testInlineDialog = AJS.InlineDialog(AJS.$("body"), 1, function(){}, {isRelativeToMouse:true});
    ok(typeof testInlineDialog == "object", "Inline Dialog Successfully Created!");
    ok(typeof testInlineDialog.show == "function", "testInlineDialog has the show function.");
    ok(typeof testInlineDialog.hide == "function", "testInlineDialog has the hide function.");
    ok(typeof testInlineDialog.refresh == "function", "testInlineDialog has the refresh function.");
    ok(testInlineDialog.getOptions().isRelativeToMouse == true, "isRelativeToMouse was set to true successfully");
});

test("Inline Dialog Creation with onHover option", function() {
    var testInlineDialog = AJS.InlineDialog(AJS.$("body"), 1, function(){}, {onHover: true});
    ok(typeof testInlineDialog == "object", "Inline Dialog Successfully Created!");
    ok(typeof testInlineDialog.show == "function", "test InlineDialog has the show function.");
    ok(typeof testInlineDialog.hide == "function", "test InlineDialog has the hide function.");
    ok(typeof testInlineDialog.refresh == "function", "test InlineDialog has the refresh function.");
    ok(testInlineDialog.getOptions().onHover == true, "onHover was set to true successfully");
});

test("Inline Dialog Creation with useLiveEvents option", function() {
    var testInlineDialog = AJS.InlineDialog(AJS.$("body"), 1, function(){}, {useLiveEvents: true});
    ok(typeof testInlineDialog == "object", "Inline Dialog Successfully Created!");
    ok(typeof testInlineDialog.show == "function", "test InlineDialog has the show function.");
    ok(typeof testInlineDialog.hide == "function", "test InlineDialog has the hide function.");
    ok(typeof testInlineDialog.refresh == "function", "test InlineDialog has the refresh function.");
    ok(testInlineDialog.getOptions().useLiveEvents == true, "useLiveEvents was set to true successfully");
});

test("Inline Dialog Creation with noBind option", function() {
    var testInlineDialog = AJS.InlineDialog(AJS.$("body"), 1, function(){}, {noBind: true});
    ok(typeof testInlineDialog == "object", "Inline Dialog Successfully Created!");
    ok(typeof testInlineDialog.show == "function", "test InlineDialog has the show function.");
    ok(typeof testInlineDialog.hide == "function", "test InlineDialog has the hide function.");
    ok(typeof testInlineDialog.refresh == "function", "test InlineDialog has the refresh function.");
    ok(testInlineDialog.getOptions().noBind == true, "noBind was set to true successfully");
});

test("Inline Dialog Creation with fadeTime option", function() {
    var testInlineDialog = AJS.InlineDialog(AJS.$("body"), 1, function(){}, {fadeTime: 99});
    ok(typeof testInlineDialog == "object", "Inline Dialog Successfully Created!");
    ok(typeof testInlineDialog.show == "function", "test InlineDialog has the show function.");
    ok(typeof testInlineDialog.hide == "function", "test InlineDialog has the hide function.");
    ok(typeof testInlineDialog.refresh == "function", "test InlineDialog has the refresh function.");
    ok(testInlineDialog.getOptions().fadeTime == 99, "fadeTime was set to 99 successfully");
});

test("Inline Dialog Creation with hideDelay option", function() {
    var testInlineDialog = AJS.InlineDialog(AJS.$("body"), 1, function(){}, {hideDelay: null});
    ok(typeof testInlineDialog == "object", "Inline Dialog Successfully Created!");
    ok(typeof testInlineDialog.show == "function", "test InlineDialog has the show function.");
    ok(typeof testInlineDialog.hide == "function", "test InlineDialog has the hide function.");
    ok(typeof testInlineDialog.refresh == "function", "test InlineDialog has the refresh function.");
    ok(testInlineDialog.getOptions().hideDelay == null, "hideDelay was set to null successfully");
});

test("Inline Dialog Creation with width option", function() {
    var testInlineDialog = AJS.InlineDialog(AJS.$("body"), 1, function(){}, {width: 299});
    ok(typeof testInlineDialog == "object", "Inline Dialog Successfully Created!");
    ok(typeof testInlineDialog.show == "function", "test InlineDialog has the show function.");
    ok(typeof testInlineDialog.hide == "function", "test InlineDialog has the hide function.");
    ok(typeof testInlineDialog.refresh == "function", "test InlineDialog has the refresh function.");
    ok(testInlineDialog.getOptions().width == 299, "width was set to 299 successfully");
});

test("Inline Dialog Creation with offsetX option", function() {
    var testInlineDialog = AJS.InlineDialog(AJS.$("body"), 1, function(){}, {offsetX: 1});
    ok(typeof testInlineDialog == "object", "Inline Dialog Successfully Created!");
    ok(typeof testInlineDialog.show == "function", "test InlineDialog has the show function.");
    ok(typeof testInlineDialog.hide == "function", "test InlineDialog has the hide function.");
    ok(typeof testInlineDialog.refresh == "function", "test InlineDialog has the refresh function.");
    ok(testInlineDialog.getOptions().offsetX == 1, "offsetX was set to 1 successfully");
});

test("Inline Dialog Creation with offsetY option", function() {
    var testInlineDialog = AJS.InlineDialog(AJS.$("body"), 1, function(){}, {offsetY: 9});
    ok(typeof testInlineDialog == "object", "Inline Dialog Successfully Created!");
    ok(typeof testInlineDialog.show == "function", "test InlineDialog has the show function.");
    ok(typeof testInlineDialog.hide == "function", "test InlineDialog has the hide function.");
    ok(typeof testInlineDialog.refresh == "function", "test InlineDialog has the refresh function.");
    ok(testInlineDialog.getOptions().offsetY == 9, "offsetY was set to 9 successfully");
});

test("Inline Dialog Creation with container option", function() {
    var testInlineDialog = AJS.InlineDialog(AJS.$("body"), 1, function(){}, {container: "html"});
    ok(typeof testInlineDialog == "object", "Inline Dialog Successfully Created!");
    ok(typeof testInlineDialog.show == "function", "test InlineDialog has the show function.");
    ok(typeof testInlineDialog.hide == "function", "test InlineDialog has the hide function.");
    ok(typeof testInlineDialog.refresh == "function", "test InlineDialog has the refresh function.");
    ok(testInlineDialog.getOptions().container == "html", "container was set to 'html' successfully");
});

test("Inline Dialog Creation with cacheContent option", function() {
    var testInlineDialog = AJS.InlineDialog(AJS.$("body"), 1, function(){}, {cacheContent: false});
    ok(typeof testInlineDialog == "object", "Inline Dialog Successfully Created!");
    ok(typeof testInlineDialog.show == "function", "test InlineDialog has the show function.");
    ok(typeof testInlineDialog.hide == "function", "test InlineDialog has the hide function.");
    ok(typeof testInlineDialog.refresh == "function", "test InlineDialog has the refresh function.");
    ok(testInlineDialog.getOptions().cacheContent == false, "cacheContent was set to false successfully");
});
