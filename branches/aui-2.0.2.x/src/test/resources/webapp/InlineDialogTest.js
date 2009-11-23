testAjs.addTest("testInlineDialog", function() {
    var testContainer = $("#test-container");
    var link = $("<a>").text("Test Link").appendTo(testContainer);
    var dlg = new AJS.InlineDialog(link, 1, "content.html");
    res = ($("#inline-dialog-1").length == 1);
    testContainer.empty();
    return res;
});

