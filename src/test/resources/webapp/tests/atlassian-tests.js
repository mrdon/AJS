// Tests for atlassian.js

testAjs.addTest("testAjsExists", function () {
    return (typeof AJS != "undefined" && AJS != null);
});
testAjs.addTest("testConsoleExists", function () {
    return (typeof console != "undefined" && console != null);
});
testAjs.addTest("testAjsIndexOf", function () {
    return AJS.indexOf([0,1,2,3,4], 2) == 2;
});
testAjs.addTest("testAjsIndexOfFromIndex", function () {
    return AJS.indexOf([0,1,2,3,4,2], 2, 3) == 5;
});
testAjs.addTest("testAjsContains", function () {
    return AJS.contains(["foo", "bar", "hello", "world"], "hello");
});
testAjs.addTest("testAjsParams", function () {
    return AJS.params.company == "atlassian";
});
testAjs.addTest("testAjsParamsList", function () {
    var products = AJS.params.products;
    return AJS.contains(products, "confluence");
});
testAjs.addTest("testAjsClone", function() {
    var clonedDiv = AJS.clone("#test-container");
    AJS.$("body").append(clonedDiv);
    var res = AJS.$("#test-container").length == 1 && AJS.$("div.test").length == 2;
    clonedDiv.remove();
    return res;
});

// Tests for presence of Raphaël
testAjs.addTest("testAjsExists", function () {
    return (typeof Raphael != "undefined" && Raphael != null);
});
testAjs.addTest("testAjsExists", function () {
    return (typeof Raphael.shadow != "undefined" && Raphael.shadow != null);
});

(function () {
    // AJS.filterBySearch tests.
    var entries = [
        { id: 1, keywords: "foo bar, foo-bar" },
        { id: 2, keywords: "faux bar, faux-bar" },
        { id: 3, keywords: "Foo BAR, fb" },
        { id: 4, keywords: "Foo bar" },
        { id: 5, keywords: "JIRA Issues" },
        { id: 6, keywords: "Just Inother Ranic Aonday" }
    ];
    testAjs.addTest("testFilterBySearch", function() {
        var results = AJS.filterBySearch(entries, "bar");
        return results.length == 4;
    });
    testAjs.addTest("testFilterBySearchCamelCase", function() {
        var results = AJS.filterBySearch(entries, "FoB");
        return results.length == 1 && results[0].id == 3;
    });
    testAjs.addTest("testFilterBySearchCamelCaseIgnoreCase", function() {
        var results = AJS.filterBySearch(entries, "FoB", { ignoreForCamelCase: true });
        return results.length == 3 || results;
    });
    testAjs.addTest("testFilterBySearchNoMatchBoundary", function() {
        var results = AJS.filterBySearch(entries, "ux");
        return results.length == 1 && results[0].id == 2;
    });
    testAjs.addTest("testFilterBySearchMatchBoundary", function() {
        var results = AJS.filterBySearch(entries, "ux", { matchBoundary: true });
        return results.length == 0;
    });
    testAjs.addTest("testFilterBySearchSplitRegex", function() {
        var results = AJS.filterBySearch(entries, "fa-b", { splitRegex: /[\s\-]+/ });
        return results.length == 1 && results[0].id == 2 || results;
    });
    testAjs.addTest("testFilterBySearchAllUppercase", function() {
        var results = AJS.filterBySearch(entries, "JIRA");
        return results.length == 2 && results[0].id == 5 && results[1].id == 6 || results;
    });
})();

