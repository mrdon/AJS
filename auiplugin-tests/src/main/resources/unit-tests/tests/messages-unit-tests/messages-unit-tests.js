module("Messages Unit Tests");

test("Messages API", function() {
    ok(typeof AJS.messages == "object", "AJS.messages exists");
    ok(typeof AJS.messages.setup == "function", "AJS.messages.setup exists");
    ok(typeof AJS.messages.makeCloseable == "function", "AJS.messages.makeCloseable exists");
    ok(typeof AJS.messages.template == "string", "AJS.messages.template exists");
    ok(typeof AJS.messages.createMessage == "function", "AJS.messages.createMessage exists");
});

function messagesSetup(testid) {
    jQuery("body").append('<div id="aui-message-bar"></div>');
    AJS.messages.info({
        id: testid,
        title: "Title",
        body: "This message was created by messagesSetup() with id " + testid
    });
}

function messagesTearDown() {
    jQuery("#aui-message-bar").remove();
}

test("Messages ID test: no hash", function() {
    messagesSetup("test-id-without-hash");
    ok( AJS.$("#test-id-without-hash").length, "#test-id-without-hash not found" );
    messagesTearDown();
});

test("Messages ID test: with hash", function() {
    messagesSetup("#test-id-with-hash");
    messagesSetup();
    ok( AJS.$("#test-id-with-hash").length, "#test-id-with-hash not found" );
    messagesTearDown();
});

test("Messages ID test: with all regex options", function() {
    messagesSetup("#test-m### e s s a '''\"\"g e-id-full-of-dodgy-crap");
    ok( AJS.$("#test-message-id-full-of-dodgy-crap").length, "#test-message-id-full-of-dodgy-crap not found" );
    messagesTearDown();
});
