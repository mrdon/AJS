// tests for event.js

testAjs.addTest("testAJSeventExists", function () {
    return (typeof AJS.bind == "function") &&
        (typeof AJS.trigger == "function");
});

testAjs.addTest("testAJSeventBindsAndTriggers", function () {
    var testResult = false;
    AJS.bind("abc-event", function(data) {
        testResult = true;
    });
    AJS.trigger("abc-event");
    return testResult;
});

testAjs.addTest("testAJSeventBindsAndTriggersWithParams", function () {
    var testResult = false;
    AJS.bind("abc-event", function(event, data) {
        testResult = data;
    });
    AJS.trigger("abc-event", true);
    return testResult;
});
