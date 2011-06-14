module("Messages Unit Tests", {
    setup: function() {
        this.messagebar = jQuery('<div id="aui-message-bar"></div>');
        jQuery("body").append(this.messagebar);
    },
    teardown: function() {
        this.messagebar.remove();
    }
});

function messagesSetup(testid) {
    AJS.messages.info({
        id: testid,
        title: "Title",
        body: "This message was created by messagesSetup() with id " + testid
    });
}

function checkNoID(target) {
    return {
        found: target.find(".aui-message")[0].getAttribute("id"),
        expected: (AJS.$.browser.msie && ~~(AJS.$.browser.version) < 8) ? "" : null // IE7 needs empty string
    };
}

test("Messages API", function() {
    ok(typeof AJS.messages == "object", "AJS.messages exists");
    ok(typeof AJS.messages.setup == "function", "AJS.messages.setup exists");
    ok(typeof AJS.messages.makeCloseable == "function", "AJS.messages.makeCloseable exists");
    ok(typeof AJS.messages.template == "string", "AJS.messages.template exists");
    ok(typeof AJS.messages.createMessage == "function", "AJS.messages.createMessage exists");
});

test("Messages ID test: good ID", function() {
    messagesSetup("test-id-without-hash");
    ok( AJS.$("#test-id-without-hash").length, "#test-id-without-hash should be found" );
});

test("Messages ID test: bad ID", function() {
    messagesSetup("#t.e.st-m### e s s a '''\"\"g e-id-full-of-dodgy-crap");
    var checkedNoID = checkNoID(this.messagebar);
    equal( checkedNoID.found, checkedNoID.expected, "There should be no ID (bad ID supplied)");
});

test("Messages ID test: no ID", function() {
    messagesSetup();
    var checkedNoID = checkNoID(this.messagebar);
    equal( checkedNoID.found, checkedNoID.expected, "There should be no ID (no ID supplied)");
});
