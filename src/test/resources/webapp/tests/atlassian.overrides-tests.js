// Tests for atlassian.overrides.js

testAjs.addTest("testAjsOverrides_hideAddsHidden", function () {
    var div = AJS.$("<div></div>");
    div.hide();
    return div.hasClass("hidden");
});

testAjs.addTest("testAjsOverrides_showRemovesHidden", function () {
    var div = AJS.$('<div class="hidden"></div>');
    div.show();
    return !div.hasClass("hidden");
});

testAjs.addTest("testAjsOverrides_slideUpAddsHidden", function () {
    var div = AJS.$("<div></div>");
    div.slideUp();
    return div.hasClass("hidden");
});

testAjs.addTest("testAjsOverrides_slideDownRemovesHidden", function () {
    var div = AJS.$('<div class="hidden"></div>');
    div.slideDown();
    return !div.hasClass("hidden");
});

testAjs.addTest("testAjsOverrides_fadeOutAddsHidden", function () {
    var div = AJS.$("<div></div>");
    div.fadeOut();
    return div.hasClass("hidden");
});

testAjs.addTest("testAjsOverrides_fadeInRemovesHidden", function () {
    var div = AJS.$('<div class="hidden"></div>');
    div.fadeIn();
    return !div.hasClass("hidden");
});
