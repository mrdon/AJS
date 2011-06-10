module("Messages Unit Tests", {
    setup: function() {
        this.messagebar = jQuery('<div id="aui-message-bar"></div>');
        jQuery("body").append(this.messagebar);
    },
    teardown: function() {
        this.messagebar.remove();
    }
});

test("Messages API", function() {
    ok(typeof AJS.messages == "object", "AJS.messages exists");
    ok(typeof AJS.messages.setup == "function", "AJS.messages.setup exists");
    ok(typeof AJS.messages.makeCloseable == "function", "AJS.messages.makeCloseable exists");
    ok(typeof AJS.messages.template == "string", "AJS.messages.template exists");
    ok(typeof AJS.messages.createMessage == "function", "AJS.messages.createMessage exists");
});

function messagesSetup(testid) {
    AJS.messages.info({
        id: testid,
        title: "Title",
        body: "This message was created by messagesSetup() with id " + testid
    });
}

test("Messages ID test: no hash", function() {
    messagesSetup("test-id-without-hash");
    ok( AJS.$("#test-id-without-hash").length, "#test-id-without-hash should be found" );
});

test("Messages ID test: with leading hash", function() {
    messagesSetup("#test-id-with-hash");
    ok( AJS.$("#test-id-with-hash").length, "#test-id-with-hash should be found" );
});

test("Messages ID test: with all regex options", function() {
    messagesSetup("#t.e.st-m### e s s a '''\"\"g e-id-full-of-dodgy-crap");
    ok( AJS.$("#test-message-id-full-of-dodgy-crap").length, "#test-message-id-full-of-dodgy-crap should be found" );
});

test("Messages ID test: no ID", function() {
    // simply omit the ID
    messagesSetup();
    // IE7 wants an empty string, everything else wants null
    var nuffin = (AJS.$.browser.msie && ~~(AJS.$.browser.version) < 8) ? "" : null;
    equal(this.messagebar.find(".aui-message")[0].getAttribute("id"), nuffin, "There should be no ID");
});
