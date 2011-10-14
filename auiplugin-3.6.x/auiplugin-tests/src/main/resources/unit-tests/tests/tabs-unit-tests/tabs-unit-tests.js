module("Tabs Unit Tests");

test("Tabs API Test", function() {
       ok(typeof AJS.tabs == "object", "AJS.tabs exists!");
       ok(typeof AJS.tabs.setup == "function", "AJS.tabs.setup function exists!");
       ok(typeof AJS.tabs.change=="function", "AJS.tabs.change function exists!");
});