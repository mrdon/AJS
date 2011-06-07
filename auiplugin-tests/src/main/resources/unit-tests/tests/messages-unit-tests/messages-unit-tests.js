module("Messages Unit Tests");

test("Messages API", function() {
    ok(typeof AJS.messages == "object", "AJS.messages exists");
    ok(typeof AJS.messages.setup == "function", "AJS.messages.setup exists");
    ok(typeof AJS.messages.makeCloseable == "function", "AJS.messages.makeCloseable exists");
    ok(typeof AJS.messages.template == "string", "AJS.messages.template exists");
    ok(typeof AJS.messages.createMessage == "function", "AJS.messages.createMessage exists");
});

